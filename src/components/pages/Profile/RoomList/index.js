import React, { useContext, useState, useEffect, useRef } from 'react'
import { MediaBlock } from 'react-placeholder/lib/placeholders'
import styled from 'styled-components'

import { MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import EmptyList from '~/components/pages/Profile/EmptyList'
import RoomItem from '~/components/pages/Profile/RoomItem'

import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

const RoomList = ({ closeCB }) => {
  const _isMounted = useRef(true)
  const { userInfo, roomsData, getRooms } = useContext(CommunityContext)
  const [myRooms, setMyRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      _isMounted.current = false
    }
  })

  useEffect(() => {
    if (!_isMounted.current) return

    if (userInfo && roomsData.length > 0) {
      const _myRooms = roomsData.filter(room => room.owner === userInfo.user.id)
      setMyRooms(_myRooms)
    } else if (userInfo && roomsData.length === 0) {
      setIsLoading(true)
      getRooms().then(() => {
        if (_isMounted.current) {
          setIsLoading(false)
        }
      })
    } else {
      setMyRooms([])
    }
  }, [roomsData])

  return (
    <Container>
      <MobileContain>
        <img src={ArrowBackImg} onClick={() => closeCB()} />
      </MobileContain>
      {isLoading === true && (
        <PlaceholderDiv>
          <MediaBlock color="#E0E0E0" rows={3} />
          <MediaBlock color="#E0E0E0" rows={3} />
        </PlaceholderDiv>
      )}
      {isLoading === false && myRooms.length === 0 && <EmptyList />}
      {myRooms.length > 0 &&
        myRooms.map(room => {
          return <RoomItem room={room} key={room.id} />
        })}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: 103;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  background: white;
  padding-top: 38px;
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    padding-left: 30px;
    position: relative;
    min-height: unset;
    left: unset;
    bottom: unset;
    overflow-y: unset;
    height: unset;
    background: unset;
    z-index: unset;
  }
`

const PlaceholderDiv = styled.div`
  width: 100%;
`

export default RoomList
