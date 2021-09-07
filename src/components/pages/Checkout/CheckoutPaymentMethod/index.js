import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutPaymentMethod = ({ data }) => {
  const {} = useContext(CheckoutContext)
  const [selected, setSelected] = useState()
  const [show, setShow] = useState(true)

  return (
    <React.Fragment>
      <Container>
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
                  <React.Fragment key={`cont-${index}`}>
                    <ItemWrapper
                      active={selected === index}
                      onClick={() => setSelected(index)}
                    >
                      <Icon
                        src={require(index === selected
                          ? '~/images/Assets/DESKTOP-Selected.svg'
                          : '~/images/Assets/Repeat Grid 1.png')}
                        alt="check-shipping"
                      ></Icon>
                      <ItemBody>
                        <ItemBodyLeft>
                          <ItemTitle active={selected === index}>
                            {it.title}
                          </ItemTitle>
                        </ItemBodyLeft>
                        <ItemBodyRight>
                          {it.icon.map((item, index) => {
                            return (
                              <img
                                src={item.url}
                                key={`save-prod-${index}`}
                                alt="save-product"
                              ></img>
                            )
                          })}
                        </ItemBodyRight>
                      </ItemBody>
                    </ItemWrapper>
                    {(() => {
                      switch (index) {
                        case 0:
                          return (
                            <React.Fragment>
                              <DetailContainer show={index === selected}>
                                <DetailWrapper>
                                  <DetailItem>
                                    <Label>Card Number</Label>
                                    <Input placeholder="4509 8937 7566 9002" />
                                  </DetailItem>
                                </DetailWrapper>
                                <DetailWrapper>
                                  <DetailItem width="50">
                                    <Label>MM/YY</Label>
                                    <Input placeholder="02/24" />
                                  </DetailItem>
                                  <DetailItem width="50">
                                    <Label>CVC</Label>
                                    <Input placeholder="674" />
                                  </DetailItem>
                                </DetailWrapper>
                              </DetailContainer>
                            </React.Fragment>
                          )
                      }
                    })()}
                  </React.Fragment>
                )
              })}
            </Body>
          ) : (
            ''
          )}
        </Container>
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
    font-family: Titillium Web;
    margin-right: 7px;
    font-weight: 800;
    letter-spacing: 2.5px;
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

const Body = styled.div`
  @media ${device.laptop} {
  }
`

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => (props.active ? '#F2F2F7' : '#cecece')};
  padding: 5px 15px;
  margin-bottom: 5px;
  cursor: pointer;
  height: 60px;
  background-color: ${props => (props.active ? '#F2F2F7' : '')};
  @media ${device.laptop} {
    height: 50px;
  }
`

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
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
  font-size: 14px;
  @media ${device.laptop} {
  }
`

const ItemBodyRight = styled.div`
  & img {
    margin: 0px 3px;
  }
  @media ${device.tablet} {
    & img {
      height: 18px;
    }
  }
  @media ${device.laptop} {
    & img {
      height: 22px;
    }
  }
`

const DetailContainer = styled.div`
  margin-bottom: 20px;
  display: ${props => (props.show ? 'block' : 'none')};
  @media ${device.laptop} {
  }
`

const DetailWrapper = styled.div`
  display: flex;
  margin: 5px 0px;
  & div:last-child {
    padding-right: 0px !important;
  }
  @media ${device.laptop} {
  }
`

const DetailItem = styled.div`
  position: relative;
  width: ${props => (props.width ? props.width : '100')}%;
  padding-right: ${props => (props.width ? '15px' : '')};

  @media ${device.laptop} {
    position: unset;
  }
`

const Label = styled.p`
  position: absolute;
  top: 3px;
  left: 19px;
  padding: 0 0px;
  color: #707070;
  font-size: 15px;
  margin-bottom: 0px;
  font-family: sans-serif;
  @media ${device.tablet} {
    position: unset;
    top: unset;
    left: unset;
    padding: 10px 0px;
    color: #202122;
    font-size: 18px;
    font-family: Titillium Bold;
  }
`

const Input = styled.input`
  background-color: #f2f2f7;
  width: 100%;
  outline: none;
  border: none;
  height: 60px;
  padding: 20px 20px 10px 20px;
  @media ${device.tablet} {
    height: 50px;
    padding: 10px 20px;
  }
`

export default CheckoutPaymentMethod
