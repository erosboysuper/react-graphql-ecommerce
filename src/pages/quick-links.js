import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import { Letter, Space, Img } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'

const QuickLinks = ({ pageContext: { locale, localeFolder } }) => {
  const { quickLinksPage_en, quickLinksPage_de, quickLinksPage_ch } =
    useStaticQuery(graphql`
      query {
        quickLinksPage_en: datoCmsQuickLinksPage(locale: { eq: "en" }) {
          ...quickLinksPage_commonFields
        }
        quickLinksPage_de: datoCmsQuickLinksPage(locale: { eq: "de" }) {
          ...quickLinksPage_commonFields
        }
        quickLinksPage_ch: datoCmsQuickLinksPage(locale: { eq: "en-CH" }) {
          ...quickLinksPage_commonFields
        }
      }
      fragment quickLinksPage_commonFields on DatoCmsQuickLinksPage {
        id
        pageTitle
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
        quickLinks {
          id
          title
          link
        }
      }
    `)
  let quickLinksPage = {}
  if (locale === 'en') {
    quickLinksPage = quickLinksPage_en
  } else if (locale === 'de') {
    quickLinksPage = quickLinksPage_de
  } else if (locale === 'en-CH') {
    quickLinksPage = quickLinksPage_ch
  }
  const seo = quickLinksPage.seo || {}
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
      <Logo>
        {quickLinksPage.pageLogo && (
          <ImgContainer>
            <Img
              fluid={quickLinksPage.pageLogo.fluid}
              alt={quickLinksPage.pageTitle}
            />
          </ImgContainer>
        )}
        <Space height={15} />
        <Letter
          font="Titillium Black"
          size={26}
          sizeDesktop={40}
          color={darkFont}
        >
          {quickLinksPage.pageTitle}
        </Letter>
      </Logo>
      <Container>
        <LinkContainer>
          {quickLinksPage.quickLinks &&
            quickLinksPage.quickLinks.length > 0 &&
            quickLinksPage.quickLinks.map(link => {
              return (
                <LinkItem key={link.id}>
                  <Link to={link.link}>
                    <Letter font="Titillium Bold" size={20} color={darkFont}>
                      {link.title}
                    </Letter>
                  </Link>
                </LinkItem>
              )
            })}
        </LinkContainer>
      </Container>
      <Footer activeMenu="quick-links" />
    </React.Fragment>
  )
}

const Container = styled.div``

const Logo = styled.div`
  text-align: center;
  padding-top: 40px;
  margin-bottom: 60px;
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

const LinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
  @media ${device.laptop} {
    margin-bottom: 100px;
  }
`

const LinkItem = styled.div`
  width: 100%;
  display: flex;
  margin: 0px 10px 10px 10px;
  & a {
    border: solid 1px #ccc;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media ${device.laptop} {
    width: 24%;
    margin: 5px;
  }
`

export default QuickLinks
