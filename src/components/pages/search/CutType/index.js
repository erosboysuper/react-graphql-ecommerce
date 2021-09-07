import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import SearchContext from '~/context/SearchContext'

const CutType = ({ cutTypes }) => {
  const { activeCut, setActiveCut } = useContext(SearchContext)
  const checkActive = i => {
    if (activeCut.find(x => x === i)) {
      const b = activeCut.filter(x => x !== i)
      setActiveCut(b)
    } else {
      setActiveCut(prevState => [...prevState, i])
    }
  }

  return (
    <Container>
      <Links>
        {cutTypes &&
          cutTypes.nodes.length > 0 &&
          cutTypes.nodes.map(({ id, title, menuIcon: { url } }) => {
            return (
              <Contain
                key={id}
                color={activeCut.find(x => x === id) ? '#FF8C00' : darkFont}
                opacity={activeCut.find(x => x === id) ? 1 : 0.5}
                onClick={() => checkActive(id)}
              >
                <Linked
                  color={activeCut.find(x => x === id) ? '#FF8C00' : darkFont}
                  opacity={activeCut.find(x => x === id) ? 1 : 0.5}
                >
                  <LazyLoad>
                    <LinkImage src={url} alt="LinkImage" />
                  </LazyLoad>
                </Linked>
                <Label
                  size={12}
                  color={activeCut.find(x => x === id) ? '#FF8C00' : '#535558'}
                  colorDesktop={
                    activeCut.find(x => x === id) ? 'white' : '#535558'
                  }
                >
                  {title}
                </Label>
              </Contain>
            )
          })}
      </Links>
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
  @media ${device.laptop} {
    padding-top: 0px;
    margin-left: 0px;
  }
  @media ${device.laptopL} {
    margin-left: 5%;
  }
`
const Label = styled.label`
  font-size: ${props => props.size}px;
  font-family: ${props => props.font};
  color: ${props => props.color};
  @media ${device.laptop} {
    color: ${props => props.colorDesktop};
    margin-left: 0px;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    text-align: start;
  }
  @media ${device.laptopL} {
    margin-left: 9px;
    font-size: 17px;
  }
  @media ${device.desktop} {
    margin-left: 25px;
    font-size: 20px;
  }
`

const Links = styled.div`
  display: flex;
  @media ${device.laptop} {
    display: block;
  }
`
const Linked = styled.div`
  & {
    border-radius: 50%;
    border: 1px solid #7d7f81;
    margin-right: 15px;
    width: 66px;
    height: 66px;
    text-align: center;
    padding: 7px;
    background-color: ${props => props.color};
  }

  & img {
    opacity: ${props => props.opacity};
  }
  @media ${device.laptop} {
    margin-right: 8px;
    display: flex;
    align-items: center;
    border: none;
    background: transparent;
  }
  @media ${device.laptopL} {
    margin-right: 15px;
  }
`

const Contain = styled.div`
  width: 20%;
  text-align: center;
  margin-right: 5px;
  cursor: pointer;
  @media ${device.laptop} {
    width: 100%;
    display: flex;
    background-color: ${props => props.color};
    margin-bottom: 35px;
    border-radius: 35px;
    border: 1px solid #7d7f81;
    height: 55px;
    padding-right: 10px;
    padding-left: 10px;
    max-width: 230px;
    align-items: center;
  }
  @media ${device.laptopL} {
    height: 60px;
  }
  @media ${device.desktop} {
    height: 70px;
  }
`
const LinkImage = styled.img`
  width: 52px;
  height: 52px;
  @media ${device.laptop} {
    width: 60px;
    height: 60px;
  }
  @media ${device.laptopL} {
    width: 75px;
    height: 75px;
  }
  @media ${device.desktop} {
    width: 90px;
    height: 90px;
  }
`

export default CutType
