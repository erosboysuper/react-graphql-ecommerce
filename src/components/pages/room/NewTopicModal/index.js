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

const NewTopicModal = () => {
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
    setNewMediaUploadModal,
  } = useContext(CommunityContext)

  const closeModal = () => {
    setNewTopicModal(false)
    setEditRecord(null)
  }

  const Labels = [
    {
      title: 'New Post',
      content: 'Share your ideas with the community and nisi ut aliquip ex',
    },
    // {
    //   title: 'New Image/Video',
    //   content: 'Share an image or pre-recorded video and nisi ut aliquip ex',
    // },
    {
      title: 'Start a Live Video',
      content: 'Start a live video and orem ipsum dolor sit amet commodo',
    },
  ]

  return (
    <Container>
      <Title>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeDesktop={20}
          color="#202122"
        >
          START A NEW CONVERSATION
        </Letter>
      </Title>
      <CloseImg src={CloseIcon} onClick={() => closeModal()} />
      <OptionBox>
        <ImageBox>
          <img
            src={PostIcon}
            onClick={() => {
              setNewConversationModal(true)
              setNewTopicModal(false)
            }}
          />
        </ImageBox>
        <LetterBox>
          <SubTitle>
            <Letter font="Titillium Bold" size={20} color="#202122">
              New Post
            </Letter>
          </SubTitle>
          <Content>
            <Letter font="Titillium Web" size={14} color="#202122">
              Share your ideas with the community and nisi ut aliquip ex
            </Letter>
          </Content>
        </LetterBox>
      </OptionBox>
      {/* <OptionBox>
        <ImageBox>
          <img
            src={NewImageVideoIcon}
            onClick={() => {
              setNewMediaUploadModal(true)
              setNewTopicModal(false)
            }}
          />
        </ImageBox>
        <LetterBox>
          <SubTitle>
            <Letter font="Titillium Bold" size={20} color="#202122">
              New Image/Video
            </Letter>
          </SubTitle>
          <Content>
            <Letter font="Titillium Web" size={14} color="#202122">
              Share an image or pre-recorded video and nisi ut aliquip ex
            </Letter>
          </Content>
        </LetterBox>
      </OptionBox> */}
      <OptionBox>
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

export default NewTopicModal
