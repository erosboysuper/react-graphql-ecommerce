import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'

import TickIcon from '~/images/Assets/Confirmation.svg'

const RoomCreationSuccess = () => {
  return (
    <Container>
      <SuccessImage>
        <LazyLoad>
          <img src={TickIcon} alt="TickIcon" />
        </LazyLoad>
      </SuccessImage>
      <LetterContainer>
        <div>
          <Letter font="Titillium Web" size={18} color="#202122">
            Yeah! You have successfully created your room.
          </Letter>
        </div>
        <div>
          <Letter font="Titillium Web" size={18} color="#202122">
            Now you can &nbsp;
          </Letter>
          <Letter font="Titillium Web" size={18} color="#FF8C00">
            start a new conversation, share a new design, and invite friends to
            join{' '}
          </Letter>
          <Letter font="Titillium Web" size={18} color="#202122">
            {' '}
            the room.
          </Letter>
        </div>
      </LetterContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  @media ${device.laptop} {
    padding-left: 0px;
    background: #f2f2f7;
    height: 600px;
    padding-top: 10%;
  }
`

const SuccessImage = styled.div`
  margin-top: 50px;
  text-align: center;
  @media ${device.laptop} {
    width: 100%;
  }
`

const LetterContainer = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-bottom: 50px;
  text-align: center;
  & div {
    margin-top: 24px;
  }
  @media ${device.laptop} {
    width: 100%;
    margin-left: 0px;
  }
`

export default RoomCreationSuccess
