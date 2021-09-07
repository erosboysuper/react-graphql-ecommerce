import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'
import CommitmentHeader from '~/components/pages/Commitment/CommitmentHeader'
import CommitmentOne from '~/components/pages/Commitment/CommitmentOne'
import CommitmentTwo from '~/components/pages/Commitment/CommitmentTwo'
import CommitmentSpecs from '~/components/pages/Commitment/CommitmentSpecs'
import CommitmentThree from '~/components/pages/Commitment/CommitmentThree'
import TouchPanel from '~/components/pages/Commitment/TouchPanel'

const CommitmentPage = ({ pageContext: { locale, localeFolder } }) => {
  const { commitment_en, commitment_de, commitment_ch } =
    useStaticQuery(graphql`
      query {
        commitment_en: datoCmsCommitmentPage(locale: { eq: "en" }) {
          ...commitment_commonFields
        }
        commitment_de: datoCmsCommitmentPage(locale: { eq: "de" }) {
          ...commitment_commonFields
        }
        commitment_ch: datoCmsCommitmentPage(locale: { eq: "en-CH" }) {
          ...commitment_commonFields
        }
      }
      fragment commitment_commonFields on DatoCmsCommitmentPage {
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
        section1Title
        section1SubTitle
        section1Description
        section1Button1Text
        section1Button1Link
        section1Button2Text
        section1Button2Link
        section1Image {
          url
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        section2Title
        section2SubTitle
        section2Description
        section2Image {
          url
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        section3Title
        section3SubTitle
        section3Description
        section3ButtonText
        section3ButtonLink
        section3Image {
          url
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        section3Icon {
          url
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        wantToPartnerTitle
        wantToPartnerButtonText
        commitmentHighlight {
          id
          title
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
  let commitment = {}
  if (locale === 'en') {
    commitment = commitment_en
  } else if (locale === 'de') {
    commitment = commitment_de
  } else if (locale === 'en-CH') {
    commitment = commitment_ch
  }
  const seo = commitment.seo || {}
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
      <CommitmentHeader
        pageTitle={commitment.pageTitle}
        pageDescription={commitment.pageDescription}
        pageImage={commitment.pageImage}
        desktopPageImage={commitment.desktopPageImage}
      />
      <CommitmentOne
        section1Title={commitment.section1Title}
        section1SubTitle={commitment.section1SubTitle}
        section1Description={commitment.section1Description}
        section1Button1Text={commitment.section1Button1Text}
        section1Button1Link={commitment.section1Button1Link}
        section1Button2Text={commitment.section1Button2Text}
        section1Button2Link={commitment.section1Button2Link}
        section1Image={commitment.section1Image}
      />
      <CommitmentTwo
        section2Title={commitment.section2Title}
        section2SubTitle={commitment.section2SubTitle}
        section2Description={commitment.section2Description}
        section2Image={commitment.section2Image}
      />
      {commitment.commitmentHighlight.length > 0 && (
        <CommitmentSpecs commitmentHighlight={commitment.commitmentHighlight} />
      )}
      <CommitmentThree
        section3Title={commitment.section3Title}
        section3SubTitle={commitment.section3SubTitle}
        section3Description={commitment.section3Description}
        section3ButtonText={commitment.section3ButtonText}
        section3ButtonLink={commitment.section3ButtonLink}
        section3Image={commitment.section3Image}
        section3Icon={commitment.section3Icon}
      />
      <TouchPanel
        wantToPartnerTitle={commitment.wantToPartnerTitle}
        wantToPartnerButtonText={commitment.wantToPartnerButtonText}
      />
      <Footer activeMenu="commitment" />
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

export default CommitmentPage
