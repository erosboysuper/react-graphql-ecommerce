import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'
import { Space, Cover, Letter } from '~/utils/styles'
import { device } from '~/utils/device'

import SEO from '~/components/seo'
import Header from '~/components/pages/landing/Header'
import OfferFront from '~/components/pages/landing/OfferFront'
import AdLetter from '~/components/pages/Homepage/AdLetter'
import GoodPoints from '~/components/pages/landing/GoodPoints'
import TboDiff from '~/components/pages/landing/TboDiff'
import Features from '~/components/pages/landing/Features'
import CoCreated from '~/components/pages/landing/CoCreated'
import NextPreview from '~/components/pages/landing/NextPreview'
import Guarantee from '~/components/pages/landing/Guarantee'
import Reviews from '~/components/pages/landing/Reviews'
import FAQs from '~/components/Common/FAQs'
import Footer from '~/components/Common/Footer'
import Modal from '~/components/pages/landing/Modal'
import LimitedOfferModal from '~/components/pages/landing/LimitedOfferModal'
import CartModal from '~/components/pages/landing/CartModal'
import SizeChart from '~/components/pages/products/SizeChart'

const NewLandingPage = ({ data, pageContext: { locale, localeFolder } }) => {
  let landingPage = data.datoCmsLandingPage || {}
  const seo = landingPage.seo || {}
  const { limitedOfferModal, setLimitedOfferModal } = useContext(ProductContext)
  const {
    modal,
    setModal,
    landingCartModal,
    setLandingCartModal,
    setLocale,
    setLocaleFolder,
  } = useContext(StoreContext)

  const usStoreRating = data.usStoreRating || {}
  if (usStoreRating.product && usStoreRating.product.handle) {
    landingPage.product['productReviewGroup'] =
      usStoreRating.product.productReviewGroup || {}
  }

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO
        title={seo.title || landingPage.product.name}
        description={seo.description || landingPage.product.name}
        image={seo.image ? seo.image.url : null}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          seo.title,
          landingPage.product.name,
        ]}
      />
      {landingPage.showPromotion && (
        <Header promotionText={landingPage.promotionText} />
      )}
      <OfferFront
        pageLogo={landingPage.pageLogo}
        productImages={landingPage.productImages}
        product={landingPage.product}
        price={landingPage.price}
        compareAtPrice={landingPage.compareAtPrice}
        offerTitle={landingPage.offerTitle}
        offerHighlight={landingPage.offerHighlight}
        productHighlightTitle={landingPage.productHighlightTitle}
        productHighlights={landingPage.productHighlights}
        buttonText={landingPage.buttonText}
        hasFreeShippingOffer={landingPage.hasFreeShippingOffer}
      />
      {/* {landingPage.showCompanyLogo && <AdLetter />} */}
      <GoodPoints
        testimonialMessage={landingPage.testimonialMessage}
        testimonialGiveBy={landingPage.testimonialGiveBy}
      />
      <TboDiff
        highlightTitle={landingPage.highlightTitle}
        highlightImage={landingPage.highlightImage}
        highlights={landingPage.highlights}
        buttonText={landingPage.buttonText}
      />
      <ConnectedContainer>
        <Features
          awesomeFeatureTitle={landingPage.awesomeFeatureTitle}
          awesomeFeatures={landingPage.awesomeFeatures}
        />
        <CoCreated
          coCreatedTitle={landingPage.coCreatedTitle}
          coCreatedHeading={landingPage.coCreatedHeading}
          coCreatedParagraph={landingPage.coCreatedParagraph}
          buttonText={landingPage.buttonText}
          coCreatedImage={landingPage.coCreatedImage}
          desktopCoCreatedImage={landingPage.desktopCoCreatedImage}
        />
      </ConnectedContainer>
      {/* <NextPreview
        productImages={landingPage.productImages}
        product={landingPage.product}
        price={landingPage.price}
        compareAtPrice={landingPage.compareAtPrice}
        offerTitle={landingPage.offerTitle}
        offerHighlight={landingPage.offerHighlight}
        offerMessage={landingPage.offerMessage}
        buttonText={landingPage.buttonText}
        hasFreeShippingOffer={landingPage.hasFreeShippingOffer}
      /> */}
      <Guarantee
        guaranteeTitle={landingPage.guaranteeTitle}
        guarantees={landingPage.guarantees}
        buttonText={landingPage.buttonText}
      />
      <Reviews
        reviewTitle={landingPage.reviewTitle}
        reviewHeading={landingPage.reviewHeading}
        reviews={landingPage.reviews}
      />
      <FAQs faqs={landingPage.faqs} />
      <Footer hideStickyMenu={true} />
      {modal && landingCartModal !== true && (
        <Modal
          product={landingPage.product}
          productImages={landingPage.productImages}
          price={landingPage.price}
          compareAtPrice={landingPage.compareAtPrice}
          hasFreeShippingOffer={landingPage.hasFreeShippingOffer}
        />
      )}
      {modal && landingCartModal && (
        <CartModal
          price={landingPage.price}
          compareAtPrice={landingPage.compareAtPrice}
          hasFreeShippingOffer={landingPage.hasFreeShippingOffer}
          couponCode={landingPage.couponCode}
          shippingStages={landingPage.shippingStages}
        />
      )}

      <Space1 />
      <ClaimButton onClick={() => setModal(true)}>
        <Letter font="Titillium Bold" size={16} color="white">
          {landingPage.buttonText}
        </Letter>
      </ClaimButton>
      {limitedOfferModal && <LimitedOfferModal />}
      {limitedOfferModal && (
        <Cover
          background={limitedOfferModal === true ? 0.5 : 0}
          index={limitedOfferModal === true ? 10 : 0}
          onClick={() => setLimitedOfferModal(false)}
        />
      )}
    </React.Fragment>
  )
}

