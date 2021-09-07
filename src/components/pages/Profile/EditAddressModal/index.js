import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import EmptyIcon from '~/images/Assets/DESKTOP-Empty.svg'
import CloseModalImg from '~/images/Assets/Close-modal.svg'

import CommunityContext from '~/context/CommunityContext'

const EditAddressModal = () => {
  return (
    <Container>
      <Header>
        <img src={CloseModalImg} />
        <Letter font="Titillium Bold" size={20} color="#202122">
          Edit Your Address
        </Letter>
      </Header>
      <InputField>
        <DesktopContain>
          <Letter font="Titillium Bold" size={20} color="#202122">
            Name
          </Letter>
        </DesktopContain>
        <input placeholder="Name" />
      </InputField>
      <InputField>
        <DesktopContain>
          <Letter font="Titillium Bold" size={20} color="#202122">
            Address
          </Letter>
        </DesktopContain>
        <input placeholder="Address" />
      </InputField>
      <PairDiv>
        <PostCodeField>
          <DesktopContain>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Postcode
            </Letter>
          </DesktopContain>
          <input placeholder="Postcode" />
        </PostCodeField>
        <CityField>
          <DesktopContain>
            <Letter font="Titillium Bold" size={20} color="#202122">
              City
            </Letter>
          </DesktopContain>
          <input placeholder="City" />
        </CityField>
      </PairDiv>
      <InputField>
        <DesktopContain>
          <Letter font="Titillium Bold" size={20} color="#202122">
            Country
          </Letter>
        </DesktopContain>
        <input placeholder="Country" />
      </InputField>
      <UpdateButton>
        <Letter font="Titillium Bold" size={20} color="white">
          Update Address
        </Letter>
      </UpdateButton>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background: white;
  z-index: 10;
  bottom: 0px;
  overflow: scroll;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 33px;
  & input {
    height: 54px;
    background: #f2f2f7;
  }
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    max-width: 450px;
    padding-left: 3%;
  }
  @media ${device.laptopL} {
    height: 100%;
    width: 34%;
    right: 0px;
    max-width: unset;
    display: flex;
    flex-direction: column;
    & input {
      height: 62px;
      background: #f2f2f7;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  & img {
    position: absolute;
    top: 43px;
    left: 30px;
  }
`

const InputField = styled.div`
  width: 100%;
  margin-top: 60px;
  & input {
    width: 100%;
    height: 54px;
    background: #f2f2f7;
    border: none;
    padding-left: 29px;
  }
  @media ${device.laptop} {
    width: 80%;
    & input {
      height: 62px;
    }
  }
`

const PairDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 60px;
  justify-content: space-between;
  & input {
    width: 100%;
    height: 54px;
    background: #f2f2f7;
    border: none;
    padding-left: 29px;
  }
  @media ${device.laptop} {
    width: 80%;
    & input {
      height: 62px;
    }
  }
`

const PostCodeField = styled.div`
  width: 30%;
`

const CityField = styled.div`
  width: 60%;
`

const UpdateButton = styled.div`
  width: 100%;
  height: 60px;
  background: #ff8c00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 33px;
  @media ${device.laptop} {
    height: 83px;
    margin-top: 80px;
    width: 80%;
  }
`

export default EditAddressModal
