import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import { btn_color, gray_back } from '~/utils/colors'
import CommunityContext from '~/context/CommunityContext'

import ShowPasswordIcon from '~/images/Assets/Show password.svg'
import HidePasswordIcon from '~/images/Assets/Hide password.svg'

const CommunityLogin = () => {
  const { addToast } = useToasts()
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  const [button, setButton] = useState(false)
  const [sendingData, setSendingData] = useState(false)
  const { setLoginModal, setSignUpModal, setForgotModal, userLogin } =
    useContext(CommunityContext)

  useEffect(() => {
    const isValidEmail = reg.test(`${email}`.toLowerCase())
    if (email !== '' && isValidEmail && password !== '') setButton(true)
    else setButton(false)
  }, [email, password])

  useEffect(() => {
    if (sendingData) {
      const formData = new FormData()
      formData.append('identifier', email)
      formData.append('password', password)
      formData.append('fcm_token', window['currentToken'] || '')

      userLogin(formData).then(res => {
        if (res && res.jwt) {
          addToast('You have been successfully logged in.', {
            appearance: 'success',
            autoDismiss: true,
          })
          setEmail('')
          setPassword('')
          setButton(false)
          setLoginModal(false)
        } else if (res && res.message) {
          setSendingData(false)
          let errors = res.message.map(x => x.messages[0].message)
          errors = errors.join('\n')
          addToast(errors, {
            appearance: 'error',
            autoDismiss: true,
          })
        }
      })
    }
  }, [sendingData])

  return (
    <Container>
      <Wrapper>
        <Header>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeDesktop={20}
            color="#202122"
          >
            {button ? 'LOG INTO YOUR ACCOUNT' : 'JOIN THE CO-CREATION MOVEMENT'}
          </Letter>
        </Header>
        <LoginForms>
          <InputField
            padding={email !== '' ? '30px 20px 10px' : '0px 20px'}
            display={email !== '' ? 'block' : 'none'}
          >
            <Letter
              font="Titillium Bold"
              size={11}
              sizeLaptop={16}
              sizeLaptopL={18}
              sizeDesktop={18}
            >
              Email
            </Letter>
            <input
              placeholder="Enter your Email"
              onChange={event => setEmail(event.target.value)}
              value={email}
            />
          </InputField>
          <PasswordField
            padding={password !== '' ? '30px 20px 10px' : '0px 20px'}
            display={password !== '' ? 'block' : 'none'}
          >
            <Letter
              font="Titillium Bold"
              size={11}
              sizeLaptop={16}
              sizeLaptopL={18}
              sizeDesktop={18}
            >
              Password
            </Letter>
            <InputContain>
              <input
                type={passwordShow ? 'text' : 'password'}
                onChange={event => setPassword(event.target.value)}
                placeholder="Complete your password"
              />
              <img
                src={passwordShow ? HidePasswordIcon : ShowPasswordIcon}
                onClick={() => setPasswordShow(!passwordShow)}
              />
            </InputContain>
          </PasswordField>
          <ForgotLetter>
            <Letter
              font="Titillium Web"
              size={14}
              sizeDesktop={16}
              color="#A9ACAF"
              onClick={() => {
                setLoginModal(false)
                setForgotModal(true)
              }}
            >
              Forgot Password?
            </Letter>
          </ForgotLetter>
        </LoginForms>
        {!button && (
          <CreateAccount>
            <Letter font="Titillium Bold" size={16} color="#202122">
              I’m new here. &nbsp;
            </Letter>
            <Letter
              font="Titillium Bold"
              size={16}
              color="#FF8C00"
              onClick={() => {
                setLoginModal(false)
                setSignUpModal(true)
              }}
              style={{ cursor: 'pointer' }}
            >
              Create Account
            </Letter>
          </CreateAccount>
        )}
        {button && (
          <LoginButton onClick={() => setSendingData(button)} isActive={button}>
            <Letter
              font="Titillium Bold"
              size={16}
              color={button ? 'white' : 'black'}
            >
              {sendingData ? `LOGGING...` : `LOGIN`}
            </Letter>
          </LoginButton>
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
  display: flex;
  justify-content: center;
  letter-spacing: 2px;
  @media ${device.tablet} {
    margin: 50px 0px;
  }
`

const LoginForms = styled.div`
  margin-top: 50px;
  & input {
    width: 100%;
    padding: 15px 18px;
    font-size: 16px;
    font-family: Titillium Web;
    margin-bottom: 6px;
    margin-top: 6px;
  }
  & input ::placeholder {
    font-family: Titillium Light;
    font-size: 16px;
  }
  @media ${device.tablet} {
    margin-top: 0px;
  }
`

const InputField = styled.div`
  & {
    position: relative;
  }
  & input {
    width: 100%;
    height: 54px;
    font-size: 16px;
    padding: ${props => props.padding};
    background: #f2f2f7;
    font-family: 'Titillium Bold';
    border: none;
  }

  & span {
    position: absolute;
    top: 10px;
    left: 17px;
    color: #a9acaf;
    font-size: 15px;
    font-family: 'Titillium Web';
    display: ${props => props.display};
  }
  @media ${device.tablet} {
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
      color: #202122;
      font-family: 'Titillium Bold';
    }
    & input {
      font-size: 20px;
      padding: 0px 20px;
      height: 54px;
      font-family: 'Titillium Web';
    }
  }
`

const PasswordField = styled.div`
  & {
    position: relative;
  }
  & input {
    width: 100%;
    height: 54px;
    font-size: 16px;
    font-family: 'Titillium Bold';
    background: #f2f2f7;
    border: none;
    padding: ${props => props.padding};
  }

  & span {
    position: absolute;
    top: 10px;
    left: 17px;
    color: #a9acaf;
    font-size: 15px;
    font-family: 'Titillium Web';
    display: ${props => props.display};
  }
  & img {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(10px, -50%);
  }
  @media ${device.tablet} {
    padding-top: 30px;
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
      color: #202122;
      font-family: 'Titillium Bold';
    }
    & input {
      font-size: 16px;
      padding: 0px 10px;
      height: 42px;
      font-family: 'Titillium Web';
    }
    & img {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translate(10px, -50%);
    }
  }
`

const CreateAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 60px;
  @media ${device.tablet} {
    text-align: unset;
    margin-top: 105px;
  }
`

const LoginButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  border: 0px;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  cursor: ${props => (props.isActive ? 'pointer' : 'unset')};
  @media ${device.tablet} {
    width: calc(100% - 400px);
    left: 50%;
    transform: translate(-50%, 50%);
  }
`

const ForgotLetter = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  @media ${device.tablet} {
  }
`

const InputContain = styled.div`
  & img {
    cursor: pointer;
  }
  @media ${device.tablet} {
    position: relative;
  }
`

export default CommunityLogin
