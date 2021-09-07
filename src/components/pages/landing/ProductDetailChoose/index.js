import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Img, Cover } from '~/utils/styles'
import { device } from '~/utils/device'
import { Letter, MobileContain, DesktopContain } from '~/utils/styles'

import StoreContext from '~/context/StoreContext'
import ProductContext from '~/context/ProductContext'

import { btn_color, gray_color } from '~/utils/colors'
import SizeSelect from '~/components/pages/products/SizeSelect'
import ColorSelect from '~/components/pages/products/ColorSelect'

const ProductDetailChoose = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState(1)
  const { toggle, setModal, localeFolder, localeSetting } = useContext(
    StoreContext
  )
  const { selectedOpt } = useContext(ProductContext)
  const [canNotFindSize, setCanNotFindSize] = useState(false)
  const [options, setOptions] = useState({ Size: {}, Color: {} })
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
        setCanNotFindSize(true)
      }
    })

    setOptions(_options)
  }

  useEffect(() => {
    variantOptions()
  }, [])
  const showCompareAtPrice =
    !product.isTboCommunity &&
    product.variant &&
    product.variant.length > 0 &&
    product.variant[0].compareAtPrice &&
    product.variant[0].compareAtPrice - product.variant[0].price > 0

  const isSold = !product.availableForSale

  return (
    <Container>
      <DesktopContainer>
        <ProductImage>
          {product.media && product.media.length > 0 && (
            <Img fluid={product.media[0].fluid} />
          )}
        </ProductImage>
      </DesktopContainer>
      <ProductDetail>
        <Tabs>
          <Tab
            onClick={() => setSelectedTab(0)}
            bottom={selectedTab === 0 ? 3 : 1.5}
          >
            <Letter font="Titillium Web" size={26} color="#202122">
              Product
            </Letter>
          </Tab>
          <Tab
            onClick={() => setSelectedTab(1)}
            bottom={selectedTab === 1 ? 3 : 1.5}
          >
            <Letter font="Titillium Web" size={26} color="#202122">
              Size
            </Letter>
          </Tab>
          <Tab
            onClick={() => setSelectedTab(2)}
            bottom={selectedTab === 2 ? 3 : 1.5}
          >
            <Letter font="Titillium Web" size={26} color="#202122">
              Color
            </Letter>
          </Tab>
        </Tabs>
        <ContentDiv>
          <MobileContainer>
            <ProductImage>
              {product.media && product.media.length > 0 && (
                <Img fluid={product.media[0].fluid} />
              )}
            </ProductImage>
          </MobileContainer>
          <ContentDetail>
            <H2>{product.name}</H2>
            <Letter
              font="Titillium Bold"
              size={18}
              sizeTablet={21}
              sizeLaptop={20}
              sizeLaptopL={25}
              sizeDesktop={30}
            >
              <Letter
                size={15}
                sizeTablet={18}
                sizeLaptop={18}
                sizeLaptopL={20}
                sizeDesktop={25}
              >
                {localeSetting.CURRENCY_SYMBOL}
              </Letter>
              {product.variant && product.variant.length > 0 && (
                <span>{product.variant[0].price}</span>
              )}
              {showCompareAtPrice && product.variant[0].compareAtPrice && (
                <Letter
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
                </Letter>
              )}
            </Letter>
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
          </ContentDetail>
        </ContentDiv>
        <SizeLetter>
          <Letter font="Titillium Bold" size={22} color="#202122">
            Size
          </Letter>
        </SizeLetter>
        <SizeSelect sizes={options['Size']} />

        {selectedTab === 2 && (
          <React.Fragment>
            <SizeLetter>
              <Letter font="Titillium Bold" size={22} color="#202122">
                Color
              </Letter>
            </SizeLetter>
            <ColorSelect
              colors={options['Color']}
              isRectangular={true}
              showBorder={true}
              width={58}
              height={56}
              widthDesktop={105}
              heightDesktop={105}
              additionalCss={`margin: 0 5px 5px 0;`}
              preSelectedColor={
                selectedOpt[product.id] && selectedOpt[product.id].color
                  ? selectedOpt[product.id].color
                  : null
              }
            />
          </React.Fragment>
        )}
      </ProductDetail>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding-top: 100px;
`

const ProductImage = styled.div`
  width: 100%;
  & div {
    width: 60%;
    margin: auto;
  }
`

const ProductDetail = styled.div`
  width: 100%;
  @media ${device.laptop} {
    width: 50%;
  }
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  @media ${device.laptop} {
    justify-content: unset;
  }
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
    font-size: 30px;
    max-height: 100px;
    margin-top: 50px;
  }
  @media ${device.laptopL} {
    font-size: 35px;
    max-height: 100px;
  }
  @media ${device.desktop} {
    font-size: 44px;
  }
`

const Tab = styled.div`
  padding: 5px 20px;
  border-bottom: ${props => props.bottom}px solid black;
  @media ${device.laptop} {
    padding: 10px 50px;
    border-bottom: ${props => props.bottom}px solid black;
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

const SizeLetter = styled.div`
  margin-top: 20px;
  padding-left: 16px;
  @media ${device.laptop} {
    padding-left: unset;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 50%;
  }
`

const ContentDiv = styled.div`
  display: flex;
  margin-top: 30px;
  @media ${device.laptop} {
    display: block;
    margin-top: 0px;
  }
`

const MobileContainer = styled.div`
  display: block;
  width: 50%;
  @media ${device.laptop} {
    display: none;
  }
`

const ContentDetail = styled.div``

export default ProductDetailChoose
