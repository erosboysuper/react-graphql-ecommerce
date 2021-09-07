import React, { useContext, useEffect, useState, useRef } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { darkFont, btn_color, gray_back } from '~/utils/colors'
import { device } from '~/utils/device'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import ImageCropper from '~/components/Common/ImageCropper'

import CloseIcon from '~/images/Assets/Close-modal.svg'
import SendIcon from '~/images/Assets/Send-contact.svg'
import NoImageIcon from '~/images/Assets/No-Image.svg'
import DesktopNoImage from '~/images/Assets/DESKTOP-No-Image.svg'

const CreateRoomModal = () => {
  const {
    setCreateRoomModal,
    categoryData,
    userInfo,
    createNewRoom,
    editRecord,
    setEditRecord,
    roomsData,
  } = useContext(CommunityContext)

  const inputRef = useRef(null)
  const textRef = useRef(null)
  const [inputNameTip, setInputNameTip] = useState('')
  const [textNameTip, setTextNameTip] = useState('')
  const [emptySelect, setEmptySelect] = useState('')
  const [roomType, setRoomType] = useState('')
  const [showImageCropper, setShowImageCropper] = useState(false)
  const [status, setStatus] = useState(0)
  const [imageSelected, setImageSelected] = useState({
    category: {},
    image: {},
  })
  const [category, setCategory] = useState()
  const [imgPreview, setImgPreview] = useState(null)
  const [cropPreview, setCropPreview] = useState(null)
  const [editRoom, setEditRoom] = useState({})

  const setTextActive = () => {
    textRef.current.focus()
  }

  const setInputActive = () => {
    inputRef.current.focus()
  }

  const createRoom = () => {
    const formData = new FormData()
    const categoryValue = []
    if (category) categoryValue.push(category)
    else categoryValue.push(emptySelect)
    let data = {
      title: `${inputNameTip}`,
      description: `${textNameTip}`,
    }
    if (!editRecord) {
      data.type = `${roomType}`
      data.owner = `${userInfo.user.id}`
      data.categories = categoryValue
    }
    if (imgPreview) {
      formData.append(`files.image`, imgPreview, data.title)
    } else if (imageSelected.image.id) {
      data['image'] = [imageSelected.image.id] || []
    }
    formData.append('data', JSON.stringify(data))
    createNewRoom(formData).then(res => {
      closeModal()
      navigate(`/room/${res.slug}`)
    })
  }

  const setImageActive = (cat, image) => {
    setShowImageCropper(false)
    setImageSelected({ category: cat, image })
    if (window.innerWidth >= 1024) setStatus(0)
    else setStatus(status + 1)
  }

  const onChangePicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setShowImageCropper(true)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setCropPreview(reader.result)
        })
        reader.readAsDataURL(file)
      })
    } else {
      setCropPreview(null)
      setImgPreview(null)
    }
    if (window.innerWidth >= 1024) setStatus(0)
    else setStatus(status + 1)
  }

  const removePic = () => {
    setCropPreview(null)
    setImgPreview(null)
    setShowImageCropper(false)
  }

  const saveCroppedImage = image => {
    setImgPreview(image)
    setShowImageCropper(false)
  }

  const closeModal = () => {
    setCreateRoomModal(false)
    setEditRecord(null)
  }

  useEffect(() => {
    if (editRecord && editRecord.type === 'room') {
      const room = roomsData.find(r => r.id === editRecord.id)
      if (room) {
        const _category = room.categories.map(x => x.id)
        setEditRoom(room)
        setInputNameTip(room.title || '')
        setTextNameTip(room.description || '')
        setRoomType(room.type || '')
        setEmptySelect(_category[0] || '')
        setCategory(_category[0])
      }
    }
  }, [editRecord])

  return (
    <React.Fragment>
      <Container>
        <Header>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeDesktop={20}
            color={darkFont}
          >
            {editRecord ? `EDIT` : `CREATE A`} ROOM
          </Letter>
          <img src={CloseIcon} alt="Close" onClick={() => closeModal()} />
        </Header>
        {status === 0 && (
          <FirstStep>
            <ImagePreview onClick={() => setStatus(status + 1)}>
              {editRecord &&
              editRoom.image &&
              !imgPreview &&
              !imageSelected.image.id ? (
                <img src={editRoom.image} alt="Room Image" />
              ) : (
                <img
                  src={
                    imgPreview
                      ? URL.createObjectURL(imgPreview)
                      : imageSelected.image && imageSelected.image.image
                      ? imageSelected.image.image
                      : DesktopNoImage
                  }
                  alt="Room Image"
                />
              )}
            </ImagePreview>
            <InputFields>
              <DesktopContain>
                <Letter font="Titillium Bold" size={20} color={darkFont}>
                  Room name
                </Letter>
              </DesktopContain>
              <InputName>
                <NameField
                  onChange={e => {
                    if (`${inputNameTip || ''}`.length <= 35) {
                      setInputNameTip(e.target.value)
                    }
                  }}
                  ref={inputRef}
                  value={inputNameTip}
                  maxLength={35}
                />
                <TipLetter
                  top={inputNameTip !== '' ? 5 : 15}
                  size={inputNameTip !== '' ? 11 : 16}
                  color={inputNameTip !== '' ? '#A9ACAF' : 'black'}
                  font={
                    inputNameTip !== '' ? 'Titillium Web' : 'Titillium Light'
                  }
                  onClick={() => setInputActive()}
                >
                  <Letter>
                    {inputNameTip !== ''
                      ? 'Room Name'
                      : 'Give your room a name'}
                  </Letter>
                  {inputNameTip !== '' && (
                    <Letter style={{ float: 'right' }}>
                      {`${inputNameTip || ''}`.length} / 35
                    </Letter>
                  )}
                </TipLetter>
              </InputName>
              <select
                value={emptySelect}
                onChange={e => setEmptySelect(e.target.value)}
                disabled={editRecord ? true : false}
              >
                <option value="" disabled>
                  Select a Category{' '}
                </option>
                {categoryData.map(item => {
                  if (item.id > 0) {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    )
                  }
                })}
              </select>
              <DesktopContain>
                <Letter font="Titillium Bold" size={20} color={darkFont}>
                  Categories
                </Letter>
              </DesktopContain>
              <DesktopContainer>
                {editRecord && <NoSelection />}
                {categoryData.map(item => {
                  if (item.id > 0) {
                    return (
                      <CategoryContainer
                        key={item.id}
                        onClick={() => setCategory(item.id)}
                        active={item.id === category ? true : false}
                      >
                        <Letter font="Titillium Web" size={20}>
                          {item.title}
                        </Letter>
                      </CategoryContainer>
                    )
                  }
                })}
              </DesktopContainer>
              <DesktopContain>
                <Letter font="Titillium Bold" size={20} color={darkFont}>
                  About the room
                </Letter>
              </DesktopContain>
              <TextArea>
                <OuterDiv>
                  <textarea
                    onChange={e => setTextNameTip(e.target.value)}
                    ref={textRef}
                    value={textNameTip}
                  />
                </OuterDiv>
                <TipLetter
                  top={textNameTip !== '' ? 5 : 10}
                  size={textNameTip !== '' ? 11 : 16}
                  color={textNameTip !== '' ? '#A9ACAF' : 'black'}
                  font={
                    textNameTip !== '' ? 'Titillium Web' : 'Titillium Light'
                  }
                  onClick={() => setTextActive()}
                >
                  <Letter>
                    {textNameTip !== ''
                      ? 'About the Room'
                      : 'What’s the room about? What would you like to discuss here?'}
                  </Letter>
                </TipLetter>
              </TextArea>
            </InputFields>
            <Buttons>
              {editRecord && <NoSelection />}
              <PrivateButton
                onClick={() => setRoomType('private')}
                background={roomType === 'private' ? '#FF8C00' : 'white'}
              >
                <Letter
                  font="Titillium Web"
                  size={14}
                  sizeLaptop={15}
                  sizeLaptopL={17}
                  sizeDesktop={20}
                  color={roomType === 'private' ? 'white' : '#161617'}
                >
                  PRIVATE ROOM
                </Letter>
                <Letter
                  font="Titillium Web"
                  size={12}
                  sizeLaptopL={12}
                  sizeDesktop={14}
                  color={roomType === 'private' ? 'white' : '#7D7F81'}
                >
                  Only members can read post
                </Letter>
              </PrivateButton>
              <PublicButton
                onClick={() => setRoomType('public')}
                background={roomType === 'public' ? '#FF8C00' : 'white'}
              >
                <Letter
                  font="Titillium Web"
                  size={14}
                  sizelaptopL={17}
                  sizeDesktop={20}
                  color={roomType === 'public' ? 'white' : '#161617'}
                >
                  Public ROOM
                </Letter>
                <Letter
                  font="Titillium Web"
                  size={12}
                  sizeLaptopL={12}
                  sizeDesktop={14}
                  color={roomType === 'public' ? 'white' : '#7D7F81'}
                >
                  Anyone can read the post
                </Letter>
              </PublicButton>
            </Buttons>
            <MobileContain>
              <SaveButton
                onClick={() =>
                  emptySelect !== '' &&
                  inputNameTip !== '' &&
                  textNameTip !== '' &&
                  roomType !== ''
                    ? setStatus(status + 1)
                    : null
                }
                isActive={
                  emptySelect !== '' &&
                  inputNameTip !== '' &&
                  textNameTip !== '' &&
                  roomType !== ''
                }
              >
                <Letter font="Titillium Bold" size={16}>
                  Continue
                </Letter>
                <img src={SendIcon} alt="Plus" />
              </SaveButton>
            </MobileContain>
            <DesktopSaveButton
              onClick={() =>
                category &&
                inputNameTip !== '' &&
                textNameTip !== '' &&
                roomType !== ''
                  ? createRoom()
                  : null
              }
              isActive={
                category &&
                inputNameTip !== '' &&
                textNameTip !== '' &&
                roomType !== ''
              }
            >
              <Letter font="Titillium Bold" size={16}>
                Save New Room
              </Letter>
              <img src={SendIcon} alt="Plus" />
            </DesktopSaveButton>
          </FirstStep>
        )}
        {status >= 1 && (
          <SecondStep>
            <Title>
              <Letter font="Titillium Bold" size={18} color={darkFont}>
                Select a room image or upload your own image
              </Letter>
            </Title>
            {categoryData.map(item => {
              if (item.images && item.images.length > 0) {
                return (
                  <React.Fragment key={item.id}>
                    <SubTitle>
                      <Letter font="Titillium Bold" size={14} color={darkFont}>
                        {item.title}
                      </Letter>
                    </SubTitle>
                    <ImageSlider>
                      <ImageContainer width={item.images.length}>
                        {item.images.map(img => {
                          return (
                            <LazyLoad key={img.id}>
                              <ImageShow
                                src={img.image}
                                alt="image"
                                onClick={() => setImageActive(item, img)}
                                border={
                                  imageSelected.category.id === item.id &&
                                  imageSelected.image.id === img.id
                                    ? '4px'
                                    : '0px'
                                }
                              />
                            </LazyLoad>
                          )
                        })}
                      </ImageContainer>
                    </ImageSlider>
                  </React.Fragment>
                )
              }
            })}
            {status === 1 &&
              (imgPreview ? (
                <ImagePreview>
                  <img src={URL.createObjectURL(imgPreview)} alt="imgPreview" />
                  <DeleteButton>
                    <RemoveImg
                      src={CloseIcon}
                      alt="CloseIcon"
                      onClick={() => removePic()}
                    />
                    <DesktopContain>
                      <Letter font="Titillium Web" size={18}>
                        DELETE IMAGE
                      </Letter>
                    </DesktopContain>
                  </DeleteButton>
                </ImagePreview>
              ) : (
                <UploadImage>
                  <input
                    type="file"
                    id="roomFile"
                    onChange={onChangePicture}
                    accept="image/*"
                  />
                  <label htmlFor="roomFile">
                    <img src={NoImageIcon} alt="NoImageIcon" />
                    <Letter font="Titillium Bold" size={16} color="#A9ACAF">
                      UPLOAD AN IMAGE
                    </Letter>
                  </label>
                </UploadImage>
              ))}
            {status > 1 && (
              <SaveButton onClick={() => createRoom()}>
                <Letter font="Titillium Bold" size={16} color="white">
                  Save New Room
                </Letter>
                <img src={SendIcon} alt="Plus" />
              </SaveButton>
            )}
          </SecondStep>
        )}
      </Container>
      {showImageCropper && (
        <ImageCropper
          image={cropPreview}
          saveAction={saveCroppedImage}
          cancelAction={removePic}
        />
      )}
    </React.Fragment>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: auto;
  background: white;
  z-index: 12;
  bottom: 0px;
  left: 0px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 70px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 90%;
  @media ${device.laptop} {
    width: 40%;
    min-height: 100vh;
    left: unset;
    right: 0px;
    padding-left: 3%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: unset;
  }
  @media ${device.laptopL} {
  }
  @media ${device.laptop} {
    width: 33%;
  }
