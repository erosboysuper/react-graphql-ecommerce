import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import TboFront from '~/components/pages/Homepage/TboFront'
import JoinCommunity from '~/components/pages/Homepage/JoinCommunity'
import FavouriteCut from '~/components/pages/Homepage/FavouriteCut'
import BestSelling from '~/components/pages/Homepage/BestSelling'
import Footer from '~/components/Common/Footer'

const NotFoundPage = ({
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  const { datoCms404Page_en, datoCms404Page_de, datoCms404Page_ch } =
    useStaticQuery(graphql`
      query {
        datoCms404Page_en: datoCmsHomePage(locale: { eq: "en" }) {
          ...datoCms404Page_commonFields
        }
        datoCms404Page_de: datoCmsHomePage(locale: { eq: "de" }) {
          ...datoCms404Page_commonFields
        }
        datoCms404Page_ch: datoCmsHomePage(locale: { eq: "en-CH" }) {
          ...datoCms404Page_commonFields
        }
      }
      fragment datoCms404Page_commonFields on DatoCmsHomePage {
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
        showFavouriteCutSection
        favouriteCutHeading
        favouriteCutAnchorText
        favouriteCutAnchorLink
      }
    `)

  let datoCmsHomePage = {}
  if (locale === 'en') {
    datoCmsHomePage = datoCms404Page_en
  } else if (locale === 'de') {
    datoCmsHomePage = datoCms404Page_de
  } else if (locale === 'en-CH') {
    datoCmsHomePage = datoCms404Page_ch
  }

  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO title="404: Not found" />
      <Header />
      {datoCmsHomePage.showBanner && (
        <TboFront
          logo={datoCmsHomePage.logo}
          bannerImage={datoCmsHomePage.bannerImage}
          desktopBannerImage={datoCmsHomePage.desktopBannerImage}
          bannerHighlight1="Sorry"
          bannerHighlight2="We couldn’t find that page"
          bannerButtonText={datoCmsHomePage.bannerButtonText}
          bannerButtonLink={datoCmsHomePage.bannerButtonLink}
          showBannerButton={datoCmsHomePage.showBannerButton}
        />
      )}
      <Space1 />
      <BestSelling />
      <Space2 />
      {datoCmsHomePage.showFavouriteCutSection && (
        <FavouriteCut
          favouriteCutHeading={datoCmsHomePage.favouriteCutHeading}
          favouriteCutAnchorText={datoCmsHomePage.favouriteCutAnchorText}
          favouriteCutAnchorLink={datoCmsHomePage.favouriteCutAnchorLink}
        />
      )}
      <Space3 />
      <JoinCommunity active={true} />
      <DesktopContain>
        <Footer activeMenu="shop" additionalStyle={{ marginTop: `-90px` }} />
      </DesktopContain>
      <MobileContain>
        <Footer
          activeMenu="shop"
          hideStickyMenu={true}
          additionalStyle={{ marginTop: `-90px` }}
        />
      </MobileContain>
    </React.Fragment>
  )
}

const Space1 = styled.div`
  width: 100%;
  height: 50px;
  @media ${device.laptop} {
    height: 60px;
  }
`

const Space2 = styled.div`
  width: 100%;
  height: 50px;
  @media ${device.laptop} {
    margin-top: -80px;
    height: 0px;
  }
`
const Space3 = styled.div`
  width: 100%;
  height: 100px;
  @media ${device.laptop} {
    height: 160px;
  }
`

export default NotFoundPage
