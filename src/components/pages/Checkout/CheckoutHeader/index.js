import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutHeader = () => {
  const {} = useContext(CheckoutContext)

  return (
    <React.Fragment>
      <Container>
        <img
          src={require('~/images/Assets/DESKTOP-T-Bo Logo.svg')}
          alt="tbo-logo"
        ></img>
        <BackIcon>
          <img
            src={require('~/images/Assets/DESKTOP-Arrow-back.svg')}
            alt="tbo-logo"
          ></img>
        </BackIcon>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  background-color: #f2f2f7;
  & > img {
    max-width: 160px;
  }
  @media ${device.laptop} {
    margin-bottom: 30px;
    background-color: #fff;
    & > img {
      max-width: 200px;
    }
  }
`

const BackIcon = styled.div`
  position: absolute;
  left: 30px;
  & > img {
    width: 50px;
    height: 50px;
  }
  @media ${device.laptop} {
    & > img {
      width: 40px;
      height: 40px;
    }
  }
`

export default CheckoutHeader
