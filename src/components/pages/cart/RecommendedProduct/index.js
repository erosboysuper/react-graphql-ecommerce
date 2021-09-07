import React, { useContext } from 'react'
import EllipsisText from 'react-ellipsis-text'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Letter, Space } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import PlusImg from '~/images/Assets/Morecartunactive.svg'

const RecommendedProduct = ({ recommendedProducts, modal }) => {
  const { addCartItems, localeSetting } = useContext(StoreContext)
  return (
    <Parent width={modal === true ? '100' : '49'}>
      <Products>
        <Letter
          font="Titillium Bold"
          size={22}
          sizeLaptop={18}
          sizeLaptopL={21}
          sizeDesktop={24}
          color="#202122"
        >
          Recommended in your size
        </Letter>
        {recommendedProducts.map(product => {
          let variant =
            product.variant && product.variant.length > 0
              ? product.variant[0]
              : {}
          if (variant.id) {
            variant.product_shopify_id = product.shopifyId
            variant.product_name = product.name
            variant.product_handle = product.handle
            variant.isSingleProduct = product.isSingleProduct
          }
          const showCompareAtPrice =
            !product.isTboCommunity &&
            variant.compareAtPrice &&
            variant.compareAtPrice - variant.price > 0
          return (
            <div key={product.id}>
              <Space height={10} />
              <Container display={modal === true ? 'none' : 'flex'}>
                <ImgContainer>
                  {product.media && product.media.length > 0 && (
                    <Img fluid={product.media[0].fluid} alt={product.name} />
                  )}
                </ImgContainer>
                <Contain>
                  {product.isLimitedEdition && (
                    <FlagLetter>
                      <Letter
                        font="Titillium Bold"
                        size={12}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color="#0ADB98"
                      >
                        Limited Edition
                      </Letter>
                    </FlagLetter>
                  )}
                  {showCompareAtPrice &&
                    variant.compareAtPrice - variant.price > 0 && (
                      <Letter
                        font="Titillium Bold"
                        size={14}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color="#F57B00"
                      >
                        Save &nbsp; {localeSetting.CURRENCY_SYMBOL}
                        {(variant.compareAtPrice - variant.price).toFixed(2)}
                      </Letter>
                    )}
                  <NumberChange>
                    <Label font="Titillium Bold" size={18} sizeDesktop={24}>
                      <Letter
                        size={12}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        font="Titillium Bold"
                        color="#202122"
                      >
                        {localeSetting.CURRENCY_SYMBOL}
                      </Letter>
                      {product.variant && product.variant.length > 0 && (
                        <Letter
                          font="Titillium Bold"
                          size={18}
                          sizeLaptop={20}
                          sizeLaptopL={22}
                          sizeDesktop={24}
                          color="#202122"
                        >
                          {variant.price}
                        </Letter>
                      )}
                      {showCompareAtPrice && (
                        <Label
                          size={14}
                          sizeLaptop={14}
                          sizeLaptopL={16}
                          sizeDesktop={18}
                          color="#A9ACAF"
                        >
                          <Del>
                            <Letter
                              font="Titillium Web"
                              size={14}
                              color="#A9ACAF"
                            >
                              {localeSetting.CURRENCY_SYMBOL}
                              {variant.compareAtPrice.toFixed(2)}
                            </Letter>
                          </Del>
                        </Label>
                      )}
                    </Label>
                  </NumberChange>
                  <ProductName>
                    <Letter
                      font="Titillium Bold"
                      size={18}
                      sizeLaptop={23}
                      sizeLaptopL={27}
                      sizeDesktop={30}
                      color="#202122"
                    >
                      <EllipsisText text={product.name} length={23} />
                    </Letter>
                  </ProductName>
                  {product.variant && product.variant.length > 0 && (
                    <SizeColor>
                      <Letter
                        font="Titillium Web"
                        size={13}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color="#A9ACAF"
                      >
                        {variant.size
                          ? `${variant.size.name} ${variant.size.helpText}`
                          : ``}
                        {variant.color ? `${variant.color.name}` : ``}
                      </Letter>
                    </SizeColor>
                  )}
                </Contain>
                <Contain1>
                  <PlusContainer
                    onClick={() => addCartItems([variant])}
                    className="add-to-cart"
                  >
                    <img src={PlusImg} alt="Plus" className="add-to-cart" />
                  </PlusContainer>
                  <Letter
                    font="Titillium Bold"
                    size={11}
                    sizeLaptop={12}
                    sizeLaptopL={14}
                    sizeDesktop={16}
                    color="#A9ACAF"
                  >
                    ADD ITEM
                  </Letter>
                </Contain1>
              </Container>
              <ModalContainer display={modal === true ? 'flex' : 'none'}>
                <ImgContainer1>
                  {product.media && product.media.length > 0 && (
                    <Img fluid={product.media[0].fluid} alt={product.name} />
                  )}
                </ImgContainer1>
                <ModalContain>
                  {product.isLimitedEdition && (
                    <FlagLetter>
                      <Letter
                        font="Titillium Bold"
                        size={12}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color="#0ADB98"
                      >
                        Limited Edition
                      </Letter>
                    </FlagLetter>
                  )}
                  {showCompareAtPrice &&
                    variant.compareAtPrice - variant.price > 0 && (
                      <Letter
                        font="Titillium Bold"
                        size={14}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color="#F57B00"
                      >
                        Save &nbsp; {localeSetting.CURRENCY_SYMBOL}
                        {(variant.compareAtPrice - variant.price).toFixed(2)}
                      </Letter>
                    )}
                  <NumberChange>
                    <Label font="Titillium Bold" size={18} sizeDesktop={24}>
                      <Letter
                        size={12}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        font="Titillium Bold"
                        color="#202122"
                      >
                        {localeSetting.CURRENCY_SYMBOL}
                      </Letter>
                      {product.variant && product.variant.length > 0 && (
                        <Letter
                          font="Titillium Bold"
                          size={18}
                          sizeLaptop={20}
                          sizeLaptopL={22}
                          sizeDesktop={24}
                          color="#202122"
                        >
                          {variant.price}
                        </Letter>
                      )}
                      {showCompareAtPrice && (
                        <Label
                          size={14}
                          sizeLaptop={14}
                          sizeLaptopL={16}
                          sizeDesktop={18}
                          color="#A9ACAF"
                        >
                          <Del>
                            <Letter
                              font="Titillium Web"
                              size={14}
                              color="#A9ACAF"
                            >
                              {localeSetting.CURRENCY_SYMBOL}
                              {variant.compareAtPrice.toFixed(2)}
                            </Letter>
                          </Del>
                        </Label>
                      )}
                    </Label>
                  </NumberChange>
                  <ProductName>
                    <Letter
                      font="Titillium Bold"
                      size={18}
                      sizeLaptop={22}
                      sizeLaptopL={25}
                      sizeDesktop={28}
                      color="#202122"
                    >
                      <EllipsisText text={product.name} length={23} />
                    </Letter>
                  </ProductName>
                  {product.variant && product.variant.length > 0 && (
                    <SizeColor>
                      <Letter
                        font="Titillium Web"
                        size={13}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color="#A9ACAF"
                      >
                        {variant.size
                          ? `${variant.size.name} ${variant.size.helpText}`
                          : ``}
                        {variant.color ? `${variant.color.name}` : ``}
                      </Letter>
                    </SizeColor>
                  )}
                </ModalContain>
                <Contain1>
                  <PlusContainer
                    onClick={() => addCartItems([variant])}
                    className="add-to-cart"
                  >
                    <img src={PlusImg} alt="Plus" className="add-to-cart" />
                  </PlusContainer>
                  <Letter
                    font="Titillium Bold"
                    size={11}
                    sizeLaptop={12}
                    sizeLaptopL={14}
                    sizeDesktop={16}
                    color="#A9ACAF"
                  >
                    ADD ITEM
                  </Letter>
                </Contain1>
              </ModalContainer>
            </div>
          )
        })}
      </Products>
      <Space height={30} />
    </Parent>
  )
}

