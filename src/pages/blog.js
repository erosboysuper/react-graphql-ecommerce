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

const Blog = ({ pageContext: { locale, localeFolder } }) => {
  const {
    blogPage_en,
    blogPage_de,
    blogPage_ch,
    blogs_en,
    blogs_de,
    blogs_ch,
  } = useStaticQuery(graphql`
    query {
      blogPage_en: datoCmsBlogPage(locale: { eq: "en" }) {
        ...blogPage_commonFields
      }
      blogPage_de: datoCmsBlogPage(locale: { eq: "de" }) {
        ...blogPage_commonFields
      }
      blogPage_ch: datoCmsBlogPage(locale: { eq: "en-CH" }) {
        ...blogPage_commonFields
      }
      blogs_en: allDatoCmsBlog(
        filter: { isPublished: { eq: true }, locale: { eq: "en" } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            ...blogs_commonFields
          }
        }
      }
      blogs_de: allDatoCmsBlog(
        filter: { isPublished: { eq: true }, locale: { eq: "de" } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            ...blogs_commonFields
          }
        }
      }
      blogs_ch: allDatoCmsBlog(
        filter: { isPublished: { eq: true }, locale: { eq: "en-CH" } }
        sort: { fields: position, order: ASC }
      ) {
        edges {
          node {
            ...blogs_commonFields
          }
        }
      }
    }
    fragment blogPage_commonFields on DatoCmsBlogPage {
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
    }
    fragment blogs_commonFields on DatoCmsBlog {
      id
      title
      handle
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
      category {
        id
        title
      }
    }
  `)
  let blogPage = {}
  let blogs = {}
  if (locale === 'en') {
    blogs = blogs_en
    blogPage = blogPage_en
  } else if (locale === 'de') {
    blogs = blogs_de
    blogPage = blogPage_de
  } else if (locale === 'en-CH') {
    blogs = blogs_ch
    blogPage = blogPage_ch
  }
  const seo = blogPage.seo || {}
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
        {blogPage.pageLogo && (
          <ImgContainer>
            <Img fluid={blogPage.pageLogo.fluid} alt={blogPage.pageTitle} />
          </ImgContainer>
        )}
        <Space height={15} />
        <Letter
          font="Titillium Black"
          size={26}
          sizeDesktop={40}
          color={darkFont}
        >
          {blogPage.pageTitle}
        </Letter>
      </Logo>
      <Container>
        {blogs.edges &&
          blogs.edges.length > 0 &&
          blogs.edges.map(({ node: blog }) => (
            <BlogContainer key={blog.id}>
              <Link to={`/${localeFolder}/blog/${blog.handle}`}>
                {blog.image && blog.image.fluid && (
                  <Img fluid={blog.image.fluid} alt={blog.title} />
                )}
                <Letter font="Titillium Bold" size={20} color={darkFont}>
                  {blog.title}
                </Letter>
              </Link>
              {blog.category.length > 0 && (
                <CategoryContainer>
                  {blog.category.map(cate => (
                    <CategoryButton key={cate.id}>{cate.title}</CategoryButton>
                  ))}
                </CategoryContainer>
              )}
            </BlogContainer>
          ))}
      </Container>
      <Footer activeMenu="blog" />
    </React.Fragment>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 100px;
  }
`

const BlogContainer = styled.div`
  margin: 17px 17px 40px 17px;

  & div {
    margin-bottom: 10px;
  }
  @media ${device.laptop} {
    width: 27%;
    display: inline-block;
    margin: 15px;
  }
`

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

const CategoryContainer = styled.div`
  display: flex;
  flex-flow: wrap;
`

const CategoryButton = styled.div`
  margin-right: 10px;
  padding: 3px 20px;
  border-radius: 20px;
  border: 1px solid #ff8c00;
  color: #ff8c00;
  font-size: 14px;
`

export default Blog
