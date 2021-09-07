import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { MobileContain, Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'
import StoreContext from '~/context/StoreContext'
import ToggleSwitch from '~/components/Common/ToggleSwitch'
import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

const notificationSettings = [
  {
    key: `enable_broadcast`,
    label: `Broadcast Notifications`,
    value: true,
  },
  {
    key: `enable_news`,
    label: `News Notifications`,
    value: true,
  },
  {
    key: `enable_room_alerts`,
    label: `Room Notifications`,
    value: true,
  },
  {
    key: `enable_topic_alerts`,
    label: `Topic Notifications`,
    value: true,
  },
]

const RoomList = ({ closeCB }) => {
  const _isMounted = useRef(true)
  const { userInfo, setUserInfo, userHeaders } = useContext(CommunityContext)
  const { setLoader } = useContext(StoreContext)

  const [notifications, setNotifications] = useState([])

  const onChangeHandler = (type, flag) => {
    let _notifications = [...notifications]
    const index = _notifications.findIndex(x => x.key === type)
    if (index !== -1) {
      _notifications[index].value = flag
    }
    setNotifications(_notifications)
  }

  const saveSettings = () => {
    setLoader(true)
    const user_settings = userInfo.user.user_settings || {}
    const postData = {}
    notifications.forEach(x => {
      postData[x.key] = x.value
    })
    const formData = new FormData()
    formData.append('data', JSON.stringify(postData))
    fetch(`${process.env.API_BASE}/user-notifications/${userInfo.user.id}`, {
      method: 'PUT',
      async: true,
      body: formData,
      headers: userHeaders,
    }).then(() => {
      setUserInfo(prevState => {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            user_settings: {
              ...user_settings,
              ...postData,
            },
          },
        }
      })
      setLoader(false)
    })
  }

  useEffect(() => {
    const _notificationSettings = notificationSettings.map(data => {
      data.value =
        typeof userInfo.user.user_settings !== 'undefined' &&
        typeof userInfo.user.user_settings[data.key] !== 'undefined'
          ? userInfo.user.user_settings[data.key]
          : data.value
      return data
    })
    setNotifications(_notificationSettings)

    return () => {
      _isMounted.current = false
    }
  }, [])

  return (
    <Container>
      <MobileContain>
        <img src={ArrowBackImg} onClick={() => closeCB()} />
      </MobileContain>

      <ItemContainer>
        {notifications.map(item => (
          <Item key={item.key}>
            <label htmlFor={item.key}>{item.label}</label>
            <ToggleSwitch
              small
              id={item.key}
              checked={item.value}
              onChange={onChangeHandler}
            />
          </Item>
        ))}
      </ItemContainer>
      <EditButton onClick={() => saveSettings()}>
        <Letter
          font="Titillium Bold"
          sizeDesktop={20}
          sizeLaptopL={18}
          sizeLaptop={16}
          size={16}
          color="white"
        >
          SAVE SETTINGS
        </Letter>
      </EditButton>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: 103;
  bottom: 0px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
  background: white;
  padding-top: 38px;
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    padding-top: 0px;
    position: relative;
    min-height: unset;
    left: unset;
    bottom: unset;
    overflow-y: unset;
    height: unset;
    background: unset;
    z-index: unset;
  }
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0px 0 0px;
  box-shadow: 0 5px 15px rgb(0 0 0 / 3%);
`

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  cursor: pointer;
  background: #ff8c00;
  padding: 10px 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: 0px;
  position: fixed;
  width: 100%;
  bottom: 0px;
  @media ${device.laptop} {
    margin-right: 15px;
    position: relative;
    height: 50px;
    width: auto;
  }
`

export default RoomList
