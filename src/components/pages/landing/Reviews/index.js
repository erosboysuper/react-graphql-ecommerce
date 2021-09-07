import React from 'react'
import styled from 'styled-components'

import { Space, Letter } from '~/utils/styles'
import { device } from '~/utils/device'

import ReviewItem from '~/components/Common/ReviewItem'

const Reviews = ({ reviewTitle, reviewHeading, reviews }) => {
  reviews = reviews || []
  let _reviews = []
  if (reviews.length > 0) {
    _reviews = reviews.map(node => (
      <Container key={node.id}>
        <ReviewItem data={node} button={false} />
      </Container>
    ))
  }

  return (
    <React.Fragment>
      <SpaceContainer display={reviews.length > 0 ? 'none' : 'block'}>
        <Space height={140}></Space>
      </SpaceContainer>
      <ContainerUI display={reviews.length > 0 ? 'block' : 'none'}>
        <Space height={40} />
        <Space height={5} />
        <Title>
          <div>
            <Letter
              font="Titillium Black"
              sizeDesktop={42}
              sizeLaptopL={36}
              sizeLaptop={26}
              sizeMobileS={23}
              sizeMobileM={26}
              sizeMobileL={26}
              color="#202122"
            >
              {reviewTitle}
            </Letter>
          </div>
          <SubTitle>
            <Letter
              font="Titillium Light"
              sizeDesktop={50}
              sizeLaptopL={40}
              sizeLaptop={30}
              sizeMobileS={23}
              sizeMobileM={26}
              sizeMobileL={26}
            >
              {reviewHeading}
            </Letter>
          </SubTitle>
        </Title>
        <ReviewContainer>
          <ReviewContain width={_reviews.length}>{_reviews}</ReviewContain>
          <DesktopContainer>
            <ReviewDesktopContain
              width={_reviews.length}
              display={_reviews.length > 3 ? 'flex-start' : 'center'}
            >
              {_reviews}
            </ReviewDesktopContain>
          </DesktopContainer>
        </ReviewContainer>
      </ContainerUI>
    </React.Fragment>
  )
}

const ContainerUI = styled.div`
  display: ${props => props.display};
  @media ${device.laptop} {
    margin-top: 140px;
  }
  @media ${device.laptopL} {
    margin-top: 200px;
  }
`

const Title = styled.div`
  text-align: center;
  margin-bottom: 43px;
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
  @media ${device.mobileS} {
    padding-bottom: 10px;
    > * {
      &:first-child {
        width: 100%;
      }
    }
  }
  @media ${device.tablet} {
    padding-bottom: 30px;
    width: 50%;
    > * {
      &:first-child {
        width: unset;
      }
    }
  }
  @media ${device.laptop} {
    width: 21vw;
    margin-right: 29px;
    display: block;
    min-width: 250px;
  }
`

const ReviewContain = styled.div`
  display: flex;
  width: ${props => props.width * 100}%;
  @media ${device.mobileS} {
    display: block;
    width: unset;
  }
  @media ${device.tablet} {
    display: flex;
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
    width: 93%;
    overflow: auto;
    overflow-y: hidden;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }
`

const ReviewDesktopContain = styled.div`
  width: ${props => (props.width * 100) / 4}%;
  overflow: auto;
  display: flex;
  justify-content: ${props => props.display};
  @media ${device.laptop} {
    min-width: ${props => props.width * 280}px;
  }
  @media ${device.laptopL} {
  }
`

const SubTitle = styled.div`
  font-style: italic;
`

const SpaceContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: ${props => props.display};
  }
`

export default Reviews
