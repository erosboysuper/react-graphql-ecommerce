import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutTotal = () => {
  const { shippingOption } = useContext(CheckoutContext)
  const [activeAddCode, setActiveAddCode] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  const onAddCode = () => {
    setActiveAddCode(true)
  }

  const onkeypress = e => {
    if (e.keyCode == 13) {
      setActiveAddCode(false)
    }
  }
  return (
    <React.Fragment>
      <Container>
        <TotalSection>
          <span>SubTotal</span>
          <span>$59.96</span>
        </TotalSection>
        <ShippingSection>
          <span>Shipping</span>
          <span>{shippingOption}</span>
        </ShippingSection>
        <DiscountSection>
          <div>
            <span>Gift card or discounts</span>
            <AddCode
              hide={activeAddCode || (!activeAddCode && discountCode !== '')}
              onClick={() => onAddCode()}
            >
              Add code
            </AddCode>
            {discountCode !== '' && !activeAddCode ? (
              <DiscountPrice>-$19.78</DiscountPrice>
            ) : (
              ''
            )}
          </div>
          {activeAddCode ? (
            <DiscountInput
              placeholder="Add your code here"
              onKeyDown={e => onkeypress(e)}
              onChange={e => setDiscountCode(e.target.value)}
            />
          ) : (
            ''
          )}
          {!activeAddCode && discountCode !== '' ? (
            <DiscountCode>{discountCode}</DiscountCode>
          ) : (
            ''
          )}
        </DiscountSection>
        <TotalSection>
          <span>Total</span>
          <span>$59.96</span>
        </TotalSection>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Titillium Web;
  margin-top: 30px;
  @media ${device.laptop} {
  }
`

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 20px;
  & span:first-child {
    font-family: Titillium Black;
  }
  & span:last-child {
    font-family: Titillium Bold;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 20px;
  }
`

const ShippingSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
  & span:last-child {
    color: #ff8c00;
  }
  @media ${device.tablet} {
    font-size: 15px;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`

const DiscountSection = styled.div`
  margin-bottom: 30px;
  & > div {
    display: flex;
    justify-content: space-between;
  }

  @media ${device.tablet} {
    font-size: 15px;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`

const AddCode = styled.div`
  color: #a9acaf;
  cursor: pointer;

  display: ${props => (props.hide ? 'none' : 'block')};
  &:active {
    transform: scale(1.05);
  }
`

const DiscountCode = styled.div`
  color: #a9acaf;
  font-family: Titillium Bold;
`

const DiscountPrice = styled.div`
  color: #ff8c00;
  font-size: 18px;
  font-family: Titillium Bold;
`

const DiscountInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 5px 15px;
  margin-top: 15px;
  background-color: #f2f2f7;
  outline: none;
  border: none;
`

export default CheckoutTotal
