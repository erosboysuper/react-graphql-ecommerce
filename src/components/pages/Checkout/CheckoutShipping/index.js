import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutShipping = ({ data }) => {
  const { setShippingOption } = useContext(CheckoutContext)
  const [selected, setSelected] = useState()
  const [show, setShow] = useState(true)

  const onChangeShipping = (index, price) => {
    setSelected(index)
    setShippingOption(price)
  }
  return (
    <React.Fragment>
      <Container>
        <Title>
          {data.title}
          <HideWrapper>
            <span> {show ? 'HIDE' : 'SHOW OPTIONS'}</span>
            <HideButton onClick={() => setShow(!show)}>
              {show ? (
                <img
                  src={require('~/images/Assets/Less cart unactive.svg')}
                  alt="tbo-logo"
                ></img>
              ) : (
                <img
                  src={require('~/images/Assets/More cart unactive.svg')}
                  alt="tbo-logo"
                ></img>
              )}
            </HideButton>
          </HideWrapper>
        </Title>
        {show ? (
          <Body>
            {data.data.map((it, index) => {
              return (
                <ItemWrapper
                  key={`wrap-${index}`}
                  active={index === selected}
                  onClick={() => onChangeShipping(index, it.price)}
                >
                  <Icon>
                    <img
                      src={require(index === selected
                        ? '~/images/Assets/DESKTOP-Selected.svg'
                        : '~/images/Assets/Repeat Grid 1.png')}
                      alt="check-shipping"
                    />
                  </Icon>
                  <ItemBody>
                    <ItemBodyLeft>
                      <ItemTitle active={index === selected}>
                        {it.title}
                      </ItemTitle>
                      <ItemDescription active={index === selected}>
                        {it.description}
                      </ItemDescription>
                    </ItemBodyLeft>
                    <ItemBodyRight free={it.price === 'FREE'}>
                      {it.price}
                    </ItemBodyRight>
                  </ItemBody>
                </ItemWrapper>
              )
            })}
          </Body>
        ) : (
          ''
        )}
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  margin-top: 40px;
  @media ${device.laptop} {
  }
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Titillium Black;
  font-size: 22px;
  margin-bottom: 30px;
  @media ${device.laptop} {
  }
`

const HideWrapper = styled.div`
  display: flex;
  align-items: center;
  & > span {
    font-size: 14px;
    color: #202122;
    font-weight: 800;
    letter-spacing: 2.5px;
    font-family: Titillium Web;
    margin-right: 7px;
  }
  @media ${device.tablet} {
    display: none;
  }
`

const HideButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #383636;
  color: gray;
  width: 30px;
  height: 30px;
  cursor: pointer;
  & span {
    transform: scale(3, 1);
    margin-right: 0px;
  }
`

const Body = styled.div`
  @media ${device.laptop} {
  }
`

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => (props.active ? '#F2F2F7' : '#cecece')};
  height: 70px;
  padding: 10px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#F2F2F7' : '')};
  @media ${device.laptop} {
  }
`

const Icon = styled.div`
  display: flex;
  align-items: flex-start;
  width: 25px;
  height: 100%;
  margin-right: 10px;
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
  }
`

const ItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #a9acaf;
  @media ${device.laptop} {
  }
`

const ItemBodyLeft = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
  }
`

const ItemTitle = styled.div`
  font-size: 18px;
  font-family: Titillium Bold;
  color: ${props => (props.active ? '#202122' : '')};
  @media ${device.laptop} {
  }
`

const ItemDescription = styled.div`
  color: ${props => (props.active ? '#202122' : '')};
  font-size: 14px;
  @media ${device.laptop} {
  }
`

const ItemBodyRight = styled.div`
  color: ${props => (props.free ? '#ff8c00' : '')};
  @media ${device.laptop} {
  }
`

export default CheckoutShipping
