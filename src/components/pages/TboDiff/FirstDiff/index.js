import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter, Space, Img, MobileContain } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import Gray1Img from '~/images/Assets/01 gray.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const FirstDiff = ({
  coCreationImage,
  coCreationIcon,
  coCreationTitle,
  coCreationDescription,
  joinCommunityButtonText,
  joinCommunityButtonLink,
}) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const _joinCommunityButtonLink =
    reg.test(`${joinCommunityButtonLink}`) ||
    `${joinCommunityButtonLink}`.indexOf('community') !== -1
      ? `${joinCommunityButtonLink}`
      : `/${localeFolder}${joinCommunityButtonLink}`
  return (
    <React.Fragment>
      <Space height={30} />
      <Container>
        <ImageContainer>
          {coCreationImage && (
            <Img fluid={coCreationImage.fluid} alt="Co Crreate" />
          )}
          {coCreationIcon && (
            <TipImage>
              <LazyLoad>
                <img src={coCreationIcon.url} alt="Co Crreate" />
              </LazyLoad>
            </TipImage>
          )}
        </ImageContainer>
        <SecondPart>
          <LazyLoad>
            <img src={Gray1Img} alt="Gray" />
          </LazyLoad>
          <Space1 />
          <CoCreateLetter>
            <Letter
              font="Titillium Web"
              size={36}
              sizeMobileS={29}
              sizeTablet={55}
              sizeLaptop={45}
              sizeLaptopL={55}
              sizeDesktop={66}
              color={darkFont}
            >
              {coCreationTitle}
            </Letter>
          </CoCreateLetter>
          <DesktopContain>
            <LetterContainer>
              <Space height={30} />
              <Letter
                font="Titillium Light"
                size={16}
                sizeTablet={25}
                sizeLaptop={25}
                sizeLaptopL={34}
                sizeDesktop={40}
                dangerouslySetInnerHTML={{
                  __html: coCreationDescription || '',
                }}
              />
              <Space height={10} />
            </LetterContainer>

            <Link to={_joinCommunityButtonLink}>
              <ButtonContainer>
                <Button>
                  {joinCommunityButtonText} <img src={ArrowImg} alt="Arrow" />
                </Button>
              </ButtonContainer>
              <Shadow />
            </Link>
          </DesktopContain>
        </SecondPart>
      </Container>
      <MobileContain>
        <LetterContainer>
          <Space height={30} />
          <Letter
            font="Titillium Light"
            size={16}
            sizeTablet={25}
            dangerouslySetInnerHTML={{ __html: coCreationDescription || '' }}
          />
          <Space height={10} />
        </LetterContainer>

        <Link to={_joinCommunityButtonLink}>
          <ButtonContainer>
            <Button>
              {joinCommunityButtonText} <img src={ArrowImg} alt="Arrow" />
            </Button>
          </ButtonContainer>
          <Shadow />
        </Link>
      </MobileContain>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-top: 50px;
  }
`

const ImageContainer = styled.div`
  & {
    width: 45%;
    position: relative;
  }
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    width: 32%;
  }
  @media ${device.laptopL} {
    width: 34%;
  }
  @media ${device.desktop} {
    width: 34%;
  }
