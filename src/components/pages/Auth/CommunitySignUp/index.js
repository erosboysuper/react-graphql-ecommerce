import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'

import StatusBar from '~/components/pages/Auth/StatusBar'
import QuestionItem from '~/components/pages/Auth/QuestionItem'
import SignupForm from '~/components/pages/Auth/SignupForm'

const CommunitySignUp = () => {
  const {
    signUpStepNum,
    setSignUpStepNum,
    setTotalSignUpSteps,
    onboardingQuestions,
    setOnboardingQuestions,
    setSignUpModal,
    setLoginModal,
  } = useContext(CommunityContext)

  const [userProfile, setUserProfile] = useState({})

  const getOnboardingQuestions = () => {
    fetch(`${process.env.API_BASE}/onboarding-questionnaire`, {
      method: 'GET',
      async: true,
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.questions) {
          setOnboardingQuestions(res.questions)
          setTotalSignUpSteps(res.questions.length + 1)
        }
      })
  }

  useEffect(() => {
    if (onboardingQuestions.length === 0) {
      getOnboardingQuestions()
    }
  }, [])

  return (
    <Container height={signUpStepNum === 0 ? 'auto' : '100%'}>
      <Wrapper>
        {signUpStepNum === 0 && (
          <StartPoint>
            <ContentWrapper>
              <Content>
                <Letter
                  font="Titillium Black"
                  size={20}
                  sizeDesktop={24}
                  color="black"
                >
                  Want to join the conversation?
                </Letter>
                <AnswerLetter>
                  <Letter
                    font="Titillium Web"
                    size={18}
                    sizeDesktop={22}
                    color="#202122"
                  >
                    Let’s answer a few very important questions first…
                  </Letter>
                </AnswerLetter>
                <Letter
                  font="Titillium Web"
                  size={14}
                  sizeDesktop={14}
                  color="#A9ACAF"
                >
                  Only 2 minutes to complete
                </Letter>
              </Content>
            </ContentWrapper>
            <TipLetter>
              <Letter
                font="Titillium Bold"
                size={16}
                sizeDesktop={18}
                color="#202122"
              >
                I have an account already.&nbsp;{' '}
              </Letter>
              <Letter
                font="Titillium Bold"
                size={16}
                sizeDesktop={18}
                color="#FF8C00"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSignUpModal(false)
                  setLoginModal(true)
                }}
              >
                Log in
              </Letter>
            </TipLetter>
            <StartButton onClick={() => setSignUpStepNum(1)}>
              <Letter
                font="Titillium Bold"
                size={16}
                sizeDesktop={20}
                color="white"
              >
                START
              </Letter>
            </StartButton>
          </StartPoint>
        )}
        <StatusContainer>
          {(signUpStepNum === 1 || signUpStepNum === 2) && (
            <SignupForm setUserProfile={setUserProfile} />
          )}
          {signUpStepNum >= 2 && (
            <BarContain>
              <StatusBar />
            </BarContain>
          )}
          {signUpStepNum > 2 &&
            onboardingQuestions.map((question, index) =>
              signUpStepNum === index + 3 ? (
                <QuestionItem
                  key={question.id}
                  question={question}
                  index={index}
                  userProfile={userProfile}
                />
              ) : null
            )}
        </StatusContainer>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 30px 20px;
  & > img {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
  }

  @media ${device.tablet} {
  left: 50%;
  top: 50%;
  width: 65%;
  height: 550px;
  max-width: 850px;
  transform: translate(-50%, -50%);
  padding: 0px;
  & > img {
    display: none;
  }
  }
`

const StatusContainer = styled.div`
  @media ${device.laptop} {
  }
`

const StartPoint = styled.div``

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  text-align: center;
  margin-bottom: 40%;
  max-width: 500px;
  @media ${device.laptop} {
    text-align: unset;
    margin-bottom: 10%;
  }
`

const AnswerLetter = styled.div`
  @media ${device.laptop} {
  }
`

const TipLetter = styled.div`
  text-align: center;
  margin-bottom: 300px;
  @media ${device.laptop} {
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translate(-50%, 0);
    margin-bottom: 0;
  }
`

const StartButton = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #ff8c00;
  height: 75px;
  letter-spacing: 2px;
  width: 100%;
  @media ${device.tablet} {
    width: calc(100% - 450px);
    left: 50%;
    transform: translate(-50%, 50%);
    height: 60px;
  }
`

const BarContain = styled.div`
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translate(-50%, 0px);
  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    left: -7%;
    top: 50%;
    transform: translate(0, -50%) rotate(90deg);
    z-index: 2;
  }
`

export default CommunitySignUp
