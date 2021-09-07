import React, { useContext, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import SendIcon from '~/images/Assets/Send-contact.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import NoImage from '~/images/Assets/No-Image.svg'
import VideoUploadIcon from '~/images/Assets/Video.svg'
import CameraImg from '~/images/Assets/Camera.svg'
import { media } from 'react-placeholder/lib/placeholders'
import CameraModal from '~/components/pages/room/CameraModal'
import RecordModal from '~/components/pages/room/RecordModal'

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const NewConversationModal = () => {
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
    setRecordModal,
  } = useContext(CommunityContext)
  const [inputNameTip, setInputNameTip] = useState('')
  const [textNameTip, setTextNameTip] = useState('')
  const [imgPreview, setImgPreview] = useState(null)
  const [picture, setPicture] = useState(null)
  const [preview, setPreview] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [choice, setChoice] = useState(false)
  const [width, height] = useWindowSize()
  const [cameraTurn, setCameraTurn] = useState(false)
  const [videoTurn, setVideoTurn] = useState(false)

  const setTextActive = () => {
    const textarea = document.getElementById('textArea')
    textarea.focus()
  }

  const setInputActive = () => {
    const input = document.getElementById('inputArea')
    input.focus()
  }
  const onChangePicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setPicture(file)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setImgPreview(reader.result)
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
        setChoice(false)
      })
    } else {
      setPicture(null)
      setImgPreview(null)
    }
  }

  const removePic = () => {
    setImgPreview(null)
    setPicture(null)
  }

  const createTopic = () => {
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        title: `${inputNameTip}`,
        description: `${textNameTip}`,
        room: `${roomId}`,
        owner: `${userInfo.user.id}`,
      })
    )
    if (picture) {
      formData.append(`files.image`, picture, picture.name || null)
    }
    createNewTopic(formData).then(res => {
      closeModal()
    })
  }

  const closeModal = () => {
    setNewConversationModal(false)
    setEditRecord(null)
  }

  const removeChoice = e => {
    e.preventDefault()
    if (choice) setChoice(false)
  }

  useEffect(() => {
    if (editRecord && editRecord.type === 'topic') {
      let topic = allTopics.find(t => t.id === editRecord.id)
      if (!topic) {
        topic = roomTopics.find(t => t.id === editRecord.id)
      }
      if (topic) {
        setInputNameTip(topic.title || '')
        setTextNameTip(topic.description || '')
        setImgPreview(topic.image || null)
        setPicture(null)
      }
    }
  }, [editRecord])

  const removeModal = e => {
    if (width >= 1080) {
      removeChoice(e)
      e.preventDefault()
    }
  }

  const setPhotoTaken = image => {
    let src, prev
    src = image
    prev = <img src={src} alt="" />
    setPreview(prev)
    setMediaType('IMAGE')
    setCameraTurn(false)
    setImgPreview(image)
  }

  const setVideoTaken = video => {
    let src, prev
    prev = <video src={video} autoPlay loop controls />
    setPreview(prev)
    setMediaType('VIDEO')
    setVideoTurn(false)
    setImgPreview(video)
    console.log('video', video)
  }

  return (
    <Container
      onClick={e => {
        removeModal(e)
      }}
    >
      <Title>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeDesktop={20}
          color="#202122"
        >
          {editRecord ? `EDIT` : `NEW`} CONVERSATION
        </Letter>
      </Title>
      <CloseImg src={CloseIcon} onClick={() => closeModal()} />
      <InputFields>
        <DesktopContain>
          <Letter font="Titillium Bold" size={20} color="#202122">
            Topic
          </Letter>
        </DesktopContain>
        <InputName>
          <NameField
            onChange={e => setInputNameTip(e.target.value)}
            id="inputArea"
            value={inputNameTip}
          />
          <TipNameLetter
            top={inputNameTip !== '' ? 5 : 15}
            size={inputNameTip !== '' ? 11 : 16}
            color={inputNameTip !== '' ? '#A9ACAF' : 'black'}
            font={inputNameTip !== '' ? 'Titillium Web' : 'Titillium Light'}
            onClick={() => setInputActive()}
            display={inputNameTip !== '' ? 'none' : 'block'}
          >
            <Letter>
              {inputNameTip !== ''
                ? 'Topic'
                : 'About what do you want to talk?'}
            </Letter>
          </TipNameLetter>
        </InputName>
        <DesktopContain>
          <Letter font="Titillium Bold" size={20} color="#202122">
            Description
          </Letter>
        </DesktopContain>
        <TextArea>
          <OuterDiv>
            <TextareaAutosize
              minRows={4}
              maxRows={10}
              id="textArea"
              onChange={e => setTextNameTip(e.target.value)}
              value={textNameTip}
            />
          </OuterDiv>
          <TipLetter
            top={textNameTip !== '' ? 4 : 15}
            size={textNameTip !== '' ? 11 : 16}
            color={textNameTip !== '' ? '#A9ACAF' : 'black'}
            font={textNameTip !== '' ? 'Titillium Web' : 'Titillium Light'}
            onClick={() => setTextActive()}
            display={textNameTip !== '' ? 'none' : 'block'}
          >
            <Letter>
              {textNameTip !== ''
                ? 'Description'
                : 'What’s the question or problem that you would like to share with the community?'}
            </Letter>
          </TipLetter>
          {!imgPreview && (
            <Buttons>
              <ButtonImage>
                <DesktopContainer>
                  <UploadButton>
                    <img
                      src={NoImage}
                      alt="NoImage"
                      onClick={() => {
                        setChoice(true)
                        setMediaType('IMAGE')
                      }}
                    />
                  </UploadButton>

                  <div>
                    <Letter font="Titillium Web" size={18} color="#7D7F81">
                      IMAGE
                    </Letter>
                  </div>
                </DesktopContainer>
                <MobileContainer>
                  <UploadButton>
                    <input
                      type="file"
                      id="file1"
                      onChange={onChangePicture}
                      accept="image/*"
                    />
                    <label htmlFor="file1">
                      <img src={NoImage} alt="NoImage" />
                    </label>
                  </UploadButton>
                  <div>
                    <Letter font="Titillium Web" size={18} color="#7D7F81">
                      IMAGE
                    </Letter>
                  </div>
                </MobileContainer>
              </ButtonImage>
              <ButtonVideo>
                <DesktopContainer>
                  <UploadButton>
                    <img
                      src={VideoUploadIcon}
                      alt="NoImage"
                      onClick={() => {
                        setChoice(true)
                        setMediaType('VIDEO')
                      }}
                    />
                  </UploadButton>
                  <div>
                    <Letter font="Titillium Web" size={18} color="#7D7F81">
                      VIDEO
                    </Letter>
                  </div>
                </DesktopContainer>
                <MobileContainer>
                  <UploadButton>
                    <input
                      type="file"
                      id="video2"
                      onChange={onChangePicture}
                      accept="video/*"
                    />
                    <label htmlFor="video2">
                      <img src={VideoUploadIcon} alt="NoImage" />
                    </label>
                  </UploadButton>
                  <div>
                    <Letter font="Titillium Web" size={18} color="#7D7F81">
                      VIDEO
                    </Letter>
                  </div>
                </MobileContainer>
              </ButtonVideo>
            </Buttons>
          )}
          {imgPreview && (
            <ImagePreview>
              {mediaType === 'VIDEO' ? (
                <video src={imgPreview} alt="imgPreview" autoPlay muted />
              ) : (
                <img src={imgPreview} alt="imgPreview" />
              )}
              <DeleteButton>
                <RemoveImg
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => removePic()}
                />
                <div>
                  <Letter font="Titillium Web" size={18}>
                    DELETE IMAGE
                  </Letter>
                </div>
              </DeleteButton>
            </ImagePreview>
          )}
        </TextArea>
      </InputFields>
      {inputNameTip !== '' && textNameTip !== '' && (
        <SendButon onClick={() => createTopic()}>
          <Letter font="Titillium Bold" size={16} color="white">
            START CONVERSATION
          </Letter>
          <img src={SendIcon} alt="SendIcon" />
        </SendButon>
      )}
      {choice && (
        <ChoiceModal
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <Letter font="Titillium Web" size={14} sizeLaptop={20} color="white">
            Choose an action
          </Letter>
          <ItemList>
            <Item>
              {mediaType === 'VIDEO' ? (
                <UploadButton>
                  <input
                    type="file"
                    id="video"
                    onChange={onChangePicture}
                    accept="video/*"
                  />
                  <label htmlFor="video">
                    <img src={VideoUploadIcon} alt="NoImage" />
                  </label>
                </UploadButton>
              ) : (
                <UploadButton>
                  <input
                    type="file"
                    id="file"
                    onChange={onChangePicture}
                    accept="image/*"
                  />
                  <label htmlFor="file">
                    <img src={NoImage} alt="NoImage" />
                  </label>
                </UploadButton>
              )}

              <Letter
                font="Titillium Web"
                size={13}
                sizelaptop={18}
                color="black"
              >
                {' '}
                Upload {mediaType}
              </Letter>
            </Item>
            <DesktopContain>
              <Item>
                {mediaType === 'VIDEO' ? (
                  <img
                    src={CameraImg}
                    onClick={() => {
                      setVideoTurn(true)
                    }}
                  />
                ) : (
                  <img
                    src={CameraImg}
                    onClick={() => {
                      setCameraTurn(true)
                    }}
                  />
                )}
                <Letter
                  font="Titillium Web"
                  size={13}
                  sizelaptop={18}
                  color="black"
                >
                  {' '}
                  Take {mediaType}
                </Letter>
              </Item>
            </DesktopContain>
          </ItemList>
        </ChoiceModal>
      )}
      {cameraTurn && <CameraModal setCallback={setPhotoTaken} />}
      {videoTurn && <RecordModal setCallback={setVideoTaken} />}
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
  padding-bottom: 120px;
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

