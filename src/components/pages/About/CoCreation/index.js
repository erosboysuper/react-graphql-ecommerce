import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import {
  Letter,
  Space,
  Img,
  DesktopContain,
  MobileContain,
} from '~/utils/styles'
import { darkFont, btn_color } from '~/utils/colors'
import StoreContext from '~/context/StoreContext'

import ArrowImg from '~/images/Assets/Arrow-orange.svg'
import CloseMarkImg from '~/images/Assets/Quotation-mark-close.svg'
import OpenMarkImg from '~/images/Assets/Quotation-mark-open.svg'
import { device } from '~/utils/device'

const CoCreation = ({
  highlights,
  coCreationHeading,
  coCreationImage,
  coCreationParagraph1,
  coCreationParagraph2,
  coCreationParagraph3,
  joinCommunityButtonText,
  joinCommunityButtonLink,
  showJoinCommunityButton,
}) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const anchorLink =
    reg.test(`${joinCommunityButtonLink}`) ||
    `${joinCommunityButtonLink}`.indexOf('community') !== -1
      ? `${joinCommunityButtonLink}`
      : `/${localeFolder}${joinCommunityButtonLink}`

  return (
    <React.Fragment>
      <Space height={30} />
      <MarkLetter>
        <OpenTip>
          <LazyLoad>
            <img src={OpenMarkImg} alt="Open Mark " />
          </LazyLoad>
        </OpenTip>
        <Contain>
          <Letter
            font="Titillium Web"
            size={26}
            sizeLaptop={46}
            sizeLaptopL={55}
            sizeDesktop={66}
            color={darkFont}
          >
            {highlights}
          </Letter>
        </Contain>
        <CloseTip>
          <LazyLoad>
            <img src={CloseMarkImg} alt="Close Mark " />
          </LazyLoad>
        </CloseTip>
      </MarkLetter>

      <Space height={20} />
      <Container>
        {coCreationImage && (
          <ImageContainer>
            <Img fluid={coCreationImage.fluid} alt="TBô Co-Creation" />
          </ImageContainer>
        )}
        <SecondPart>
          <MainLetter>
            <Letter
              font="Titillium Web"
              size={36}
              sizeMobileS={28}
              sizeMobileM={33}
              sizeMobileL={36}
              sizeTablet={50}
              sizeLaptop={46}
              sizeLaptopL={55}
              sizeDesktop={66}
              color={darkFont}
            >
              {coCreationHeading}
            </Letter>
          </MainLetter>
          <DesktopContain>
            <LetterContainer>
              <Space height={30} />
              <Letter
                font="Titillium Bold"
                size={20}
                sizeLaptop={25}
                sizeLaptopL={33}
                sizeDesktop={40}
                color={btn_color}
              >
                {coCreationParagraph1}
              </Letter>
              <Space height={10} />
              <Letter
                font="Titillium Bold"
                size={16}
                sizeLaptop={22}
                sizeLaptopL={27}
                sizeDesktop={32}
                color={darkFont}
              >
                {coCreationParagraph2}
              </Letter>
              <Space height={10} />
              <Letter
                font="Titillium Light"
                size={16}
                sizeLaptop={22}
                sizeLaptopL={27}
                sizeDesktop={32}
                color={darkFont}
              >
                {coCreationParagraph3}
              </Letter>
            </LetterContainer>

            {showJoinCommunityButton && (
              <Link to={anchorLink}>
                <ButtonContainer>
                  <Button>
                    {joinCommunityButtonText} <img src={ArrowImg} alt="Arrow" />
                  </Button>
                </ButtonContainer>
                <Shadow />
              </Link>
            )}
          </DesktopContain>
        </SecondPart>
      </Container>
      <MobileContain>
        <LetterContainer>
          <Space height={30} />
          <Letter
            font="Titillium Bold"
            size={20}
            sizeTablet={30}
            color={btn_color}
          >
            {coCreationParagraph1}
          </Letter>
          <Space height={10} />
          <Letter
            font="Titillium Bold"
            size={16}
            sizeTablet={25}
            color={darkFont}
          >
            {coCreationParagraph2}
          </Letter>
          <Space height={10} />
          <Letter
            font="Titillium Light"
            size={16}
            sizeTablet={25}
            color={darkFont}
          >
            {coCreationParagraph3}
          </Letter>
        </LetterContainer>

        {showJoinCommunityButton && (
          <Link to={anchorLink}>
            <ButtonContainer>
              <Button>
                {joinCommunityButtonText} <img src={ArrowImg} alt="Arrow" />
              </Button>
            </ButtonContainer>
            <Shadow />
          </Link>
        )}
      </MobileContain>
    </React.Fragment>
  )
}