const Products = styled.div``

const ImgContainer = styled.div`
  height: 88px;
  width: 88px;
  position: relative;
  top: 8px;
  & img {
    width: 88px;
    height: 88px;
  }

  @media ${device.laptop} {
    height: 110px;
    width: 110px;
    & img {
      width: 110px;
      height: 110px;
    }
  }
  @media ${device.laptopL} {
    height: 140px;
    width: 140px;
    & img {
      width: 140px;
      height: 140px;
    }
  }
`

const ImgContainer1 = styled.div`
  height: 88px;
  width: 88px;
  position: relative;
  top: 8px;
  & img {
    width: 88px;
    height: 88px;
  }

  @media ${device.laptop} {
    height: 80px;
    width: 80px;
    & img {
      width: 80px;
      height: 80px;
    }
  }
  @media ${device.laptopL} {
    height: 100px;
    width: 100px;
    & img {
      width: 100px;
      height: 100px;
    }
  }
`

const Container = styled.div`
  height: auto;
  position: relative;
  display: ${props => props.display};
  @media ${device.laptop} {
    padding-left: 0px;
    height: auto;
    margin-bottom: 30px;
  }
`
const ModalContainer = styled.div`
  height: 96px;
  position: relative;
  display: ${props => props.display};
  @media ${device.laptop} {
    padding-left: 0px;
    height: auto;
    margin-bottom: 30px;
    width: 112%;
  }
  @media ${device.laptopL} {
    width: 103%;
  }
  @media ${device.desktop} {
    width: 94%;
  }
`

