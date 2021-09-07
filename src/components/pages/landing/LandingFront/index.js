import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { encode } from 'js-base64'

import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'
import { Letter, MobileContain } from '~/utils/styles'

import Circle from '~/components/Common/Circle'
import Carousel from '~/components/Common/ImageSlider'
import ProductRating from '~/components/Common/ProductRating'

import 'swiper/css/swiper.css'

const LandingFront = ({
  pageLogo,
  productImages = [],
  product,
  price,
  compareAtPrice,
  offerTitle,
  offerHighlight,
  productHighlightTitle,
  productHighlights,
  buttonText,
  hasFreeShippingOffer,
}) => {
  const { setModal, localeSetting } = useContext(StoreContext)
  const {
    store: { shopifyClient },
  } = useContext(StoreContext)
  const [mainImage, setMainImage] = useState(
    productImages.length > 0 ? productImages[0] : null
  )
  const [options, setOptions] = useState({ Size: {}, Color: {} })

  const showCompareAtPrice = compareAtPrice > price

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
        <Img fluid={item.smallImage} />
      </PrevContainer1>
    ))
  }

  const slideImage1 = index => {
    const ele = document.querySelectorAll('ul')[0].childNodes[0]
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

  useEffect(() => {
    if (productImages.length > 0) {
      setMainImage(productImages[0])
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
      {pageLogo && (
        <LogoDiv>
          <Img fluid={pageLogo.fluid} />
        </LogoDiv>
      )}
      <Background>
        <MobileContainer>
          <TitleBox>
            <div>
              <Letter
                font="Titillium Bold"
                sizeDesktop={28}
                sizeLaptopL={20}
                sizeLaptop={16}
                sizeMobileL={18}
                sizeMobileM={18}
                sizeMobileS={16}
                color="#FF8C00"
              >
                {offerTitle}
              </Letter>
            </div>
            <Letter
              font="Titillium Black"
              sizeDesktop={40}
              sizeLaptopL={30}
              sizeLaptop={24}
              sizeMobileL={26}
              sizeMobileM={26}
              sizeMobileS={21}
              color="#202122"
            >
              {offerHighlight}
            </Letter>
          </TitleBox>
        </MobileContainer>
        <DesktopContainer />
      </Background>
      <ProductContainer length={productHighlights.length}>
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
        <MainImage>{mainImage && <Img fluid={mainImage.fluid} />}</MainImage>
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
            <div>
              <Letter
                font="Titillium Bold"
                sizeDesktop={28}
                sizeLaptopL={20}
                sizeLaptop={16}
                size={18}
                color="#FF8C00"
              >
                {offerTitle}
              </Letter>
            </div>
            <Letter
              font="Titillium Black"
              sizeDesktop={40}
              sizeLaptopL={30}
              sizeLaptop={24}
              size={26}
              color="#202122"
            >
              {offerHighlight}
            </Letter>
          </LetterContainer>
          <Prices>
            <Letter
              font="Titillium Bold"
              sizeDesktop={27}
              sizeLaptopL={23}
              sizeLaptop={19}
              sizeMobileS={16}
              sizeMobileL={18}
              sizeMobileM={18}
              color="#202122"
            >
              {localeSetting.CURRENCY_SYMBOL}
              <Letter
                font="Titillium Bold"
                sizeDesktop={39}
                sizeLaptopL={34}
                sizeLaptop={27}
                sizeMobileS={23}
                sizeMobileL={26}
                sizeMobileM={26}
                color="#202122"
              >
                {price}
              </Letter>
            </Letter>
            &nbsp; &nbsp;
            {showCompareAtPrice && (
              <Del>
                <Letter
                  font="Titillium Web"
                  sizeDesktop={28}
                  sizeLaptopL={24}
                  sizeLaptop={20}
                  sizeMobileS={16}
                  sizeMobileL={18}
                  sizeMobileM={18}
                >
                  {' '}
                  {localeSetting.CURRENCY_SYMBOL}
                  {compareAtPrice}
                </Letter>
              </Del>
            )}
          </Prices>
          <SaveLetter>
            <Letter
              color="#FF8C00"
              sizeDesktop={20}
              sizeLaptopL={17}
              sizeLaptop={14}
              sizeMobileS={16}
              sizeMobileL={18}
              sizeMobileM={18}
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
              sizeDesktop={39}
              sizeLaptopL={34}
              sizeLaptop={28}
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
            <Title>
              <Letter
                font="Titillium Black"
                sizeDesktop={31}
                sizeLaptopL={27}
                sizeLaptop={21}
                sizeMobileS={23}
                sizeMobileL={26}
                sizeMobileM={26}
                color="#202122"
              >
                {productHighlightTitle}
              </Letter>
            </Title>
            {productHighlights && productHighlights.length > 0
              ? productHighlights.map(highlight => (
                  <SubContent key={highlight.id}>
                    <Letter
                      font="Titillium Light"
                      sizeDesktop={23}
                      sizeLaptopL={22}
                      sizeLaptop={15}
                      sizeMobileS={16}
                      sizeMobileL={18}
                      sizeMobileM={18}
                      color="#202122"
                    >
                      - {highlight.title}
                    </Letter>
                  </SubContent>
                ))
              : null}

            <ClaimButton onClick={() => setModal(true)}>
              <Letter
                font="Titillium Bold"
                sizeDesktop={18}
                sizeLaptopL={15}
                sizeLaptop={13}
                sizeMobileS={14}
                sizeMobileM={16}
                sizeMobileL={16}
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
`

const LogoDiv = styled.div`
  width: 15.6%;
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translate(-50%, 0px);
  z-index: 10;
  @media ${device.mobileS} {
    width: 40%;
    top: 24px;
  }
  @media ${device.tablet} {
    top: 14px;
    width: 30%;
  }
  @media ${device.laptop} {
    width: 15.6%;
    top: 50px;
    z-index: 2;
  }
  @media ${device.laptopL} {
    top: 50px;
  }
  @media ${device.desktop} {
    top: 72px;
  }
`

const Background = styled.div`
  position: relative;
  & img {
    width: 100%;
  }
  @media ${device.laptopL} {
    & img {
      transform: scale(1, 0.8) translate(0px, -12%);
    }
  }
  @media ${device.desktop} {
    & img {
      transform: scale(1, 0.8) translate(0px, -12%);
    }
  }
`
const LetterContainer = styled.div`
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptop} {
    display: block;
    margin-bottom: 19px;
    margin-top: -13px;
  }
  @media ${device.laptopL} {
    margin-bottom: 42px;
    margin-top: -40px;
  }
  @media ${device.desktop} {
    margin-bottom: 23px;
    margin-top: -51px;
  }
`
const ProductContainer = styled.div`
  display: flex;
  padding-top: 25px;

  @media ${device.mobileS} {
    display: block;
    overflow: hidden;
    margin-top: -45px;
  }
  @media ${device.mobileM} {
    margin-top: -60px;
  }
  @media ${device.mobileL} {
    margin-top: -65px;
  }
  @media ${device.tablet} {
    margin-top: -162px;
  }
  @media ${device.laptop} {
    margin-top: unset;
    display: flex;
    overflow: unset;
  }
  @media ${device.laptopL} {
    margin-bottom: ${props => -92 + (props.length - 3) * 25}px;
  }
  @media ${device.desktop} {
    margin-bottom: unset;
  }
`

const MainImage = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 38%;
    margin-left: 29px;
    margin-top: -40px;
    transform: translate(0px, -10%);
    z-index: 3;
    & img {
      width: 100%;
    }
  }
  @media ${device.laptopL} {
    width: 33%;
    margin-left: 7%;
    margin-top: 0px;
    transform: translate(0px, -28%);
    z-index: 3;
    width: 33%;
    margin-left: 7%;
    margin-top: 0px;
    transform: translate(0px, -28%);
    z-index: 3;
    & img {
      width: 100%;
    }
  }
  @media ${device.desktop} {
    margin-top: -160px;
    transform: unset;
    width: 33%;
    margin-left: 7%;
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

const Prices = styled.div``

const Description = styled.div`
  margin-left: 29px;
  margin-top: -10px;
  z-index: 2;
  position: relative;
  @media ${device.mobileS} {
    margin-top: 30px;
    margin-left 16px;
    margin-right: 16px;
  }
  @media ${device.mobileM} {
    margin-top: 35px;
  }
  @media ${device.mobileL} {
    margin-top: 51px;
  }
  @media ${device.laptop} {
    margin-top: -68px;
    margin-left: 4.5%;
    margin-right: unset;
    width: 31%;
  }
  @media ${device.desktop} {
    margin-left: 5%;
    margin-top: -90px;
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
    display: flex;
    color: #ffc400;
    font-size: 13px;
  }
  & span {
    margin-top: 5px !important;
  }
  @media ${device.laptop} {
    display: flex;

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
  @media ${device.mobileS} {
    text-align: center;
    border: 2px solid black;
    margin-top: 54px;
    padding-bottom: 68px;
    position: relative;
    margin-bottom: 50px;
    min-height: 265px;
  }
  @media ${device.laptop} {
    border: 2px solid black;
    margin: -30px;
    padding: 15px;
    margin-top: 25px;
    margin-left: -80px;
    padding-left: 80px;
    margin-right: 10px;
    padding-right: 10px;
    padding-bottom: 35px;
    position: relative;
    text-align: unset;
    min-height: 237px;
  }
  @media ${device.laptopL} {
    border: 2px solid black;
    margin: -30px;
    padding: 10px;
    margin-top: 15px;
    margin-left: -110px;
    padding-left: 110px;
    margin-right: -40px;
    padding-right: 40px;
    padding-bottom: 37px;
    position: relative;
  }
  @media ${device.desktop} {
    margin-top: 20px;
    padding-bottom: 60px;
    position: relative;
  }
  @media ${device.desktop} {
    margin-top: 30px;
    padding-bottom: 37px;
    position: relative;
  }
  @media ${device.desktop} {
    margin-top: 20px;
    padding: 15px;
    margin-left: -140px;
    padding-left: 140px;
    margin-right: -60px;
    padding-right: 60px;
    padding-bottom: 50px;
  }
`

const SubContent = styled.div``

const Title = styled.div`
  @media ${device.mobileS} {
    display: flex;
    width: 70%;
    margin-left: 15%;
    margin-top: 24px;
    line-height: 1.1;
    margin-bottom: 5px;
    justify-content: center;
  }
  @media ${device.laptop} {
    display: block;
    width: unset;
    margin-left: unset;
    line-height: unset;
    margin-bottom: unset;
    margin-top: unset;
  }
`

const ClaimButton = styled.button`
  position: absolute;
  bottom: -0px;
  height: 86px;
  background: #ff8c00;
  width: 56.6%;
  left: 50%;
  transform: translate(-50%, 50%);
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
    width: 84%;
  }
  @media ${device.laptop} {
    height: 55px;
    width: 56.6%;
  }
  @media ${device.laptopL} {
    height: 62px;
  }
  @media ${device.desktop} {
    height: 75px;
  }
`
const Shadow = styled.div`
  position: absolute;
  bottom: -7px;
  height: 86px;
  background: white;
  border: 2px solid #202122;
  width: 56.6%;
  left: 50%;
  transform: translate(-47.5%, 50%);
  @media ${device.mobileS} {
    width: 84%;
    height: 68px;
  }
  @media ${device.mobileM} {
    height: 76px;
  }
  @media ${device.mobileL} {
    height: 76px;
  }
  @media ${device.tablet} {
    transform: translate(-48.5%, 50%);
    width: 83.6%;
  }
  @media ${device.laptop} {
    width: 56.6%;
    height: 55px;
    transform: translate(-47%, 50%);
    bottom: -6px;
  }
  @media ${device.laptopL} {
    transform: translate(-48%, 50%);
    height: 62px;
    bottom: -7px;
  }
  @media ${device.desktop} {
    height: 75px;
    transform: translate(-47.5%, 51%);
  }
`

const Slider1 = styled.ul`
  display: none;
  @media ${device.laptop} {
    padding: 0px;
    margin-left: 10.7%;
    display: none;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    & div {
      -webkit-transition: all 500ms ease-in;
      -moz-transition: all 500ms ease-in;
      -o-transition: all 500ms ease-in;
      transition: all 500ms ease-in;
      width: 100px;
    }
    max-height: 315px;
    width: 100px;
    height: 350px;
    display: flex;
    & div {
      width: 100px;
    }
    margin-top: -16px;
  }

  @media ${device.laptopL} {
    max-height: 400px;
    width: 120px;
    height: 380px;
    display: flex;
    & div {
      width: 120px;
    }
    margin-top: -40px;
  }
  @media ${device.desktop} {
    max-height: 445px;
    width: 140px;
    height: 445px;
    display: flex;
    margin-top: -50px;
    & div {
      width: 140px;
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

const TitleBox = styled.div`
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translate(-50%, 0px);
  z-index: 3;
  width: 100%;
  text-align: center;
  @media ${device.mobileS} {
    top: 60px;
  }
  @media ${device.mobileM} {
    top: 66px;
  }
  @media ${device.mobileL} {
    top: 75px;
  }
  @media ${device.tablet} {
    top: 29%;
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
    top: 10px;
    right: 0;
    `
      : `
    `}
`

const MobileContainer = styled.div`
  display: block;
  height: 190px;
  overflow: hidden;
  background: linear-gradient(85deg, #f2f2f7 0%, #fdfdfd 100%) fixed no-repeat
    top right;
  clip-path: polygon(0 0, 100% 0vw, 100% 100%, 0 calc(100% - 3vw));
  @media ${device.mobileS} {
    height: 160px;
  }
  @media ${device.mobileM} {
    height: 180px;
  }
  @media ${device.mobileL} {
    height: 190px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const DesktopContainer = styled.div`
  display: ${props => (props.displayAll ? 'block' : 'none')};
  @media ${device.laptop} {
    display: block;
    height: 195px;
    overflow: hidden;
    background: linear-gradient(85deg, #f2f2f7 0%, #fdfdfd 100%) fixed no-repeat
      top right;
    clip-path: polygon(0 0, 100% 0vw, 100% 100%, 0 calc(100% - 3vw));
  }
  @media ${device.laptopL} {
    height: 218px;
  }
  @media ${device.desktop} {
    height: 291px;
  }
`

const Item = styled.div`
  text-align: center;
  background-size: cover;
  width: 100%;
  & img {
    object-fit: contain;
    width: 100%;
    opacity: 1 !important;
    -moz-opacity: 1 !important;
    -webkit-opacity: 1 !important;
  }
`

export default LandingFront
