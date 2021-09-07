import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql, navigate } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import ProductContext from '~/context/ProductContext'
import CommunityContext from '~/context/CommunityContext'
import { device } from '~/utils/device'
import { Img, Cover, MobileContain, DesktopContain } from '~/utils/styles'

import ArrowImg from '~/images/Assets/Arrow-orange.svg'

import CartModal from '~/components/pages/collection/CartModal'
import ContactUs from '~/components/pages/products/ContactUs'
import CommunityLogin from '~/components/pages/Auth/CommunityLogin'
import CommunitySignUp from '~/components/pages/Auth/CommunitySignUp'
import ForgotPassword from '~/components/pages/Auth/ForgotPassword'
import Loader from '~/components/Common/Loader'

const Footer = ({
  activeMenu,
  hideFooter = false,
  hideStickyMenu = false,
  additionalStyle = null,
}) => {
  const reg = /http(s):/
  const [cartNum, setCartNum] = useState(0)
  const { cartItems, cartModal, setCartModal, locale, localeFolder, loader } =
    useContext(StoreContext)
  const { contactModal, setContactModal } = useContext(ProductContext)
  const {
    loginModal,
    setLoginModal,
    signUpModal,
    setSignUpModal,
    forgotModal,
    setForgotModal,
    userInfo,
  } = useContext(CommunityContext)

  const { stores, footerSection_en, footerSection_de, footerSection_ch } =
    useStaticQuery(graphql`
      query {
        stores: allDatoCmsStore(
          filter: { locale: { eq: "en" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              id
              title
              siteUrl
            }
          }
        }
        footerSection_en: datoCmsFooterSection(locale: { eq: "en" }) {
          ...footerSection_commonFields
        }
        footerSection_de: datoCmsFooterSection(locale: { eq: "de" }) {
          ...footerSection_commonFields
        }
        footerSection_ch: datoCmsFooterSection(locale: { eq: "en-CH" }) {
          ...footerSection_commonFields
        }
      }
      fragment footerSection_commonFields on DatoCmsFooterSection {
        footerLogo {
          url
          fluid {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
        primaryLink {
          id
          title
          link
        }
        secondaryLink {
          id
          title
          handle
        }
        socialLink {
          id
          link
          icon {
            url
            fluid {
              sizes
              aspectRatio
              src
              srcSet
              width
              height
            }
          }
        }
        mobileStickyNavigation {
          id
          title
          link
          handle
          isPublished
          activeIcon {
            url
          }
          inactiveIcon {
            url
          }
        }
        desktopStickyNavigation {
          id
          title
          link
          handle
          isPublished
          activeIcon {
            url
          }
          inactiveIcon {
            url
          }
        }
      }
    `)
  let footerSection = {}
  if (locale === 'en') {
    footerSection = footerSection_en
  } else if (locale === 'de') {
    footerSection = footerSection_de
  } else if (locale === 'en-CH') {
    footerSection = footerSection_ch
  }

  const removeModal = () => {
    setCartModal(false)
  }

  const changeStore = storeUrl => {
    if (storeUrl) {
      navigate(`/${storeUrl}/`)
    }
  }

  useEffect(() => {
    let sum = 0
    Object.keys(cartItems).forEach(id => {
      const item = cartItems[id]
      sum += item.num
    })
    setCartNum(sum)
  }, [cartItems])

  let secondaryLinks = []
  let tmpLinks = []
  if (footerSection.secondaryLink && footerSection.secondaryLink.length > 0) {
    footerSection.secondaryLink.forEach((link, index) => {
      const anchorLink = reg.test(`${link.handle}`)
        ? `${link.handle}`
        : `/${localeFolder}/${link.handle}`
      tmpLinks.push(
        <Span key={link.id}>
          <Link
            to={link.handle === 'contact-us' ? `#` : `${anchorLink}`}
            onClick={() =>
              link.handle === 'contact-us' ? setContactModal(true) : undefined
            }
          >
            <span>{link.title}</span>
          </Link>
        </Span>
      )
      if (
        (index + 1) % 2 === 0 ||
        index + 1 === footerSection.secondaryLink.length
      ) {
        secondaryLinks.push(<Tab key={index}>{tmpLinks}</Tab>)
        tmpLinks = []
      }
    })
  }

  return (
    <React.Fragment>
      <Container style={additionalStyle}>
        {!hideFooter && <Space height={0} />}
        <Contain>
          {!hideFooter && (
            <React.Fragment>
              <Space height={70} />
              {footerSection.footerLogo && footerSection.footerLogo.fluid && (
                <Link to={`/${localeFolder}/`}>
                  <ImageContainer>
                    <Img fluid={footerSection.footerLogo.fluid} />
                  </ImageContainer>
                </Link>
              )}
              {footerSection.primaryLink &&
                footerSection.primaryLink.length > 0 && (
                  <TabList>
                    {footerSection.primaryLink.map(link => {
                      const anchorLink = reg.test(`${link.link}`)
                        ? `${link.link}`
                        : `/${localeFolder}${link.link}`
                      return (
                        <Tabs key={link.id}>
                          <Link to={anchorLink}>
                            <span>{link.title}</span> &nbsp;&nbsp;
                            <img
                              src={ArrowImg}
                              alt="arrow"
                              width={14}
                              height={12}
                            />
                          </Link>
                        </Tabs>
                      )
                    })}
                  </TabList>
                )}
              {stores.edges && stores.edges.length > 0 && (
                <Buttons
                  length={
                    footerSection.primaryLink
                      ? footerSection.primaryLink.length
                      : 0
                  }
                >
                  <label htmlFor="storeSelection">Store Locations</label>
                  <select
                    id="storeSelection"
                    onChange={event => changeStore(event.target.value)}
                    value={localeFolder}
                  >
                    {stores.edges.map(({ node }) => (
                      <option key={node.id} value={node.siteUrl}>
                        {node.title}
                      </option>
                    ))}
                  </select>
                </Buttons>
              )}
              <BottomBar hideStickyMenu={hideStickyMenu}>
                {footerSection.socialLink &&
                  footerSection.socialLink.length > 0 && (
                    <SocialImg>
                      {footerSection.socialLink.map(link => (
                        <SocialImage key={link.id}>
                          <Link to={link.link}>
                            <Img fluid={link.icon.fluid} />
                          </Link>
                        </SocialImage>
                      ))}
                    </SocialImg>
                  )}
                <MobileContain>
                  {secondaryLinks.length > 0 && (
                    <BottomNav hideStickyMenu={hideStickyMenu}>
                      {secondaryLinks}
                    </BottomNav>
                  )}
                </MobileContain>
                <DesktopContainer>
                  {footerSection.secondaryLink &&
                    footerSection.secondaryLink.length > 0 &&
                    footerSection.secondaryLink.map(link => {
                      const anchorLink = reg.test(`${link.handle}`)
                        ? `${link.handle}`
                        : `/${localeFolder}/${link.handle}`
                      return (
                        <Span key={link.id}>
                          <Link
                            to={link.handle === 'contact-us' ? `#` : anchorLink}
                            onClick={() =>
                              link.handle === 'contact-us'
                                ? setContactModal(true)
                                : undefined
                            }
                          >
                            <span>{link.title}</span>
                          </Link>
                        </Span>
                      )
                    })}
                </DesktopContainer>
              </BottomBar>
            </React.Fragment>
          )}
          {hideFooter && <SpaceBottom />}
          {!hideStickyMenu && (
            <React.Fragment>
              <MobileContain>
                <BottomLink>
                  {footerSection.mobileStickyNavigation &&
                    footerSection.mobileStickyNavigation.length > 0 &&
                    footerSection.mobileStickyNavigation.map(
                      ({
                        id,
                        title,
                        link,
                        handle,
                        activeIcon: { url: active_url },
                        inactiveIcon: { url: inactive_url },
                      }) => {
                        let anchorLink = ''
                        if (reg.test(`${link}`)) {
                          anchorLink = `${link}`
                        } else if (
                          link.indexOf('profile') !== -1 ||
                          link.indexOf('community') !== -1
                        ) {
                          anchorLink = `${link}`
                        } else {
                          anchorLink = `/${localeFolder}${link}`
                        }
                        return (
                          <TabBottom
                            key={id}
                            active={
                              cartNum > 0 && title === 'Cart'
                                ? '#ff8c00'
                                : 'transparent'
                            }
                          >
                            {title === 'Cart' && cartNum > 0 && (
                              <ActiveCart>
                                <Link to={anchorLink}>
                                  <LazyLoad>
                                    <FooterIcon src={active_url} alt="active" />
                                  </LazyLoad>
                                  <MobileContain>
                                    <Space height={4} />
                                  </MobileContain>
                                  <span>Cart/{cartNum}</span>
                                </Link>
                              </ActiveCart>
                            )}
                            <Link
                              to={
                                link.indexOf('profile') !== -1
                                  ? !userInfo
                                    ? `#`
                                    : anchorLink
                                  : anchorLink
                              }
                              onClick={() => {
                                if (
                                  !userInfo &&
                                  link.indexOf('profile') !== -1
                                ) {
                                  setLoginModal(true)
                                }
                              }}
                            >
                              <LazyLoad>
                                <FooterIcon
                                  src={
                                    handle === activeMenu
                                      ? active_url
                                      : inactive_url
                                  }
                                  alt="active"
                                />
                              </LazyLoad>
                              <MobileContain>
                                <Space height={4} />
                              </MobileContain>
                              <span>{title}</span>
                            </Link>
                          </TabBottom>
                        )
                      }
                    )}
                </BottomLink>
              </MobileContain>
              <DesktopContain>
                <BottomLink>
                  {footerSection.footerLogo && footerSection.footerLogo.fluid && (
                    <BottomLogo>
                      <Img fluid={footerSection.footerLogo.fluid} />
                    </BottomLogo>
                  )}
                  {footerSection.desktopStickyNavigation &&
                    footerSection.desktopStickyNavigation.length > 0 &&
                    footerSection.desktopStickyNavigation.map(
                      ({
                        id,
                        title,
                        link,
                        handle,
                        activeIcon: { url: active_url },
                        inactiveIcon: { url: inactive_url },
                      }) => {
                        let anchorLink = ''
                        if (reg.test(`${link}`)) {
                          anchorLink = `${link}`
                        } else if (
                          link.indexOf('profile') !== -1 ||
                          link.indexOf('community') !== -1
                        ) {
                          anchorLink = `${link}`
                        } else {
                          anchorLink = `/${localeFolder}${link}`
                        }
                        return (
                          <TabBottom
                            key={id}
                            active={
                              cartNum > 0 && title === 'Cart'
                                ? '#ff8c00'
                                : 'transparent'
                            }
                          >
                            {title === 'Cart' && cartNum > 0 && (
                              <ActiveCart>
                                <Link to={anchorLink}>
                                  <LazyLoad>
                                    <FooterIcon src={active_url} alt="active" />
                                  </LazyLoad>
                                  <MobileContain>
                                    <Space height={4} />
                                  </MobileContain>
                                  <span>Cart/{cartNum}</span>
                                </Link>
                              </ActiveCart>
                            )}
                            <Link
                              to={
                                link.indexOf('profile') !== -1
                                  ? !userInfo
                                    ? `#`
                                    : anchorLink
                                  : anchorLink
                              }
                              onClick={() => {
                                if (
                                  !userInfo &&
                                  link.indexOf('profile') !== -1
                                ) {
                                  setLoginModal(true)
                                }
                              }}
                            >
                              <LazyLoad>
                                <FooterIcon
                                  src={
                                    handle === activeMenu
                                      ? active_url
                                      : inactive_url
                                  }
                                  alt="active"
                                />
                              </LazyLoad>
                              <MobileContain>
                                <Space height={4} />
                              </MobileContain>
                              <span>{title}</span>
                            </Link>
                          </TabBottom>
                        )
                      }
                    )}
                </BottomLink>
              </DesktopContain>
            </React.Fragment>
          )}
        </Contain>
      </Container>
      {cartModal === true && (
        <React.Fragment>
          <Cover background={0.5} index={10} onClick={() => removeModal()} />
          <CartModal />
        </React.Fragment>
      )}
      {contactModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setContactModal(false)}
          />
          <ContactUs />
        </React.Fragment>
      )}
      {loginModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setLoginModal(false)}
          />
          <CommunityLogin />
        </React.Fragment>
      )}
      {signUpModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setSignUpModal(false)}
          />
          <CommunitySignUp />
        </React.Fragment>
      )}
      {forgotModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setForgotModal(false)}
          />
          <ForgotPassword />
        </React.Fragment>
      )}
      {loader && <Loader />}
    </React.Fragment>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
  }
