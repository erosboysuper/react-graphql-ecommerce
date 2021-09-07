import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Letter, Cover } from '~/utils/styles'
import ProductBuilderContext from '~/context/ProductBuilderContext'

const ProductBuilderHeader = () => {
  const {} = useContext(ProductBuilderContext)

  return <React.Fragment></React.Fragment>
}

const Space = styled.div`
  display: block;
  height: ${props => (props.status === 1 ? '100px' : '0px')};
  @media ${device.laptop} {
    display: block;
    width: 100%;
    height: ${props => (props.status === 1 ? '150px' : '0px')};
  }
`

export default ProductBuilderHeader
