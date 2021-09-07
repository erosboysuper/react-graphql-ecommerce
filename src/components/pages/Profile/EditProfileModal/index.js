import React, { useContext, useState, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useToasts } from 'react-toast-notifications'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain } from '~/utils/styles'

import ImageCropper from '~/components/Common/ImageCropper'
import CommunityContext from '~/context/CommunityContext'

import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'
import ArrowBackIcon from '~/images/Assets/Arrow-back.svg'

const EditProfileModal = ({ onClose }) => {
  const { addToast } = useToasts()
  const [userData, setUserData] = useState({})
  const [profileImg, setProfileImg] = useState(null)
  const [backgroundImg, setBackgroundImg] = useState(null)
  const [imgField, setImgField] = useState(null)
  const [cropPreview, setCropPreview] = useState(null)
  const [showImageCropper, setShowImageCropper] = useState(false)
  const { userInfo, saveUserData, uploadFiles } = useContext(CommunityContext)

  const onChangeProfilePicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setImgField('image')
        setShowImageCropper(true)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setCropPreview(reader.result)
        })
        reader.readAsDataURL(file)
      })
    } else {
      setImgField(null)
      setShowImageCropper(false)
      setCropPreview(null)
    }
  }

  const onChangeBackgroundPicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setImgField('wall_image')
        setShowImageCropper(true)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setCropPreview(reader.result)
        })
        reader.readAsDataURL(file)
      })
    } else {
      setImgField(null)
      setShowImageCropper(false)
      setCropPreview(null)
    }
  }

  const removePic = () => {
    setImgField(null)
    setCropPreview(null)
    setShowImageCropper(false)
  }

  const saveCroppedImage = image => {
    if (imgField === 'image') {
      setProfileImg(image)
    } else if (imgField === 'wall_image') {
      setBackgroundImg(image)
    }
    setShowImageCropper(false)
  }

  const updateData = (field, value) => {
    setUserData(prevState => {
      return {
        ...prevState,
        [field]: value,
      }
    })
  }

  const saveProfile = () => {
    if (!!userData.first_name.trim() && !!userData.last_name.trim()) {
      const formData = new FormData()
      formData.append(`first_name`, userData.first_name)
      formData.append(`last_name`, userData.last_name)
      formData.append(`description`, userData.description)
      if (profileImg || backgroundImg) {
        const fileData = new FormData()
        if (profileImg) {
          fileData.append(`files`, profileImg)
        }
        if (backgroundImg) {
          fileData.append(`files`, backgroundImg)
        }
        uploadFiles(fileData).then(res => {
          if (profileImg) {
            formData.append(`image`, res[0].id)
          }
          if (backgroundImg) {
            formData.append(
              `wall_image`,
              res.length == 2 ? res[1].id : res[0].id
            )
          }
          saveUser(formData)
        })
      } else {
        saveUser(formData)
      }
    } else {
      if (!userData.first_name.trim()) {
        addToast(`First Name is required.`, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      if (!userData.last_name.trim()) {
        addToast(`Last Name is required.`, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    }
  }
  const saveUser = formData => {
    saveUserData(formData).then(res => {
      if (res && res.id) {
        addToast(`Record saved successfully.`, {
          appearance: 'success',
          autoDismiss: true,
        })
        onClose()
      } else {
        addToast(`Something went wrong. Please refresh the page & re-try.`, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })
  }

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo.user)
    }
  }, [userInfo])

  return (
    <Container>
      <Header background={backgroundImg ? 'transparent' : 'black'}>
        <BackIconDiv>
          <BackIcon src={ArrowBackIcon} alt="arrow" onClick={() => onClose()} />
        </BackIconDiv>
        <Background
          src={
            backgroundImg
              ? URL.createObjectURL(backgroundImg)
              : userInfo.user.wall_image || null
          }
        />
        <ProfileImageShow
          src={
            profileImg
              ? URL.createObjectURL(profileImg)
              : userInfo.user.image || dummyProfilePic
          }
        />
        <LetterPart>
          <UploadImage>
            <input
              type="file"
              id="profilePic"
              onChange={onChangeProfilePicture}
              accept="image/*"
            />
            <label htmlFor="profilePic">
              <Letter
                font="Titillium Bold"
                sizeDesktop={18}
                size={14}
                color="#FF8C00"
              >
                Change Profile Picture
              </Letter>
            </label>
          </UploadImage>
          <UploadImage>
            <input
              type="file"
              id="backgroundPic"
              onChange={onChangeBackgroundPicture}
              accept="image/*"
            />
            <label htmlFor="backgroundPic">
              <Letter
                font="Titillium Bold"
                sizeDesktop={18}
                size={14}
                color="#FF8C00"
              >
                Change Background Picture
              </Letter>
            </label>
          </UploadImage>
        </LetterPart>
      </Header>
      <InputFields>
        <InputField>
          <DesktopContain>
            <Letter font="Titillium Bold" size={20} color="#202122">
              First Name *
            </Letter>
          </DesktopContain>
          <input
            placeholder="First Name *"
            value={userData.first_name || ''}
            onChange={e => updateData(`first_name`, e.target.value)}
          />
        </InputField>
        <InputField>
          <DesktopContain>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Last Name *
            </Letter>
          </DesktopContain>
          <input
            placeholder="Last Name *"
            value={userData.last_name || ''}
            onChange={e => updateData(`last_name`, e.target.value)}
          />
        </InputField>
        <InputField>
          <DesktopContain>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Bio
            </Letter>
          </DesktopContain>
          <TextareaAutosize
            minRows={4}
            maxRows={6}
            maxLength={150}
            id="textArea"
            placeholder="Bio"
            value={userData.description || ''}
            onChange={e => updateData(`description`, e.target.value)}
          />
          <span>{`${userData.description || ''}`.length} / 150</span>
        </InputField>
      </InputFields>
      <UpdateButton onClick={() => saveProfile()}>
        <Letter font="Titillium Bold" size={20} color="white">
          Update Profile
        </Letter>
      </UpdateButton>
      {showImageCropper && (
        <ImageCropper
          image={cropPreview}
          saveAction={saveCroppedImage}
          cancelAction={removePic}
          aspectRatio={imgField === 'wall_image' ? 2.11 : undefined}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background: white;
  z-index: 10;
  bottom: 0px;
  overflow: scroll;
  max-height: 90%;
  padding-bottom: 0px;
  & input {
    height: 54px;
    background: #f2f2f7;
  }
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    max-width: 450px;
    min-height: 100vh;
  }
  @media ${device.laptopL} {
    height: 100%;
    width: 34%;
    right: 0px;
    max-width: unset;
    display: flex;
    flex-direction: column;
    & input {
      height: 62px;
      background: #f2f2f7;
    }
  }
`

const Header = styled.div`
  width: 100%;
  height: 225px;
  position: relative;
  background: ${props => props.background};
  @media ${device.laptop} {
    width: 100%;
    height: 300px;
    position: relative;
  }
`

const ProfileImageShow = styled.img`
  width: 140px;
  height: 140px;
  position: absolute;
  bottom: 0px;
  left: 16px;
  border-radius: 50%;
  transform: translate(0px, 50%);
  @media ${device.laptop} {
    position: absolute;
    bottom: 0px;
    left: 50px;
    transform: translate(0px, 50%);
  }
`

const InputField = styled.div`
  width: 100%;
  margin-top: 30px;
  & input {
    width: 100%;
    height: 54px;
    background: #f2f2f7;
    border: none;
    padding-left: 29px;
  }
  & textarea {
    width: 100%;
    height: 54px;
    background: #f2f2f7;
    border: none;
    padding-left: 29px;
    padding-top: 10px;
  }
  & :first-of-type {
    margin-top: 80px;
  }
  @media ${device.laptop} {
    width: 80%;
    padding-left: 3%;
    & input {
      height: 62px;
    }
  }
`

const UpdateButton = styled.div`
  width: 100%;
  height: 60px;
  background: #ff8c00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 33px;
  cursor: pointer;
  @media ${device.laptop} {
    height: 83px;
    margin-top: 80px;
    width: 80%;
    margin-left: 3%;
  }
`

const InputFields = styled.div`
  margin-top: 20px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 80px;
  @media ${device.laptop} {
    padding-left: unset;
    padding-right: unset;
    margin-top: 10px;
  }
`

const LetterPart = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: -80px;
  right: 17%;
`

const UploadImage = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
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
    width: 100%;
    position: relative;
  }
`

const Background = styled.img`
  width: 100%;
  height: 100%;
`

const BackIconDiv = styled.div`
  position: relative;
`

const BackIcon = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`

export default EditProfileModal
