import React from 'react'
import styled from 'styled-components'

import { Letter, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'

const AboutFront = ({
  pageTitle,
  paragraph1,
  bannerImage,
  desktopBannerImage,
}) => {
  let sources = []
  if (bannerImage && bannerImage.fluid) {
    sources.push(bannerImage.fluid)
  }
  if (desktopBannerImage && desktopBannerImage.fluid) {
    sources.push({
      ...desktopBannerImage.fluid,
      media: `(min-width: 768px)`,
    })
  }
  return (
    <React.Fragment>
      <Container>
        <Background>
          {sources.length > 0 && <Img fluid={sources} alt="TBô About Us" />}
          <LetterContainer>
            <Letter
              font="Titillium Black"
              size={30}
              sizeTablet={45}
              sizeLaptop={50}
              sizeLaptopL={60}
              sizeDesktop={70}
              color={darkFont}
            >
              {pageTitle}
            </Letter>
          </LetterContainer>
        </Background>
      </Container>
      <LetterContain>
        <Letter
          font="Titillium Light"
          size={18}
          sizeTablet={25}
          color={darkFont}
          dangerouslySetInnerHTML={{ __html: paragraph1 || '' }}
        />
      </LetterContain>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
`

const LetterContainer = styled.div`
  position: absolute;
  left: 0px;
  bottom: -33px;
  background: white;
  padding: 22px 22px;
  @media ${device.laptop} {
    padding: 22px 7%;
    bottom: -45px;
  }
  @media ${device.laptopL} {
    padding: 30px 7%;
    bottom: -60px;
  }
`

const Background = styled.div`
  & {
    position: relative;
  }
  & img {
    width: 100%;
  }
`

const LetterContain = styled.div`
  padding: 40px 32px 10px 22px;
  @media ${device.laptop} {
    padding-left: 7%;
    width: 70%;
    padding-top: 30px;
    & h3 {
      font-size: 25px;
    }
    & p {
      font-size: 25px;
      margin-bottom: 25px;
    }
  }
  @media ${device.laptopL} {
    padding-left: 7%;
    width: 70%;
    padding-top: 30px;
    & h3 {
      font-size: 28px;
    }
    & p {
      font-size: 28px;
      margin-bottom: 30px;
    }
  }
  @media ${device.desktop} {
    padding-left: 7%;
    width: 70%;
    padding-top: 30px;
    & h3 {
      font-size: 32px;
    }
    & p {
      font-size: 32px;
      margin-bottom: 30px;
    }
  }
`

export default AboutFront
