import React, { useContext } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import SearchContext from '~/context/SearchContext'

const SizeSelect = ({ sizes }) => {
  const { activeSize, setActiveSize, activeSizeId, setActiveSizeId } =
    useContext(SearchContext)

  const checkActive = id => {
    const { sizeIds } = sizes[id]
    if (activeSizeId.find(x => x === id)) {
      const b = activeSizeId.filter(x => x !== id)
      setActiveSizeId(b)
      let _activeSize = [...activeSize]
      sizeIds.forEach(sid => {
        _activeSize = _activeSize.filter(x => x !== sid)
      })
      setActiveSize(_activeSize)
    } else {
      setActiveSizeId(prevState => [...prevState, id])
      setActiveSize(prevState => [...prevState, ...sizeIds])
    }
  }
  return (
    <Container>
      {Object.keys(sizes).map(sizeId => {
        const { id, name } = sizes[sizeId]
        return (
          <Contain key={id} onClick={() => checkActive(sizeId)}>
            <RecContainer
              color={
                activeSizeId.find(x => x === id) === id ? 'white' : '#7d7f81'
              }
              background={
                activeSizeId.find(x => x === id) === id
                  ? '#ff8c00'
                  : 'transparent'
              }
            >
              <LetterContainer height={16} top={10}>
                <Letter
                  font="Titillium Web"
                  size={16}
                  sizeLaptop={18}
                  sizeLaptopL={21}
                  sizeDesktop={24}
                  color={
                    activeSizeId.find(x => x === id) === id
                      ? 'white'
                      : '#535558'
                  }
                >
                  {name}
                </Letter>
              </LetterContainer>
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
  margin-right: 5%;
  height: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-left: 0%;
    margin-right: 0%;
    display: block;
  }
  @media ${device.laptopL} {
    margin-left: 0%;
    margin-right: 0%;
  }
  @media ${device.desktop} {
    margin-left: 5%;
    margin-right: 5%;
  }
`

const Contain = styled.div`
  width: auto;
  justify-content: center;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  @media ${device.laptop} {
    width: 100%;
    align-items: center;
    margin-bottom: 12px;
  }
`

const RecContainer = styled.div`
  min-width: 58px;
  height: 56px;
  border: 1px solid ${props => props.color};
  background: ${props => props.background};
  cursor: pointer;
  @media ${device.laptop} {
    display: flex;
    height: 55px;
    width: 150px;
    border-radius: 35px;
    padding-left: 35px;
    padding-right: 35px;
    justify-content: space-evenly;
  }
  @media ${device.laptopL} {
    width: 170px;
    height: 60px;
  }
  @media ${device.desktop} {
    width: 200px;
    height: 70px;
  }
`

const LetterContainer = styled.div`
  line-height: ${props => props.height}px;
  padding-top: ${props => props.top}px;
  display: flex;
  justify-content: center;
  @media ${device.laptop} {
    padding-top: 0px;
    align-items: center;
  }
`

export default SizeSelect