`

const Header = styled.div`
  padding-top: 23px;
  text-align: center;
  position: relative;
  & img {
    position: absolute;
    right: 0px;
    top: 24px;
  }
  @media ${device.laptop} {
    padding-right: 20%;
    & img {
      left: 0px;
    }
  }
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
    & input {
      background: #f2f2f7;
    }
    & select {
      width: 80%;
      background: #f2f2f7;
      display: none;
    }
  }
`

const InputName = styled.div`
  width: 100%;
  position: relative;
  @media ${device.laptop} {
    margin-bottom: 60px;
    margin-top: 10px;
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
  }
  & ::placeholder {
    font-size: 16px;
    font-family: Titillium Light;
    padding-top: -10px;
  }
  @media ${device.laptop} {
    width: 80%;
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
    width: 65%;
  }
`

const TextArea = styled.div`
  position: relative;
  & textarea {
    width: 100%;
    height: 140px;
    border: none;
    outline: none;
  }
  @media ${device.laptop} {
    & textarea {
      background: #f2f2f7;
      margin-bottom: 50px;
    }
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
  @media ${device.laptop} {
    width: 80%;
  }
`

const NoSelection = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(251 251 251 / 50%);
`

const PrivateButton = styled.div`
  cursor: pointer;
  width: 48%;
  height: 54px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 7px;
  padding-bottom: 7px;
  background: ${props => props.background};
  @media ${device.laptop} {
    width: 48%;
    height: auto;
  }
`

const PublicButton = styled.div`
  cursor: pointer;
  width: 48%;
  height: 54px;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-top: 7px;
  padding-bottom: 7px;
  background: ${props => props.background};
  @media ${device.laptop} {
    width: 48%;
    height: auto;
  }
`

const SaveButton = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  left: 0px;
  height: 83px;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : '#a9a7a7')};
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    position: absolute;
    right: 20px;
    top: 31px;
  }
  @media ${device.laptop} {
    position: relative;
    width: 83%;
  }
