import React from 'react'
import styled from 'styled-components'

import { Space } from '~/utils/styles'

const SearchTitle = () => {
  return (
    <div>
      <Space height={30} />
      <Container>
        <Letter>SEARCH & FILTERS</Letter>
      </Container>
      <Space height={40} />
    </div>
  )
}

const Letter = styled.span`
  font-size: 14px;
  color: #a9acaf;
  font-family: Titillium Web;
  letter-spacing: 1px;
`

const Container = styled.div`
  text-align: center;
`

export default SearchTitle
