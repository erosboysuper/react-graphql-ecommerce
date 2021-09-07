import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { encode } from 'js-base64'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import { Letter, Space, MobileContain, DesktopContain } from '~/utils/styles'
import { darkFont, btn_color, gray_back } from '~/utils/colors'
import { device } from '~/utils/device'

import OrderImg from '~/images/Assets/Quick-pre-order-big.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

import SizeSelect from '~/components/pages/products/SizeSelect'
import ColorSelect from '~/components/pages/products/ColorSelect'

const ModalSelect = ({ product, media, display, isProductPage = false }) => {
  const [btnText, setBtnText] = useState('Select size to choose color')
  const [options, setOptions] = useState({ Size: {}, Color: {} })
  const [isSold, setIsSold] = useState(!product.availableForSale)
  const {
    size,
    color,
    setSizeChart,
    cart,
    setCart,
    variant,
    setSize,
    setColor,
    setSizeColor,
  } = useContext(ProductContext)
  const {
    localeFolder,
    addCartItems,
    setCartModal,
    store: { shopifyClient },
    localeSetting,
  } = useContext(StoreContext)
  let showCompareAtPrice = false

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

  const addToCart = () => {
    setCart(cart + 1)
    variant.product_shopify_id = product.shopifyId
    variant.product_name = product.name
    variant.product_handle = product.handle
    variant.isSingleProduct = product.isSingleProduct
    addCartItems([variant])

    if (display) {
      display(false)
    }
    setCartModal(true)
  }

  const checkCompareAtPrice = () => {
    showCompareAtPrice =
      !product.isTboCommunity &&
      product.variant &&
      product.variant.length > 0 &&
      (variant.id
        ? variant.compareAtPrice && variant.compareAtPrice - variant.price > 0
        : product.variant[0].compareAtPrice &&
          product.variant[0].compareAtPrice - product.variant[0].price > 0)
  }
  checkCompareAtPrice()
  useEffect(() => {
    checkCompareAtPrice()
  }, [variant])

  useEffect(() => {
    // LIVE DATA FROM SHOPIFY FOR INDIVIDUAL PRODUCT //
    const pId = encode(`gid://shopify/Product/${product.shopifyId}`)
    if (shopifyClient && shopifyClient.product) {
      shopifyClient.product.fetch(pId).then(fetchedProduct => {
        if (fetchedProduct) {
          product.availableForSale = fetchedProduct.availableForSale
          setIsSold(!product.availableForSale)
          product.variant.forEach(v => {
            const result = fetchedProduct.variants.filter(
              fv => fv.sku === v.sku
            )
            if (result.length > 0) {
              v.availableForSale = result[0].available
            }
          })
          variantOptions()
        } else {
          setBtnText('Not available yet')
        }
      })
    }

    return () => {
      setSize('')
      setColor('')
      setSizeColor({})
    }
  }, [shopifyClient])

  return (
    <React.Fragment>
      <Space height={20} />
      <DesktopContain>
        <Space height={70} />
      </DesktopContain>
      <Container>
        <ImgContainer>
          {media && media.length > 0 && (
            <Img key={media[0].url} fluid={media[0].fluid} />
          )}
        </ImgContainer>
        <ContainerDetail>
          {product.variant && product.variant.length > 0 && (
            <div>
              {showCompareAtPrice && (
                <SaveLetter>
                  <Letter
                    font="Titillium Bold"
                    size={14}
                    sizeTablet={16}
                    sizeLaptopL={16}
                    sizeLaptop={14}
                    sizeDesktop={18}
                    color="#FF8C00"
                  >
                    Save {localeSetting.CURRENCY_SYMBOL}
                    {(variant.id
                      ? variant.compareAtPrice - variant.price
                      : product.variant[0].compareAtPrice -
                        product.variant[0].price
                    ).toFixed(2)}
                  </Letter>
                </SaveLetter>
              )}
              <LetterContainer>
                <PriceLetter>
                  <Letter
                    font="Titillium Bold"
                    size={14}
                    sizeTablet={16}
                    sizeLaptop={14}
                    sizeLaptopL={16}
                    sizeDesktop={18}
                    color={darkFont}
                  >
                    {localeSetting.CURRENCY_SYMBOL}
                  </Letter>
                  <Letter
                    font="Titillium Bold"
                    size={20}
                    sizeTablet={22}
                    sizeLaptop={20}
                    sizeLaptopL={22}
                    sizeDesktop={24}
                    color={darkFont}
                  >
                    {variant.id ? variant.price : product.variant[0].price}
                  </Letter>
                  &nbsp;&nbsp;
                </PriceLetter>
                {showCompareAtPrice && (
                  <Del>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeTablet={22}
                      sizeLaptop={14}
                      sizeLaptopL={16}
                      sizeDesktop={18}
                      color="#A9ACAF"
                    >
                      {localeSetting.CURRENCY_SYMBOL}
                      {(variant.id
                        ? variant.compareAtPrice
                        : product.variant[0].compareAtPrice
                      ).toFixed(2)}
                    </Letter>
                  </Del>
                )}
              </LetterContainer>
            </div>
          )}
          <Title>
            <span>{product.name}</span>{' '}
          </Title>
          <Space height={10} />
          <MobileContain>
            {Object.keys(options['Color']).length > 0 && (
              <ColorContainer>
                <ColorSelect
                  colors={options['Color']}
                  showBorder={true}
                  modal={true}
                />
              </ColorContainer>
            )}
          </MobileContain>
          {!isProductPage && (
            <ProductLink>
              <Link to={`/${localeFolder}/${product.handle}/`}>
                <Letter
                  size={14}
                  sizeTablet={16}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  font="Titillium Web"
                  color={btn_color}
                >
                  See product details. &nbsp;
                </Letter>
                <img src={ArrowImg} alt="ArrowImg" />
              </Link>
            </ProductLink>
          )}
        </ContainerDetail>
      </Container>
      {options['Size'] && Object.keys(options['Size']).length > 0 && (
        <SizeContainer>
          <LetterBox>
            <Letter
              font="Titillium Bold"
              size={22}
              sizeTablet={26}
              sizeLaptop={16}
              sizeLaptopL={19}
              sizeDesktop={22}
              color={darkFont}
            >
              Size
            </Letter>
          </LetterBox>
          <Space height={10} />
          <SizeSelect sizes={options['Size']} modal={true} />
        </SizeContainer>
      )}
      <DesktopContainer>
        <Space height={30} />
        <Letter
          font="Titillium Bold"
          size={22}
          sizeDesktop={22}
          sizeLaptop={16}
          sizeLaptopL={19}
          color={darkFont}
        >
          More Colors
        </Letter>
        <Space height={10} />
        <ColorContain>
          {Object.keys(options['Color']).length > 0 && (
            <ColorContainer>
              <ColorSelect
                colors={options['Color']}
                widthDesktop={60}
                heightDesktop={60}
                showBorder={true}
                modal={true}
              />
            </ColorContainer>
          )}
        </ColorContain>
      </DesktopContainer>
      {product.sizeChart && (
        <SubTitle>
          <SizeCheck>
            <Letter
              font="Titillium Web"
              color="#FF8C00"
              size={14}
              onClick={() => setSizeChart(true)}
            >
              What's my size? &nbsp; <img src={ArrowImg} alt="arrow" />
            </Letter>
          </SizeCheck>
        </SubTitle>
      )}
      {/* STEP 2: SHOW ADD TO CART BUTTON, WHEN SIZE & COLOR SELECTED ON QUICK POPUP */}
      {size !== '' && color !== '' && (
        <AddCart
          onClick={() => addToCart()}
          mouseCursor={true}
          className="add-to-cart"
        >
          <Letter
            font="Titillium Bold"
            size={16}
            color="white"
            className="add-to-cart"
          >
            ADD TO CART
          </Letter>
          &nbsp; &nbsp;
          {showCompareAtPrice && (
            <Letter font="Titillium Light" size={14} color="white">
              /SAVE {localeSetting.CURRENCY_SYMBOL}
              {(variant.id
                ? variant.compareAtPrice - variant.price
                : product.variant[0].compareAtPrice - product.variant[0].price
              ).toFixed(2)}
            </Letter>
          )}
          <MobileContain>
            <img src={OrderImg} alt="OrderImg" />
          </MobileContain>
        </AddCart>
      )}
      {size === '' && (
        <AddCart color={gray_back}>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeTablet={20}
            sizeLaptop={16}
            color="#202122"
          >
            {btnText}
          </Letter>
        </AddCart>
      )}
    </React.Fragment>
  )
}

