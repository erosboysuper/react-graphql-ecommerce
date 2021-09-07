import React, { useContext } from 'react'
import styled from 'styled-components'

import { darkFont } from '~/utils/colors'
import ProductContext from '~/context/ProductContext'
import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

const SizeSelect = ({ sizes, modal }) => {
  const {
    size: selectedSize,
    setSize,
    setCart,
    setSizeColor,
  } = useContext(ProductContext)

  const checkUpdate = sizeCode => {
    setSizeColor(sizes[sizeCode].colors)
    setSize(sizeCode)
    if (selectedSize !== sizeCode) setCart(0)
  }

  return (
    <Container>
      {Object.keys(sizes).map(sizeCode => {
        const size = sizes[sizeCode]

        return !size.sold ? (
          <Contain key={sizeCode} onClick={() => checkUpdate(sizeCode)}>
            <RecContainer
              color={selectedSize === sizeCode ? '#FF8C00' : darkFont}
              background={selectedSize === sizeCode ? '#FF8C00' : 'white'}
              modal={modal === true ? 1 : 0}
            >
              {size.helpText !== '' && (
                <LetterContainer
                  height={16}
                  heightDesktop={26}
                  top={13}
                  modal={modal === true ? 1 : 0}
                >
                  <Letter
                    size={16}
                    sizeTablet={21}
                    sizeLaptop={15}
                    sizeLaptopL={18}
                    sizeDesktop={21}
                    font={
                      selectedSize === sizeCode
                        ? 'Titillium Bold'
                        : 'Titillium Web'
                    }
                    color={selectedSize === sizeCode ? 'white' : darkFont}
                  >
                    {sizeCode}
                  </Letter>
                </LetterContainer>
              )}
              {size.helpText === '' && (
                <LetterContain
                  height={16}
                  heightDesktop={26}
                  top={10}
                  modal={modal === true ? 1 : 0}
                >
                  <Letter
                    size={16}
                    sizeTablet={21}
                    sizeLaptop={15}
                    sizeLaptopL={18}
                    sizeDesktop={21}
                    font={
                      selectedSize === sizeCode
                        ? 'Titillium Bold'
                        : 'Titillium Web'
                    }
                    color={selectedSize === sizeCode ? 'white' : darkFont}
                  >
                    {sizeCode}
                  </Letter>
                </LetterContain>
              )}
              <Space height={3} />

              <LetterContainer>
                <Letter
                  size={12}
                  sizeTablet={16}
                  sizeLaptop={10}
                  sizeLaptopL={13}
                  sizeDesktop={16}
                  font={'Titillium Web'}
                  color={selectedSize === sizeCode ? 'white' : '#7D7F81'}
                  modal={modal === true ? 1 : 0}
                >
                  {size.helpText}
                </Letter>
              </LetterContainer>
            </RecContainer>
          </Contain>
        ) : (
          <Contain key={sizeCode}>
            <RecContainerCross
              color={selectedSize === sizeCode ? '#FF8C00' : '#E4E4EA'}
              background={selectedSize === sizeCode ? '#FF8C00' : 'white'}
              modal={modal === true ? 1 : 0}
            >
              {size.helpText !== '' && (
                <LetterContainer
                  height={16}
                  heightDesktop={26}
                  top={10}
                  modal={modal === true ? 1 : 0}
                >
                  <Letter
                    size={16}
                    sizeTablet={21}
                    sizeLaptop={16}
                    sizeLaptopL={19}
                    sizeDesktop={21}
                    font={
                      selectedSize === sizeCode
                        ? 'Titillium Bold'
                        : 'Titillium Web'
                    }
                    color={selectedSize === sizeCode ? 'white' : '#E4E4EA'}
                  >
                    {sizeCode}
                  </Letter>
                </LetterContainer>
              )}
              {size.helpText === '' && (
                <LetterContain
                  height={16}
                  heightDesktop={26}
                  top={10}
                  modal={modal === true ? 1 : 0}
                >
                  <Letter
                    size={16}
                    sizeTablet={21}
                    sizeLaptop={16}
                    sizeLaptopL={19}
                    sizeDesktop={21}
                    font={
                      selectedSize === sizeCode
                        ? 'Titillium Bold'
                        : 'Titillium Web'
                    }
                    color={selectedSize === sizeCode ? 'white' : '#E4E4EA'}
                  >
                    {sizeCode}
                  </Letter>
                </LetterContain>
              )}
              <Space height={3} />
              <LetterContainer>
                <Letter
                  size={12}
                  sizeTablet={16}
                  sizeLaptop={10}
                  sizeLaptopL={13}
                  sizeDesktop={16}
                  modal={modal === true ? 1 : 0}
                  font={
                    selectedSize === sizeCode
                      ? 'Titillium Bold'
                      : 'Titillium Web'
                  }
                  color={selectedSize === sizeCode ? 'white' : '#E4E4EA'}
                >
                  {size.helpText}
                </Letter>
              </LetterContainer>
              <Crossline1 modal={modal === true ? 1 : 0} />
              <Crossline2 modal={modal === true ? 1 : 0} />
            </RecContainerCross>
          </Contain>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  overflow: auto;
  margin-left: 16px;
  max-width: 960px;
  padding: 0;
  position: relative;
  display: flex;
  @media ${device.tablet} {
    margin-left: 5%;
  }
  @media ${device.laptop} {
    margin-left: 0px;
    width: 90%;
  }
`

const Contain = styled.div`
  width: auto;
  justify-content: center;
  text-align: center;
  margin-right: 7px;
  margin-bottom: 10px;
`

const RecContainer = styled.div`
  min-width: 58px;
  height: 56px;
  cursor: pointer;
  border: 1px solid ${props => props.color};
  background: ${props => props.background};
  @media ${device.tablet} {
    min-width: ${props => 80 - props.modal * 10}px;
    height: ${props => 75 - props.modal * 8}px;
  }
  @media ${device.laptop} {
    min-width: ${props => 52 - props.modal * 5}px;
    height: ${props => 49 - props.modal * 4}px;
    padding-top: ${props => 8 - props.modal * 2}px;
  }
  @media ${device.laptopL} {
    min-width: ${props => 64 - props.modal * 10}px;
    height: ${props => 60 - props.modal * 8}px;
    // min-width: 73px;
    // height: 69px;
    padding-top: 8px;
    padding-bottom: 7px;
  }
  @media ${device.desktop} {
    padding-top: 0px;
    padding-bottom: 0px;
    min-width: ${props => 80 - props.modal * 6}px;
    height: ${props => 75 - props.modal * 5}px;
  }
`

const RecContainerCross = styled.div`
  min-width: 58px;
  height: 56px;
  cursor: not-allowed;
  border: 1px solid ${props => props.color};
  background: ${props => props.background};
  position: relative;
  @media ${device.tablet} {
    min-width: ${props => 80 - props.modal * 10}px;
    height: ${props => 75 - props.modal * 8}px;
  }
  @media ${device.laptop} {
    min-width: ${props => 52 - props.modal * 5}px;
    height: ${props => 49 - props.modal * 4}px;
    padding-top: 8px;
  }
  @media ${device.laptopL} {
    min-width: ${props => 64 - props.modal * 10}px;
    height: ${props => 60 - props.modal * 8}px;
    padding-top: 8px;
    padding-bottom: 7px;
    // min-width: 73px;
    // height: 69px;
  }
  @media ${device.desktop} {
    min-width: ${props => 80 - props.modal * 6}px;
    height: ${props => 75 - props.modal * 5}px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`

const LetterContainer = styled.div`
  line-height: ${props => props.height}px;
  padding-top: ${props => props.top}px;
  display: flex;
  justify-content: center;
  padding-left: 3px;
  padding-right: 3px;
  @media ${device.tablet} {
    line-height: ${props => props.heightDesktop}px;
  }
  @media ${device.laptop} {
    padding-top: 0px;
    line-height: 18px;
  }
  @media ${device.laptopL} {
    padding-top: 0px;
    line-height: 20px;
  }
  @media ${device.desktop} {
    padding-top: ${props => props.top}px;
    line-height: 26px;
  }
`
const LetterContain = styled.div`
  line-height: ${props => props.height}px;
  padding-top: ${props => props.top}px;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-left: 5px;
  padding-right: 5px;
  @media ${device.laptop} {
    line-height: ${props => props.heightDesktop}px;
  }
`

const Space = styled.div`
  width: 100%;
  height: ${props => props.height}px;
`

const Crossline1 = styled.div`
  width: 75px;
  height: 47px;
  border-bottom: 1px solid #cecece;
  -webkit-transform: translateY(20px) translateX(5px) rotate(43.5deg);
  position: absolute;
  top: -33px;
  left: 2px;
  @media ${device.tablet} {
    width: ${props => 104 - props.modal * 10}px;
    height: ${props => 64 + props.modal * 4}px;
    top: ${props => (props.modal === 1 ? -46 : -37)}px;
    left: ${props => (props.modal === 1 ? 5 : 4)}px;
  }
  @media ${device.laptop} {
    width: ${props => 69 - props.modal * 8}px;
    height: ${props => 49 + props.modal * 4}px;
    top: ${props => (props.modal === 1 ? -44 : -38)}px;
    left: ${props => (props.modal === 1 ? 5 : 2)}px;
  }
  @media ${device.laptopL} {
    width: ${props => 84 - props.modal * 13}px;
    height: ${props => 52 - props.modal * 5}px;
    top: ${props => (props.modal === 1 ? -36 : -35)}px;
    left: ${props => (props.modal === 1 ? 0 : 2)}px;
  }
  @media ${device.desktop} {
    width: ${props => 104 - props.modal * 7}px;
    height: ${props => 64 + props.modal * 4}px;
    top: ${props => (props.modal === 1 ? -45 : -37)}px;
    left: ${props => (props.modal === 1 ? 5 : 4)}px;
  }
`

const Crossline2 = styled.div`
  width: 75px;
  height: 47px;
  border-bottom: 1px solid #cecece;
  -webkit-transform: translateY(20px) translateX(5px) rotate(-43.5deg);
  position: absolute;
  top: -32px;
  left: -31px;
  @media ${device.tablet} {
    width: ${props => 104 - props.modal * 10}px;
    height: ${props => 64 + props.modal * 4}px;
    top: ${props => (props.modal === 1 ? -46 : -38)}px;
    left: ${props => (props.modal === 1 ? -41 : -40)}px;
  }
  @media ${device.laptop} {
    width: ${props => 69 - props.modal * 8}px;
    height: ${props => 49 + props.modal * 4}px;
    top: ${props => (props.modal === 1 ? -44 : -38)}px;
    left: ${props => (props.modal === 1 ? -31 : -31)}px;
  }
  @media ${device.laptopL} {
    width: ${props => 84 - props.modal * 13}px;
    height: ${props => 52 - props.modal * 5}px;
    top: ${props => (props.modal === 1 ? -36 : -35)}px;
    left: ${props => (props.modal === 1 ? -30 : -33)}px;
  }
  @media ${device.desktop} {
    width: ${props => 104 - props.modal * 7}px;
    height: ${props => 64 + props.modal * 4}px;
    top: ${props => (props.modal === 1 ? -44 : -38)}px;
    left: ${props => (props.modal === 1 ? -41 : -40)}px;
  }
`

export default SizeSelect
