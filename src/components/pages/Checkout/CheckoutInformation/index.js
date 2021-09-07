import React, { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { device } from '~/utils/device'
import CheckoutContext from '~/context/CheckoutContext'

const CheckoutInformation = () => {
  const {} = useContext(CheckoutContext)
  const [editInfo, setEditInfo] = useState(false)
  const [checkReceiveSMS, setCheckReceiveSMS] = useState(false)
  const [checkSaveInformation, setCheckSaveInformation] = useState(false)
  const [show, setShow] = useState(true)
  const [selectedState, setSelectedState] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState(0)
  return (
    <React.Fragment>
      <Container>
        <Title>
          Your Information
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
            <BodyLeft></BodyLeft>
            {editInfo ? (
              <DetailContent>
                <LoginButton>
                  <span>Already have an account?&nbsp;</span>
                  <span>Log In</span>
                  <img
                    src={require('~/images/Assets/DESKTOP-Arrow-orange.svg')}
                    alt="save-product"
                  ></img>
                </LoginButton>
                <CompleteLabel>
                  - or complete your details below -
                </CompleteLabel>
                <DetailWrapper>
                  <DetailComponent
                    width="50"
                    label="First Name"
                    placeholder="Enter your first name"
                  ></DetailComponent>
                  <DetailComponent
                    width="50"
                    label="Surname"
                    placeholder="Enter your surname"
                  ></DetailComponent>
                </DetailWrapper>
                <DetailWrapper>
                  <DetailComponent
                    label="Email"
                    placeholder="Enter your email"
                  ></DetailComponent>
                </DetailWrapper>
                <DetailWrapper>
                  <DetailComponent
                    width="40"
                    label="Country Code"
                    placeholder="+000"
                  ></DetailComponent>
                  <DetailComponent
                    width="60"
                    label="Phone Number"
                    placeholder="000 000 00 00"
                  ></DetailComponent>
                </DetailWrapper>
                <CheckWrapper
                  onClick={() => setCheckReceiveSMS(!checkReceiveSMS)}
                >
                  <img
                    src={
                      checkReceiveSMS
                        ? require('~/images/Assets/DESKTOP-Selected.svg')
                        : require('~/images/Assets/Repeat Grid 1.png')
                    }
                    alt="check-shipping"
                  />
                  Yes, I want to receive SMS
                </CheckWrapper>
                <DetailWrapper>
                  <DetailComponent
                    label="Address"
                    placeholder="Enter your address"
                  ></DetailComponent>
                </DetailWrapper>
                <DetailWrapper>
                  <DetailComponent
                    label="Apartment, suite, etc"
                    placeholder="Enter your apartment, suite, etc"
                  ></DetailComponent>
                </DetailWrapper>
                <DetailWrapper>
                  <DetailComponent
                    width="50"
                    label="City"
                    placeholder="Enter your city"
                  ></DetailComponent>
                  <DetailComponent
                    width="50"
                    label="Zip Code"
                    placeholder="Enter ZIP Code"
                  ></DetailComponent>
                </DetailWrapper>
                <DetailWrapper>
                  <DetailItem>
                    <Label>State</Label>
                    <MobileLabel active={selectedState}>State</MobileLabel>
                    <SelectWrapper>
                      <select name="slct" id="state">
                        <option selected disabled>
                          Select your state
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </SelectWrapper>
                    <MobileSelectWrapper>
                      <select
                        name="slct"
                        id="state"
                        onChange={() => setSelectedState(2)}
                      >
                        <option selected disabled hidden></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </MobileSelectWrapper>
                  </DetailItem>
                </DetailWrapper>
                <DetailWrapper>
                  <DetailItem>
                    <Label>Country</Label>
                    <MobileLabel active={selectedCountry}>Country</MobileLabel>
                    <SelectWrapper>
                      <select name="slct" id="state">
                        <option selected disabled>
                          USA
                        </option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Sweden</option>
                      </select>
                    </SelectWrapper>
                    <MobileSelectWrapper>
                      <select
                        name="slct"
                        id="state"
                        onChange={() => setSelectedCountry(2)}
                      >
                        <option selected disabled hidden></option>
                        <option>USA</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Sweden</option>
                      </select>
                    </MobileSelectWrapper>
                  </DetailItem>
                </DetailWrapper>
                <CheckWrapper
                  onClick={() => setCheckSaveInformation(!checkSaveInformation)}
                >
                  <img
                    src={
                      checkSaveInformation
                        ? require('~/images/Assets/DESKTOP-Selected.svg')
                        : require('~/images/Assets/Repeat Grid 1.png')
                    }
                    alt="check-shipping"
                  />
                  Save this information for next time
                </CheckWrapper>
              </DetailContent>
            ) : (
              <DraftContent>
                <UserName>
                  <span>Jake Muller</span>
                  <EditInfo onClick={() => setEditInfo(true)}>
                    <span>Edit Info</span>
                    <img
                      src={require('~/images/Assets/DESKTOP-Arrow-orange.svg')}
                      alt="save-product"
                    ></img>
                  </EditInfo>
                </UserName>
                <p>Goldbrnnenstrasse 151, 8055 Zurich</p>
                <p>Switzerland</p>
              </DraftContent>
            )}
          </Body>
        ) : (
          ''
        )}
      </Container>
    </React.Fragment>
  )
}

