import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import {
  Letter,
  Space,
  Img,
  MobileContain,
  DesktopContain,
} from '~/utils/styles'
import { darkFont } from '~/utils/colors'

import Gray3Img from '~/images/Assets/03 gray.svg'
import { device } from '~/utils/device'

const ThirdDiff = ({
  manshapedTitle,
  manshapedDescription,
  manshapedImage,
  manshapedIcon,
}) => {
  return (
    <React.Fragment>
      <Space height={30} />
      <Container>
        <ImageContainer>
          {manshapedImage && (
            <Img fluid={manshapedImage.fluid} alt="Co Crreate" />
          )}
          {manshapedIcon && (
            <TipImage>
              <LazyLoad>
                <img src={manshapedIcon.url} alt="Summarized" />
              </LazyLoad>
            </TipImage>
          )}
        </ImageContainer>
        <SecondPart>
          <LazyLoad>
            <img src={Gray3Img} alt="Gray" />
          </LazyLoad>
          <Space1 />
          <ManShaped>
            <Letter
              font="Titillium Web"
              size={36}
              sizeMobileS={30}
              sizeDesktop={66}
              sizeLaptop={45}
              sizeLaptopL={55}
              sizeTablet={66}
              color={darkFont}
            >
              {manshapedTitle}
            </Letter>
          </ManShaped>
          <DesktopContain>
            <LetterContainer>
              <Space height={30} />
              <Letter
                font="Titillium Light"
                size={16}
                dangerouslySetInnerHTML={{ __html: manshapedDescription || '' }}
              />
              <Space height={10} />
            </LetterContainer>
          </DesktopContain>
        </SecondPart>
      </Container>
      <MobileContain>
        <LetterContainer>
          <Space height={30} />
          <Letter
            font="Titillium Light"
            size={16}
            dangerouslySetInnerHTML={{ __html: manshapedDescription || '' }}
          />
          <Space height={10} />
        </LetterContainer>
      </MobileContain>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-top: 200px;
  }
`

const ImageContainer = styled.div`
  & {
    width: 45%;
    position: relative;
  }
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    width: 34%;
  }
`

const TipImage = styled.div`
  position: absolute;
  right: -61px;
  top: -27px;
  width: 120px;
  @media ${device.tablet} {
    width: 200px;
  }
  @media ${device.laptop} {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 50%;
    transform: translate(50%, -25%);
    & img {
      width: 78%;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 84%;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 100%;
    }
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 16px;
    top: 30%;
    line-height: 2em;
  }
  & img {
    float: right;
  }
  & span {
    width: 200px;
    display: block;
  }
  @media ${device.mobileS} {
    & img {
      float: right;
      width: 100px;
    }
    & span {
      width: 154px;
      display: block;
    }
  }
  @media ${device.mobileM} {
    & img {
      float: right;
      width: 110px;
    }
    & span {
      width: 184px;
      display: block;
    }
  }
  @media ${device.mobileL} {
    & img {
      float: right;
      width: 122px;
    }
    & span {
      width: 200px;
      display: block;
    }
  }
  @media ${device.tablet} {
    line-height: 4em;
    & img {
      width: 200px;
    }
    & span {
      width: 330px;
    }
  }
  @media ${device.laptop} {
    line-height: 2em;
    position: relative;
    top: unset;
    left: unset;
    width: 50%;
    margin-left: 10%;
    & img {
      width: 200px;
      margin-bottom: 30px;
    }
    & span {
      width: auto;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 220px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 290px;
    }
  }
`

const LetterContainer = styled.div`
  padding: 10px 32px 10px 22px;
  @media ${device.tablet} {
    & h3 {
      font-size: 32px;
    }
    & p {
      font-size: 25px;
    }
  }
  @media ${device.laptop} {
    padding: 0px;
    line-height: 2.8em;
    & h3 {
      font-size: 25px;
      margin-top: 5px;
    }
    & p {
      font-size: 22px;
      margin-top: 35px;
    }
  }
  @media ${device.laptopL} {
    padding: 0px;
    line-height: 2.8em;
    & h3 {
      font-size: 34px;
      margin-top: 45px;
    }
    & p {
      font-size: 28px;
      margin-top: 35px;
    }
  }
  @media ${device.desktop} {
    padding: 0px;
    line-height: 2.8em;
    & h3 {
      font-size: 40px;
      margin-top: 60px;
    }
    & p {
      font-size: 32px;
      margin-top: 35px;
    }
  }
`
const ManShaped = styled.div`
  @media ${device.laptop} {
    width: 100%;
    display: inline-block;
    text-align: end;
  }
`
const Space1 = styled.div`
  width: 100%;
  height: 100px;
  @media ${device.mobileS} {
    height: 76px;
  }
  @media ${device.mobileM} {
    height: 100px;
  }
  @media ${device.tablet} {
    height: 190px;
  }
`

export default ThirdDiff
