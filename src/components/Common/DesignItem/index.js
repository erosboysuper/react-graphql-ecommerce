import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { btn_color } from '~/utils/colors'
import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

import ProductImg from '~/images/Assets/DesginImgItem.png'

const DesignItem = ({ item, active }) => {
  return (
    <Container
      background={active ? '#F2F2F7' : 'white'}
      border={active ? 0 : 1}
    >
      <LazyLoad>
        <ProductImage src={ProductImg} />
      </LazyLoad>
      <Content>
        <Price>
          <Letter
            font="Titillium Bold"
            size={10}
            sizeDesktop={12}
            color="#202122"
          >
            $
          </Letter>
          <Letter
            font="Titillium Bold"
            size={14}
            sizeDesktop={18}
            color="#202122"
          >
            {item.price}
          </Letter>
        </Price>
        <div>
          <Letter
            font="Titillium Bold"
            size={20}
            sizeDesktop={24}
            color="#202122"
          >
            {item.name}
          </Letter>
        </div>
        <ContainProgress>
          <Progress>
            <ProgressBar color={btn_color} value={75}></ProgressBar>
          </Progress>
        </ContainProgress>
        <div>
          <Letter
            font="Titillium Web"
            size={13}
            sizeDesktop={16}
            color="#202122"
          >
            {item.percent}% founded{' '}
          </Letter>{' '}
          &nbsp; &middot; &nbsp;
          <Letter
            font="Titillium Bold"
            size={13}
            sizeDesktop={16}
            color="#FF8C00"
          >
            24 days left
          </Letter>
        </div>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  border: ${props => props.border}px solid #cecece;
  margin-right: 16px;
  margin-bottom: 5px;
  background: ${props => props.background};
  @media ${device.laptop} {
    margin-right: 0px;
  }
`

const ProductImage = styled.img`
  width: 100px;
  @media ${device.laptop} {
    width: 108px;
  }
`
const Price = styled.div``

const ContainProgress = styled.div`
  width: 100%;

  padding: 0;
  position: relative;
  margin-top: 10px;
  @media ${device.laptop} {
    height: auto;
  }
`

const Content = styled.div`
  width: 60%;
  margin-left: 17px;
`

const Progress = styled.div`
  width: 100%;
  height: 10px;
  border: 1px solid gray;
  @media ${device.laptop} {
    height: 10px;
  }
  @media ${device.laptopL} {
    height: 13px;
  }
  @media ${device.desktop} {
    height: 17px;
  }
`
const ProgressBar = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.color};
  border: 5px solid #ff8c00;
  margin-top: -1px;
  margin-left: -2px;
  @media ${device.laptop} {
    border: 5px solid #ff8c00;
  }
  @media ${device.laptopL} {
    border: 6.5px solid #ff8c00;
  }
  @media ${device.desktop} {
    border: 8.5px solid #ff8c00;
  }
`

export default DesignItem
