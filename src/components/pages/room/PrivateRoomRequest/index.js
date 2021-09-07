import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import LockIcon from '~/images/Assets/DESKTOP-Private.svg'
import CheckIcon from '~/images/Assets/DESKTOP-Check.svg'

const PrivateRoomRequest = ({ room_id }) => {
  const { addToast } = useToasts()
  const { joinPrivateRoomAction } = useContext(CommunityContext)
  const [requestSent, setRequestSent] = useState(false)

  const joinPrivateRoom = () => {
    joinPrivateRoomAction(room_id).then(res => {
      if (res && res.success) {
        setRequestSent(true)
      } else if (res && res.message) {
        setRequestSent(false)
        let errors = null
        if (typeof res.message === 'string') {
          errors = res.message
        } else {
          errors = res.message.map(x => x.messages[0].message)
          errors = errors.join('\n')
        }
        addToast(errors, {
          appearance: 'info',
          autoDismiss: true,
        })
      } else {
        setRequestSent(false)
      }
    })
  }

  return (
    <Container>
      <IconImage>
        <img src={requestSent ? CheckIcon : LockIcon} alt="Icon" />
      </IconImage>
      <LetterContainer>
        {requestSent ? (
          <Letter font="Titillium Web" size={18} color="#202122">
            Done! Your request has been sent. <br />
            The admin will reply you soon.
          </Letter>
        ) : (
          <Letter font="Titillium Web" size={18} color="#202122">
            This room is a private room. <br />
            Send a request to join the room in order to see and <br />
            participate in the conversations.
          </Letter>
        )}
      </LetterContainer>
      {!requestSent && (
        <LargeButton onClick={() => joinPrivateRoom()}>
          <Letter font="Titillium Bold" size={20} color="white">
            JOIN THE ROOM
          </Letter>
          <Letter font="Titillium Light" size={20} color="white">
            {` `} / PRIVATE
          </Letter>
        </LargeButton>
      )}
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

const IconImage = styled.div`
  margin-top: 50px;
  text-align: center;
  & img {
    width: 70px;
  }
  @media ${device.laptop} {
    width: 100%;
  }
`

const LetterContainer = styled.div`
  width: 97%;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  @media ${device.laptop} {
    width: 100%;
  }
`

const LargeButton = styled.div`
  width: 100%;
  background: #ff8c00;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 11;
  cursor: pointer;
  letter-spacing: 3px;
  @media ${device.laptop} {
    margin: 0px auto;
    position: unset;
    display: flex;
    width: 60%;
  }
`

export default PrivateRoomRequest
