import React, { useState, useEffect, useContext } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { encode } from 'js-base64'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { Letter, MobileContain } from '~/utils/styles'

import Circle from '~/components/Common/Circle'
import Carousel from '~/components/Common/ImageSlider'
import ProductRating from '~/components/Common/ProductRating'

import 'swiper/css/swiper.css'

const NextPreview = ({
  productImages = [],
  product,
  price,
  compareAtPrice,
  offerTitle,
  offerHighlight,
  offerMessage,
  buttonText,
  hasFreeShippingOffer,
}) => {
  const { setModal, localeSetting } = useContext(StoreContext)
  const [mainImage, setMainImage] = useState(
    productImages.length > 0 ? productImages[0] : null
  )
  const showCompareAtPrice = compareAtPrice > price
  const {
    store: { shopifyClient },
  } = useContext(StoreContext)
  const [options, setOptions] = useState({ Size: {}, Color: {} })

  const PrevImagesRender = () => {
    productImages = productImages || []
    return productImages.map((item, index) => (
      <PrevContainer1
        key={index}
        onClick={() => {
          setMainImage(item)
          slideImage1(index)
        }}
      >
        <Img fluid={item.fluid} />
      </PrevContainer1>
    ))
  }

  const variantOptions = () => {
    let _options = { ...options }
    product.variant.forEach(v => {
      if (v.size) {
        if (!_options['Size'][v.size.name]) {
          _options['Size'][v.size.name] = {
            helpText: v.size.helpText,
            colors: {},
            sold: false,
          }
        }
        if (v.color) {
          _options['Size'][v.size.name]['helpText'] = v.size.helpText || ''
          _options['Size'][v.size.name]['colors'][v.color.name] =
            v.availableForSale
        }
      }
      if (v.color) {
        const colorCode = v.color.colorCode
          ? v.color.colorCode.hex
          : v.color.colorImage
          ? v.color.colorImage.url
          : null

        if (colorCode) {
          _options['Color'][v.color.name] = colorCode
        }
      }
    })

    Object.keys(_options['Size']).forEach(sizeCode => {
      const hasActiveColors = Object.values(
        _options['Size'][sizeCode]['colors']
      ).filter(x => x)
      if (hasActiveColors.length === 0) {
        _options['Size'][sizeCode].sold = true
      }
    })

    setOptions(_options)
  }

  const slideImage1 = index => {
    const ele = document.querySelectorAll('ul')[1].childNodes[0]
    if (index === 0) {
      ele.style.marginTop = '0px'
    } else if (productImages.length <= 3) {
      ele.style.marginTop = '0px'
    } else if (index + 2 > productImages.length && productImages.length > 3) {
      ele.style.marginTop = `${-107 * (productImages.length - 3)}%`
    } else {
      ele.style.marginTop = `${-107 * (index - 1)}%`
    }
  }

  useEffect(() => {
    if (productImages.length > 0) {
      setMainImage(productImages[0].url)
    }
  }, [productImages])

  useEffect(() => {
    const pId = encode(`gid://shopify/Product/${product.shopifyId}`)
    if (shopifyClient && shopifyClient.product) {
      shopifyClient.product.fetch(pId).then(fetchedProduct => {
        if (fetchedProduct) {
          product.variant.forEach(v => {
            const result = fetchedProduct.variants.filter(
              fv => fv.sku === v.sku
            )
            if (result.length > 0) {
              v.availableForSale = result[0].available
            }
          })
          variantOptions()
        }
      })
    }
  }, [shopifyClient, product])

  return (
    <Container>
      <LetterBox>
        <TypeButton>
          <Letter
            font="Titillium Bold"
            size={18}
            sizeLaptop={14}
            sizeLaptopL={18}
            sizeDesktop={18}
            sizeMobileS={14}
            color="white"
          >
            {offerTitle}
          </Letter>
        </TypeButton>
        <Letter
          font="Titillium Bold"
          sizeDesktop={42}
          sizeLaptopL={36}
          sizeLaptop={25}
          sizeMobileS={22}
          sizeMobileM={26}
          sizeMobileL={26}
          color="#202122"
        >
          {offerHighlight}
        </Letter>
        <div>
          <Letter
            font="Titillium Light"
            sizeDesktop={26}
            sizeLaptopL={22}
            sizeLaptop={18}
            sizeMobileS={16}
            sizeMobileM={20}
            sizeMobileL={20}
            color="#202122"
          >
            {offerMessage}
          </Letter>
        </div>
      </LetterBox>
      <ProductContainer>
        <Slider1>{PrevImagesRender()}</Slider1>
        <SliderContainer>
          <Carousel title="Carousel">
            {productImages.length > 0 &&
              productImages.map((item, index) => {
                return (
                  <Item key={index + 'item'}>
                    <Img fluid={item.fluid} />
                  </Item>
                )
              })}
          </Carousel>
        </SliderContainer>
        {productImages.length > 0 && (
          <MainImage>{mainImage && <Img fluid={mainImage.fluid} />}</MainImage>
        )}
        <Description>
          <MobileContain>
            {Object.keys(options['Color']).length > 0 && (
              <ColorContainer isVertical={true}>
                {Object.keys(options['Color']).length > 0 &&
                  Object.keys(options['Color']).map((color, index) => {
                    return options['Color'][color] ? (
                      <Circle
                        key={index}
                        height={24}
                        width={24}
                        color={options['Color'][color]}
                      />
                    ) : null
                  })}
              </ColorContainer>
            )}
          </MobileContain>
          <LetterContainer>
            <TypeButton>
              <Letter font="Titillium Bold" size={18} color="white">
                {offerTitle}
              </Letter>
            </TypeButton>
            <Letter
              font="Titillium Bold"
              sizeDesktop={42}
              sizeLaptopL={36}
              sizeLaptop={25}
              color="#202122"
            >
              {offerHighlight}
            </Letter>
            <div>
              <Letter
                font="Titillium Light"
                sizeDesktop={26}
                sizeLaptopL={22}
                sizeLaptop={18}
                color="#202122"
              >
                {offerMessage}
              </Letter>
            </div>
          </LetterContainer>
          <Prices>
            <Letter
              font="Titillium Bold"
              sizeDesktop={30}
              sizeLaptopL={25}
              sizeLaptop={18}
              sizeMobileS={16}
              sizeMobileM={18}
              sizeMobileL={18}
              color="#202122"
            >
              {localeSetting.CURRENCY_SYMBOL}
              <Letter
                font="Titillium Bold"
                sizeDesktop={42}
                sizeLaptopL={36}
                sizeLaptop={25}
                sizeMobileS={23}
                sizeMobileM={26}
                sizeMobileL={26}
                color="#202122"
              >
                {price}
              </Letter>
            </Letter>
            &nbsp; &nbsp;
            {showCompareAtPrice ? (
              <Del>
                <Letter
                  font="Titillium Web"
                  sizeDesktop={28}
                  sizeLaptopL={24}
                  sizeLaptop={21}
                  sizeMobileS={16}
                  sizeMobileM={18}
                  sizeMobileL={18}
                >
                  {' '}
                  {localeSetting.CURRENCY_SYMBOL}
                  {compareAtPrice.toFixed(2)}
                </Letter>
              </Del>
            ) : (
              ''
            )}
          </Prices>
          <SaveLetter>
            <Letter
              color="#FF8C00"
              sizeDesktop={22}
              sizeLaptopL={19}
              sizeLaptop={16}
              sizeMobileS={16}
              sizeMobileM={18}
              sizeMobileL={18}
              font="Titillium Bold"
            >
              {showCompareAtPrice && (
                <span>
                  Save {` `}
                  {localeSetting.CURRENCY_SYMBOL}
                  {(compareAtPrice - price).toFixed(2)}
                </span>
              )}
              {showCompareAtPrice && hasFreeShippingOffer && <span> + </span>}
              {hasFreeShippingOffer && <span>Free Shipping</span>}
            </Letter>
          </SaveLetter>
          <ProductName>
            <Letter
              font="Titillium Bold"
              sizeDesktop={42}
              sizeLaptopL={36}
              sizeLaptop={25}
              sizeMobileS={23}
              sizeMobileL={26}
              sizeMobileM={26}
              color="#202122"
            >
              {product.name}
            </Letter>
          </ProductName>
          <StarContainerDesktop>
            <ProductRating product={product} />
          </StarContainerDesktop>
          <TipLetter>
            <ClaimButton onClick={() => setModal(true)}>
              <Letter
                font="Titillium Bold"
                sizeDesktop={20}
                sizeLaptopL={17}
                sizeLaptop={14}
                color="white"
              >
                {buttonText}
              </Letter>
            </ClaimButton>
            <Shadow />
          </TipLetter>
        </Description>
      </ProductContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background: white;
  position: relative;
  padding-top: 200px;
  @media ${device.mobileS} {
    padding-top: 50px;
  }
  @media ${device.laptop} {
    padding-top: 120px;
  }
  @media ${device.laptopL} {
    padding-top: 200px;
  }
`

const LetterContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptop} {
    display: block;
  }
`
const LetterBox = styled.div`
  @media ${device.mobileS} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
  }
  @media ${device.tablet} {
    & div {
      margin-left: 10%;
      margin-right: 10%;
    }
  }
  @media ${device.laptop} {
    display: none;
    & div {
      margin-left: unset;
      margin-right: unset;
    }
  }
`

const ProductContainer = styled.div`
  display: flex;
  overflow: hidden;
  @media ${device.mobileS} {
    display: block;
  }
  @media ${device.laptop} {
    display: flex;
    overflow: unset;
  }
`

const PrevImages = styled.div`
  width: 182px;
  display: flex;
  flex-direction: column;
  margin-left: 10.7%;
  & img {
    width: 182px;
    margin-bottom: 9px;
  }
  @media ${device.laptop} {
    width: 115px;
    & img {
      width: 115px;
    }
  }
  @media ${device.laptopL} {
    width: 140px;
    & img {
      width: 140px;
    }
  }
  @media ${device.desktop} {
    width: 182px;
    & img {
      width: 182px;
    }
  }
`

const MainImage = styled.div`
  width: 42%;
  margin-left: 29px;
  margin-top: -80px;
  z-index: 1;
  & img {
    width: 100%;
  }
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptop} {
    display: block;
    margin-bottom: 80px;
    margin-top: -21px;
  }
  @media ${device.laptopL} {
    margin-top: -80px;
  }
`

const Del = styled.del`
  & {
    color: #a9acaf;
    text-decoration: none;
    position: relative;
    font-family: Titillium Web;
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
  @media ${device.laptop} {
    &:before {
      bottom: 4px;
    }
  }
  @media ${device.laptopL} {
    &:before {
      bottom: 7px;
    }
  }
  @media ${device.desktop} {
    &:before {
      bottom: 7px;
    }
  }
`

const Prices = styled.div`
  margin-top: 90px;
  @media ${device.mobileS} {
    margin-top: 30px;
  }
  @media ${device.mobileM} {
    margin-top: 38px;
  }
  @media ${device.mobileL} {
    margin-top: 50px;
  }
  @media ${device.laptop} {
    margin-top: 50px;
  }
  @media ${device.desktop} {
    margin-top: 90px;
  }
`

const Description = styled.div`
  margin-left: 40px;
  position: relative;
  @media ${device.laptop} {
    width: 30%;
    margin-bottom: 30px;
  }
`

const SaveLetter = styled.div``

const ProductName = styled.div`
  margin-top: 9px;
  @media ${device.mobileS} {
    width: 80%;
    line-height: 1.2;
  }
  @media ${device.laptop} {
    width: unset;
    line-height: unset;
  }
`

const StarContainerDesktop = styled.div`
  & {
    color: #ffc400;
  }
  & span {
    margin-top: 5px !important;
  }
  @media ${device.laptop} {
    display: flex;
    color: #ffc400;
    font-size: 13px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 20px;
  }
`

const TipLetter = styled.div`
  position: relative;
  margin-top: 40px;
  @media ${device.mobileS} {
    margin-bottom: 80px;
  }
  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    right: 30px;
  }
  @media ${device.laptop} {
    display: block;
    justify-content: unset;
    right: unset;
    margin-bottom: 0px;
  }
`

const ClaimButton = styled.button`
  position: absolute;
  height: 86px;
  background: #ff8c00;
  width: 73.6%;
  z-index: 2;
  border: 2px solid #202122;
  @media ${device.mobileS} {
    height: 68px;
    width: 84%;
  }
  @media ${device.mobileM} {
    height: 76px;
  }
  @media ${device.mobileL} {
    height: 76px;
  }
  @media ${device.tablet} {
    width: 56.6%;
  }
  @media ${device.laptop} {
    height: 55px;
    width: 73.6%;
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

const Shadow = styled.div`
  height: 86px;
  background: white;
  width: 73.6%;
  border: 2px solid #202122;
  transform: translate(7px, 7px);
  @media ${device.mobileS} {
    height: 68px;
    width: 84%;
  }
  @media ${device.mobileM} {
    height: 76px;
  }
  @media ${device.mobileL} {
    height: 76px;
  }
  @media ${device.tablet} {
    width: 56.6%;
  }
  @media ${device.laptop} {
    height: 55px;
    width: 73.6%;
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

const TypeButton = styled.div`
  height: auto;
  width: fit-content;
  padding: 5px 10px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: #ff8c00;
  letter-spacing: 2px;
  @media ${device.mobileS} {
    margin-bottom: 10px;
    margin-left: 10%;
    margin-right: 10%;
  }
  @media ${device.laptop} {
    margin-bottom: unset;
    margin-left: unset;
    margin-right: unset;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
    margin-bottom: 16px;
  }
`

const Slider1 = styled.ul`
  display: none;
  @media ${device.laptop} {
    padding: 0px;
    width: 140px;
    margin-left: 5.7%;
    display: none;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    max-height: 680px;
    overflow: hidden;
    & div {
      -webkit-transition: all 500ms ease-in;
      -moz-transition: all 500ms ease-in;
      -o-transition: all 500ms ease-in;
      transition: all 500ms ease-in;
      width: 140px;
    }
    display: none;
  }
  @media ${device.laptop} {
    max-height: 390px;
    width: 130px;
    height: 390px;
    margin-left: 5.7%;
    display: flex;
    & div {
      width: 105px;
    }
    margin-top: -16px;
  }
  @media ${device.laptopL} {
    max-height: 450px;
    width: 140px;
    height: 450px;
    display: flex;
    & div {
      width: 140px;
    }
    margin-top: 0px;
  }
  @media ${device.desktop} {
    max-height: 570px;
    width: 180px;
    height: 570px;
    display: flex;
    margin-top: 0px;
    & div {
      width: 180px;
    }
  }
`

const PrevContainer1 = styled.div`
  width: 100%;
  display: inline-block;
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    margin-bottom: 7%;
    opacity: ${props => props.opacity};
  }
  @media ${device.latopL} {
  }
`

const SliderContainer = styled.div`
  width: 100%;
  padding: 0px 0px 10px 0px;
  position: relative;
  height: calc(96vw);
  & > div {
    width: 100%;
    height: 100%;
    & > div:first-child {
      & > div {
        padding: 20px;
        & > div {
          width: 100%;
          height: 100%;
        }
      }
    }
    & > div:nth-child(2) {
      bottom: -5px;
      & span {
        width: 25px;
        height: 4px;
        background: rgb(174 174 183);
        margin: 0px 5px 0px 0px !important;
        border-radius: 0%;
      }
      & .swiper-pagination-bullet-active {
        background-color: black;
      }
    }
  }
  @media ${device.laptop} {
    display: none;
  }
`

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${props =>
    props.isVertical
      ? `
    position: absolute;
    flex-direction: column;
    top: 13px;
    right: 16px;
    `
      : `
    `}
`

const Item = styled.div`
  text-align: center;
  background-size: cover;
  width: 100%;
  & img {
    object-fit: contain;
    width: 100%;
    opacity: 1 !important;
  }
`

export default NextPreview
