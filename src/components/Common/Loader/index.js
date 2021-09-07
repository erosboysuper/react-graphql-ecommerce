import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import LoaderImg from '~/images/Assets/loader-pulse.svg'

const Loader = () => {
  return (
    <Container>
      <img src={LoaderImg} alt="LoaderImg" />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-self: center;
  background: rgb(0, 0, 0, 0.6);
  & > div {
    align-self: center;
  }
  & > img {
    width: 25%;
  }
  @media ${device.laptop} {
    & > img {
      width: 10%;
    }
  }
`

export default Loader
