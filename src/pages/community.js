import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import 'react-image-lightbox/style.css'
import 'react-placeholder/lib/reactPlaceholder.css'

import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import SEO from '~/components/seo'
import CommunityHeader from '~/components/pages/community/CommunityHeader'
import CommunitySection from '~/components/pages/community/CommunitySection'
// import MarketSection from '~/components/pages/market/MarketSection'
import Footer from '~/components/Common/Footer'
import CommunityModals from '~/components/Common/CommunityModals'

const CommunityPage = ({
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  const { communityPage } = useStaticQuery(graphql`
    query {
      communityPage: datoCmsCommunity(locale: { eq: "en" }) {
        ...communityPage_commonFields
      }
    }
    fragment communityPage_commonFields on DatoCmsCommunity {
      enableNotifications
      enableSearch
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
      seo {
        title
        description
        image {
          url
        }
      }
    }
  `)
  const seo = communityPage.seo || {}
  const {
    // mainTab,
    autoLoginModel,
  } = useContext(CommunityContext)
  const { setLocale, setLocaleFolder } = useContext(StoreContext)

  useEffect(() => {
    autoLoginModel()
  }, [])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <div>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image ? seo.image.url : null}
        keywords={[`tbo clothing`, `underwears`, `tbo`, seo.title]}
      />
      <CommunityHeader
        enableNotifications={communityPage.enableNotifications}
        enableSearch={communityPage.enableSearch}
        pageLogo={communityPage.pageLogo}
      />
      {/* {mainTab === 'community' ? <CommunitySection /> : <MarketSection />} */}
      <CommunitySection />
      <Footer activeMenu="co-create" hideFooter={true} />
      <CommunityModals />
    </div>
  )
}

export default CommunityPage
