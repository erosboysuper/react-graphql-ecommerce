import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'

const Circle = ({
  color,
  background,
  isRectangular,
  height,
  width,
  heightDesktop,
  widthDesktop,
  showBorder,
  additionalCss,
  sold,
  clickHandler,
  modal,
  multi,
  multiBackground,
}) => {
  const reg = /http(s):/
  const isImg = reg.test(`${color}`)
  return (
    <React.Fragment>
      <Container
        border={'#161617'}
        background={multi === true ? multiBackground : background}
        isRectangular={isRectangular}
        height={height}
        width={width}
        widthDesktop={widthDesktop}
        heightDesktop={heightDesktop}
        showBorder={showBorder}
        additionalCss={additionalCss}
        sold={sold}
        onClick={() => (clickHandler ? clickHandler() : undefined)}
        modal={modal === true ? 1 : 0}
      >
        {isImg && (
          <LazyLoad>
            <Image src={color} isRectangular={isRectangular} alt="color" />
          </LazyLoad>
        )}
        {!isImg && <Color color={color} isRectangular={isRectangular} />}
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  height: ${props => (props.height ? props.height : '18')}px;
  width: ${props => (props.width ? props.width : '18')}px;
  border-radius: ${props => (props.isRectangular ? '' : '50%')};
  padding: ${props => (props.showBorder ? '1%' : '')};
  border: ${props => (props.showBorder ? `1px solid ${props.border}` : '')};
  margin: ${props => (props.isRectangular ? '0 1px 5px 0' : '0 5px 5px 0')};
  background-color: ${props => props.background};
  display: flex;
  position: relative;
  opacity: ${props => (props.sold ? '0.2' : '1')};
  cursor: ${props => (props.sold ? 'not-allowed' : 'pointer')};
  ${props => props.additionalCss}
  @media ${device.tablet} {
    height: ${props => (props.heightDesktop ? props.heightDesktop : '25')}px;
    width: ${props => (props.widthDesktop ? props.widthDesktop : '25')}px;
    margin-right: 16px;
    margin-bottom: 10px;
  }
  @media ${device.laptop} {
    height: ${props =>
      props.heightDesktop
        ? props.heightDesktop - 40 + props.modal * 25
        : 20 + props.modal * 15}px;
    width: ${props =>
      props.widthDesktop
        ? props.widthDesktop - 40 + props.modal * 25
        : 20 + props.modal * 15}px;
    margin-right: 16px;
    margin-bottom: 10px;
  }
  @media ${device.laptopL} {
    height: ${props =>
      props.heightDesktop ? props.heightDesktop - 25 : '22'}px;
    width: ${props => (props.widthDesktop ? props.widthDesktop - 25 : '22')}px;
    margin-right: 12px;
    margin-bottom: 10px;
  }
  @media ${device.desktop} {
    height: ${props => (props.heightDesktop ? props.heightDesktop : '30')}px;
    width: ${props => (props.widthDesktop ? props.widthDesktop : '30')}px;
    margin-right: 16px;
    margin-bottom: 10px;
  }
`

const Color = styled.span`
  height: 100%;
  width: 100%;
  border-radius: ${props => (props.isRectangular ? '' : '50%')};
  display: inline-block;
  background-color: ${props => props.color};
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: ${props => (props.isRectangular ? '' : '50%')};
  display: inline-block;
`

export default Circle
