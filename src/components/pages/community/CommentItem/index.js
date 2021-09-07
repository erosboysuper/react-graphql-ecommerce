import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import { dateFormat, formatedHtml } from '~/utils/functions'
import { black_color2 } from '~/utils/colors'
import CommunityContext from '~/context/CommunityContext'

import VoteUpIcon from '~/images/Assets/Vot-up.svg'
import VoteDownIcon from '~/images/Assets/Vot-down.svg'
import VoteDownActiveIcon from '~/images/Assets/Vot-down active.svg'
import VoteUpActiveIcon from '~/images/Assets/Vot-up active.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const CommentItem = ({ comment: commentData, removeLazyLoad = false }) => {
  const {
    voteUpComment,
    voteDownComment,
    userInfo,
    setLightboxModal,
    setLightboxAsset,
    setProfileInfo,
    setEditModal,
    setEditRecord,
    roomsData,
  } = useContext(CommunityContext)
  const [comment, setComment] = useState(commentData)
  const [voteUpActive, setVoteUpActive] = useState(false)
  const [voteDownActive, setVoteDownActive] = useState(false)

  useEffect(() => {
    setComment(commentData)
  }, [commentData])

  useEffect(() => {
    if (
      userInfo &&
      userInfo.user &&
      userInfo.user.comment_voted &&
      userInfo.user.comment_voted[comment.id]
    ) {
      if (userInfo.user.comment_voted[comment.id] === 'like') {
        setVoteUpActive(true)
      } else {
        setVoteDownActive(true)
      }
    } else {
      setVoteUpActive(false)
      setVoteDownActive(false)
    }
  }, [userInfo])

  const voteUpCommentAction = () => {
    voteUpComment(comment.topic_id, comment.id).then(res => {
      if (res && res.id) {
        setComment(prevState => {
          return { ...prevState, ...res }
        })
      }
    })
  }

  const voteDownCommentAction = () => {
    voteDownComment(comment.topic_id, comment.id).then(res => {
      if (res && res.id) {
        setComment(prevState => {
          return { ...prevState, ...res }
        })
      }
    })
  }

  const clickHandler = e => {
    const el = e.target
    // CHECK FOR USER PROFILE //
    if (
      el &&
      el.classList.contains('show-profile') &&
      el.attributes.user_id &&
      userInfo
    ) {
      const id = Number(el.attributes.user_id.value)
      setProfileInfo({ id })
    }

    // CHECK FOR ROOM //
    if (el && el.classList.contains('show-room') && el.attributes.room_id) {
      const id = Number(el.attributes.room_id.value)
      const roomData = roomsData.find(x => x.id === id)
      if (roomData) {
        navigate(`/room/${roomData.slug}`, {
          replace: true,
        })
      }
    }
  }

  return (
    <React.Fragment>
      <CommentDiv>
        <LazyLoad removeLazyLoad={removeLazyLoad}>
          <img
            src={
              comment.user && comment.user.image
                ? comment.user.image
                : dummyProfilePic
            }
            alt={comment.user.name}
            title={comment.user.name}
            onClick={() => (userInfo ? setProfileInfo(comment.user) : null)}
          />
        </LazyLoad>
        <LetterContainer>
          <Letter
            font="Titillium Bold"
            size={14}
            sizeDesktop={22}
            color="#F57B00"
          >
            {comment.user.name} &nbsp;
          </Letter>
          <br />
          <Letter
            font="Titillium Web"
            size={14}
            sizeDesktop={22}
            color="#202122"
            className="comment-item"
            onClick={clickHandler}
            dangerouslySetInnerHTML={{
              __html: formatedHtml(comment.comment || ''),
            }}
          />
        </LetterContainer>
        <DateDiv>
          <Letter
            font="Titillium Web"
            size={14}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            color="#A9ACAF"
          >
            {dateFormat(comment.created_at)}
          </Letter>
          {userInfo && userInfo.user.owned_comments.indexOf(comment.id) !== -1 && (
            <EditButton
              onClick={() => {
                setEditModal(true)
                setEditRecord({
                  type: `comment`,
                  id: comment.id,
                  topic_id: comment.topic_id,
                })
              }}
            >
              <CircleItem />
              <CircleItem />
              <CircleItem />
            </EditButton>
          )}
        </DateDiv>
      </CommentDiv>
      {comment.image && (
        <React.Fragment>
          <LazyLoad removeLazyLoad={removeLazyLoad}>
            <CommentImage
              src={comment.image}
              alt="Comment Image"
              onClick={() => {
                setLightboxModal(true)
                setLightboxAsset([`${comment.image_large}`])
              }}
            />
          </LazyLoad>
        </React.Fragment>
      )}
      <LikeDiv>
        <IconDiv onClick={() => voteUpCommentAction()}>
          <img
            src={voteUpActive ? VoteUpActiveIcon : VoteUpIcon}
            alt="Vote Up"
          />
          &nbsp;
          <Letter size={16} color={black_color2} font="Titillium Web">
            {comment.likes}
          </Letter>
        </IconDiv>
        <IconDiv onClick={() => voteDownCommentAction()}>
          <img
            src={voteDownActive ? VoteDownActiveIcon : VoteDownIcon}
            alt="Vote Down"
          />
          &nbsp;
          <Letter size={16} color={black_color2} font="Titillium Web">
            {comment.dislikes}
          </Letter>
        </IconDiv>
      </LikeDiv>
    </React.Fragment>
  )
}

const CommentDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 18px;
  position: relative;
  & img {
    margin-right: 10px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    cursor: pointer;
    border: solid 1px #d9d9da;
  }
  @media ${device.laptop} {
    & img {
      width: 56px;
      height: 56px;
    }
  }
`

const LikeDiv = styled.div`
  display: flex;
  width: 35%;
  justify-content: space-between;
  margin-left: 50px;
  @media ${device.laptop} {
    margin-left: 60px;
  }
`

const LetterContainer = styled.div`
  width: 90%;
  & .comment-item {
    word-break: break-word;
    word-wrap: break-word;
    white-space: pre-wrap; /* css-3 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
  }
  @media ${device.laptop} {
    width: 90%;
  }
`

const DateDiv = styled.div`
  position: absolute;
  right: 5px;
`

const CommentImage = styled.img`
  margin: 10px 0px 10px 46px;
  max-width: 40%;
  cursor: pointer;
  @media ${device.laptop} {
    margin: 10px 0px 10px 60px;
  }
`

const IconDiv = styled.div`
  cursor: pointer;
`

const EditButton = styled.div`
  display: flex;
  padding-top: 12px;
  cursor: pointer;
  flex-direction: row-reverse;
  @media ${device.laptop} {
    padding-top: 15px;
  }
`

const CircleItem = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 3px;
  background: #cecece;
`

export default CommentItem
