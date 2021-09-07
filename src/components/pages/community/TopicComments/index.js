import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv1 } from 'uuid'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { optimalImage } from '~/utils/functions'
import { btn_color, black_color2 } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import StoreContext from '~/context/StoreContext'

import MessageModal from '~/components/pages/community/MessageModal'
import CommentItem from '~/components/pages/community/CommentItem'
import AtMention from '~/components/Common/AtMention'

import CommentIcon from '~/images/Assets/Comment.svg'
import VoteUpIcon from '~/images/Assets/Vot-up.svg'
import VoteDownIcon from '~/images/Assets/Vot-down.svg'
import VoteDownActiveIcon from '~/images/Assets/Vot-down active.svg'
import FollowingIcon from '~/images/Assets/Following.svg'
import VoteUpActiveIcon from '~/images/Assets/Vot-up active.svg'
import FollowIcon from '~/images/Assets/Follow.svg'
import SendIcon from '~/images/Assets/Send.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import NoImage from '~/images/Assets/No-Image.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const TopicComments = ({
  topic: topicData,
  displayAll = false,
  removeLazyLoad = false,
}) => {
  const {
    voteUpTopic,
    voteDownTopic,
    followingTopic,
    userInfo,
    userHeaders,
    createNewComment,
    allTopics,
    setAllTopics,
    roomTopics,
    setRoomTopics,
    roomsData,
    setRoomsData,
  } = useContext(CommunityContext)
  const { setLoader } = useContext(StoreContext)

  const [topic, setTopic] = useState(topicData)
  const [lastDate, setLastDate] = useState('')
  const [isPagingStart, setIsPagingStart] = useState(false)
  const [loadMoreButton, setLoadMoreButton] = useState(false)
  const [voteUpActive, setVoteUpActive] = useState(false)
  const [voteDownActive, setVoteDownActive] = useState(false)
  const [followingActive, setFollowingActive] = useState(false)
  const [messageModal, setMessageModal] = useState(false)
  const [comment, setComment] = useState('')
  const [picture, setPicture] = useState(null)
  const [imageId, setImageId] = useState()
  const [imgData, setImgData] = useState(null)
  const [roomMembers, setRoomMembers] = useState([])
  const [roomList, setRoomList] = useState([])
  const [preview, setPreview] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const pageLimit = 25

  const onChangePicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setPicture(file)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setImgData(reader.result)
          let src,
            prev,
            type = file.type
          if (/^image\/\S+$/.test(type)) {
            src = URL.createObjectURL(file)
            prev = <img src={src} alt="" />
            setPreview(prev)
            setMediaType('IMAGE')
          }
          // match the string of type video/ at the beginning
          else if (/^video\/\S+$/.test(type)) {
            src = URL.createObjectURL(file)
            prev = <video src={src} autoPlay loop controls />
            setPreview(prev)
            setMediaType('VIDEO')
          }
        })
        reader.readAsDataURL(file)
      })
    } else {
      setPicture(null)
      setMediaType(null)
    }
  }
  const LoadMore = () => {
    setLoadMoreButton(false)
    setLoader(true)
    // MAKE API CALL TO GET ALL COMMENTS OF A TOPIC
    fetch(
      `${process.env.API_BASE}/allComments/${topic.id}?dt=${lastDate}&limit=${pageLimit}`,
      {
        method: 'GET',
        async: true,
        headers: userHeaders,
      }
    )
      .then(res => res.json())
      .then(res => {
        const _comments = res.data.map(c => {
          c['topic_id'] = topic.id
          return c
        })
        let allComments = []
        if (isPagingStart) {
          allComments = [...topic.comments, ..._comments]
        } else {
          allComments = _comments
        }
        setIsPagingStart(true)
        setTopic(prevState => {
          return {
            ...prevState,
            comments: allComments,
          }
        })

        // UPDATE GLOBAL TOPICS //
        let _allTopics = [...allTopics]
        let _roomTopics = [...roomTopics]
        let _topic = _allTopics.find(t => t.id === topic.id)
        if (!_topic) {
          _topic = _roomTopics.find(t => t.id === topic.id)
        }
        if (_topic) {
          _topic.comments = allComments
          setAllTopics(_allTopics)
          setRoomTopics(_roomTopics)
        }

        setLoader(false)
      })
  }
  const createComment = () => {
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        comment: `${comment}`,
        topic: `${topic.id}`,
        user: `${userInfo.user.id}`,
      })
    )
    if (picture) {
      formData.append(`files.image`, picture, picture.name || null)
    }
    createNewComment(formData).then(res => {
      if (res && res.topic) {
        const imgSet = optimalImage(res.image)
        const userImgSet = optimalImage(res.user.image)
        const newComment = {
          id: res.id,
          comment: res.comment,
          created_at: res.created_at,
          likes: 0,
          dislikes: 0,
          topic_id: res.topic.id,
          ...imgSet,
          user: {
            id: res.user.id,
            email: res.user.email,
            name: `${res.user.first_name} ${res.user.last_name}`,
            ...userImgSet,
          },
        }

        let _topic = { ...topic }
        _topic.comments.push(newComment)
        _topic.commentCount++
        setTopic(prevState => {
          return { ...prevState, ..._topic }
        })

        // let _allTopics = [...allTopics]
        // let _allTopic = _allTopics.find(t => t.id === res.topic.id)
        // if (_allTopic) {
        //   _allTopic.comments.push(newComment)
        //   _allTopic.commentCount++
        //   setAllTopics(_allTopics)
        // }

        // let _roomTopics = [...roomTopics]
        // let _roomTopic = _roomTopics.find(t => t.id === res.topic.id)
        // if (_roomTopic) {
        //   _roomTopic.comments.push(newComment)
        //   _roomTopic.commentCount++
        //   setRoomTopics(_roomTopics)
        // }
      }
      if (res && res.roomMember && res.user) {
        let _roomsData = [...roomsData]
        let _room = _roomsData.find(x => x.id === res.roomMember)
        if (_room) {
          const imgSet = optimalImage(res.user.image)
          _room.members.push({
            id: res.user.id,
            name: `${res.user.first_name} ${res.user.last_name}`,
            ...imgSet,
          })
          setRoomsData(_roomsData)
        }
      }
      setComment('')
      setPicture(null)
      setImgData(null)
    })
  }
  const voteUpTopicAction = () => {
    voteUpTopic(topic.id).then(res => {
      if (res && res.id) {
        setTopic(prevState => {
          return { ...prevState, ...res }
        })
      }
    })
  }
  const voteDownTopicAction = () => {
    voteDownTopic(topic.id).then(res => {
      if (res && res.id) {
        setTopic(prevState => {
          return { ...prevState, ...res }
        })
      }
    })
  }
  const followingTopicAction = () => {
    followingTopic(topic.id).then(res => {
      if (res && res.id) {
        setTopic(prevState => {
          return { ...prevState, ...res }
        })
      }
    })
  }

  useEffect(() => {
    const id = uuidv1()
    setImageId(id)
  }, [])

  useEffect(() => {
    if (topic.id) {
      const commentCount = topic.comments.length
      if (topic.commentCount > commentCount) {
        setLoadMoreButton(true)

        if (isPagingStart) {
          const _lastDate = topic.comments[commentCount - 1].created_at
          setLastDate(_lastDate)
        }
      }
      if (roomsData.length > 0) {
        const _room = roomsData.find(x => x.id === topic.room.id)
        if (_room) {
          const _roomMembers = _room.members.map(x => ({
            id: x.id,
            display: x.name,
          }))
          setRoomMembers(_roomMembers)
        }
        const _roomList = roomsData.map(x => ({
          id: x.id,
          display: x.title,
        }))
        setRoomList(_roomList)
      }
    }
  }, [topic, roomsData])

  useEffect(() => {
    if (
      userInfo &&
      userInfo.user &&
      userInfo.user.following_topics.indexOf(topic.id) !== -1
    ) {
      setFollowingActive(true)
    } else {
      setFollowingActive(false)
    }

    if (
      userInfo &&
      userInfo.user &&
      userInfo.user.topic_voted &&
      userInfo.user.topic_voted[topic.id]
    ) {
      if (userInfo.user.topic_voted[topic.id] === 'like') {
        setVoteUpActive(true)
      } else {
        setVoteDownActive(true)
      }
    } else {
      setVoteUpActive(false)
      setVoteDownActive(false)
    }
  }, [userInfo])

  return (
    <Container>
      <TipContainer showBorder={topic.comments.length > 0}>
        <DesktopContain>
          <TipNum>
            <img src={CommentIcon} alt="Comment Active" />
            <Letter
              font="Titillium Web"
              size={16}
              sizeLaptop={14}
              sizeLaptopL={17}
              sizeDesktop={20}
              color={black_color2}
            >
              {topic.commentCount}
            </Letter>
          </TipNum>
        </DesktopContain>
        <MobileContain>
          <TipNum onClick={() => setMessageModal(true)}>
            <img src={CommentIcon} alt="Comment Active" />
            <Letter
              font="Titillium Web"
              size={16}
              sizeLaptop={14}
              sizeLaptopL={17}
              sizeDesktop={20}
              color={black_color2}
            >
              {topic.commentCount}
            </Letter>
          </TipNum>
        </MobileContain>
        <TipNum onClick={() => voteUpTopicAction()}>
          <img
            src={voteUpActive ? VoteUpActiveIcon : VoteUpIcon}
            alt="Vote Up"
          />
          <Letter
            font="Titillium Web"
            size={16}
            sizeLaptop={14}
            sizeLaptopL={!7}
            sizeDesktop={20}
            color={black_color2}
          >
            {topic.likes}
          </Letter>
        </TipNum>
        <TipNum onClick={() => voteDownTopicAction()}>
          <img
            src={voteDownActive ? VoteDownActiveIcon : VoteDownIcon}
            alt="Comment inactive"
          />
          <Letter
            font="Titillium Web"
            size={16}
            sizeLaptop={14}
            sizeLaptopL={17}
            sizeDesktop={20}
            color={black_color2}
          >
            {topic.dislikes}
          </Letter>
        </TipNum>
        <TipNum1 onClick={() => followingTopicAction()}>
          <Letter
            font="Titillium Web"
            size={16}
            sizeLaptop={14}
            sizeLaptopL={17}
            sizeDesktop={20}
            color={followingActive ? btn_color : black_color2}
          >
            {topic.followers} {followingActive ? `Following` : `Follow`}
          </Letter>
          <img
            src={followingActive ? FollowingIcon : FollowIcon}
            alt="Follow Topic"
          />
        </TipNum1>
      </TipContainer>
      {topic.comments.map(c => (
        <CommentItem key={c.id} comment={c} removeLazyLoad={removeLazyLoad} />
      ))}
      <DesktopContain displayAll={displayAll}>
        {loadMoreButton && (
          <LoadMoreButton>
            <button onClick={() => LoadMore()}>
              <Letter font="Titillium Bold" size={11} color="#161617">
                {' '}
                LOAD MORE COMMENTS
              </Letter>
            </button>
          </LoadMoreButton>
        )}
      </DesktopContain>

      {userInfo && (
        <WriteComment>
          <LazyLoad removeLazyLoad={removeLazyLoad}>
            <CommentUserPic
              src={
                userInfo.user && userInfo.user.image
                  ? userInfo.user.image
                  : dummyProfilePic
              }
              alt="User Pic"
            />
          </LazyLoad>
          <InputField>
            <AtMention
              value={comment}
              roomMembers={roomMembers}
              roomList={roomList}
              placeholder="Write a comment..."
              onChange={e => setComment(e.target.value)}
              additionStyle={{
                '&multiLine': {
                  highlighter: {
                    padding: '11px 22% 11px 20px',
                  },
                  input: {
                    padding: '11px 22% 11px 20px',
                  },
                },
              }}
            />
            <Buttons>
              {!picture && (
                <React.Fragment>
                  <UploadButton>
                    <input
                      type="file"
                      id={imageId}
                      onChange={onChangePicture}
                      accept="video/*,image/*"
                    />
                    <label htmlFor={imageId}>
                      <img src={NoImage} alt="No Image" />
                      <DesktopContainer>
                        <Letter font="Titillium Web" size={18} color="#7D7F81">
                          IMAGE
                        </Letter>
                      </DesktopContainer>
                    </label>
                  </UploadButton>
                </React.Fragment>
              )}
              {(comment || picture) && (
                <SendButton
                  src={SendIcon}
                  alt="SendIcon"
                  onClick={() => createComment()}
                />
              )}
            </Buttons>
            {picture && (
              <ImagePreview>
                {preview}
                <DeleteButton>
                  <RemoveImg
                    alt="CloseIcon"
                    src={CloseIcon}
                    onClick={() => setPicture(null)}
                  />
                  <DesktopContain>
                    <Letter font="Titillium Web" size={18}>
                      DELETE {mediaType}
                    </Letter>
                  </DesktopContain>
                </DeleteButton>
              </ImagePreview>
            )}
          </InputField>
        </WriteComment>
      )}
      {messageModal === true && (
        <MessageModal topic={topic} closeCB={() => setMessageModal(false)} />
      )}
    </Container>
  )
}

