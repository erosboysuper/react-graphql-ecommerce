import React from 'react'
import styled from 'styled-components'

import ArrowBack from '~/images/Assets/Arrow-back.svg'

import TopicBrief from '~/components/pages/community/TopicBrief'

const MessageModal = ({ topic, closeCB }) => {
  return (
    <Container>
      <BackImage>
        <img src={ArrowBack} onClick={() => closeCB()} alt="arrow" />
      </BackImage>
      <TopicBrief
        topic={topic}
        showRoomDetail={true}
        displayAll={true}
        removeLazyLoad={true}
      />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  background: #f2f2f7;
  z-index: 12;
  bottom: 0px;
  padding-top: 108px;
  left: 0px;
  overflow-y: auto;
  height: 100%;
`

const BackImage = styled.div`
  position: fixed;
  top: 38px;
  left: 16px;
  z-index: 20;
`

export default MessageModal
