import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import RoomImage from '~/components/Common/RoomImage'

const AllRooms = ({ rooms }) => {
  const { categoryData } = useContext(CommunityContext)
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

  return categoryRooms.length > 0 ? (
    <Container>
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
        </Title>
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
      </AllRoom>
    </Container>
  ) : null
}

const Container = styled.div`
  padding-left: 16px;
`

const AllRoom = styled.div``

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 16px;
`

const CategoryRooms = styled.div`
  position: relative;
  padding-top: 57px;
  @media ${device.laptop} {
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

export default AllRooms
