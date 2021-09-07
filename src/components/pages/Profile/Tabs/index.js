import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, MobileContain } from '~/utils/styles'

import ArrowImg from '~/images/Assets/DESKTOP-Arrow-orange.svg'

const Tabs = ({ tablist, sendTabItem }) => {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (window.innerWidth && window.innerWidth >= 1024) {
      sendTabItem(active)
    }
  }, [window.innerWidth])
  return (
    <Container>
      {tablist.map((item, index) => {
        return (
          <TabItem
            onClick={() => {
              setActive(index)
              sendTabItem(index)
            }}
            active={index === active ? true : false}
            key={index}
          >
            <Letter sizeDesktop={28} sizeLaptopL={24} sizeLaptop={20} size={18}>
              {item}
            </Letter>
            <MobileContain>
              <img src={ArrowImg} />
            </MobileContain>
          </TabItem>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
  }
`

const TabItem = styled.div`
  border-bottom: 1px solid #202122;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12.8px;
  margin-bottom: 22px;
  cursor: pointer;
  font-family: 'Titillium Black';
  & img {
    width: 17px;
  }
  @media ${device.laptop} {
    margin-left: 20px;
    border-bottom: ${props => (props.active ? 2 : 0)}px solid black;
    font-family: ${props =>
      props.active ? 'Titillium Bold' : 'Titillium Light'};
  }
`

export default Tabs
