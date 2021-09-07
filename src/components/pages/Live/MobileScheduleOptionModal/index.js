import React, { useContext, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'

import SendIcon from '~/images/Assets/Send-contact.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import NoImage from '~/images/Assets/No-Image.svg'
import PostIcon from '~/images/Assets/New post.svg'
import NewImageVideoIcon from '~/images/Assets/New image-video.svg'
import NewLiveIcon from '~/images/Assets/New live.svg'
import CalendarImg from '~/images/Assets/DESKTOP-Calendar.svg'
import CalendarActive from '~/images/Assets/DESKTOP-Calendar active.svg'

const MobileScheduleOptionModal = () => {
  const {
    setNewTopicModal,
    setEditRecord,
    allTopics,
    roomTopics,
    setNewConversationModal,
    setNewMediaUploadModal,
    setMobileSchedule,
    setStartLiveModal,
    scheduleDetail,
    setScheduleLiveModal,
  } = useContext(CommunityContext)

  const closeModal = () => {
    setMobileSchedule(false)
    setEditRecord(null)
  }

  return (
    <Container>
      <Title>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeDesktop={20}
          color="#202122"
        >
          START A NEW LIVE
        </Letter>
      </Title>
      <CloseImg src={CloseIcon} onClick={() => closeModal()} />
      <OptionBox
        onClick={() => {
          setStartLiveModal(true)
          setMobileSchedule(false)
        }}
      >
        <ImageBox>
          <img src={NewLiveIcon} />
        </ImageBox>
        <LetterBox>
          <SubTitle>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Start a Live Video
            </Letter>
          </SubTitle>
          <Content>
            <Letter font="Titillium Web" size={14} color="#202122">
              Start a live video and orem ipsum dolor sit amet commodo
            </Letter>
          </Content>
        </LetterBox>
      </OptionBox>
      <OptionBox>
        <ImageBox>
          <img
            src={CalendarImg}
            onClick={() => {
              setScheduleLiveModal(true)
            }}
          />
        </ImageBox>
        <LetterBox>
          <SubTitle>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Schedule A New Live
            </Letter>
          </SubTitle>
          <Content>
            <Letter font="Titillium Web" size={14} color="#202122">
              Share your ideas with the community and nisi ut aliquip ex
            </Letter>
          </Content>
        </LetterBox>
      </OptionBox>

      {scheduleDetail && (
        <React.Fragment>
          <ActiveOptionBox>
            <ImageBox>
              <img src={CalendarActive} />
            </ImageBox>
            <Content>
              <SubTitle>
                <Letter font="Titillium Bold" size={20} color="#202122">
                  {scheduleDetail.date}
                </Letter>
              </SubTitle>
              <LetterBox>
                <Letter font="Titillium Light" size={14} color="#202122">
                  Scheduled Live
                </Letter>
              </LetterBox>
            </Content>
          </ActiveOptionBox>
        </React.Fragment>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: white;
  width: 100%;
  padding-left: 16px;
  padding-bottom: 30px;
  z-index: 15;
  padding-right: 16px;
  @media ${device.laptop} {
    height: 100vh;
    overflow: hidden;
    width: 33%;
    right: 0px;
    left: unset;
  }
`

const Title = styled.div`
  margin-top: 23px;
  text-align: center;
  @media ${device.laptop} {
    margin-top: 40px;
    margin-bottom: 80px;
  }
`

const CloseImg = styled.img`
  position: absolute;
  right: 16px;
  top: 19px;
  @media ${device.laptop} {
    left: 30px;
    width: 38px;
    top: 35px;
  }
`

const OptionBox = styled.div`
  margin: 16px;
  border: 2px solid #cecece;
  display: flex;
`

const ActiveOptionBox = styled.div`
  margin: 16px;
  background: rgb(255, 232, 204);
  display: flex;
`

const ImageBox = styled.div`
  width: 30%;
  text-align: center;
  & img {
    width: 60%;
    margin: 20%;
  }
`

const LetterBox = styled.div`
  width: 70%;
`

const SubTitle = styled.div``

const Content = styled.div``

export default MobileScheduleOptionModal

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
