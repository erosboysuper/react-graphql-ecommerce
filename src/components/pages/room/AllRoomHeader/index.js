import React, { useContext } from 'react'
import styled from 'styled-components'
import { btn_color } from '~/utils/colors'
import { Letter } from '~/utils/styles'
import ArrowBackIcon from '~/images/Assets/Arrow-back.svg'
import NewIcon from '~/images/Assets/New.svg'

const AllRoomHeader = () => {
  return (
    <div>
      <BackIcon
        src={ArrowBackIcon}
        onClick={() => {
          window.history.back()
        }}
      />
      <CreateRoomButton>
        <img src={NewIcon} />
        <Letter font="Titillium Bold" size={13} color="white">
          CREATE ROOM
        </Letter>
      </CreateRoomButton>
      <Shadow />
    </div>
  )
}

const BackIcon = styled.img`
  margin-left: 16px;
  margin-top: 38px;
`

const CreateRoomButton = styled.div`
  position: absolute;
  right: 16px;
  top: 46px;
  width: 37%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #ff8c00;
  border: 2px solid #161617;
  & img {
    width: 12px;
  }
  z-index: 2;
`
const Shadow = styled.div`
  position: absolute;
  right: 12px;
  top: 50px;
  width: 37%;
  height: 40px;
  border: 2px solid #161617;
`

export default AllRoomHeader
