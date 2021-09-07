import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import LinesEllipsis from 'react-lines-ellipsis'
import Image from 'gatsby-image'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { DesktopContain, MobileContain } from '~/utils/styles'
import {
  btn_color,
  collMenuBgInActive,
  collMenuBorderInActive,
} from '~/utils/colors'

import MoreDetail from '~/images/Assets/Moredetails.svg'
import LessDetail from '~/images/Assets/Less-details.svg'
import DesktopMoreDetail from '~/images/Assets/DESKTOP-More-details.svg'
import DesktopLessDetail from '~/images/Assets/DESKTOP-Less-details.svg'

const FrontIn = ({
  pageTitle,
  pageDescription,
  bannerImage,
  desktopBannerImage,
  position: active,
}) => {
  const { locale, localeFolder } = useContext(StoreContext)
  const { menuItems_en, menuItems_de, menuItems_ch } = useStaticQuery(graphql`
    query {
      menuItems_en: allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true }, locale: { eq: "en" } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            ...menuItems_commonFields
          }
        }
      }
      menuItems_de: allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true }, locale: { eq: "de" } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            ...menuItems_commonFields
          }
        }
      }
      menuItems_ch: allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true }, locale: { eq: "en-CH" } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            ...menuItems_commonFields
          }
        }
      }
    }
    fragment menuItems_commonFields on DatoCmsCollectionPage {
      id
      handle
      title
      position
      menuIcon {
        url
      }
    }
  `)
  let menuItems = {}
  if (locale === 'en') {
    menuItems = menuItems_en
  } else if (locale === 'de') {
    menuItems = menuItems_de
  } else if (locale === 'en-CH') {
    menuItems = menuItems_ch
  }

  const [clicked, setClicked] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const [hideButton1, setHideButton1] = useState(false)

  const doClick = () => {
    if (clicked === false) {
      setClicked(true)
    } else {
      setClicked(false)
    }
  }
  let sources = []
  if (bannerImage && bannerImage.fluid) {
    sources.push(bannerImage.fluid)
  }
  if (desktopBannerImage && desktopBannerImage.fluid) {
    sources.push({
      ...desktopBannerImage.fluid,
      media: `(min-width: 768px)`,
    })
  }

  const handleReflow = rleState => {
    const { clamped } = rleState
    if (clamped === true) setHideButton(false)
    else setHideButton(true)
  }
  const handleReflow1 = rleState => {
    const { clamped } = rleState
    if (clamped === true) setHideButton1(false)
    else setHideButton1(true)
  }

  return (
    <Container>
      <DesktopFlex>
        <ContainerImage>
          <Background>
            {/* {sources.length > 0 && <Img fluid={sources} />} */}
            <DesktopContain>
              {desktopBannerImage && <Img fluid={desktopBannerImage.fluid} />}
            </DesktopContain>
            <MobileContain>
              {bannerImage && <Img fluid={bannerImage.fluid} />}
            </MobileContain>
          </Background>
          <LetterBox>
            <LabelTitle
              size={32}
              sizeMobileM={30}
              sizeMobileS={26}
              sizeTablet={40}
              sizeDesktop={54}
              font="Titillium Web"
            >
              {pageTitle}
            </LabelTitle>
          </LetterBox>
        </ContainerImage>
        <br />
        <FlexBoxDesktop>
          <LetterBoxDesktop>
            <LabelTitle
              size={32}
              sizeTablet={40}
              sizeDesktop={54}
              font="Titillium Web"
            >
              {pageTitle}
            </LabelTitle>
          </LetterBoxDesktop>
          {pageDescription && (
            <SubTitle>
              <MobileEllips>
                <LinesEllipsis
                  text={pageDescription || ''}
                  maxLine={clicked ? 100 : 1}
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                  onReflow={handleReflow1}
                />
              </MobileEllips>
              <DesktopEllips>
                <LinesEllipsis
                  text={pageDescription || ''}
                  maxLine={clicked ? 100 : 5}
                  ellipsis=""
                  onReflow={handleReflow}
                />
              </DesktopEllips>
              {clicked === false && hideButton === false && (
                <div onClick={() => doClick()}>
                  <DesktopMoreButton>
                    <span>READ MORE &nbsp;&nbsp; </span>
                    <img src={DesktopMoreDetail} alt="Icon" />{' '}
                  </DesktopMoreButton>
                </div>
              )}
              {clicked === false && hideButton1 === false && (
                <IconImage
                  src={MoreDetail}
                  alt="MoreDetail"
                  onClick={() => doClick()}
                />
              )}
              {clicked === true && (
                <IconImageLess
                  src={LessDetail}
                  alt="LessDetail"
                  onClick={() => doClick()}
                />
              )}
              {clicked === true && (
                <div onClick={() => doClick()}>
                  <DesktopLessButton>
                    <span>READ LESS &nbsp;&nbsp;</span>
                    <img src={DesktopLessDetail} alt="Icon" />{' '}
                  </DesktopLessButton>
                </div>
              )}
            </SubTitle>
          )}
        </FlexBoxDesktop>
      </DesktopFlex>
      <br />
      <LinkContainer>
        <Links length={menuItems.edges ? menuItems.edges.length : 0}>
          {menuItems.edges &&
            menuItems.edges.map(
              ({
                node: {
                  id,
                  handle,
                  title,
                  position,
                  menuIcon: { url },
                },
              }) => {
                return (
                  <Contain key={id}>
                    <Link to={`/${localeFolder}/${handle}/`}>
                      <Linked
                        color={
                          active === position ? btn_color : collMenuBgInActive
                        }
                        border={
                          active === position
                            ? btn_color
                            : collMenuBorderInActive
                        }
                      >
                        <div>
                          <LinkImage src={url} alt="LinkImage" />
                        </div>
                        <DesktopContainer>
                          <Label
                            size={12}
                            sizeTablet={17}
                            sizeLaptop={13}
                            sizeLaptopL={17}
                            sizeDesktop={22}
                            font={'Titillium Bold'}
                            color={
                              active === position
                                ? btn_color
                                : collMenuBorderInActive
                            }
                            colorDesktop={
                              active === position
                                ? 'white'
                                : collMenuBorderInActive
                            }
                          >
                            {title}
                          </Label>
                        </DesktopContainer>
                      </Linked>
                      <MobileContain>
                        <Label
                          size={12}
                          sizeTablet={16}
                          font={'Titillium Bold'}
                          color={
                            active === position
                              ? btn_color
                              : collMenuBorderInActive
                          }
                        >
                          {title}
                        </Label>
                      </MobileContain>
                    </Link>
                  </Contain>
                )
              }
            )}
        </Links>
      </LinkContainer>
      <br />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
`

const ContainerImage = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  @media ${device.laptop} {
    width: 57%;
    max-width: 1110px;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media ${device.laptop} {
    width: 100%;
  }
`

const IconImage = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  margin-top: -3px;
  @media ${device.laptop} {
    display: none;
  }
`

const IconImageLess = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  bottom: 0px;
  margin-top: -3px;
  @media ${device.laptop} {
    display: none;
  }
`

const LetterBox = styled.div`
  position: absolute;
  bottom: -32px;
  left: 0px;
  background-color: white;
  padding: 10px 30px 0px 10px;
  @media ${device.mobileS} {
    padding: 5px 20px 0px 10px;
  }
  @media ${device.mobileM} {
    padding: 10px 30px 0px 10px;
  }
  @media ${device.mobileL} {
  }
  @media ${device.laptop} {
    position: relative;
    display: none;
  }
`

const Label = styled.div`
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  color: ${props => props.color};
  display: flex;
  justify-content: center;
  line-height: 1em;
  @media ${device.tablet} {
    font-size: ${props => props.sizeTablet}px;
  }
  @media ${device.laptop} {
    font-size: ${props =>
      props.sizeLaptop ? props.sizeLaptop : props.sizeDesktop}px;
    line-height: 1em;
    color: ${props => props.colorDesktop};
    max-width: 90px;
  }
  @media ${device.laptopL} {
    font-size: ${props =>
      props.sizeLaptopL ? props.sizeLaptopL : props.sizeDesktop}px;
    line-height: 1em;
    color: ${props => props.colorDesktop};
    max-width: 90px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
    line-height: 1em;
    color: ${props => props.colorDesktop};
    max-width: 90px;
  }
`

const LabelTitle = styled.label`
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  color: ${props => props.color};
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
    font-size: ${props => props.sizeTablet}px;
  }
  @media ${device.laptop} {
    font-size: ${props => props.sizeDesktop - 25}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeDesktop - 15}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const SubTitle = styled.div`
  display: flex;
  position: relative;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 18px;
  padding-right: 13%;
  font-family: Titillium Light;
  @media ${device.laptop} {
    padding-right: 0%;
    width: 80%;
    margin-left: 0px;
    font-size: 16px;
    margin-top: -11px;
    line-height: 1.2em;
  }
  @media ${device.laptopL} {
    font-size: 22px;
  }
  @media ${device.desktop} {
    font-size: 26px;
  }
`

const Links = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 20px;
  @media ${device.mobileS} {
    width: ${props => props.length * 20}%;
  }
  @media ${device.laptop} {
    margin-left: 6%;
    width: unset;
  }
`

const Linked = styled.div`
  border-radius: 50%;
  border: 1px solid ${props => props.border};
  width: 66px;
  height: 66px;
  text-align: center;
  padding: 5px;
  background-color: ${props => props.color};
  @media ${device.mobileS} {
    width: 54px;
    height: 54px;
  }
  @media ${device.mobileM} {
    width: 60px;
    height: 60px;
  }
  @media ${device.mobileL} {
    width: 66px;
    height: 66px;
  }
  @media ${device.tablet} {
    margin-left: 35px;
  }
  @media ${device.laptop} {
    margin-left: 10px;
    display: flex;
    width: 140px;
    height: 45px;
    align-items: center;
    margin: 12px;
    padding-left: 19px;
    border-radius: 42px;
    padding-right: 20px;
  }
  @media ${device.laptopL} {
    width: 180px;
    height: 58px;
  }
  @media ${device.desktop} {
    width: 250px;
    height: 72px;
  }
`

const Contain = styled.div`
  width: 20%;
  justify-content: center;
  text-align: center;
  & a {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media ${device.laptop} {
    width: 140px;
    margin-right: 15px;
    & a:hover {
      text-decoration: none;
    }
  }
  @media ${device.laptopL} {
    width: 184px;
    margin-right: 20px;
  }
  @media ${device.desktop} {
    width: 255px;
    margin-right: 20px;
  }
`

const LinkImage = styled.img`
  width: 52px;
  height: 52px;
  @media ${device.mobileS} {
    width: 42px;
    height: 42px;
  }
  @media ${device.mobileM} {
    width: 47px;
    height: 47px;
  }
  @media ${device.mobileL} {
    width: 52px;
    height: 52px;
  }
  @media ${device.laptop} {
    width: 50px;
    height: 50px;
  }
  @media ${device.laptopL} {
    width: 65px;
    height: 65px;
  }
  @media ${device.desktop} {
    width: 96px;
    height: 96px;
  }
`

const Img = styled(Image)`
  width: 100 %;
`

const DesktopFlex = styled.div`
  @media ${device.laptop} {
    display: flex;
  }
`
const LetterBoxDesktop = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
  }
`

const FlexBoxDesktop = styled.div`
  @media ${device.laptop} {
    width: 43%;
    padding-left: 4%;
    padding-top: 40px;
  }
  @media ${device.laptopL} {
    padding-left: 4%;
    padding-top: 60px;
  }
  @media ${device.desktop} {
    padding-left: 4%;
    padding-top: 80px;
  }
`

const DesktopLessButton = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    position: absolute;
    right: 0%;
    bottom: -55px;
    border: 1px solid #202122;
    font-family: Titillium Bold;
    font-size: 12px;
    padding-left: 16px;
    padding-right: 10px;
    width: 150px;
    display: flex;
    align-items: center;
    padding-top: 1px;
    height: 30px;
    & img {
      width: 16px;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate(0, -50%);
    }
    @media ${device.laptopL} {
      padding-top: 0px;
      font-size: 13px;
      height: 34px;
      & img {
        width: 13px;
      }
    }
    @media ${device.desktop} {
      padding-top: 1px;
      font-size: 15px;
      height: 38px;
      & img {
        width: 16px;
      }
    }
  }
`

const DesktopMoreButton = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    position: absolute;
    right: 0%;
    bottom: -55px;
    border: 1px solid #202122;
    font-family: Titillium Bold;
    font-size: 12px;
    height: 30px;
    padding-right: 10px;
    width: 150px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-top: 1px;
    & img {
      width: 11px;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
  @media ${device.laptopL} {
    padding-top: 0px;
    font-size: 13px;
    height: 34px;
    & img {
      width: 13px;
    }
  }
  @media ${device.desktop} {
    padding-top: 1px;
    font-size: 15px;
    height: 38px;
    & img {
      width: 16px;
    }
  }
`

const MobileEllips = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`
const DesktopEllips = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    width: 52%;
    text-align: center;
    display: block;
    padding-left: 25px;
    padding-right: 13px;
  }
`

const LinkContainer = styled.div`
  @media ${device.mobileS} {
    overflow: auto;
  }
  @media ${device.laptop} {
  }
`

export default FrontIn
