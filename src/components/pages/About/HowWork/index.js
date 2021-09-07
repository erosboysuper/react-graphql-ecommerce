import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { btn_color, darkFont } from '~/utils/colors'
import { Letter, Space, MobileContain, DesktopContain } from '~/utils/styles'

import Small1Img from '~/images/Assets/01 small.svg'
import Small2Img from '~/images/Assets/02 small.svg'
import Small3Img from '~/images/Assets/03 small.svg'
import Small4Img from '~/images/Assets/04 small.svg'
import Small5Img from '~/images/Assets/05 small.svg'
import Small6Img from '~/images/Assets/06 small.svg'
import TopNextImg from '~/images/Assets/TopNext.png'
import BottomNextImg from '~/images/Assets/BottomNext.png'
import { device } from '~/utils/device'

const HowWork = ({ howItWorkTitle, howItWorkItems }) => {
  const imgArray = [
    Small1Img,
    Small2Img,
    Small3Img,
    Small4Img,
    Small5Img,
    Small6Img,
  ]

  return (
    <div>
      <Container>
        <Space height={150} />
        <Letter
          font="Titillium Web"
          size={36}
          sizeTablet={50}
          sizeLaptop={44}
          sizeLaptopL={55}
          sizeDesktop={66}
          color={darkFont}
        >
          {howItWorkTitle}
        </Letter>
      </Container>
      <MainContainer>
        {howItWorkItems.map(({ title, shortText }, index) => {
          return (
            <Div key={index}>
              <MobileContain>
                <Contain left={index % 2 === 0 ? 8 : 20}>
                  <ImgContainer>
                    <LazyLoad>
                      <img src={imgArray[index]} alt={title} />
                    </LazyLoad>
                  </ImgContainer>
                  <LetterContainer>
                    <SubTitle>
                      <Letter
                        font="Titillium Bold"
                        size={20}
                        sizeTablet={30}
                        color={btn_color}
                      >
                        {title}
                      </Letter>
                    </SubTitle>
                    <LetterBox width={220}>
                      <Letter
                        font="Titillium Web"
                        size={16}
                        sizeMobileS={13}
                        sizeMobileM={15}
                        sizeMobileL={16}
                        sizeTablet={25}
                        color={darkFont}
                      >
                        {shortText}
                      </Letter>
                    </LetterBox>
                  </LetterContainer>
                </Contain>
                <Space height={24} />
              </MobileContain>
              <DesktopContain>
                <Contain left={index % 2 === 0 ? 8 : 20}>
                  <ImgContainer display={index % 2 === 0 ? 'block' : 'none'}>
                    <LazyLoad>
                      <img src={imgArray[index]} alt={title} />
                    </LazyLoad>
                  </ImgContainer>
                  <LetterContainer top={0}>
                    <SubTitle>
                      <Letter
                        font="Titillium Bold"
                        size={20}
                        sizeDesktop={30}
                        sizeLaptopL={26}
                        sizeLaptop={19}
                        color={darkFont}
                      >
                        {title}
                      </Letter>
                    </SubTitle>
                    <LetterBox width={220}>
                      <Letter
                        font="Titillium Web"
                        size={16}
                        sizeMobileS={13}
                        sizeMobileM={15}
                        sizeMobileL={16}
                        sizeLaptop={12}
                        sizeLaptopL={18}
                        sizeDesktop={20}
                        color={btn_color}
                      >
                        {shortText}
                      </Letter>
                    </LetterBox>
                  </LetterContainer>
                  <ImgContainer display={index % 2 === 1 ? 'block' : 'none'}>
                    <LazyLoad>
                      <img src={imgArray[index]} alt={title} />
                    </LazyLoad>
                  </ImgContainer>
                </Contain>
                <LineImg display={index === 5 ? 'none' : 'block'}>
                  <img
                    src={index % 2 === 0 ? TopNextImg : BottomNextImg}
                    alt="Arrow"
                  />
                </LineImg>
                <Space height={24} />
              </DesktopContain>
            </Div>
          )
        })}
      </MainContainer>
    </div>
  )
}

