import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import ProductContext from '~/context/ProductContext'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import { darkFont } from '~/utils/colors'

import CloseModalImg from '~/images/Assets/Close-modal.svg'

import ModalSelect from '~/components/pages/products/ModalSelect'

const QuickView = ({ product, display }) => {
  const { setModal } = useContext(StoreContext)
  const { size, color, setVariant } = useContext(ProductContext)

  const [media, setMedia] = useState(product.media || [])

  useEffect(() => {
    const selectedVariant = product.variant.filter(
      x => x.size.name === size && x.color.name === color
    )
    if (
      selectedVariant.length > 0 &&
      selectedVariant[0].images &&
      selectedVariant[0].images.length > 0
    ) {
      setMedia(selectedVariant[0].images)
    } else {
      setMedia(product.media || [])
    }

    if (selectedVariant.length > 0) {
      setVariant(selectedVariant[0])
    }
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
            PRODUCT QUICK VIEW
            <img
              src={CloseModalImg}
              onClick={() => {
                display(false)
                setModal(false)
                setVariant({})
              }}
              alt="Close Modal"
            />
          </Letter>
        </Title>
        <ModalSelect product={product} media={media} display={display} />
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
    cursor: pointer;
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

export default QuickView