const ClaimButton = styled.div`
  @media ${device.mobileS} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 83px;
    width: 100%;
    background: #ff8c00;
    position: fixed;
    bottom: 0px;
    z-index: 4;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const Space1 = styled.div`
  @media ${device.mobileS} {
    background: transparent;
    width: 100%;
    height: 83px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const ConnectedContainer = styled.div`
  background: linear-gradient(
      162deg,
      rgb(242, 242, 247) 0%,
      rgb(253, 253, 253) 100%
    )
    0% 0% no-repeat padding-box padding-box transparent;
`

export const query = graphql`
  query($handle: String!, $locale: String!) {
    usStoreRating: datoCmsLandingPage(
      locale: { eq: "en" }
      handle: { eq: $handle }
    ) {
      product {
        handle
        productReviewGroup {
          products {
            variant {
              sku
            }
          }
        }
      }
    }
    datoCmsLandingPage(locale: { eq: $locale }, handle: { eq: $handle }) {
      id
      showPromotion
      promotionText
      product {
        id
        name
        handle
        shopifyId
        isSingleProduct
        sizeChart {
          heading
          description
          image {
            url
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
          sizes {
            id
            title
            sizeVariant {
              id
              title
              cmHelpText
              inchHelpText
            }
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
      price
      compareAtPrice
      couponCode
      productHighlightTitle
      productHighlights {
        id
        title
      }
      productImages {
        url
        fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "600" }) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      pageLogo {
        url
        fluid(forceBlurhash: true, maxWidth: 350) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      offerTitle
      offerHighlight
      offerMessage
      hasFreeShippingOffer
      buttonText
      showCompanyLogo
      testimonialMessage
      testimonialGiveBy
      highlightTitle
      highlightImage {
        url
        fluid(forceBlurhash: true, maxWidth: 500, imgixParams: { w: "400" }) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      highlights {
        id
        title
        shortText
      }
      awesomeFeatureTitle
      awesomeFeatures {
        id
        title
        shortText
        image {
          url
          fluid(forceBlurhash: true, maxWidth: 500, imgixParams: { w: "250" }) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
      }
      showCoCreatedSection
      coCreatedTitle
      coCreatedHeading
      coCreatedParagraph
      coCreatedImage {
        url
        fluid(forceBlurhash: true, maxWidth: 910) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      desktopCoCreatedImage {
        url
        fluid(forceBlurhash: true, maxWidth: 1500) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      showGuaranteeSection
      guaranteeTitle
      guarantees {
        id
        title
        image {
          url
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "110" }) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
      }
      showReviewSection
      reviewTitle
      reviewHeading
      reviews {
        id
        reviewerName
        reviewDate
        starRating
        reviewContent
        reviewerImage {
          url
          fluid(forceBlurhash: true, maxWidth: 910) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
        product {
          id
          name
          handle
          media {
            url
            fluid(forceBlurhash: true, maxWidth: 910) {
              sizes
              aspectRatio
              src
              srcSet
              width
              height
            }
          }
        }
        size {
          id
          name
          helpText
        }
      }
      faqs {
        id
        isPublished
        title
        description
      }
      shippingStages {
        id
        minimumAmount
        displayText
      }
    }
  }
`

export default NewLandingPage
