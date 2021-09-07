import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import loadable from '@loadable/component'
import { MediaBlock, TextBlock } from 'react-placeholder/lib/placeholders'
import 'react-placeholder/lib/reactPlaceholder.css'

import StoreContext from '~/context/StoreContext'

import SEO from '~/components/seo'
import Footer from '~/components/Common/Footer'
const SurveyFrom = loadable(() =>
  import('~/components/pages/Survey/SurveyFrom')
)

const Survey = ({
  id,
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  const _isMounted = useRef(true)
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  const [survey, setSurvey] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getSurveyData = () => {
    setIsLoading(true)
    fetch(`${process.env.API_BASE}/getSurvey/${id}`, {
      method: 'GET',
      async: true,
    })
      .then(res => res.json())
      .then(res => {
        if (_isMounted.current) {
          setIsLoading(false)
          setSurvey(res)
        }
      })
  }

  useEffect(() => {
    getSurveyData()
    return () => {
      _isMounted.current = false
    }
  }, [])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO
        title={survey.title || `Survey`}
        description={survey.title || `Survey`}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          `Survey`,
          `${survey.title}`,
        ]}
      />
      <Container>
        {isLoading === true && (
          <React.Fragment>
            <PlaceholderDiv>
              <MediaBlock color="#E0E0E0" rows={3} />
              <TextBlock color="#E0E0E0" rows={4} />
            </PlaceholderDiv>
            <PlaceholderDiv>
              <MediaBlock color="#E0E0E0" rows={3} />
              <TextBlock color="#E0E0E0" rows={4} />
            </PlaceholderDiv>
          </React.Fragment>
        )}
        {survey.id && <SurveyFrom survey={survey} />}
      </Container>
      <Footer activeMenu="survey" hideFooter={true} hideStickyMenu={true} />
    </React.Fragment>
  )
}

const Container = styled.div`
  background: #f7f7fa;
  height: 100vh;
`

const PlaceholderDiv = styled.div`
  padding: 16px;
`

export default Survey
