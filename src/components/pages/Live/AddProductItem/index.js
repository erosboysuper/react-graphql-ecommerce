import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import StarRating from '~/components/Common/StarRating'

const AddProductItem = ({ product }) => {
  return (
    <Container>
      <ProductImage>
        <img src={product.image} />
      </ProductImage>
      <Content>
        <StarRating rating={product.star} />
        <Letter font="Titillium Bold" size={24} color="#A9ACAF">
          {product.price}
        </Letter>
        <div>
          <Letter font="Titillium Bold" size={28} color="#A9ACAF">
            {product.title}
          </Letter>
        </div>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 90%;
  display: flex;
  border: 1px solid #cecece;
  padding: 20px;
  margin: auto;
  margin-top: 20px;
  @media ${device.laptop} {
    width: 43%;
    margin: unset;
    margin-top: 20px;
  }
`

const ProductImage = styled.div`
  & img {
    width: 120px;
    height: 120px;
  }
  margin-right: 20px;
`

const Content = styled.div``

export default AddProductItem
