import React, { useContext, useEffect, useState } from 'react'
import EllipsisText from 'react-ellipsis-text'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'

import { device } from '~/utils/device'
import { Letter, Space, MobileContain, DesktopContain } from '~/utils/styles'

import LessCartImg from '~/images/Assets/Lesscart.svg'
import MoreCartImg from '~/images/Assets/Morecart.svg'

import Buy2Get1OfferBanner from '~/components/Common/Buy2Get1OfferBanner'
import Shipping from '~/components/Common/Shipping'

const CartBox = ({ pageLogo, buy2Get1OfferIsActive }) => {
  const [groupItems, setGroupItems] = useState({})
  const [cartNum, setCartNum] = useState(0)

  const {
    cartItems,
    addCartItems,
    deleteCartItems,
    removeCartItems,
    cartSum,
    store,
    fbxInitialCheckout,
    localeSetting,
    localeFolder,
  } = useContext(StoreContext)
  const { checkout } = store

  useEffect(() => {
    setGroupItems({
      groupItems: Object.values(cartItems).filter(x => !x.isSingleProduct),
      singleItems: Object.values(cartItems)
        .filter(x => x.isSingleProduct)
        .sort((a, b) => a.price - b.price),
    })

    let sum = 0
    Object.keys(cartItems).forEach(id => {
      const item = cartItems[id]
      sum += item.num
    })
    setCartNum(sum)
  }, [cartItems])

  const itemRender = item => {
    return (
      <div key={item.id}>
        <Container>
          <Link to={`/${localeFolder}/${item.product_handle}/`}>
            <ImgContainer>
              {item.images &&
                item.images.length > 0 &&
                (item.images[0].fluid ? (
                  <Img fluid={item.images[0].fluid} alt={item.sku} />
                ) : (
                  <LazyLoad>
                    <img src={item.images[0].url} alt={item.sku} />
                  </LazyLoad>
                ))}
            </ImgContainer>
          </Link>
          <Contain>
            <NumberChange>
              <MinusButton>
                <Img1
                  alt="Less Icon"
                  src={LessCartImg}
                  onClick={() => removeCartItems([item])}
                />
              </MinusButton>
              <NumberShow>
                <Letter
                  font="Titillium Bold"
                  size={16}
                  sizeLaptop={18}
                  sizeLaptopL={21}
                  sizeDesktop={24}
                  color="#FF8C00"
                >
                  {item.num}
                </Letter>
              </NumberShow>

              <PlusButton>
                <Img2
                  alt="More Icon"
                  src={MoreCartImg}
                  className="add-to-cart"
                  onClick={() => addCartItems([item])}
                />
              </PlusButton>
            </NumberChange>
            <ProductName>
              <Letter
                font="Titillium Bold"
                size={18}
                sizeMobileS={17}
                sizeLaptop={24}
                sizeLaptopL={27}
                sizeDesktop={30}
                color="#202122"
              >
                <EllipsisText text={item.product_name} length={21} />
              </Letter>
            </ProductName>
            <div>
              <Letter
                font=""
                size={12}
                sizeLaptop={13}
                sizeLaptopL={14}
                sizeDesktop={16}
                color="#202122"
              >
                {localeSetting.CURRENCY_SYMBOL}
              </Letter>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={18}
                sizeDesktop={20}
                color="#202122"
              >
                {item.price.toFixed(2)}
              </Letter>
            </div>
            <Letter
              font="Titillium Web"
              size={13}
              sizeLaptop={14}
              sizeLaptopL={16}
              sizeDesktop={18}
              color="#A9ACAF"
            >
              {item.size ? `${item.size.name} ${item.size.helpText}` : ``}
            </Letter>
            <ColorLetter>
              <Letter
                font="Titillium Web"
                size={13}
                sizeLaptop={14}
                sizeLaptopL={16}
                sizeDesktop={18}
                color="#A9ACAF"
              >
                {item.color ? `${item.color.name}` : ``}
              </Letter>
            </ColorLetter>
          </Contain>
          <Contain1
            top={
              item.compareAtPrice && item.compareAtPrice - item.price > 0
                ? 1
                : 0
            }
          >
            <div>
              {item.compareAtPrice && item.compareAtPrice - item.price > 0 && (
                <Letter
                  size={14}
                  sizeLaptop={18}
                  font="Titillium Bold"
                  sizeLaptopL={20}
                  sizeDesktop={22}
                  color="#F57B00"
                >
                  Save {localeSetting.CURRENCY_SYMBOL}
                  {(item.compareAtPrice - item.price).toFixed(2)}
                </Letter>
              )}
            </div>
            <ProductName>
              <Letter
                font="Titillium Bold"
                size={12}
                sizeLaptop={18}
                sizeLaptopL={20}
                sizeDesktop={22}
                color="#202122"
              >
                {localeSetting.CURRENCY_SYMBOL}
              </Letter>
              <Letter
                font="Titillium Bold"
                size={16}
                sizeLaptop={22}
                sizeLaptopL={24}
                sizeDesktop={26}
                color="#202122"
              >
                {(item.price * item.num).toFixed(2)}
              </Letter>
            </ProductName>
            <div>
              {item.compareAtPrice && item.compareAtPrice - item.price > 0 && (
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
                      size={16}
                      sizeLaptop={16}
                      sizeLaptopL={18}
                      sizeDesktop={20}
                      color="#A9ACAF"
                    >
                      {localeSetting.CURRENCY_SYMBOL}
                      {item.compareAtPrice.toFixed(2)}
                    </Letter>
                  </Del>
                </Letter>
              )}
            </div>
          </Contain1>
          <RightTipLetter onClick={() => deleteCartItems([item])}>
            <Letter
              font="Titillium Bold"
              size={11}
              sizeLaptop={10}
              sizeLaptopL={12}
              sizeDesktop={14}
              color="#A9ACAF"
            >
              REMOVE
            </Letter>
          </RightTipLetter>
        </Container>
      </div>
    )
  }

  const specialItemRender = (item, index) => {
    let freeCartNum = 0
    groupItems.singleItems.forEach(_item => {
      freeCartNum += _item.num
    })
    let discountNum = Math.floor(freeCartNum / 3)

    let numbers = 0
    groupItems.singleItems.forEach((_item, num) => {
      if (num < index) numbers += _item.num
    })
    let freeNum = discountNum - numbers
    let freeItemNum = 0
    if (freeNum > 0 && freeNum > item.num) freeItemNum = item.num
    else freeItemNum = freeNum
    if (freeNum > 0) {
      return (
        <div key={item.id}>
          <Container>
            <Link to={`/${localeFolder}/${item.product_handle}/`}>
              <ImgContainer>
                {item.images &&
                  item.images.length > 0 &&
                  (item.images[0].fluid ? (
                    <Img fluid={item.images[0].fluid} alt={item.sku} />
                  ) : (
                    <LazyLoad>
                      <img src={item.images[0].url} alt={item.sku} />
                    </LazyLoad>
                  ))}
              </ImgContainer>
            </Link>
            <Contain>
              <NumberChange>
                <MinusButton>
                  <Img1
                    alt="Less Icon"
                    src={LessCartImg}
                    onClick={() => removeCartItems([item])}
                  />
                </MinusButton>
                <NumberShow>
                  <Letter
                    font="Titillium Bold"
                    size={16}
                    sizeLaptop={20}
                    sizeLaptopL={22}
                    sizeDesktop={24}
                    color="#FF8C00"
                  >
                    {item.num}
                  </Letter>
                </NumberShow>

                <PlusButton>
                  <Img2
                    alt="More Icon"
                    src={MoreCartImg}
                    className="add-to-cart"
                    onClick={() => addCartItems([item])}
                  />
                </PlusButton>
              </NumberChange>
              <ProductName>
                <Letter
                  font="Titillium Bold"
                  size={18}
                  sizeMobileS={17}
                  sizeLaptop={24}
                  sizeLaptopL={27}
                  sizeDesktop={30}
                  color="#202122"
                >
                  <EllipsisText text={item.product_name} length={21} />
                </Letter>
              </ProductName>
              <div>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={13}
                  sizeLaptopL={14}
                  sizeDesktop={16}
                  color="#202122"
                >
                  {localeSetting.CURRENCY_SYMBOL}
                </Letter>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#202122"
                >
                  {item.price.toFixed(2)}
                </Letter>
              </div>
              <Letter
                font="Titillium Web"
                size={13}
                sizeLaptop={14}
                sizeLaptopL={16}
                sizeDesktop={18}
                color="#A9ACAF"
              >
                {item.size ? `${item.size.name} ${item.size.helpText}` : ``}
              </Letter>
              <ColorLetter>
                <Letter
                  font="Titillium Web"
                  size={13}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="#A9ACAF"
                >
                  {item.color ? `${item.color.name}` : ``}
                </Letter>
              </ColorLetter>
            </Contain>
            <Contain1
              top={
                (item.compareAtPrice && item.compareAtPrice - item.price > 0) ||
                freeItemNum > 0
                  ? 1
                  : 0
              }
            >
              <div>
                <Letter
                  size={14}
                  font="Titillium Bold"
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="#F57B00"
                >
                  {freeItemNum} free item
                </Letter>
              </div>
              <ProductName>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={18}
                  sizeLaptopL={20}
                  sizeDesktop={22}
                  color="#202122"
                >
                  {localeSetting.CURRENCY_SYMBOL}
                </Letter>
                <Letter
                  font="Titillium Bold"
                  size={16}
                  sizeLaptop={20}
                  sizeLaptopL={23}
                  sizeDesktop={26}
                  color="#202122"
                >
                  {(item.price * (item.num - freeItemNum)).toFixed(2)}
                </Letter>
              </ProductName>
              <div>
                {freeItemNum > 0 && (
                  <Letter
                    size={14}
                    font="Titillium Bold"
                    sizeLaptop={14}
                    sizeLaptopL={16}
                    sizeDesktop={18}
                    color="#A9ACAF"
                  >
                    <Del>
                      <Letter
                        font="Titillium Web"
                        size={14}
                        sizeLaptop={16}
                        sizeLaptopL={18}
                        sizeDesktop={20}
                        color="#A9ACAF"
                      >
                        {localeSetting.CURRENCY_SYMBOL}
                        {(item.price * item.num).toFixed(2)}
                      </Letter>
                    </Del>
                  </Letter>
                )}
              </div>
            </Contain1>
            <RightTipLetter onClick={() => deleteCartItems([item])}>
              <Letter
                font="Titillium Bold"
                size={11}
                sizeLaptop={12}
                sizeDesktop={14}
                color="#A9ACAF"
              >
                REMOVE
              </Letter>
            </RightTipLetter>
          </Container>
        </div>
      )
    } else {
      return (
        <div key={item.id}>
          <Container>
            <Link to={`/${localeFolder}/${item.product_handle}/`}>
              <ImgContainer>
                {item.images &&
                  item.images.length > 0 &&
                  (item.images[0].fluid ? (
                    <Img fluid={item.images[0].fluid} alt={item.sku} />
                  ) : (
                    <LazyLoad>
                      <img src={item.images[0].url} alt={item.sku} />
                    </LazyLoad>
                  ))}
              </ImgContainer>
            </Link>
            <Contain>
              <NumberChange>
                <MinusButton>
                  <Img1
                    alt="Less Icon"
                    src={LessCartImg}
                    onClick={() => removeCartItems([item])}
                  />
                </MinusButton>
                <NumberShow>
                  <Letter
                    font="Titillium Bold"
                    size={16}
                    sizeLaptop={20}
                    sizeLaptopL={22}
                    sizeDesktop={24}
                    color="#FF8C00"
                  >
                    {item.num}
                  </Letter>
                </NumberShow>

                <PlusButton>
                  <Img2
                    alt="More Icon"
                    src={MoreCartImg}
                    className="add-to-cart"
                    onClick={() => addCartItems([item])}
                  />
                </PlusButton>
              </NumberChange>

              <ProductName>
                <Letter
                  font="Titillium Bold"
                  size={18}
                  sizeMobileS={17}
                  sizeLaptop={24}
                  sizeLaptopL={27}
                  sizeDesktop={30}
                  color="#202122"
                >
                  <EllipsisText text={item.product_name} length={21} />
                </Letter>
              </ProductName>
              <div>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={13}
                  sizeLaptopL={14}
                  sizeDesktop={16}
                  color="#202122"
                >
                  {localeSetting.CURRENCY_SYMBOL}
                </Letter>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#202122"
                >
                  {item.price.toFixed(2)}
                </Letter>
              </div>
              <Letter
                font="Titillium Web"
                size={13}
                sizeLaptop={14}
                sizeLaptopL={16}
                sizeDesktop={18}
                color="#A9ACAF"
              >
                {item.size ? `${item.size.name} ${item.size.helpText}` : ``}
              </Letter>
              <ColorLetter>
                <Letter
                  font="Titillium Web"
                  size={13}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="#A9ACAF"
                >
                  {item.color ? `${item.color.name}` : ``}
                </Letter>
              </ColorLetter>
            </Contain>
            <Contain1
              top={
                item.compareAtPrice && item.compareAtPrice - item.price > 0
                  ? 1
                  : 0
              }
            >
              <div>
                {item.compareAtPrice && item.compareAtPrice - item.price > 0 && (
                  <Letter
                    size={14}
                    font="Titillium Bold"
                    sizeLaptop={14}
                    sizeLaptopL={16}
                    sizeDesktop={18}
                    color="#F57B00"
                  >
                    Save {localeSetting.CURRENCY_SYMBOL}
                    {(item.compareAtPrice - item.price).toFixed(2)}
                  </Letter>
                )}
              </div>
              <ProductName>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={18}
                  sizeLaptopL={20}
                  sizeDesktop={22}
                  color="#202122"
                >
                  {localeSetting.CURRENCY_SYMBOL}
                </Letter>
                <Letter
                  font="Titillium Bold"
                  size={16}
                  sizeLaptop={22}
                  sizeLaptopL={24}
                  sizeDesktop={26}
                  color="#202122"
                >
                  {(item.price * item.num).toFixed(2)}
                </Letter>
              </ProductName>
              <div>
                {item.compareAtPrice && item.compareAtPrice - item.price > 0 && (
                  <Letter
                    size={14}
                    font="Titillium Web"
                    sizeLaptop={14}
                    sizeLaptopL={16}
                    sizeDesktop={18}
                    color="#A9ACAF"
                  >
                    <Del>
                      <Letter
                        font="Titillium Web"
                        size={16}
                        sizeLaptop={16}
                        sizeLaptopL={18}
                        sizeDesktop={20}
                        color="#A9ACAF"
                      >
                        {localeSetting.CURRENCY_SYMBOL}
                        {item.compareAtPrice.toFixed(2)}
                      </Letter>
                    </Del>
                  </Letter>
                )}
              </div>
            </Contain1>
            <RightTipLetter onClick={() => deleteCartItems([item])}>
              <Letter
                font="Titillium Bold"
                size={11}
                sizeLaptop={10}
                sizeLaptopL={12}
                sizeDesktop={14}
                color="#A9ACAF"
              >
                REMOVE
              </Letter>
            </RightTipLetter>
          </Container>
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      <ModalHeader>
        <LazyLoad>
          <img src={pageLogo.url} alt="Logo" />
        </LazyLoad>
      </ModalHeader>
      <DesktopFlex>
        <PaddingContain>
          <CartPanel>
            <LetterBox>
              <Letter
                font="Titillium Bold"
                size={20}
                sizeLaptop={20}
                sizeLaptopL={24}
                sizeDesktop={28}
                color="#202122"
              >
                Your Cart
              </Letter>
              <Letter
                font="Titillium Bold"
                size={20}
                sizeLaptop={20}
                sizeLaptopL={24}
                sizeDesktop={28}
                color="#202122"
              >
                &nbsp; / {cartNum} items
              </Letter>
              <PriceBox>
                <Letter
                  font="Titillium Web"
                  size={16}
                  sizeLaptop={16}
                  sizeLaptopL={19}
                  sizeDesktop={22}
                >
                  {' '}
                  {localeSetting.CURRENCY_SYMBOL}{' '}
                </Letter>
                <Letter
                  font="Titillium Web"
                  size={20}
                  sizeLaptop={20}
                  sizeLaptopL={24}
                  sizeDesktop={28}
                >
                  {' '}
                  {cartSum.toFixed(2)}{' '}
                </Letter>
              </PriceBox>
            </LetterBox>
            {buy2Get1OfferIsActive === true &&
              groupItems.groupItems &&
              groupItems.groupItems.length > 0 && (
                <PaddingContainer>
                  <Letter
                    font="Titillium Bold"
                    size={16}
                    sizeLaptop={18}
                    sizeLaptopL={21}
                    sizeDesktop={24}
                  >
                    Item in sale
                  </Letter>
                </PaddingContainer>
              )}
            {groupItems.groupItems &&
              groupItems.groupItems.length > 0 &&
              groupItems.groupItems.map(item => itemRender(item))}
            {groupItems.singleItems && groupItems.singleItems.length > 0 && (
              <React.Fragment>
                {buy2Get1OfferIsActive === true && (
                  <React.Fragment>
                    <PaddingContainer>
                      <Letter
                        font="Titillium Bold"
                        size={16}
                        sizeLaptop={18}
                        sizeLaptopL={21}
                        sizeDesktop={24}
                      >
                        Items elegible for Special Offer
                      </Letter>
                    </PaddingContainer>
                    <Space height={20} />
                  </React.Fragment>
                )}
                <Buy2Get1OfferBanner />
                {groupItems.singleItems.map((item, index) =>
                  buy2Get1OfferIsActive === true
                    ? specialItemRender(item, index)
                    : itemRender(item)
                )}
              </React.Fragment>
            )}
          </CartPanel>
        </PaddingContain>
        <MobileContain>
          <Space height={40} />
        </MobileContain>
        <ShippingInfo>
          <Shipping isCartPage={true} />
          <LetterContainer>
            <DesktopContain>
              <Space height={20} />
              <Button onClick={() => fbxInitialCheckout(checkout.webUrl)}>
                <Letter
                  font="Titillium Bold"
                  size={20}
                  sizeLaptop={14}
                  sizeLaptopL={17}
                  sizeDesktop={20}
                  color="white"
                >
                  TO CHECKOUT
                </Letter>
                <Letter
                  font="Titillium Light"
                  size={18}
                  sizeLaptop={12}
                  sizeLaptopL={15}
                  sizeDesktop={18}
                  color="white"
                >
                  &nbsp; /SUBTOTAL &nbsp;
                  {localeSetting.CURRENCY_SYMBOL}
                  {cartSum.toFixed(2)}
                </Letter>
              </Button>
            </DesktopContain>
          </LetterContainer>
        </ShippingInfo>
      </DesktopFlex>
    </React.Fragment>
  )
}

const ModalHeader = styled.div`
  & {
    text-align: center;
    background: #f2f2f7;
  }
  & img {
    padding-top: 40px;
    padding-bottom: 60px;
    width: 200px;
  }

  @media ${device.laptop} {
    & img {
      // width: 16%;
      padding-top: 40px;
    }
    background: #f2f2f7;
  }
  @media ${device.laptopL} {
    & img {
      padding-top: 48px;
    }
  }
  @media ${device.desktop} {
    & img {
      padding-top: 72px;
    }
  }
`

const CartPanel = styled.div`
  height: auto;
  width: 100%;
  background: white;
  padding-bottom: 23px;
  background: #f2f2f7;
  @media ${device.tablet} {
    padding: 0% 10%;
    padding-bottom: 23px;
  }
  @media ${device.laptop} {
    padding: unset;
    width: 80%;
    background: transparent;
  }
  @media ${device.laptopL} {
    max-width: 668px;
    background: transparent;
  }
`

const ImgContainer = styled.div`
  height: 88px;
  width: 88px;
  position: relative;
  overflow: hidden;
  & img {
    width: 88px !important;
    height: 88px !important;
  }
  @media ${device.mobileS} {
    height: 70px;
    width: 70px;
    position: relative;
    overflow: hidden;
    & img {
      width: 70px !important;
      height: 70px !important;
    }
  }
  @media ${device.mobileM} {
    height: 88px;
    width: 88px;
    position: relative;
    overflow: hidden;
    & img {
      width: 88px !important;
      height: 88px !important;
    }
  }
  @media ${device.mobileL} {
  }
  @media ${device.laptop} {
    overflow: unset;
    height: 110px;
    width: 110px;
    & img {
      width: 110px !important;
      height: 110px !important;
    }
  }
  @media ${device.laptopL} {
    overflow: unset;
    height: 140px;
    width: 140px;
    & img {
      width: 140px !important;
      height: 140px !important;
    }
  }
`

const Container = styled.div`
  height: auto;
  position: relative;
  padding-left: 16px;
  overflow: hidden;
  display: flex;
  margin-bottom: 15px;
  @media ${device.laptop} {
    padding-left: 0px;
    margin-bottom: 30px;
  }
`

const Contain = styled.div`
  position: relative;
  height: auto;
  margin-left: 14px;
  @media ${device.laptop} {
    margin-left: 25px;
  }
  @media ${device.desktop} {
    width: 500px;
  }
`

const Contain1 = styled.div`
  position: absolute;
  right: 16px;
  top: 22px;
  top: ${props => props.top * -20 + 40}px;
  text-align: end;
  @media ${device.laptop} {
    top: ${props => props.top * -24 + 44}px;
    right: 0px;
  }
  @media ${device.desktop} {
    top: ${props => props.top * -32 + 52}px;
  }
`

const NumberChange = styled.div`
  & {
    height: 36px;
    width: 98px;
    background-color: white;
    position: relative;
    margin-top: 5px;
    display: flex;
  }
  & img {
    width: 12px;
    height: 100%;
  }
  & span {
    position: absolute;
    left: 50%;

    transform: translate(-50%, 5px);
  }
  @media ${device.laptop} {
    & {
      height: 40px;
      width: 130px;
    }
    & img {
      width: 13px;
    }
    & span {
    }
  }
  @media ${device.laptopL} {
    & {
      height: 40px;
      width: 115px;
    }
    & img {
      width: 15px;
    }
    & span {
    }
  }
  @media ${device.desktop} {
    & {
      height: 50px;
      width: 130px;
    }
    & img {
      width: 17px;
    }
    & span {
    }
  }
`

const Img1 = styled.img`
  // position: absolute;
  // top: 17px;
  // left: 13px;
  @media ${device.laptop} {
    // position: absolute;
    // top: 21px;
    // left: 19px;
    // padding: 10px;
    // margin: -10px;
  }
  @media ${device.laptopL} {
    // position: absolute;
    // top: 25px;
    // left: 19px;
    // padding: 10px;
    // margin: -12px;
  }
  @media ${device.desktop} {
    // position: absolute;
    // top: 25px;
    // left: 19px;
    // padding: 10px;
    // margin: -10px;
  }
`

const Img2 = styled.img`
  // position: absolute;
  // top: 12px;
  // right: 13px;
  @media ${device.laptop} {
    // position: absolute;
    // top: 14px;
    // right: 19px;
    // padding: 10px;
    // margin: -10px;
  }
  @media ${device.laptopL} {
    // position: absolute;
    // top: 18px;
    // right: 19px;
    // padding: 10px;
    // margin: -12px;
  }
  @media ${device.desktop} {
    // position: absolute;
    // top: 18px;
    // right: 19px;
    // padding: 10px;
    // margin: -10px;
  }
`

const ProductName = styled.div`
  margin-top: 11px;
  line-height: 0.5em;
  @media ${device.laptop} {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  @media ${device.desktop} {
    line-height: 1em;
  }
`

const LetterContainer = styled.div`
  padding-left: 25px;
  @media ${device.tablet} {
    padding-left: 5%;
  }
  @media ${device.laptop} {
    padding-left: 25px;
  }
`

const DesktopFlex = styled.div`
  @media ${device.laptop} {
    display: flex;
    background: #f2f2f7;
  }
`

const LetterBox = styled.div`
  display: flex;
  padding: 16px;
  @media ${device.laptop} {
    position: relative;
    padding: 0px;
    padding-bottom: 50px;
  }
`

const PriceBox = styled.div`
  position: absolute;
  right: 16px;
  @media ${device.tablet} {
    right: 12%;
  }
  @media ${device.laptop} {
    right: 16px;
  }
`
const PaddingContainer = styled.div`
  padding-left: 16px;
  @media ${device.laptop} {
    padding-left: 0px;
  }
`
const ColorLetter = styled.div`
  margin-top: -9px;
  @media ${device.laptop} {
    margin-top: -3px;
  }
  @media ${device.laptopL} {
    width: 503px;
    position: relative;
  }
  @media ${device.desktop} {
    width: 503px;
    position: relative;
  }
`

const PaddingContain = styled.div`
  @media ${device.laptop} {
    padding: auto;
    display: flex;
    width: 58%;
    background: #f2f2f7;
    justify-content: center;
    margin-top: 20px;
  }
  @media ${device.laptopL} {
    width: 65%;
    margin-top: 20px;
  }
  @media ${device.desktop} {
    margin-top: 50px;
  }
`

const ShippingInfo = styled.div`
  @media ${device.laptop} {
    width: 36%;
    background: white;
    padding: 2.5%;
    position: fixed;
    right: 5%;
    height: 100%;
  }
  @media ${device.laptopL} {
    width: 30%;
    margin-top: -20px;
  }
  @media ${device.desktop} {
    margin-top: 0px;
  }
`

const Button = styled.a`
  display: block;
  background: #f57b00;
  color: white;
  text-align: center;
  height: 83px;
  padding-top: 26px;
  cursor: pointer;
  @media ${device.laptop} {
    height: 58px;
    padding-top: 17px;
  }
  @media ${device.laptopL} {
    height: 70px;
    padding-top: 23px;
  }
  @media ${device.desktop} {
    height: 83px;
    padding-top: 26px;
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
    width: 100%;
    border-top: 2px solid #a9acaf;
    height: 8px;
    position: absolute;
    bottom: 3px;
    left: -1px;
    -webkit-transform: rotate(7deg);
    -ms-transform: rotate(7deg);
    transform: rotate(7deg);
  }
  @media ${device.laptop} {
    &:before {
      bottom: 6px;
    }
  }
`

const RightTipLetter = styled.div`
  position: absolute;
  right: 16px;
  bottom: 15px;
  cursor: pointer;
  @media ${device.laptop} {
    position: absolute;
    right: 0px;
    bottom: 15px;
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
`

export default CartBox
