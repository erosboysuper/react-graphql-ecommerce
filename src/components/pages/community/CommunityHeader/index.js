import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Letter, Cover } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'

import Bell_Img from '~/images/Assets/Notification-bell.svg'
import Search_Icon from '~/images/Assets/Search.svg'

import NotificationModal from '~/components/pages/community/NotificationModal'
import CommunitySearchModal from '~/components/pages/community/CommunitySearchModal'

const CommunityHeader = ({
  enableNotifications,
  enableSearch,
  pageLogo,
  selected = true,
}) => {
  const {
    mainTab,
    setMainTab,
    notifications,
    notificationModal,
    setNotificationModal,
    searchModal,
    setSearchModal,
    setCoCreationModal,
    userInfo,
    setLoginModal,
  } = useContext(CommunityContext)
  const [scrolling, setScrolling] = useState(false)
  const [scrollDir, setScrollDir] = useState('scrolling up')

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop
    if (top > 0) setScrolling(true)
    else setScrolling(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      setScrolling(false)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const threshold = 10
    let lastScrollY = window.pageYOffset
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }
      setScrollDir(scrollY > lastScrollY ? 'scrolling down' : 'scrolling up')
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(updateScrollDir)
    }
  }, [scrollDir])

  return (
    <React.Fragment>
      <Container
        status={scrolling ? 1 : 0}
        display={scrollDir === 'scrolling down' ? 'none' : 'block'}
      >
        <Icons>
          {enableNotifications && (
            <Icon>
              {notifications.length > 0 && <Dot />}
              <img
                src={Bell_Img}
                alt="bell icon"
                onClick={() =>
                  userInfo ? setNotificationModal(true) : setLoginModal(true)
                }
              />
            </Icon>
          )}
          {enableSearch && (
            <Icon>
              <img
                src={Search_Icon}
                alt="Search Icon"
                onClick={() => setSearchModal(true)}
              />
            </Icon>
          )}
        </Icons>
        <LazyLoad>
          <Logo src={pageLogo.url} alt="Page Logo" status={scrolling ? 1 : 0} />
        </LazyLoad>

        <React.Fragment>
          <BuilderButton
            status={scrolling ? 1 : 0}
            onClick={() => setCoCreationModal(true)}
          >
            <Letter
              font="Titillium Bold"
              size={13}
              sizeMobileS={11}
              sizeLaptopL={19}
              sizeLaptop={16}
              sizeDesktop={22}
            >
              Co-Create
            </Letter>
          </BuilderButton>
          <ShadowButton status={scrolling ? 1 : 0} />
        </React.Fragment>

        <Tabs status={scrolling ? 1 : 0}>
          <Tab
            active={mainTab === 'community' && selected === true ? 3 : 0}
            onClick={() => {
              setMainTab('community')
              navigate(`/community`)
            }}
          >
            <Letter
              font="Titillium Bold"
              size={22}
              sizeLaptop={25}
              sizeDesktop={34}
              color={
                mainTab === 'community' && selected === true
                  ? '#FF8C00'
                  : '#A9ACAF'
              }
            >
              Community
            </Letter>
          </Tab>
          {/* <Tab
            active={mainTab === 'market' && selected === true ? 3 : 0}
            onClick={() => setMainTab('market')}
          >
            <Letter
              font="Titillium Bold"
              size={22}
              sizeLaptop={25}
              sizeDesktop={34}
              color={
                mainTab === 'market' && selected === true
                  ? '#FF8C00'
                  : '#A9ACAF'
              }
            >
              Market
            </Letter>
          </Tab> */}
        </Tabs>
      </Container>
      {notificationModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setNotificationModal(false)}
          />
          <NotificationModal />
        </React.Fragment>
      )}
      {searchModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setSearchModal(false)}
          />
          <CommunitySearchModal />
        </React.Fragment>
      )}
      <Space status={scrolling ? 1 : 0} />
    </React.Fragment>
  )
}

