import React, { useEffect, useState, useRef } from 'react'

const VideoPage = () => {
  const localStream = useRef(null)
  const cameraRef = useRef(null)
  const [img, setImg] = useState(null)
  const constraints = {
    audio: true,
    // video: true, // BASIC ONE
    video: { width: { min: 600 }, height: { min: 400 } }, // HD Constraints
    // video: { width: { exact: 640 }, height: { exact: 480 } },  // VGA Constraints
  }

  const hasGetUserMedia = () => {
    try {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    } catch (err) {
      return false
    }
  }

  const playVideo = () => {
    if (cameraRef.current) {
      cameraRef.current.play()
    }
  }

  const pauseVideo = () => {
    if (cameraRef.current) {
      cameraRef.current.pause()
    }
  }

  const stopVideo = () => {
    if (cameraRef.current) {
      cameraRef.current.pause()
    }
    console.log('localStream--', localStream)
    if (localStream.current) {
      localStream.current.stop()
    }
  }

  const screeshot = () => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = cameraRef.current.videoWidth
      canvas.height = cameraRef.current.videoHeight
      canvas.getContext('2d').drawImage(cameraRef.current, 0, 0)

      const _img = canvas.toDataURL('image/webp')
      setImg(_img)
    }
  }

  useEffect(() => {
    if (hasGetUserMedia()) {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        cameraRef.current.srcObject = stream
        localStream.current = stream
      })
    } else {
      alert('getUserMedia() is not supported by your browser')
    }
  }, [])

  return (
    <React.Fragment>
      <button onClick={() => playVideo()}>Play</button>
      <button onClick={() => pauseVideo()}>Pause</button>
      <button onClick={() => stopVideo()}>Stop</button>
      <button onClick={() => screeshot()}>Screeshot</button>
      <br />
      <video autoPlay ref={cameraRef} />
      {img && <img src={img} />}
    </React.Fragment>
  )
}

export default VideoPage
