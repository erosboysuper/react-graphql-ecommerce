import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Img, Letter } from '~/utils/styles'

const CommitmentHeader = ({
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
    <Container>
      <Background>
        {sources.length > 0 && <Img fluid={sources} alt="TBô Commitment" />}
        <Title>
          <Letter
            font="Titillium Bold"
            sizeDesktop={70}
            sizeLaptopL={60}
            sizeLaptop={50}
            size={30}
            sizeMobileL={30}
            sizeMobileM={26}
            sizeMobileS={22}
            color="#202122"
          >
            {pageTitle}
          </Letter>
        </Title>
      </Background>
      <SubTitle>
        <Letter
          font="Titillium Light"
          sizeDesktop={32}
          sizeLaptopL={28}
          sizeLaptop={24}
          sizeMobileS={16}
          sizeMobileM={17}
          sizeMobileL={18}
          color="#202122"
          dangerouslySetInnerHTML={{ __html: pageDescription || '' }}
        />
      </SubTitle>
    </Container>
  )
}

const Container = styled.div``

const Background = styled.div`
  position: relative;
  & img {
    width: 100%;
  }
`

const Title = styled.div`
  position: absolute;
  bottom: -42px;
  left: 0px;
  background: white;
  padding: 14px 4% 30px 16px;
  @media ${device.laptop} {
    position: absolute;
    bottom: -56px;
    left: 0px;
    background: white;
    padding: 30px 4% 30px 7%;
  }
`

const SubTitle = styled.div`
  width: 95%;
  padding-left: 16px;
  margin-top: 50px;
  @media ${device.laptop} {
    width: 75%;
    margin-top: 50px;
    padding-left: 7%;
  }
`

export default CommitmentHeader
