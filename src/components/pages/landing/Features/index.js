import React from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

const Features = ({ awesomeFeatureTitle, awesomeFeatures }) => {
  awesomeFeatures = awesomeFeatures || []
  return (
    <Container>
      <Title>
        <Letter
          font="Titillium Black"
          sizeDesktop={42}
          sizeLaptopL={36}
          sizeLaptop={30}
          sizeMobileS={22}
          sizeMobileM={26}
          sizeMobileL={26}
          color="#202122"
        >
          {awesomeFeatureTitle}
        </Letter>
      </Title>
      <FeatureList>
        {awesomeFeatures.map(item => (
          <Item key={item.id}>
            <ImagePart>
              {item.image.fluid ? (
                <Image fluid={item.image.fluid} className="item-img" />
              ) : (
                <LazyLoad>
                  <img src={item.image.url} alt="img" className="item-img" />
                </LazyLoad>
              )}
            </ImagePart>
            <LetterPart>
              <div>
                <Letter
                  font="Titillium Bold"
                  sizeDesktop={30}
                  sizeLaptopL={22}
                  sizeLaptop={15}
                  sizeMobileL={20}
                  sizeMobileM={20}
                  sizeMobileS={18}
                  color="#202122"
                >
                  {item.title}
                </Letter>
              </div>
              <div>
                <Letter
                  font="Titillium Web"
                  sizeDesktop={26}
                  sizeLaptopL={20}
                  sizeLaptop={13}
                  sizeMobileL={18}
                  sizeMobileM={18}
                  sizeMobileS={16}
                  color="#FF8C00"
                >
                  {item.shortText}
                </Letter>
              </div>
            </LetterPart>
          </Item>
        ))}
      </FeatureList>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 100px;
  position: relative;
  @media ${device.mobileS} {
    margin-top: 70px;
  }
  @media ${device.laptop} {
    margin-top: 100px;
    background: unset;
  }
`

const Title = styled.div`
  padding-top: 100px;
  text-align: center;
  @media ${device.mobileS} {
    padding-top: 38px;
    width: 70%;
    margin-left: 15%;
  }
  @media ${device.laptop} {
    padding-top: 54px;
    width: unset;
    margin-left: unset;
  }
  @media ${device.laptopL} {
    padding-top: 90px;
  }
  @media ${device.desktop} {
    padding-top: 140px;
  }
`

const FeatureList = styled.div`
  padding-left: 18%;
  padding-right: 18%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 70px;
  @media ${device.mobileS} {
    margin-top: 45px;
    padding-left: 8%;
    padding-right: 8%;
  }
  @media ${device.mobileM} {
    padding-right: 8%;
    padding-left: 8%;
  }
  @media ${device.mobileL} {
    padding-right: 10%;
    padding-left: 10%;
  }
  @media ${device.laptop} {
    margin-top: 30px;
    padding-left: 10%;
    padding-right: 10%;
  }
  @media ${device.laptopL} {
    margin-top: 70px;
  }
  @media ${device.desktop} {
    margin-top: 90px;
  }
`

const Item = styled.div`
  width: 21%;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;

  & .item-img {
    margin: 0px auto;
  }

  @media ${device.mobileS} {
    display: flex;
    width: 100%;
    & img {
      width: 70px;
    }
    margin-bottom: 26px;
  }
  @media ${device.mobileM} {
    & img {
      width: 75px;
    }
  }
  @media ${device.mobileL} {
    & img {
      width: 80px;
    }
  }
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.laptop} {
    display: block;
    width: 22.5%;
    margin-bottom: 25px;
    & img {
      width: 70px;
    }
  }
  @media ${device.laptopL} {
    margin-bottom: 55px;
    & img {
      width: 85px;
    }
  }
  @media ${device.desktop} {
    margin-bottom: 70px;
    & img {
      width: 110px;
    }
  }
`

const LetterPart = styled.div`
  @media ${device.mobileS} {
    text-align: start;
    margin-left: 20px;
    width: 70%;
  }
  @media ${device.laptop} {
    text-align: unset;
    margin-left: unset;
    width: unset;
  }
`

const ImagePart = styled.div`
  @media ${device.mobileS} {
    width: 70px;
  }
  @media ${device.mobileM} {
    width: 75px;
  }
  @media ${device.mobileL} {
    width: 80px;
  }
  @media ${device.laptop} {
    width: 70px;
    margin-left: 50%;
    transform: translate(-50%, 0px);
    margin-bottom: 14px;
  }
  @media ${device.laptopL} {
    width: 85px;
    margin-left: 50%;
    transform: translate(-50%, 0px);
  }
  @media ${device.desktop} {
    width: 110px;
    margin-left: 50%;
    transform: translate(-50%, 0px);
  }
`

export default Features
