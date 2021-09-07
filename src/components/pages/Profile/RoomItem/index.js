import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import { dateFormat } from '~/utils/functions'
import DefaultRoomImgSmall from '~/images/Assets/room-default-small.jpg'

const RoomItem = ({ room }) => {
  return (
    <Container>
      <Link to={`/room/${room.slug}`} title={room.title}>
        <img
          src={room.image || DefaultRoomImgSmall}
          alt={room.title}
          title={room.title}
        />
        <DetailContent>
          <Letter font="Titillium Bold" size={18} color="#7D7F81">
            {room.members.length || 0} members
          </Letter>
          <Letter font="Titillium Bold" size={18} color="#161617">
            {room.title}
          </Letter>
          <Letter font="Titillium Bold" size={18} color="#F57B00">
            Active since: {dateFormat(room.created_at)}
          </Letter>
        </DetailContent>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin-bottom: 20px;
  padding-left: 16px;
  & a {
    display: flex;
    align-items: center;
  }
  & img {
    width: 123px;
    margin-right: 20px;
  }
  @media ${device.laptop} {
    width: 50%;
    padding-left: unset;
    & img {
      width: 90px;
      margin-right: 20px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 110px;
      margin-right: 20px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 140px;
    }
  }
`

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
`

export default RoomItem
