import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import CommunityContext from '~/context/CommunityContext'

import { device } from '~/utils/device'
import CloseIcon from '~/images/Assets/Close-modal.svg'

const QuickLink = () => {
  const { setQuickLink } = useContext(CommunityContext)
  return (
    <React.Fragment>
      <Container>
        <img src={CloseIcon} onClick={() => setQuickLink(false)} />
        <Header>QUICK LINKS</Header>
        <Body>
          <Title>
            <TitleIcon>
              <img src={require('~/images/Assets/Logo-round.png')} alt />
            </TitleIcon>
            <TitleRight>
              <MainTitle>
                <p>Hey,</p>
                <p>Here some useful links</p>
              </MainTitle>
              <SmallTitle>Most people are looking for...</SmallTitle>
            </TitleRight>
          </Title>

          <ItemContainer>
            <ItemWrapper>Store</ItemWrapper>
            <ItemWrapper>Co-Create</ItemWrapper>
            <ItemWrapper>Blog</ItemWrapper>
            <ItemWrapper>Reviews</ItemWrapper>
            <ItemWrapper>Investores</ItemWrapper>
          </ItemContainer>
        </Body>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: 90%;
  background: white;
  overflow: scroll;
  padding: 10px;
  z-index: 20;
  & > img {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
  & > img:nth-child(2) {
    left: 20px;
  }
  @media ${device.laptop} {
    width: 34%;
    max-width: 700px;
    min-width: 540px;
    height: 100vh;
    max-height: 100%;
    padding: 20px 80px 100px 30px;
    & > img {
      top: 35px;
      left: 30px;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Body = styled.div`
  margin-top: 20px;
  @media ${device.tablet} {
    margin-top: 60px;
  }
`

const Title = styled.div`
  display: flex;
`

const TitleIcon = styled.div`
  width: 50px;
  margin: 10px 10px 0px 0px;
  & img {
    width: 50px;
    height: 50px;
  }
`

const TitleRight = styled.div`
  display: flex;
  flex-direction: column;
`

const MainTitle = styled.div`
  width: 100%;
  font-size: 24px;
  font-family: Titillium Black;
  & p {
    margin: 0px;
  }
  @media ${device.tablet} {
    font-size: 26px;
  }
`

const SmallTitle = styled.div`
  font-size: 20px;
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 22px;
  }
`

const ItemContainer = styled.div`
  margin-top: 40px;
`
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75px;
  border: 1px solid #cecece;
  margin-top: 5px;
  font-family: Titillium Bold;
  font-size: 18px;
  cursor: pointer;
`

export default QuickLink
