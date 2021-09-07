import React, { useContext } from 'react'
import styled from 'styled-components'

import LazyLoad from 'react-lazy-load'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain, Cover } from '~/utils/styles'
import { device } from '~/utils/device'
import { Letter, MobileContain } from '~/utils/styles'

import CommunityContext from '~/context/CommunityContext'
import ArrowBackImg from '~/images/Assets/Arrow-back.svg'
import EditAddressModal from '~/components/pages/Profile/EditAddressModal'

const ShippingList = ({ closeCB }) => {
  const { editAddressModal, setEditAddressModal } = useContext(CommunityContext)

  return (
    <Container>
      <MobileContain>
        <img src={ArrowBackImg} onClick={() => closeCB()} />
      </MobileContain>
      <NameDiv>
        <Letter
          font="Titillium Bold"
          size={20}
          sizeDesktop={30}
          color="#202122"
        >
          Jake Mullar
        </Letter>
      </NameDiv>
      <Address>
        <Letter
          font="Titillium Web"
          size={16}
          sizeLaptopL={23}
          sizeLaptop={20}
          sizeDesktop={26}
          color="#202122"
        >
          Goldbrunnenstrasse 151, 8055 Zürich Switzerland
        </Letter>
      </Address>
      <Buttons>
        <DeleteButton>
          <Letter
            font="Titillium Web"
            size={12}
            sizeDesktop={20}
            sizeLaptopL={18}
            sizeLaptop={16}
            color="white"
          >
            DELETE
          </Letter>
        </DeleteButton>
        <EditButton onClick={() => setEditAddressModal(true)}>
          <Letter
            font="Titillium Web"
            sizeDesktop={20}
            sizeLaptopL={18}
            sizeLaptop={16}
            size={12}
            color="white"
          >
            EDIT
          </Letter>
        </EditButton>
      </Buttons>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 0px;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: 103;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  background: white;
  padding-top: 38px;
  & img {
    margin-left: 16px;
  }
  @media ${device.laptop} {
    padding-left: 20px;
    position: relative;
    min-height: unset;
    left: unset;
    bottom: unset;
    overflow-y: unset;
    height: unset;
    background: unset;
    & span {
      margin-left: unset;
    }
    & img {
      margin-left: unset;
    }
  }
`

const Address = styled.div`
  width: 40%;
  padding-left: 16px;
  @media ${device.laptop} {
    padding-left: unset;
  }
`

const Buttons = styled.div`
  display: flex;
`

const EditButton = styled.div`
  width: 200px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff8c00;
  margin: 10px;
  cursor: pointer;
`

const DeleteButton = styled.div`
  width: 200px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #202122;
  margin: 10px;
  cursor: pointer;
`

const NameDiv = styled.div`
  padding-left: 16px;
  @media ${device.laptop} {
    padding-left: 0px;
  }
`

export default ShippingList
