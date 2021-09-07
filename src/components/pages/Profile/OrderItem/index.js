import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import EmptyIcon from '~/images/Assets/DESKTOP-Empty.svg'

const OrderItem = ({ info }) => {
  return (
    <Container>
      <img src={info.image} />
      <InfoContent>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeLaptop={18}
          sizeLaptopL={21}
          sizeDesktop={24}
          color="#202122"
        >
          {info.price}
        </Letter>
        <Letter
          font="Titillium Bold"
          sizeDesktop={24}
          sizeLaptop={18}
          sizeLaptopL={21}
          size={18}
          color="#202122"
        >
          {info.name}
        </Letter>
        <Detail>
          <Letter
            font="Titillium Web"
            sizeDesktop={18}
            sizeLaptopL={16}
            sizeLaptop={14}
            size={14}
            color="#A9ACAF"
          >
            Size: {info.size} &nbsp;
          </Letter>

          <Letter
            font="Titillium Web"
            sizeDesktop={18}
            sizeLaptopL={16}
            sizeLaptop={14}
            size={14}
            color="#A9ACAF"
          >
            Color: {info.color}&nbsp;
          </Letter>

          <Letter
            font="Titillium Web"
            sizeDesktop={18}
            sizeLaptopL={16}
            sizeLaptop={14}
            size={14}
            color="#A9ACAF"
          >
            Quantity: {info.quantity}
          </Letter>
        </Detail>
      </InfoContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  & img {
    width: 88px;
    height: 88px;
    margin-right: 20px;
    margin-top: 0px;
  }
  @media ${device.laptop} {
    align-items: center;
    & img {
      width: 90px;
      height: 90px;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 110px;
      height: 110px;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 140px;
      height: 140px;
      margin-right: 20px;
      margin-top: 20px;
    }
  }
`

const Header = styled.div``

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`

export default OrderItem
