import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { Link } from 'gatsby'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import SearchContext from '~/context/SearchContext'
import StoreContext from '~/context/StoreContext'

const SearchItem = ({ product }) => {
  const { localeFolder, localeSetting } = useContext(StoreContext)
  const { setViewSearch } = useContext(SearchContext)

  return (
    <Link
      to={`/${localeFolder}/${product.handle}/`}
      onClick={() => setViewSearch(false)}
    >
      <Parent>
        <ProductImage>
          {product.media && product.media.length > 0 && (
            <LazyLoad>
              <img src={product.media[0].url} alt={product.name} />
            </LazyLoad>
          )}
        </ProductImage>
        <Contain>
          {product.variant && product.variant.length > 0 && (
            <PriceLetters>
              <Letter
                font="Titillium Bold"
                size={12}
                sizeLaptop={14}
                sizeLaptopL={17}
                sizeDesktop={20}
                color="#7D7F81"
              >
                {localeSetting.CURRENCY_SYMBOL}
              </Letter>
              <Letter
                font="Titillium Bold"
                size={16}
                sizeLaptop={18}
                sizeLaptopL={22}
                sizeDesktop={26}
                color="#7D7F81"
              >
                {product.variant[0].price}
              </Letter>{' '}
              &nbsp;&nbsp;
              {product.variant[0].compareAtPrice - product.variant[0].price >
                0 && (
                <BreakThrough>
                  <Letter
                    font="Titillium Web"
                    size={12}
                    sizeLaptop={14}
                    sizeLaptopL={17}
                    sizeDesktop={20}
                    color="#535558"
                  >
                    {localeSetting.CURRENCY_SYMBOL}
                    {(
                      product.variant[0].compareAtPrice -
                      product.variant[0].price
                    ).toFixed(2)}
                  </Letter>
                </BreakThrough>
              )}
            </PriceLetters>
          )}
          <ProductName dangerouslySetInnerHTML={{ __html: product.name }} />
        </Contain>
      </Parent>
    </Link>
  )
}

const Parent = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  height: 70px;
  display: flex;
  padding-left: 5%;
  margin-bottom: 15px;
  @media ${device.laptop} {
    padding-left: 0px;
    height: 80px;
  }
  @media ${device.laptopL} {
    padding-left: 0px;
    height: 100px;
  }
  @media ${device.desktop} {
    padding-left: 0px;
    height: 110px;
  }
`

const ProductImage = styled.div`
  & {
    height: 70px;
    width: 70px;
    background-color: white;
  }
  & img {
    height: 70px;
    width: 70px;
  }
  @media ${device.laptop} {
    & {
      height: 75px;
      width: 75px;
      background-color: white;
    }
    & img {
      height: 75px;
      width: 75px;
    }
  }
  @media ${device.laptopL} {
    & {
      height: 90px;
      width: 90px;
      background-color: white;
    }
    & img {
      height: 90px;
      width: 90px;
    }
  }
  @media ${device.desktop} {
    & {
      height: 110px;
      width: 110px;
      background-color: white;
    }
    & img {
      height: 110px;
      width: 110px;
    }
  }
`

const Contain = styled.div`
  height: 70px;
  display: block;
  @media ${device.laptop} {
    height: 110px;
  }
`

const PriceLetters = styled.div`
  height: 33px;
  color: white;
  padding-left: 15px;
  padding-top: 7px;
  @media ${device.laptop} {
    padding-top: 9px;
    margin-bottom: 4px;
  }
  @media ${device.laptopL} {
    padding-top: 11px;
    margin-bottom: 9px;
  }
  @media ${device.desktop} {
    padding-top: 14px;
    margin-bottom: 15px;
  }
`

const ProductName = styled.div`
  height: 35px;
  color: white;
  padding-left: 15px;
  font-family: Titillium Bold;
  font-size: 20px;
  color: #ffffff;
  width: 270px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media ${device.laptop} {
    font-size: 22px;
    height: 49px;
  }
  @media ${device.laptopL} {
    font-size: 28px;
    height: 40px;
  }
  @media ${device.desktop} {
    font-size: 34px;
    height: 49px;
  }
`

const BreakThrough = styled.del`
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
    bottom: 2px;
    left: 0px;
    -webkit-transform: rotate(7deg);
    -ms-transform: rotate(7deg);
    transform: rotate(7deg);
  }
`

export default SearchItem