const ImgContainer = styled.div`
  width: 88px;
  height: 88px;
  margin: 0px 15px 0px 15px;
  @media ${device.tablet} {
    margin-left: 5%;
    width: 110px;
    height: 110px;
  }
  @media ${device.laptop} {
    width: 130px;
    height: 130px;
    margin-left: 0px;
  }
  @media ${device.laptopL} {
    width: 180px;
    height: 180px;
    margin-left: 0px;
  }
`

const LetterContainer = styled.div`
  margin-top: 5px;
  margin-left: 3px;
`

const Del = styled.del`
  & {
    color: #a9acaf;
    text-decoration: none;
    position: relative;
    margin-top: 5px;
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

const PriceLetter = styled.span`
  margin-top: 5px;
`

const Title = styled.div`
  font-family: Titillium Bold;
  font-size: 24px;
  color: ${darkFont};
  margin-top: -3px;
  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 27px;
  }
  @media ${device.desktop} {
    font-size: 34px;
  }
`

const SubTitle = styled.div``

const SizeCheck = styled.div`
  float: right;
  margin-right: 20px;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  @media ${device.laptop} {
    position: relative;
    margin-left: 7%;
    margin-right: 20%;
    padding-bottom: 30px;
  }
`

const ContainerDetail = styled.div`
  margin-left: 10px;
  width: 70%;
