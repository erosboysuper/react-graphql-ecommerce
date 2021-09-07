import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import SearchContext from '~/context/SearchContext'

const ColorSelect = ({ colors }) => {
  const { activeColor, setActiveColor } = useContext(SearchContext)
  const checkActive = i => {
    if (activeColor.find(x => x === i)) {
      const b = activeColor.filter(x => x !== i)
      setActiveColor(b)
    } else {
      setActiveColor(prevState => [...prevState, i])
    }
  }
  const reg = /http(s):/
  const colorKeys = Object.keys(colors)
  return (
    <Container>
      {colorKeys.map(colorCode => {
        const { id, color } = colors[colorCode]
        const isImg = reg.test(`${color}`)
        return (
          <Contain key={id} onClick={() => checkActive(id)}>
            <BorderCircle
              border={
                activeColor.find(x => x === id) === id ? '#FF8C00' : '#7D7F81'
              }
              background={
                activeColor.find(x => x === id) === id ? '#FF8C00' : darkFont
              }
            >
              {isImg && (
                <LazyLoad>
                  <Image
                    alt="color"
                    src={color}
                    opacity={activeColor.find(x => x === id) === id ? 1 : 0.5}
                  />
                </LazyLoad>
              )}
              {!isImg && (
                <Circle
                  color={color}
                  opacity={activeColor.find(x => x === id) === id ? 1 : 0.5}
                />
              )}
            </BorderCircle>
          </Contain>
        )
      })}
    </Container>
  )
}

const Circle = styled.div`
  background-color: ${props => props.color};
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid black;
  opacity: ${props => props.opacity};
  @media ${device.laptop} {
    width: 40px;
    height: 40px;
  }
  @media ${device.laptopL} {
    width: 50px;
    height: 50px;
  }
`

const Image = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid black;
  opacity: ${props => props.opacity};
  @media ${device.laptop} {
    width: 40px;
    height: 40px;
  }
  @media ${device.laptopL} {
    width: 50px;
    height: 50px;
  }
`

const BorderCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${props => props.border};
  padding: 4px;
  background-color: ${props => props.background};
  cursor: pointer;
  @media ${device.laptop} {
    width: 50px;
    height: 50px;
    padding: 4px;
  }
  @media ${device.laptopL} {
    width: 66px;
    height: 66px;
    padding: 7px;
  }
`

const Container = styled.div`
  overflow: auto;
  margin-left: 5%;
  margin-right: 5%;
  height: auto;
  max-width: 960px;
  padding: 0;
  position: relative;
  display: flex;
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
  }
`

const Contain = styled.div`
  width: auto;
  justify-content: center;
  text-align: center;
  margin-right: 10px;
  @media ${device.laptop} {
    width: 29%;
    display: inline-block;
    margin-bottom: 12px;
  }
  @media ${device.laptopL} {
  }
`

export default ColorSelect
