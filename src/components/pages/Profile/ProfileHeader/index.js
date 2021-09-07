import React, { useContext } from 'react'
import styled from 'styled-components'

import { Letter, DesktopContain } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import SettingList from '~/components/pages/Profile/SettingList'

import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const ProfileHeader = ({ editProfile }) => {
  const { userInfo } = useContext(CommunityContext)

  return (
    <Container>
      <Header background={userInfo.user.wall_image || ''}>
        <img src={userInfo.user.image || dummyProfilePic} />
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
          {`${userInfo.user.first_name || ''} ${userInfo.user.last_name || ''}`}
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
          {userInfo.user.description}
        </Letter>
      </Content>
      <EditButton onClick={() => editProfile()}>
        <Letter
          font="Titillium Bold"
          sizeDesktop={20}
          sizeLaptopL={18}
          sizeLaptop={16}
          size={16}
          color="white"
        >
          EDIT YOUR PROFILE
        </Letter>
      </EditButton>
      <DesktopContain>
        <SettingList />
      </DesktopContain>
    </Container>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30%;
  }
`

const Header = styled.div`
  width: 100%;
  height: 225px;
  position: relative;
  background-color: #202122;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${props => `${props.background}`});
  & img {
    width: 140px;
    height: 140px;
    position: absolute;
    bottom: 0px;
    left: 16px;
    border-radius: 50%;
    transform: translate(0px, 50%);
    border-radius: 50%;
  }
  @media ${device.laptop} {
    width: 100%;
    height: 300px;
    position: relative;
    & img {
      position: absolute;
      bottom: 0px;
      left: 50px;
      transform: translate(0px, 50%);
    }
  }
`

// const PointContainer = styled.div`
//   padding: 4px 34px;
//   border-radius: 21px;
//   width: fit-content;
//   border: 1px solid #202122;
//   margin-top: 20px;
//   margin-right: 5%;
//   display: flex;
//   float: right;
//   @media ${device.laptop} {
//     padding: 11px 27px;
//     border-radius: 30px;
//     width: fit-content;
//     border: 1px solid #202122;
//     margin-top: 20px;
//     margin-right: 20%;
//     display: flex;
//     float: right;
//   }
// `

const Content = styled.div`
  margin-top: 90px;
  width: 80%;
  padding-left: 16px;
`

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-left: 5%;
  height: 83px;
  background: #ff8c00;
  margin-top: 20px;
  cursor: pointer;
  @media ${device.laptop} {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 83px;
    background: #ff8c00;
    margin-top: 20px;
  }
`

export default ProfileHeader
