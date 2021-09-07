import React, { useContext } from 'react'
import styled from 'styled-components'

import CommunityContext from '~/context/CommunityContext'

import ActiveIcon from '~/images/Assets/Active.svg'
import CircleUnActiveIcon from '~/images/Assets/Circle unactive.svg'
import CirCleCompleteIcon from '~/images/Assets/Circle completed.svg'

const StatusBar = () => {
  const { signUpStepNum, totalSignUpSteps } = useContext(CommunityContext)
  const items = Array.from({ length: totalSignUpSteps }).map((x, i) => i)

  return (
    <Container>
      {items.map(item => {
        if (item < signUpStepNum - 2)
          return <img src={CirCleCompleteIcon} key={'inactive' + item} />
      })}
      <img src={ActiveIcon} alt="ActiveIcon" />
      {items.map(item => {
        if (item > signUpStepNum - 2)
          return <img src={CircleUnActiveIcon} key={'inactive' + item} />
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  & img {
    margin-right: 8px;
  }
`

export default StatusBar
