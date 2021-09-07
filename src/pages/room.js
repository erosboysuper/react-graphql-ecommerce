import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { MediaBlock, TextBlock } from 'react-placeholder/lib/placeholders'
import { useToasts } from 'react-toast-notifications'
import 'react-image-lightbox/style.css'
import 'react-placeholder/lib/reactPlaceholder.css'

import { device } from '~/utils/device'
import { throttle } from '~/utils/use-debounce'
import { Letter, DesktopContain } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import SEO from '~/components/seo'
import RoomHeader from '~/components/pages/room/RoomHeader'
import RoomCreationSuccess from '~/components/pages/room/RoomCreationSuccess'
import PrivateRoomRequest from '~/components/pages/room/PrivateRoomRequest'
import RoomBriefInfo from '~/components/pages/room/RoomBriefInfo'
import FilterBar from '~/components/pages/community/FilterBar'
// import ShareDesign from '~/components/pages/room/ShareDesign'
import TopicBrief from '~/components/pages/community/TopicBrief'
import DesignTask from '~/components/pages/community/DesignTask'
// import FundingItemPreview from '~/components/pages/community/FundingItemPreview'
import CommunityHeader from '~/components/pages/community/CommunityHeader'
import Footer from '~/components/Common/Footer'
import CommunityModals from '~/components/Common/CommunityModals'
import PostIcon from '~/images/Assets/New post.svg'
import NewLiveIcon from '~/images/Assets/New live.svg'

