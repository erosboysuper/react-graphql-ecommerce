import React, { useContext, useEffect, useState } from 'react'
// import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import AtMention from '~/components/Common/AtMention'

import SendIcon from '~/images/Assets/Send-contact.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import NoImage from '~/images/Assets/No-Image.svg'

const EditCommentModal = () => {
  const {
    allTopics,
    roomTopics,
    editRecord,
    setEditRecord,
    createNewComment,
    setEditCommentModal,
    roomsData,
  } = useContext(CommunityContext)
  const [roomMembers, setRoomMembers] = useState([])
  const [roomList, setRoomList] = useState([])
  const [textNameTip, setTextNameTip] = useState('')
  const [imgPreview, setImgPreview] = useState(null)
  const [picture, setPicture] = useState(null)

  const setTextActive = () => {
    const textarea = document.getElementById('textArea')
    textarea.focus()
  }

  const onChangePicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setPicture(file)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setImgPreview(reader.result)
        })
        reader.readAsDataURL(file)
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

  const closeModal = () => {
    setEditCommentModal(false)
    setEditRecord(null)
  }

  const saveComment = () => {
    const formData = new FormData()
    formData.append(
      'data',
      JSON.stringify({
        comment: `${textNameTip}`,
      })
    )
    if (picture) {
      formData.append(`files.image`, picture, picture.name || null)
    }
    createNewComment(formData).then(() => {
      closeModal()
    })
  }

  useEffect(() => {
    if (editRecord && editRecord.type === 'comment') {
      let topic = allTopics.find(t => t.id === editRecord.topic_id)
      if (!topic) {
        topic = roomTopics.find(t => t.id === editRecord.topic_id)
      }
      if (topic) {
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
        const comment = topic.comments.find(c => c.id === editRecord.id)
        if (comment) {
          setTextNameTip(comment.comment || '')
          setImgPreview(comment.image || null)
          setPicture(null)
        }
      }
    }
  }, [editRecord])

  return (
    <Container>
      <Title>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeDesktop={20}
          color="#202122"
        >
          EDIT COMMENT
        </Letter>
      </Title>
      <CloseImg src={CloseIcon} onClick={() => closeModal()} />
      <InputFields>
        <DesktopContain>
          <Letter font="Titillium Bold" size={20} color="#202122">
            Comment
          </Letter>
        </DesktopContain>
        <TextArea>
          <OuterDiv>
            {/* <TextareaAutosize
              minRows={4}
              maxRows={10}
              id="textArea"
              onChange={e => setTextNameTip(e.target.value)}
              value={textNameTip}
            /> */}
            <AtMention
              value={textNameTip}
              roomMembers={roomMembers}
              roomList={roomList}
              placeholder="Write a comment..."
              onChange={e => setTextNameTip(e.target.value)}
              additionStyle={{
                control: {
                  marginLeft: '0px',
                },
                '&multiLine': {
                  highlighter: {
                    minHeight: 100,
                    maxHeight: 280,
                    paddingLeft: 20,
                    paddingRight: 15,
                  },
                  input: {
                    minHeight: 100,
                    maxHeight: 280,
                    paddingLeft: 20,
                    paddingRight: 15,
                  },
                },
              }}
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
            <Letter>{textNameTip !== '' ? 'Comment' : ''}</Letter>
          </TipLetter>
          {!imgPreview && (
            <Buttons>
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
              <div>
                <Letter font="Titillium Web" size={18} color="#7D7F81">
                  IMAGE
                </Letter>
              </div>
            </Buttons>
          )}
          {imgPreview && (
            <ImagePreview>
              <img src={imgPreview} alt="imgPreview" />
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
      {textNameTip !== '' && (
        <SendButon onClick={() => saveComment()}>
          <Letter font="Titillium Bold" size={16} color="white">
            SAVE
          </Letter>
          <img src={SendIcon} alt="SendIcon" />
        </SendButon>
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
  padding-bottom: 120px;
  z-index: 15;
  padding-right: 16px;
  @media ${device.laptop} {
    height: 100%;
    width: 33%;
    overflow-x: hidden;
    overflow-y: auto;
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
  justify-content: center;
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
    width: 50%;
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
  padding: 15px 0 50px 0px;
  height: auto;
  max-height: 350px;
  margin-top: 12px;
  margin-bottom: 10px;
  background: #f2f2f7;

  & textarea {
    width: 100%;
    height: auto;
    border: none;
    outline: none;
  }
  @media ${device.laptop} {
    background: #f2f2f7;
    width: 80%;
  }
`

export default EditCommentModal
