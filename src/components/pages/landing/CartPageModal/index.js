import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import {
  Container,
  Space,
  Letter,
  MobileContain,
  DesktopContain,
} from '~/utils/styles'
import { device } from '~/utils/device'
import BackImg from '~/images/Assets/Arrow-back.svg'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import EmptyCart from '~/components/pages/cart/EmptyCart'
import LandingCartBox from '~/components/pages/landing/LandingCartBox'
import MoreLike from '~/components/pages/Homepage/MoreLike'
import RecommendedProduct from '~/components/pages/cart/RecommendedProduct'
import Footer from '~/components/Common/Footer'

const CartPageModal = ({ locale = 'en', localeFolder }) => {
  const {
    cartPage_en,
    cartPage_de,
    cartPage_ch,
    buy2Get1Offer_en,
    buy2Get1Offer_de,
    buy2Get1Offer_ch,
  } = useStaticQuery(graphql`
    query {
      cartPage_en: datoCmsCartPage(locale: { eq: "en" }) {
        ...cartPage_commonFields
      }
      cartPage_de: datoCmsCartPage(locale: { eq: "de" }) {
        ...cartPage_commonFields
      }
      cartPage_ch: datoCmsCartPage(locale: { eq: "en-CH" }) {
        ...cartPage_commonFields
      }
      buy2Get1Offer_en: datoCmsBuy2Get1FreeOffer(locale: { eq: "en" }) {
        isOfferActive
      }
      buy2Get1Offer_de: datoCmsBuy2Get1FreeOffer(locale: { eq: "de" }) {
        isOfferActive
      }
      buy2Get1Offer_ch: datoCmsBuy2Get1FreeOffer(locale: { eq: "en-CH" }) {
        isOfferActive
      }
    }
    fragment cartPage_commonFields on DatoCmsCartPage {
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
      seo {
        title
        description
        image {
          url
        }
      }
    }
  `)
  let cartPage = {}
  let buy2Get1Offer = {}
  if (locale === 'en') {
    cartPage = cartPage_en
    buy2Get1Offer = buy2Get1Offer_en
  } else if (locale === 'de') {
    cartPage = cartPage_de
    buy2Get1Offer = buy2Get1Offer_de
  } else if (locale === 'en-CH') {
    cartPage = cartPage_ch
    buy2Get1Offer = buy2Get1Offer_ch
  }
  const seo = cartPage.seo || {}
  const {
    cartSum,
    store,
    fbxInitialCheckout,
    setLocale,
    setLocaleFolder,
    localeSetting,
  } = useContext(StoreContext)
  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])
  const { checkout } = store
  return (
    <Container>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image ? seo.image.url : null}
        keywords={[`tbo clothing`, `underwears`, `tbo`, seo.title]}
      />

      {/* {cartSum === 0 ? (
        <div>
          <EmptyCart
            pageLogo={cartPage.pageLogo}
            emptyMessage={cartPage.emptyMessage}
            showShopNowButton={cartPage.showShopNowButton}
            shopNowButtonText={cartPage.shopNowButtonText}
            shopNowButtonLink={cartPage.shopNowButtonLink}
          />
          <Space height={50} />
        </div>
      ) : ( */}
      <LandingCartBox
        pageLogo={cartPage.pageLogo}
        buy2Get1OfferIsActive={buy2Get1Offer.isOfferActive}
      />
      {/* )} */}
      {/* <Space height={50} /> */}
      {/* {cartSum === 0 ? (
        cartPage.showRecommendedSection ? (
          <div>
            <MoreLike />
            
          </div>
        ) : (
          ``
        )
      ) : (
        <Contain>
          <RecommendedProduct
            recommendedProducts={cartPage.recommendedProducts}
          />
          <Space height={20} />
        </Contain>
      )} */}

      <Contain>
        <RecommendedProduct
          recommendedProducts={cartPage.recommendedProducts}
        />
        <Space height={20} />
      </Contain>

      {cartSum > 0 && (
        <React.Fragment>
          <Checkout>
            <a onClick={() => fbxInitialCheckout(checkout.webUrl)}>
              <Letter font="Titillium Bold" size={16} color="white">
                TO CHECKOUT
              </Letter>
              <Letter font="Titillium Light" size={14} color="white">
                {' '}
                / SUBTOTAL {localeSetting.CURRENCY_SYMBOL}
                {cartSum.toFixed(2)}
              </Letter>
            </a>
          </Checkout>
        </React.Fragment>
      )}
    </Container>
  )
}

const ArrowBack = styled.div`
  position: fixed;
  top: 30px;
  left: 10px;
  z-index: 2;
  cursor: pointer;
  @media ${device.laptop} {
    & img {
      width: 60%;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 80%;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 100%;
    }
  }
`
const Checkout = styled.div`
  width: 100%;
  height: 83px;
  background: #f57b00;
  text-align: center;
  letter-spacing: 1px;
  padding-top: 25px;
  position: fixed;
  bottom: 0px;
  z-index: 5;
  @media ${device.laptop} {
    display: none;
  }
`
const Contain = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  @media ${device.tablet} {
    padding-left: 5%;
    padding-right: 5%;
  }
  @media ${device.laptop} {
    padding-left: unset;
    padding-right: unset;
    min-width: 650px;
    margin-left: 6%;
    padding-top: 20px;
  }
  @media ${device.laptopL} {
    margin-left: 10%;
    padding-top: 30px;
  }
  @media ${device.desktop} {
    margin-left: 15%;
    padding-top: 50px;
  }
`

export default CartPageModal