const Contain = styled.div`
  position: relative;
  height: auto;
  left: 11px;
  top: 0px;
  width: 50%;

  @media ${device.laptop} {
    position: absolute;
    left: 165px;
    width: unset;
  }
`
const ModalContain = styled.div`
  position: relative;
  height: auto;
  top: 0px;
  @media ${device.laptop} {
    margin-left: 20px;
    width: 50%;
  }
  @media ${device.laptopL} {
    width: 47%;
  }
  @media ${device.desktop} {
    width: 60%;
  }
`

const Contain1 = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  text-align: -webkit-right;
`

const NumberChange = styled.div`
  & {
    height: 22px;
    width: 150px;
    position: relative;
    line-height: 2em;
  }
  & img {
    width: 12px;
  }
  @media ${device.laptop} {
    line-height: 1.5em;
  }
  @media ${device.laptopL} {
    line-height: 1.5em;
  }
`

const ProductName = styled.div`
  line-height: 1.5em;
  @media ${device.laptop} {
    line-height: 1.5em;
    margin-top: 11px;
  }
  @media ${device.laptopL} {
    line-height: 1.5em;
    margin-top: 17px;
  }
`

const Label = styled.span`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: ${props => props.font};
  @media ${device.laptop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const Del = styled.del`
  & {
    color: #a9acaf;
    text-decoration: none;
    position: relative;
  }
  &:before {
    content: ' ';
    display: block;
    width: 90%;
    border-top: 2px solid #a9acaf;
    height: 8px;
    position: absolute;
    bottom: 2px;
    left: 7px;
    transform: rotate(7deg);
  }
`

const PlusContainer = styled.div`
  & {
    width: 36px;
    height: 36px;
    background: #ff8c00;
    text-align: center;
    padding-top: 5px;
    margin-bottom: 8px;
    cursor: pointer;
  }
  & img {
    width: 12px;
  }
  @media ${device.laptop} {
    width: 26px;
    height: 26px;
    padding-top: 0px;
    margin-bottom: 10px;
  }
  @media ${device.laptopL} {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    padding-top: 2px;
  }
  @media ${device.desktop} {
    width: 38px;
    margin-bottom: 10px;
  }
`

const FlagLetter = styled.div`
  line-height: 0.9em;
  margin-bottom: 1em;
`
const Parent = styled.div`
  @media ${device.laptop} {
    width: ${props => Number(props.width)}%;
    max-width: 668px;
  }
  @media ${device.laptopL} {
    width: ${props => Number(props.width) + 5}%;
    max-width: 668px;
  }
`

const SizeColor = styled.div`
  line-height: 1.5em;
  @media ${device.laptop} {
    margin-top: 10px;
  }
`

export default RecommendedProduct
