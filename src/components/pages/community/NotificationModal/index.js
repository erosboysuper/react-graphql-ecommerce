import React, { useContext } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import { dateFormat } from '~/utils/functions'
import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import ArrowBack from '~/images/Assets/Arrow-back.svg'

const NotificationModal = () => {
  const { setLoader } = useContext(StoreContext)
  const { setNotificationModal, notifications, setNotifications, userHeaders } =
    useContext(CommunityContext)

  const notificationAction = (status, notification) => {
    setLoader(true)
    const formData = new FormData()
    formData.append('status', status)
    fetch(`${process.env.API_BASE}/notificationAction/${notification.id}`, {
      method: 'POST',
      async: true,
      body: formData,
      headers: userHeaders,
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.success) {
          const _notifications = [...notifications]
          let _notification = _notifications.find(x => x.id === notification.id)
          _notification['actionStatus'] = true
          setNotifications(_notifications)
        }
        setLoader(false)
      })
  }

  return (
    <Container>
      <ArrowBackIcon
        src={ArrowBack}
        alt="ArrowBack"
        onClick={() => setNotificationModal(false)}
      />
      <ScrollDiv>
        {notifications.length === 0 && (
          <NoRecord>No record found yet!</NoRecord>
        )}
        {notifications.length > 0 &&
          notifications.map(notification => {
            return (
              <NotificationDiv
                key={notification.id}
                actionable={notification.type === 'action'}
              >
                <div>
                  <Letter font="Titillium Bold" size={18} color="#FF8C00">
                    {notification.user} &nbsp;
                  </Letter>
                  <Letter font="Titillium Web" size={18} color="black">
                    {' '}
                    {notification.message.replace(/{{.*?}}/gi, '')} &nbsp;
                  </Letter>
                  <Letter font="Titillium Bold" size={18} color="black">
                    {' '}
                    {notification.room ||
                      notification.topic ||
                      notification.comment}{' '}
                    &nbsp;
                  </Letter>
                  <Letter font="Titillium Web" size={14} color="#A9ACAF">
                    {' '}
                    {dateFormat(notification.created_at)} &nbsp;
                  </Letter>
                </div>
                {notification.type === 'action' && !notification.actionStatus && (
                  <Buttons>
                    <CancelButton
                      onClick={() => notificationAction('denied', notification)}
                    >
                      <Letter font="Titillium Web" size={11} color="#7D7F81">
                        CANCEL
                      </Letter>
                    </CancelButton>
                    <AcceptButton
                      onClick={() => notificationAction('accept', notification)}
                    >
                      <Letter font="Titillium Bold" size={11} color="white">
                        ACCEPT
                      </Letter>
                    </AcceptButton>
                  </Buttons>
                )}
                {notification.type === 'action' && notification.actionStatus && (
                  <Buttons>
                    <Letter font="Titillium Web" size={14} color="#7D7F81">
                      Action Performed Successfully!
                    </Letter>
                  </Buttons>
                )}
              </NotificationDiv>
            )
          })}
      </ScrollDiv>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  background: white;
  z-index: 21;
  padding-top: 100px;
  @media ${device.laptop} {
    width: 30%;
  }
`

const ArrowBackIcon = styled.img`
  position: absolute;
  left: 16px;
  top: 38px;
`

const CancelButton = styled.div`
  margin-right: 40px;
  cursor: pointer;
  padding: 7px 20px;
  border: 1px solid #7d7f81;
`

const AcceptButton = styled.div`
  background: #ff8c00;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Buttons = styled.div`
  position: absolute;
  bottom: 0px;
  right: 16px;
  display: flex;
  align-items: center;
`

const NotificationDiv = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 2px;
  padding: ${props => (props.actionable ? `10px 16px 48px 16px` : `14px 16px`)};
  background: ${props => (props.actionable ? `#f2f2f7` : `transparent`)};
`

const NoRecord = styled.div`
  width: 100%;
  color: #a9acaf;
  text-align: center;
  padding: 5px 0px 25px 0px;
`

const ScrollDiv = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
`

export default NotificationModal
