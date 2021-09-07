import React, { useRef, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { device } from '~/utils/device'
import NewPhotoImg from '~/images/Assets/New photo.svg'
import StopRecordImg from '~/images/Assets/stoprecord.png'
import TurnCameraImg from '~/images/Assets/Turn camera.svg'
import { Letter } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS,
} from 'react-record-webcam'

const OPTIONS = {
  filename: 'test-filename',
  fileType: 'mp4',
  width: 1920,
  height: 1080,
}

const RecordModal = ({ setCallback }) => {
  const { setRecordModal, setCameraModal } = useContext(CommunityContext)

  const recordWebcam = useRecordWebcam(OPTIONS)

  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording()
    recordWebcam.previewRef.current.load()
    console.log('ss', recordWebcam.previewRef.current.src)
    setCallback(recordWebcam.previewRef.current.src)
    setRecordModal(false)
  }

  const getRecordingFileRenderProp = async blob => {
    console.log({ blob })
  }

  useEffect(() => {
    recordWebcam.open()
  }, [])

  return (
    <Contain>
      <RecordContainer>
        <DemoSection>
          <h1></h1>
          <p></p>
          <Buttons>
            <button
              disabled={
                recordWebcam.status === CAMERA_STATUS.CLOSED ||
                recordWebcam.status === CAMERA_STATUS.RECORDING ||
                recordWebcam.status === CAMERA_STATUS.PREVIEW
              }
              onClick={recordWebcam.start}
            >
              Start recording
            </button>
            <button
              disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
              onClick={recordWebcam.stop}
            >
              Stop recording
            </button>
            <button
              disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
              onClick={recordWebcam.retake}
            >
              Retake
            </button>
            <button
              disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
              onClick={getRecordingFileHooks}
            >
              Get recording
            </button>
          </Buttons>

          <video
            ref={recordWebcam.webcamRef}
            style={{
              display: `${
                recordWebcam.status === CAMERA_STATUS.OPEN ||
                recordWebcam.status === CAMERA_STATUS.RECORDING
                  ? 'block'
                  : 'none'
              }`,
            }}
            autoPlay
            muted
          />
          <video
            ref={recordWebcam.previewRef}
            style={{
              display: `${
                recordWebcam.status === CAMERA_STATUS.PREVIEW ? 'block' : 'none'
              }`,
            }}
            autoPlay
            muted
            loop
          />
        </DemoSection>
      </RecordContainer>
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
  & video {
    width: 100%;
    height: 100%;
  }
  @media ${device.laptop} {
    & div:first-child {
      width: 80vw;
      height: 100%;
    }
    z-index: 5;
  }
`

const DemoSection = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
`

const RecordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw !important;
`

const Buttons = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0);
  z-index: 100;
  & button {
    margin: 10px;
  }
`

export default RecordModal
