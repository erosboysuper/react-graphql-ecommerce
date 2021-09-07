import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import TextareaAutosize from 'react-textarea-autosize'
import { useToasts } from 'react-toast-notifications'
import { navigate } from 'gatsby'

import { device } from '~/utils/device'
import { Letter, Space, MobileContain, DesktopContain } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'

const QuestionItem = ({ question, index, userProfile }) => {
  const { addToast } = useToasts()
  const {
    signUpStepNum,
    setSignUpStepNum,
    totalSignUpSteps,
    onboardingQuestions,
    setOnboardingQuestions,
    saveOnboardUser,
    setSignUpModal,
    userLoginAction,
  } = useContext(CommunityContext)
  const [answer, setAnswer] = useState('')
  const [options, setOptions] = useState([])
  const [optionLength, setOptionLength] = useState(0)

  useEffect(() => {
    if (question && question.options) {
      setOptionLength(question.options.length)
    }
  }, [question])

  const selectOpt = id => {
    let _options = [...options]
    const indexAt = options.indexOf(id)
    if (indexAt !== -1) {
      _options.splice(indexAt, 1)
    } else if (
      _options.length === 0 ||
      question.__component === 'on-boarding.multi-selection'
    ) {
      _options.push(id)
    } else {
      _options = [id]
    }
    setOptions(_options)
  }

  const updateAccount = () => {
    const formData = new FormData()
    formData.append('tmp_token', userProfile.token)
    formData.append('first_name', `${userProfile.first_name}`)
    formData.append('last_name', `${userProfile.last_name}`)
    formData.append('phone', `${userProfile.phone}`)
    formData.append(
      'onboarding',
      JSON.stringify(
        onboardingQuestions.map(ob => {
          let obj = {
            __component: ob.__component,
            question: ob.question,
          }
          if (ob.__component === 'on-boarding.textarea') {
            obj['answer'] = ob.answer
          } else {
            obj['options'] = ob.answer.map(ans => ({ option: ans.option }))
          }
          return obj
        })
      )
    )
    saveOnboardUser(formData).then(res => {
      if (res) {
        setSignUpModal(false)
        setSignUpStepNum(0)
        userLoginAction()
        addToast(
          'Signup process has been completed. Please confirm on your email before login.',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        )
      } else {
        addToast(`Something went wrong. Please refresh the page & re-try.`, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })
  }

  const saveAndContinue = () => {
    let _onboardingQuestions = [...onboardingQuestions]
    let qus = _onboardingQuestions[index]

    if (['on-boarding.textarea'].indexOf(qus.__component) !== -1) {
      qus['answer'] = answer
    } else if (
      ['on-boarding.single-selection', 'on-boarding.multi-selection'].indexOf(
        qus.__component
      ) !== -1
    ) {
      qus['answer'] = qus.options.filter(q => options.indexOf(q.id) !== -1)
    }
    setOnboardingQuestions(_onboardingQuestions)
    if (totalSignUpSteps === signUpStepNum - 1) {
      updateAccount()
    } else {
      setSignUpStepNum(signUpStepNum + 1)
    }
  }

  return (
    <Container>
      <DesktopContain>
        <Letter font="Titillium Web" size={20} sizeDesktop={24} color="#202122">
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
        <QuestionDesktop>
          <Letter
            font="Titillium Bold"
            size={20}
            sizeDesktop={26}
            color="#202122"
          >
            {question.question}
          </Letter>
        </QuestionDesktop>
      </DesktopContain>
      <ContentDiv>
        {question.image && (
          <LazyLoad>
            <CenterImage src={question.image.url} alt="image" />
          </LazyLoad>
        )}
        <Question>
          <Letter font="Titillium Bold" size={20} color="#202122">
            {question.question}
          </Letter>
        </Question>
        <AnswerDiv hasImage={question.image ? true : false}>
          {['on-boarding.textarea'].indexOf(question.__component) !== -1 && (
            <TextareaAutosize
              minRows={4}
              maxRows={10}
              placeholder="Type your answer here..."
              onChange={e => setAnswer(e.target.value)}
            />
          )}
          {[
            'on-boarding.single-selection',
            'on-boarding.multi-selection',
          ].indexOf(question.__component) !== -1 &&
            question.options && (
              <ItemList>
                {question.options.map(opt => (
                  <ListItem
                    key={opt.id}
                    showGrid={optionLength > 3}
                    onClick={() => selectOpt(opt.id)}
                    color={options.indexOf(opt.id) !== -1 ? 'white' : '#161617'}
                    border={
                      options.indexOf(opt.id) !== -1 ? '#ff8c00' : '#161617'
                    }
                    background={
                      options.indexOf(opt.id) !== -1 ? '#ff8c00' : 'white'
                    }
                  >
                    <Letter font="Titillium Light" size={16}>
                      {opt.option}
                    </Letter>
                  </ListItem>
                ))}
              </ItemList>
            )}
        </AnswerDiv>
      </ContentDiv>
      <MobileContain>
        <Space height={193} />
      </MobileContain>
      <ContinueButton onClick={() => saveAndContinue()}>
        <Letter font="Titillium Bold" size={16} sizeDesktop={20} color="white">
          {totalSignUpSteps === signUpStepNum - 1 ? `SUBMIT` : `CONTINUE`}
        </Letter>
      </ContinueButton>
    </Container>
  )
}

const Container = styled.div`
  padding: 0px 16px 0px 16px;
  position: relative;
  & textarea {
    background: #f2f2f7;
    border: none;
    font-family: Titillium Light;
    font-size: 16px;
    padding-top: 15px;
    padding-left: 16px;
    width: 100%;
  }
  @media ${device.laptop} {
    padding: 15px 16px 0px 16px;
    position: relative;
    background: white;
    text-align: center;
    & textarea {
      font-size: 20px;
    }
  }
`

const QuestionDesktop = styled.div`
  margin-top: 8px;
  margin-bottom: 40px;
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

const CenterImage = styled.img`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 30px;
  @media ${device.laptop} {
    width: 30%;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 70px;
  }
`

const AnswerDiv = styled.div`
  @media ${device.laptop} {
    width: ${props => (props.hasImage ? '40' : '80')}%;
  }
`

const ContinueButton = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  height: 70px;
  background: #ff8c00;
  bottom: 0px;
  left: 0px;
  cursor: pointer;
  @media ${device.laptop} {
    position: fixed;
    bottom: 0px;
    width: 35%;
    left: 50%;
    max-width: 320px;
    transform: translate(-50%, 50%);
  }
`

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ListItem = styled.div`
  width: ${props => (props.showGrid ? '45' : '100')}%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.border};
  background: ${props => props.background};
  color: ${props => props.color};
  @media ${device.laptop} {
    width: ${props => (props.showGrid ? '30' : '100')}%;
  }
  & span {
    text-align: center;
  }
`

export default QuestionItem
