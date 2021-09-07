import React, { useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'

import Tabs from '~/components/pages/Profile/Tabs'
import OrderList from '~/components/pages/Profile/OrderList'
import ReviewList from '~/components/pages/Profile/ReviewList'
import ShippingList from '~/components/pages/Profile/ShippingList'

const PurchaseContent = () => {
  const tabs = ['Your Orders', 'Your Reviews', 'Shipping and Billing address']
  const [activeTab, setActiveTab] = useState(0)
  const [showTab, setShowTab] = useState(false)
  const sendTabItem = index => {
    setActiveTab(index)
    setShowTab(true)
  }
  return (
    <Container>
      <Tabs tablist={tabs} sendTabItem={sendTabItem} />
      {showTab === true && activeTab === 0 && (
        <OrderList closeCB={() => setShowTab(false)} />
      )}
      {showTab === true && activeTab === 1 && (
        <ReviewList closeCB={() => setShowTab(false)} />
      )}
      {showTab === true && activeTab === 2 && (
        <ShippingList closeCB={() => setShowTab(false)} />
      )}
    </Container>
  )
}

const Container = styled.div`
  background: white;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 30px;
  @media ${device.laptop} {
    min-height: 400px;
    background: white;
    margin-left: 10%;
    margin-right: 5%;
    width: 55%;
    margin-top: 30px;
  }
`

const Header = styled.div``

export default PurchaseContent