const Container = styled.div`
  background: white;
`

const WriteComment = styled.div`
  position: relative;
  margin-top: 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: end;
  & textarea {
    height: 44px;
    width: 100%;
    background: #f2f2f7;
    padding-left: 14px;
    font-size: 16px;
    margin-left: 10px;
    border: none;
  }
  & textarea:focus {
    outline: none;
  }
  @media ${device.laptop} {
    & textarea {
      font-size: 18px;
      height: auto;
      padding-right: 20%;
    }
  }
  @media ${device.laptopL} {
    & textarea {
      font-size: 20px;
    }
  }
  @media ${device.desktop} {
    & textarea {
      font-size: 22px;
    }
  }
`

const TipContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: ${props => (props.showBorder ? '6' : '0')}px solid #f7f7fa;
`

const TipNum = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  & img {
    margin-right: 8px;
    height: 19px;
  }
`

const TipNum1 = styled.div`
  cursor: pointer;
  & img {
    margin-left: 8px;
    height: 19px;
  }
`

const UploadButton = styled.div`
  margin-right: 10px;
  & input[type='file'] {
    border: 2px solid #333;
    display: none;
  }

  & input[type='file'] + label {
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
  }
  & img {
    width: 36px;
  }
  & label {
    margin-bottom: 0px;
    display: flex;
  }
  @media ${device.laptop} {
    margin-right: 0px;
  }
`

