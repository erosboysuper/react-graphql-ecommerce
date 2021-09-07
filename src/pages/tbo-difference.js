import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Space, DesktopContain } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import TboFront from '~/components/pages/TboDiff/TboFront'
import FirstDiff from '~/components/pages/TboDiff/FirstDiff'
import SecondDiff from '~/components/pages/TboDiff/SecondDiff'
import ThirdDiff from '~/components/pages/TboDiff/ThirdDiff'
import AddicFeature from '~/components/pages/TboDiff/AddicFeature'
import DiffList from '~/components/pages/TboDiff/DiffList'
import DiffListDesktop from '~/components/pages/TboDiff/DiffListDesktop'
import MoreLike from '~/components/pages/Homepage/MoreLike'
import Footer from '~/components/Common/Footer'

const TheTboDiff = ({ pageContext: { locale, localeFolder } }) => {
  const { tboDiff_en, tboDiff_de, tboDiff_ch } = useStaticQuery(graphql`
    query {
      tboDiff_en: datoCmsTboDifferencePage(locale: { eq: "en" }) {
        ...tboDiff_commonFields
      }
      tboDiff_de: datoCmsTboDifferencePage(locale: { eq: "de" }) {
        ...tboDiff_commonFields
      }
      tboDiff_ch: datoCmsTboDifferencePage(locale: { eq: "en-CH" }) {
        ...tboDiff_commonFields
      }
    }
    fragment tboDiff_commonFields on DatoCmsTboDifferencePage {
      pageTitle
      pageDescription
      pageImage {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      desktopPageImage {
        url
        fluid(forceBlurhash: true, maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      coCreationTitle
      coCreationDescription
      coCreationImage {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      coCreationIcon {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      joinCommunityButtonText
      joinCommunityButtonLink
      bambooFabricTitle
      bambooFabricDescription
      bambooFabricImage {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      bambooFabricIcon {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      manshapedTitle
      manshapedDescription
      manshapedImage {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      manshapedIcon {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      comfyBambooFabricTitle
      comfyBambooFabricDescription
      comfyBambooFabricImage {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      shopNowButtonText
      shopNowButtonLink
      showTboDifferenceSection
      tboDifferenceTitle
      showRecommendSection
      seo {
        title
        description
        image {
          url
        }
      }
    }
  `)
  let tboDiff = {}
  if (locale === 'en') {
    tboDiff = tboDiff_en
  } else if (locale === 'de') {
    tboDiff = tboDiff_de
  } else if (locale === 'en-CH') {
    tboDiff = tboDiff_ch
  }
  const seo = tboDiff.seo || {}
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])
  return (
    <React.Fragment>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image ? seo.image.url : null}
        keywords={[`tbo clothing`, `underwears`, `tbo`, seo.title]}
      />
      <Header />
      <TboFront
        pageTitle={tboDiff.pageTitle}
        pageDescription={tboDiff.pageDescription}
        pageImage={tboDiff.pageImage}
        desktopPageImage={tboDiff.desktopPageImage}
      />
      <FirstDiff
        coCreationImage={tboDiff.coCreationImage}
        coCreationIcon={tboDiff.coCreationIcon}
        coCreationTitle={tboDiff.coCreationTitle}
        coCreationDescription={tboDiff.coCreationDescription}
        joinCommunityButtonText={tboDiff.joinCommunityButtonText}
        joinCommunityButtonLink={tboDiff.joinCommunityButtonLink}
      />
      <SecondDiff
        bambooFabricTitle={tboDiff.bambooFabricTitle}
        bambooFabricDescription={tboDiff.bambooFabricDescription}
        bambooFabricImage={tboDiff.bambooFabricImage}
        bambooFabricIcon={tboDiff.bambooFabricIcon}
      />
      <ThirdDiff
        manshapedTitle={tboDiff.manshapedTitle}
        manshapedDescription={tboDiff.manshapedDescription}
        manshapedImage={tboDiff.manshapedImage}
        manshapedIcon={tboDiff.manshapedIcon}
      />
      <AddicFeature
        comfyBambooFabricTitle={tboDiff.comfyBambooFabricTitle}
        comfyBambooFabricDescription={tboDiff.comfyBambooFabricDescription}
        comfyBambooFabricImage={tboDiff.comfyBambooFabricImage}
        shopNowButtonText={tboDiff.shopNowButtonText}
        shopNowButtonLink={tboDiff.shopNowButtonLink}
      />
      {tboDiff.showTboDifferenceSection && (
        <React.Fragment>
          <DiffList tboDifferenceTitle={tboDiff.tboDifferenceTitle} />
          <DiffListDesktop tboDifferenceTitle={tboDiff.tboDifferenceTitle} />
        </React.Fragment>
      )}
      {tboDiff.showRecommendSection && <MoreLike />}
      <DesktopContain>
        <Space height={100} />
      </DesktopContain>
      <Footer activeMenu="tbo-difference" />
    </React.Fragment>
  )
}

export default TheTboDiff