`

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -5%;
`

const AddCart = styled.div`
  & {
    position: absolute;
    bottom: 0px;
    height: 83px;
    width: 100%;
    background: #ff8c00;
    background: ${props => (props.color ? props.color : '#ff8c00')};
    cursor: ${props => (props.mouseCursor ? 'pointer' : 'unset')};
    padding: 30px 0px;
    text-align: center;
  }
  & span {
    letter-spacing: 1px;
    color: ${props => (props.color ? '#202122' : 'white')};
  }

  & img {
    width: 33px;
    position: absolute;
    right: 20px;
    top: 26px;
  }
  @media ${device.laptop} {
    & {
      position: relative;
      margin-left: 7%;
      width: 70%;
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
    }
  }
  @media ${device.laptopL} {
    height: 70px;
    margin-top: 50px;
  }
  @media ${device.desktop} {
    height: 83px;
    margin-top: 70px;
  }
`

const SaveLetter = styled.div`
  margin-left: 3px;
  margin-bottom: -6px;
  margin-top: -7px;
`

const ProductLink = styled.div`
  text-align: end;
  padding-right: 16px;
  margin-bottom: 25px;
  & img {
    width: 14px;
  }
  @media ${device.laptop} {
    position: absolute;
    bottom: -20px;
    right: 0px;
    display: flex;
    align-items: center;
    & img {
      width: 17px;
    }
  }
  @media ${device.laptopL} {
    bottom: -5px;
  }
`
const SizeContainer = styled.div`
  @media ${device.tablet} {
  }
  @media ${device.laptop} {
    padding-left: 7%;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    & span {
      padding-left: 7%;
    }
  }
`

const ColorContain = styled.div`
  @media ${device.laptop} {
    margin-left: 5%;
    padding-left: 7%;
  }
`

const LetterBox = styled.div`
  padding-left: 16px;
  @media ${device.tablet} {
    padding-left: 5%;
  }
  @media ${device.laptop} {
    padding-left: 0px;
  }
`

export default ModalSelect
