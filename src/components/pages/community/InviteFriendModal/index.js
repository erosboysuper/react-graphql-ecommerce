import React, { useContext, useEffect, useState, useRef } from 'react'
import { MediaBlock } from 'react-placeholder/lib/placeholders'
import { useToasts } from 'react-toast-notifications'
import styled from 'styled-components'
import { ReactMultiEmail, isEmail } from 'react-multi-email'
import 'react-multi-email/style.css'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import { btn_color, gray_back } from '~/utils/colors'
import CommunityContext from '~/context/CommunityContext'
import useDebounce from '~/utils/use-debounce'

import SendIcon from '~/images/Assets/Send-contact.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import ProcessCheckIcon from '~/images/Assets/Process-check.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const InviteFriendModal = () => {
  const { addToast } = useToasts()
  const { setInviteFriendModal, roomId, roomsData, userHeaders } =
    useContext(CommunityContext)
  const [roomData, setRoomData] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [emails, setEmails] = useState([])
  const [tabName, setTabName] = useState('text')
  const [searchTerm, setSearchTerm] = useState('')
  const [apiCalled, setApiCalled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sendInvitation, setSendInvitation] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const textRef = useRef(null)
  let abortController = null

  const userStatus = user => {
    const { type } = user
    switch (type) {
      case 'member':
        return (
          <Status type={type}>
            <span>Already Member</span>
          </Status>
        )
      case 'pending':
        return (
          <Status type={type}>
            <img src={ProcessCheckIcon} alt="check-icon" />
            <span>Invitation Sent</span>
          </Status>
        )
      case 'enable':
        return (
          <Status type={type} onClick={() => sendInvite(user)}>
            <span>Invite</span>
          </Status>
        )
      default:
        return null
    }
  }

  const sendInvite = user => {
    const formData = new FormData()
    formData.append('invite_to', user.id)
    formData.append('room_id', roomId)
    fetch(`${process.env.API_BASE}/invitations/inviteUser`, {
      method: 'POST',
      async: true,
      headers: userHeaders,
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.success) {
          const _searchResults = [...searchResults]
          let _user = _searchResults.find(x => x.id === user.id)
          if (_user) {
            _user.type = `pending`
            setSearchResults(_searchResults)
          }

          addToast(`Invitation has been sent to ${user.name}`, {
            appearance: 'success',
            autoDismiss: true,
          })
        } else if (res && res.message) {
          let errors = ''
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

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setSearchTerm('')
    setEmails([])

    if (roomId) {
      let _roomData = roomsData.find(x => x.id === roomId)
      _roomData['memberIds'] = _roomData.members.map(x => x.id)
      setRoomData(_roomData)
    } else {
      setRoomData(null)
    }
  }, [tabName])

  useEffect(() => {
    setSearchResults([])
    setApiCalled(false)
    setIsLoading(false)
    if (abortController) {
      abortController.abort()
    }
    if (debouncedSearchTerm) {
      const formData = new FormData()
      if (roomId) {
        formData.append('room_id', roomId)
      }
      setIsLoading(true)
      abortController = new AbortController()
      const { signal } = abortController
      const regStr = new RegExp(debouncedSearchTerm, 'gi')
      fetch(`${process.env.API_BASE}/searchInvites/${debouncedSearchTerm}`, {
        signal,
        method: 'POST',
        async: true,
        headers: userHeaders,
        body: formData,
      })
        .then(res => res.json())
        .then(res => {
          const users = res.map(user => {
            user['nameHtml'] = user.name.replace(regStr, '<u>$&</u>')
            if (roomData) {
              user['type'] =
                roomData.memberIds.indexOf(user.id) !== -1
                  ? 'member'
                  : user['type']
            } else {
              user['type'] = 'enable'
            }
            return user
          })
          setSearchResults(users)
          setApiCalled(true)
          setIsLoading(false)
        })
    }
    return () => {
      if (abortController) {
        abortController.abort()
      }
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (sendInvitation) {
      const formData = new FormData()
      formData.append('emails', emails)
      formData.append('room_id', roomId)
      fetch(`${process.env.API_BASE}/invitations/sendInvitations`, {
        method: 'POST',
        async: true,
        headers: userHeaders,
        body: formData,
      })
        .then(res => res.json())
        .then(res => {
          setSendInvitation(false)
          setEmails([])
          if (res && res.success) {
            addToast(`Invitation has been successfully sent!`, {
              appearance: 'success',
              autoDismiss: true,
            })
          } else if (res && res.message) {
            let errors = ''
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
  }, [sendInvitation])

  return (
    <Container>
      <img src={CloseIcon} onClick={() => setInviteFriendModal(false)} />
      <Wrapper>
        <Header>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeDesktop={24}
            sizeLaptopL={22}
            color="#202122"
          >
            INVITE FRIENDS
          </Letter>
        </Header>
        <Description>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeDesktop={20}
            sizeLaptopL={18}
            color="#202122"
          >
            Invite friends or other members of TBô Community to participate on
            this room
          </Letter>
        </Description>
        <ItemWrapper>
          <Item
            selected={tabName === 'text'}
            onClick={() => setTabName('text')}
          >
            <Letter
              font={tabName === 'text' ? 'Titillium Bold' : 'Titillium Light'}
              size={18}
              sizeDesktop={24}
              sizeLaptopL={21}
              color="#202122"
            >
              Invite by name
            </Letter>
          </Item>
          <Item
            selected={tabName === 'email'}
            onClick={() => setTabName('email')}
          >
            <Letter
              font={tabName === 'email' ? 'Titillium Bold' : 'Titillium Light'}
              size={18}
              sizeDesktop={24}
              sizeLaptopL={21}
              color="#202122"
            >
              Invite by email
            </Letter>
          </Item>
        </ItemWrapper>
        <ItemWrapper>
          {tabName === 'text' && (
            <input
              ref={textRef}
              type={tabName}
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              placeholder={
                tabName === 'text'
                  ? 'Search by member name'
                  : 'Complete the Email'
              }
            />
          )}
          {tabName === 'email' && (
            <ReactMultiEmail
              placeholder="Add commas or press Tab as email separators"
              ref={textRef}
              emails={emails}
              onChange={_emails => setEmails(_emails)}
              validateEmail={email => isEmail(email)}
              getLabel={(email, index, removeEmail) => {
                return (
                  <div data-tag key={index}>
                    {email}
                    <span data-tag-handle onClick={() => removeEmail(index)}>
                      ×
                    </span>
                  </div>
                )
              }}
            />
          )}
        </ItemWrapper>
        {tabName === 'text' && (
          <FilterGroup>
            {(searchResults.length > 0 || apiCalled === true) &&
              searchResults.map(user => {
                return (
                  <UserItemWrapper key={user.id}>
                    <div>
                      <img
                        src={user.image ? user.image : dummyProfilePic}
                        alt={user.name}
                      />
                      <span
                        dangerouslySetInnerHTML={{ __html: user.nameHtml }}
                      />
                    </div>
                    <div>{userStatus(user)}</div>
                  </UserItemWrapper>
                )
              })}
            {searchResults.length === 0 && apiCalled === true && (
              <NotFound>No Record Found!</NotFound>
            )}
            {isLoading === true && (
              <PlaceholderDiv>
                <MediaBlock color="#E0E0E0" rows={2} />
                <MediaBlock color="#E0E0E0" rows={2} />
                <MediaBlock color="#E0E0E0" rows={2} />
              </PlaceholderDiv>
            )}
          </FilterGroup>
        )}
      </Wrapper>
      {tabName === 'email' && (
        <Footer>
          <InviteButton
            isActive={emails.length > 0}
            onClick={() =>
              emails.length > 0 && !sendInvitation
                ? setSendInvitation(true)
                : undefined
            }
          >
            {sendInvitation ? `SENDING...` : `SEND INVITE`}
            <img src={SendIcon} alt="send-icon" />
          </InviteButton>
        </Footer>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px;
  width: 100%;
  min-height: 70%;
  max-height: 90%;
  background: white;
  overflow: scroll;
  z-index: 12;
  & > img {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
  }
  @media ${device.laptop} {
    width: 34%;
    max-width: 800px;
    height: 100vh;
    max-height: 100%;
    padding: 20px 80px 100px 50px;
    & > img {
      top: 40px;
      left: 30px;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  letter-spacing: 3px;
`

const Description = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0px;
  @media ${device.laptop} {
    margin: 60px 0px;
  }
`

const Wrapper = styled.div`
  padding: 10px 16px 0px 16px;
  @media ${device.laptop} {
    padding: 0px;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  justify-content: start;
  @media ${device.laptop} {
    justify-content: space-between;
  }
  & input {
    width: 100% !important;
    padding: 17px 30px !important;
    background-color: #f2f2f7 !important;
    border: none !important;
    outline: none !important;
    border-radius: 0px !important;
  }
  & .react-multi-email {
    background: #f2f2f7;
    border: 0;
    & input {
      padding: 5px !important;
      height: 50px;
    }
    & div[data-tag] {
      border: 1px solid #ccc;
    }
  }
`

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 6px;
  @media ${device.laptop} {
    max-height: 375px;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #818386;
    }
  }
`

const UserItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 7px 0px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f7;
  }
  & > div {
    &:first-child {
      & img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid gray;
        margin-right: 10px;
      }
      & span {
        color: gray;
        font-size: 20px;
      }
    }
  }
`

const Status = styled.div`
  font-size: 17px;
  font-weight: 600;
  ${props => (props.type === 'enable' ? 'color: #FF8C00;' : '')}
  ${props => (props.type === 'member' ? 'color: #CECECE;' : '')}
  ${props => (props.type === 'pending' ? 'color: #161617;' : '')}
  & img {
    width: 25px;
    height: 25px;
    margin-right: 6px;
  }
`

const Item = styled.div`
  min-width: 100px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  ${props => (props.selected ? 'border-bottom:4px solid #202122' : '')};
  &:first-child {
    margin-right: 40px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

const InviteButton = styled.button`
  position: relative;
  width: 100%;
  margin-top: 20px;
  padding: 15px 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 14px;
  letter-spacing: 1px;
  outline: none;
  border: none;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : 'black')};
  & img {
    position: absolute;
    height: 70%;
    right: 10px;
    top: 10px;
  }
  @media ${device.laptop} {
    width: 80%;
    padding: 10px 30px;
    & img {
      display: none;
    }
  }
  &:hover {
    outline: none;
    border: none;
  }
  &:focus {
    outline: none;
    border: none;
  }
`

const NotFound = styled.div`
  color: #7d7f81;
  text-align: center;
`

const PlaceholderDiv = styled.div`
  & > div {
    margin-top: 10px;
  }
`

export default InviteFriendModal
