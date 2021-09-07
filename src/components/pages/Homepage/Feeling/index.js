import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { Space, Img } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const Feeling = ({
  bottomBannerImage,
  desktopBottomBannerImage,
  bottomBannerHeadline1,
  bottomBannerHeadline2,
  bottomBannerHeadline3,
  bottomBannerHeadline4,
  showBottomBannerButton,
  bottomBannerButtonText,
  bottomBannerButtonLink,
  bottomBannerLogo,
}) => {
  let source = []
  if (bottomBannerImage && bottomBannerImage.fluid) {
    source.push(bottomBannerImage.fluid)
  }
  if (desktopBottomBannerImage && desktopBottomBannerImage.fluid) {
    source.push({
      ...desktopBottomBannerImage.fluid,
      media: `(min-width: 1024px)`,
    })
  }
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const _bottomBannerButtonLink = reg.test(`${bottomBannerButtonLink}`)
    ? `${bottomBannerButtonLink}`
    : `/${localeFolder}${bottomBannerButtonLink}`
  return (
    <Container>
      <LazyLoad>
        <Logo src={bottomBannerLogo.url} alt="Logo" />
      </LazyLoad>
      <Background>{source.length > 0 && <Img fluid={source} />}</Background>
      <LetterContainer>
        <Title>
          <Letter1
            font="Titillium Web"
            size={32}
            sizeMobileS={26}
            line={46}
            width={`300px`}
            widthDesk={1200}
            sizeTablet={60}
            sizeLaptop={42}
            sizeLaptopL={60}
            sizeDesktop={78}
          >
            <label>{bottomBannerHeadline1}</label>
          </Letter1>
        </Title>
        <Space height={1} />
        <Title1>
          <Letter
            font="Titillium Web"
            size={16}
            sizeMobileS={14}
            width={`300px`}
            widthDesk={1200}
            sizeLaptop={20}
            sizeTablet={25}
            sizeLaptopL={27}
            sizeDesktop={34}
          >
            <span>{bottomBannerHeadline2}</span> &nbsp;
            <span>{bottomBannerHeadline3}</span>
          </Letter>
          <Letter
            size={16}
            width={`300px`}
            widthDesk={800}
            sizeTablet={20}
            sizeLaptop={20}
            sizeLaptopL={27}
            sizeDesktop={34}
          />
        </Title1>
        <Space height={1} />
        <Title2>
          <Letter
            font="Titillium Bold"
            size={16}
            width={`300px`}
            widthDesk={750}
            sizeLaptop={20}
            sizeTablet={20}
            sizeLaptopL={27}
            sizeDesktop={34}
          >
            <span>{bottomBannerHeadline4}</span>
          </Letter>
        </Title2>
        {showBottomBannerButton && (
          <Link to={`${_bottomBannerButtonLink}`}>
            <ButtonContainer>
              <Button>
                {bottomBannerButtonText} <img src={ArrowImg} alt="arrow" />
              </Button>
            </ButtonContainer>
          </Link>
        )}
      </LetterContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  margin-top: 40px;
  @media ${device.laptop} {
    margin-top: 150px;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Title = styled.div`
  margin-left: 12px;
  margin-top: 10px;
  display: inline-block;
  @media ${device.tablet} {
    margin-top: 0px;
  }
  @media ${device.laptop} {
    margin-top: 3px;
  }
  @media ${device.laptopL} {
    margin-top: 15px;
  }
  @media ${device.desktop} {
    margin-top: 30px;
  }
`

const ButtonContainer = styled.div`
  display: inline-block;
  margin-top: 15px;
  @media ${device.tablet} {
    margin-top: 0px;
  }
  @media ${device.laptop} {
    margin-top: 3px;
  }
  @media ${device.laptopL} {
    margin-top: -17px;
  }
  @media ${device.desktop} {
    margin-top: 5px;
  }
`

const Button = styled.button`
  & {
    font-size: 15px;
    padding: 15px 15px 15px 15px;
    margin-top: -10px;
    -webkit-appearance: none;
    font-family: Titillium Bold;
    /* border-radius: 0; */
    background-color: white;
  }

  & img {
    margin-left: 10px;
  }
  @media ${device.mobileS} {
    font-size: 13px;
    padding: 13px;
    & img {
      width: 12px;
    }
  }
  @media ${device.mobileM} {
    font-size: 15px;
    padding: 15px;
    & img {
      width: 14px;
    }
  }

  @media ${device.laptop} {
    width: auto;
    height: 60px;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 15px;
  }

  @media ${device.laptopL} {
    width: auto;
    height: 68px;
    font-size: 19px;
  }
  @media ${device.desktop} {
    width: auto;
    height: 90px;
    font-size: 22px;
  }
`

const Title1 = styled.div`
  margin-left: 12px;
  margin-top: 10px;
  display: inline-block;
  @media ${device.mobileS} {
    margin-top: -5px;
  }
  @media ${device.mobileM} {
    margin-top: 10px;
  }
  @media ${device.mobileL} {
  }
  @media ${device.tablet} {
    margin-top: 0px;
  }
  @media ${device.laptop} {
    margin-top: 3px;
    width: 100%;
  }
  @media ${device.laptopL} {
    margin-top: 15px;
    width: 100%;
  }
  @media ${device.desktop} {
    margin-top: 30px;
  }
`

const Title2 = styled.div`
  display: inline-block;
  @media ${device.mobileS} {
    margin-top: -5px;
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
  }
  @media ${device.tablet} {
    margin-top: 0px;
  }
  @media ${device.laptop} {
    width: 100%;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }
`

const Letter = styled.div`
  display: inline-block;
  font-size: ${props => props.size}px;
  color: black;
  padding: 0px 12px 0px 3px;
  margin-top: ${props => props.top}px;
  font-family: ${props => props.font};
  line-height: ${props => props.line}px;
  max-width: ${props => props.width || undefined};
  @media ${device.mobileM} {
    font-size: ${props =>
      props.sizeMobileM ? props.sizeMobileM : props.size}px;
  }
  @media ${device.mobileS} {
    font-size: ${props =>
      props.sizeMobileS ? props.sizeMobileS : props.size}px;
  }
  @media ${device.mobileL} {
    font-size: ${props =>
      props.sizeMobileL ? props.sizeMobileL : props.size}px;
  }
  @media ${device.tablet} {
    max-width: ${props => props.widthDesk - 100 || undefined}px;
    font-size: ${props => props.sizeTablet}px;
  }
  @media ${device.laptop} {
    max-width: ${props => props.widthDesk || undefined}px;
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    max-width: ${props => props.widthDesk || undefined}px;
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const Letter1 = styled.div`
  display: inline-block;
  font-size: ${props => props.size}px;
  color: black;
  padding: 0px 12px 0px 3px;
  margin-top: ${props => props.top}px;
  font-family: ${props => props.font};
  max-width: ${props => props.width || undefined};
  @media ${device.mobileM} {
    font-size: ${props =>
      props.sizeMobileM ? props.sizeMobileM : props.size}px;
    line-height: 1.5rem;
  }
  @media ${device.mobileS} {
    font-size: ${props =>
      props.sizeMobileS ? props.sizeMobileS : props.size}px;
    line-height: 2rem;
  }
  @media ${device.mobileL} {
    font-size: ${props =>
      props.sizeMobileL ? props.sizeMobileL : props.size}px;
  }
  @media ${device.tablet} {
    max-width: ${props => props.widthDesk - 100 || undefined}px;
    font-size: ${props => props.sizeTablet}px;
    line-height: 1.1em;
  }
  @media ${device.laptop} {
    max-width: ${props => props.widthDesk || undefined}px;
    font-size: ${props => props.sizeLaptop}px;
    line-height: 1.2;
  }
  @media ${device.laptopL} {
    max-width: ${props => props.widthDesk || undefined}px;
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const LetterContainer = styled.div`
  position: absolute;
  height: 51%;
  bottom: 0px;
  left: 0px;
  @media ${device.mobileS} {
    height: 51%;
  }
  @media ${device.mobileM} {
    height: 49%;
  }
  @media ${device.tablet} {
    width: 70%;
    margin-left: 3%;
  }
  @media ${device.laptop} {
    margin-left: 0px;
    left: 13%;
    height: 55%;
  }
`

const Logo = styled.img`
  position: absolute;
  top: 100px;
  left: 13%;
  z-index: 3;
  width: 13%;
  display: none;
  @media ${device.laptop} {
    top: 60px;
    display: block;
  }
  @media ${device.laptopL} {
    top: 80px;
  }
  @media ${device.desktop} {
    top: 100px;
  }
`

export default Feeling
