import React, { useState } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'

import {
  Img,
  Letter,
  Space,
  MobileContain,
  DesktopContain,
} from '~/utils/styles'

const SizeChartItem = ({ sizeChart }) => {
  const [inch, setInch] = useState(false)

  return (
    <Div>
      <HalfLeftDesktop>
        <SizeChoose>
          <MobileContain>
            <Space height={50} />
          </MobileContain>
          <DesktopContain>
            <Space height={99} />
          </DesktopContain>
          <Letter
            font="Titillium Bold"
            size={18}
            sizeTablet={23}
            sizeLaptop={22}
            sizeDesktop={26}
            color={darkFont}
          >
            {sizeChart ? sizeChart.heading : null}
          </Letter>
          <br />
          <Space height={20} />
          <Letter
            font="Titillium Light"
            size={18}
            sizeTablet={23}
            sizeLaptop={20}
            sizeLaptopL={23}
            sizeDesktop={26}
            color={darkFont}
          >
            {sizeChart ? sizeChart.description : null}
          </Letter>
          <Space height={20} />
          {sizeChart && sizeChart.image && (
            <ImageContainer>
              <Contain>
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
              </Contain>
            </ImageContainer>
          )}
        </SizeChoose>
      </HalfLeftDesktop>
      <GrayBack>
        <Buttons>
          <Button1
            onClick={() => setInch(false)}
            background={inch === false ? darkFont : '#E4E4EA'}
          >
            <Letter
              font="Titillium Web"
              size={15}
              sizeTablet={18}
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
              sizeTablet={18}
              sizeLaptop={14}
              sizeLaptopL={16}
              sizeDesktop={18}
              color={inch === true ? 'white' : '#A9ACAF'}
            >
              INCH
            </Letter>{' '}
          </Button2>
        </Buttons>
        <ProductSizes>
          <Specific>
            <MobileContain>
              <Space height={60} />
            </MobileContain>
            <DesktopContain>
              <Space height={30} />
            </DesktopContain>
            <HeadingLetter>
              <Letter
                font="Titillium Bold"
                size={20}
                sizeTablet={24}
                sizeLaptop={18}
                sizeLaptopL={21}
                sizeDesktop={24}
                color={darkFont}
              >
                {sizeChart ? sizeChart.title : null}
              </Letter>
            </HeadingLetter>
            <Space height={30} />
            <SizeOptions>
              {sizeChart &&
                sizeChart.sizes &&
                sizeChart.sizes.length > 0 &&
                sizeChart.sizes.map(size => (
                  <SizeOption key={size.id}>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeTablet={20}
                      sizeLaptop={18}
                      sizeLaptopL={21}
                      sizeDesktop={24}
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
                          sizeTablet={16}
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
                  </SizeOption>
                ))}
            </SizeOptions>
            <Space height={30} />
          </Specific>
        </ProductSizes>
      </GrayBack>
    </Div>
  )
}

const Div = styled.div`
  @media ${device.laptop} {
    display: flex;
    width: 93%;
    margin-left: 3%;
    justify-content: center;
  }
`

const SizeChoose = styled.div`
  & {
    width: 100%;
    background: white;
    z-index: 10;
    padding-left: 5%;
    padding-right: 5%;
  }
`

const Buttons = styled.div`
  & {
    float: right;
  }

  & button {
    width: 58px;
    height: 36px;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
  }
  @media ${device.laptop} {
    & button {
      width: 80px;
      height: 46px;
    }
  }
`

const SizeOptions = styled.div`
  & {
    position: relative;
    display: block;
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

const ImgBox = styled.div``

const ImageContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  position: relative;
`

const SizeOption = styled.div`
  width: 50%;
  display: inline-block;
  line-height: 1.2em;
  margin-bottom: 15px;
  @media ${device.laptop} {
    width: 50%;
  }
`

const GrayBack = styled.div`
  background: #f2f2f7;
  padding: 16px;
  @media ${device.laptop} {
    width: 55%;
    background: unset;
    padding-top: 40px;
  }
  @media ${device.laptopL} {
    width: 55%;
    background: unset;
    padding-top: 40px;
  }
  @media ${device.desktop} {
    width: 50%;
    background: unset;
    padding-top: 40px;
  }
`

const HalfLeftDesktop = styled.div`
  @media ${device.laptop} {
    width: 35%;
    margin-right: 5%;
  }
  @media ${device.laptopL} {
    width: 35%;
    margin-right: 5%;
  }
  @media ${device.desktop} {
    width: 40%;
    margin-right: 5%;
  }
`

const Contain = styled.div`
  @media ${device.laptop} {
  }
`

const Specific = styled.div`
  @media ${device.laptop} {
    background: #f2f2f7;
    position: relative;
    padding-left: 11%;
    padding-right: 4%;
    width: 100%;
  }
`

const ProductSizes = styled.div`
  @media ${device.laptop} {
    display: flex;
    margin-top: 59px;
    width: 100%;
  }
`

const HeadingLetter = styled.div`
  @media ${device.laptop} {
  }
`

export default SizeChartItem
