import React, { useContext } from 'react'

import CommunityContext from '~/context/CommunityContext'
import { Cover } from '~/utils/styles'

import CreateRoomModal from '~/components/pages/community/CreateRoomModal'
import ProfileModal from '~/components/pages/community/ProfileModal'
import EditModal from '~/components/pages/community/EditModal'
import NewTopicModal from '~/components/pages/room/NewTopicModal'
import NewConversationModal from '~/components/pages/room/NewConversationModal'
import NewMediaUploadModal from '~/components/pages/room/NewMediaUploadModal'
import CameraModal from '~/components/pages/room/CameraModal'
import RecordModal from '~/components/pages/room/RecordModal'
import EditCommentModal from '~/components/pages/room/EditCommentModal'
import EditAddressModal from '~/components/pages/Profile/EditAddressModal'
import InviteFriendModal from '~/components/pages/community/InviteFriendModal'
import StartLiveModal from '~/components/pages/Live/StartLiveModal'
import ScheduleLiveModal from '~/components/pages/Live/ScheduleLiveModal'
import MobileScheduleOptionModal from '~/components/pages/Live/MobileScheduleOptionModal'
import CoCreationToolModal from '~/components/pages/community/CoCreationToolModal'
import QuickLink from '~/components/pages/community/QuickLink'
import CoCreationModal from '~/components/pages/community/CoCreationModal'
import Lightbox from '~/components/Common/Lightbox'

const CommunityModals = () => {
  const {
    createRoomModal,
    setCreateRoomModal,
    lightboxModal,
    setLightboxModal,
    setLightboxAsset,
    editModal,
    setEditModal,
    setEditRecord,
    newTopicModal,
    setNewTopicModal,
    editCommentModal,
    setEditCommentModal,
    profileInfo,
    setProfileInfo,
    editAddressModal,
    setEditAddressModal,
    coCreationModal,
    setCoCreationModal,
    inviteFriendModal,
    setInviteFriendModal,
    coCreationToolModal,
    setCoCreationToolModal,
    quickLink,
    setQuickLink,
    newConversationModal,
    setNewConversationModal,
    newMediaUploadModal,
    setNewMediaUploadModal,
    cameraModal,
    recordModal,
    startLiveModal,
    setStartLiveModal,
    scheduleLiveModal,
    setScheduleLiveModal,
    mobileSchedule,
    setMobileSchedule,
  } = useContext(CommunityContext)

  return (
    <React.Fragment>
      {editAddressModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setEditAddressModal(false)}
          />
          <EditAddressModal />
        </React.Fragment>
      )}
      {coCreationModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => setCoCreationModal(false)}
          />
          <CoCreationModal />
        </React.Fragment>
      )}
      {createRoomModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setCreateRoomModal(false)
              setEditRecord(null)
            }}
          />
          <CreateRoomModal />
        </React.Fragment>
      )}
      {newTopicModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={15}
            onClick={() => {
              setNewTopicModal(false)
              setEditRecord(null)
            }}
          />
          <NewTopicModal />
        </React.Fragment>
      )}
      {cameraModal === true && (
        <React.Fragment>
          <CameraModal />
        </React.Fragment>
      )}
      {recordModal === true && (
        <React.Fragment>
          <RecordModal />
        </React.Fragment>
      )}
      {newConversationModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={15}
            onClick={() => {
              setNewConversationModal(false)
              setEditRecord(null)
            }}
          />
          <NewConversationModal />
        </React.Fragment>
      )}
      {newMediaUploadModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={15}
            onClick={() => {
              setNewMediaUploadModal(false)
              setEditRecord(null)
            }}
          />
          <NewMediaUploadModal />
        </React.Fragment>
      )}
      {editCommentModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setEditCommentModal(false)
              setEditRecord(null)
            }}
          />
          <EditCommentModal />
        </React.Fragment>
      )}
      {inviteFriendModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setInviteFriendModal(false)
            }}
          />
          <InviteFriendModal />
        </React.Fragment>
      )}
      {profileInfo !== null && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => setProfileInfo(null)}
          />
          <ProfileModal />
        </React.Fragment>
      )}
      {coCreationToolModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setCoCreationToolModal(false)
            }}
          />
          <CoCreationToolModal />
        </React.Fragment>
      )}
      {quickLink === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setQuickLink(false)
            }}
          />
          <QuickLink />
        </React.Fragment>
      )}
      {startLiveModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setStartLiveModal(false)
            }}
          />
          <StartLiveModal />
        </React.Fragment>
      )}
      {mobileSchedule === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setMobileSchedule(false)
            }}
          />
          <MobileScheduleOptionModal />
        </React.Fragment>
      )}
      {scheduleLiveModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setScheduleLiveModal(false)
            }}
          />
          <ScheduleLiveModal />
        </React.Fragment>
      )}
      {lightboxModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={10}
            onClick={() => {
              setLightboxModal(false)
              setLightboxAsset([])
            }}
          />
          <Lightbox />
        </React.Fragment>
      )}
      {editModal === true && (
        <React.Fragment>
          <Cover
            background={0.5}
            index={12}
            onClick={() => {
              setEditModal(false)
              setEditRecord(null)
            }}
          />
          <EditModal />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default CommunityModals
