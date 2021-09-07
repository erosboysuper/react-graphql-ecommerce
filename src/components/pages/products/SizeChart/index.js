import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { darkFont } from '~/utils/colors'
import { Img, Letter, Space, DesktopContain } from '~/utils/styles'
import { device } from '~/utils/device'
import ProductContext from '~/context/ProductContext'
import CloseModalImg from '~/images/Assets/Close-modal.svg'

const SizeChart = ({ sizeChart }) => {
  const { setModal, setSizeChart } = useContext(ProductContext)
  const [inch, setInch] = useState(false)
  return (
    <SizeChoose>
      <LetterContainer>
        <Letter
          font="Titillium Bold"
          color={darkFont}
          size={16}
          sizeLaptop={16}
          sizeLaptopL={18}
          sizeDesktop={20}
        >
          SIZE CHART
        </Letter>
        <img
          src={CloseModalImg}
          onClick={() => {
            setSizeChart(false)
            setModal(false)
          }}
          alt="Close Image"
        />
      </LetterContainer>
      <Space height={30} />
      <Letter
        font="Titillium Bold"
        size={18}
        sizeLaptopL={18}
        sizeLaptop={16}
        sizeDesktop={20}
        color={darkFont}
      >
        {sizeChart.heading}
      </Letter>
      <br />
      <Letter
        font="Titillium Web"
        size={14}
        sizeLaptopL={16}
        sizeLaptopL={19}
        sizeDesktop={22}
        color={darkFont}
      >
        {sizeChart.description}
      </Letter>
      <Space height={20} />
      <Buttons>
        <Button1
          onClick={() => setInch(false)}
          background={inch === false ? darkFont : '#E4E4EA'}
        >
          <Letter
            font="Titillium Web"
            size={15}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            color={inch === false ? 'white' : '#A9ACAF'}
          >
            CM
          </Letter>{' '}
        </Button1>
        <Button2
          onClick={() => setInch(true)}
          background={inch === true ? darkFont : '#E4E4EA'}
        >
          <Letter
            font="Titillium Web"
            size={15}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            color={inch === true ? 'white' : '#A9ACAF'}
          >
            INCH
          </Letter>{' '}
        </Button2>
      </Buttons>
      <Space height={20} />
      <SizeOptions>
        {sizeChart.sizes &&
          sizeChart.sizes.length > 0 &&
          sizeChart.sizes.map(size => (
            <React.Fragment key={size.id}>
              <Letter
                font="Titillium Bold"
                size={16}
                sizeLaptop={16}
                sizeLaptopL={18}
                sizeDesktop={20}
                color={darkFont}
              >
                {size.title}
              </Letter>
              <br />
              {size.sizeVariant.map(sv => (
                <React.Fragment key={sv.id}>
                  {sv.title && (
                    <Letter
                      font="Titillium Web"
                      size={14}
                      sizeTablet={16}
                      sizeLaptop={14}
                      sizeLaptopL={16}
                      sizeDesktop={18}
                    >
                      {sv.title}: {` `}
                    </Letter>
                  )}
                  <Letter
                    font="Titillium Web"
                    size={14}
                    sizeLaptop={14}
                    sizeLaptopL={16}
                    sizeDesktop={18}
                    color="#FF8C00"
                  >
                    {inch === false ? sv.cmHelpText : sv.inchHelpText}
                  </Letter>
                  <br />
                </React.Fragment>
              ))}
              <DesktopContain>
                {' '}
                <Space height={10} />{' '}
              </DesktopContain>
            </React.Fragment>
          ))}
        {sizeChart.image && (
          <ImgBox>
            {sizeChart.image.fluid ? (
              <Img fluid={sizeChart.image.fluid} />
            ) : (
              <LazyLoad>
                <img
                  src={sizeChart.image.url}
                  alt="size chart"
                  style={{ width: '100%' }}
                />
              </LazyLoad>
            )}
          </ImgBox>
        )}
      </SizeOptions>
    </SizeChoose>
  )
}

const SizeChoose = styled.div`
  & {
    width: 100%;
    height: 80%;
    position: fixed;
    bottom: 0px;
    background: white;
    z-index: 100;
    padding-left: 5%;
    padding-right: 5%;
    overflow: scroll;
  }
  @media ${device.laptop} {
    width: 43%;
    height: 100%;
    right: 0px;
    padding-left: 50px;
    padding-right: 50px;
    max-width: 450px;
  }
  @media ${device.laptopL} {
    width: 34%;
    max-width: unset;
  }
`

const LetterContainer = styled.div`
  & {
    text-align: center;
    margin-top: 25px;
    position: relative;
    letter-spacing: 1px;
  }
  & img {
    position: absolute;
    top: 0px;
    right: 10px;
  }
  @media ${device.laptop} {
    margin-top: 47px;
    margin-bottom: 30px;
    & img {
      width: 26px;
      left: -20px;
      top: -4px;
    }
  }
  @media ${device.laptopL} {
    margin-bottom: 40px;
    & img {
      width: 32px;
      left: -20px;
      top: -3px;
  }
  @media ${device.desktop} {
    margin-bottom: 60px;
    & img {
      width: 38px;
      left: -20px;
      top: 0px;
  }
`

const Buttons = styled.div`
  & {
    text-align: center;
  }

  & button {
    width: 58px;
    height: 36px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  @media ${device.laptop} {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  @media ${device.laptopL} {
    margin-top: 60px;
  }
  @media ${device.desktop} {
    margin-top: 80px;
  }
`

const SizeOptions = styled.div`
  & {
    position: relative;
  }

  & img {
    position: absolute;
    top: 0px;
    right: -10px;
  }
`

const Button1 = styled.button`
  border: none;
  background: ${props => props.background};
`

const Button2 = styled.button`
  background: ${props => props.background};
  border: none;
`

const ImgBox = styled.div`
  position: absolute;
  width: 236px;
  top: 0;
  right: 0;
  @media ${device.laptop} {
    width: 180px;
    top: 12%;
  }
  @media ${device.laptopL} {
    width: 210px;
  }
  @media ${device.desktop} {
    width: 236px;
  }
`

export default SizeChart
