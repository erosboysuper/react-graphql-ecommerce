import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Letter, Space, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'

import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import FAQs from '~/components/Common/FAQs'
import Footer from '~/components/Common/Footer'

const ContentPage = ({ data, pageContext: { locale, localeFolder } }) => {
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  const contentPage = data.datoCmsContentPage || {}
  const seo = contentPage.seo || {}

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO
        title={seo.title || contentPage.title}
        description={seo.description || contentPage.title}
        image={seo.image ? seo.image.url : null}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          seo.title,
          contentPage.title,
        ]}
      />
      <Header />
      <Logo>
        <BackImg
          onClick={() => {
            window.history.back()
          }}
        >
          <img src={ArrowBackImg} alt="Arrow Back" />
        </BackImg>
        {contentPage.pageLogo && (
          <ImgContainer>
            <Img fluid={contentPage.pageLogo.fluid} alt={contentPage.title} />
          </ImgContainer>
        )}
        <Space height={15} />
        <Letter
          font="Titillium Black"
          size={26}
          sizeDesktop={40}
          color={darkFont}
        >
          {contentPage.title}
        </Letter>
      </Logo>
      <LetterContain>
        {contentPage.isFaqsPage ? (
          <FAQs faqs={contentPage.faqs} individualPage={true} />
        ) : (
          <Letter
            font="Titillium Light"
            size={18}
            color={darkFont}
            dangerouslySetInnerHTML={{ __html: contentPage.description || '' }}
          />
        )}
      </LetterContain>
      <Footer activeMenu="contentpage" slug={contentPage.handle} />
    </React.Fragment>
  )
}

const LetterContain = styled.div`
  padding: 50px 0px 0px 0px;
  max-width: 1200px;
  margin: 0 auto;
`

const BackImg = styled.div`
  & {
    position: fixed;
    top: 25px;
    left: 20px;
    z-index: 1;
    cursor: pointer;
  }
  & img {
    width: 58px;
  }
`

const Logo = styled.div`
  text-align: center;
  padding-top: 40px;
  position: relative;
`

const ImgContainer = styled.div`
  width: 164px;
  margin: 0px auto;

  & div {
    margin-bottom: 0px;
  }
  @media ${device.laptop} {
    width: 300px;
  }
`

export default ContentPage

export const query = graphql`
  query ($handle: String!, $locale: String!) {
    datoCmsContentPage(locale: { eq: $locale }, handle: { eq: $handle }) {
      id
      title
      handle
      description
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
      isFaqsPage
      faqs {
        id
        title
        description
        isPublished
      }
      seo {
        title
        description
        image {
          url
        }
      }
    }
  }
`
