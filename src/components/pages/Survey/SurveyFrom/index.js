import React, { useContext, useEffect, useState, useRef } from 'react'
import { Survey } from 'survey-react'
import './_survey.css'

import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

const SurveyFrom = ({ survey }) => {
  const _isMounted = useRef(true)
  const serveyRef = useRef(null)
  const doesApiCalled = useRef(false)
  const [surveyData, setSurveyData] = useState(null)
  const { setLoader } = useContext(StoreContext)
  const { userInfo, userLoginAction } = useContext(CommunityContext)

  useEffect(() => {
    // USER LOGIN //
    if (surveyData && !userInfo && survey.isPrivate) {
      userLoginAction()
    }
    // SUBMIT DATA //
    else if (surveyData) {
      setLoader(true)
      const formData = new FormData()
      formData.append(
        'data',
        JSON.stringify({
          survey: survey.id,
          user: userInfo && userInfo.user ? userInfo.user.id : null,
          response: surveyData,
        })
      )
      doesApiCalled.current = true
      fetch(`${process.env.API_BASE}/survey-responses`, {
        method: 'POST',
        async: true,
        body: formData,
      })
        .then(res => res.json())
        .then(res => {
          if (_isMounted.current && res && res.id) {
            setLoader(false)
            if (serveyRef.current) {
              serveyRef.current.doComplete()
            }
            doesApiCalled.current = false
          }
        })
    }
  }, [surveyData, userInfo])

  return (
    <React.Fragment>
      <Survey
        json={survey.survey_json}
        onCompleting={(s, options) => {
          if (!doesApiCalled.current && (!userInfo || !serveyRef.current)) {
            options.allowComplete = false
            serveyRef.current = s
            setSurveyData(s.data)
          }
        }}
      />
    </React.Fragment>
  )
}

export default SurveyFrom
