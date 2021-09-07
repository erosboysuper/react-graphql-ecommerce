import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import InFundImg from '~/images/Assets/Infunding.svg'

const FundingStatus = () => {
  return (
    <Container>
      <LetterContainer>
        <PriceLetter>
          <Letter
            font="Titillium Bold"
            size={14}
            sizeTablet={16}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            color={darkFont}
          >
            $
          </Letter>
          <Letter
            font="Titillium Bold"
            size={20}
            sizeTablet={22}
            sizeLaptop={20}
            sizeLaptopL={22}
            sizeDesktop={24}
            color={darkFont}
          >
            26.24
          </Letter>
          &nbsp;&nbsp;
        </PriceLetter>

        <Del>
          <Letter
            font="Titillium Web"
            size={16}
            sizeTablet={22}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            color="#A9ACAF"
          >
            $29.34
          </Letter>
        </Del>
      </LetterContainer>
      <ContainProgress>
        <Progress>
          <ProgressBar color={btn_color} value={75}></ProgressBar>
        </Progress>
      </ContainProgress>
      <InfoContain display={'flex'}>
        <br />

        <Letter
          size={14}
          sizeLaptopL={16}
          sizeLaptop={18}
          sizeDesktop={20}
          font="Titillium Web"
          color={darkFont}
        >
          75% founded &nbsp;
        </Letter>
        <Letter
          font="Titillium Bold"
          size={13}
          sizeLaptop={18}
          sizeLaptopL={20}
          color={btn_color}
        >
          24 days left
        </Letter>

        <Letter color="#7D7F81" size={13} sizeLaptopL={14} sizeLaptop={16}>
          30/40 pre orders
        </Letter>
      </InfoContain>
      <TipImage>
        <LazyLoad>
          <Image src={InFundImg} alt="InFundImg" />
        </LazyLoad>
        <TipLetter>IN FUNDING</TipLetter>
      </TipImage>
    </Container>
  )
}

const Container = styled.div`
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

const ContainProgress = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  margin-top: 10px;
  @media ${device.laptop} {
    height: auto;
  }
`

const Progress = styled.div`
  width: 100%;
  height: 10px;
  border: 1px solid gray;
  @media ${device.laptop} {
    height: 10px;
  }
  @media ${device.laptopL} {
    height: 13px;
  }
  @media ${device.desktop} {
    height: 17px;
  }
`
const ProgressBar = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.color};
  border: 5px solid #ff8c00;
  margin-top: -1px;
  margin-left: -2px;
  @media ${device.laptop} {
    border: 5px solid #ff8c00;
  }
  @media ${device.laptopL} {
    border: 6.5px solid #ff8c00;
  }
  @media ${device.desktop} {
    border: 8.5px solid #ff8c00;
  }
`

const LetterContainer = styled.div`
  margin-top: 5px;
  margin-left: 3px;
`

const Del = styled.del`
  & {
    color: #a9acaf;
    text-decoration: none;
    position: relative;
    margin-top: 5px;
  }
  &:before {
    content: ' ';
    display: block;
    width: 90%;
    border-top: 2px solid #a9acaf;
    height: 8px;
    position: absolute;
    bottom: 2px;
    left: 7px;
    transform: rotate(7deg);
  }
`

const PriceLetter = styled.span`
  margin-top: 5px;
`

const InfoContain = styled.div`
  @media ${device.laptop} {
    display: ${props => props.display};
    flex-wrap: wrap;
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

export default FundingStatus