const Container = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  padding-left: 16px;
  height: 225px;
  height: ${props => (props.status === 1 ? '146px' : '225px')};
  position: ${props => (props.status === 1 ? 'fixed' : 'relative')};
  display: ${props => props.display};
  background: #202122;
  z-index: 5;
  @media ${device.laptop} {
    padding: 0px;
    position: ${props => (props.status === 1 ? 'fixed' : 'relative')};
    height: ${props => (props.status === 1 ? 90 : 190)}px;
    display: block;
  }
`

const Logo = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0px);
  width: 40%;
  display: ${props => (props.status === 1 ? 'none' : 'block')};
  @media ${device.laptop} {
    width: 15%;
    top: unset;
    bottom: 20px;
    transform: translate(-50%, 0px);
    display: ${props => (props.status === 1 ? 'none' : 'block')};
  }
  @media ${device.laptopL} {
    bottom: 20px;
  }
`

const BuilderButton = styled.button`
  background: #ff8c00;
  height: 40px;
  width: 38%;
  color: white;
  position: absolute;
  right: 16px;
  top: 49px;
  border: 2px solid #161617;
  z-index: 2;
  @media ${device.laptop} {
    height: 60px;
    width: 20%;
    padding: 15px 22px;
    right: 7%;
    top: unset;
    bottom: ${props => (props.status === 1 ? '0px' : '-15px')};
  }
  @media ${device.laptopL} {
    height: 75px;
    width: 15%;
    padding: 15px 22px;
    top: unset;
    bottom: ${props => (props.status === 1 ? '0px' : '-15px')};
  }
  @media ${device.desktop} {
    height: 90px;
    padding: 28px 38px;
  }
`

const ShadowButton = styled.div`
  background: transparent;
  height: 40px;
  width: 38%;
  color: white;
  position: absolute;
  right: 11px;
  top: 53px;
  border: 2px solid #161617;
  @media ${device.laptop} {
    height: 60px;
    width: 20%;
    padding: 28px 38px;
    right: 7%;
    transform: translate(10px, 0px);
    top: unset;
    bottom: -25px;
    display: ${props => (props.status === 1 ? 'none' : 'block')};
  }
  @media ${device.laptopL} {
    height: 75px;
    width: 15%;
    padding: 28px 38px;
    top: unset;
    bottom: -25px;
    display: ${props => (props.status === 1 ? 'none' : 'block')};
  }
  @media ${device.desktop} {
    height: 90px;
  }
`

const Icons = styled.div`
  position: absolute;
  top: 58px;
  left: 16px;
  width: 62px;
  display: flex;
  justify-content: space-between;
  & img {
    cursor: pointer;
  }
  @media ${device.laptop} {
    left: 7%;
    top: 37px;
    width: 9%;
    & img {
      width: 27px;
    }
  }
  @media ${device.laptopL} {
    width: 5%;
  }
`

const Icon = styled.div`
  position: relative;
`

const Dot = styled.div`
  position: absolute;
  background: #ff8c00;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: -5px;
  right: -5px;
`

const Tabs = styled.div`
  position: absolute;
  bottom: 0px;
  left: 16px;
  display: flex;
  @media ${device.laptop} {
    left: ${props => (props.status === 1 ? '20%' : '7%')};
  }
`

const Tab = styled.div`
  margin-right: 58px;
  border-bottom: ${props => props.active}px solid #ff8c00;
  padding-bottom: 5px;
  cursor: pointer;
  @media ${device.laptop} {
    margin-right: 60px;
  }
  @media ${device.laptopL} {
    margin-right: 100px;
  }
`

const Space = styled.div`
  display: block;
  height: ${props => (props.status === 1 ? '100px' : '0px')};
  @media ${device.laptop} {
    display: block;
    width: 100%;
    height: ${props => (props.status === 1 ? '150px' : '0px')};
  }
`

export default CommunityHeader
