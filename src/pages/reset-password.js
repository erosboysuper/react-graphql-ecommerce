import React, { useContext, useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import { btn_color, gray_back } from '~/utils/colors'

import StoreContext from '~/context/StoreContext'

import SEO from '~/components/seo'

import ShowPasswordIcon from '~/images/Assets/Show password.svg'
import HidePasswordIcon from '~/images/Assets/Hide password.svg'

const ResetPasswordPage = ({
  location,
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  const { addToast } = useToasts()
  const [formData, setFormData] = useState({})
  const [code, setCode] = useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const { setLoader, setLocale, setLocaleFolder } = useContext(StoreContext)

  useEffect(() => {
    const qryParams = new URLSearchParams(location.search)
    const _code = qryParams.get('code')
    setCode(_code || '')
  }, [])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  useEffect(() => {
    if (formData.password && formData.password !== '') {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [formData])

  const setValue = (field, value) => {
    setFormData(prevState => {
      return { ...prevState, [field]: value }
    })
  }

  const submitAction = () => {
    if (showButton && code) {
      const postData = JSON.stringify({
        code: `${code}`,
        password: `${formData.password}`,
        passwordConfirmation: `${formData.password}`,
      })

      setLoader(true)
      fetch(`${process.env.API_BASE}/auth/reset-password`, {
        method: 'POST',
        async: true,
        body: postData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setLoader(false)
          if (res && res.ok) {
            setFormData({
              password: '',
            })
            addToast('Password has been reset successfully.', {
              appearance: 'success',
              autoDismiss: true,
            })
          } else if (res && res.message) {
            let errors = res.message.map(x => x.messages[0].message)
            errors = errors.join('\n')
            addToast(errors, {
              appearance: 'error',
              autoDismiss: true,
            })
          }
        })
    } else if (showButton && !code) {
      addToast('Invalid request to reset password.', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <Container>
      <Wrapper>
        <SEO
          title={`Reset Password`}
          description={`Reset Password`}
          keywords={[`tbo clothing`, `underwears`, `tbo`, `Reset Password`]}
        />
        <Header>
          <Letter font="Titillium Bold" size={16} color="#202122">
            RESET YOUR PASSWORD
          </Letter>
        </Header>
        <Content>
          <Title>Create a new password</Title>
          <Description>
            Please choose a new password for your account{' '}
            {/* <span>xxxxxxxx@gmail.com</span> */}
          </Description>
          <InputField
            padding={
              formData.password && formData.password !== ''
                ? '25px 20px 10px'
                : '0px 20px'
            }
            display={
              formData.password && formData.password !== '' ? 'block' : 'none'
            }
          >
            <span> New password</span>
            <input
              type={passwordShow ? 'text' : 'password'}
              placeholder="Enter New Password"
              onChange={e => setValue('password', e.target.value)}
              value={formData.password || ''}
            />
            <img
              src={passwordShow ? HidePasswordIcon : ShowPasswordIcon}
              onClick={() => setPasswordShow(!passwordShow)}
            />
          </InputField>
          <ContinueButton
            onClick={() => (showButton ? submitAction() : null)}
            isActive={showButton}
          >
            <Letter font="Titillium Bold" size={16} sizeDesktop={16}>
              RESET PASSWORD
            </Letter>
          </ContinueButton>
        </Content>
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
  padding: 0px 160px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  letter-spacing: 2px;
  @media ${device.tablet} {
    margin: 70px 0 100px 0;
    letter-spacing: 3px;
  }
`

const Content = styled.div`
  margin-top: 40px;
`

const Title = styled.div`
  text-align: unset;
  font-size: 18px;
  font-family: Titillium Bold;
  margin-bottom: 10px;
  @media ${device.tablet} {
    text-align: center;
    margin-bottom: 0px;
  }
`

const Description = styled.div`
  text-align: unset;
  margin-bottom: 30px;
  font-size: 18px;
  line-height: 20px;
  & span {
    font-family: Titillium Bold;
  }

  @media ${device.tablet} {
    font-size: 16px;
    text-align: center;
    margin-bottom: 0px;
  }
`

const InputField = styled.div`
  position: relative;
  text-align: center;

  & input {
    text-align: left;
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-family: Titillium Bold;
    background: #f2f2f7;
    border: none;
    padding: ${props => props.padding};
    &:hover {
      outline: none;
      border: none;
    }
    &:active {
      outline: none;
      border: none;
    }
  }
  & span {
    position: absolute;
    top: 4px;
    left: 20px;
    color: #a9acaf;
    font-size: 13px;
    font-family: 'Titillium Web';
    display: ${props => props.display};
  }
  & img {
    position: absolute;
    top: 50%;
    right: 20px;
    width: 17px;
    cursor: pointer;
    transform: translate(0, -50%);
  }
  @media ${device.tablet} {
    margin: 65px 0px 10px 0px;
    & input {
      text-align: center;
      padding: 0px 20px;
    }

    & span {
      display: none;
    }
  }
`

const ContinueButton = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  letter-spacing: 2px;
  border: none;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : 'black')};
  font-family: Titillium Bold;
  cursor: pointer;

  @media ${device.tablet} {
    width: calc(100% - 400px);
    max-width: 350px;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`

export default ResetPasswordPage
