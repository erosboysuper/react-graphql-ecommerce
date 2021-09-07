import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { Space } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'
import AboutFront from '~/components/pages/About/AboutFront'
import CoCreation from '~/components/pages/About/CoCreation'
import HowWork from '~/components/pages/About/HowWork'
import ShareFeedback from '~/components/pages/About/ShareFeedback'
import JoinCommunity from '~/components/pages/Homepage/JoinCommunity'

const AboutUs = ({ pageContext: { locale, localeFolder } }) => {
  const { aboutUs_en, aboutUs_de, aboutUs_ch } = useStaticQuery(graphql`
    query {
      aboutUs_en: datoCmsAboutUsPage(locale: { eq: "en" }) {
        ...aboutUs_commonFields
      }
      aboutUs_de: datoCmsAboutUsPage(locale: { eq: "de" }) {
        ...aboutUs_commonFields
      }
      aboutUs_ch: datoCmsAboutUsPage(locale: { eq: "en-CH" }) {
        ...aboutUs_commonFields
      }
    }
    fragment aboutUs_commonFields on DatoCmsAboutUsPage {
      pageTitle
      paragraph1
      highlights
      coCreationHeading
      coCreationParagraph1
      coCreationParagraph2
      coCreationParagraph3
      showJoinCommunityButton
      joinCommunityButtonText
      joinCommunityButtonLink
      showHowItWorkSection
      howItWorkTitle
      showAhaMomentSection
      ahaMomentHeading
      ahaMomentDescription
      showFeedbackButton
      feedbackButtonText
      feedbackButtonLink
      showJoinCommunitySection
      howItWorkItems {
        id
        title
        shortText
      }
      bannerImage {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      desktopBannerImage {
        url
        fluid(forceBlurhash: true, maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
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
      ahaMomentImage {
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
  let aboutUs = {}
  if (locale === 'en') {
    aboutUs = aboutUs_en
  } else if (locale === 'de') {
    aboutUs = aboutUs_de
  } else if (locale === 'en-CH') {
    aboutUs = aboutUs_ch
  }
  const seo = aboutUs.seo || {}
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])
  return (
    <React.Fragment>
      <Container>
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image ? seo.image.url : null}
          keywords={[`tbo clothing`, `underwears`, `tbo`, seo.title]}
        />
        <Header />
        <AboutFront
          pageTitle={aboutUs.pageTitle}
          paragraph1={aboutUs.paragraph1}
          bannerImage={aboutUs.bannerImage}
          desktopBannerImage={aboutUs.desktopBannerImage}
        />
        <CoCreation
          highlights={aboutUs.highlights}
          coCreationHeading={aboutUs.coCreationHeading}
          coCreationImage={aboutUs.coCreationImage}
          coCreationParagraph1={aboutUs.coCreationParagraph1}
          coCreationParagraph2={aboutUs.coCreationParagraph2}
          coCreationParagraph3={aboutUs.coCreationParagraph3}
          joinCommunityButtonText={aboutUs.joinCommunityButtonText}
          joinCommunityButtonLink={aboutUs.joinCommunityButtonLink}
          showJoinCommunityButton={aboutUs.showJoinCommunityButton}
        />
        {aboutUs.showHowItWorkSection && (
          <HowWork
            howItWorkTitle={aboutUs.howItWorkTitle}
            howItWorkItems={aboutUs.howItWorkItems}
          />
        )}
        {aboutUs.showAhaMomentSection && (
          <ShareFeedback
            ahaMomentImage={aboutUs.ahaMomentImage}
            ahaMomentHeading={aboutUs.ahaMomentHeading}
            ahaMomentDescription={aboutUs.ahaMomentDescription}
            showFeedbackButton={aboutUs.showFeedbackButton}
            feedbackButtonLink={aboutUs.feedbackButtonLink}
            feedbackButtonText={aboutUs.feedbackButtonText}
          />
        )}
        {aboutUs.showJoinCommunitySection && (
          <React.Fragment>
            <Space height={100} />
            <JoinCommunity removeFooterSpace={true} active={true} />
          </React.Fragment>
        )}
        <Footer activeMenu="about" additionalStyle={{ marginTop: `-90px` }} />
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  overflow: hidden;
`

export default AboutUs
