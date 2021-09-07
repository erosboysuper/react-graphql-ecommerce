import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import 'react-placeholder/lib/reactPlaceholder.css'

import { device } from '~/utils/device'
import { MobileContain, Cover } from '~/utils/styles'

import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import SEO from '~/components/seo'
import ProfileHeader from '~/components/pages/Profile/ProfileHeader'
import ProfileContent from '~/components/pages/Profile/ProfileContent'
import SettingList from '~/components/pages/Profile/SettingList'
import EditProfileModal from '~/components/pages/Profile/EditProfileModal'
import Footer from '~/components/Common/Footer'
import CommunityModals from '~/components/Common/CommunityModals'

const ProfilePage = ({
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  const [editProfileModal, setEditProfileModal] = useState(false)
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  const { userInfo, setRoomId } = useContext(CommunityContext)

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  useEffect(() => {
    setRoomId(null)
    const _userInfo = localStorage.getItem(`userInfo`)
    if (!userInfo && !_userInfo) {
      navigate(`/${localeFolder}/`)
    }
  }, [])

  return userInfo ? (
    <Container>
      <SEO
        title={`${userInfo.user.first_name} ${userInfo.user.last_name}`}
        description={`${userInfo.user.first_name} ${userInfo.user.last_name}`}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          `${userInfo.user.first_name} ${userInfo.user.last_name}`,
        ]}
      />
      <ProfileHeader editProfile={() => setEditProfileModal(true)} />
      <ProfileContent />
      <MobileContain>
        <SettingList />
      </MobileContain>
      <Footer activeMenu="profile" hideFooter={true} />
      <CommunityModals />
      {editProfileModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setEditProfileModal(false)}
          />
          <EditProfileModal onClose={() => setEditProfileModal(false)} />
        </React.Fragment>
      )}
    </Container>
  ) : null
}

const Container = styled.div`
  @media ${device.laptop} {
    background: #f7f7fa;
  }
`

export default ProfilePage
