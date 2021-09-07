import React, { useContext } from 'react'
import EllipsisText from 'react-ellipsis-text'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'

import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import { Letter, Space, DesktopContain, MobileContain } from '~/utils/styles'

import BackCartImg from '~/images/Assets/BackfromCart.svg'
import LessCartImg from '~/images/Assets/Lesscart.svg'
import MoreCartImg from '~/images/Assets/Morecart.svg'
import AddCartImg from '~/images/Assets/Add-to-cart.svg'

import RecommendedProduct from '~/components/pages/cart/RecommendedProduct'
import Shipping from '~/components/Common/Shipping'

const CartModal = () => {
  const {
    cartItems,
    addCartItems,
    deleteCartItems,
    removeCartItems,
    cartSum,
    setCartModal,
    setModal,
    locale,
    localeSetting,
    localeFolder,
  } = useContext(StoreContext)
  const { cartPage_en, cartPage_de, cartPage_ch } = useStaticQuery(graphql`
    query {
      cartPage_en: datoCmsCartPage(locale: { eq: "en" }) {
        ...collectionCartPage_commonFields
      }
      cartPage_de: datoCmsCartPage(locale: { eq: "de" }) {
        ...collectionCartPage_commonFields
      }
      cartPage_ch: datoCmsCartPage(locale: { eq: "en-CH" }) {
        ...collectionCartPage_commonFields
      }
    }
    fragment collectionCartPage_commonFields on DatoCmsCartPage {
      emptyMessage
      showShopNowButton
      shopNowButtonText
      shopNowButtonLink
      showRecommendedSection
      pageLogo {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      recommendedProducts {
        id
        availableForSale
        handle
        name
        shopifyId
        isFadingOut
        isInFunding
        isTboCommunity
        isLimitedEdition
        isSingleProduct
        availabilityDate
        media {
          url
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "300" }) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
        variant {
          id
          sku
          shopifyId
          availableForSale
          price
          compareAtPrice
          color {
            name
            colorCode {
              hex
            }
            colorImage {
              url
            }
          }
          size {
            name
            helpText
          }
          images {
            url
            fluid(
              forceBlurhash: true
              maxWidth: 910
              imgixParams: { w: "300" }
            ) {
              sizes
              aspectRatio
              src
              srcSet
              width
              height
            }
          }
        }
      }
    }
  `)
  let cartPage = {}
  if (locale === 'en') {
    cartPage = cartPage_en
  } else if (locale === 'de') {
    cartPage = cartPage_de
  } else if (locale === 'en-CH') {
    cartPage = cartPage_ch
  }

  const closeModel = () => {
    setModal(false)
    setCartModal(false)
  }

  return (
    <React.Fragment>
      <CartPanel>
        <ModalHeader onClick={() => closeModel()}>
          <img src={BackCartImg} alt="Back Cart" />
          <Letter font="Titillium Bold" size={16} color={darkFont}>
            BACK TO SHOP
          </Letter>
        </ModalHeader>
        <DesktopContain>
          <Space height={50} />
        </DesktopContain>
        <ItemList>
          {Object.keys(cartItems).map(id => {
            const item = cartItems[id]
            return (
              <div key={id}>
                <Container>
                  <ImgContainer>
                    {item.images &&
                      item.images.length > 0 &&
                      (item.images[0].fluid ? (
                        <Img fluid={item.images[0].fluid} />
                      ) : (
                        <LazyLoad>
                          <img src={item.images[0].url} alt={item.sku} />
                        </LazyLoad>
                      ))}
                  </ImgContainer>
                  <Contain>
                    <NumberChange>
                      <MinusButton
                        onClick={() => removeCartItems([item], closeModel)}
                      >
                        <Img1 alt="Less Icon" src={LessCartImg} />
                      </MinusButton>
                      <NumberShow>
                        <Letter
                          font="Titillium Bold"
                          size={16}
                          sizeLaptop={16}
                          sizeLaptopL={18}
                          sizeDesktop={20}
                          color="#FF8C00"
                        >
                          {item.num}
                        </Letter>
                      </NumberShow>

                      <PlusButton
                        onClick={() => addCartItems([item])}
                        className="add-to-cart"
                      >
                        <Img2
                          alt="More Icon"
                          src={MoreCartImg}
                          className="add-to-cart"
                        />
                      </PlusButton>
                    </NumberChange>
                    <ProductName>
                      <Letter
                        font="Titillium Bold"
                        size={18}
                        sizeMobileS={16}
                        sizeLaptop={22}
                        sizeLaptopL={25}
                        sizeDesktop={28}
                        color={darkFont}
                      >
                        <MobileContain>
                          <EllipsisText text={item.product_name} length={23} />
                        </MobileContain>
                        <DesktopContain>{item.product_name}</DesktopContain>
                      </Letter>
                      <Letter
                        font="Titillium Bold"
                        size={12}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color={darkFont}
                      >
                        {localeSetting.CURRENCY_SYMBOL}
                      </Letter>
                      <Letter
                        font="Titillium Bold"
                        size={16}
                        sizeLaptop={18}
                        sizeLaptopL={21}
                        sizeDesktop={24}
                        color={darkFont}
                      >
                        {item.price}
                      </Letter>
                    </ProductName>
                    <Letter
                      font="Titillium Web"
                      size={13}
                      sizeLaptop={14}
                      sizeLaptopL={16}
                      sizeDesktop={18}
                      color="#A9ACAF"
                    >
                      {item.size
                        ? `${item.size.name} ${item.size.helpText}`
                        : ``}
                      {item.color ? `${item.color.name}` : ``}
                    </Letter>
                  </Contain>
                  <Contain1
                    top={
                      item.compareAtPrice &&
                      item.compareAtPrice - item.price > 0
                        ? 1
                        : 0
                    }
                  >
                    <div>
                      {item.compareAtPrice &&
                        item.compareAtPrice - item.price > 0 && (
                          <Letter
                            size={14}
                            sizeLaptop={14}
                            font="Titillium Bold"
                            sizeLaptopL={16}
                            sizeDesktop={18}
                            color="#F57B00"
                          >
                            Save {localeSetting.CURRENCY_SYMBOL}
                            {(item.compareAtPrice - item.price).toFixed(2)}
                          </Letter>
                        )}
                    </div>
                    <PriceLetter>
                      <Letter
                        font="Titillium Bold"
                        size={12}
                        sizeLaptop={14}
                        sizeLaptopL={16}
                        sizeDesktop={18}
                        color={darkFont}
                      >
                        {localeSetting.CURRENCY_SYMBOL}
                      </Letter>
                      <Letter
                        font="Titillium Bold"
                        size={16}
                        sizeLaptop={18}
                        sizeLaptopL={21}
                        sizeDesktop={24}
                        color={darkFont}
                      >
                        {(item.price * item.num).toFixed(2)}
                      </Letter>
                    </PriceLetter>
                    <ComparePrice>
                      {item.compareAtPrice &&
                        item.compareAtPrice - item.price > 0 && (
                          <Letter
                            size={14}
                            sizeLaptop={14}
                            font="Titillium Web"
                            sizeLaptopL={16}
                            sizeDesktop={18}
                            color="#A9ACAF"
                          >
                            <Del>
                              <Letter
                                font="Titillium Web"
                                size={14}
                                sizeLaptop={14}
                                sizeLaptopL={16}
                                sizeDesktop={18}
                                color="#A9ACAF"
                              >
                                {localeSetting.CURRENCY_SYMBOL}
                                {item.compareAtPrice.toFixed(2)}
                              </Letter>
                            </Del>
                          </Letter>
                        )}
                    </ComparePrice>
                  </Contain1>
                  <RightTipLetter>
                    <Letter
                      font="Titillium Bold"
                      size={11}
                      sizeLaptop={10}
                      sizeLaptopL={12}
                      sizeDesktop={14}
                      color="#A9ACAF"
                      onClick={() => deleteCartItems([item], closeModel)}
                    >
                      REMOVE
                    </Letter>
                  </RightTipLetter>
                </Container>
              </div>
            )
          })}
        </ItemList>
        <Shipping />
        <DesktopContain>
          <Space height={80} />
        </DesktopContain>
        <ModalRecommend>
          <DesktopContainer>
            <CartFooter>
              <Link to={`/${localeFolder}/cart`} onClick={() => closeModel()}>
                <Letter
                  font="Titillium Bold"
                  sizeDesktop={20}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  color="white"
                >
                  YOUR CART
                </Letter>
                <Letter
                  font="Titillium Light"
                  sizeDesktop={18}
                  sizeLaptopL={16}
                  sizeLaptop={14}
                  color="white"
                >
                  {' '}
                  / SUBTOTAL &nbsp;
                  {localeSetting.CURRENCY_SYMBOL}
                  {cartSum.toFixed(2)}
                </Letter>

                <CartImgBox>
                  <img src={AddCartImg} alt="Arrow" />
                </CartImgBox>
              </Link>
            </CartFooter>
          </DesktopContainer>
          <RecommendedProduct
            recommendedProducts={cartPage.recommendedProducts}
            modal={true}
          />
        </ModalRecommend>
        <MobileContain>
          <CartFooter>
            <Link to={`/${localeFolder}/cart`} onClick={() => closeModel()}>
              <Letter font="Titillium Bold" size={16} color="white">
                YOUR CART
              </Letter>
              <Letter font="Titillium Light" size={14} color="white">
                {' '}
                / SUBTOTAL &nbsp;
                {localeSetting.CURRENCY_SYMBOL}
                {cartSum.toFixed(2)}
              </Letter>

              <CartImgBox>
                <img src={AddCartImg} alt="AddCartImg" />
              </CartImgBox>
            </Link>
          </CartFooter>
        </MobileContain>
      </CartPanel>
    </React.Fragment>
  )
}

