import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import EmptyList from '~/components/pages/Profile/EmptyList'
import OrderItem from '~/components/pages/Profile/OrderItem'
import DetailIcon from '~/images/Assets/DESKTOP-More-details.svg'
import LessIcon from '~/images/Assets/DESKTOP-Less-details.svg'

const DeliveryList = ({ detail }) => {
  const [active, setActive] = useState(false)
  return (
    <Container>
      <DeliveryBar>
        <Letter
          font="Titillium Bold"
          sizeDesktop={24}
          sizeLaptopL={21}
          sizeLaptop={18}
          size={20}
          color="#202122"
        >
          $29.98 /1 item
        </Letter>
        <StatusTime>
          <Letter
            sizeDesktop={18}
            sizeLaptopL={16}
            sizeLaptop={14}
            size={14}
            font="Titillium Bold"
            color="#FF8C00"
          >
            DELIVERED
          </Letter>
          <Letter
            sizeDesktop={18}
            sizeLaptopL={16}
            sizeLaptop={14}
            size={12}
            font="Titillium Bold"
            color="#A9ACAF"
          >
            21.03.2021
          </Letter>
        </StatusTime>
      </DeliveryBar>
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
            Shipped to: Jake Muller
          </Letter>
          <Letter font="Titillium Web" size={16} color="#202122">
            Goldbrunnenstrasse 151, 8055 Zürich, Switzerland
          </Letter>
        </div>
      </TipLetter>
      <DesktopContain>
        {active === false && (
          <DetailButton onClick={() => setActive(true)}>
            <Letter
              font="Titillium Web"
              sizeDesktop={15}
              sizeLaptopL={14}
              sizeLaptop={13}
              color="#202122"
            >
              ORDER DETAILS
            </Letter>
            &nbsp; &nbsp;
            <img src={DetailIcon} />
          </DetailButton>
        )}
        {active &&
          detail.map((item, num) => {
            return <OrderItem info={item} key={num + 'item'} />
          })}
        {active === true && (
          <HideButton onClick={() => setActive(false)}>
            <Letter
              font="Titillium Web"
              sizeDesktop={15}
              sizeLaptopL={14}
              sizeLaptop={13}
              color="#202122"
            >
              HIDE ORDER DETAILS
            </Letter>
            &nbsp; &nbsp;
            <img src={LessIcon} />
          </HideButton>
        )}
      </DesktopContain>
      <MobileContain>
        {detail.map((item, num) => {
          return <OrderItem info={item} key={num + 'item'} />
        })}
      </MobileContain>
    </Container>
  )
}

const Container = styled.div``

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

const DetailButton = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: fit-content;
  padding: 10px 10px;
  margin-top: -40px;
  @media ${device.laptop} {
    padding: 7px 7px;
  }
  @media ${device.laptopL} {
    padding: 8px 8px;
  }
  @media ${device.desktop} {
    padding: 10px 10px;
  }
`

const HideButton = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: fit-content;
  padding: 10px 10px;
  margin-top: 10px;
`

const DeliveryBar = styled.div`
  background: #f7f7fa;
  height: 72px;
  width: 95%;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 40px;
`

const StatusTime = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20px;
`

export default DeliveryList