const SendButon = styled.div`
  cursor: pointer;
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: #ff8c00;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const InputFields = styled.div`
  margin-top: 50px;
  & select {
    height: 54px;
    width: 100%;
    font-family: Titillium Light;
    font-size: 16px;
    padding-left: 16px;
    margin-top: 12px;
  }
  & option {
    height: 54px;
    padding-left: 16px;
  }
  @media ${device.laptop} {
    padding-left: 20px;
  }
`

const InputName = styled.div`
  width: 100%;
  position: relative;
  @media ${device.laptop} {
    width: 80%;
  }
`

const NameField = styled.input`
  & {
    width: 100%;
    height: 54px;
    font-size: 16px;
    font-family: Titillium Web;
    padding-left: 18px;
    padding-top: 10px;
    position: relative;
    background: #f2f2f7;
    border: none;
  }
  & ::placeholder {
    font-size: 16px;
    font-family: Titillium Light;
    padding-top: -10px;
  }
  @media ${device.laptop} {
    background: #f2f2f7;
    height: auto;
    padding: 15px 20px;
    border: none;
    font-size: 20px;
    margin-bottom: 50px;
    & ::placeholder {
      font-size: 20px;
    }
  }
`

const TipLetter = styled.div`
  position: absolute;
  left: 19px;
  top: ${props => props.top}px;
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: ${props => props.font};
  @media ${device.laptop} {
    display: ${props => props.display};
    top: 19px;
    left: 18px;
    width: 75%;
  }
