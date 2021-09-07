import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { useToasts } from 'react-toast-notifications'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import { dateFormat, formatedHtml } from '~/utils/functions'
import CommunityContext from '~/context/CommunityContext'

import PlusIcon from '~/images/Assets/PlusIcon.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const RoomBriefInfo = ({ room }) => {
  const { addToast } = useToasts()
  const { userInfo, joinRoomAction, setInviteFriendModal } =
    useContext(CommunityContext)
  const members = room.members || []
  const categories = room.categories || []
  const [roomMember, setRoomMember] = useState(false)

  useEffect(() => {
    if (userInfo && userInfo?.user?.rooms?.indexOf(room.id) !== -1) {
      setRoomMember(true)
    } else {
      setRoomMember(false)
    }
  }, [userInfo, room])

  const joinRoom = () => {
    joinRoomAction(room.id).then(res => {
      if (res && res.success) {
        addToast('Done! You have been successfully joined the room.', {
          appearance: 'success',
          autoDismiss: true,
        })
      } else if (res && res.message) {
        let errors = null
        if (typeof res.message === 'string') {
          errors = res.message
        } else {
          errors = res.message.map(x => x.messages[0].message)
          errors = errors.join('\n')
        }
        addToast(errors, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })
  }

  return (
    <Container>
      <CategoryContainer>
        {categories.map(item => {
          return (
            <CategoryItem key={item.id}>
              <Letter
                font="Titillium Web"
                size={14}
                sizeDesktop={18}
                color="#7D7F81"
              >
                {item.title}
              </Letter>
            </CategoryItem>
          )
        })}
      </CategoryContainer>
      <Content>
        <Letter
          font="Titillium Web"
          size={16}
          sizeDesktop={22}
          color="#161617"
          style={{ wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{
            __html: formatedHtml(room.description || ''),
          }}
        />
      </Content>
      <ActiveDate>
        <Letter font="Titillium Web" size={14} sizeDesktop={16} color="#F57B00">
          Active since {dateFormat(room.created_at)}
        </Letter>
      </ActiveDate>
      {!roomMember && room.type === 'public' && (
        <LargeButton onClick={() => joinRoom()}>
          <Letter font="Titillium Bold" size={20} color="white">
            JOIN THE ROOM
          </Letter>
        </LargeButton>
      )}
      <MembersShow>
        <div>
          <Letter font="Titillium Black" size={20} color="black">
            {members.length} Member{members.length > 1 ? 's' : ''}
          </Letter>
        </div>
        <Members>
          {members.map((m, index) => {
            return (
              <MemberShow key={m.id} display={index > 7 ? 'none' : 'flex'}>
                <LazyLoad>
                  <img alt={m.name} src={m.image ? m.image : dummyProfilePic} />
                </LazyLoad>
                <Letter font="Titillium Web" color="#202122" sizeDesktop={24}>
                  {m.name}
                </Letter>
              </MemberShow>
            )
          })}
          {roomMember && (
            <NewIconImage
              src={PlusIcon}
              alt="PlusIcon"
              onClick={() => setInviteFriendModal(true)}
            />
          )}
        </Members>
      </MembersShow>
      {roomMember && (
        <LargeButton onClick={() => setInviteFriendModal(true)}>
          <Letter font="Titillium Bold" size={20} color="white">
            INVITE FRIENDS
          </Letter>
        </LargeButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
`

const CategoryItem = styled.div`
  height: 30px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #a9acaf;
  margin-right: 6px;
  width: fit-content;
  @media ${device.laptop} {
    height: auto;
    padding: 10px 25px;
  }
`

const CategoryContainer = styled.div`
  display: flex;
`

const Content = styled.div`
  margin-top: 8px;
`

const ActiveDate = styled.div`
  margin-top: 12px;
`

const MembersShow = styled.div`
  margin-top: 30px;
`

const Members = styled.div`
  position: relative;
  margin: 17px 0px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 95%;
`

const NewIconImage = styled.img`
  position: absolute;
  cursor: pointer;
  right: 16px;
  top: 8px;
  @media ${device.laptop} {
    display: none;
  }
`

const MemberShow = styled.div`
  display: ${props => props.display};
  align-items: center;
  & img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin-right: -10px;
    border: solid 1px #d9d9da;
  }
  & span {
    display: none;
  }
  @media ${device.laptop} {
    display: flex;
    width: 40%;
    margin-right: 10%;
    & img {
      width: 56px;
      height: 56px;
      margin-right: 20px;
    }
    & span {
      display: block;
    }
  }
`

const LargeButton = styled.div`
  background: #ff8c00;
  height: 83px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media ${device.laptop} {
    width: 95%;
    margin: 30px 0px;
    display: flex;
    letter-spacing: 3px;
  }
`

export default RoomBriefInfo
