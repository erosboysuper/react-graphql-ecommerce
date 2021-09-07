import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import ProductContext from '~/context/ProductContext'
import { Img, Cover } from '~/utils/styles'
import { btn_color, gray_color } from '~/utils/colors'
import { device } from '~/utils/device'
import { dateDiffInDays } from '~/utils/functions'

import backImg from '~/images/homepage/productBack.png'
import FadeImg from '~/images/Assets/FadingOut.svg'
import LimitedImg from '~/images/Assets/Limited-edition.svg'
import QuickCartImg from '~/images/Assets/Quick-to-cart-1row.svg'
import TboImg from '~/images/Assets/TboCommunity.svg'
import OrderImg from '~/images/Assets/Quick-pre-order.svg'

import Circle from '~/components/Common/Circle'
import QuickView from '~/components/pages/collection/QuickView'
import ProductRating from '~/components/Common/ProductRating'

const OfferProductShow = ({ product, vertical }) => {
  const { toggle, setModal, localeFolder, localeSetting } = useContext(
    StoreContext
  )
  const { limitedModalStep, setLimitedModalStep } = useContext(ProductContext)
  const [quickView, setQuickView] = useState(false)
  const [availableInDays, setAvailableInDays] = useState(null)

  let options = { Size: {}, Color: {} }
  product.variant.forEach(v => {
    if (v.size) {
      if (!options['Size'][v.size.name]) {
        options['Size'][v.size.name] = {}
      }
      if (v.color) {
        options['Size'][v.size.name][v.color.name] = v.availableForSale
      }
    }
    if (v.color) {
      if (!options['Color'][v.color.name]) {
        options['Color'][v.color.name] = {}
      }
      options['Color'][v.color.name] = v.color.colorCode
        ? v.color.colorCode.hex
        : v.color.colorImage
        ? v.color.colorImage.url
        : null
    }
  })

  const showCompareAtPrice =
    !product.isTboCommunity &&
    product.variant &&
    product.variant.length > 0 &&
    product.variant[0].compareAtPrice &&
    product.variant[0].compareAtPrice - product.variant[0].price > 0

  const isSold = !product.availableForSale

  const removeModal = () => {
    setQuickView(false)
    setModal(false)
  }

  useEffect(() => {
    if (product && product.isTboCommunity && product.availabilityDate) {
      let _availableInDays = dateDiffInDays(
        new Date(),
        new Date(product.availabilityDate)
      )
      if (_availableInDays < 1) {
        _availableInDays = null
      }
      setAvailableInDays(_availableInDays)
    }
  }, [product])

  return (
    <React.Fragment>
      <Parent>
        <Contain opacity={isSold ? 0.5 : 1}>
          <Background>
            <Image src={backImg} alt="backImg" />
          </Background>
          <Link to={`/${localeFolder}/${product.handle}/`}>
            <ProductImage>
              {product.media && product.media.length > 0 && (
                <Img fluid={product.media[0].fluid} />
              )}
            </ProductImage>
            <HiddenText>{product.name}</HiddenText>
          </Link>
          {!isSold && showCompareAtPrice && (
            <Save>
              <span>
                <SaveLetter>Save</SaveLetter>
                {` `}
                {localeSetting.CURRENCY_SYMBOL}
                {(
                  product.variant[0].compareAtPrice - product.variant[0].price
                ).toFixed(2)}
              </span>
            </Save>
          )}
        </Contain>
        <br />
        <Link to={`/${localeFolder}/${product.handle}/`}>
          <Contain>
            {isSold ? (
              <Label font="Titillium Bold" size={18} color={`#a9acaf`}>
                SOLD OUT
              </Label>
            ) : (
              <Label
                font="Titillium Bold"
                size={18}
                sizeTablet={21}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={26}
              >
                <Label
                  size={15}
                  sizeTablet={18}
                  sizeLaptop={14}
                  sizeLaptopL={17}
                  sizeDesktop={20}
                >
                  {localeSetting.CURRENCY_SYMBOL}
                </Label>
                {product.variant && product.variant.length > 0 && (
                  <span>{product.variant[0].price}</span>
                )}
                {showCompareAtPrice && product.variant[0].compareAtPrice && (
                  <Label
                    size={15}
                    sizeTablet={18}
                    sizeLaptop={16}
                    sizeLaptopL={18}
                    sizeDesktop={20}
                    color={gray_color}
                  >
                    {' '}
                    <Del>
                      <span className="amount">
                        {' '}
                        {localeSetting.CURRENCY_SYMBOL}
                        {product.variant[0].compareAtPrice.toFixed(2)}
                      </span>
                    </Del>
                  </Label>
                )}
              </Label>
            )}
            <br />
            {product.isTboCommunity ? (
              availableInDays ? (
                <div>
                  <Lable
                    size={12}
                    sizeTablet={15}
                    sizeLaptop={16}
                    sizeLaptopL={19}
                    sizeDesktop={22}
                    color={btn_color}
                  >
                    {availableInDays} days until shipping
                  </Lable>
                </div>
              ) : (
                ``
              )
            ) : (
              <div>
                <StarContainer>
                  <ProductRating product={product} />
                </StarContainer>
              </div>
            )}
            <H2>{product.name}</H2>
            {isSold ? (
              <Lable
                size={12}
                sizeTablet={15}
                sizeLaptop={18}
                sizeLaptopL={19}
                sizeDesktop={22}
                color={btn_color}
              >
                {' '}
                <br />
                When will it be back in stock?
              </Lable>
            ) : (
              <div>
                {Object.keys(options['Size']).length > 0 && (
                  <Label
                    size={13}
                    sizeTablet={16}
                    sizeLaptop={13}
                    sizeLaptopL={16}
                    sizeDesktop={20}
                    font="Titillium Web"
                    color="#a9acaf"
                  >
                    {Object.keys(options['Size']).map((size, index) => (
                      <span key={index}>
                        {size}
                        {Object.keys(options['Size']).length - 1 !== index && (
                          <span>&nbsp; &middot; &nbsp;</span>
                        )}
                      </span>
                    ))}
                  </Label>
                )}
                <Space height={5} />
                <ColorContainer isVertical={toggle && vertical}>
                  {Object.keys(options['Color']).length > 0 &&
                    Object.keys(options['Color']).map((color, index) => {
                      return options['Color'][color] ? (
                        <Circle
                          key={index}
                          height={toggle && vertical ? 25 : 18}
                          width={toggle && vertical ? 25 : 18}
                          color={options['Color'][color]}
                        />
                      ) : null
                    })}
                </ColorContainer>
              </div>
            )}
          </Contain>
        </Link>
        {quickView === true && (
          <React.Fragment>
            <Cover background={0.5} index={10} onClick={() => removeModal()} />
            <QuickView product={product} display={setQuickView} />
          </React.Fragment>
        )}
      </Parent>
      <SelectButton onClick={() => setLimitedModalStep(2)}>
        <Label
          font="Titillium Bold"
          sizeDesktop={25}
          sizeLaptop={20}
          sizeMobileS={16}
          color="white"
        >
          SELECT
        </Label>
      </SelectButton>
      <Shadow />
    </React.Fragment>
  )
}