`

const TipNameLetter = styled.div`
  position: absolute;
  left: 19px;
  top: ${props => props.top}px;
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: ${props => props.font};
  @media ${device.laptop} {
    display: ${props => props.display};
    top: 19px;
    left: 18px;
    width: 75%;
  }
`

const TextArea = styled.div`
  position: relative;
  & textarea {
    margin-top: 0px;
    width: 100%;
    height: 200px;
    background: #f2f2f7;
    border: none;
  }
  & textarea:focus {
    outline: none;
  }
  @media ${device.laptop} {
    & textarea {
      background: #f2f2f7;
      border: none;
      font-family: Titillium Light;
      font-size: 20px;
    }
  }
`

const UploadButton = styled.div`
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
  }
`

const Buttons = styled.div`
  position: absolute;
  bottom: 4px;
  left: 20px;
  align-items: center;
  height: 50px;
  & span {
    margin-left: 16px;
    margin-right: 17px;
  }
  display: flex;
  @media ${device.laptop} {
    bottom: 7px;
    display: flex;
    left: 30px;
  }
`

const ImagePreview = styled.div`
  background: #f2f2f7;
  padding: 9px 20px;
  & img {
    max-height: 120px;
    max-width: 50%;
  }
  & video {
    max-height: 120px;
    max-width: 50%;
  }
  margin-left: 0px;
  width: 100%;
  margin-top: -10px;
  display: block;
  align-items: baseline;
  @media ${device.laptop} {
    padding: 18px 20px;
    display: flex;
    width: 80%;
  }
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
`

const RemoveImg = styled.img`
  margin-left: 18px;
  margin-right: 18px;
  width: 20px !important;
  @media ${device.laptop} {
    width: 38px !important;
  }
`

const OuterDiv = styled.div`
  overflow: auto;
  padding: 15px 0 50px 15px;
  height: auto;
  margin-top: 12px;
  margin-bottom: 10px;
  background: #f2f2f7;

  & textarea {
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    resize: none;
    max-height: calc(100vh - 650px);
  }
  @media ${device.laptop} {
    background: #f2f2f7;
    width: 80%;
  }
`

const ButtonImage = styled.div`
  display: flex;
`

const ButtonVideo = styled.div`
  display: flex;
`

const ChoiceModal = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  background: gray;
  width: 100%;
  padding: 16px;
  z-index: 5;
  @media ${device.laptop} {
    width: 100%;
    padding-left: 30px;
  }
`

const ItemList = styled.div``

const Item = styled.div`
  & img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    background: #f2f2f7;
  }
  display: flex;
  margin-top: 10px;
  @media ${device.laptop} {
    & img {
      width: 50px;
      height: 50px;
    }
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
  }
`

const MobileContainer = styled.div`
  display: flex;
  @media ${device.laptop} {
    display: none;
  }
`

export default NewConversationModal
