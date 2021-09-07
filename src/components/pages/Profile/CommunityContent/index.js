import React, { useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'

import Tabs from '~/components/pages/Profile/Tabs'
import RoomList from '~/components/pages/Profile/RoomList'
import NotificationSetting from '~/components/pages/Profile/NotificationSetting'
// import DesignList from '~/components/pages/Profile/DesignList'
// import ActivityList from '~/components/pages/Profile/ActivityList'

const CommunityContent = () => {
  // const tabs = ['Your Rooms', 'Your Designs', 'Your Activity']
  const tabs = ['Your Rooms', 'Notification Settings']
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
        <RoomList closeCB={() => setShowTab(false)} />
      )}
      {showTab === true && activeTab === 1 && (
        <NotificationSetting closeCB={() => setShowTab(false)} />
      )}
      {/* {showTab === true && activeTab === 1 && (
        <DesignList closeCB={() => setShowTab(false)} />
      )}
      {showTab === true && activeTab === 2 && (
        <ActivityList closeCB={() => setShowTab(false)} />
      )} */}
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

export default CommunityContent