const ImagePreview = styled.div`
  background: #f2f2f7;
  padding: 9px 20px;
  & img {
    width: 50%;
  }
  margin-left: 10px;
  width: 100%;
  margin-top: -10px;
  display: flex;
  align-items: baseline;
  & video {
    width: 100%;
    height: 100%;
  }
  @media ${device.laptop} {
    padding: 18px 20px;
  }
`

const InputField = styled.div`
  width: 85%;
  & textarea {
    padding: 11px 20px;
  }
  position: relative;
  @media ${device.mobileS} {
    & textarea {
      padding: 11px 20px;
      padding-right: 40%;
    }
  }
  @media ${device.mobileM} {
    & textarea {
      padding: 11px 20px;
      padding-right: 35%;
    }
  }
  @media ${device.mobileL} {
    & textarea {
      padding: 11px 20px;
      padding-right: 35%;
    }
  }
  @media ${device.laptop} {
    width: 94%;
    & textarea {
      padding-right: 22% !important;
    }
  }
`

const RemoveImg = styled.img`
  margin-left: 18px;
  margin-right: 18px;
  width: 20px !important;
  @media ${device.laptop} {
    width: 38px !important;
  }
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
`

const Buttons = styled.div`
  position: absolute;
  bottom: -2px;
  right: -10px;
  display: flex;
  align-items: center;
  height: 50px;
  & span {
    margin-left: 16px;
    margin-right: 17px;
  }
`

const SendButton = styled.img`
  margin-left: 16px;
  width: 46px;
  cursor: pointer;
  @media ${device.mobileS} {
    width: 35px;
  }
  @media ${device.mobileM} {
    width: 40px;
  }
  @media ${device.mobileL} {
    width: 46px;
  }
  @media ${device.laptop} {
    width: 48px;
  }
  @media ${device.laptopL} {
    width: 51px;
  }
  @media ${device.desktop} {
    width: 54px;
  }
`

const LoadMoreButton = styled.div`
  background: white;
  width: 100%;
  padding: 15px 0px;
  & button {
    padding: 8px 40px;
    margin: 0 auto;
    min-width: 38%;
    display: block;
  }
  @media ${device.laptop} {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 60px;
    width: fit-content;
    & button {
      margin: 0;
      width: fit-content;
    }
  }
`

const CommentUserPic = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  @media ${device.laptop} {
    width: 46px;
    height: 46px;
  }
  @media ${device.laptopL} {
    width: 56px;
    height: 56px;
  }
  @media ${device.desktop} {
    width: 56px;
    height: 56px;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptopL} {
    display: block;
  }
`

export default TopicComments
