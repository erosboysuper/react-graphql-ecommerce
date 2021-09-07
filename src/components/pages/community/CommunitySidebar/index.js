import React, { useContext, useEffect, useState, useRef } from 'react'
import { RectShape } from 'react-placeholder/lib/placeholders'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import PlusIcon from '~/images/Assets/PlusIcon.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

import RoomImage from '~/components/Common/RoomImage'
import AllRooms from '~/components/pages/community/AllRooms'
import AllRoomsModal from '~/components/pages/community/AllRoomsModal'

const CommunitySidebar = () => {
  const {
    createRoomControl,
    seeMore,
    setSeeMore,
    roomsData,
    getRooms,
    userInfo,
    userHeaders,
    allRoomModal,
    setAllRoomModal,
  } = useContext(CommunityContext)
  const { isMobile } = useContext(StoreContext)
  const _isMounted = useRef(true)
  const [rooms, setRooms] = useState([])
  const [myRooms, setMyRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const placeholderStyle = { width: 123, height: 130, flex: `0 0 auto` }

  useEffect(() => {
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getRooms().then(() => {
      if (_isMounted.current) {
        setIsLoading(false)
      }
    })
  }, [userHeaders])

  useEffect(() => {
    if (userInfo) {
      const _myRooms = roomsData.filter(room => {
        const roomMembers = room.members.map(x => x.id)
        return (
          room.owner === userInfo.user.id ||
          roomMembers.indexOf(userInfo.user.id) !== -1
        )
      })
      if (_isMounted.current) {
        setMyRooms(_myRooms)
      }
    } else if (_isMounted.current) {
      setMyRooms([])
    }
    if (_isMounted.current) {
      setRooms(roomsData)
    }
  }, [roomsData])

  return (
    <Container width={seeMore ? 60 : 34}>
      {userInfo && (
        <React.Fragment>
          <DesktopContain>
            <Letter
              font="Titillium Black"
              sizeDesktop={34}
              sizeLaptopL={30}
              sizeLaptop={24}
              color="#202122"
            >
              Your Rooms
            </Letter>
          </DesktopContain>
          <ImageContain>
            <ImgContainer>
              {isLoading === true && (
                <PlaceholderDiv>
                  <RectShape color="#E0E0E0" style={placeholderStyle} />
                  <RectShape color="#E0E0E0" style={placeholderStyle} />
                  <RectShape color="#E0E0E0" style={placeholderStyle} />
                </PlaceholderDiv>
              )}
              {myRooms.length > 0 &&
                myRooms
                  .slice(0, seeMore || isMobile ? myRooms.length : 9)
                  .map(room => <RoomImage room={room} key={room.id} />)}
              {isLoading === false && myRooms.length === 0 && (
                <NoRecord>You haven't created any room yet!</NoRecord>
              )}
            </ImgContainer>
          </ImageContain>
        </React.Fragment>
      )}

      {!userInfo && (
        <MobileContain>
          <ImageContain>
            <ImgContainer>
              {isLoading === true && (
                <PlaceholderDiv>
                  <RectShape color="#E0E0E0" style={placeholderStyle} />
                  <RectShape color="#E0E0E0" style={placeholderStyle} />
                  <RectShape color="#E0E0E0" style={placeholderStyle} />
                </PlaceholderDiv>
              )}
              {rooms.length > 0 &&
                rooms.map(room => <RoomImage room={room} key={room.id} />)}
            </ImgContainer>
          </ImageContain>
        </MobileContain>
      )}

      <CreateRoom width={seeMore ? 57 : 100}>
        <PlusIconImg
          src={PlusIcon}
          alt="New Room Icon"
          onClick={() => createRoomControl()}
          right={seeMore ? '44%' : '16px'}
          style={{ cursor: 'pointer' }}
        />
        <Letter
          font="Titillium Bold"
          size={16}
          sizeLaptop={16}
          sizeLaptopL={18}
          sizeDesktop={20}
          onClick={() => createRoomControl()}
          style={{ cursor: 'pointer' }}
        >
          CREATE ROOM
        </Letter>

        <SeeAll>
          <MobileContain>
            <Letter
              font="Titillium Bold"
              size={15}
              sizeDesktop={18}
              color="#ff8c00"
              onClick={() => setAllRoomModal(true)}
            >
              SEE ALL &nbsp; &nbsp;
            </Letter>
            <img src={ArrowImg} alt="Arrow Icon" />
          </MobileContain>

          {userInfo && (
            <DesktopContain
              onClick={() => setSeeMore(!seeMore)}
              style={{ cursor: `pointer` }}
            >
              <Letter
                font="Titillium Bold"
                size={15}
                sizeLaptop={14}
                sizeLaptopL={16}
                sizeDesktop={18}
                color="#ff8c00"
              >
                {seeMore ? 'SEE LESS' : 'SEE MORE'}
                &nbsp; &nbsp;
              </Letter>
              <img src={ArrowImg} alt="Arrow Icon" />
            </DesktopContain>
          )}
        </SeeAll>
      </CreateRoom>
      <DesktopContain>
        <AllRooms rooms={rooms} />
      </DesktopContain>
      {allRoomModal && <AllRoomsModal rooms={rooms} />}
    </Container>
  )
}

const Container = styled.div`
  padding-top: 11px;
  @media ${device.laptop} {
    margin-left: 30px;
    position: relative;
    width: ${props => props.width}%;
  }
`

const ImgContainer = styled.div`
  display: flex;
  width: auto;
  overflow: auto;
  padding-left: 16px;
  overflow-y: hidden;
  @media ${device.laptop} {
    flex-wrap: wrap;
    width: 100%;
    padding-left: 0px;
    justify-content: flex-start;
  }
`

const NoRecord = styled.div`
  width: 100%;
  padding: 5px 0px 25px 0px;
  color: #a9acaf;
`

const CreateRoom = styled.div`
  padding-left: 16px;
  padding-top: 14px;
  display: flex;
  align-items: center;
  & img {
    margin-right: 10px;
  }
  & span {
    color: #202122;
  }
  width: fit-content;
  @media ${device.laptop} {
    padding-top: 0px;
    background: #ff8c00;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.width}%;
    & span {
      color: white;
    }
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 83px;
  }
`

const SeeAll = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  @media ${device.laptop} {
    top: 17px;
    right: 0px;
    & span {
      color: #ff8c00 !important;
    }
    & img {
      margin-top: -1px;
    }
  }
  @media ${device.laptopL} {
    top: 26px;
    & img {
      margin-top: -5px;
    }
  }
  @media ${device.desktop} {
    top: 30px;
  }
`

const ImageContain = styled.div`
  overflow-y: hidden;
  overflow: auto;
  width: 100%;
`

const PlusIconImg = styled.img`
  @media ${device.laptop} {
    position: absolute;
    right: ${props => props.right};
    width: 46px;
  }
  @media ${device.laptopL} {
    width: 56px;
  }
  @media ${device.desktop} {
    width: 62px;
  }
`

const PlaceholderDiv = styled.div`
  margin-bottom: 20px;
  display: flex;
`

export default CommunitySidebar