`

const DesktopSaveButton = styled.div`
  position: relative;
  cursor: pointer;
  width: 80%;
  bottom: 0px;
  left: 0px;
  height: 83px;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : '#a9a7a7')};
  justify-content: center;
  align-items: center;
  & img {
    position: absolute;
    right: 20px;
    top: 31px;
  }
  display: none;
  @media ${device.laptop} {
    display: flex;
  }
`

const FirstStep = styled.div``

const SecondStep = styled.div``

const Title = styled.div`
  margin-top: 30px;
`

const SubTitle = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`

const ImageSlider = styled.div`
  width: 107%;
  overflow: hidden;
  margin-bottom: 40px;
`

const ImageContainer = styled.div`
  width: auto;
  display: flex;
  overflow: auto;
  overflow-y: hidden;
`

const ImageShow = styled.img`
  height: 100px;
  cursor: pointer;
  margin-right: 18px;
  border: ${props => props.border} solid #f29135;
  @media ${device.laptop} {
    height: 164px;
  }
`

const UploadImage = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 83px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: #f2f2f7;
  & img {
    position: absolute;
    left: 20px;
    width: 28px;
  }
  & input[type='file'] {
    display: none;
  }
  & label {
    cursor: pointer;
  }
  @media ${device.laptop} {
    width: 80%;
    position: relative;
  }
