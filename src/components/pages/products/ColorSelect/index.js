import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import ProductContext from '~/context/ProductContext'
import { device } from '~/utils/device'

import Circle from '~/components/Common/Circle'

const ColorSelect = ({
  colors,
  isRectangular,
  height,
  width,
  heightDesktop,
  widthDesktop,
  showBorder,
  additionalCss,
  preSelectedColor,
  modal,
  multi,
}) => {
  const {
    size: selectedSize,
    color: selectedColor,
    setColor,
    sizeColor,
    colors: selectedColors,
    setColors,
  } = useContext(ProductContext)
  const sizeColorLen = Object.keys(sizeColor).length
  const colorKeys = Object.keys(colors)

  useEffect(() => {
    if (preSelectedColor) {
      setColor(preSelectedColor)
      setColors([preSelectedColor])
    }
  }, [])

  useEffect(() => {
    if (sizeColorLen > 0 && !sizeColor[selectedColor]) {
      let sizeColorCode = ''
      Object.keys(sizeColor).forEach(x => {
        if (sizeColor[x] && !sizeColorCode) {
          sizeColorCode = x
        }
      })
      setColor(sizeColorCode)
      setColors([sizeColorCode])
    }
  }, [selectedSize])

  return (
    <Container isDisabled={!selectedSize}>
      {colorKeys.map(colorCode => {
        const color = colors[colorCode]
        const isSold = sizeColorLen > 0 && !sizeColor[colorCode]
        return (
          <Circle
            key={colorCode}
            color={color}
            multi={multi}
            clickHandler={() => {
              if (!isSold && selectedSize) {
                setColor(colorCode)
                let num = selectedColors.indexOf(colorCode)
                let result = [...selectedColors]
                result.splice(num, 1)
                if (num >= 0) setColors(result)
                else setColors([...selectedColors, colorCode])
              }
            }}
            background={selectedColor === colorCode ? '#FF8C00' : 'white'}
            multiBackground={
              selectedColors.indexOf(colorCode) > -1 ? '#FF8C00' : 'white'
            }
            isRectangular={isRectangular}
            showBorder={showBorder}
            height={height}
            width={width}
            heightDesktop={heightDesktop}
            widthDesktop={widthDesktop}
            additionalCss={additionalCss}
            sold={isSold}
            modal={modal}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  overflow: auto;
  margin-left: 16px;
  display: flex;
  width: 100%;
  opacity: ${props => (props.isDisabled ? 0.2 : 1)};
  @media ${device.tablet} {
    margin-left: 5%;
  }
  @media ${device.laptop} {
    margin-left: 0px;
    overflow: auto;
  }
`

export default ColorSelect
