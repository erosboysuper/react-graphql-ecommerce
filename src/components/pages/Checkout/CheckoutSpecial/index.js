import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutSpecial = () => {
  const {} = useContext(CheckoutContext)

  return (
    <React.Fragment>
      <Container>
        <CloseButton>
          <span>X</span>
        </CloseButton>
        <TitleSection>Special one-time offer!</TitleSection>
        <Body>
          <ProductIcon>
            <img
              src={require('~/images/Assets/Mask.png')}
              alt="mask-product"
            ></img>
          </ProductIcon>
          <BodyRight>
            <Edition>LIMITED EDITION</Edition>
            <Details>
              <p>$14.99</p>
              <p>The mask 3 Pack</p>
            </Details>
            <BodyBottom>
              <Description>
                The TBo Mask 3 pack is made in the same super soft Bambaa Fabric
                for comfort & protection
              </Description>
              <AddItem>
                <Button>
                  <img
                    src={require('~/images/Assets/DESKTOP-More-white.svg')}
                    alt="save-product"
                  ></img>
                </Button>
                <ButtonLabel>ADD ITEM</ButtonLabel>
              </AddItem>
            </BodyBottom>
          </BodyRight>
        </Body>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px 10px;
  border: 1px solid #ff8c00;
  font-family: Titillium Web;
  @media ${device.laptop} {
    margin-top: 80px;
  }
`

const CloseButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  top: 15px;
  right: 10px;
  & span {
    transform: scale(1, 0.9);
  }
  &:hover {
    font-size: 17px;
  }
`

const TitleSection = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-family: Titillium Black;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`

const Body = styled.div`
  display: flex;
  @media ${device.laptop} {
  }
`

const ProductIcon = styled.div`
  margin-right: 10px;
  & img {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 75px;
  }
  @media ${device.laptop} {
    width: 90px;
  }
`

const BodyRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.laptop} {
  }
`

const Edition = styled.div`
  color: #0adb98;
  margin-bottom: 8px;
  font-family: Titillium Bold;
  @media ${device.laptop} {
  }
`

const Details = styled.div`
  font-size: 18px;
  font-family: Titillium Bold;
  & p {
    margin-bottom: 0px;
  }
  @media ${device.laptop} {
  }
`

const BodyBottom = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${device.laptop} {
  }
`

const Description = styled.div`
  color: #a9acaf;
  width: 80%;
  @media ${device.tablet} {
    width: 75%;
    font-size: 13px;
  }
  @media ${device.laptopL} {
    width: 77%;
    font-size: 16px;
  }
`

const AddItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  cursor: pointer;
  @media ${device.laptop} {
  }
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #ff8c00;
  margin-bottom: 5px;
  & img {
    width: 40%;
  }
  @media ${device.tablet} {
    width: 20px;
    height: 20px;
  }
  @media ${device.laptopL} {
    width: 30px;
    height: 30px;
  }
`

const ButtonLabel = styled.div`
  color: #ff8c00;
  font-size: 10px;
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 10px;
  }
  @media ${device.laptopL} {
    font-size: 13px;
  }
`

export default CheckoutSpecial
