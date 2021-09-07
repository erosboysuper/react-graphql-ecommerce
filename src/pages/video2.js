import React, { useEffect, useRef } from 'react'
import RecordRTC from 'recordrtc'

// import { storage } from '~/utils/firebase'

const hasGetUserMedia = !!(
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
)

const Video2Page = () => {
  const videoRef = useRef(null)
  const recordVideo = useRef(null)

  // handle user media capture
  const captureUserMedia = callback => {
    const params = { audio: false, video: true }

    navigator.getUserMedia(params, callback, error => {
      alert(JSON.stringify(error))
    })
  }

  const requestUserMedia = () => {
    console.log('===requestUserMedia===')
    captureUserMedia(stream => {
      console.log('===stream===', stream)
      videoRef.current.srcObject = stream
    })
  }

  const startRecord = () => {
    captureUserMedia(stream => {
      recordVideo.current = RecordRTC(stream, { type: 'video' })
      recordVideo.current.startRecording()
    })

    setTimeout(() => stopRecord(), 4000)
  }

  const stopRecord = () => {
    recordVideo.current.stopRecording(() => {
      const params = {
        type: 'video/webm',
        data: recordVideo.current.blob,
        id: Math.floor(Math.random() * 90000) + 10000,
      }
      console.log('params--', params)
      // uploadToFirebase(params)
    })
  }

  // const uploadToFirebase = params => {
  //   storage
  //     .ref(`video-files/test_${params.id}.webm`)
  //     .put(params.data)
  //     .on(
  //       'state_changed',
  //       snapshot => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         )
  //         console.log('progress===', progress)
  //       },
  //       error => {
  //         console.log('error===', error)
  //       },
  //       () => {
  //         // complete function ...
  //         storage
  //           .ref(`video-files`)
  //           .child(`test_${params.id}.webm`)
  //           .getDownloadURL()
  //           .then(url => {
  //             console.log('url===', url)
  //           })
  //       }
  //     )
  // }

  useEffect(() => {
    if (!hasGetUserMedia) {
      alert(
        'Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.'
      )
      return
    }
    requestUserMedia()
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => startRecord()}>Start Record</button>
      </div>
      <div>
        <video autoPlay muted ref={videoRef} />
      </div>
    </div>
  )
}

export default Video2Page
