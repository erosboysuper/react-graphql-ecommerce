import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import { darkFont } from '~/utils/colors'

import CloseModalImg from '~/images/Assets/Close-modal.svg'

import ModalSelect from '~/components/pages/landing/ModalSelect'

const Modal = ({
  product,
  productImages,
  price,
  compareAtPrice,
  hasFreeShippingOffer,
}) => {
  const { setModal } = useContext(StoreContext)
  const { size, color, setVariant, colors, setVariants } =
    useContext(ProductContext)
  const [media, setMedia] = useState(productImages || [])

  useEffect(() => {
    let selectedVariant = []
    if (colors.length > 0) {
      selectedVariant = product.variant.filter(
        x => x.size.name === size && x.color.name === colors[0]
      )
    } else {
      selectedVariant = product.variant.filter(
        x => x.size.name === size && x.color.name === color
      )
    }

    if (
      selectedVariant.length > 0 &&
      selectedVariant[0].images &&
      selectedVariant[0].images.length > 0
    ) {
      setMedia(selectedVariant[0].images)
    } else {
      setMedia(productImages || [])
    }

    if (selectedVariant.length > 0) {
      setVariant(selectedVariant[0])
    }

    let variantList = []
    colors.map(item => {
      let _selectedVariant = []
      if (colors.length > 0) {
        _selectedVariant = product.variant.filter(
          x => x.size.name === size && x.color.name === item
        )
      } else {
        _selectedVariant = product.variant.filter(
          x => x.size.name === size && x.color.name === color
        )
      }

      if (_selectedVariant.length > 0) {
        variantList.push(_selectedVariant[0])
      }
    })
    setVariants(variantList)
  }, [size, color])

  return (
    <React.Fragment>
      <QuickViewContainer>
        <Title>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeLaptop={16}
            sizeLaptopL={18}
            sizeDesktop={20}
            sizeTablet={20}
            color={darkFont}
          >
            Select Your Size
            <img
              src={CloseModalImg}
              onClick={() => setModal(false)}
              alt="Close Modal Image"
            />
          </Letter>
        </Title>
        <ModalSelect
          product={product}
          media={media}
          price={price}
          compareAtPrice={compareAtPrice}
          hasFreeShippingOffer={hasFreeShippingOffer}
        />
      </QuickViewContainer>
    </React.Fragment>
  )
}

const Title = styled.div`
  & {
    text-align: center;
    font-family: Titillium Bold;
    font-size: 24px;
    color: ${darkFont};
    margin-top: -3px;
    padding-top: 10px;
  }
  & img {
    position: absolute;
    top: 15px;
    right: 15px;
    pointer: cursor;
  }
  @media ${device.laptop} {
    margin-top: 36px;
    & img {
      width: 38px;
      top: 47px;
      left: 31px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 32px;
      top: 47px;
      left: 31px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 38px;
      top: 47px;
      left: 31px;
    }
  }
`

const QuickViewContainer = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background: white;
  bottom: 0px;
  border-top: 6px solid #ff8c00;
  z-index: 100;
  left: 0px;
  padding-bottom: 100px;
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    left: unset;
    border-top: unset;
    overflow: auto;
    max-width: 450px;
  }
  @media ${device.laptopL} {
    height: 100%;
    width: 34%;
    right: 0px;
    left: unset;
    border-top: unset;
    max-width: unset;
  }
`

export default Modal
