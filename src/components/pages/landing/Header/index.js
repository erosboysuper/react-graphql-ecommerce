import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'

const Header = ({ promotionText }) => {
  return (
    <Container>
      <span>{promotionText}</span>
    </Container>
  )
}

const Container = styled.div`
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff8c00;
  & span {
    font-family: Titillium Bold;
    font-size: 18px;
    letter-spacing: 3px;
    color: white;
  }
  @media ${device.mobileS} {
    & span {
      font-size: 9px;
      letter-spacing: 2px;
    }
  }
  @media ${device.mobileM} {
    & span {
      font-size: 12px;
    }
  }
  @media ${device.mobileL} {
    & span {
      font-size: 12px;
    }
  }
  @media ${device.laptop} {
    & span {
      font-size: 18px;
      letter-spacing: 3px;
    }
  }
`

export default Header
