import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications'

import { device } from '~/utils/device'
import { btn_color, gray_back } from '~/utils/colors'
import { Letter, Space, MobileContain, DesktopContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'

const SignupForm = ({ setUserProfile }) => {
  const { addToast } = useToasts()
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const { signUpStepNum, setSignUpStepNum, totalSignUpSteps, userSignup } =
    useContext(CommunityContext)
  const [showButton, setShowButton] = useState(false)
  const [formData, setFormData] = useState({})

  const setValue = (field, value) => {
    setFormData(prevState => {
      return { ...prevState, [field]: value }
    })
  }

  const createAccount = () => {
    const postData = JSON.stringify({
      first_name: `${formData.email}`,
      email: `${formData.email}`,
      username: `${formData.email}`,
      password: `${formData.password}`,
      confirmed: false,
      blocked: false,
      fcm_token: window['currentToken'] || '',
    })
    userSignup(postData).then(res => {
      if (res && res.ok) {
        addToast(
          'Email confirmation link have been sent on your registered email id. Please confirm on your email before login.',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        )
        setSignUpStepNum(signUpStepNum + 1)
        setFormData({
          token: res.token || null,
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
  }

  const saveAndContinue = () => {
    if (signUpStepNum === 1) {
      createAccount()
    } else {
      setUserProfile(formData)
      setSignUpStepNum(signUpStepNum + 1)
    }
  }

  useEffect(() => {
    if (
      signUpStepNum === 1 &&
      formData.email &&
      formData.email !== '' &&
      reg.test(`${formData.email}`.toLowerCase()) &&
      formData.password &&
      formData.password !== '' &&
      formData.cpassword &&
      formData.cpassword !== '' &&
      formData.password === formData.cpassword
    ) {
      setShowButton(true)
    } else if (
      signUpStepNum > 1 &&
      formData.first_name &&
      formData.first_name !== '' &&
      formData.last_name &&
      formData.last_name !== '' &&
      formData.phone &&
      formData.phone !== ''
    ) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [formData, signUpStepNum])

  return (
    <Container>
      <DesktopContain>
        {signUpStepNum > 1 && (
          <Letter
            font="Titillium Web"
            size={20}
            sizeDesktop={24}
            color="#202122"
          >
            <Letter
              font="Titillium Bold"
              size={20}
              sizeDesktop={24}
              color="#202122"
            >
              {signUpStepNum - 1}{' '}
            </Letter>
            &nbsp; / {totalSignUpSteps}
          </Letter>
        )}
        <QuestionDesktop>
          <Letter
            font="Titillium Bold"
            size={20}
            sizeDesktop={26}
            color="#202122"
          >
            General Information
          </Letter>
        </QuestionDesktop>
      </DesktopContain>
      <ContentDiv>
        <Question>
          <Letter font="Titillium Bold" size={20} color="#202122">
            General Information
          </Letter>
        </Question>
        <AnswerDiv>
          {signUpStepNum === 1 && (
            <React.Fragment>
              <InputField
                padding={formData.email && formData.email !== '' ? 15 : 5}
                display={
                  formData.email && formData.email !== '' ? 'block' : 'none'
                }
              >
                <Letter
                  font="Titillium Web"
                  size={11}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#A9ACAF"
                >
                  Your Email *
                </Letter>
                <input
                  placeholder="Your Email *"
                  onChange={e => setValue('email', e.target.value)}
                  value={formData.email || ''}
                />
              </InputField>
              <InputField
                padding={formData.password && formData.password !== '' ? 15 : 5}
                display={
                  formData.password && formData.password !== ''
                    ? 'block'
                    : 'none'
                }
              >
                <Letter
                  font="Titillium Web"
                  size={11}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#A9ACAF"
                >
                  Password *
                </Letter>
                <input
                  type="password"
                  placeholder="Password *"
                  onChange={e => setValue('password', e.target.value)}
                  value={formData.password || ''}
                />
              </InputField>
              <InputField
                padding={
                  formData.cpassword && formData.cpassword !== '' ? 15 : 5
                }
                display={
                  formData.cpassword && formData.cpassword !== ''
                    ? 'block'
                    : 'none'
                }
              >
                <Letter
                  font="Titillium Web"
                  size={11}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#A9ACAF"
                >
                  Confirm Password *
                </Letter>
                <input
                  type="password"
                  placeholder="Confirm Password *"
                  onChange={e => setValue('cpassword', e.target.value)}
                  value={formData.cpassword || ''}
                />
              </InputField>
            </React.Fragment>
          )}
          {signUpStepNum > 1 && (
            <React.Fragment>
              <InputField
                padding={
                  formData.first_name && formData.first_name !== '' ? 15 : 5
                }
                display={
                  formData.first_name && formData.first_name !== ''
                    ? 'block'
                    : 'none'
                }
              >
                <Letter
                  font="Titillium Web"
                  size={11}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#A9ACAF"
                >
                  First Name *
                </Letter>
                <input
                  placeholder="First Name *"
                  onChange={e => setValue('first_name', e.target.value)}
                  value={formData.first_name || ''}
                />
              </InputField>
              <InputField
                padding={
                  formData.last_name && formData.last_name !== '' ? 15 : 5
                }
                display={
                  formData.last_name && formData.last_name !== ''
                    ? 'block'
                    : 'none'
                }
              >
                <Letter
                  font="Titillium Web"
                  size={11}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#A9ACAF"
                >
                  Last Name *
                </Letter>
                <input
                  placeholder="Last Name *"
                  onChange={e => setValue('last_name', e.target.value)}
                  value={formData.last_name || ''}
                />
              </InputField>
              <InputField
                padding={formData.phone && formData.phone !== '' ? 15 : 5}
                display={
                  formData.phone && formData.phone !== '' ? 'block' : 'none'
                }
              >
                <Letter
                  font="Titillium Web"
                  size={11}
                  sizeLaptop={16}
                  sizeLaptopL={18}
                  sizeDesktop={20}
                  color="#A9ACAF"
                >
                  Phone Number *
                </Letter>
                <input
                  placeholder="Phone Number *"
                  onChange={e => setValue('phone', e.target.value)}
                  value={formData.phone || ''}
                />
              </InputField>
            </React.Fragment>
          )}
        </AnswerDiv>
      </ContentDiv>
      <MobileContain>
        <Space height={193} />
      </MobileContain>
      <ContinueButton
        onClick={() => (showButton ? saveAndContinue() : null)}
        isActive={showButton}
      >
        <Letter font="Titillium Bold" size={16} sizeDesktop={20}>
          {signUpStepNum === 1
            ? `SUBMIT`
            : signUpStepNum > 1 && totalSignUpSteps !== signUpStepNum - 1
            ? `CONTINUE`
            : `SUBMIT`}
        </Letter>
      </ContinueButton>
    </Container>
  )
}

const Container = styled.div`
  padding: 0px 16px 0px 16px;
  position: relative;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #b8b5b5;
  }
  @media ${device.laptop} {
    padding: 50px 16px 40px 16px;
    position: relative;
    background: white;
    min-height: 65vh;
    max-height: 90vh;
    text-align: center;
    overflow-y: auto;
    & textarea {
      font-size: 20px;
    }
  }
`

const QuestionDesktop = styled.div`
  margin-top: 8px;
`

const Question = styled.div`
  margin-bottom: 16px;
  @media ${device.laptop} {
    display: none;
  }
`

const ContentDiv = styled.div`
  @media ${device.laptop} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const AnswerDiv = styled.div`
  @media ${device.laptop} {
    width: 80%;
  }
`

const InputField = styled.div`
  & {
    text-align: left;
    padding: 10px 0px;
    position: relative;
  }
  & input {
    width: 100%;
    height: 54px;
    font-size: 16px;
    padding: ${props => props.padding}px 10px 0px;
    background: #f2f2f7;
    border: none;
  }
  & span {
    position: absolute;
    top: 23px;
    left: 10px;
    display: ${props => props.display};
  }
  @media ${device.laptop} {
    padding: 15px 0px;
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
    }
    & input {
      font-size: 16px;
      padding: 0px 10px;
      height: 42px;
    }
  }
  @media ${device.laptopL} {
    padding-top: 30px;
    & input {
      font-size: 18px;
      padding: 0px 10px;
      height: 46px;
    }
  }
  @media ${device.desktop} {
    padding-top: 40px;
    & input {
      font-size: 20px;
      padding: 0px 10px;
      height: 54px;
    }
  }
`

const ContinueButton = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  height: 60px;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : 'black')};
  bottom: 0px;
  left: 0px;
  cursor: pointer;
  font-family: Titillium Bold;
  @media ${device.laptop} {
    position: relative;
    bottom: 0px;
    width: 35%;
    left: 50%;
    transform: translate(-50%, 50%);
    margin-bottom: 20px;
  }
`

export default SignupForm
