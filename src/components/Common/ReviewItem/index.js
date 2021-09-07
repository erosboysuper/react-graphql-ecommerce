import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import { Img, Space } from '~/utils/styles'
import { device } from '~/utils/device'
import StarRating from '~/components/Common/StarRating'

import ArrowOrangeIcon from '~/images/Assets/DESKTOP-Arrow-orange.svg'
import check_icon from '~/images/Assets/check-icon.png'

const ReviewItem = ({ data, button }) => {
  const { localeFolder } = useContext(StoreContext)

  return (
    <LazyLoad>
      <Container>
        <Logo>
          <ProductImage>
            {data.reviewerImage && <Img fluid={data.reviewerImage.fluid} />}
          </ProductImage>
          <br />
          {data.product && (
            <React.Fragment>
              <TipImage>
                {data.product.media.length > 0 && (
                  <ImageContainer>
                    <Img
                      fluid={data.product.media[0].fluid}
                      hideBottom={true}
                    />
                  </ImageContainer>
                )}
                <Space height={18} />
                <GrayLetter size={12} font="Titillium Web">
                  {data.product.name}
                </GrayLetter>
                {data.size && (
                  <GrayLetter size={12} font="Titillium Web">
                    <Space height={18} />
                    {`${data.size.name}.${data.size.helpText}`}
                  </GrayLetter>
                )}
              </TipImage>
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
                      <span>{data.reviewerName}</span>
                    </Letter>
                    <Check>
                      <img src={check_icon} alt="check_icon" />
                    </Check>
                  </Contain>
                  <GrayLetter1 size={12} sizeDesktop={16}>
                    <span>{data.reviewDate}</span>
                  </GrayLetter1>
                </Title>
              </Intro>
            </React.Fragment>
          )}
        </Logo>
        <LetterContainer>
          <br />
          <MobileIntro>
            <Title>
              <Contain>
                <Letter size={22} font="Titillium Bold">
                  <label>{data.reviewerName}</label>
                </Letter>
                <Check>
                  <img src={check_icon} alt="check_icon" />
                </Check>
              </Contain>
              <GrayLetter size={12} font="Titillium Web">
                <label>{data.reviewDate}</label>
              </GrayLetter>
            </Title>
          </MobileIntro>
          {data.starRating && (
            <StarContainer>
              <StarRating rating={data.starRating} />
            </StarContainer>
          )}
          <Title>
            <Letter1
              size={15}
              sizeLaptopL={17}
              sizeLaptop={16}
              sizeDesktop={20}
              font="Titillium Web"
            >
              <label>{data.reviewContent}</label>
            </Letter1>
          </Title>
          <TipImageDesktop>
            {data.product.media.length > 0 && (
              <ImageContainer>
                <Img fluid={data.product.media[0].fluid} hideBottom={true} />
              </ImageContainer>
            )}
            <GrayLetter size={13} sizeDesktop={16} font="Titillium Web">
              {data.product.name}
            </GrayLetter>
            {data.size && (
              <GrayLetter
                size={13}
                sizeDesktop={16}
                font="Titillium Web"
              >{`${data.size.name}.${data.size.helpText}`}</GrayLetter>
            )}
          </TipImageDesktop>
        </LetterContainer>
        {data.product && button !== false && (
          <BottomTip>
            <Link to={`/${localeFolder}/${data.product.handle}`}>
              See Products
              <img src={ArrowOrangeIcon} alt="Arrow Icon" />
            </Link>
          </BottomTip>
        )}
      </Container>
    </LazyLoad>
  )
}

const Container = styled.div`
  display: flex;
  background-color: rgb(243, 243, 248);
  position: relative;
  width: 100%;
  @media ${device.laptop} {
    display: block;
    padding-bottom: 50px;
  }
`

const Contain = styled.div`
  display: flex;
  margin-top: 13px;
`

const ImageContainer = styled.div`
  width: 40px;
`

const Logo = styled.div`
  width: 35%;
  height: 100%;
  padding: 15px;
  @media ${device.laptop} {
    & {
      height: auto;
      width: 100%;
      display: flex;
    }
  }
`

const Title = styled.div`
  margin-left: 0px;
  display: block;
  @media ${device.laptop} {
    margin-left: 0px;
  }
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
  width: 58%;
  height: 100%;
  @media ${device.laptop} {
    width: 100%;
    margin-top: -40px;
    padding-left: 15px;
  }
`

const BottomTip = styled.div`
  position: absolute;
  width: 55%;
  height: auto;
  bottom: -25px;
  left: 50%;
  transform: translate(-50%, 0px);

  & a {
    font-size: 15px;
    color: white;
    font-family: Titillium Bold;
    background-color: #202122;
    display: flex;
    justify-content: space-around;
    height: 54px;
    width: 194px;
    align-items: center;
    & img {
      width: 17px;
    }
  }
  @media ${device.mobileS} {
    & a {
      width: 170px;
    }
  }
  @media ${device.mobileM} {
    & a {
      width: 194px;
    }
  }
  @media ${device.laptop} {
    & a {
      width: 100%;
      height: 48px;
      font-size: 15px;
      & img {
        width: 12px;
      }
    }
  }
  @media ${device.laptopL} {
    & a {
      width: 100%;
      height: 55px;
      font-size: 16px;
      & img {
        width: 14px;
      }
    }
  }
  @media ${device.desktop} {
    & a {
      width: 100%;
      height: 70px;
      font-size: 20px;
      & img {
        width: 17px;
      }
    }
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

const TipImage = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`

const ProductImage = styled.div`
  @media ${device.laptop} {
    width: 35%;
  }
`
const Intro = styled.div`
  display: none;
  @media ${device.laptop} {
    padding-left: 10px;
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
const TipImageDesktop = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    display: flex;
  }
`

export default ReviewItem
