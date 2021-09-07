import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'
import AddProductItem from '~/components/pages/Live/AddProductItem'

const StartLiveModal = () => {
  const { setInviteFriendModal, setStartLiveModal } = useContext(
    CommunityContext
  )
  const items = [
    {
      image:
        'https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=0.76&w=300%20228w,%20https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=1&w=300%20300w',
      star: 3.5,
      price: 20,
      priceAtCompare: 25,
      title: 'Boxer Brief',
    },
    {
      image:
        'https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=0.76&w=300%20228w,%20https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=1&w=300%20300w',
      star: 3.5,
      price: 20,
      priceAtCompare: 25,
      title: 'Boxer Brief',
    },
    {
      image:
        'https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=0.76&w=300%20228w,%20https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=1&w=300%20300w',
      star: 3.5,
      price: 20,
      priceAtCompare: 25,
      title: 'Boxer Brief',
    },
    {
      image:
        'https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=0.76&w=300%20228w,%20https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=1&w=300%20300w',
      star: 3.5,
      price: 20,
      priceAtCompare: 25,
      title: 'Boxer Brief',
    },
    {
      image:
        'https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=0.76&w=300%20228w,%20https://www.datocms-assets.com/34700/1602678781-the-tbo-boxer-brief-3-pack-pirate-black.jpg?auto=format&dpr=1&w=300%20300w',
      star: 3.5,
      price: 20,
      priceAtCompare: 25,
      title: 'Boxer Brief',
    },
  ]
  return (
    <Container>
      <Title>
        <Letter font="Titillium Bold" size={20} color="#202122">
          ADD PRODUCTS
        </Letter>
      </Title>
      <CloseImg
        src={CloseIcon}
        alt="CloseIcon"
        onClick={() => setStartLiveModal(false)}
      />
      <ProductContainer>
        {items.map((item, index) => {
          return <AddProductItem product={item} key={index + 'items'} />
        })}
      </ProductContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  left: 0px;
  bottom: 0px;
  overflow: auto;
  background: white;
  @media ${device.laptop} {
    position: fixed;
    width: 70vw;
    height: 70vh;
    z-index: 15;
    left: 15%;
    top: 15%;
    background: white;
  }
`

const Title = styled.div`
  text-align: center;
  margin-top: 40px;
`

const CloseImg = styled.img`
  position: absolute;
  right: 16px;
  top: 19px;
  @media ${device.laptop} {
    right: 31px;
    top: 43px;
    width: 38px;
  }
`

const ProductContainer = styled.div`
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5%;
  }
`

export default StartLiveModal
