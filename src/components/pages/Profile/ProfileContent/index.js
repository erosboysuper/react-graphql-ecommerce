import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
// import PurchaseContent from '~/components/pages/Profile/PurchaseContent'
import CommunityContent from '~/components/pages/Profile/CommunityContent'

const ProfileContent = () => {
  return (
    <Container>
      {/* <PurchaseContent /> */}
      <CommunityContent />
    </Container>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    min-height: 100vh;
  }
`

export default ProfileContent