`

const Contain = styled.div`
  width: 100%;
  height: auto;
  background-color: rgb(32, 32, 32);
  position: relative;
`

const Space = styled.div`
  width: 100%;
  position: relative;
  height: ${props => props.height}px;
`

const ImageContainer = styled.div`
  width: 30%;
  position: absolute;
  top: 25px;
  left: 25px;
  @media ${device.laptop} {
    width: 200px;
    left: 15%;
    top: 98px;
  }
`

const Tabs = styled.div`
  & {
    float: right;
    color: #f2f2f7;
    font-size: 18px;
    font-family: Titillium Light;
    margin-right: 30px;
  }
  & a {
    color: #f2f2f7;
    text-decoration: none;
    background-color: transparent;
  }
  & img {
    width: 14px;
  }
  @media ${device.laptop} {
    width: 44%;
    font-size: 26px;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 150px;
  margin-top: ${props => 150 + (props.length - 4) * 27}px;
  & select {
    cursor: pointer;
  }
  @media ${device.laptop} {
    justify-content: unset;
    margin-left: 1%;
    margin-top: 190px;
  }
  @media ${device.laptopL} {
    justify-content: unset;
    margin-left: 15%;
    margin-top: 190px;
  }
  label {
    color: transparent;
    margin: auto;
    font-size: 1px;
  }
  select {
    margin: auto;
    font-size: 16px;
    padding: 16px 35px;
    color: white;
    background-color: #161617;
    border: none;
    font-family: Titillium Light;
    width: 300px;
    height: 60px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    @media ${device.laptop} {
      margin-right: 29px;
      font-size: 20px;
    }
  }
  select::-ms-expand {
    display: none;
  }
  select:focus {
    outline: none;
  }
`

const SocialImg = styled.div`
  height: 30px;
  margin-top: 50px;
  margin-left: 15px;
  @media ${device.laptop} {
    margin-left: 14%;
    width: 200px;
    & img {
      width: 40px !important;
    }
  }
`

const SocialImage = styled.span`
  margin-left: 12.5px;
  margin-right: 12.5px;
  display: inline-block;
  width: 22px;
  @media ${device.laptop} {
    width: 40px;
  }
`

const FooterIcon = styled.img`
  margin-left: 12.5px;
  margin-right: 12.5px;
  display: inline-block;
  width: 22px;
  height: 28px;
`

const Tab = styled.div`
  & {
    width: 25%;
    display: inline-block;
    margin-left: 30px;
    color: lightgray;
    font-size: 14px;
  }

  & span {
    margin-top: 0px;
    font-family: Titillium Light;
    width: 100%;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    width: 23%;
  }
  @media ${device.mobileM} {
    width: 25%;
    font-size: 14px;
  }
  @media ${device.laptop} {
     {
      display: flex;
      font-size: 18px;
      width: auto;
    }
    $ span {
      width: auto;
    }
  }
`

const TabBottom = styled.div`
  & {
    width: 20%;
    display: inline-block;
    text-align: center;
    color: #a9acaf;
    font-size: 12px;
    font-family: Titillium Light;
  }

  & a {
    color: #a9acaf;
  }

  & span {
    width: 100%;
    min-height: 19px;
    display: block;
  }
  @media ${device.laptop} {
    & {
      width: auto;
    }
    & a {
      display: flex;
      align-items: center;
    }
    & span {
      width: auto;
      min-height: 27px;
      font-size: 18px;
      vertical-align: middle;
      margin-left: 5px;
    }
    background: ${props => props.active};
    margin-top: ${props =>
      props.active !== 'transparent' ? '0px !important' : '0px'};
  }
  @media ${device.laptopL} {
    & span {
      width: auto;
      min-height: 28px;
      font-size: 19px;
      vertical-align: middle;
    }
    & img {
      height: 30px;
    }
  }
  @media ${device.desktop} {
    & span {
      font-size: 24px;
    }
    & img {
      height: 42px;
    }
  }
`

const BottomNav = styled.div`
  display: flex;
  margin-top: 20px;
  font-family: Titillium Light;
  color: #7d7f81;
  padding-bottom: ${props => (props.hideStickyMenu ? '50px' : '100px')};
  flex-wrap: wrap;
  @media ${device.laptop} {
    width: 65%;
    margin-top: 45px;
    padding-bottom: 0px;
  }
`

const BottomLink = styled.div`
  position: fixed;
  bottom: 0px;
  padding-top: 15px;
  height: 83px;
  background-color: #161617;
  z-index: 5;
  width: 100%;
  @media ${device.laptop} {
    display: flex;
    height: 70px;
    padding-top: 0px;
    align-items: center;
    justify-content: space-evenly;
  }
  @media ${device.laptopL} {
    height: 72px;
  }
  @media ${device.desktop} {
    height: 90px;
  }
`

const SpaceBottom = styled.div`
  height: 83px;
  width: 100%;
  background: white;
  @media ${device.laptop} {
    height: 70px;
  }
  @media ${device.laptopL} {
    height: 72px;
  }
  @media ${device.desktop} {
    height: 90px;
  }
`

const ActiveCart = styled.div`
  & {
    background: #ff8c00;
    position: absolute;
    width: 83px;
    height: 83px;
    bottom: 0px;
    padding-top: 16px;
    color: white !important;
  }
  & a {
    color: white;
  }
  @media ${device.mobileS} {
    & a {
      margin-left: -16px;
    }
    & span {
      margin-left: -16px;
    }
  }
  @media ${device.mobileL} {
    & a {
      margin-left: 0px;
    }
    & span {
      margin-left: 0px;
    }
  }

  @media ${device.tablet} {
    width: 155px;
  }

  @media ${device.laptop} {
    height: 70px;
    width: 20%;
    display: flex;
    padding-top: 0px;
    align-items: center;
    padding-left: 15px;
    & a {
      display: flex;
    }
  }
  @media ${device.laptopL} {
    height: 72px;
    width: 20%;
    display: flex;
    padding-top: 0px;
    align-items: center;
    padding-left: 20px;
    & a {
      display: flex;
    }
  }
  @media ${device.desktop} {
    height: 90px;
    width: 20%;
    display: flex;
    padding-top: 0px;
    align-items: center;
    padding-left: 60px;
    & a {
      display: flex;
    }
  }
`

const TabList = styled.div`
  max-width: 200px;
  float: right;
  @media ${device.laptop} {
    display: block;
    width: 35%;
    max-width: none;
    margin-top: 180px;
    min-width: 600px;
  }
`

const BottomBar = styled.div`
  @media ${device.laptop} {
    display: flex;
    margin-top: 90px;
    padding-bottom: ${props => (props.hideStickyMenu ? '50px' : '150px')};
  }
`

const Span = styled.div`
  display: block;
  width: 100%;
  margin-top: 10px;
  & span {
    color: #7d7f81;
  }
  @media ${device.laptop} {
    width: auto;
    margin-left: 10px;
  }
  @media ${device.laptopL} {
    width: auto;
    margin-left: 62px;
  }
  @media ${device.desktop} {
    width: auto;
  }
`

const BottomLogo = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 120px;
    margin-left: 30px;
    height: 29px;
  }
  @media ${device.laptopL} {
    display: block;
    width: 160px;
    margin-left: 30px;
    height: 29px;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    margin-top: 45px;
    margin-right: 9%;
  }
`

export default Footer
