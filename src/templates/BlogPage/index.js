import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import { MediaBlock } from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'

import { device } from '~/utils/device'
import { Letter, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'
import ProductSale from '~/components/Common/ProductSale'
import TopicComments from '~/components/pages/community/TopicComments'
import CommunityModals from '~/components/Common/CommunityModals'

import ArrowBackImg from '~/images/Assets/Arrow-back.svg'
import Facebook from '~/images/Assets/DESKTOP-Facebook.png'
import Reddit from '~/images/Assets/reddit-icon.svg'
import Twitter from '~/images/Assets/DESKTOP-Twitter.png'

const BlogPage = ({ data, pageContext: { locale, localeFolder } }) => {
  const _isMounted = useRef(true)
  const [topic, setTopic] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  const { getBlogTopic } = useContext(CommunityContext)
  const blogPage = data.datoCmsBlog || {}
  // const datoCmsBlogPage = data.datoCmsBlogPage || {}
  const seo = blogPage.seo || {}

  const usStoreRating = data.usStoreRating || {}
  if (usStoreRating.relatedProduct) {
    blogPage.relatedProduct = blogPage.relatedProduct.map(relatedProd => {
      const _foundData = usStoreRating.relatedProduct.find(
        x => x.handle === relatedProd.handle
      )
      if (_foundData) {
        relatedProd['productReviewGroup'] = _foundData.productReviewGroup || {}
      }
      return relatedProd
    })
  }

  const socialIcons = () => {
    let pageURL, pageTitle
    if (typeof window !== 'undefined') {
      pageURL = window.location.href
      pageTitle = seo.title || blogPage.title
    }
    return (
      <SocialIconWrapper>
        <FacebookShareButton url={pageURL}>
          <SocialIcon src={Facebook} alt="Facebook" />
        </FacebookShareButton>
        <RedditShareButton url={pageURL} title={pageTitle}>
          <SocialIcon src={Reddit} alt="Reddit" />
        </RedditShareButton>
        <TwitterShareButton url={pageURL} title={pageTitle}>
          <SocialIcon src={Twitter} alt="Twitter" />
        </TwitterShareButton>
      </SocialIconWrapper>
    )
  }

  useEffect(() => {
    let blog_id = blogPage && blogPage.id ? blogPage.id : null
    if (blog_id && _isMounted.current) {
      blog_id = `${blog_id}`.match(/\d+/gi, '')
      if (blog_id) {
        blog_id = blog_id[0]
        setIsLoading(true)
        getBlogTopic(blog_id).then(res => {
          if (_isMounted.current) {
            const _topic = res && res.length > 0 ? res[0] : null
            setTopic(_topic)
            setIsLoading(false)
          }
        })
      }
    }
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO
        title={seo.title || blogPage.title}
        description={seo.description || blogPage.title}
        image={seo.image ? seo.image.url : null}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          seo.title,
          blogPage.title,
        ]}
      />
      <Header />
      <Container>
        <HeaderWrapper>
          <BackImg onClick={() => window.history.back()}>
            <img src={ArrowBackImg} alt="Arrow Back" />
          </BackImg>
          {/* {datoCmsBlogPage.pageLogo && (
            <LogoImg>
              <Img
                fluid={datoCmsBlogPage.pageLogo.fluid}
                alt={blogPage.title}
              />
            </LogoImg>
          )} */}
          {blogPage.image && (
            <HeaderBackground>
              <Img
                fluid={blogPage.image.fluid}
                alt={blogPage.title}
                hideBottom={true}
              />
            </HeaderBackground>
          )}
          <HeaderTitle>{blogPage.title}</HeaderTitle>
        </HeaderWrapper>
        {blogPage.category.length > 0 && (
          <CategoryContainer>
            {blogPage.category.map(cate => (
              <CategoryButton key={cate.id}>{cate.title}</CategoryButton>
            ))}
          </CategoryContainer>
        )}
        <BodyContainer>
          <BodyLeft>
            <MobileSocialWrapper>
              <BodyRightHeaderTitle>
                {blogPage.meta.createdAt}
              </BodyRightHeaderTitle>
              {socialIcons()}
            </MobileSocialWrapper>
            <LetterWrapper>
              <Letter
                font="Titillium Light"
                size={18}
                color={darkFont}
                dangerouslySetInnerHTML={{ __html: blogPage.description || '' }}
              />
            </LetterWrapper>
            <CommentContainer>
              <Divider />
              {isLoading === true && (
                <PlaceholderDiv>
                  <MediaBlock color="#E0E0E0" rows={4} />
                </PlaceholderDiv>
              )}
              {topic && <TopicComments topic={topic} />}
            </CommentContainer>
          </BodyLeft>
          <BodyRight>
            <BodyRightHeader>
              <BodyRightHeaderTitle>
                {blogPage.meta.createdAt}
              </BodyRightHeaderTitle>
              {socialIcons()}
            </BodyRightHeader>

            {blogPage.relatedProduct.length > 0 && (
              <FavouriteContainer>
                <BodyRightTitle>More from our Products</BodyRightTitle>
                {blogPage.relatedProduct.map(product => {
                  return <ProductSale key={product.id} product={product} />
                })}
              </FavouriteContainer>
            )}

            {blogPage.relatedBlogs.length > 0 && (
              <BlogMore>
                <BlogMoreTitle>More from our Blog</BlogMoreTitle>
                {blogPage.relatedBlogs.map(blog => (
                  <BlogMoreItem key={blog.id}>
                    <Link to={`/${localeFolder}/blog/${blog.handle}`}>
                      {blog.image && (
                        <BlogMoreImg>
                          <Img
                            fluid={blog.image.fluid}
                            alt={blog.title}
                            hideBottom={true}
                          />
                        </BlogMoreImg>
                      )}
                      <BlogMoreItemTitle>{blog.title}</BlogMoreItemTitle>
                    </Link>
                    {blog.category.length > 0 && (
                      <BlogMoreCategoryWrapper>
                        {blog.category.map(cate => (
                          <BlogMoreCategoryButton key={cate.id}>
                            {cate.title}
                          </BlogMoreCategoryButton>
                        ))}
                      </BlogMoreCategoryWrapper>
                    )}
                  </BlogMoreItem>
                ))}
              </BlogMore>
            )}
          </BodyRight>
        </BodyContainer>
      </Container>
      <Footer activeMenu="blog" />
      <CommunityModals />
    </React.Fragment>
  )
}

