import React from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import QuotationOpen from '~/images/Assets/DESKTOP-Quotation-mark-open.svg'
import QuotationClose from '~/images/Assets/DESKTOP-Quotation-mark-close.svg'

const GoodPoints = ({ testimonialMessage, testimonialGiveBy }) => {
  return (
    <Container>
      <LarryLetter>
        <Letter
          font="Titillium Light"
          sizeDesktop={50}
          sizeLaptopL={42}
          sizeLaptop={30}
          sizeMobileS={22}
          sizeMobileM={26}
          sizeMobileL={26}
          color="#202122"
        >
          {testimonialMessage} &nbsp;
          <Letter
            font="Titillium Bold"
            sizeDesktop={44}
            sizeLaptopL={38}
            sizeLaptop={30}
            sizeMobileS={20}
            sizeMobileM={22}
            sizeMobileL={22}
            color="#202122"
          >
            {testimonialGiveBy}
          </Letter>
        </Letter>
        <OpenImg src={QuotationOpen} alt="QuotationOpen" />
        <CloseImg src={QuotationClose} alt="QuotationClose" />
      </LarryLetter>
    </Container>
  )
}

const Container = styled.div``

const LarryLetter = styled.div`
  height: auto;
  background: transparent
    linear-gradient(85deg, var(--unnamed-color-f2f2f7) 0%, #fdfdfd 100%) 0% 0%
    no-repeat padding-box;
  background: transparent linear-gradient(85deg, #f2f2f7 0%, #fdfdfd 100%) 0% 0%
    no-repeat padding-box;
  width: 100%;
  padding-left: 17%;
  padding-right: 17%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-style: italic;
  line-height: 1.2;
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
  & span {
    z-index: 4;
  }
  @media ${device.mobileS} {
    padding-left: 17px;
    padding-right: 17px;
    height: auto;
    & img {
      width: 55px;
    }
  }
  @media ${device.laptop} {
    padding-left: 17%;
    padding-right: 17%;
    padding-top: 30px;
    padding-bottom: 30px;
    height: auto;
    & img {
      width: unset;
    }
  }
`

const OpenImg = styled.img`
  position: absolute;
  top: -10px;
  left: 15%;
`

const CloseImg = styled.img`
  position: absolute;
  bottom: -10px;
  right: 15%;
`

export default GoodPoints
