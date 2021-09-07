import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

const LiveNowItem = ({ image, title }) => {
  return (
    <Container>
      <ImageContainer>
        <TipLetter>
          <Letter
            font="Titillium Bold"
            sizeLaptop={10}
            size={14}
            color="#161617"
          >
            LIVE
          </Letter>
        </TipLetter>
        <ImageShow src={image} alt="LIve Item Image" />
      </ImageContainer>
      <Title>
        <Letter font="Titillium Bold" size={26} color="#202122">
          {title}
        </Letter>
      </Title>
    </Container>
  )
}

const Container = styled.div`
  margin-right: 20px;
  @media ${device.laptop} {
    margin-right: unset;
  }
`

const ImageContainer = styled.div`
  position: relative;
`

const ImageShow = styled.img`
  width: 35vw;
  @media ${device.laptop} {
    width: 18vw;
  }
`

const TipLetter = styled.div`
  position: absolute;
  top: 10px;
  left: 12px;
  background: white;
  padding: 3px 10px;
  letter-spacing: 2.5px;
  border: solid 2px #202122;
  background-color: #eed;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
  -webkit-box-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
  -o-box-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
  border-radius: 25px;
  @media ${device.laptop} {
    top: 21px;
    left: 22px;
  }
`

const Title = styled.div``

export default LiveNowItem
