import React from 'react'
import styled from 'styled-components'

import { MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'

import ReviewItem from '~/components/Common/ReviewItem'
import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

const ReviewList = ({ closeCB }) => {
  const reviewList = []
  return (
    <Container>
      <MobileContain>
        <img src={ArrowBackImg} onClick={() => closeCB()} />
      </MobileContain>
      {reviewList.map(item => {
        return <ReviewItem button={false} data={item} />
      })}
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: 103;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  background: white;
  padding-top: 38px;
  @media ${device.laptop} {
    padding-left: 30px;
    position: relative;
    min-height: unset;
    left: unset;
    bottom: unset;
    overflow-y: unset;
    height: unset;
    background: unset;
  }
`

export default ReviewList