const MarkLetter = styled.div`
  & {
    position: relative;
    padding: 10px 32px 10px 22px;
  }
  & span {
    position: relative;
    z-index: 5;
  }
  @media ${device.laptop} {
    width: 75%;
    margin-left: 12.5%;
    margin-top: 40px;
    & span {
      text-align: center;
      position: relative;
    }
  }
  @media ${device.laptopL} {
    margin-left: 17.5%;
    width: 65%;
  }
`

const OpenTip = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
  @media ${device.laptop} {
    width: 130px;
    top: -4px;
    left: 0px;
    & img {
      width: 70%;
    }
  }
  @media ${device.laptopL} {
    left: 0px;
    top: 10px;
    & img {
      width: 84%;
    }
  }
  @media ${device.desktop} {
    left: 50px;
    & img {
      width: 100%;
    }
  }
`

const CloseTip = styled.div`
  position: absolute;
  bottom: 2px;
  right: 13px;
  @media ${device.laptop} {
    width: 130px;
    bottom: -20px;
    right: 130px;
    & img {
      width: 70%;
    }
  }
  @media ${device.laptopL} {
    right: 200px;
    & img {
      width: 84%;
    }
  }
  @media ${device.desktop} {
    right: 90px;
    & img {
      width: 100%;
    }
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-top: 100px;
  }
`

const ImageContainer = styled.div`
  & {
    width: 60%;
    position: relative;
  }
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    width: 34%;
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 16px;
    bottom: -25px;
    background: white;
    line-height: 2em;
    padding: 16px;
    width: 53%;
  }
  & img {
    float: right;
  }
  @media ${device.tablet} {
    bottom: -8px;
    width: 65%;
    padding: 27px;
  }
  @media ${device.laptop} {
    line-height: unset;
    position: relative;
    width: 50%;
    margin-left: 9%;
    right: unset;
    bottom: unset;
    padding: 0px;
    padding-top: 8%;
  }
`

const LetterContainer = styled.div`
  padding: 10px 32px 10px 22px;
  @media ${device.laptop} {
    padding-left: 0px;
    padding-right: 0px;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10px);
  @media ${device.laptop} {
    position: relative;
    margin-top: 20px;
    left: unset;
    transform: unset;
  }
`

const Shadow = styled.div`
  position: absolute;
  width: 210px;
  height: 60px;
  left: 50%;
  transform: translate(-48%, 14px);
  border: 2px solid #202122;
  @media ${device.laptop} {
    width: 220px;
    height: 70px;
    transform: translate(6px, -64px);
    left: unset;
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
    transform: translate(8px, -67px);
    left: unset;
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(10px, -80px);
    left: unset;
  }
`

const Button = styled.button`
  & {
    width: 210px;
    height: 60px;
    background: #202122;
    color: white;
    text-align: center;
  }
  & img {
  }
  @media ${device.laptop} {
    width: 220px;
    height: 70px;
    font-size: 16px;
    font-family: Titillium Bold;
    & img {
      width: 14px;
      padding-top: 7px;
      margin-right: 10px;
    }
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
    font-size: 19px;
    font-family: Titillium Bold;
    & img {
      width: 17px;
      padding-top: 9px;
      margin-right: 10px;
    }
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    font-size: 22px;
    font-family: Titillium Bold;
    & img {
      width: 17px;
      margin-right: 10px;
    }
  }
`
const Contain = styled.div`
  text-align: center;
  @media ${device.laptop} {
    text-align: center;
    font-style: italic;
  }
`

const MainLetter = styled.div`
  @media ${device.laptop} {
    width: 100%;
    text-align: end;
  }
`

export default CoCreation
