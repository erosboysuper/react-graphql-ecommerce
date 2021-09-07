import React, { useContext } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import ArrowImg from '~/images/Assets/DESKTOP-Arrow-orange.svg'

const SettingList = () => {
  const { localeFolder } = useContext(StoreContext)
  const { userLogout, setInviteFriendModal } = useContext(CommunityContext)
  const userLogoutAction = () => {
    userLogout().then(() => {
      navigate(`/${localeFolder}`)
    })
  }
  return (
    <Container>
      <div>
        <Letter
          font="Titillium Bold"
          size={14}
          sizeLaptop={14}
          sizeLaptopL={16}
          sizeDesktop={18}
          color="#FF8C00"
        >
          Settings
        </Letter>
      </div>
      {/* <Item onClick={() => setInviteFriendModal(true)}>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeLaptop={18}
          sizeLaptopL={21}
          sizeDesktop={24}
          color="#202122"
        >
          Invite Friends
        </Letter>
        <img src={ArrowImg} />
      </Item> */}
      <Item onClick={() => userLogoutAction()}>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeLaptop={18}
          sizeLaptopL={21}
          sizeDesktop={24}
          color="#202122"
        >
          Logout
        </Letter>
        <img src={ArrowImg} />
      </Item>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  @media ${device.laptop} {
    margin-top: 50px;
    width: 80%;
    margin-bottom: 40px;
  }
`

const Item = styled.div`
  border-bottom: 1px solid #202122;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12.8px;
  margin-bottom: 22px;
  cursor: pointer;
  & img {
    width: 17px;
  }
  & :last-of-type {
    border-bottom: 0px;
  }
`

export default SettingList
