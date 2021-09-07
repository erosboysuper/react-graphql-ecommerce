import React from 'react'
import styled from 'styled-components'

import MarketHeader from '~/components/pages/market/MarketHeader'
import FundingItems from '~/components/pages/market/FundingItems'

const MarketSection = ({ title, subtitle }) => {
  return (
    <div>
      <MarketHeader />
      <FundingItems />
    </div>
  )
}

const Title = styled.p`
  margin-top: 40px;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  margin: 40px 5px 10px 5px !important;
`
const Letter = styled.div`
  display: inline-block;
  background-color: white;
  font-size: ${props => props.size}px;
  font-weight: bold;
  padding: 3px 15px 3px 8px;
`

export default MarketSection