const Container = styled.div`
  padding: 10px 39px 10px 22px;
  @media ${device.laptop} {
    padding-left: 6.7%;
  }
`
const LineImg = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(56%, 95px);
  display: ${props => props.display};
  & img {
    height: 195px;
  }
  @media ${device.laptop} {
    top: -41px;
    right: 11px;
    display: ${props => props.display};
    & img {
      height: 116px;
    }
  }
  @media ${device.laptopL} {
    display: ${props => props.display};
    & img {
      height: 184px;
    }
    top: -12px;
    right: 10px;
  }
  @media ${device.desktop} {
    & img {
      height: 195px;
    }
    top: 0px;
    right: 0px;
  }
`

const Div = styled.div`
  position: relative;
  @media ${device.tablet} {
    margin-bottom: 30px;
  }
  @media ${device.laptop} {
    margin-bottom: 0px;
    width: 11%;
    margin-right: 3.4%;
  }
  @media ${device.laptopL} {
    width: 13%;
    margin-right: 3.4%;
  }
  @media ${device.desktop} {
    width: 11%;
    margin-right: 3.4%;
  }
`
const MainContainer = styled.div`
  @media ${device.tablet} {
    width: 70%;
    margin-left: 15%;
  }
  @media ${device.laptop} {
    width: 100%;
    display: flex;
    margin-bottom: 100px;
    margin-left: 6.7%;
  }
`

const Contain = styled.div`
  display: flex;
  height: 55px;
  margin-left: ${props => props.left}%;
  @media ${device.laptop} {
    display: block;
    height: auto;
    margin-left: 0px;
  }
`

const SubTitle = styled.div`
  height: 30px;
  @media ${device.tablet} {
    height: 42px;
  }
  @media ${device.laptop} {
    height: auto;
    margin-bottom: 10px;
    margin-top: 13px;
  }
  @media ${device.laptopL} {
    height: auto;
    margin-bottom: 5px;
    margin-top: 30px;
  }
  @media ${device.desktop} {
    height: auto;
    margin-bottom: 10px;
    margin-top: 40px;
  }
`

const LetterBox = styled.div`
  height: 25px;
  width: 160px;
  line-height: 1em;
  width: ${props => props.width}px;
  @media ${device.mobileS} {
    width: ${props => props.width - 70}px;
  }
  @media ${device.mobileM} {
    width: ${props => props.width - 35}px;
  }
  @media ${device.mobileL} {
    width: ${props => props.width - 5}px;
  }
  @media ${device.tablet} {
    width: 340px;
    line-height: 1.5em;
  }
  @media ${device.laptop} {
    height: auto;
    margin-bottom: 30px;
    min-height: 38px;
    line-height: 1em;
    width: 100%;
  }
  @media ${device.laptopL} {
    height: auto;
    margin-bottom: 60px;
    min-height: 38px;
    line-height: 1.3em;
    width: 100%;
  }
  @media ${device.desktop} {
    height: auto;
    margin-bottom: 60px;
    min-height: 38px;
    line-height: 1.4em;
    width: 100%;
  }
`

const ImgContainer = styled.div`
  height: 55px;
  @media ${device.tablet} {
    height: auto;
    & img {
      width: 120px;
    }
  }
  @media ${device.laptop} {
    width: 80px;
    display: ${props => props.display};
    height: auto;
    & img {
      width: 85%;
    }
  }
  @media ${device.laptopL} {
    width: 140px;
    display: ${props => props.display};
    height: auto;
    & img {
      width: 85%;
    }
  }
  @media ${device.desktop} {
    width: 140px;
    display: ${props => props.display};
    height: auto;
    & img {
      width: 100%;
    }
  }
`

const LetterContainer = styled.div`
  height: 55px;
  margin-left: 20px;
  @media ${device.tablet} {
    margin-left: 30px;
  }
  @media ${device.laptop} {
    height: auto;
    margin-left: 0px;
    margin-top: ${props => props.top}px;
  }
`

export default HowWork