`

const ImagePreview = styled.div`
  width: 80%;
  height: 400px;
  align-items: center;
  justify-content: center;
  display: none;
  background: #f2f2f7;
  cursor: pointer;
  & img {
    width: 80%;
    margin: 10%;
  }
  @media ${device.laptop} {
    display: flex;
    margin-top: 40px;
    height: 250px;
  }
  @media ${device.laptopL} {
    height: 300px;
    margin-top: 60px;
  }
  @media ${device.desktop} {
    height: 400px;
    margin-top: 90px;
  }
`

const CategoryContainer = styled.div`
  cursor: pointer;
  height: auto;
  border-radius: 30px;
  padding: 10px 30px;
  border: ${props => (props.active ? 0 : 1)}px solid #a9acaf;
  margin-right: 6px;
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 5px;
  background: ${props => (props.active ? '#FF8C00' : 'white')};
  color: ${props => (props.active ? 'white' : '#7D7F81')};
`

const DesktopContainer = styled.div`
  display: none;
  position: relative;
  @media ${device.laptop} {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
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
  padding: 15px 0 0 15px;
  height: 170px;
  border: 1px solid #aaa;
  margin-top: 12px;
  margin-bottom: 10px;
  @media ${device.laptop} {
    width: 80%;
    background: #f2f2f7;
  }
`

export default CreateRoomModal
