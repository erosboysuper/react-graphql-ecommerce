import React, { useContext } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import ProductContext from '~/context/ProductContext'

const TouchPanel = ({ wantToPartnerTitle, wantToPartnerButtonText }) => {
  const { setContactModal } = useContext(ProductContext)
  return (
    <Container>
      <LetterContainer>
        <Letter
          font="Titillium Bold"
          sizeDesktop={44}
          sizeLaptopL={36}
          sizeLaptop={30}
          sizeMobileS={20}
          sizeMobileM={22}
          sizeMobileL={24}
          color="#202122"
        >
          {wantToPartnerTitle}
        </Letter>
      </LetterContainer>
      <ButtonContainer onClick={() => setContactModal(true)}>
        <Letter
          font="Titillium Bold"
          sizeDesktop={22}
          sizeLaptopL={19}
          sizeLaptop={16}
          sizeMobileS={12}
          sizeMobileM={13}
          sizeMobileL={14}
          color="white"
        >
          {wantToPartnerButtonText}
        </Letter>
      </ButtonContainer>
      <Shadow />
    </Container>
  )
}

const Container = styled.div`
  background: #f2f2f7;
  height: 230px;
  margin-bottom: 150px;
  position: relative;
  margin-top: 20px;
  @media ${device.laptop} {
    height: 170px;
  }
  @media ${device.laptopL} {
    height: 200px;
  }
  @media ${device.desktop} {
    height: 230px;
  }
`

const ButtonContainer = styled.div`
  width: 190px;
  height: 60px;
  background: #ff8c00;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #202122;
  z-index: 3;
  cursor: pointer;
  @media ${device.laptop} {
    width: 200px;
    height: 60px;
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
  }
`

const Shadow = styled.div`
  width: 190px;
  height: 60px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-47%, 59%);
  border: 2px solid #202122;
  @media ${device.laptop} {
    width: 200px;
    height: 60px;
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
  }
`

const LetterContainer = styled.div`
  text-align: center;
  padding-top: 54px;
  width: 59%;
  margin: auto;
  @media ${device.laptop} {
    width: unset;
    margin: unset;
  }
`

export default TouchPanel
