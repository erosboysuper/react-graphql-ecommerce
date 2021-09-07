import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { MobileContain } from '~/utils/styles'

import ProductBrief from '~/components/Common/ProductBrief'
import CreatorItem from '~/components/pages/Profile/CreatorItem'
import FundingStatus from '~/components/pages/Profile/FundingStatus'
import TboStatus from '~/components/pages/Profile/TboStatus'

const DesignItem = ({ type }) => {
  const productInfo = {
    image:
      'https://www.datocms-assets.com/34700/1610550812-tbo-bikini-low-rise.png',
    category: 'DAILY',
    title: 'Yellow Power',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  }
  return (
    <Container>
      <ProductBrief detail={productInfo} type={type} />
      <MobileContain>{type === 'design' && <CreatorItem />}</MobileContain>
      <DesktopContainer>
        {type === 'funding' && <FundingStatus />}
        {type === 'tbo' && <TboStatus />}
        {type === 'design' && <CreatorItem />}
      </DesktopContainer>
    </Container>
  )
}

const Container = styled.div`
  background: #f2f2f7;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  @media ${device.laptop} {
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
    background: #f2f2f7;
    margin-right: 16px;
  }
`
const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    width: 40%;
    display: block;
  }
`

export default DesignItem
