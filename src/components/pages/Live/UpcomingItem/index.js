import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

const UpcomingItem = ({ image, title, date }) => {
  return (
    <Container>
      <ImageContainer>
        <TipLetter>
          <Letter font="Titillium Bold" size={20} color="white">
            Edit
          </Letter>
        </TipLetter>
        <ImageShow src={image} alt="LIve Item Image" />
      </ImageContainer>
      <Title>
        <Letter font="Titillium Bold" size={26} color="#202122">
          {title}
        </Letter>
      </Title>
      <Letter font="Titillium Bold" size={18} color="#202122">
        {date}
      </Letter>
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
  bottom: 0px;
  left: 0px;
  background: #ff8c00;
  padding: 3px 10px;
  letter-spacing: 2.5px;
`

const Title = styled.div``

export default UpcomingItem
