import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, MobileContain } from '~/utils/styles'

import FundingStatus from '~/components/pages/Profile/FundingStatus'
import TboStatus from '~/components/pages/Profile/TboStatus'

const ProductBrief = ({ detail, type }) => {
  return (
    <Container>
      <img src={detail.image} />
      <Content>
        <CategoryContainer>
          <Letter
            font="Titillium Web"
            size={10}
            sizeDesktop={16}
            color="#7D7F81"
          >
            {detail.category}
          </Letter>
        </CategoryContainer>
        <Title>
          <Letter
            font="Titillium Bold"
            size={20}
            sizeDesktop={30}
            color="#202122"
          >
            {detail.title}
          </Letter>
        </Title>
        <Description>
          <Letter
            font="Titillium Bold"
            size={14}
            sizeDesktop={18}
            color="#202122"
          >
            {detail.description}
          </Letter>
        </Description>
        <MobileContain>
          {type === 'funding' && <FundingStatus />}
          {type === 'tbo' && <TboStatus />}
        </MobileContain>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  & img {
    width: 160px;
    height: 160px;
    margin-right: 10px;
  }
  @media ${device.laptop} {
    width: 60%;
    & img {
      width: 200px;
      height: 200px;
      margin-right: 10px;
    }
  }
`

const Content = styled.div``

const CategoryContainer = styled.div`
  width: fit-content;
  padding: 8px 24px;
  border-radius: 24px;
  border: 1px solid black;
  margin-top: 20px;
  margin-bottom: 10px;
`

const Title = styled.div``

const Description = styled.div``

export default ProductBrief
