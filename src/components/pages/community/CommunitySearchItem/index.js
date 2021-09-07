import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

const CommunitySearchItem = ({ room }) => {
  const { setSearchModal } = useContext(CommunityContext)

  return (
    <Link to={`/room/${room.slug}`} onClick={() => setSearchModal(false)}>
      <Parent>
        <ImageContainer background={room.image} />
        <Contain>
          <SubTitle>
            <Letter
              font="Titillium Bold"
              size={12}
              sizeLaptop={14}
              sizeLaptopL={17}
              sizeDesktop={20}
              color="#7D7F81"
            >
              {room.members} member{room.members === 1 ? '' : 's'}
            </Letter>
          </SubTitle>
          <Title
            dangerouslySetInnerHTML={{ __html: room.titleHtml || room.title }}
          />
        </Contain>
      </Parent>
    </Link>
  )
}

const Parent = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  height: 70px;
  display: flex;
  padding-left: 5%;
  margin-bottom: 15px;
  @media ${device.laptop} {
    padding-left: 0px;
    height: 80px;
  }
  @media ${device.laptopL} {
    padding-left: 0px;
    height: 100px;
  }
  @media ${device.desktop} {
    padding-left: 0px;
    height: 110px;
  }
`

const ImageContainer = styled.div`
  & {
    height: 70px;
    width: 70px;
    background-color: white;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${props => `${props.background}`});
  }
  @media ${device.laptop} {
    & {
      height: 75px;
      width: 75px;
      background-color: white;
    }
  }
  @media ${device.laptopL} {
    & {
      height: 90px;
      width: 90px;
      background-color: white;
    }
  }
  @media ${device.desktop} {
    & {
      height: 110px;
      width: 110px;
      background-color: white;
    }
  }
`

const Contain = styled.div`
  height: 70px;
  display: block;
  @media ${device.laptop} {
    height: 110px;
  }
`

const SubTitle = styled.div`
  height: 33px;
  color: white;
  padding-left: 15px;
  padding-top: 7px;
  @media ${device.laptop} {
    padding-top: 9px;
    margin-bottom: 4px;
  }
  @media ${device.laptopL} {
    padding-top: 11px;
    margin-bottom: 9px;
  }
  @media ${device.desktop} {
    padding-top: 14px;
    margin-bottom: 15px;
  }
`

const Title = styled.div`
  height: 35px;
  color: white;
  padding-left: 15px;
  font-family: Titillium Bold;
  font-size: 20px;
  color: #ffffff;
  width: 270px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media ${device.laptop} {
    font-size: 22px;
    height: 49px;
  }
  @media ${device.laptopL} {
    font-size: 28px;
    height: 40px;
  }
  @media ${device.desktop} {
    font-size: 34px;
    height: 49px;
  }
`

export default CommunitySearchItem
