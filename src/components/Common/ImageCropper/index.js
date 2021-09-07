import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Cropper from 'react-easy-crop'
import { useToasts } from 'react-toast-notifications'

import getCroppedImg from './cropImage'

const ImageCropper = ({
  image,
  saveAction,
  cancelAction,
  aspectRatio = 4 / 3,
}) => {
  const { addToast } = useToasts()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [CroppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, CroppedAreaPixels)
      saveAction(croppedImage)
    } catch (e) {
      addToast(`Something went wrong with this image. Please try again.`, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }, [CroppedAreaPixels])

  return (
    <Container>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        minZoom={0.2}
        aspect={aspectRatio}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <Buttons>
        <Button background={'#FF8C00'} onClick={() => showCroppedImage()}>
          Crop & Save
        </Button>
        <Button background={'white'} onClick={() => cancelAction()}>
          Cancel
        </Button>
      </Buttons>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: white;
  z-index: 100;
  top: 0px;
  left: 0px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 70px;
  overflow-y: auto;
  overflow-x: hidden;
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  width: 100%;
  right: 10px;
  top: 10px;
`

const Button = styled.div`
  cursor: pointer;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 7px;
  margin-right: 20px;
  background: ${props => props.background};
`

export default ImageCropper
