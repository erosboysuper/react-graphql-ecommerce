import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import ReviewItem3p from '~/components/Common/ReviewItem3p'
import StarImg from '~/images/Assets/rating-star-active.svg'

const ProductReviews = ({ product, productRating = {} }) => {
  const _isMounted = useRef(true)
  const [reviews, setReviews] = useState([])

  const productReview = sku => {
    const internalReviews = new Promise(resolve => {
      fetch(
        `https://api.trustpilot.com/v1/product-reviews/business-units/${process.env.TRUSTPILOT_ID}/reviews?apikey=${process.env.TRUSTPILOT_KEY}&sku=${sku}&perPage=100`
      )
        .then(res => res.json())
        .then(res => resolve(res))
    })

    const importedReviews = new Promise(resolve => {
      fetch(
        `https://api.trustpilot.com/v1/product-reviews/business-units/${process.env.TRUSTPILOT_ID}/imported-reviews?apikey=${process.env.TRUSTPILOT_KEY}&sku=${sku}&perPage=100`
      )
        .then(res => res.json())
        .then(res => resolve(res))
    })

    Promise.all([internalReviews, importedReviews]).then(values => {
      if (_isMounted.current) {
        let _reviews = []
        values.forEach(res => {
          _reviews = [..._reviews, ...res.productReviews]
        })
        _reviews = _reviews.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        setReviews(_reviews)
      }
    })
  }

  useEffect(() => {
    if (product.productReviewGroup && product.productReviewGroup.products) {
      let sku = []
      product.productReviewGroup.products.forEach(prod => {
        const _sku = prod.variant.map(x => x.sku)
        sku = [...sku, ..._sku]
      })
      sku = sku.join()
      productReview(sku)
    }
    return () => {
      _isMounted.current = false
    }
  }, [product])

  return reviews.length > 0 ? (
    <Content>
      <DesktopContainer>
        <ReviewTitle>
          <HeadTitle>
            <Letter
              font="Titillium Black"
              size={46}
              sizeMobileS={36}
              sizeTablet={40}
              sizeDesktop={46}
              sizeLaptopL={38}
              sizeLaptop={30}
            >
              Reviews
            </Letter>
          </HeadTitle>
          <ReviewScore>
            <img src={StarImg} alt="StarImg" /> {` `}
            <Letter
              font="Titillium Black"
              size={28}
              sizeMobileS={17}
              sizeMobileM={18}
              sizeTablet={22}
              sizeDesktop={28}
              sizeLaptop={20}
              sizeLaptopL={24}
            >
              {productRating.starsAverage}
            </Letter>
            <Letter
              font="Titillium Black"
              size={19}
              sizeMobileS={15}
              sizeMobileM={16}
              sizeTablet={17}
              sizeDesktop={19}
              sizeLaptopL={16}
              sizeLaptop={13}
            >
              /{productRating.numberOfReviews} reviews
            </Letter>
          </ReviewScore>
        </ReviewTitle>
      </DesktopContainer>
      <ReviewContent>
        {reviews.map(review => (
          <Container key={review.createdAt}>
            <ReviewItem3p review={review} />
          </Container>
        ))}
      </ReviewContent>
    </Content>
  ) : null
}

const ReviewContent = styled.div`
  width: auto;
  display: -webkit-box;
  overflow: scroll;
  @media ${device.laptop} {
    width: 80%;
    display: flex;
    margin-left: 5%;
    overflow-y: hidden;
  }
`
const Container = styled.div`
  position: relative;
  margin-top: 30px;
  width: 75%;
  margin-right: 5px;
  & > div {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 45%;
  }
  @media ${device.laptop} {
    width: 20%;
    min-width: 370px;
    margin-top: 30px;
  }
  @media ${device.laptopL} {
    margin-top: 50px;
  }
  @media ${device.desktop} {
    margin-top: 70px;
  }
`
const Content = styled.div`
  overflow: auto;
  @media ${device.laptop} {
    display: flex;
    padding-left: 10%;
  }
`
const ReviewTitle = styled.div`
  text-align: end;
`
const HeadTitle = styled.div``
const ReviewScore = styled.div`
  margin-top: -12px;
  display: flex;
  align-items: baseline;
  & img {
    width: 14px;
  }
  @media ${device.laptop} {
    width: 100%;
    & img {
      width: 14px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 17px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 20px;
    }
  }
`
const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media ${device.laptop} {
    width: 15%;
    & img {
      width: 14px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 20px;
    }
  }
`

export default ProductReviews
