import React from 'react'
import styled from 'styled-components'

import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'

import SubTitle from '~/components/Common/SubTitle'
import ProductSale from '~/components/Common/ProductSale'

const RelatedProducts = ({ heading, products }) => {
  const ProductList = () => {
    const List = []
    products.forEach(product => {
      List.push(
        <ListItem key={product.id}>
          <BestProduct>
            <ProductSale product={product} />
          </BestProduct>
        </ListItem>
      )
    })
    return List
  }

  return (
    <div>
      <TitleOnly>{heading}</TitleOnly>
      <Contain>
        <DesktopContainer>
          <SubTitle title="You Might Also Like" subtitle="See All" />
        </DesktopContainer>
        <ThumbBox>
          <Ul className="itemlist" length={products.length}>
            {ProductList()}
          </Ul>
        </ThumbBox>
      </Contain>
    </div>
  )
}

const BestProduct = styled.div`
  width: 100%;
  margin-left: 0%;
  padding-bottom: 10px;
`

const Contain = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow: auto;
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const ThumbBox = styled.div`
  @media ${device.laptop} {
    width: 70%;
    display: flex;
    overflow: auto;
  }
`

const Ul = styled.div`
  display: flex;
  width: auto;
  padding-left: 10px;
  @media ${device.laptop} {
    width: ${props => (props.length * 20) / 0.7}%;
  }
`

const ListItem = styled.div`
  display: inline-block;
  width: 190px;
  margin-right: 10px;
  -webkit-transition: all 500ms ease-in;
  -moz-transition: all 500ms ease-in;
  -o-transition: all 500ms ease-in;
  transition: all 500ms ease-in;
  @media ${device.mobileS} {
    width: 165px;
  }
  @media ${device.mobileM} {
    width: 190px;
  }
  @media ${device.tablet} {
    width: 250px;
  }
  @media ${device.laptop} {
    width: 20vw;
  }
`

const TitleOnly = styled.div`
  text-align: center;
  font-family: Titillium Black;
  font-size: 22px;
  color: ${darkFont};
  margin-bottom: 20px;
  @media ${device.tablet} {
    font-size: 34px;
    display: none;
  }
`

export default RelatedProducts
