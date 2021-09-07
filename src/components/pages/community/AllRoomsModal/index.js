import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import loadable from '@loadable/component'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import ArrowBack from '~/images/Assets/Arrow-back.svg'
import CommunityContext from '~/context/CommunityContext'

const RoomImage = loadable(() => import('~/components/Common/RoomImage'))

const AllRoomsModal = ({ rooms }) => {
  const { setAllRoomModal, createRoomControl, categoryData } =
    useContext(CommunityContext)
  const [categoryRooms, setCategoryRooms] = useState([])

  useEffect(() => {
    let _categoryRooms = {}
    rooms.forEach(r => {
      const categories = r.categories || []
      categories.forEach(c => {
        if (!_categoryRooms[c.id]) {
          const category = categoryData.find(x => x.id === c.id)
          _categoryRooms[c.id] = {
            id: c.id,
            title: c.title,
            sort_order: category ? category.sort_order : 0,
            rooms: [],
          }
        }
        _categoryRooms[c.id].rooms.push(r)
      })
    })
    _categoryRooms = Object.values(_categoryRooms).sort(
      (a, b) => a.sort_order - b.sort_order
    )
    setCategoryRooms(_categoryRooms)
  }, [rooms, categoryData])

  return (
    <Container>
      <Header>
        <BackImage>
          <img
            src={ArrowBack}
            onClick={() => {
              setAllRoomModal(false)
            }}
            alt="arrow"
          />
        </BackImage>
        <CreateRoomButton>
          <CreateButton>
            <Letter
              font="Titillium Bold"
              size={13}
              sizeMobileS={11}
              sizeLaptopL={19}
              sizeLaptop={16}
              sizeDesktop={22}
              onClick={() => {
                setAllRoomModal(false)
                createRoomControl()
              }}
            >
              CREATE ROOM
            </Letter>
          </CreateButton>
          <ShadowButton />
        </CreateRoomButton>
      </Header>
      <AllRoom>
        <Title>
          <Letter
            font="Titillium Black"
            size={20}
            sizeLaptop={24}
            sizeLaptopL={30}
            sizeDesktop={34}
            color="black"
          >
            Explore Rooms
          </Letter>
          {categoryRooms.map(category => (
            <CategoryRooms key={category.id}>
              <Category>
                <Letter>{category.title}</Letter>
              </Category>
              <RoomList>
                {category.rooms.map(room => (
                  <RoomImage room={room} key={room.id} />
                ))}
              </RoomList>
            </CategoryRooms>
          ))}
        </Title>
      </AllRoom>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background: #f2f2f7;
  z-index: 103;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  @media ${device.laptop} {
    display: none;
  }
`

const BackImage = styled.div`
  position: fixed;
  top: 38px;
  left: 16px;
  z-index: 20;
  & img {
    z-index: 120;
  }
`

const AllRoom = styled.div``

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 16px;
`

const CategoryRooms = styled.div`
  position: relative;
  padding-top: 65px;
  @media ${device.laptop} {
    margin-top: 57px;
    padding-top: 75px;
  }
`

const Category = styled.div`
  width: auto;
  padding: 1px;
  height: auto;
  border-radius: 30px;
  padding: 7px 20px;
  border: 1px solid black;
  margin-right: 6px;
  position: absolute;
  right: 9px;
  top: 16px;
  display: table;
  margin: auto;
  @media ${device.laptop} {
    left: 0px;
    padding: 10px 25px;
  }
`

const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Header = styled.div`
  height: 90px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 30px;
`

const CreateButton = styled.button`
  background: #ff8c00;
  height: 40px;
  width: 100%;
  color: white;
  position: absolute;
  top: -5px;
  left: -5px;
  border: 2px solid #161617;
`

const ShadowButton = styled.div`
  background: transparent;
  height: 40px;
  width: 100%;
  color: white;

  border: 2px solid #161617;
`

const CreateRoomButton = styled.div`
  position: relative;
  width: 38%;
`

export default AllRoomsModal