const ModalHeader = styled.div`
  & {
    padding: 20px;
  }
  & img {
    margin-right: 10px;
    cursor: pointer;
  }
  @media ${device.laptop} {
    padding-top: 41px;
    padding-left: 15%;
    position: relative;
    & img {
      position: absolute;
      width: 28px;
      left: 28px;
      top: 40px;
    }
  }
  @media ${device.laptopL} {
    padding-top: 46px;
    padding-left: 15%;
    position: relative;
    & img {
      position: absolute;
      width: 32px;
      left: 32px;
      top: 41px;
    }
  }
  @media ${device.desktop} {
    padding-left: 13%;
    & img {
      position: absolute;
      width: 38px;
      left: 28px;
      top: 40px;
    }
  }
`

const CartPanel = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background: white;
  bottom: 0px;
  border-top: 6px solid #ff8c00;
  z-index: 91;
  left: 0px;
  padding-bottom: 113px;
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    left: unset;
    border-top: none;
    padding-bottom: unset;
    overflow: auto;
    overflow-x: hidden;
    max-width: 450px;
  }
  @media ${device.laptopL} {
    width: 34%;
    max-width: unset;
  }
`

const ImgContainer = styled.div`
  height: 110px;
  width: 100px;
  position: relative;
  & img {
    width: 88px !important;
    height: 88px !important;
  }
  @media ${device.mobileS} {
    height: 92px;
    width: 82px;
    position: relative;
    & img {
      width: 70px !important;
      height: 70px !important;
    }
  }
  @media ${device.mobileM} {
    height: 110px;
    width: 100px;
    position: relative;
    & img {
      width: 88px !important;
      height: 88px !important;
    }
  }
  @media ${device.laptop} {
    height: 80px;
    width: 80px;
    & img {
      width: 80px !important;
      height: 80px !important;
    }
  }
  @media ${device.laptopL} {
    height: 110px;
    width: 100px;
    & img {
      width: 100px !important;
      height: 100px !important;
    }
  }
