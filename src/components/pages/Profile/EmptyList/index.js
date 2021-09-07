import React from 'react'
import styled from 'styled-components'

import EmptyIcon from '~/images/Assets/DESKTOP-Empty.svg'

const EmptyList = () => {
  return (
    <Container>
      {' '}
      <img src={EmptyIcon} />
      Nothing Yet...
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
`

export default EmptyList