const Container = styled.div`
  font-family: Titillium Web;
  font-size: 18px;
`

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 0px;
  @media ${device.tablet} {
    margin-bottom: 40px;
  }
`

const BackImg = styled.div`
  position: fixed;
  left: 20px;
  top: 25px;
  width: 60px;
  height: 60px;
  z-index: 3;
  &:hover {
    transform: scale(1.1);
  }
`

// const LogoImg = styled.div`
//   display: none;
//   position: absolute;
//   top: 40px;
//   left: 50%;
//   width: 150px;
//   height: auto;
//   transform: translate(-50%, 0);
//   z-index: 2;
//   @media ${device.tablet} {
//     display: block;
//     width: 240px;
//   }
// `

const HeaderBackground = styled.div`
  width: 100%;
  height: auto;
`

const HeaderTitle = styled.div`
  position: relative;
  max-width: 85%;
  padding: 20px;
  height: auto;
  background-color: white;
  font-size: 45px;
  font-family: Titillium Black;
  font-size: 24px;
  line-height: 1.2;
  @media ${device.mobileL} {
    font-size: 27px;
  }
  @media ${device.tablet} {
    padding: 20px 40px 20px 70px;
    font-size: 28px;
    position: absolute;
    bottom: -40px;
    left: 0;
  }
  @media ${device.laptop} {
    font-size: 35px;
  }
  @media ${device.laptopL} {
    font-size: 45px;
    letter-spacing: 2px;
  }
`

const CategoryContainer = styled.div`
  display: flex;
  margin: 0px 20px 30px 20px;
  @media ${device.tablet} {
    margin: 30px 0px 0px 70px;
  }
`