`

const Container = styled.div`
  min-height: 110px;
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 15px;
  height: auto;
  display: flex;
  @media ${device.laptop} {
    padding-left: 0px;
  }
`

const Contain = styled.div`
  position: relative;
  @media ${device.laptop} {
    width: 60%;
    position: relative;
    margin-left: 20px;
  }
`

const Contain1 = styled.div`
  position: absolute;
  right: 16px;
  top: ${props => props.top * -23 + 45}px;
  text-align: end;
  @media ${device.laptop} {
    text-align: end;
    right: 0px;
    bottom: unset;
    top: ${props => props.top * -30 + 47}px;
  }
  @media ${device.laptopL} {
    top: ${props => props.top * -30 + 43}px;
  }
  @media ${device.desktop} {
    top: ${props => props.top * -30 + 47}px;
  }
`

const NumberChange = styled.div`
  & {
    height: 34px;
    width: 90px;
    background-color: #f2f2f7;
    position: relative;
    display: flex;
  }
  & img {
    width: 12px;
  }
  & span {
    position: absolute;
    left: 50%;
    top: 5.5px;
    transform: translate(-50%, 0px);
  }
  @media ${device.laptop} {
    & {
      height: 36px;
      width: 104px;
      margin-top: 0px;
    }
    & span {
      top: 3.5px;
    }
  }
  @media ${device.laptopL} {
    & {
      height: 40px;
      width: 104px;
      margin-top: 0px;
    }
    & span {
      top: 6.5px;
    }
  }
  @media ${device.desktop} {
    & {
      height: 44px;
      width: 104px;
      margin-top: 0px;
    }
    & span {
      top: 7.5px;
    }
  }
