import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutOrderSummary = ({ data }) => {
  const {} = useContext(CheckoutContext)
  const [title, setTitle] = useState(data.title)
  const [itemData, setItemData] = useState(data.data)
  const [show, setShow] = useState(true)
  return (
    <React.Fragment>
      <Container>
        <Title>
          <div>
            {title}
            {!show && <OrderNum>{itemData.length}</OrderNum>}
          </div>
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
          <React.Fragment>
            {itemData.map((it, index) => {
              return (
                <ItemContainer key={`item-${index}`}>
                  <ItemIcon>
                    <img src={it.icon} alt="tbo-logo"></img>
                  </ItemIcon>
                  <ItemBody>
                    <ItemBodyLeft>
                      <ItemTitle>{it.title}</ItemTitle>
                      <ItemDescription>{it.description}</ItemDescription>
                    </ItemBodyLeft>
                    <ItemBodyRight>${it.price}</ItemBodyRight>
                  </ItemBody>
                </ItemContainer>
              )
            })}
          </React.Fragment>
        ) : (
          ''
        )}
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px 0px 10px;
  margin: 0 -15px;
  background-color: #f2f2f7;
  @media ${device.mobileL} {
    padding: 20px 15px 0px 15px;
    align-items: flex-end;
  }
  @media ${device.laptop} {
    align-items: flex-end;
  }
`

const OrderNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background-color: #ff8c00;
  color: white;
  font-family: Titillium Bold;
`

const Title = styled.div`
  display: flex;

  justify-content: space-between;
  font-family: Titillium Black;
  font-size: 22px;
  margin-bottom: 30px;
  width: 100%;
  & > div:first-child {
    display: flex;
  }
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.laptop} {
    width: 70%;
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
`

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.laptop} {
    width: 70%;
  }
`

const ItemIcon = styled.div`
  margin-right: 20px;
  @media ${device.laptop} {
  }
`

const ItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media ${device.laptop} {
  }
`

const ItemBodyLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media ${device.laptop} {
  }
`

const ItemTitle = styled.div`
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`

const ItemDescription = styled.div`
  color: #a9acaf;
  @media ${device.tablet} {
    font-size: 14px;
  }
  @media ${device.laptop} {
    font-size: 16px;
  }
`

const ItemBodyRight = styled.div`
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`

export default CheckoutOrderSummary
