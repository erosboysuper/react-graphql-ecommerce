import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import RoomHeader from '~/components/pages/room/RoomHeader'
import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import SEO from '~/components/seo'
import CommunityHeader from '~/components/pages/community/CommunityHeader'
import LiveNowItem from '~/components/pages/Live/LiveNowItem'
import UpcomingItem from '~/components/pages/Live/UpcomingItem'
import LiveSideBar from '~/components/pages/Live/LiveSideBar'
import CommunityContext from '~/context/CommunityContext'
import Footer from '~/components/Common/Footer'
import CommunityModals from '~/components/Common/CommunityModals'

const LivePage = ({ pageContext: { locale = 'en', localeFolder = 'us' } }) => {
  const { communityPage } = useStaticQuery(graphql`
    query {
      communityPage: datoCmsCommunity(locale: { eq: "en" }) {
        ...communityPage_commonFields
      }
    }
  `)

  const { setMobileSchedule } = useContext(CommunityContext)

  const room = {
    id: 343,
    title: 'Mental Illness',
    image:
      'https://storage.googleapis.com/tbo-clothing.appspot.com/thumbnail_ME_Ntal_Wellness_e204726a0e/thumbnail_ME_Ntal_Wellness_e204726a0e',
    image_large:
      'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
  }

  return (
    <React.Fragment>
      <SEO title="TBO LIVE" />
      <DesktopContain>
        <CommunityHeader
          selected={false}
          enableNotifications={communityPage.enableNotifications}
          enableSearch={communityPage.enableSearch}
          pageLogo={communityPage.pageLogo}
        />
      </DesktopContain>
      <Container>
        <DesktopRight>
          <RoomHeader room={room} />
          <LiveSideBar content="Short description about the room motivations enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum" />
        </DesktopRight>
        <DesktopLeft>
          <SubTitle>
            <Letter font="Titillium Black" size={30} color="#202122">
              Live Now
            </Letter>
          </SubTitle>
          <LiveContainer>
            <LiveNowItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_The_Raglan_Tee_V_5640d58e96/medium_The_Raglan_Tee_V_5640d58e96.2"
              title="TBO bodywear"
            />
            <LiveNowItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e"
              title="TBO bodywear"
            />
            <LiveNowItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_The_Raglan_Tee_V_5640d58e96/medium_The_Raglan_Tee_V_5640d58e96.2"
              title="TBO bodywear"
            />
            <LiveNowItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_The_Raglan_Tee_V_5640d58e96/medium_The_Raglan_Tee_V_5640d58e96.2"
              title="TBO bodywear"
            />
          </LiveContainer>
          <SubTitle>
            <Letter font="Titillium Black" size={30} color="#202122">
              Upcoming
            </Letter>
          </SubTitle>
          <LiveContainer>
            <UpcomingItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_The_Raglan_Tee_V_5640d58e96/medium_The_Raglan_Tee_V_5640d58e96.2"
              title="TBO bodywear"
              date="8 May, 2021"
            />
            <UpcomingItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e"
              title="TBO bodywear"
              date="8 May, 2021"
            />
            <UpcomingItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_The_Raglan_Tee_V_5640d58e96/medium_The_Raglan_Tee_V_5640d58e96.2"
              title="TBO bodywear"
              date="8 May, 2021"
            />
            <UpcomingItem
              image="https://storage.googleapis.com/tbo-clothing.appspot.com/medium_The_Raglan_Tee_V_5640d58e96/medium_The_Raglan_Tee_V_5640d58e96.2"
              title="TBO bodywear"
              date="8 May, 2021"
            />
          </LiveContainer>
        </DesktopLeft>
      </Container>
      <MobileContain>
        <StartLiveButton onClick={() => setMobileSchedule(true)}>
          <Letter font="Titillium Bold" size={16} color="white">
            START A NEW LIVE
          </Letter>
        </StartLiveButton>
      </MobileContain>
      <Footer activeMenu="co-create" hideFooter={true} hideStickyMenu={false} />
      <CommunityModals />
    </React.Fragment>
  )
}

const Container = styled.div`
  background: #f7f7fa;
  @media ${device.laptop} {
    display: flex;
    flex-direction: row-reverse;
    padding-left: 4%;
    justify-content: space-between;
  }
`

const DesktopLeft = styled.div`
  padding-left: 20px;
  @media ${device.laptop} {
    margin-left: 0%;
    padding-left: 0px;
    width: 60%;
  }
`

const DesktopRight = styled.div`
  @media ${device.laptop} {
    width: 38%;
  }
`

const LiveContainer = styled.div`
  display: flex;
  overflow: auto;
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const SubTitle = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
`

const StartLiveButton = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: #ff8c00;
  height: 83px;
  display: flex;
  justify-content: center;
  z-index: 10;
  letter-spacing: 2.5px;
  align-items: center;
`

export default LivePage
