import React, { useContext } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

import StoreContext from '~/context/StoreContext'

const CoCreated = ({
  coCreatedTitle,
  coCreatedHeading,
  coCreatedParagraph,
  buttonText,
  coCreatedImage,
  desktopCoCreatedImage,
}) => {
  const { setModal } = useContext(StoreContext)
  return (
    <Container>
      <ClaimPart>
        <ClaimBack>
          <DesktopContainer>
            <Image fluid={desktopCoCreatedImage.fluid} />
          </DesktopContainer>
          <MobileContainer>
            <Image fluid={coCreatedImage.fluid} />
          </MobileContainer>
        </ClaimBack>
        <LetterContainer>
          <Letter
            font="Titillium Bold"
            sizeDesktop={80}
            sizeLaptopL={68}
            sizeLaptop={50}
            sizeTablet={41}
            sizeMobileL={44}
            sizeMobileM={38}
            sizeMobileS={34}
            color="white"
          >
            {coCreatedTitle}
          </Letter>
          <SubTitle>
            <Letter
              font="Titillium Black"
              sizeDesktop={42}
              sizeLaptopL={36}
              sizeLaptop={28}
              sizeTablet={24}
              sizeMobileL={26}
              sizeMobileM={24}
              sizeMobileS={20}
              color="white"
            >
              {coCreatedHeading}
            </Letter>
          </SubTitle>
          <Description>
            <Letter
              font="Titillium Web"
              sizeDesktop={30}
              sizeLaptopL={25}
              sizeLaptop={18}
              sizeTablet={16}
              sizeMobileL={18}
              sizeMobileM={16}
              sizeMobileS={14}
              color="white"
            >
              {coCreatedParagraph}
            </Letter>
          </Description>
        </LetterContainer>
        <ClaimButton onClick={() => setModal(true)}>
          <Letter
            font="Titillium Bold"
            sizeDesktop={20}
            sizeLaptop={14}
            sizeLaptopL={17}
            color="white"
          >
            {buttonText}
          </Letter>
        </ClaimButton>
        <Shadow />
      </ClaimPart>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 100px;
  position: relative;
  height: calc(100vw * 1.38);
  @media ${device.mobileS} {
    margin-top: 70px;
  }
  @media ${device.tablet} {
    margin-top: 70px;
    height: calc(100vw * 0.48);
  }
  @media ${device.laptop} {
    margin-top: -10px;
    background: unset;
  }
  @media ${device.laptopL} {
    margin-top: 0px;
  }
  @media ${device.desktop} {
    margin-top: 0px;
  }
`

const ClaimPart = styled.div`
  margin-top: 30px;
  position: relative;
  @media ${device.laptopL} {
    margin-top: -3px;
  }
  @media ${device.desktop} {
    margin-top: 30px;
  }
`

const ClaimBack = styled.div`
  & img {
    width: 100%;
  }
`

const LetterContainer = styled.div`
  z-index: 2;
  position: absolute;
  left: 12%;
  height: 49%;
  bottom: 0px;
  width: 50%;
  @media ${device.mobileS} {
    width: 63%;
    line-height: 1.1;
  }
  @media ${device.laptop} {
    width: 50%;
    line-height: unset;
  }
`

const SubTitle = styled.div`
  margin-top: 22px;
  @media ${device.mobileS} {
    margin-top: 17px;
  }
  @media ${device.mobileM} {
    margin-top: 22px;
  }
  @media ${device.laptop} {
    margin-top: 5px;
  }
  @media ${device.laptopL} {
    margin-top: 5px;
  }
  @media ${device.desktop} {
    margin-top: 22px;
  }
`

const Description = styled.div`
  width: 90%;
  @media ${device.mobileS} {
    width: 100%;
    margin-top: 12px;
  }
  @media ${device.mobileM} {
    margin-top: 15px;
  }
  @media ${device.laptop} {
    width: 90%;
    margin-top: unset;
  }
`

const ClaimButton = styled.div`
  position: absolute;
  bottom: -25px;
  left: 12%;
  height: 86px;
  width: 20%;
  background: #ff8c00;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  cursor: pointer;
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptop} {
    height: 55px;
    display: flex;
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

const Shadow = styled.div`
  position: absolute;
  bottom: -25px;
  left: 12%;
  height: 86px;
  width: 20%;
  background: transparent;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(7px, 7px);
  z-index: 2;
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptop} {
    height: 55px;
    display: flex;
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`
const MobileContainer = styled.div`
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`

export default CoCreated
