import React, { useContext } from 'react'
import styled from 'styled-components'

import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import SearchContext from '~/context/SearchContext'

const TagSelect = ({ tags }) => {
  const { activeTag, setActiveTag } = useContext(SearchContext)
  const checkActive = i => {
    if (activeTag.find(x => x === i)) {
      const b = activeTag.filter(x => x !== i)
      setActiveTag(b)
    } else {
      setActiveTag(prevState => [...prevState, i])
    }
  }
  return (
    <Container>
      {tags.map((item, index) => {
        return (
          <Contain key={index} onClick={() => checkActive(index)}>
            <RecContainer
              color={
                activeTag.find(x => x === index) === index ? 'white' : '#535558'
              }
              background={
                activeTag.find(x => x === index) === index
                  ? '#ff8c00'
                  : darkFont
              }
            >
              <Letter
                size={14}
                sizeLaptop={16}
                sizeLaptopL={18}
                sizeDesktop={20}
                color={
                  activeTag.find(x => x === index) === index
                    ? 'white'
                    : '#535558'
                }
              >
                {item}
              </Letter>
            </RecContainer>
          </Contain>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  overflow: auto;
  margin-left: 5%;
  height: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  @media ${device.laptop} {
    height: auto;
    margin-left: 0%;
  }
  @media ${device.laptopL} {
    min-width: 400px;
    margin-left: 5%;
  }
`

const Contain = styled.div`
  width: auto;
  justify-content: center;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  @media ${device.laptop} {
    margin-bottom: 12px;
  }
`

const RecContainer = styled.div`
  height: 44px;
  border: 1px solid #7d7f81;
  text-align: center;
  padding: 7px 15px;
  border-radius: 20px;
  border: 1px solid ${props => props.color};
  background-color: ${props => props.background};
  @media ${device.laptop} {
    height: 55px;
    border-radius: 35px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media ${device.laptopL} {
    height: 60px;
    padding-left: 35px;
    padding-right: 35px;
  }
  @media ${device.desktop} {
    height: 70px;
    padding-left: 35px;
    padding-right: 35px;
  }
`

const Letter = styled.span`
  & {
    font-size: ${props => props.size}px;
    font-family: Titillium Bold;
    color: ${props => props.color};

    white-space: nowrap;
  }
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

export default TagSelect
