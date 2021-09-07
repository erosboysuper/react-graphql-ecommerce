import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import { btn_color } from '~/utils/colors'

import RoomImage from '~/components/Common/RoomImage'
import CommunityContext from '~/context/CommunityContext'

import ArrowBack from '~/images/Assets/Arrow-back.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const ProfileModal = () => {
  const {
    profileInfo,
    setProfileInfo,
    userHeaders,
    userProfiles,
    setUserProfiles,
  } = useContext(CommunityContext)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const user_id = profileInfo.id || null
    const controller = new AbortController()
    const { signal } = controller
    if (user_id && !userProfiles[user_id]) {
      setUserData(profileInfo)
      fetch(`${process.env.API_BASE}/userMeta/${user_id}`, {
        signal,
        headers: userHeaders,
      })
        .then(res => res.json())
        .then(res => {
          if (res && res.id) {
            setUserData(res)
            setUserProfiles(prevState => {
              return {
                ...prevState,
                [user_id]: res,
              }
            })
          }
        })
    } else {
      setUserData(userProfiles[user_id])
    }

    return () => {
      // Abort request
      controller.abort()
    }
  }, [profileInfo])

  return (
    <Container>
      <Header background={userData.wall_image ? 'transparent' : 'black'}>
        <BackImage onClick={() => setProfileInfo(null)}>
          <img src={ArrowBack} alt="arrow" />
        </BackImage>
        {userData.wall_image !== null && (
          <Background src={userData.wall_image} />
        )}
        <ProfileImageShow src={userData.image || dummyProfilePic} />
      </Header>
      {/* <PointContainer>
        <Letter font="Titillium Web" sizeDesktop={18} size={14} color="#202122">
          150 T-Bô Points
        </Letter>
      </PointContainer> */}
      <Content>
        <Letter
          font="Titillium Black"
          sizeDesktop={30}
          sizeLaptopL={26}
          sizeLaptop={22}
          size={20}
          color="#202122"
        >
          {userData.name}
        </Letter>
        <br />
        <Letter
          font="Titillium Light"
          sizeDesktop={22}
          sizeLaptopL={20}
          sizeLaptop={18}
          size={16}
          color="#202122"
        >
          {userData.description}
        </Letter>
      </Content>
      {userData.owned_rooms && userData.owned_rooms.length > 0 && (
        <RoomContent>
          <Letter font="Titillium Light" color={btn_color} size={16}>
            TBô COMMUNITY - ROOMS
          </Letter>
          <RoomList>
            {userData.owned_rooms.map(room => (
              <RoomImage room={room} key={room.id} />
            ))}
          </RoomList>
        </RoomContent>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background: white;
  z-index: 12;
  bottom: 0px;
  overflow: scroll;

  padding-bottom: 0px;
  & input {
    height: 54px;
    background: #f2f2f7;
  }
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    max-width: 450px;
  }
  @media ${device.laptopL} {
    height: 100%;
    width: 34%;
    right: 0px;
    max-width: unset;
    display: flex;
    flex-direction: column;
    & input {
      height: 62px;
      background: #f2f2f7;
    }
  }
`

const BackImage = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
`

const Header = styled.div`
  width: 100%;
  height: 225px;
  position: relative;
  background: ${props => props.background};
  & img.close {
    position: absolute;
    left: 16px;
    top: 24px;
  }
  @media ${device.laptop} {
    width: 100%;
    height: 300px;
    position: relative;
  }
`

const Background = styled.img`
  width: 100%;
  height: 100%;
`

const ProfileImageShow = styled.img`
  width: 140px;
  height: 140px;
  position: absolute;
  bottom: 0px;
  left: 16px;
  transform: translate(0px, 50%);
  border-radius: 50%;
  @media ${device.laptop} {
    position: absolute;
    bottom: 0px;
    left: 50px;
    transform: translate(0px, 50%);
  }
`

const Content = styled.div`
  margin-top: 90px;
  width: 80%;
  padding-left: 16px;
`

const RoomContent = styled.div`
  margin-top: 30px;
  width: 100%;
  padding-left: 16px;
`

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  overflow: auto;
  overflow-y: hidden;
`

export default ProfileModal
