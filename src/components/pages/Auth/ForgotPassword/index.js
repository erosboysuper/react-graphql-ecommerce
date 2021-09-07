import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import { btn_color, gray_back } from '~/utils/colors'
import CommunityContext from '~/context/CommunityContext'
import StoreContext from '~/context/StoreContext'

// import CloseIcon from '~/images/Assets/Close-modal.svg'

const ForgotPassword = () => {
  const { addToast } = useToasts()
  const { setForgotModal, setLoginModal } = useContext(CommunityContext)
  const { setLoader } = useContext(StoreContext)
  const [email, setEmail] = useState('')
  const [button, setButton] = useState(false)
  const [sentResetLink, setSentResetLink] = useState(false)
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  useEffect(() => {
    const isValidEmail = reg.test(`${email}`.toLowerCase())
    if (email !== '' && isValidEmail) setButton(true)
    else setButton(false)
  }, [email])

  const forgotPassword = () => {
    if (button) {
      setLoader(true)
      fetch(`${process.env.API_BASE}/auth/forgot-password`, {
        method: 'POST',
        async: true,
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          if (res && res.ok) {
            addToast('Reset password link has been sent on your email.', {
              appearance: 'success',
              autoDismiss: true,
            })
            // setEmail('')
            setSentResetLink(true)
          } else if (res && res.message) {
            let errors = res.message.map(x => x.messages[0].message)
            errors = errors.join('\n')
            addToast(errors, {
              appearance: 'error',
              autoDismiss: true,
            })
          }
        })
    }
  }

  const handleTryAnotherEmail = () => {
    setSentResetLink(false)
    setEmail('')
  }

  return (
    <Container>
      <Wrapper>
        <Header>
          <Letter font="Titillium Bold" size={16} color="#202122">
            FORGOT PASSWORD
          </Letter>
          {/* {!sentResetLink && (
            <img
              src={CloseIcon}
              alt="CloseIcon"
              onClick={() => setForgotModal(false)}
            />
          )} */}
        </Header>
        {sentResetLink ? (
          <React.Fragment>
            <SentTitle>Check your email!</SentTitle>
            <SentDescription>
              We have sent you a reset password link to your email{' '}
              <span>{email}</span>
            </SentDescription>
            <SentResultWrapper>
              <div>Did not receive the email?</div>
              <div>
                Check in spam or{' '}
                <span onClick={() => handleTryAnotherEmail()}>
                  try another email address
                </span>
              </div>
            </SentResultWrapper>
            <OpenEmailButton
              onClick={() => {
                setForgotModal(false)
                setLoginModal(true)
              }}
            >
              Go back to login
            </OpenEmailButton>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Title>
              <div>
                <Letter font="Titillium Bold" size={18} color="#202122">
                  Don’t worry!
                </Letter>
              </div>
              <Letter font="Titillium Web" size={18} color="#202122">
                Just complete your email associated with your account and we
                will send you the recovery link.
              </Letter>
            </Title>
            <InputField
              padding={email !== '' ? 15 : 5}
              display={email !== '' ? 'block' : 'none'}
            >
              <Letter
                font="Titillium Bold"
                size={11}
                sizeLaptop={16}
                sizeLaptopL={18}
                sizeDesktop={20}
              >
                Email
              </Letter>
              <input
                placeholder="Enter your Email"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
            </InputField>
            <LoginLetter>
              <Letter
                font="Titillium Web"
                size={14}
                sizeDesktop={16}
                color="#A9ACAF"
                onClick={() => {
                  setForgotModal(false)
                  setLoginModal(true)
                }}
              >
                Go back to login
              </Letter>
            </LoginLetter>
            <SendButton
              onClick={() => (button ? forgotPassword() : null)}
              isActive={button}
            >
              <Letter font="Titillium Bold" size={16}>
                SEND RESET LINK
              </Letter>
            </SendButton>
          </React.Fragment>
        )}
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #f7f7fa;
  z-index: 21;
  @media ${device.tablet} {
  }
`

const Wrapper = styled.div`
  position absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 30px 20px;  

  @media ${device.tablet} {
  left: 50%;
  top: 45%;
  width: 65%;
  height: 550px;
  max-width: 850px;
  transform: translate(-50%, -50%);
  padding: 0px 200px;
  }
`

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  letter-spacing: 3px;
  & img {
    position: absolute;
    top: 0px;
    right: 10px;
  }
  @media ${device.laptop} {
    margin: 70px 0px;
    & img {
      display: none;
    }
  }
`

const SentTitle = styled.div`
  margin: 30px 0 10px 0;
  font-size: 18px;
  font-family: Titillium Bold;
  @media ${device.tablet} {
    margin: 0 0 10px 0px;
    font-family: Titillium Black;
  }
`

const SentDescription = styled.div`
  font-size: 18px;
  & span {
    font-family: Titillium Bold;
  }

  @media ${device.tablet} {
    font-size: 18px;
  }
`

const SentResultWrapper = styled.div`
  color: #202122;
  font-size: 14px;
  margin-top: 100px;
  & span {
    cursor: pointer;
    color: #ff8c00;
    &:hover {
      transform: scale(1.05);
    }
  }

  @media ${device.tablet} {
    font-size: 15px;
    font-family: Titillium Bold;
  }
`

const Title = styled.div`
  margin-top: 50px;
  & span {
    margin-bottom: 8px;
  }
`

const SendButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  letter-spacing: 2px;
  border: none;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : 'black')};
  @media ${device.tablet} {
    left: 50%;
    transform: translate(-50%, 50%);
    width: calc(100% - 400px);
  }
`

const OpenEmailButton = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  letter-spacing: 2px;
  border: none;
  background: #ff8c00;
  color: white;
  font-family: Titillium Bold;
  cursor: pointer;
  @media ${device.tablet} {
    left: 50%;
    transform: translate(-50%, 50%);
    width: calc(100% - 400px);
  }
`

const InputField = styled.div`
  & {
    padding: 10px 0px;
    position: relative;
  }
  & input {
    width: 100%;
    height: 54px;
    font-size: 16px;
    margin-top: 7px;
    padding: ${props => props.padding}px 10px 0px;
    background: #f2f2f7;
    border: none;
    font-family: 'Titillium Bold';
  }

  & span {
    position: absolute;
    top: 23px;
    left: 10px;
    color: #a9acaf;
    display: ${props => props.display};
  }
  @media ${device.laptop} {
    padding-top: 50px;
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
      color: black;
    }
    & input {
      font-size: 16px;
      padding: 0px 10px;
      height: 42px;
      font-family: 'Titillium Web';
    }
  }
  @media ${device.laptopL} {
    padding-top: 60px;
    & input {
      font-size: 18px;
      padding: 0px 10px;
      height: 46px;
    }
  }
  @media ${device.desktop} {
    padding-top: 90px;
    & input {
      font-size: 20px;
      padding: 0px 10px;
      height: 54px;
    }
  }
`

const LoginLetter = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`

export default ForgotPassword
