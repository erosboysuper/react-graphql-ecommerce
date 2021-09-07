import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'

import ProfilePic from '~/images/Assets/Profile pic.png'
import NoImage from '~/images/Assets/No-Image.svg'
import VoteUpIcon from '~/images/Assets/Vot-up.svg'
import VoteDownIcon from '~/images/Assets/Vot-down.svg'
import VoteDownActiveIcon from '~/images/Assets/Vot-down active.svg'
import FollowingIcon from '~/images/Assets/Following.svg'
import CommentActiveIcon from '~/images/Assets/Comment active.svg'
import VoteUpActiveIcon from '~/images/Assets/Vot-up active.svg'
import FollowIcon from '~/images/Assets/Follow.svg'
import CommentIcon from '~/images/Assets/Comment.svg'

import FundingMarketItem from '~/components/Common/FundingMarketItem'

const FundingItemPreview = ({ detail, info, hideModal = false }) => {
  // const { messageModal, setMessageModal } = useContext(CommunityContext)
  const [commentNum, setCommentNum] = useState(0)
  const [commentActive, setCommentActive] = useState(false)
  const [voteUpActive, setVoteUpActive] = useState(false)
  const [voteDownActive, setVoteDownActive] = useState(false)
  const [followingActive, setFollowingActive] = useState(false)
  const [voteUpNum, setVoteUpNum] = useState(0)
  const [voteDownNum, setVoteDownNum] = useState(0)

  const CommentControl = () => {
    // setMessageModal(true)
  }

  const VoteUpTopic = () => {
    if (voteUpActive === false) {
      setVoteUpActive(!voteUpActive)
      setVoteUpNum(voteUpNum + 1)
    } else {
      setVoteUpActive(!voteUpActive)
      setVoteUpNum(voteUpNum - 1)
    }
  }

  const VoteDownTopic = () => {
    if (voteDownActive === false) {
      setVoteDownActive(!voteDownActive)
      setVoteDownNum(voteDownNum + 1)
    } else {
      setVoteDownActive(!voteDownActive)
      setVoteDownNum(voteDownNum - 1)
    }
  }

  const FollowingTopic = () => {
    setFollowingActive(!followingActive)
  }

  useEffect(() => {
    setCommentNum(info.commentNum)
    setVoteDownNum(info.voteDown)
    setVoteUpNum(info.voteUp)
  }, [])

  return (
    <Container>
      <Title>
        <Letter font="Titillium Black" size={20} sizeDesktop={34} color="black">
          {info.title}
        </Letter>
      </Title>
      <CategoryContainer>
        {info.category.map(item => {
          return (
            <CategoryItem key={item + 'category'}>
              <Letter font="Titillium Web" size={12} sizeDesktop={18}>
                {item}
              </Letter>
            </CategoryItem>
          )
        })}
      </CategoryContainer>
      <Profile_Time>
        <ProfileName>
          <LazyLoad>
            <img src={ProfilePic} alt="ProfilePic" />
          </LazyLoad>
          <ProfileContain>
            <Letter
              font="Titillium Bold"
              size={18}
              sizeDesktop={26}
              color="#F57B00"
            >
              {info.profile}
            </Letter>
            <SubTitle>
              <Letter
                font="Titillium Bold"
                size={18}
                sizeDesktop={26}
                color="black"
              >
                {info.subtitle}
              </Letter>
            </SubTitle>
          </ProfileContain>
          <PublishTime>
            <Letter
              font="Titillium Web"
              size={14}
              sizeDesktop={18}
              color="#A9ACAF"
            >
              {info.date}
            </Letter>
          </PublishTime>
        </ProfileName>
      </Profile_Time>
      <Content>
        <Letter font="Titillium Web" size={16} sizeDesktop={24} color="#202122">
          {info.content}
        </Letter>
      </Content>
      <FundingItemContainer>
        <FundingMarketItem
          product={{
            id: detail.node.id,
            name: detail.node.name,
            handle: detail.node.handle,
            media: detail.node.media,
            variants: detail.node.variant,
          }}
          position={true}
        />
      </FundingItemContainer>
      <TipContainer>
        <TipNum>
          <img
            src={commentActive ? CommentActiveIcon : CommentIcon}
            onClick={() => CommentControl()}
            alt="Comment Active"
          />
          <Letter
            font="Titillium Web"
            size={16}
            sizeDesktop={20}
            color="#161617"
          >
            {commentNum}
          </Letter>
        </TipNum>
        <TipNum>
          <img
            src={voteUpActive ? VoteUpActiveIcon : VoteUpIcon}
            onClick={() => VoteUpTopic()}
            alt="Vote Up"
          />
          <Letter
            font="Titillium Web"
            size={16}
            sizeDesktop={20}
            color="#161617"
          >
            {voteUpNum}
          </Letter>
        </TipNum>
        <TipNum>
          <img
            src={voteDownActive ? VoteDownActiveIcon : VoteDownIcon}
            onClick={() => VoteDownTopic()}
            alt="Comment inactive"
          />
          <Letter
            font="Titillium Web"
            size={16}
            sizeDesktop={20}
            color="#161617"
          >
            {voteDownNum}
          </Letter>
        </TipNum>
        <TipNum1>
          <Letter
            font="Titillium Web"
            size={16}
            sizeDesktop={20}
            color={followingActive ? '#FF8C00' : '#161617'}
          >
            Following
          </Letter>
          <img
            src={followingActive ? FollowingIcon : FollowIcon}
            onClick={() => FollowingTopic()}
            alt="Vote Down"
          />
        </TipNum1>
      </TipContainer>
      <Comment>
        <LazyLoad>
          <img src={ProfilePic} alt="ProfilePic" />
        </LazyLoad>
        <div>
          <Letter
            font="Titillium Bold"
            size={14}
            sizeDesktop={22}
            color="#F57B00"
          >
            {info.comments[0].name} &nbsp;
          </Letter>
          <Letter
            font="Titillium Web"
            size={14}
            sizeDesktop={22}
            color="#202122"
          >
            {info.comments[0].content}
          </Letter>
        </div>
      </Comment>
      <WriteComment>
        <LazyLoad>
          <img src={ProfilePic} alt="ProfilePic" />
        </LazyLoad>
        <input placeholder="Write a comment..." />
        <TipImg src={NoImage} />
      </WriteComment>
      {/* {messageModal && hideModal === false && (
        <MessageModal detail={info} />
      )} */}
    </Container>
  )
}

