import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import StarRating from '~/components/Common/StarRating'

const ProductRating = ({ product, setProductRating }) => {
  const _isMounted = useRef(true)
  const [rating, setRating] = useState({})

  const productReviewSummery = sku => {
    const internalReviews = new Promise(resolve => {
      fetch(
        `https://api.trustpilot.com/v1/product-reviews/business-units/${process.env.TRUSTPILOT_ID}?apikey=${process.env.TRUSTPILOT_KEY}&sku=${sku}`
      )
        .then(res => res.json())
        .then(res => resolve(res))
    })

    const importedReviews = new Promise(resolve => {
      fetch(
        `https://api.trustpilot.com/v1/product-reviews/business-units/${process.env.TRUSTPILOT_ID}/imported-reviews-summaries?apikey=${process.env.TRUSTPILOT_KEY}&sku=${sku}`
      )
        .then(res => res.json())
        .then(res => resolve(res))
    })

    Promise.all([internalReviews, importedReviews]).then(values => {
      if (_isMounted.current) {
        const _rating = {
          numberOfReviews: 0,
          starsAverage: 0,
        }
        const ratings = values.filter(x => x.starsAverage)
        ratings.forEach(res => {
          _rating.numberOfReviews += res.numberOfReviews.total
          _rating.starsAverage += res.starsAverage
        })
        _rating.starsAverage = ratings.reduce((prev, current) => {
          return prev.starsAverage > current.starsAverage
            ? prev.starsAverage
            : current.starsAverage
        }, 0)
        setRating(_rating)
        if (typeof setProductRating !== 'undefined') {
          setProductRating(_rating)
        }
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
      productReviewSummery(sku)
    }
    return () => {
      _isMounted.current = false
    }
  }, [product])

  return rating.numberOfReviews ? (
    <Container>
      <StarRating rating={rating.starsAverage} />
      <span>
        {` `}({rating.numberOfReviews})
      </span>
    </Container>
  ) : null
}

const Container = styled.div`
  display: flex;
  color: #ffc108;
`

export default ProductRating