const DetailComponent = props => {
  const [existInputValue, setExistInputValue] = useState(0)
  const inputRef = React.useRef(null)
  const onChangeInput = e => {
    if (e.target.value.length > 0) {
      setExistInputValue(2)
    } else {
      setExistInputValue(1)
    }
  }

  const setInputFocus = () => {
    inputRef.current.focus()
  }
  return (
    <React.Fragment>
      <DetailItem width={props.width ? props.width : 100}>
        <Label>{props.label}</Label>
        <MobileLabel active={existInputValue} onClick={() => setInputFocus()}>
          {props.label}
        </MobileLabel>
        <Input placeholder={props.placeholder} />
        <MobileInput onChange={e => onChangeInput(e)} ref={inputRef} />
      </DetailItem>
    </React.Fragment>
  )
}

const Container = styled.div`
  margin-top: 30px;
  @media ${device.laptop} {
  }
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Titillium Black;
  font-size: 22px;
  margin-bottom: 20px;
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

const BodyLeft = styled.div`
  @media ${device.laptop} {
  }
`

const DraftContent = styled.div`
  & p {
    margin-bottom: 0px;
  }
  @media ${device.laptop} {
  }
`

const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  & > span {
    font-family: Titillium Bold;
  }
  @media ${device.laptop} {
  }
`

const EditInfo = styled.div`
  cursor: pointer;
  color: #ff8c00;
  & span {
    margin-right: 20px;
  }
  @media ${device.laptop} {
  }
`

const LoginButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  height: 60px;
  color: white;

  & span:nth-child(2) {
    color: #ff8c00;
  }
  & img {
    position: absolute;
    top: 50%;
    right: 12px;
    width: 14px;
    transform: translate(0, -50%);
  }
  @media ${device.tablet} {
    font-size: 16px;
    & img {
      width: 15px;
      right: 15px;
    }
  }
  @media ${device.laptop} {
    font-size: 18px;
    & img {
      width: 18px;
      right: 25px;
    }
  }
`

const CompleteLabel = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0px;
  @media ${device.laptop} {
  }
`

const DetailContent = styled.div`
  margin-top: 30px;
  font-family: Titillium Web;
  @media ${device.laptop} {
  }
`

const DetailWrapper = styled.div`
  display: flex;
  margin: 5px 0px;
  & div:last-child {
    padding-right: 0px !important;
  }
  @media ${device.tablet} {
    margin: 0px;
  }
`

const DetailItem = styled.div`
  position: relative;
  width: ${props => (props.width ? props.width : '100')}%;
  padding-right: ${props => (props.width ? '15px' : '0px')};

  @media ${device.tablet} {
  }
  @media ${device.laptop} {
  }
`

const SelectWrapper = styled.div`
  position: relative;
  display: none;
  width: 100%;
  height: 50px;
  background: #f2f2f7;
  overflow: hidden;
  border-radius: 0;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    width: 0;
    height: 0;
    margin-top: -2px;
    border-top: 5px solid #aaa;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  & select {
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    background-color: #f2f2f7;
    color: #202122;
    outline: none;
    border: none;
    appearance: none;
    &:active {
      outline: none;
      box-shadow: none;
    }
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  @media ${device.tablet} {
    display: flex;
  }
`

const MobileSelectWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 55px;
  background: #f2f2f7;
  overflow: hidden;
  border-radius: 0;
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    width: 0;
    height: 0;
    margin-top: -2px;
    border-top: 5px solid #aaa;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }
  & select {
    width: 100%;
    height: 55px;
    padding: 15px 20px 0px;
    background-color: #f2f2f7;
    color: #202122;
    outline: none;
    border: none;
    appearance: none;
    &:active {
      outline: none;
      box-shadow: none;
    }
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  @media ${device.tablet} {
    display: none;
  }
`

const Label = styled.p`
  display: none;
  @media ${device.tablet} {
    display: block;
    font-family: Titillium Bold;
    margin-bottom: 0px;
    padding: 10px 0px;
  }
`
const firstLabelAnimation = keyframes`
 0% { 
    top: 17px;
    font-size: 18px;
    color: black; 
  }
  100% { 
    top: 2px;
    font-size: 14px;
    color: gray; 
  }
`

const secondLabelAnimation = keyframes`
  0% { 
    top: 2px;
    font-size: 14px;
    color: gray;  
  }
  100% { 
    top: 17px;
    font-size: 18px;
    color: black;  
  }
`

const MobileLabel = styled.p`
  position: absolute;
  left: 20px;
  padding: 0;
  margin-bottom: 0px;
  z-index: 1;
  animation-name: ${props =>
    props.active === 0
      ? ''
      : props.active === 1
      ? secondLabelAnimation
      : firstLabelAnimation};
  animation-duration: 0.5s;
  top: ${props => (props.active === 2 ? '2px' : '17px')};
  font-size: ${props => (props.active === 2 ? '14px' : '18px')};
  color: ${props => (props.active === 2 ? 'gray' : 'black')};
  @media ${device.tablet} {
    display: none;
  }
`

const Input = styled.input`
  display: none;
  @media ${device.tablet} {
    display: block;
    background-color: #f2f2f7;
    width: 100%;
    height: 50px;
    padding: 10px 20px;
    outline: none;
    border: none;
  }
`

const MobileInput = styled.input`
  background-color: #f2f2f7;
  width: 100%;
  height: 55px;
  padding: 15px 20px 0px;
  outline: none;
  border: none;
  font-size: 19px;
  @media ${device.tablet} {
    display: none;
  }
`

const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px 30px 0px;
  color: #202122;
  & img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
  @media ${device.laptop} {
  }
`

export default CheckoutInformation
