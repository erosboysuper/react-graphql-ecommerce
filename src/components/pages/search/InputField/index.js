import React, { useContext } from 'react'
import styled from 'styled-components'

import { Space, DesktopContain } from '~/utils/styles'
import { device } from '~/utils/device'
import SearchContext from '~/context/SearchContext'

import CloseSearchImg from '~/images/Assets/Close-search.svg'

const InputField = () => {
  const { focus, setFocus, searchText, setSearchText, setShowResults } =
    useContext(SearchContext)

  const closeResults = () => {
    setSearchText('')
    setShowResults(false)
  }

  return (
    <div>
      <Container>
        <Input
          placeholder="Search By word or name..."
          onClick={event => setFocus(true, event)}
          onChange={event => setSearchText(event.target.value)}
          value={searchText}
        />
        {focus && (
          <Contain onClick={() => closeResults()}>
            <img src={CloseSearchImg} alt="close" />
            <DesktopContain>Back to Filters</DesktopContain>
          </Contain>
        )}
      </Container>
      <Space height={30} />
    </div>
  )
}

const Input = styled.input`
   {
    width: 90%;
    border: none;
    border-bottom: 1px solid white;
    background: transparent;
    padding: 5px;
    color: white;
    z-index: 10;
    -webkit-appearance: none;
  }
  & ::placeholder {
    color: #7d7f81;
    font-size: 18px;
    font-family: Titillium Light;
  }
  @media ${device.laptop} {
    width: 74%;
    padding: 5px;
    font-size: 25px;
    margin-top: 10%;
    & ::placeholder {
      font-size: 25px;
    }
  }
  @media ${device.laptopL} {
    width: 70%;
    font-size: 32px;
    & ::placeholder {
      font-size: 32px;
    }
  }
  @media ${device.desktop} {
    width: 70%;
    font-size: 40px;
    & ::placeholder {
      font-size: 40px;
    }
  }
`

const Container = styled.div`
  text-align: center;
  position: relative;
`

const Contain = styled.div`
  position: absolute;
  right: 5%;
  color: white;
  top: 2px;
  @media ${device.laptop} {
    position: absolute;
    right: 15%;
    color: white;
    top: 2px;
    margin-top: 10.5%;
    background: black;
    font-family: Titillium Bold;
    font-size: 14px;
    display: flex;
    padding: 5px 10px;
    align-items: center;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`

export default InputField
