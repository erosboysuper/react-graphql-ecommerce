import React, { useContext, useEffect, useState, useRef } from 'react'
import { MediaBlock, TextBlock } from 'react-placeholder/lib/placeholders'
import styled from 'styled-components'

import CommunityContext from '~/context/CommunityContext'
import { throttle } from '~/utils/use-debounce'
import { device } from '~/utils/device'

import FilterBar from '~/components/pages/community/FilterBar'
import CommunitySidebar from '~/components/pages/community/CommunitySidebar'
import TopicBrief from '~/components/pages/community/TopicBrief'
// import Survey from '~/components/pages/community/Survey'
// import SuggestRoom from '~/components/pages/community/SuggestRoom'
// import FundingItemPreview from '~/components/pages/community/FundingItemPreview'

const CommunitySection = () => {
  const offsetScrollTrigger = 300
  const _isMounted = useRef(true)
  const { seeMore, filters, allTopics, getTopTopics } =
    useContext(CommunityContext)
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [enablePagination, _setEnablePagination] = useState(true)
  const enablePaginationRef = useRef(enablePagination)
  const [pagination, setPagination] = useState({
    _limit: 10,
    _start: 0,
  })

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
    window.addEventListener('scroll', debouncedScroll)
    return () => {
      _isMounted.current = false
      window.removeEventListener('scroll', debouncedScroll)
    }
  }, [])

  useEffect(() => {
    // FILTER DATA //
    let _allTopics = [...allTopics]
    const catId = Number(filters.category)
    if (catId !== 0) {
      _allTopics = _allTopics.filter(t => {
        if (t.room && t.room.categories && t.room.categories.length > 0) {
          const isExist = t.room.categories.filter(x => x.id === catId)
          return isExist.length > 0
        } else {
          return false
        }
      })
    }

    // SORT BY //
    _allTopics = _allTopics.sort((a, b) => {
      if (filters.sortBy === 'most_recent') {
        return new Date(b.created_at) - new Date(a.created_at)
      } else {
        return a.position - b.position
      }
    })

    if (_isMounted.current) {
      setTopics(_allTopics)
    }
  }, [allTopics, filters])

  useEffect(() => {
    if (allTopics.length === 0 && pagination._start === 0) {
      setIsLoading(true)
    }
    if (_isMounted.current) {
      getTopTopics(pagination).then(res => {
        setTimeout(() => {
          if (_isMounted.current) {
            setIsLoading(false)
            if (res.length < pagination._limit) {
              setEnablePagination(false)
            } else {
              setEnablePagination(true)
            }
          }
        }, 500)
      })
    }
  }, [pagination])

  return (
    <Container>
      <CommunitySidebar />
      <Contain width={seeMore ? 41 : 61}>
        <FilterBar showSortBy={false} />
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
        {topics.map((topic, index) => {
          return (
            <React.Fragment key={topic.id}>
              {index !== 0 && <Space height={10} />}
              <TopicBrief topic={topic} showRoomDetail={true} />
              {/* {index === 0 && <Survey />} */}
            </React.Fragment>
          )
        })}
        {/* <SuggestRoom /> */}
        {/* <FundingItemPreview
          detail={fundingItems.edges[3]}
          info={RoomInfoList[0]}
        /> */}
      </Contain>
    </Container>
  )
}

const Container = styled.div`
  overflow-x: hidden;
  @media ${device.laptop} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding-left: 7%;
    padding-right: 7%;
    background: #f7f7fa;
    padding-top: 50px;
  }
`

const Space = styled.div`
  height: 10px;
  width: 100%;
  background: #f2f2f7;
`

const Contain = styled.div`
  @media ${device.laptop} {
    background: white;
    width: ${props => props.width}%;
  }
`

const PlaceholderDiv = styled.div`
  padding: 16px;
`

export default CommunitySection
