import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import ArrowBackIcon from '~/images/Assets/Arrow-back.svg'
import DefaultRoomImg from '~/images/Assets/room-default.jpg'

const RoomHeader = ({ room }) => {
  const { userInfo, setEditModal, setEditRecord } = useContext(CommunityContext)

  return (
    <Container>
      <Background>
        {userInfo && userInfo.user.owned_rooms.indexOf(room.id) !== -1 && (
          <EditButton
            className="edit-btn"
            onClick={() => {
              setEditModal(true)
              setEditRecord({
                type: `room`,
                id: room.id,
              })
            }}
          >
            <CircleItem />
            <CircleItem />
            <CircleItem />
          </EditButton>
        )}
        <LazyLoad>
          <img src={room.image_large || DefaultRoomImg} alt={room.title} />
        </LazyLoad>
      </Background>
      <BackIcon
        src={ArrowBackIcon}
        alt="arrow"
        onClick={() => {
          window.history.back()
        }}
      />
      <TypeLetter>
        <Letter
          font="Titillium Web"
          size={22}
          sizeMobileS={18}
          sizeMobileM={20}
          sizeMobileL={22}
          sizeDesktop={40}
          sizeLaptopL={36}
          sizeLaptop={32}
          color="white"
        >
          {room.title}
        </Letter>
      </TypeLetter>
    </Container>
  )
}

const TypeLetter = styled.div`
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  height: 55px;
  position: absolute;
  left: 0px;
  bottom: -20px;
  background: black;
  z-index: 3;
  @media ${device.laptop} {
    height: auto;
    padding: 10px 40px;
    text-align: center;
  }
`

const Container = styled.div`
  position: relative;
  margin-bottom: 30px;
`

const Background = styled.div`
  width: 100%;
  position: relative;
  & img {
    width: 100%;
    min-height: 250px;
  }
  @media ${device.laptop} {
    & img {
      width: 100%;
      min-height: 400px;
    }
  }
`

const BackIcon = styled.img`
  position: fixed;
  top: 38px;
  left: 16px;
  z-index: 5;
  @media ${device.laptop} {
    display: none;
  }
`

const EditButton = styled.div`
  display: flex;
  padding-top: 12px;
  cursor: pointer;
  flex-direction: row-reverse;
  position: absolute;
  top: 10px;
  right: 20px;
  @media ${device.laptop} {
    padding-top: 15px;
  }
`

const CircleItem = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 3px;
  background: #000000;
`

export default RoomHeader
