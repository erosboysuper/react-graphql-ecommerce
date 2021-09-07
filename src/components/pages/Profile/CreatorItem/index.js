import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const CreatorItem = () => {
  const data = {
    image:
      'https://www.datocms-assets.com/34700/1610550812-tbo-bikini-low-rise.png',
    type: 'Room',
    name: 'Sport Underwear',
    creator: 'jane',
    coCreator: ['jeff', 'tracy'],
  }
  return (
    <Container>
      <RoomBrief>
        <img src={data.image} />
        <Info>
          <Letter
            font="Titillium Bold"
            size={12}
            sizeLaptopL={13}
            sizeLaptop={12}
            sizeDesktop={14}
            color="#FF8C00"
          >
            ROOM
          </Letter>
          <Letter
            font="Titillium Bold"
            size={18}
            sizeLaptopL={26}
            sizeLaptop={22}
            sizeDesktop={30}
            color="#161617"
          >
            Sport underwear
          </Letter>
        </Info>
      </RoomBrief>
      <Creators>
        <Creator>
          <img src={dummyProfilePic} />
          <Info>
            <Letter
              font="Titillium Bold"
              size={12}
              sizeLaptop={12}
              sizeLaptopL={13}
              sizeDesktop={14}
              color="#FF8C00"
            >
              Creator
            </Letter>
            <Letter
              font="Titillium Bold"
              size={16}
              sizeLaptop={16}
              sizeLaptopL={18}
              sizeDesktop={20}
              color="#202122"
            >
              {data.creator}
            </Letter>
          </Info>
        </Creator>
        {data.coCreator.map((item, index) => {
          return (
            <Creator key={'create' + index}>
              <img src={dummyProfilePic} />
              <Info>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={12}
                  sizeLaptopL={13}
                  sizeDesktop={14}
                  color="#FF8C00"
                >
                  Co-Creators
                </Letter>
                <Letter
                  font="Titillium Bold"
                  size={16}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#202122"
                >
                  {item}
                </Letter>
              </Info>
            </Creator>
          )
        })}
      </Creators>
    </Container>
  )
}

const Container = styled.div`
  width: 97%;
  border-top: 1px solid black;
  margin-top: 10px;

  @media ${device.laptop} {
    width: 100%;
    border-left: 1px solid black;
    padding-left: 20px;
    margin: 24px;
    border-top: none;
  }
`

const RoomBrief = styled.div`
  & img {
    width: 100px;
    height: 100px;
    margin-right: 15px;
  }
  display: flex;
  align-items: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

const Creators = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Creator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 50%;
  & img {
    width: 46px;
    height: 46px;
    margin-right: 10px;
  }
  @media ${device.laptop} {
    & img {
      width: 56px;
      height: 56px;
      margin-right: 10px;
    }
  }
`

export default CreatorItem
