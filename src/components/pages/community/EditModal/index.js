import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import CommunityContext from '~/context/CommunityContext'

const EditModal = () => {
  const {
    setEditModal,
    setNewTopicModal,
    setEditCommentModal,
    editRecord,
    setEditRecord,
    createNewTopic,
    createNewComment,
    createNewRoom,
    setCreateRoomModal,
  } = useContext(CommunityContext)

  const closeModal = () => {
    setEditModal(false)
    setEditRecord(null)
  }

  const editRecordData = () => {
    setEditRecord(prevState => {
      return {
        ...prevState,
        action: `edit`,
      }
    })
    if (editRecord) {
      if (editRecord.type === 'topic') {
        setNewTopicModal(true)
      } else if (editRecord.type === 'comment') {
        setEditCommentModal(true)
      } else if (editRecord.type === 'room') {
        setCreateRoomModal(true)
      }
    }
    setEditModal(false)
  }

  const deleteRecord = () => {
    setEditRecord(prevState => {
      return {
        ...prevState,
        action: `delete`,
      }
    })
  }

  useEffect(() => {
    // MAKE API CALL TO DELETE THE RECORD //
    if (editRecord && editRecord.action === 'delete') {
      const formData = new FormData()
      formData.append('data', JSON.stringify({ status: `delete` }))
      if (editRecord.type === 'topic') {
        createNewTopic(formData).then(() => {
          closeModal()
        })
      } else if (editRecord.type === 'comment') {
        createNewComment(formData).then(() => {
          closeModal()
        })
      } else if (editRecord.type === 'room') {
        createNewRoom(formData).then(() => {
          closeModal()
        })
      } else {
        closeModal()
      }
    }
  }, [editRecord])

  return (
    <Container>
      <img src={CloseIcon} onClick={() => closeModal()} />
      <Header>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeDesktop={20}
          sizeLaptopL={18}
          color="#202122"
        >
          COMMUNITY SETTINGS
        </Letter>
      </Header>
      <EditButton onClick={() => editRecordData()}>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeDesktop={20}
          color="#202122"
        >
          Edit
        </Letter>
      </EditButton>
      <DeleteButton onClick={() => deleteRecord()}>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeDesktop={20}
          color="#202122"
        >
          Delete
        </Letter>
      </DeleteButton>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  background: white;
  padding-bottom: 30px;
  z-index: 13;
  & img {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  @media ${device.laptop} {
    left: unset;
    right: 0px;
    width: 34%;
    height: 100vh;
    padding-left: 2%;
    & img {
      position: absolute;
      top: 40px;
      left: 20px;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  letter-spacing: 3px;
  @media ${device.laptop} {
    margin-top: 40px;
  }
`

const EditButton = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 5px;
  border: 1px solid #cecece;
  cursor: pointer;
  @media ${device.laptop} {
    width: 80%;
    margin-top: 30vh;
    height: 83px;
  }
`

const DeleteButton = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cecece;
  cursor: pointer;
  @media ${device.laptop} {
    width: 80%;
    height: 83px;
  }
`

export default EditModal
