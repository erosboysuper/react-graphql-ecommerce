import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { dateFormat } from '~/utils/functions'
import StarRating from '~/components/Common/StarRating'

import check_icon from '~/images/Assets/check-icon.png'

const ReviewItem3p = ({ review }) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (review.attachments && review.attachments.length > 0) {
      const _image = review.attachments[0].processedFiles.find(
        x => x.dimension === '360pxWide'
      )
      setImage(_image)
    }
  }, [review])

  return (
    <Container>
      {image && (
        <ImageContainer>
          <Image src={image.url} alt="review image" />
        </ImageContainer>
      )}
      <Logo>
        <Intro>
          <Title>
            <Contain>
              <Letter
                size={22}
                font="Titillium Bold"
                sizeLaptopL={25}
                sizeLaptop={20}
                sizeDesktop={32}
              >
                <span>
                  {review.consumer.displayName || review.consumer.name}
                </span>
              </Letter>
              <Check>
                <img src={check_icon} alt="check_icon" />
              </Check>
            </Contain>
            <GrayLetter1 size={12} sizeDesktop={16}>
              <span>{dateFormat(review.createdAt)}</span>
            </GrayLetter1>
          </Title>
        </Intro>
      </Logo>
      <LetterContainer>
        <br />
        <MobileIntro>
          <Title>
            <Contain>
              <Letter size={22} font="Titillium Bold">
                <label>
                  {review.consumer.displayName || review.consumer.name}
                </label>
              </Letter>
              <Check>
                <img src={check_icon} alt="check_icon" />
              </Check>
            </Contain>
            <GrayLetter size={12} font="Titillium Web">
              <label>{dateFormat(review.createdAt)}</label>
            </GrayLetter>
          </Title>
        </MobileIntro>
        <StarContainer>
          <StarRating rating={review.stars} />
        </StarContainer>
        <Title className="scroller">
          <Letter1
            size={15}
            sizeLaptopL={17}
            sizeLaptop={16}
            sizeDesktop={20}
            font="Titillium Web"
          >
            {review.text || review.content}
          </Letter1>
          {(review.companyReply || review.firstCompanyComment) && (
            <Reply>
              <Letter1
                size={15}
                sizeLaptopL={17}
                sizeLaptop={16}
                sizeDesktop={20}
                font="Titillium Web"
              >
                {review.companyReply ? review.companyReply.text : null}
                {review.firstCompanyComment
                  ? review.firstCompanyComment.comment
                  : null}
              </Letter1>
            </Reply>
          )}
        </Title>
      </LetterContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  background-color: rgb(243, 243, 248);
  @media ${device.tablet} {
    width: 24vw;
    display: block;
    margin: 0 5px 10px 5px;
  }
`

const Contain = styled.div`
  display: flex;
  margin-top: 13px;
`

const Logo = styled.div`
  display: none;
  width: 100%;
  height: auto;
  @media ${device.laptop} {
    display: flex;
  }
`

const Title = styled.div`
  display: block;
  &.scroller {
    overflow: auto;
    max-height: 250px;
  }
`

const Reply = styled.div`
  background: #fff;
  margin-left: 10px;
  padding-left: 5px;
  border-left: solid 2px #ff8c00;
`

const Letter = styled.div`
  display: inline-block;
  font-size: ${props => props.size}px;
  font-weight: bold;
  padding: 2px 12px 2px 0px;
  font-family: ${props => props.font};
  @media ${device.laptop} {
    font-size: ${props =>
      props.sizeLaptop ? props.sizeLaptop : props.sizeDesktop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props =>
      props.sizeLaptopL ? props.sizeLaptopL : props.sizeDesktop}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const Letter1 = styled.div`
  font-size: ${props => props.size}px;
  padding: 3px 12px 3px 3px;
  font-family: ${props => props.font};
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const GrayLetter = styled.div`
  font-size: ${props => props.size}px;
  color: gray;
  margin-top: -18px;
  font-family: ${props => props.font};
  @media ${device.laptop} {
    margin-top: 9px;
    margin-left: 10px;
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const GrayLetter1 = styled.div`
  font-size: ${props => props.size}px;
  color: gray;
  @media ${device.laptop} {
    margin-top: -24px;
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    margin-top: -21px;
    font-size: 13px;
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    margin-top: -20px;
    font-size: ${props => props.sizeDesktop}px;
  }
`

const LetterContainer = styled.div`
  width: 100%;
  height: 100%;
  @media ${device.laptop} {
    margin-top: -40px;
  }
`

const Check = styled.div`
  margin-top: 4px;
  width: 15px;
  @media ${device.laptop} {
    margin-top: 0px;
    width: 13px;
  }
  @media ${device.laptopL} {
    margin-top: 0px;
    width: 16px;
  }
  @media ${device.desktop} {
    margin-top: 0px;
    width: 20px;
  }
`

const StarContainer = styled.div`
  @media ${device.laptop} {
    font-size: 16px;
    & svg {
      width: 14px;
      height: 14px;
    }
  }
  @media ${device.laptopL} {
    margin-top: -10px;
    font-size: 18px;
    & svg {
      width: 17px;
      height: 17px;
    }
  }
  @media ${device.desktop} {
    font-size: 20px;
    & svg {
      width: 20px;
      height: 20px;
    }
  }
`

const Intro = styled.div`
  display: none;
  @media ${device.laptop} {
    padding-bottom: 17px;
    display: flex;
    align-items: flex-end;
    line-height: 2.7rem;
  }
  @media ${device.laptopL} {
    padding-bottom: 15px;
  }
  @media ${device.desktop} {
    padding-bottom: 20px;
    line-height: 2.7rem;
  }
`

const MobileIntro = styled.div`
  margin-top: -10px;
  @media ${device.laptop} {
    display: none;
  }
`

const ImageContainer = styled.div`
  width: 35%;
  margin: 0 10px 10px 0;
  @media ${device.laptop} {
    margin: 0 20px 20px 0;
  }
`

const Image = styled.img`
  width: 100%;
`

export default ReviewItem3p
