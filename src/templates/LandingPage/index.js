import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'
import { Space, Cover, Letter } from '~/utils/styles'
import { device } from '~/utils/device'

import SEO from '~/components/seo'
import Header from '~/components/pages/landing/Header'
import LandingFront from '~/components/pages/landing/LandingFront'
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
import CartModal from '~/components/pages/landing/CartModal'
import SizeChart from '~/components/pages/products/SizeChart'

const LandingPage = ({ data, pageContext: { locale, localeFolder } }) => {
  let landingPage = data.datoCmsLandingPage || {}
  let tboNumbers = data.tboNumbers
  const seo = landingPage.seo || {}
  const { sizeChart, setSizeChart } = useContext(ProductContext)
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

  const removeModal = (flag = false) => {
    setModal(flag)
    setLandingCartModal(flag)
    setSizeChart(flag)
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
      <LandingFront
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
      <Space height={25} />
      {landingPage.showCompanyLogo && <AdLetter />}
      <GoodPoints
        testimonialMessage={landingPage.testimonialMessage}
        testimonialGiveBy={landingPage.testimonialGiveBy}
      />
      <TboDiff
        highlightTitle={landingPage.highlightTitle}
        highlightImage={landingPage.highlightImage}
        highlights={landingPage.highlights}
        buttonText={landingPage.buttonText}
        tboNumbers={tboNumbers}
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
      <NextPreview
        productImages={landingPage.productImages}
        product={landingPage.product}
        price={landingPage.price}
        compareAtPrice={landingPage.compareAtPrice}
        offerTitle={landingPage.offerTitle}
        offerHighlight={landingPage.offerHighlight}
        offerMessage={landingPage.offerMessage}
        buttonText={landingPage.buttonText}
        hasFreeShippingOffer={landingPage.hasFreeShippingOffer}
      />
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
      {modal && sizeChart && (
        <SizeChart sizeChart={landingPage.product.sizeChart || {}} />
      )}
      {modal === true && (
        <Cover
          background={modal === true ? 0.5 : 0}
          index={modal === true ? 10 : 0}
          onClick={() => removeModal(false)}
        />
      )}
      <Space1 />
      <ClaimButton onClick={() => setModal(true)}>
        <Letter font="Titillium Bold" size={16} color="white">
          {landingPage.buttonText}
        </Letter>
      </ClaimButton>
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
  query ($handle: String!, $locale: String!) {
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
    tboNumbers: allFile(
      filter: {
        extension: { regex: "/(png)/" }
        relativeDirectory: { eq: "landingtbo" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 114, quality: 86) {
              ...GatsbyImageSharpFluid_withWebp
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
        fluid(
          forceBlurhash: false
          imgixParams: { w: "800" }
          sizes: "(max-width: 400px) 100px,(max-width: 768px)  100px,(max-width: 1366px) 800px,(max-width: 1920px) 800px, 1920px"
        ) {
          ...GatsbyDatoCmsFluid_tracedSVG
        }
        smallImage: fluid(
          forceBlurhash: false
          imgixParams: { w: "180" }
          sizes: "(max-width: 400px) 20px,(max-width: 768px)  20px,(max-width: 1366px) 180px,(max-width: 1920px) 180px, 1920px"
        ) {
          ...GatsbyDatoCmsFluid_tracedSVG
        }
      }
      pageLogo {
        url
        fluid(
          forceBlurhash: false
          sizes: "(max-width: 400px) 45px,(max-width: 768px)  45px,(max-width: 1366px) 270px,(max-width: 1920px) 270px, 1920px"
        ) {
          ...GatsbyDatoCmsFluid_tracedSVG
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
        fluid(forceBlurhash: false, imgixParams: { w: "320" }) {
          ...GatsbyDatoCmsFluid_tracedSVG
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
          fluid(forceBlurhash: false, imgixParams: { w: "110" }) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
      showCoCreatedSection
      coCreatedTitle
      coCreatedHeading
      coCreatedParagraph
      coCreatedImage {
        url
        fluid(forceBlurhash: false, imgixParams: { w: "400" }) {
          ...GatsbyDatoCmsFluid_tracedSVG
        }
      }
      desktopCoCreatedImage {
        url
        fluid(
          forceBlurhash: false
          imgixParams: { w: "1517" }
          sizes: "(max-width: 400px) 45px,(max-width: 768px)  45px,(max-width: 1500px) 1517px,(max-width: 1920px) 1517px, 1920px"
        ) {
          ...GatsbyDatoCmsFluid_tracedSVG
        }
      }
      showGuaranteeSection
      guaranteeTitle
      guarantees {
        id
        title
        image {
          url
          fluid(forceBlurhash: false, imgixParams: { w: "110" }) {
            ...GatsbyDatoCmsFluid_tracedSVG
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
          fluid(forceBlurhash: false, maxWidth: 124) {
            ...GatsbyDatoCmsFluid_tracedSVG
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

export default LandingPage
