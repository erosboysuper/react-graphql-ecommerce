import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import TboImg from '~/images/Assets/TboCommunity.svg'
import Circle from '~/components/Common/Circle'

const TboStatus = () => {
  return (
    <Container>
      <Letter size={26} font="Titillium Bold" color="#202122">
        $14.99
      </Letter>
      <Letter size={20} font="Titillium Bold" color="#FF8C00">
        45 days until shipping
      </Letter>
      <Letter size={16} font="Titillium Web" color="#A9ACAF">
        M · L
      </Letter>
      <TipImage>
        <LazyLoad>
          <Image src={TboImg} alt="InFundImg" />
        </LazyLoad>
        <TipLetter>IN FUNDING</TipLetter>
      </TipImage>
      <ColorContainer>
        <Circle height={30} width={30} color={'black'} />
      </ColorContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 0px;
  margin-right: 10%;
  padding-top: 5px;
  position: relative;
  min-height: 250px;
  @media ${device.laptop} {
    width: 68%;
    margin-left: 5%;
    padding-top: 35px;
  }
`

const TipImage = styled.div`
  position: absolute;
  top: -5px;
  right: 7%;
  @media ${device.laptop} {
    width: 65px;
    top: -9px;
    right: 4%;
  }
  @media ${device.laptopL} {
    width: 76px;
    top: -19px;
    right: -40%;
  }
  @media ${device.desktop} {
    width: 76px;
    top: -19px;
    right: -40%;
  }
`

const TipLetter = styled.label`
  height: 100px;
  width: 100px;
  color: white;
  transform: rotate(-90deg);
  transform-origin: left top 0;
  position: absolute;
  left: 12px;
  top: 109px;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: Titillium Bold;
  @media ${device.laptop} {
    font-size: 16px;
    width: 200px;
    left: 11px;
    letter-spacing: 3px;
    top: 135px;
  }
  @media ${device.laptopL} {
    font-size: 19px;
    width: 200px;
    left: 14px;
    top: 171px;
    letter-spacing: 4px;
  }
  @media ${device.desktop} {
    font-size: 20px;
    width: 200px;
    left: 16px;
    top: 183px;
    letter-spacing: 5px;
  }
`

const Image = styled.img`
  width: 100%;
  @media ${device.laptop} {
    width: 75%;
  }
  @media ${device.laptopL} {
    width: 80%;
  }
  @media ${device.desktop} {
    width: 100%;
  }
`

const ColorContainer = styled.div`
  display: flex;
`

export default TboStatus
