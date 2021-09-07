import React from 'react'
import styled from 'styled-components'

import ActiveIcon from '~/images/Assets/rating-star-active.svg'
import InActiveIcon from '~/images/Assets/rating-star-inactive.svg'
import HalfActiveIcon from '~/images/Assets/rating-star-active-half.svg'

const StarRating = ({ rating = 5 }) => {
  rating = parseFloat(rating)
  return (
    <Container>
      {[1, 2, 3, 4, 5].map(index => (
        <Star key={index}>
          <img
            src={
              index <= rating
                ? ActiveIcon
                : index > rating && rating > index - 1
                ? HalfActiveIcon
                : InActiveIcon
            }
          />
        </Star>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: block;
`

const Star = styled.span`
  & img {
    height: 14px;
  }
`

export default StarRating
