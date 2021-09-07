import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { Img, Letter, Space } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import StarRating from '~/components/Common/StarRating'
import StoreContext from '~/context/StoreContext'

import StarImg from '~/images/Assets/Star-active.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const Review = () => {
  const { locale } = useContext(StoreContext)
  const {
    check_icon,
    productReviews_en,
    productReviews_de,
    productReviews_ch,
  } = useStaticQuery(graphql`
    query {
      productReviews_en: allDatoCmsReview(
        filter: { published: { eq: true }, product: { locale: { eq: "en" } } }
        sort: { fields: published, order: ASC }
        limit: 1
      ) {
        edges {
          node {
            ...productReviews_commonFields
          }
        }
      }
      productReviews_de: allDatoCmsReview(
        filter: { published: { eq: true }, product: { locale: { eq: "de" } } }
        sort: { fields: published, order: ASC }
        limit: 1
      ) {
        edges {
          node {
            ...productReviews_commonFields
          }
        }
      }
      productReviews_ch: allDatoCmsReview(
        filter: {
          published: { eq: true }
          product: { locale: { eq: "en-CH" } }
        }
        sort: { fields: published, order: ASC }
        limit: 1
      ) {
        edges {
          node {
            ...productReviews_commonFields
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
    fragment productReviews_commonFields on DatoCmsReview {
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
  let productReviews = {}
  if (locale === 'en') {
    productReviews = productReviews_en
  } else if (locale === 'de') {
    productReviews = productReviews_de
  } else if (locale === 'en-CH') {
    productReviews = productReviews_ch
  }

  let reviews = []
  if (
    productReviews &&
    productReviews.edges &&
    productReviews.edges.length > 0
  ) {
    reviews = productReviews.edges.map(x => (
      <Container key={x.node.id}>
        <Logo>
          {x.node.reviewerImage && <Img fluid={x.node.reviewerImage.fluid} />}
          <br />
          {x.node.product && (
            <React.Fragment>
              {x.node.product.media.length > 0 && (
                <LazyLoad>
                  <Image
                    src={x.node.product.media[0].url}
                    alt={x.node.product.name}
                  />
                </LazyLoad>
              )}
              <GrayLetter size={13}>{x.node.product.name}</GrayLetter>
              {x.node.size && (
                <GrayLetter
                  size={13}
                >{`${x.node.size.name}.${x.node.size.helpText}`}</GrayLetter>
              )}
            </React.Fragment>
          )}
        </Logo>
        <LetterContainer>
          <br />
          <Title>
            <Contain>
              <Letter size={17} font="Titillium Bold">
                <label>{x.node.reviewerName}</label>
              </Letter>
              <Check>
                <Img fluid={check_icon.childImageSharp.fluid} />
              </Check>
            </Contain>
            <GrayLetter size={13}>
              <label>{x.node.reviewDate}</label>
            </GrayLetter>
          </Title>
          <Space height={20} />
          {x.node.starRating && <StarRating rating={x.node.starRating} />}
          <ReviewContent>
            <Letter1 size={15}>
              <label>{x.node.reviewContent}</label>
            </Letter1>
          </ReviewContent>
        </LetterContainer>
      </Container>
    ))
  }

  return (
    <div>
      <Space height={10} />
      <ReviewContainer>
        <img src={StarImg} alt="Star Image" />
        &nbsp;&nbsp;&nbsp;
        <Letter font="Titillium Bold" color={darkFont} size={26}>
          4.5
        </Letter>
        &nbsp;&nbsp;&nbsp;
        <Letter font="Titillium Web" color="#7D7F81" size={18}>
          /120 reviews
        </Letter>
      </ReviewContainer>
      <Space height={10} />
      {reviews}
      <Space height={25} />
      <Label>
        <Letter font="Titillium Web" size={14} color="#FF8C00">
          See All &nbsp; &nbsp;
          <img src={ArrowImg} alt="Arrow Image" />{' '}
        </Letter>
      </Label>
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0;
  padding-bottom: 30px;
  position: relative;
  background-color: rgb(243, 243, 248);
  display: flex;
`

const Contain = styled.div`
  display: flex;
  height: 25px;
`

const Image = styled.img`
  width: 40px;
`

const Logo = styled.div`
  width: 250%;
  height: 100%;
  padding: 15px;
`

const Title = styled.div`
  margin-left: 4px;
  margin-top: 10px;
  display: block;
`

const ReviewContent = styled.div`
  margin-left: 0px;
  font-family: Titillium Web;
  display: block;
`

const Letter1 = styled.div`
  font-size: ${props => props.size}px;
  padding: 3px 12px 3px 3px;
`

const GrayLetter = styled.div`
  font-size: ${props => props.size}px;
  color: gray;
  font-family: Titillium Web;
`

const LetterContainer = styled.div`
  width: 58%
  height: 100%;
`

const Check = styled.div`
  margin-top: 5px;
  margin-left: 9px;
  width: 15px;
`

const ReviewContainer = styled.div`
  & {
    text-align: center;
  }
  & img {
    margin-top: -10px;
  }
`

const Label = styled.div`
  float: right;
  margin-right: 18px;
  margin-top: 10px;
`

export default Review