`

const TipImage = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 120px;
  transform: translate(50%, -27%);
  @media ${device.laptop} {
    width: 37%;
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 16px;
    bottom: 10%;
    line-height: 2em;
  }
  & img {
    float: right;
  }
  & span {
    width: 200px;
    display: block;
  }
  @media ${device.mobileS} {
    & img {
      float: right;
      width: 95px;
    }
    & span {
      width: 149px;
      display: block;
    }
  }
  @media ${device.mobileM} {
    & img {
      float: right;
      width: 110px;
    }
    & span {
      width: 181px;
      display: block;
    }
  }
  @media ${device.mobileL} {
    & img {
      float: right;
      width: 118px;
    }
    & span {
      width: 200px;
      display: block;
    }
  }
  @media ${device.tablet} {
    & {
      line-height: 3em;
    }
    & span {
      width: 300px;
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
    & span {
      width: 100%;
      text-align: end;
      float: right;
      margin-top: 20px;
    }
  }
  @media ${device.laptopL} {
    position: relative;
    margin-left: 10%;
    width: 50%;
    & img {
      width: 220px;
    }
    & span {
      width: 100%;
      text-align: end;
      float: right;
      margin-top: 20px;
    }
  }
  @media ${device.desktop} {
    position: relative;
    margin-left: 10%;
    width: 50%;
    & img {
      width: 280px;
    }
    & span {
      width: 100%;
      text-align: end;
      float: right;
      margin-top: 20px;
    }
  }
`

const LetterContainer = styled.div`
  padding: 10px 32px 10px 22px;
  @media ${device.laptop} {
    padding: 0px;
    margin-top: -30px;
  }
  @media ${device.laptopL} {
    padding: 0px;
    margin-top: -30px;
  }
  @media ${device.desktop} {
    padding: 0px;
    margin-top: 60px;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10px);
  @media ${device.laptop} {
    position: relative;
    bottom: -20px;
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
  @media ${device.mobileS} {
    width: 180px;
    height: 50px;
  }
  @media ${device.mobileM} {
    width: 210px;
    height: 60px;
  }

  @media ${device.laptop} {
    width: 220px;
    height: 70px;
    left: 8px;
    bottom: -27px;
    -webkit-transform: unset;
    -ms-transform: unset;
    transform: unset;
  }
  @media ${device.laptopL} {
    width: 240px;
    height: 78px;

    left: 10px;
    bottom: -30px;
    transform: unset;
  }
  @media ${device.desktop} {
    width: 300px;
    height: 100px;

    left: 10px;
    bottom: -30px;
    transform: unset;
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
  @media ${device.mobileS} {
    width: 180px;
    height: 50px;
    font-size: 14px;
  }
  @media ${device.mobileM} {
    width: 210px;
    height: 60px;
    font-size: 16px;
  }
  @media ${device.laptop} {
    & {
      width: 220px;
      height: 70px;
      font-family: Titillium Bold;
      font-size: 16px;
      padding-top: 3px;
      padding-left: 20px;
      text-align: inherit;
    }
    & img {
      width: 13px;
      margin-right: 20px;
    }
  }
  @media ${device.laptopL} {
    & {
      width: 240px;
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
      padding-top: 10px;
    }
  }
  @media ${device.desktop} {
    & {
      width: 300px;
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
      padding-top: 9px;
    }
  }
`
const CoCreateLetter = styled.div`
  @media ${device.laptop} {
    display: inline-block;
    width: 100%;
  }
`

const DesktopContain = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 100%;
    float: right;
    text-align: inherit !important;
    & span {
      text-align: inherit !important;
    }
    & h3 {
      font-size: 25px;
    }
    & p {
      font-size: 22px;
      line-height: 1.3em;
      margin-top: 0px;
    }
  }
  @media ${device.laptopL} {
    display: block;
    width: 100%;
    float: right;
    text-align: inherit !important;
    & span {
      text-align: inherit !important;
    }
    & h3 {
      font-size: 34px;
    }
    & p {
      font-size: 28px;
      line-height: 1.3em;
      margin-top: 30px;
    }
  }
  @media ${device.desktop} {
    display: block;
    width: 100%;
    float: right;
    text-align: inherit !important;
    & span {
      text-align: inherit !important;
    }
    & h3 {
      font-size: 40px;
    }
    & p {
      font-size: 32px;
      line-height: 1.3em;
      margin-top: 30px;
    }
  }
`
const Space1 = styled.div`
  width: 100%;
  height: 100px;
  @media ${device.tablet} {
    height: 175px;
  }
`

export default FirstDiff
