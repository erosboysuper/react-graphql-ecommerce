import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, MobileContain } from '~/utils/styles'

import DesignItem from '~/components/pages/Profile/DesignItem'
import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

const DesignList = ({ closeCB }) => {
  return (
    <Container>
      <MobileContain>
        <img src={ArrowBackImg} onClick={() => closeCB()} />
      </MobileContain>
      <Letter
        font="Titillium Bold"
        sizeDesktop={26}
        sizeLaptopL={23}
        sizeLaptop={20}
        size={20}
        color="#202122"
      >
        Waiting for approval
      </Letter>
      <DesignItem type="design" />
      <Letter
        font="Titillium Bold"
        sizeDesktop={26}
        sizeLaptopL={23}
        sizeLaptop={20}
        size={20}
        color="#202122"
      >
        In Funding
      </Letter>
      <DesignItem type="funding" />
      <Letter
        font="Titillium Bold"
        sizeDesktop={26}
        sizeLaptopL={23}
        sizeLaptop={20}
        size={20}
        color="#202122"
      >
        TBo community
      </Letter>
      <DesignItem type="tbo" />
    </Container>
  )
}

const Container = styled.div`
  padding-left: 0px;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: 5;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  background: white;
  padding-top: 38px;
  overflow-x: hidden;
  @media ${device.laptop} {
    padding-left: 30px;
    position: relative;
    min-height: unset;
    left: unset;
    bottom: unset;
    overflow-y: unset;
    height: unset;
    background: unset;
    z-index: unset;
  }
`

export default DesignList
