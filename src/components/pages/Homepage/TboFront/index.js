import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Img, DesktopContain, IpadContain } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'

const TboFront = ({
  logo,
  bannerImage,
  desktopBannerImage,
  bannerHighlight1,
  bannerHighlight2,
  bannerButtonText,
  bannerButtonLink,
  showBannerButton,
}) => {
  let sources = []
  if (bannerImage && bannerImage.fluid) {
    sources.push(bannerImage.fluid)
  }
  if (desktopBannerImage && desktopBannerImage.fluid) {
    sources.push({
      ...desktopBannerImage.fluid,
      media: `(min-width: 1024px)`,
    })
  }

  const { localeFolder } = useContext(StoreContext)

  const reg = /http(s):/
  const anchorLink = reg.test(`${bannerButtonLink}`)
    ? `${bannerButtonLink}`
    : `/${localeFolder}${bannerButtonLink}`
  return (
    <Container>
      <Background>
        <DesktopContain>
          <Img fluid={desktopBannerImage.fluid} />
        </DesktopContain>
        <MobileContainer>
          <Img fluid={bannerImage.fluid} />
        </MobileContainer>
        <IpadContain>
          <Img fluid={bannerImage.fluid} />
        </IpadContain>
      </Background>
      <Logo>
        <Img fluid={logo.fluid} />
      </Logo>
      <LetterContainer>
        <Title>
          <Letter
            size={26}
            sizeTablet={36}
            sizeLaptop={36}
            sizeLaptopL={40}
            sizeDeskTop={44}
          >
            <h1>
              {bannerHighlight1 || `The First Community-led Menswear Brand`}
            </h1>
          </Letter>
        </Title>
        <br />
        <Title>
          <Letter1 size={36} sizeTablet={46}>
            <h2>
              {bannerHighlight2 ||
                `Join 400,000 men to create comfortable, functional clothing`}
            </h2>
          </Letter1>
        </Title>
      </LetterContainer>
      {showBannerButton && (
        <div>
          <Link to={`${anchorLink}`}>
            <BottomTip>
              <Button>
                <span>{bannerButtonText}</span>
              </Button>
            </BottomTip>
            <ShawdowButton />
          </Link>
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
`

const Background = styled.div`
  & {
    width: 100%;
    height: 100%;
    position: relative;
    margin-bottom: 0px !important;
  }
  & div {
    margin-bottom: 0px !important;
  }
`

const Logo = styled.div`
  position: absolute;
  width: 164px;
  height: 30px;
  top: 45px;
  left: 50%;
  transform: translate(-50%, 0px);
  @media ${device.tablet} {
    width: 230px;
    height: 50px;
    top: 80px;
  }
  @media ${device.laptop} {
    width: 16%;
    height: 55px;
    top: 10%;
  }
`

const Title = styled.div`
  & {
    margin-left: -2px;
    margin-top: 10px;
    display: inline-block;
  }
  @media ${device.mobileS} {
    margin-top: 7px;
  }
  @media ${device.mobileM} {
    margin-top: 10px;
  }
  @media ${device.laptop} {
    margin-top: 0px;
  }

  @media ${device.laptopL} {
    margin-top: 0px;
  }
  @media ${device.desktop} {
    margin-top: 2px;
  }
`

const Letter = styled.div`
  display: inline-block;
  font-size: ${props => props.size}px;
  font-weight: bold;
  padding: 0px 15px 0px 8px;
  font-family: Titillium Web;
  width: 90vw;
  line-height: 1.2;

  span,
  h1 {
    color: #222220;
    font-size: 24px;
    padding: 3px 20px 0px 13px;
    -webkit-box-decoration-break: clone;
    background: white;
    font-family: Titillium Bold;
    display: inline;
    line-height: unset;
  }
  @media ${device.tablet} {
    & {
      padding-left: 60px;
      width: 80vw;
      line-height: 1.5;
    }
    & span,
    h1 {
      font-size: 36px;
      padding: 12px 28px 0px 37px;
    }
  }
  @media ${device.laptop} {
    & {
      padding-left: 80px;
    }
    & span,
    h1 {
      font-size: 30px;
    }
  }
  @media ${device.laptopL} {
    & {
      padding-left: 110px;
    }
  }
  @media ${device.desktop} {
    padding-left: 140px;
    & span,
    h1 {
      font-size: 40px;
    }
  }
`

const Letter1 = styled.div`
  display: inline-block;
  font-size: ${props => props.size}px;
  padding: 0px 15px 0px 8px;
  font-family: Titillium Web;
  width: 90vw;
  line-height: 0.9;

  span,
  h2 {
    color: ${darkFont};
    font-size: 20px;
    padding: 0px 11px 1px 13px;
    -webkit-box-decoration-break: clone;
    background: white;
    font-family: Titillium Web;
    display: inline;
    line-height: unset;
  }
  @media ${device.tablet} {
    & {
      width: 95vw;
      line-height: 1.2;
      padding-left: 60px;
    }
    & span,
    h2 {
      font-size: 40px;
      padding: 0px 48px 5px 37px;
    }
  }
  @media ${device.laptop} {
    & {
      line-height: 1;
      padding-left: 80px;
    }
    & span,
    h2 {
      font-size: 30px;
      padding: 0px 48px 5px 37px;
    }
  }
  @media ${device.laptopL} {
    padding-left: 110px;
  }
  @media ${device.desktop} {
    padding-left: 140px;
  }
`

const LetterContainer = styled.div`
  position: absolute;
  height: 50%;
  bottom: 0px;
  left: 0px;
  @media ${device.tablet} {
    height: 45%;
  }
  @media ${device.laptop} {
    height: 55%;
  }
  @media ${device.desktop} {
    height: 48%;
  }
`

const BottomTip = styled.div`
  position: absolute;
  height: auto;
  bottom: -31px;
  left: 50%;
  transform: translate(-50%, 0px);
  z-index: 3;
  @media ${device.mobileS} {
    bottom: -25px;
  }
  @media ${device.mobileM} {
    bottom: -31px;
  }
  @media ${device.laptop} {
    & {
      left: 80px;
      transform: none;
      bottom: -37px;
    }
  }
  @media ${device.laptopL} {
    & {
      left: 110px;
      transform: none;
      bottom: -45px;
    }
  }
  @media ${device.desktop} {
    left: 140px;
  }
`

const ShawdowButton = styled.div`
  position: absolute;
  width: 190px;
  height: 60px;
  border: 2px solid black;
  bottom: -36px;
  left: 50%;
  transform: translate(-46%, 1px);
  @media ${device.mobileS} {
    width: 170px;
    height: 50px;
    bottom: -29px;
    left: 49.5%;
  }
  @media ${device.mobileM} {
    width: 190px;
    height: 60px;
    bottom: -36px;
    left: 50%;
  }
  @media ${device.laptop} {
    & {
      width: 15vw;
      height: 55px;
      left: 86px;
      bottom: -43px;
      transform: none;
    }
  }

  @media ${device.laptopL} {
    & {
      width: 15vw;
      height: 76px;
      left: 119px;
      bottom: -53px;
      transform: none;
    }
  }
  @media ${device.desktop} {
    height: 90px;
    left: 150px;
    bottom: -55px;
  }
`

const Button = styled.button`
  & {
    font-family: Titillium Bold;
    font-size: 15px;
    color: white;
    background-color: #ff8c00;
    border: none;
    width: 190px;
    height: 60px;
    border: 2px solid black;
  }
  & span {
    letter-spacing: 1px;
  }
  @media ${device.mobileS} {
    width: 170px;
    height: 50px;
  }
  @media ${device.mobileM} {
    width: 190px;
    height: 60px;
  }

  @media ${device.laptop} {
    & {
      width: 15vw;
      height: 55px;
      font-size: 14px;
    }
  }

  @media ${device.laptopL} {
    & {
      width: 15vw;
      height: 76px;
      font-size: 20px;
    }
  }
  @media ${device.desktop} {
    height: 90px;
    font-size: 22px;
  }
`

const MobileContainer = styled.div`
  display: block;
  & div {
    max-height: calc(100vh - 250px);
  }
  @media ${device.tablet} {
    display: none;
  }
`

export default TboFront
