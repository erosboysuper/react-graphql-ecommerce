import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { Link } from 'gatsby'

import { Letter, Space, Img, MobileContain } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import Gray3Img from '~/images/Assets/03 gray.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const CommitmentThree = ({
  section3Title,
  section3SubTitle,
  section3Description,
  section3ButtonText,
  section3ButtonLink,
  section3Image,
  section3Icon,
}) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const _section3ButtonLink = reg.test(`${section3ButtonLink}`)
    ? `${section3ButtonLink}`
    : `/${localeFolder}${section3ButtonLink}`
  return (
    <React.Fragment>
      <Space height={30} />
      <Container>
        <MobileContain>
          {section3Icon && (
            <LazyLoad>
              <PlanetImg>
                {section3Icon.fluid ? (
                  <Img fluid={section3Icon.fluid} alt="Planet Logo" />
                ) : (
                  <img src={section3Icon.url} alt="Planet Logo" />
                )}
              </PlanetImg>
            </LazyLoad>
          )}
        </MobileContain>
        {section3Image && (
          <ImageContainer>
            {section3Image.fluid ? (
              <Img fluid={section3Image.fluid} alt="Section 3" />
            ) : (
              <img src={section3Image.url} alt="Section 3" />
            )}
          </ImageContainer>
        )}
        <SecondPart>
          <LazyLoad>
            <img src={Gray3Img} alt="Gray" />
          </LazyLoad>
          <DesktopContain>
            {section3Icon && (
              <LazyLoad>
                <PlanetImg>
                  {section3Icon.fluid ? (
                    <Img fluid={section3Icon.fluid} alt="Planet Logo" />
                  ) : (
                    <img src={section3Icon.url} alt="Planet Logo" />
                  )}
                </PlanetImg>
              </LazyLoad>
            )}
          </DesktopContain>
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
              {section3Title}
            </Letter>
          </CoCreateLetter>
          <LetterContainer>
            <Space height={30} />
            <Letter
              font="Titillium Bold"
              sizeDesktop={40}
              sizeLaptopL={36}
              sizeLaptop={32}
              sizeMobileS={18}
              sizeMobileM={19}
              sizeMobileL={20}
              color="#FF8C00"
            >
              {section3SubTitle}
            </Letter>
            <Space height={10} />
            <Letter
              font="Titillium Light"
              sizeDesktop={32}
              sizeLaptopL={29}
              sizeLaptop={26}
              sizeMobileS={16}
              sizeMobileM={17}
              sizeMobileL={18}
              color="#202122"
              dangerouslySetInnerHTML={{ __html: section3Description || '' }}
            />
          </LetterContainer>
          {section3ButtonText !== '' && (
            <Buttons>
              <ButtonContainer>
                <Link to={`${_section3ButtonLink}`}>
                  <Button>
                    {section3ButtonText}
                    <img src={ArrowImg} alt="Arrow" />
                  </Button>
                  <Shadow1 />
                </Link>
              </ButtonContainer>
            </Buttons>
          )}
        </SecondPart>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  @media ${device.laptop} {
    margin-top: 150px;
    padding-bottom: 210px;
    display: flex;
  }
`

const ImageContainer = styled.div`
  & {
    width: 45%;
    position: relative;
  }
  @media ${device.laptop} {
    width: 32%;
  }
  @media ${device.laptopL} {
    width: 34%;
  }
  @media ${device.desktop} {
    width: 35%;
  }
`

const SecondPart = styled.div`
  & {
    position: relative;
    line-height: 2em;
    margin-top: -97px;
  }
  & img {
    float: right;
  }

  @media ${device.mobileS} {
    & img {
      float: right;
      width: 95px;
      margin-right: 16px;
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
      margin-top: -180px;
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
    margin-top: 0px;
    & img {
      width: 180px;
      margin-right: unset;
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
  padding: 10px 32px 10px 22px;
  & span {
    line-height: 1.4;
  }
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
  margin-right: 0px;
  @media ${device.laptop} {
    margin-right: 100px;
  }
`

const Shadow1 = styled.div`
  position: absolute;
  width: 240px;
  height: 60px;
  left: 50%;
  top: -8px;
  transform: translate(-48%, 14px);
  border: 2px solid #202122;
  @media ${device.mobileS} {
    width: 250px;
    height: 50px;
  }
  @media ${device.mobileM} {
    width: 270px;
    height: 60px;
  }

  @media ${device.laptop} {
    width: 370px;
    height: 70px;
    left: 8px;
    top: unset;
    bottom: -10px;
    -webkit-transform: unset;
    -ms-transform: unset;
    transform: unset;
  }
  @media ${device.laptopL} {
    width: 400px;
    height: 78px;

    left: 10px;
    bottom: -10px;
    transform: unset;
  }
  @media ${device.desktop} {
    width: 500px;
    height: 100px;

    left: 10px;
    bottom: -10px;
    transform: unset;
  }
`

const Button = styled.div`
  & {
    width: 240px;
    height: 60px;
    background: #202122;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  }
  & img {
    width: 13px;
    margin-right: 10px;
  }
  @media ${device.mobileS} {
    width: 250px;
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
      width: 370px;
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
      padding-top: 0px;
    }
  }
  @media ${device.laptopL} {
    & {
      width: 400px;
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
      width: 500px;
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
  margin-top: 10px;
  text-align: end;
  margin-right: 16px;
  width: 75%;
  margin-left: 15%;
  @media ${device.laptop} {
    display: inline-block;
    width: 100%;
    line-height: 1.3;
    text-align: end;
    margin-left: unset;
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
  height: 100px;
  @media ${device.tablet} {
    height: 175px;
  }
`

const Buttons = styled.div`
  display: flex;
  margin-top: 43px;
  justify-content: center;
  @media ${device.laptop} {
    justify-content: unset;
  }
`

const PlanetImg = styled.div`
  float: left;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 35%;
  @media ${device.laptop} {
    float: left;
    position: absolute;
    top: 50px;
    width: unset;
    right: unset;
  }
`

export default CommitmentThree
