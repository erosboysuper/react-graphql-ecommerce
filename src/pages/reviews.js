import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import { darkFont } from '~/utils/colors'
import { Letter, Space, Img } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'
import ReviewItem3p from '~/components/Common/ReviewItem3p'

import TrustpilotLogo from '~/images/Assets/trustpilot-logo.svg'
import LoaderImg from '~/images/Assets/loader-pulse.svg'

const Reviews = ({ pageContext: { locale, localeFolder } }) => {
  const { reviewPage_en, reviewPage_de, reviewPage_ch } =
    useStaticQuery(graphql`
      query {
        reviewPage_en: datoCmsReviewPage(locale: { eq: "en" }) {
          ...reviewPage_commonFields
        }
        reviewPage_de: datoCmsReviewPage(locale: { eq: "de" }) {
          ...reviewPage_commonFields
        }
        reviewPage_ch: datoCmsReviewPage(locale: { eq: "en-CH" }) {
          ...reviewPage_commonFields
        }
      }
      fragment reviewPage_commonFields on DatoCmsReviewPage {
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
    `)
  let reviewPage = {}
  if (locale === 'en') {
    reviewPage = reviewPage_en
  } else if (locale === 'de') {
    reviewPage = reviewPage_de
  } else if (locale === 'en-CH') {
    reviewPage = reviewPage_ch
  }
  const seo = reviewPage.seo || {}
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  const _isMounted = useRef(true)
  const [reviewSummery, setReviewSummery] = useState([])
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadMoreButton, setLoadMoreButton] = useState(false)
  const [page, setPage] = useState(1)

  const getReviews = () => {
    return new Promise(resolve => {
      fetch(
        `https://api.trustpilot.com/v1/business-units/${process.env.TRUSTPILOT_ID}/reviews?apikey=${process.env.TRUSTPILOT_KEY}&perPage=100&page=${page}`
      )
        .then(res => res.json())
        .then(res => resolve(res))
    })
  }

  const afterFetchData = res => {
    let _reviews = []
    if (res && res.reviews) {
      _reviews = [...reviews, ...res.reviews]
    } else {
      _reviews = [...reviews]
    }

    if (_isMounted.current) {
      setReviews(_reviews)

      const hasNextPage = res.links.find(x => x.rel === 'next-page')
      if (hasNextPage) {
        setLoadMoreButton(true)
      } else {
        setLoadMoreButton(false)
      }
    }
  }

  const loadReviewContent = () => {
    const reviewSummeryApi = new Promise(resolve => {
      fetch(
        `https://api.trustpilot.com/v1/business-units/${process.env.TRUSTPILOT_ID}?apikey=${process.env.TRUSTPILOT_KEY}`
      )
        .then(res => res.json())
        .then(res => {
          if (_isMounted.current) {
            setReviewSummery(res)
          }
          resolve(true)
        })
    })

    const reviewsApi = new Promise(resolve => {
      getReviews().then(res => {
        afterFetchData(res)
        resolve(true)
      })
    })

    setIsLoading(true)
    Promise.all([reviewSummeryApi, reviewsApi]).then(() => {
      if (_isMounted.current) {
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    loadReviewContent()
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true)
      getReviews().then(res => {
        setIsLoading(false)
        afterFetchData(res)
      })
    }
  }, [page])

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
      <WholeContainer>
        <Contain>
          <Logo>
            {reviewPage.pageLogo && (
              <ImgContainer>
                <Img
                  fluid={reviewPage.pageLogo.fluid}
                  alt={reviewPage.pageTitle}
                />
              </ImgContainer>
            )}
            <Space height={5} />
            <Letter
              font="Titillium Black"
              size={26}
              sizeDesktop={40}
              color={darkFont}
            >
              {reviewPage.pageTitle}
            </Letter>
          </Logo>
          <BackImg
            onClick={() => {
              window.history.back()
            }}
          >
            <img src={ArrowBackImg} alt="Arrow " />
          </BackImg>
        </Contain>
        {reviews.length > 0 && (
          <React.Fragment>
            <ReviewSummeryDiv>
              Rated {reviewSummery.score.trustScore} / 5 based on {` `}
              <a
                href={`https://www.trustpilot.com/review/tbo.clothing`}
                target="_blank"
              >
                {reviewSummery.numberOfReviews.total} reviews
              </a>{' '}
              {` `}
              on
              <a
                href={`https://www.trustpilot.com/review/tbo.clothing`}
                target="_blank"
              >
                <img src={TrustpilotLogo} />
              </a>
            </ReviewSummeryDiv>
            <ReviewDiv>
              {reviews.map(review => (
                <ReviewItem3p review={review} key={review.id} />
              ))}
            </ReviewDiv>
          </React.Fragment>
        )}
        {isLoading && (
          <Loader>
            <img src={LoaderImg} alt="LoaderImg" />
          </Loader>
        )}
        {loadMoreButton && (
          <LoadMoreButton>
            <button onClick={() => setPage(page + 1)}>
              <Letter font="Titillium Bold" size={11} color="#161617">
                LOAD MORE
              </Letter>
            </button>
          </LoadMoreButton>
        )}
        <Footer activeMenu="reviews" />
      </WholeContainer>
    </React.Fragment>
  )
}

const Contain = styled.div`
  position: relative;
  margin-top: 70px;
  @media ${device.laptop} {
    width: 100%;
    margin: 10px;
    min-width: 370px;
    margin-top: 70px;
  }
`

const WholeContainer = styled.div`
  overflow: hidden;
`

const Logo = styled.div`
  text-align: center;
  padding-top: 40px;
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

const BackImg = styled.div`
  position: fixed;
  top: 25px;
  cursor: pointer;
  left: 20px;
  z-index: 1;
  & img {
    width: 58px;
  }
`

const ReviewSummeryDiv = styled.div`
  display: block;
  text-align: center;
  width: 100%;

  & img {
    height: 100px;
    margin-top: -10px;
  }
`

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  & img {
    height: 50px;
  }
`

const ReviewDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const LoadMoreButton = styled.div`
  width: 100%;
  margin: 20px 0px;
  display: flex;
  justify-content: center;

  & button {
    padding: 8px 40px;
    width: 50%;
  }
  @media ${device.laptop} {
    & button {
      width: 30%;
    }
  }
`

export default Reviews