`

const Img1 = styled.img`
  position: absolute;
  top: 17px;
  left: 13px;
  @media ${device.laptop} {
    top: 19px;
  }
  @media ${device.laptopL} {
    top: 21px;
  }
  @media ${device.desktop} {
    top: 24px;
  }
`

const Img2 = styled.img`
  position: absolute;
  top: 12px;
  right: 13px;
  @media ${device.laptop} {
    top: 13px;
  }
  @media ${device.laptopL} {
    top: 15px;
  }
  @media ${device.desktop} {
    top: 18px;
  }
`

const ProductName = styled.div`
  margin-top: 8px;
  line-height: 1.4em;
  @media ${device.laptop} {
    width: 88%;
  }
  @media ${device.laptopL} {
    line-height: 2em;

    padding-bottom: 10px;
  }
`

const CartFooter = styled.div`
  position: absolute;
  bottom: 0px;
  height: 83px;
  width: 100%;
  background: #f57b00;
  padding-right: 83px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.laptop} {
    top: -133px;
    height: 65px;
  }
  @media ${device.laptopL} {
    height: 72px;
    top: -137px;
  }
  @media ${device.desktop} {
    height: 83px;
    top: -140px;
  }
`

const CartImgBox = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 83px;
  height: 83px;
  background: #ff8c00;
  text-align: center;
  padding: 25px;
  @media ${device.laptop} {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media ${device.laptopL} {
    height: 72px;
  }
  @media ${device.desktop} {
    height: 83px;
  }
`

const ItemList = styled.div`
  max-height: 300px;
  overflow: scroll;
  @media ${device.mobileS} {
    max-height: 200px;
  }
  @media ${device.mobileM} {
    max-height: 250px;
  }
  @media ${device.mobileL} {
    max-height: 300px;
  }
  @media ${device.laptop} {
    overflow: unset;
    max-height: unset;
    margin-left: 26px;
    margin-right: 10%;
  }
  @media ${device.laptopL} {
    margin-right: 12%;
    margin-left: 34px;
  }
  @media ${device.desktop} {
    margin-left: 50px;
    margin-right: 17%;
  }
`

const ModalRecommend = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    position: relative;
    bottom: 0px;
    height: auto;
    width: 100%;
    padding-right: 83px;
    background: #f2f2f7;
    padding-top: 100px;
    padding-left: 50px;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    position: relative;
    display: block;
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

const PriceLetter = styled.div`
  line-height: 1em;
  @media ${device.laptop} {
    line-height: 2em;
  }
  @media ${device.laptopL} {
    margin-top: 5px;
  }
  @media ${device.desktop} {
  }
`
const ComparePrice = styled.div`
  @media ${device.laptop} {
  }
`

const RightTipLetter = styled.div`
  position: absolute;
  right: 16px;
  bottom: 0px;
  cursor: pointer;
  @media ${device.laptop} {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
`

const MinusButton = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const PlusButton = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const NumberShow = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default CartModal
