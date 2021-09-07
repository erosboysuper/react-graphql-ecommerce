import React from 'react'
import styled from 'styled-components'

import { Letter, Space, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'

const TboFront = ({
  pageTitle,
  pageDescription,
  pageImage,
  desktopPageImage,
}) => {
  let sources = []
  if (pageImage && pageImage.fluid) {
    sources.push(pageImage.fluid)
  }
  if (desktopPageImage && desktopPageImage.fluid) {
    sources.push({
      ...desktopPageImage.fluid,
      media: `(min-width: 768px)`,
    })
  }
  return (
    <React.Fragment>
      <Container>
        <Background>
          {sources.length > 0 && <Img fluid={sources} alt="TBô Front Image" />}
          <LetterContainer>
            <Letter
              font="Titillium Black"
              size={30}
              sizeTablet={40}
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
          color={darkFont}
          sizeTablet={25}
          sizeLaptop={24}
          sizeLaptopL={28}
          sizeDesktop={32}
          dangerouslySetInnerHTML={{ __html: pageDescription || '' }}
        />
        <Space height={20} />
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
    padding: 30px 7%;
    bottom: -58px;
  }
  @media ${device.laptopL} {
    padding: 30px 7%;
    bottom: -58px;
  }
  @media ${device.desktop} {
    padding: 30px 7%;
    bottom: -58px;
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
  }
`

export default TboFront