const Space = styled.div`
  height: ${props => props.height}px;
  width: 100%;
`

const Parent = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  margin-bottom: 25px;
  padding-top: 20px;

  & a {
    color: #212529;
    text-decoration: none;
  }
  @media ${device.laptop} {
    padding-top: 20px;
    margin-bottom: 0px;
  }
`

const Contain = styled.div`
  width: 100%;
  height: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  opacity: ${props => props.opacity};
`

const Order = styled.div`
  display: flex;
  position: absolute;
  padding: 10px 13px;
  bottom: -5px;
  right: -5px;
  text-align: center;
  color: white;
  background-color: rgb(255, 140, 0);
  font-size: 13px;
  @media ${device.laptop} {
    padding: 9px 22px;
    bottom: -13px;
    align-items: center;
  }
  @media ${device.laptopL} {
    padding: 14px 22px;
    bottom: -13px;
  }
  @media ${device.desktop} {
    padding: 20px 22px;
  }
`

const Image1 = styled.img`
  width: 15px;
  margin-left: 12px;
  @media ${device.laptop} {
    width: 34px;
  }
  @media ${device.laptopL} {
    width: 39px;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media ${device.laptop} {
  }
`

const ProductImage = styled.div`
  position: absolute;
  width: 90%;
  height: 100px;
  top: 15%;
  left: 5%;
`

const TipImage = styled.div`
  position: absolute;
  top: -10px;
  right: 0%;
  @media ${device.mobileS} {
    & img {
      width: 90%;
    }
  }
  @media ${device.mobileM} {
    & img {
      width: 100%;
    }
  }
  @media ${device.laptop} {
    top: -11px;
    right: 17px;

    & img {
      width: 50px;
    }
  }
  @media ${device.laptopL} {
    top: -13px;
    right: 17px;
    & img {
      width: 64px;
    }
  }
  @media ${device.desktop} {
    top: -16px;
    right: 17px;
    & img {
      width: 76px;
    }
  }
`

const TipImage2 = styled.div`
  & {
    position: absolute;
    padding: 8px 13px;
    background-color: ${props => props.color};
    bottom: ${props => props.bottom}px;
    right: ${props => props.right}px;
    cursor: pointer;
  }

  & img {
    width: 18px;
  }

  @media ${device.tablet} {
    & {
      padding: 11px 16px;
    }
    & img {
      width: 24px;
    }
  }

  @media ${device.laptop} {
    & {
      width: 54px;
      height: 48px;
      bottom: -14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & img {
      width: 20px;
    }
  }

  @media ${device.laptopL} {
    & {
      width: 64px;
      height: 58px;
      bottom: -14px;
    }
    & img {
      width: 26px;
    }
  }
  @media ${device.desktop} {
    & {
      width: 80px;
      height: 74px;
      bottom: -14px;
    }
    & img {
      width: 34px;
    }
  }
`

const Save = styled.div`
  & {
    min-width: 110px;
    height: 40px;
    position: absolute;
    padding: 13px 17px;
    bottom: -4px;
    left: 0px;
    text-align: center;
    color: white;
    background-color: rgb(255, 140, 0);
    font-size: 11px;
    font-family: Titillium Bold;
    cursor: pointer;
  }
  @media ${device.mobileS} {
    min-width: 90px;
  }
  @media ${device.mobileM} {
    min-width: 110px;
  }
  @media ${device.mobileL} {
    min-width: 110px;
  }

  @media ${device.tablet} {
    height: 47px;
    font-size: 15px;
    padding: 13px 24px;
  }

  @media ${device.laptop} {
    height: 48px;
    bottom: -14px;
    font-size: 14px;
    width: 52%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }

  @media ${device.laptopL} {
    height: 58px;
    bottom: -14px;
    font-size: 18px;
  }
  @media ${device.desktop} {
    height: 74px;
    bottom: -14px;
    font-size: 22px;
  }
`

const SaveLetter = styled.span`
  font-family: Titillium Web;
  font-size: 11px;
  @media ${device.tablet} {
    font-size: 15px;
  }
  @media ${device.laptop} {
    font-size: 14px;
  }
  @media ${device.laptopL} {
    font-size: 18px;
  }
  @media ${device.desktop} {
    font-size: 22px;
  }
`

const Image = styled.img`
  width: 100%;
  @media ${device.laptop} {
  }
`

const Label = styled.span`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: ${props => props.font};
  @media ${device.tablet} {
    font-size: ${props => props.sizeTablet}px;
  }
  @media ${device.laptop} {
    font-size: ${props =>
      props.sizeLaptop ? props.sizeLaptop : props.sizeDesktop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props =>
      props.sizeLaptopL ? props.sizeLaptopL : props.sizeDesktop}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
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

const StarContainer = styled.div`
  display: flex;
`

const H2 = styled.h3`
  margin-top: 3px;
  margin-bottom: 0px;
  max-height: 50px;
  font-size: 20px;
  font-family: Titillium Bold;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${device.laptop} {
    font-size: 21px;
    max-height: 100px;
  }
  @media ${device.laptopL} {
    font-size: 25px;
    max-height: 100px;
  }
  @media ${device.desktop} {
    font-size: 34px;
  }
`

const Lable = styled.label`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: Titillium Web;
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const TipLetter = styled.label`
  height: 100px;
  width: 100px;
  color: white;
  transform: rotate(-90deg);
  transform-origin: left top 0;
  position: absolute;
  left: 12px;
  top: ${props => props.top}px;
  font-size: 12px;
  font-family: Titillium Bold;
  @media ${device.mobileS} {
    left: 10px;
    top: ${props => (props.topS ? props.topS : props.top - 5)}px;
  }
  @media ${device.mobileM} {
    left: 12px;
    top: ${props => props.top}px;
  }
  @media ${device.laptop} {
    font-size: 16px;
    width: 170px;
    left: 10px;
    top: ${props => (props.topLaptop ? props.topLaptop : props.topDesktop)}px;
  }
  @media ${device.laptopL} {
    font-size: 21px;
    width: 170px;
    left: 13px;
    top: ${props => props.topLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: 22px;
    width: 170px;
    left: 17px;
    top: ${props => props.topDesktop}px;
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
    top: 0;
    right: 0;
    `
      : `
    `}
`

const HiddenText = styled.span`
  font-size: 1px;
  line-height: 0px;
  position: absolute;
  color: transparent;
`

const SelectButton = styled.button`
  position: absolute;
  bottom: -0px;
  height: 86px;
  background: #ff8c00;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 2;
  border: 2px solid #202122;

  @media ${device.mobileS} {
    height: 45px;
    width: 100%;
  }
  @media ${device.mobileM} {
    height: 50px;
  }
  @media ${device.mobileL} {
    height: 55px;
  }
  @media ${device.laptop} {
    letter-spacing: 2.5px;
    height: 55px;
    width: 100%;
    margin-top: 100px;
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
  width: 100%;
  left: 50%;
  background: #202122;
  transform: translate(-47.5%, 50%);
  @media ${device.mobileS} {
    width: 100%;
    height: 45px;
  }
  @media ${device.mobileM} {
    height: 50px;
  }
  @media ${device.mobileL} {
    height: 55px;
  }
  @media ${device.tablet} {
    transform: translate(-48.5%, 50%);
    width: 83.6%;
  }
  @media ${device.laptop} {
    width: 100%;
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

export default OfferProductShow
