import React from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import RoomImage from '~/components/Common/RoomImage'

import CloseImg from '~/images/Assets/Close-modal.svg'

const SuggestRoom = () => {
  const rooms = [
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Working Under Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
    {
      image:
        'https://cdn2.apstatic.com/photos/climb/115311409_smallMed_1536799911.jpg',
      title: 'Sports Underwear',
    },
  ]

  const RoomPreviewRender = () => {
    const List = rooms.map(room => {
      return <RoomImage room={room} key={room.id} />
    })
    return List
  }

  return (
    <Container>
      <Letter font="Titillium Bold" size={13} sizeDesktop={20} color="#FF8C00">
        ROOMS
      </Letter>
      <CloseButton>
        <img src={CloseImg} alt="Close Icon" />
      </CloseButton>
      <Title>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeDesktop={28}
          color="#202122"
        >
          Suggested rooms for Sports
        </Letter>
      </Title>
      <ImgContain>
        <ImgContainer length={rooms.length}>{RoomPreviewRender()}</ImgContainer>
      </ImgContain>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  padding-top: 17px;
  height: 250px;
  background: #f2f2f7;
  position: relative;
`

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 16px;
  & img {
    width: 28px;
  }
  @media ${device.laptop} {
    & img {
      width: 38px;
    }
  }
`
const ImgContainer = styled.div`
  display: flex;
  width: ${props => (props.length * 100) / 3}%;

  overflow: auto;
  overflow-y: hidden;
  margin-top: 16px;
`

const ImgContain = styled.div`
  overflow-y: hidden;
  overflow: auto;
`

const Title = styled.div``

export default SuggestRoom
