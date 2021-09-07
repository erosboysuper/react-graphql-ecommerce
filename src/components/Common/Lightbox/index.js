import React, { useContext } from 'react'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'

import CommunityContext from '~/context/CommunityContext'

const LightboxComponent = () => {
  const { lightboxAsset, setLightboxModal, setLightboxAsset } =
    useContext(CommunityContext)

  return (
    <Container>
      <Lightbox
        mainSrc={lightboxAsset[0]}
        onCloseRequest={() => {
          setLightboxModal(false)
          setLightboxAsset([])
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-self: center;
  background: rgb(0, 0, 0, 0.6);
  cursor: pointer;
`

export default LightboxComponent
