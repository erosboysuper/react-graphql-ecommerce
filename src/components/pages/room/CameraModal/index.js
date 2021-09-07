import React, { useRef, useState, useContext } from 'react'
import styled from 'styled-components'
import { device } from '~/utils/device'
import { Camera } from 'react-camera-pro'
import NewPhotoImg from '~/images/Assets/New photo.svg'
import TurnCameraImg from '~/images/Assets/Turn camera.svg'
import { Letter } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'

const CameraModal = ({ setCallback }) => {
  const { setRecordModal, setCameraModal } = useContext(CommunityContext)
  const [numberOfCameras, setNumberOfCameras] = useState(0)
  const [image, setImage] = useState(null)
  const [showImage, setShowImage] = useState(false)
  const camera = useRef(null)

  return (
    <Contain>
      {showImage ? (
        <React.Fragment>
          <FullScreenImagePreview
            image={image}
            onClick={() => {
              setShowImage(!showImage)
            }}
          />
          <PostButton
            onClick={() => {
              setCallback(image)
            }}
          >
            {' '}
            Continue{' '}
          </PostButton>
          <RetakeButtom onClick={() => setShowImage(false)}>
            {' '}
            Retake{' '}
          </RetakeButtom>
        </React.Fragment>
      ) : (
        <CameraContainer>
          <Camera
            ref={camera}
            aspectRatio="cover"
            numberOfCamerasCallback={setNumberOfCameras}
            errorMessages={{
              noCameraAccessible:
                'No camera device accessible. Please connect your camera or try a different browser.',
              permissionDenied:
                'Permission denied. Please refresh and give camera permission.',
              switchCamera:
                'It is not possible to switch camera to different one because there is only one video device accessible.',
              canvas: 'Canvas is not supported.',
            }}
          />
        </CameraContainer>
      )}
      <Control>
        <SwitchButtons>
          <Letter
            font="Titillium Web"
            size={14}
            color="#A9ACAF"
            onClick={() => {
              setCameraModal(false)
              setRecordModal(true)
            }}
          >
            VIDEO
          </Letter>

          <Letter font="Titillium Bold" size={14} color="white">
            {' '}
            PHOTO
          </Letter>
        </SwitchButtons>
        <CameraControl>
          <TakePhotoButton
            src={NewPhotoImg}
            onClick={() => {
              if (camera.current) {
                const photo = camera.current.takePhoto()
                console.log(photo)
                setImage(photo)
                setShowImage(true)
              }
            }}
          />
          <ChangeFacingCameraButton
            src={TurnCameraImg}
            disabled={numberOfCameras <= 1}
            onClick={() => {
              if (camera.current) {
                const result = camera.current.switchCamera()
                console.log(result)
              }
            }}
          />
        </CameraControl>
      </Control>
    </Contain>
  )
}

const Contain = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  left: 0px;
  top: 0px;
  background: black;
  @media ${device.laptop} {
    & div:first-child {
      width: 80vw;
      height: 100%;
    }
    z-index: 5;
  }
`

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: transparent;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;
  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
  @media (max-width: 400px) {
    padding: 10px;
  }
`

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;
  &:hover {
    opacity: 0.7;
  }
`

const TakePhotoButton = styled.img`
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  border: solid 4px black;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const ChangeFacingCameraButton = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 10px;
  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`

const FullScreenImagePreview = styled.div`
  width: 100%;
  height: 100%;
  z-index: 10;
  position: absolute;
  background-color: black;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const RetakeButtom = styled.button`
  position: fixed;
  bottom: 10%;
  right: 30%;
  color: black;
  background: white;
  z-index: 12;
`

const PostButton = styled.button`
  position: fixed;
  bottom: 10%;
  left: 30%;
  color: black;
  background: white;
  z-index: 12;
`

const CameraControl = styled.div`
  display: flex;
`

const SwitchButtons = styled.div`
  position: fixed;
  left: 20%;
  bottom: 20%;
  & span {
    margin-left: 50px;
  }
`

const CameraContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0 top:0 left:0 right:0;
  bottom: 0px;
  height: 100vh;
  & div:first-child {
    width: 100%;
    height: 100%;
  }
`

export default CameraModal