const CategoryButton = styled.div`
  margin-right: 15px;
  padding: 3px 20px;
  border-radius: 20px;
  border: 1px solid #ff8c00;
  color: #ff8c00;
  font-size: 16px;
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 100%;
  @media ${device.tablet} {
    flex-direction: row;
    margin-top: 60px;
  }
`

const BodyLeft = styled.div`
  width: 100%;
  padding: 0px 15px;
  @media ${device.tablet} {
    width: 64%;
    padding-left: 70px;
    margin-bottom: 30px;
  }
`

const MobileSocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: #f7f7fa;
  width: 100vw;
  margin-left: -15px;
  margin-bottom: 15px;
  @media ${device.tablet} {
    display: none;
  }
`

const LetterWrapper = styled.div`
  width: 100%;
`

const BodyRight = styled.div`
  width: 100%;
  padding: 0px 10px;
  @media ${device.tablet} {
    width: 36%;
    padding: 0px 70px;
  }
`

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`

const Divider = styled.div`
  width: 120px;
  border: 2px solid black;
  margin-bottom: 20px;
  margin-left: -15px;
  @media ${device.tablet} {
    margin-left: 0px;
  }
`

const BodyRightHeader = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #f7f7fa;
    padding: 20px 10px;
    margin-bottom: 50px;
  }
`

const BodyRightHeaderTitle = styled.div`
  color: #a9acaf;
  font-size: 18px;
  font-family: Titillium Bold;
  padding-left: 15px;
  @media ${device.tablet} {
    padding-left: 0px;
  }
`

const SocialIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  @media ${device.tablet} {
    justify-content: space-around;
    width: 100%;
    padding: 20px 0px;
  }
`

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
  margin: 0px 10px;
  @media ${device.tablet} {
    width: 40px;
    height: 40px;
  }
`

const FavouriteContainer = styled.div`
  position: relative;
  @media ${device.tablet} {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

const BodyRightTitle = styled.div`
  font-size: 26px;
  font-family: Titillium Black;
  margin-bottom: 20px;
  line-height: 1;
`

const BlogMore = styled.div`
  margin-top: 40px;
`

const BlogMoreTitle = styled.div`
  font-size: 26px;
  font-family: 'Titillium Black';
  margin-bottom: 20px;
`

const BlogMoreItem = styled.div`
  margin-bottom: 30px;
`

const BlogMoreImg = styled.div`
  width: 100%;
  height: auto;
`

const BlogMoreCategoryWrapper = styled.div`
  display: flex;
  margin-bottom: 35px;
`

const BlogMoreCategoryButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ff8c00;
  color: #ff8c00;
  border-radius: 20px;
  padding: 5px 20px;
  font-size: 14px;
  margin-right: 15px;
`

const BlogMoreItemTitle = styled.div`
  font-size: 22px;
  font-family: Titillium Bold;
  margin: 10px 0px;
  color: ${darkFont};
`

const PlaceholderDiv = styled.div`
  padding: 16px;
`

export default BlogPage

export const query = graphql`
  query ($handle: String!, $locale: String!) {
    datoCmsBlogPage {
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
    }
    usStoreRating: datoCmsBlog(locale: { eq: "en" }, handle: { eq: $handle }) {
      relatedProduct {
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
    datoCmsBlog(locale: { eq: $locale }, handle: { eq: $handle }) {
      id
      description
      title
      handle
      meta {
        createdAt(formatString: "DD MMM YYYY")
      }
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
      seo {
        title
        description
        image {
          url
        }
      }
      category {
        id
        title
      }
      relatedBlogs {
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
      relatedProduct {
        id
        name
        handle
        shopifyId
        description
        availableForSale
        isFadingOut
        isInFunding
        isTboCommunity
        isLimitedEdition
        isSingleProduct
        availabilityDate
        media {
          url
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "300" }) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
        variant {
          id
          sku
          shopifyId
          weight
          price
          compareAtPrice
          barcode
          weightUnit
          availableForSale
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
          images {
            url
            fluid(
              forceBlurhash: true
              maxWidth: 910
              imgixParams: { w: "300" }
            ) {
              sizes
              aspectRatio
              src
              srcSet
              width
              height
            }
          }
        }
      }
    }
  }
`