const Container = styled.div`
  padding-top: 16px;
  padding-right: 16px;
  padding-left: 16px;
  position: relative;
  overflow: hidden;
`

const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 18px;
  & img {
    padding-right: 10px;
  }
`

const WriteComment = styled.div`
  position: relative;
  margin-top: 18px;
  margin-bottom: 24px;
  & input {
    height: 44px;
    width: 80%;
    background: #f2f2f7;
    padding-left: 14px;
    font-size: 16px;
    margin-left: 10px;
    border: none;
  }
  @media ${device.laptop} {
    display: flex;
    & input {
      font-size: 22px;
      height: 56px;
      width: 94%;
    }
  }
`

const TipImg = styled.img`
  position: absolute;
  top: 11px;
  right: 26px;
  width: 28px;
`

const Title = styled.div`
  width: 60%;
`

const CategoryItem = styled.div`
  height: 30px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid black;
  margin-right: 6px;

  @media ${device.laptop} {
    height: 50px;
    display: flex;
    align-items: center;
  }
`

const CategoryContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
  top: 16px;
`

const Profile_Time = styled.div`
  position: relative;
  margin-top: 14px;
`

const ProfileName = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-start;
  & img {
    margin-right: 15px;
  }
`

const PublishTime = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`

const SubTitle = styled.div`
  margin-top: 0px;
`

const Content = styled.div`
  margin-top: 10px;
`

const TipContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  @media ${device.laptop} {
    padding-left: 20px;
    margin-top: 50px;
  }
`

const TipNum = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin-right: 8px;
    height: 19px;
  }
`
const TipNum1 = styled.div`
  & img {
    margin-left: 8px;
    height: 19px;
  }
`
const ProfileContain = styled.div`
  width: 65%;
  margin-top: -5px;
`

const FundingItemContainer = styled.div`
  width: 100%;
`

export default FundingItemPreview
