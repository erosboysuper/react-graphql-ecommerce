import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import { Space, Letter, MobileContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import useDebounce from '~/utils/use-debounce'

import CloseSearchImg from '~/images/Assets/Close-search.svg'
import CloseFilterImg from '~/images/Assets/Close-filters.svg'

import CommunitySearchItem from '~/components/pages/community/CommunitySearchItem'

const CommunitySearchModal = () => {
  const { setSearchModal } = useContext(CommunityContext)
  const [rooms, setRooms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [apiCalled, setApiCalled] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const textRef = useRef(null)

  useEffect(() => {
    textRef.current.focus()
  }, [])

  useEffect(() => {
    setApiCalled(false)
    if (debouncedSearchTerm) {
      try {
        const regStr = new RegExp(debouncedSearchTerm, 'i')
        fetch(`${process.env.API_BASE}/search/${debouncedSearchTerm}`, {
          method: 'GET',
          async: true,
        })
          .then(res => res.json())
          .then(res => {
            const _rooms = res.map(room => {
              room['titleHtml'] = room.title.replace(regStr, '<u>$&</u>')
              return room
            })
            setRooms(_rooms)
            setApiCalled(true)
          })
      } catch {
        setRooms([])
      }
    } else {
      setRooms([])
    }
  }, [debouncedSearchTerm])

  return (
    <Container>
      <MobileContain>
        <div>
          <Space height={30} />
          <center>
            <Letter
              font="Titillium Web"
              size={14}
              sizeLaptop={14}
              sizeLaptopL={17}
              sizeDesktop={20}
              color="#a9acaf"
            >
              SEARCH
            </Letter>
          </center>
          <Space height={40} />
        </div>
      </MobileContain>
      <div>
        <InputContainer>
          <Input
            placeholder="Search By word or room name..."
            onChange={event => setSearchTerm(event.target.value)}
            value={searchTerm}
            ref={textRef}
          />
          {searchTerm !== '' && (
            <CloseContain onClick={() => setSearchTerm('')}>
              <img src={CloseSearchImg} alt="close" />
            </CloseContain>
          )}
        </InputContainer>
        <Space height={30} />
      </div>
      {(rooms.length > 0 || apiCalled) && (
        <ResultContainer>
          <ResultProducts>
            {rooms.length > 0 &&
              rooms.map(room => (
                <div key={room.id}>
                  <CommunitySearchItem room={room} />
                </div>
              ))}
            {rooms.length === 0 && apiCalled && (
              <NotFound>No Record Found!</NotFound>
            )}
          </ResultProducts>
        </ResultContainer>
      )}
      <CloseImg
        src={CloseFilterImg}
        alt="Close"
        onClick={() => setSearchModal(false)}
      />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: auto;
  background-color: ${darkFont};
  min-height: 100vh;
  z-index: 100;
  width: 100%;
  height: 100%;
`

const CloseImg = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 105;
  cursor: pointer;
  @media ${device.laptop} {
    width: 66px;
    height: 66px;
    bottom: 20%;
    right: 7%;
  }
  @media ${device.laptopL} {
    width: 75px;
    height: 75px;
  }
  @media ${device.desktop} {
    width: 96px;
    height: 96px;
  }
`

const ResultContainer = styled.div`
  @media ${device.laptop} {
    display: flex;
    padding-left: 13%;
  }
  @media ${device.laptopL} {
    display: flex;
    padding-left: 15%;
  }
`

const ResultProducts = styled.div`
  @media ${device.laptop} {
    width: 40%;
  }
`

const Input = styled.input`
   {
    width: 90%;
    border: none;
    border-bottom: 1px solid white;
    background: transparent;
    padding: 5px;
    color: white;
    z-index: 10;
    -webkit-appearance: none;
  }
  & ::placeholder {
    color: #7d7f81;
    font-size: 18px;
    font-family: Titillium Light;
  }
  @media ${device.laptop} {
    width: 74%;
    padding: 5px;
    font-size: 25px;
    margin-top: 10%;
    & ::placeholder {
      font-size: 25px;
    }
  }
  @media ${device.laptopL} {
    width: 70%;
    font-size: 32px;
    & ::placeholder {
      font-size: 32px;
    }
  }
  @media ${device.desktop} {
    width: 70%;
    font-size: 40px;
    & ::placeholder {
      font-size: 40px;
    }
  }
`

const InputContainer = styled.div`
  text-align: center;
  position: relative;
`

const CloseContain = styled.div`
  position: absolute;
  right: 5%;
  color: white;
  top: 2px;
  @media ${device.laptop} {
    position: absolute;
    right: 15%;
    color: white;
    top: 2px;
    margin-top: 10.5%;
    background: black;
    font-family: Titillium Bold;
    font-size: 14px;
    display: flex;
    padding: 5px 10px;
    align-items: center;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`

const NotFound = styled.div`
  color: #7d7f81;
  text-align: center;
`

export default CommunitySearchModal
