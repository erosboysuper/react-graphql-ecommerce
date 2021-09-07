import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import LiveStartImg from '~/images/Assets/DESKTOP-New live.svg'
import CalendarImg from '~/images/Assets/DESKTOP-Calendar.svg'
import CalendarActive from '~/images/Assets/DESKTOP-Calendar active.svg'
import PlusIcon from '~/images/Assets/PlusIcon.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'
import CommunityContext from '~/context/CommunityContext'

const LiveSideBar = ({ content }) => {
  const {
    setInviteFriendModal,
    setStartLiveModal,
    setScheduleLiveModal,
    scheduleDetail,
  } = useContext(CommunityContext)

  const members = [
    {
      id: 3,
      image:
        'https://storage.googleapis.com/tbo-clothing.appspot.com/thumbnail_blob_b79de5a68c/thumbnail_blob_b79de5a68c',
      name: 'John',
    },
    {
      id: 4,
      image:
        'https://storage.googleapis.com/tbo-clothing.appspot.com/thumbnail_blob_b79de5a68c/thumbnail_blob_b79de5a68c',
      name: 'Jeff',
    },
    {
      id: 6,
      image:
        'https://storage.googleapis.com/tbo-clothing.appspot.com/thumbnail_blob_b79de5a68c/thumbnail_blob_b79de5a68c',
      name: 'Linda',
    },
  ]
  return (
    <Container>
      <Title>
        <Letter font="Titillium Light" size={22} color="#202122">
          {content}
        </Letter>
      </Title>
      <DesktopContain>
        <LiveLetter>
          <img src={LiveStartImg} />
          <Content>
            <SubTitle>
              <Letter font="Titillium Bold" size={27} color="#202122">
                Live Video Selling
              </Letter>
            </SubTitle>
            <LetterBox>
              <Letter font="Titillium Light" size={22} color="#202122">
                Start a live video and orem ipsum dolor sit amet commodo
              </Letter>
            </LetterBox>
          </Content>
        </LiveLetter>

        <LiveButton onClick={() => setStartLiveModal(true)}>
          <Letter font="Titillium Bold" size={20} color="white">
            START A NEW LIVE NOW
          </Letter>
        </LiveButton>

        <LiveLetter>
          <img src={CalendarImg} />
          <Content>
            <SubTitle>
              <Letter font="Titillium Bold" size={27} color="#202122">
                Schedule a New Live
              </Letter>
            </SubTitle>
            <LetterBox>
              <Letter font="Titillium Light" size={22} color="#202122">
                Consectetur adipiscing elit, sed do eiusmod and nisi ut aliquip
                ex
              </Letter>
            </LetterBox>
          </Content>
        </LiveLetter>
        <LiveButton onClick={() => setScheduleLiveModal(true)}>
          <Letter font="Titillium Bold" size={20} color="white">
            SCHEDULE A NEW LIVE
          </Letter>
        </LiveButton>
      </DesktopContain>
      {scheduleDetail && (
        <React.Fragment>
          <LiveLetter>
            <img src={CalendarActive} />
            <Content>
              <SubTitle>
                <Letter font="Titillium Bold" size={27} color="#202122">
                  {scheduleDetail.date}
                </Letter>
              </SubTitle>
              <LetterBox>
                <Letter font="Titillium Light" size={22} color="#202122">
                  Scheduled Live
                </Letter>
              </LetterBox>
            </Content>
          </LiveLetter>
          <LiveButton onClick={() => setScheduleLiveModal(true)}>
            <Letter font="Titillium Bold" size={20} color="white">
              SCHEDULE A NEW LIVE
            </Letter>
          </LiveButton>
        </React.Fragment>
      )}
      <NewInviteContainer>
        <InviteHeader>
          <Letter font="Titillium Black" size={30} color="#202122">
            Key Opinion Leaders
          </Letter>
        </InviteHeader>
        {members.map((m, index) => {
          return (
            <MemberShow key={m.id} display="flex">
              <LazyLoad>
                <img alt={m.name} src={m.image ? m.image : dummyProfilePic} />
              </LazyLoad>
              <Letter font="Titillium Web" color="#202122" sizeDesktop={24}>
                {m.name}
              </Letter>
              <InviteLetter>
                <Letter font="Titillium Bold" size={22} color="#FF8C00">
                  invite
                </Letter>
              </InviteLetter>
            </MemberShow>
          )
        })}
      </NewInviteContainer>
      <LiveButton onClick={() => setInviteFriendModal(true)}>
        <Letter font="Titillium Bold" size={20} color="white">
          SEND NEW INVITE
        </Letter>
        <img src={PlusIcon} />
      </LiveButton>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  @media ${device.laptop} {
    width: 80%;
  }
`
const Title = styled.div``
const LiveLetter = styled.div`
  display: flex;
  padding: 30px;
  background: white;
  & img {
    margin-right: 10%;
  }
  @media ${device.laptop} {
  }
`
const Content = styled.div``
const SubTitle = styled.div``
const LetterBox = styled.div``
const LiveButton = styled.button`
  background: #ff8c00;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: auto;
  height: 83px;
  position: relative;
  & img {
    position: absolute;
    right: 20px;
    width: 22px;
  }
  @media ${device.laptop} {
    width: 100%;
    margin: unset;
  }
`

const NewInviteContainer = styled.div`
  margin-bottom: 70px;
  margin-top: 70px;
`

const InviteHeader = styled.div`
  margin-bottom: 30px;
`

const MemberShow = styled.div`
  position: relative;
  display: ${props => props.display};
  align-items: center;
  & img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-right: -10px;
    border: solid 1px #d9d9da;
  }
  & span {
    display: none;
  }
  @media ${device.laptop} {
    display: flex;
    width: 100%;
    margin-right: 10%;
    & img {
      width: 56px;
      height: 56px;
      margin-right: 20px;
    }
    & span {
      display: block;
    }
  }
`

const Members = styled.div`
  position: relative;
  margin: 17px 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 95%;
  margin-top: 30px;
`

const InviteLetter = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
`

export default LiveSideBar
