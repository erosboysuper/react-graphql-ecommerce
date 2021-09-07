import Image from 'gatsby-image'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { device } from '~/utils/device'

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
}
html {
  font-family: Titillium Web;
  -ms-text-size-adjust: 100 %;
  -webkit-text-size-adjust: 100 %;
}

#___gatsby {
  overflow-x: hidden;
}
`

export const MobileContain = styled.div`
  display: block;
  @media ${device.laptop} {
    display: none;
  }
`

export const MobileContainer = styled.div`
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`

export const DesktopContain = styled.div`
  display: ${props => (props.displayAll ? 'block' : 'none')};
  @media ${device.laptop} {
    display: block;
  }
`

export const IpadContain = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
  @media ${device.laptop} {
    display: none;
  }
`

export const MobileContainFlex = styled.div`
  display: flex;
  @media ${device.laptop} {
    display: none;
  }
`

export const DesktopContainFlex = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
  }
`

export const Space = styled.div`
  width: 100%;
  height: ${props => props.height}px;
`
export const Letter = styled.span`
  font-family: ${props => props.font};
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  ${props => (props.weight ? `font-weight: ${props.weight};` : ``)}
  @media ${device.mobileS} {
    font-size: ${props =>
      props.sizeMobileS ? props.sizeMobileS : props.size}px;
  }
  @media ${device.mobileM} {
    font-size: ${props =>
      props.sizeMobileM ? props.sizeMobileM : props.size}px;
  }
  @media ${device.mobileL} {
    font-size: ${props =>
      props.sizeMobileL ? props.sizeMobileL : props.size}px;
  }
  @media ${device.tablet} {
    font-size: ${props => (props.sizeTablet ? props.sizeTablet : props.size)}px;
  }
  @media ${device.laptop} {
    font-size: ${props =>
      props.sizeLaptop ? props.sizeLaptop : props.sizeDesktop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props =>
      props.sizeLaptopL ? props.sizeLaptopL : props.sizeDesktop}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

export const Img = styled(Image)`
  max-width: 100 %;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: ${props => (props.hideBottom ? '0px' : '1.45rem')};
`

export const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  @media ${device.laptop} {
    max-width: unset;
  }
`

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr;
  grid-template-rows: 1auto;
  grid-template-areas: 'left . right';

  @media (max-width: ${breakpoints.l}px) {
    display: block;
  }
`

export const GridLeft = styled.div`
  grid-area: left;
`

export const GridRight = styled.div`
  grid-area: right;
`

export const MainContent = styled.main`
  margin-top: 80px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.l}px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`

export const Cover = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: fixed;
  background: black;
  visibility: visible;
  z-index: ${props => props.index};
  opacity: ${props => props.background};
`
