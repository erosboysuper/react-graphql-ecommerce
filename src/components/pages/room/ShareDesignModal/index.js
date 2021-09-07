import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Letter, DesktopContain } from '~/utils/styles'
import NewIcon from '~/images/Assets/New.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import DesignItem from '~/components/Common/DesignItem'
import RoomContext from '~/context/RoomContext'
import { device } from '~/utils/device'
import SendIcon from '~/images/Assets/Send.svg'

const ShareDesignModal = () => {
  const { shareDesignModal, setShareDesignModal } = useContext(RoomContext)
  const [selectedItem, setSelectedItem] = useState()
  const item = [
    {
      id: 'we353g',
      price: 14.99,
      name: 'Boxer Brief',
      percent: 75,
      day: 14,
    },
    {
      id: '343ife',
      price: 13.99,
      name: 'Boxer Brief',
      percent: 75,
      day: 14,
    },
    {
      id: 'dsietye',
      price: 14.99,
      name: 'Boxer Brief',
      percent: 75,
      day: 14,
    },
  ]

  return (
    <Container>
      <Title>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeDesktop={20}
          color="#202122"
        >
          Share a Design
        </Letter>
      </Title>
      <CloseImg
        src={CloseIcon}
        alt="CloseIcon"
        onClick={() => setShareDesignModal(false)}
      />
      <SubTitle>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeDesktop={20}
          color="#202122"
        >
          Select one of your designs or create a new one
        </Letter>
      </SubTitle>

      <TipLetter>
        <Letter font="Titillium Web" size={14} sizeDesktop={22} color="#202122">
          Only In Funding items can be shared
        </Letter>
      </TipLetter>
      <ItemsList>
        {item.map((detail, index) => (
          <div
            onClick={() => setSelectedItem(detail.id)}
            key={detail.name + index}
          >
            <DesignItem
              item={detail}
              active={selectedItem === detail.id ? true : false}
            />

            <ShareDesignButton
              display={selectedItem === detail.id ? 'flex' : 'none'}
            >
              <Letter font="Titillium Bold" size={20} color="white">
                SHARE THE DESIGN
              </Letter>
              <img src={SendIcon} />
            </ShareDesignButton>
          </div>
        ))}
      </ItemsList>
      <NewButton>
        <Letter font="Titillium Web" size={16} sizeDesktop={20} color="white">
          NEW DESIGN / TO PRODUCT BUILDER
        </Letter>
        <img src={NewIcon} />
      </NewButton>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: white;
  width: 100%;
  padding-left: 16px;
  padding-bottom: 120px;
  z-index: 15;
  overflow-y: auto;
  @media ${device.laptop} {
    width: 34%;
    height: 100vh;
    left: unset;
    right: 0px;
    padding-left: 3%;
  }
`
const TipLetter = styled.div`
  margin-bottom: 23px;
  @media ${device.laptop} {
    margin-bottom: 50px;
  }
`

const Title = styled.div`
  margin-top: 23px;
  text-align: center;
  @media ${device.laptop} {
    margin-top: 50px;
  }
`
const CloseImg = styled.img`
  position: absolute;
  right: 16px;
  top: 19px;
  @media ${device.laptop} {
    left: 31px;
    top: 43px;
    width: 38px;
  }
`

const SubTitle = styled.div`
  margin-top: 23px;
  margin-bottom: 3px;
  @media ${device.laptop} {
    margin-top: 90px;
  }
`
const NewButton = styled.div`
  height: 60px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: #ff8c00;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media ${device.laptop} {
    width: 72%;
    position: relative;
    margin-top: 20vh;
    height: 83px;
  }
`

const ItemsList = styled.div`
  @media ${device.laptop} {
    width: 72%;
  }
`

const ShareDesignButton = styled.div`
  display: none;
  background: #ff8c00;
  height: 83px;
  text-align: center;
  position: relative;
  @media ${device.laptop} {
    display: ${props => props.display};
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    & img {
      position: absolute;
      right: 30px;
    }
  }
`

export default ShareDesignModal
