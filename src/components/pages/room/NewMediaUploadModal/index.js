import React, { useContext, useEffect, useState, useRef } from 'react'
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
import CameraImg from '~/images/Assets/Camera.svg'
import { Camera } from 'react-camera-pro'

const NewMediaUploadModal = () => {
  const {
    roomId,
    userInfo,
    createNewTopic,
    setNewTopicModal,
    editRecord,
    setEditRecord,
    allTopics,
    roomTopics,
    setNewConversationModal,
    setCameraModal,
    setNewMediaUploadModal,
  } = useContext(CommunityContext)

  const closeModal = () => {
    setNewTopicModal(false)
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
          NEW IMAGE / VIDEO
        </Letter>
      </Title>
      <CloseImg src={CloseIcon} onClick={() => closeModal()} />
      <TurnCameraImg
        src={CameraImg}
        onClick={() => {
          setCameraModal(true)
          setNewMediaUploadModal(false)
        }}
      />
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

const PhotoImg = styled.img``

const TurnCameraImg = styled.img``

export default NewMediaUploadModal
