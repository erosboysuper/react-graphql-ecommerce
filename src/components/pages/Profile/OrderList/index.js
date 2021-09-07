import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, MobileContain } from '~/utils/styles'

import OrderItem from '~/components/pages/Profile/OrderItem'
import DeliveryList from '~/components/pages/Profile/DeliveryList'

import ArrowBackImg from '~/images/Assets/Arrow-back.svg'
import { items, deliveryItems } from './dummy'

const OrderList = ({ closeCB }) => {
  return (
    <Container>
      <MobileContain>
        <img src={ArrowBackImg} onClick={() => closeCB()} />
      </MobileContain>
      <MobileContain>
        <br />
        <Letter font="Titillium Black" size={20} color="#202122">
          Your Orders
        </Letter>
        <br />
      </MobileContain>
      <DeliveredBar>
        <Letter
          font="Titillium Bold"
          size={20}
          sizeLaptopL={21}
          sizeLaptop={18}
          sizeDesktop={24}
          color="white"
        >
          $29.98 /1 item
        </Letter>
        <StatusTime>
          <Letter
            size={14}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            font="Titillium Bold"
            color="#FF8C00"
          >
            TO BE DELIVERED ON
          </Letter>
          <Letter
            sizeDesktop={18}
            size={12}
            sizeLaptopL={16}
            sizeLaptop={14}
            font="Titillium Bold"
            color="white"
          >
            21.03.2021
          </Letter>
        </StatusTime>
      </DeliveredBar>
      <TipLetter>
        <div>
          <Letter
            font="Titillium Bold"
            sizeDesktop={18}
            sizeLaptopL={16}
            sizeLaptop={14}
            size={16}
            color="#202122"
          >
            To be shipped to: Jake Muller
          </Letter>
          <Letter font="Titillium Web" size={16} color="#202122">
            Goldbrunnenstrasse 151, 8055 Zürich, Switzerland
          </Letter>
        </div>
      </TipLetter>
      {items
        .filter(item => item.status === null)
        .map((item, index) => {
          return <OrderItem info={item} key={'list' + index} />
        })}

      {deliveryItems.map((detail, num) => {
        return <DeliveryList detail={detail} key={'detail' + num} />
      })}
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: 5;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  background: white;
  padding-top: 38px;
  @media ${device.laptop} {
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

const DeliveredBar = styled.div`
  background: #202122;
  height: 72px;
  width: 95%;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
`

const StatusTime = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20px;
`

const TipLetter = styled.div`
  display: flex;
  justify-content: flex-start;
  & div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
  @media ${device.laptop} {
    justify-content: flex-end;
  }
`

export default OrderList