const Room = ({
  room_slug = null,
  pageContext: {
    locale = 'en',
    localeFolder = 'us',
    slug = null,
    title = null,
  },
}) => {
  const offsetScrollTrigger = 300
  const _isMounted = useRef(true)
  const _fetchingData = useRef(false)
  const { communityPage } = useStaticQuery(graphql`
    query {
      communityPage: datoCmsCommunity(locale: { eq: "en" }) {
        ...communityPage_commonFields
      }
    }
  `)
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  const {
    roomsData,
    allTopics,
    getRoom,
    getRoomTopics,
    userInfo,
    joinRoomAction,
    setRoomId,
    setNewTopicModal,
    categoryData,
    getCategories,
    filters,
    autoLoginModel,
    roomTopics,
    setRoomTopics,
  } = useContext(CommunityContext)
  const { addToast } = useToasts()
  const [roomSlug, setRoomSlug] = useState(slug || room_slug)
  const [room, setRoom] = useState({})
  const [roomMember, setRoomMember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [enablePagination, _setEnablePagination] = useState(true)
  const enablePaginationRef = useRef(enablePagination)
  const [pagination, setPagination] = useState({
    _limit: 10,
    _start: 0,
  })

  const dataActionAfterFetch = topics => {
    // REMOVE DUPLICACY //
    let _topics = topics.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [])

    // SORT BY //
    _topics = topics.sort((a, b) => {
      if (filters.sortBy === 'most_recent') {
        return new Date(b.created_at) - new Date(a.created_at)
      } else {
        return a.position - b.position
      }
    })

    setRoomTopics(_topics)
  }

  const joinRoom = () => {
    joinRoomAction(room.id).then(res => {
      if (res && res.success) {
        addToast('Done! You have been successfully joined the room.', {
          appearance: 'success',
          autoDismiss: true,
        })
      } else if (res && res.message) {
        let errors = null
        if (typeof res.message === 'string') {
          errors = res.message
        } else {
          errors = res.message.map(x => x.messages[0].message)
          errors = errors.join('\n')
        }
        addToast(errors, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })
  }

  const setEnablePagination = data => {
    enablePaginationRef.current = data
    _setEnablePagination(data)
  }

  const handleScroll = () => {
    if (
      enablePaginationRef.current &&
      document.documentElement.scrollTop >
      document.documentElement.offsetHeight -
      window.innerHeight -
      offsetScrollTrigger
    ) {
      setEnablePagination(false)
      setPagination(prevState => {
        return { ...prevState, _start: prevState._start + prevState._limit }
      })
    }
  }
  const debouncedScroll = throttle(handleScroll, 1000)

  useEffect(() => {
    if (categoryData.length === 0) {
      getCategories()
    }
    autoLoginModel()

    // INFINITE SCROLL //
    window.addEventListener('scroll', debouncedScroll)

    return () => {
      _isMounted.current = false
      window.removeEventListener('scroll', debouncedScroll)
      setRoomId(null)
    }
  }, [])

  useEffect(() => {
    if (room_slug) {
      setRoomSlug(room_slug)
    }
  }, [room_slug])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  useEffect(() => {
    const _room = roomsData.find(r => r.slug === roomSlug)
    if (!_room) getRoom(roomSlug)
    if (_isMounted.current) {
      setRoom(_room || {})
    }
  }, [roomSlug, roomsData])

  useEffect(() => {
    if (room.id) {
      setRoomId(room.id)
    }

    let _roomMember = false
    const roomMemberIds = room.members ? room.members.map(x => x.id) : []
    if (
      userInfo &&
      userInfo.user &&
      (userInfo.user.rooms.indexOf(room.id) !== -1 ||
        roomMemberIds.indexOf(userInfo.user.id) !== -1)
    ) {
      _roomMember = true
    }
    setRoomMember(_roomMember)
  }, [userInfo, room, allTopics, filters])

  useEffect(() => {
    if (room.type === 'public' || (room.type === 'private' && roomMember)) {
      if (pagination._start === 0) {
        setIsLoading(true)
      }
      if (!_fetchingData.current) {
        _fetchingData.current = true
        getRoomTopics(roomSlug, pagination).then(res => {
          _fetchingData.current = false
          if (_isMounted.current) {
            setIsLoading(false)
            if (res.length < pagination._limit) {
              setEnablePagination(false)
            } else {
              setEnablePagination(true)
            }

            let _roomTopics = res
            if (pagination._start !== 0) {
              _roomTopics = [...roomTopics, ..._roomTopics]
            }
            dataActionAfterFetch(_roomTopics)
          }
        })
      }
    }
  }, [room.type, roomMember, pagination, roomSlug])

  return (
    <React.Fragment>
      <SEO
        title={title || room.title}
        description={title || room.title}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          `${title || room.title}`,
        ]}
      />
      <DesktopContain>
        <CommunityHeader
          selected={false}
          enableNotifications={communityPage.enableNotifications}
          enableSearch={communityPage.enableSearch}
          pageLogo={communityPage.pageLogo}
        />
      </DesktopContain>
      <Container>
        {room.id && (
          <DesktopRight>
            <RoomHeader room={room} />
            <RoomBriefInfo room={room} />
            {/* {roomMember && <ShareDesign />} */}
          </DesktopRight>
        )}
        <DesktopLeft>
          {roomMember && (
            <AddContent>
              <AddNewTalk onClick={() => setNewTopicModal(true)}>
                <button>
                  <img src={PostIcon} />
                  <Letter
                    font="Titillium Bold"
                    sizeDesktop={20}
                    sizeLaptop={16}
                    color="#202122"
                  >
                    Share a New Post{' '}
                  </Letter>
                </button>
              </AddNewTalk>
              <AddNewTalk onClick={() => setNewTopicModal(true)}>
                <button>
                  <img src={NewLiveIcon} />
                  <Letter
                    font="Titillium Bold"
                    sizeDesktop={20}
                    sizeLaptop={16}
                    color="#202122"
                  >
                    Start a Live Video
                  </Letter>
                </button>
              </AddNewTalk>
            </AddContent>
          )}
          <DesignTask />
          {userInfo &&
            room.owner === userInfo.user.id &&
            roomTopics.length === 0 && <RoomCreationSuccess />}
          {room.type === 'private' && !roomMember && (
            <PrivateRoomRequest room_id={room.id} />
          )}
          {roomTopics.length > 0 && (
            <FilterBar showFilters={false} showSortBy={false} />
          )}
          {isLoading === true && (
            <React.Fragment>
              <PlaceholderDiv>
                <MediaBlock color="#E0E0E0" rows={3} />
                <TextBlock color="#E0E0E0" rows={4} />
              </PlaceholderDiv>
              <PlaceholderDiv>
                <MediaBlock color="#E0E0E0" rows={3} />
                <TextBlock color="#E0E0E0" rows={4} />
              </PlaceholderDiv>
            </React.Fragment>
          )}
          {roomTopics.map(topic => {
            return <TopicBrief key={topic.id} topic={topic} />
          })}
          {/* <FundingItemPreview
            detail={allDatoCmsProduct.edges[3]}
            info={RoomInfoList[0]}
          /> */}
          {roomMember && (
            <LargeButton onClick={() => setNewTopicModal(true)}>
              <Letter font="Titillium Bold" size={16} color="white">
                START A NEW CONVERSATION
              </Letter>
            </LargeButton>
          )}
          {room.type !== 'private' && !roomMember && (
            <LargeButton onClick={() => joinRoom()}>
              <Letter font="Titillium Bold" size={16} color="white">
                JOIN THE ROOM
              </Letter>
            </LargeButton>
          )}
        </DesktopLeft>
      </Container>
      <Footer activeMenu="co-create" hideFooter={true} hideStickyMenu={false} />
      <CommunityModals />
    </React.Fragment>
  )
}

const LargeButton = styled.button`
  width: 100%;
  background: #ff8c00;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 11;
  cursor: pointer;
  @media ${device.laptop} {
    display: none;
  }
`

const AddNewTalk = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    align-items: center;
    margin-top: 37px;
    margin-bottom: 30px;
    width: 50%;
    & button {
      padding: 10px 20px;
      width: 80%;
    }
    & img {
      width: 40px;
      margin-right: 20px;
    }
  }
`

const DesktopLeft = styled.div`
  @media ${device.laptop} {
    width: 60%;
  }
`

const DesktopRight = styled.div`
  @media ${device.laptop} {
    width: 38%;
  }
`

const Container = styled.div`
  background: #f7f7fa;
  @media ${device.laptop} {
    display: flex;
    flex-direction: row-reverse;
    padding-left: 7%;
    justify-content: space-between;
  }
`

const PlaceholderDiv = styled.div`
  padding: 16px;
`

const AddContent = styled.div`
  display: flex;
`

export default Room
