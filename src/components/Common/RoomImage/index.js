import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import DefaultRoomImgSmall from '~/images/Assets/room-default-small.jpg'

const RoomImage = ({ room }) => {
  const { userInfo } = useContext(CommunityContext)

  return (
    <Container>
      <Link to={`/room/${room.slug}`} title={room.title}>
        {userInfo && userInfo.user.id === room.owner && <Trangle />}
        <img
          src={room.image || DefaultRoomImgSmall}
          alt={room.title}
          title={room.title}
        />
        <LetterContainer>
          <Letter
            font="Titillium Bold"
            size={13}
            sizeMobileS={10}
            sizeMobileM={12}
            sizeDesktop={13}
            sizeLaptopL={12}
            sizeLaptop={10}
            color="white"
          >
            {room.title}
          </Letter>
        </LetterContainer>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  width: 30vw;
  margin-right: 6px;
  min-height: 123px;
  max-height: 136px;
  position: relative;
  margin-bottom: 5px;
  overflow-y: hidden;
  padding-bottom: 39px;
  flex: 0 0 auto;
  & img {
    width: 30vw;
  }
  @media ${device.laptop} {
    width: 29%;
    margin-bottom: 20px;
    margin-right: 10px;
    max-width: 9vw;
    & img {
      width: 100%;
    }
  }
  @media ${device.laptopL} {
    margin-right: 13px;
  }
  @media ${device.desktop} {
    margin-right: 20px;
  }
`

const Trangle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-right: 30px solid #ff8c00;
  border-bottom: 30px solid transparent;
`

const LetterContainer = styled.div`
  position: absolute;
  height: 40px;
  width: 100%;
  bottom: 0px;
  z-index: 1;
  background: black;
  padding-left: 5%;
  padding-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export default RoomImage
