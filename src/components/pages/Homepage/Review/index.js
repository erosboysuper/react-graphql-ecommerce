import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { Space } from '~/utils/styles'
import { device } from '~/utils/device'

import SubTitle from '~/components/Common/SubTitle'
import ReviewItem from '~/components/Common/ReviewItem'

const Review = ({ reviewHeading, reviewAnchorText, reviewAnchorLink }) => {
  const { locale } = useContext(StoreContext)
  const { userReviews_en, userReviews_de, userReviews_ch } =
    useStaticQuery(graphql`
      query {
        userReviews_en: allDatoCmsReview(
          filter: { published: { eq: true }, product: { locale: { eq: "en" } } }
          sort: { fields: published, order: ASC }
          limit: 8
        ) {
          edges {
            node {
              ...userReviews_commonFields
            }
          }
        }
        userReviews_de: allDatoCmsReview(
          filter: { published: { eq: true }, product: { locale: { eq: "de" } } }
          sort: { fields: published, order: ASC }
          limit: 8
        ) {
          edges {
            node {
              ...userReviews_commonFields
            }
          }
        }
        userReviews_ch: allDatoCmsReview(
          filter: {
            published: { eq: true }
            product: { locale: { eq: "en-CH" } }
          }
          sort: { fields: published, order: ASC }
          limit: 8
        ) {
          edges {
            node {
              ...userReviews_commonFields
            }
          }
        }
        check_icon: file(relativePath: { eq: "Assets/check-icon.png" }) {
          childImageSharp {
            fluid {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
      fragment userReviews_commonFields on DatoCmsReview {
        id
        reviewerName
        reviewDate
        starRating
        reviewContent
        reviewerImage {
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
        product {
          id
          name
          handle
          media {
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
        }
        size {
          id
          name
          helpText
        }
      }
    `)
  let userReviews = {}
  if (locale === 'en') {
    userReviews = userReviews_en
  } else if (locale === 'de') {
    userReviews = userReviews_de
  } else if (locale === 'en-CH') {
    userReviews = userReviews_ch
  }

  let reviews = []
  if (userReviews && userReviews.edges && userReviews.edges.length > 0) {
    reviews = userReviews.edges.map(x => (
      <Container key={x.node.id}>
        <ReviewItem data={x.node} />
      </Container>
    ))
  }

  return (
    <ContainerUI>
      <Space height={40} />
      <TitleContainer>
        <SubTitle
          title={reviewHeading}
          subtitle={reviewAnchorText}
          link={reviewAnchorLink}
        />
      </TitleContainer>
      <Space height={5} />
      <ReviewContainer>
        <ReviewContain width={userReviews.edges ? userReviews.edges.length : 0}>
          {reviews}
        </ReviewContain>
        <DesktopContainer>
          <ReviewDesktopContain
            width={userReviews.edges ? userReviews.edges.length : 0}
          >
            {reviews}
          </ReviewDesktopContain>
        </DesktopContainer>
        <Contain1>
          <SubTitle
            title={reviewHeading}
            subtitle={reviewAnchorText}
            link={reviewAnchorLink}
          />
        </Contain1>
      </ReviewContainer>
    </ContainerUI>
  )
}

const ContainerUI = styled.div`
  @media ${device.laptop} {
    margin-top: 200px;
  }
`

const TitleContainer = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`

const Contain1 = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    position: absolute;
    right: 15%;
    top: 25%;
  }
`

const ReviewContainer = styled.div`
  overflow: auto;
  display: -webkit-box;
  padding-bottom: 40px;
  position: relative;
  @media ${device.laptop} {
    padding-left: 7%;
    overflow: unset;
  }
`

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0;
  padding-bottom: 30px;
  position: relative;
  display: flex;
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.laptop} {
    width: 20vw;
    margin-right: 29px;
    display: block;
    min-width: 250px;
  }
`

const ReviewContain = styled.div`
  display: flex;
  width: ${props => props.width * 100}%;
  @media ${device.tablet} {
    width: ${props => props.width * 50}%;
  }
  @media ${device.laptop} {
    display: none;
    width: 70%;
    overflow: auto;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 68%;
    overflow: auto;
    overflow-y: hidden;
  }
`

const ReviewDesktopContain = styled.div`
  width: ${props => (props.width * 100) / 3}%;
  overflow: auto;
  display: flex;
`

export default Review
