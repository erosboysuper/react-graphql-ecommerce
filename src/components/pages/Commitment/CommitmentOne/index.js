import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { Link } from 'gatsby'

import { Letter, Space, Img, MobileContain } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import Gray1Img from '~/images/Assets/01 gray.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const CommitmentOne = ({
  section1Title,
  section1SubTitle,
  section1Description,
  section1Button1Text,
  section1Button1Link,
  section1Button2Text,
  section1Button2Link,
  section1Image,
}) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const _section1Button1Link = reg.test(`${section1Button1Link}`)
    ? `${section1Button1Link}`
    : `/${localeFolder}${section1Button1Link}`
  const _section1Button2Link = reg.test(`${section1Button2Link}`)
    ? `${section1Button2Link}`
    : `/${localeFolder}${section1Button2Link}`

  return (
    <React.Fragment>
      <Space height={30} />
      <Container>
        <ImageContainer>
          {section1Image && (
            <LazyLoad>
              <DirectImg>
                {section1Image.fluid ? (
                  <Img fluid={section1Image.fluid} alt="Section 1" />
                ) : (
                  <img src={section1Image.url} alt="Section 1" />
                )}
              </DirectImg>
            </LazyLoad>
          )}
          <MobileContain>
            <LazyLoad>
              <GrayImgOne src={Gray1Img} alt="Gray" />
            </LazyLoad>
          </MobileContain>
        </ImageContainer>
        <SecondPart>
          <DesktopContain>
            <LazyLoad>
              <img src={Gray1Img} alt="Gray" />
            </LazyLoad>
          </DesktopContain>
          <Space1 />
          <CoCreateLetter>
            <Letter
              font="Titillium Web"
              size={30}
              sizeMobileM={28}
              sizeMobileS={26}
              sizeMobileL={30}
              sizeTablet={55}
              sizeLaptop={45}
              sizeLaptopL={55}
              sizeDesktop={66}
              color={darkFont}
            >
              {section1Title}
            </Letter>
          </CoCreateLetter>
          <LetterContainer>
            <Space height={30} />
            <Letter
              font="Titillium Bold"
              sizeDesktop={40}
              sizeLaptopL={32}
              sizeLaptop={25}
              size={20}
              sizeMobileS={18}
              sizeMobileM={19}
              sizeMobileL={20}
              color="#FF8C00"
            >
              {section1SubTitle}
            </Letter>
            <Space height={10} />
          </LetterContainer>
          <Buttons>
            <ButtonContainer>
              <Link to={`${_section1Button1Link}`}>
                <Button>
                  {section1Button1Text} <img src={ArrowImg} alt="Arrow" />
                  <Shadow />
                </Button>
              </Link>
            </ButtonContainer>
            <ButtonContainer>
              <Link to={`${_section1Button2Link}`}>
                <Button>
                  {section1Button2Text} <img src={ArrowImg} alt="Arrow" />
                  <Shadow />
                </Button>
              </Link>
            </ButtonContainer>
          </Buttons>
          <LetterContent>
            <Letter
              font="Titillium Light"
              sizeDesktop={32}
              sizeLaptopL={28}
              sizeLaptop={24}
              sizeMobileS={14}
              sizeMobileM={15}
              sizeMobileL={16}
              color="#202122"
              dangerouslySetInnerHTML={{ __html: section1Description || '' }}
            />
          </LetterContent>
        </SecondPart>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  @media ${device.laptop} {
    margin-top: 50px;
    padding-bottom: 210px;
    display: flex;
  }
`

const DirectImg = styled.div`
  width: 180px;
  @media ${device.tablet} {
    width: 360px;
  }
  @media ${device.laptop} {
    margin-top: 10px;
    width: unset;
  }
`

const ImageContainer = styled.div`
  & {
    width: 45%;
    display: flex;
    position: relative;
    padding-top: 44px;
    padding-bottom: 0px;
  }
  & img {
  }
  @media ${device.laptop} {
    padding-top: 0px;
    padding-bottom: 0px;
    width: 32%;
    display: unset;
  }
  @media ${device.laptopL} {
    width: 34%;
  }
  @media ${device.desktop} {
    width: 35%;
  }
`

const SecondPart = styled.div`
  & img {
    float: right;
  }

  @media ${device.mobileS} {
    & img {
      float: right;
      width: 95px;
    }
  }
  @media ${device.mobileM} {
    & img {
      float: right;
      width: 110px;
    }
  }
  @media ${device.mobileL} {
    & img {
      float: right;
      width: 118px;
    }
  }
  @media ${device.tablet} {
    & {
      line-height: 3em;
    }
    & img {
      width: 230px;
    }
  }
  @media ${device.laptop} {
    position: relative;
    margin-left: 10%;
    width: 56%;
    height: 100%;
    line-height: 2em;
    & img {
      width: 180px;
    }
  }
  @media ${device.laptopL} {
    position: relative;
    margin-left: 10%;
    width: 50%;
    & img {
      width: 220px;
    }
  }
  @media ${device.desktop} {
    position: relative;
    margin-left: 10%;
    width: 50%;
    & img {
      width: 280px;
    }
  }
`

const LetterContainer = styled.div`
  padding: 10px 15px;
  @media ${device.laptop} {
    padding: 0px;
    margin-top: 30px;
  }
  @media ${device.laptopL} {
    padding: 0px;
    margin-top: 30px;
  }
  @media ${device.desktop} {
    padding: 0px;
    margin-top: 30px;
    line-height: 1.3;
  }
`

const ButtonContainer = styled.div`
  position: relative;
  margin-right: 40px;
  margin-bottom: 30px;
  &:first-child {
    @media ${device.laptopL} {
      margin-right: 100px;
    }
  }
  @media ${device.laptop} {
    // margin-right: 100px;
  }
  @media ${device.tablet} {
    margin-bottom: 0px;
  }
`

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 10px;
  top: 10px;
  border: 2px solid black;
  z-index: -1;
`

const Shadow1 = styled.div`
  position: absolute;
  width: 270px;
  height: 60px;
  left: 50%;
  top: -8px;
  transform: translate(-47.5%, 14px);
  border: 2px solid #202122;
  @media ${device.mobileS} {
    width: 240px;
    height: 50px;
  }
  @media ${device.mobileM} {
    width: 270px;
    height: 60px;
  }

  @media ${device.laptop} {
    width: 270px;
    height: 70px;
    left: 8px;
    bottom: -10px;
    -webkit-transform: unset;
    -ms-transform: unset;
    transform: unset;
    top: unset;
  }
  @media ${device.laptopL} {
    width: 300px;
    height: 78px;

    left: 10px;
    bottom: -12px;
    transform: unset;
  }
  @media ${device.desktop} {
    width: 380px;
    height: 100px;

    left: 10px;
    bottom: -10px;
    transform: unset;
  }
`

const Button = styled.div`
  & {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 34px 20px;
    cursor: pointer;
    background: #202122;
    color: white;
  }
  & img {
    width: 13px;
    margin-left: 10px;
  }
  @media ${device.mobileS} {
    font-size: 14px;
    padding: 20px 16px;
  }
  @media ${device.mobileM} {
    font-family: Titillium Bold;
    font-size: 16px;
  }
  @media ${device.laptopL} {
    & {
      font-size: 18px;
      padding: 28px 16px;
    }
    & img {
      width: 17px;
      margin-left: 18px;
    }
  }
  @media ${device.desktop} {
    & {
      font-size: 22px;
    }
    & img {
      margin-left: 30px;
    }
  }
`

const Button1 = styled.div`
  & {
    width: 300px;
    height: 60px;
    background: #202122;
    color: white;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  & img {
    width: 13px;
    margin-right: 10px;
  }
  @media ${device.mobileS} {
    width: 240px;
    height: 50px;
    font-size: 14px;
  }
  @media ${device.mobileM} {
    width: 270px;
    height: 60px;
    font-size: 16px;
  }
  @media ${device.laptop} {
    & {
      width: 270px;
      height: 70px;
      font-family: Titillium Bold;
      font-size: 15px;
      padding-top: 3px;
      padding-left: 20px;
      text-align: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    & img {
      width: 13px;
      margin-right: 20px;
    }
  }
  @media ${device.laptopL} {
    & {
      width: 300px;
      height: 78px;
      font-family: Titillium Bold;
      font-size: 18px;
      padding-top: 3px;
      padding-left: 20px;
      text-align: inherit;
    }
    & img {
      width: 17px;
      margin-right: 18px;
    }
  }
  @media ${device.desktop} {
    & {
      width: 380px;
      height: 100px;
      font-family: Titillium Bold;
      font-size: 22px;
      padding-top: 3px;
      padding-left: 30px;
      text-align: inherit;
    }
    & img {
      width: 17px;
      margin-right: 30px;
    }
  }
`

const CoCreateLetter = styled.div`
  text-align: end;
  padding-right: 16px;
  @media ${device.laptop} {
    display: inline-block;
    width: 100%;
    line-height: 1.3;
    text-align: end;
    padding-right: unset;
  }
`

const DesktopContain = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }
`

const Space1 = styled.div`
  width: 100%;
  height: 10px;
  @media ${device.tablet} {
    height: 175px;
  }
`

const Buttons = styled.div`
  display: flex;
  margin-top: 43px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media ${device.laptop} {
    display: flex;
    flex-wrap: nowrap;
    justify-content: unset;
    align-items: unset;
  }
`

const LetterContent = styled.div`
  margin-top: 50px;
  padding-left: 16px;
  padding-right: 16px;
  @media ${device.laptop} {
    padding-left: unset;
    padding-right: unset;
  }
  @media ${device.desktop} {
    & span {
      line-height: 1.5;
    }
  }
`

const GrayImgOne = styled.img`
  margin-left: 14%;
  padding-top: 150px;
  @media ${device.mobileM} {
    margin-left: 65%;
  }
  @media ${device.mobileL} {
    margin-left: 80%;
  }
  @media ${device.tablet} {
    position: absolute;
    bottom: 29px;
    width: 150px;
    transform: translate(-48px, 9px);
    overflow: hidden;
  }
`

export default CommitmentOne
