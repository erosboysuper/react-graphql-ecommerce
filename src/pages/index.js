import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import StoreContext from '~/context/StoreContext'
import { Space, IpadContain } from '~/utils/styles'
import { device } from '~/utils/device'
import { zendeskWidget } from '~/utils/functions'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import TboFront from '~/components/pages/Homepage/TboFront'
import BestSelling from '~/components/pages/Homepage/BestSelling'
import AdLetter from '~/components/pages/Homepage/AdLetter'
import JoinCommunity from '~/components/pages/Homepage/JoinCommunity'
import FavouriteCut from '~/components/pages/Homepage/FavouriteCut'
import TboDifference from '~/components/pages/Homepage/TboDifference'
import MoreLike from '~/components/pages/Homepage/MoreLike'
import Feeling from '~/components/pages/Homepage/Feeling'
import Guarantee from '~/components/pages/Homepage/Guarantee'
import Social from '~/components/pages/Homepage/Social'
import Review from '~/components/pages/Homepage/Review'
import Footer from '~/components/Common/Footer'
// import WheelPopUp from '~/components/Common/WheelPopUp'

const IndexPage = ({ pageContext: { locale, localeFolder } }) => {
  const { datoCmsHomePage_en, datoCmsHomePage_de, datoCmsHomePage_ch } =
    useStaticQuery(graphql`
      query {
        datoCmsHomePage_en: datoCmsHomePage(locale: { eq: "en" }) {
          ...datoCmsHomePage_commonFields
        }
        datoCmsHomePage_de: datoCmsHomePage(locale: { eq: "de" }) {
          ...datoCmsHomePage_commonFields
        }
        datoCmsHomePage_ch: datoCmsHomePage(locale: { eq: "en-CH" }) {
          ...datoCmsHomePage_commonFields
        }
      }
      fragment datoCmsHomePage_commonFields on DatoCmsHomePage {
        id
        showBanner
        logo {
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
        bannerImage {
          url
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "767" }) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
        desktopBannerImage {
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
        bannerHighlight1
        bannerHighlight2
        bannerButtonText
        bannerButtonLink
        showBannerButton
        showCompanyLogos
        showFavouriteCutSection
        favouriteCutHeading
        favouriteCutAnchorText
        favouriteCutAnchorLink
        showBottomBannerSection
        bottomBannerHeadline1
        bottomBannerHeadline2
        bottomBannerHeadline3
        bottomBannerHeadline4
        showBottomBannerButton
        bottomBannerButtonText
        bottomBannerButtonLink
        bottomBannerLogo {
          url
        }
        bottomBannerImage {
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
        desktopBottomBannerImage {
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
        guaranteeHeadline
        guaranteeAnchorText
        guaranteeAnchorLink
        showSocialSection
        socialHeadling
        socialShortText
        instagramHandler
        instagramHandleLink
        showReviewSection
        reviewHeading
        reviewAnchorText
        reviewAnchorLink
        seo {
          title
          description
          image {
            url
          }
        }
        ...tboHighlightsContent_commonFields
      }
      fragment tboHighlightsContent_commonFields on DatoCmsHomePage {
        showTboDifferenceSection
        tboDifferenceHeading
        tboDifferenceAnchorText
        tboDifferenceAnchorLink
        tboDifference {
          id
          title
          shortText
          image {
            url
            fluid(forceBlurhash: true, maxWidth: 910) {
              aspectRatio
              src
              srcSet
              sizes
              width
              height
            }
          }
        }
      }
    `)
  let datoCmsHomePage = {}
  if (locale === 'en') {
    datoCmsHomePage = datoCmsHomePage_en
  } else if (locale === 'de') {
    datoCmsHomePage = datoCmsHomePage_de
  } else if (locale === 'en-CH') {
    datoCmsHomePage = datoCmsHomePage_ch
  }
  const seo = datoCmsHomePage.seo || {}
  const { store, updateStore, setPopModal, setLocale, setLocaleFolder } =
    useContext(StoreContext)

  useEffect(() => {
    updateStore(prevState => {
      return { ...prevState, datoCmsHomePage }
    })
  }, [store.datoCmsHomePage])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)

    if (locale === 'en') {
      setTimeout(() => zendeskWidget(), 1000 * 10)
    }
  }, [locale, localeFolder])

  useEffect(() => {
    setTimeout(() => setPopModal(true), 15000)
  }, [])

  return (
    <React.Fragment>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image ? seo.image.url : null}
        keywords={[`tbo clothing`, `underwears`, `tbo`, seo.title]}
      />
      <Helmet>
        <meta
          name="google-site-verification"
          content="6gp7f5ZhXMnNPZSKY9fpQXJnHXBhModlFTiuHh5_5gI"
        />
      </Helmet>
      <Header />
      {/* {datoCmsHomePage.showBanner && ( */}
      <TboFront
        logo={datoCmsHomePage.logo}
        bannerImage={datoCmsHomePage.bannerImage}
        desktopBannerImage={datoCmsHomePage.desktopBannerImage}
        bannerHighlight1={datoCmsHomePage.bannerHighlight1}
        bannerHighlight2={datoCmsHomePage.bannerHighlight2}
        bannerButtonText={datoCmsHomePage.bannerButtonText}
        bannerButtonLink={datoCmsHomePage.bannerButtonLink}
        showBannerButton={datoCmsHomePage.showBannerButton}
      />
      {/* )} */}
      <Space height={70} />
      {/* {datoCmsHomePage.showCompanyLogos && ( */}
      <AdLetter />
      {/* }} */}
      <BestSelling />
      <JoinCommunity />
      {datoCmsHomePage.showFavouriteCutSection && (
        <FavouriteCut
          favouriteCutHeading={datoCmsHomePage.favouriteCutHeading}
          favouriteCutAnchorText={datoCmsHomePage.favouriteCutAnchorText}
          favouriteCutAnchorLink={datoCmsHomePage.favouriteCutAnchorLink}
        />
      )}
      <DesktopContainer>{/* <Space height={150} /> */}</DesktopContainer>
      <IpadContain>
        <Space height={50} />
      </IpadContain>
      {datoCmsHomePage.showTboDifferenceSection && (
        <TboDifference
          tboHighlightsContent={{
            tboDifferenceHeading: datoCmsHomePage.tboDifferenceHeading,
            tboDifferenceAnchorText: datoCmsHomePage.tboDifferenceAnchorText,
            tboDifferenceAnchorLink: datoCmsHomePage.tboDifferenceAnchorLink,
            tboDifference: datoCmsHomePage.tboDifference,
          }}
        />
      )}
      <MoreLike />
      {datoCmsHomePage.showBottomBannerSection && (
        <Feeling
          bottomBannerImage={datoCmsHomePage.bottomBannerImage}
          desktopBottomBannerImage={datoCmsHomePage.desktopBottomBannerImage}
          bottomBannerHeadline1={datoCmsHomePage.bottomBannerHeadline1}
          bottomBannerHeadline2={datoCmsHomePage.bottomBannerHeadline2}
          bottomBannerHeadline3={datoCmsHomePage.bottomBannerHeadline3}
          bottomBannerHeadline4={datoCmsHomePage.bottomBannerHeadline4}
          showBottomBannerButton={datoCmsHomePage.showBottomBannerButton}
          bottomBannerButtonText={datoCmsHomePage.bottomBannerButtonText}
          bottomBannerButtonLink={datoCmsHomePage.bottomBannerButtonLink}
          bottomBannerLogo={datoCmsHomePage.bottomBannerLogo}
        />
      )}
      {datoCmsHomePage.showGuaranteeSection && (
        <Guarantee
          guaranteeHeadline={datoCmsHomePage.guaranteeHeadline}
          guaranteeAnchorText={datoCmsHomePage.guaranteeAnchorText}
          guaranteeAnchorLink={datoCmsHomePage.guaranteeAnchorLink}
        />
      )}
      {datoCmsHomePage.showSocialSection && (
        <Social
          socialHeadling={datoCmsHomePage.socialHeadling}
          socialShortText={datoCmsHomePage.socialShortText}
          instagramHandler={datoCmsHomePage.instagramHandler}
          instagramHandleLink={datoCmsHomePage.instagramHandleLink}
        />
      )}
      {datoCmsHomePage.showReviewSection && (
        <Review
          reviewHeading={datoCmsHomePage.reviewHeading}
          reviewAnchorText={datoCmsHomePage.reviewAnchorText}
          reviewAnchorLink={datoCmsHomePage.reviewAnchorLink}
        />
      )}
      <Space height={200} />
      <Footer activeMenu="home" />
      {/* <WheelPopUp /> */}
    </React.Fragment>
  )
}

const DesktopContainer = styled.div`
  width: 100%;
  height: 50px;
  @media ${device.laptopL} {
    height: 100px;
  }
  @media ${device.desktop} {
    height: 150px;
  }
`

export default IndexPage
