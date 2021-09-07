import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { btn_color } from '~/utils/colors'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'
import MarketImg from '~/images/Assets/MarketImage.png'
import { device } from '~/utils/device'

const MarketHeader = ({ title, subtitle }) => {
  return (
    <Container>
      <Background>
        <LazyLoad>
          <img src={MarketImg} alt="MarketImg" />
        </LazyLoad>
        <Title>
          <Letter
            font="Titillium Web"
            size={32}
            sizeMobileS={25}
            color="#202122"
          >
            Co-Created Underwear
          </Letter>
        </Title>
      </Background>
      <Content>
        <DesktopContain>
          <Letter
            font="Titillium Web"
            size={32}
            sizeLaptop={35}
            sizeLaptopL={47}
            sizeDesktop={54}
            color="#202122"
          >
            Co-Created Underwear
          </Letter>
        </DesktopContain>
        <SubTitle>
          <Letter
            font="Titillium Light"
            size={18}
            sizeMobileS={16}
            sizeLaptop={18}
            sizeLaptopL={22}
            sizeDesktop={26}
            color="#202122"
          >
            We The Tribe are co-creating next generation of products that look
            and feel good! Every product in this Market it’s going to get
            produced if they reach their 100% funding.
          </Letter>
        </SubTitle>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
`

const Background = styled.div`
  width: 100%;
  position: relative;
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    width: 56%;
    & img {
      width: 100%;
    }
  }
`
const Title = styled.div`
  width: 90%;
  height: 60px;
  position: absolute;
  left: 0px;
  transform: translate(0px, -50%);
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media ${device.laptop} {
    display: none;
  }
`

const SubTitle = styled.div`
  margin-top: 27px;
  padding-left: 16px;
  padding-right: 16px;
  @media ${device.laptop} {
    padding-left: 0px;
  }
`

const Content = styled.div`
  @media ${device.laptop} {
    width: 30%;
    margin-left: 4.5%;
    margin-top: 60px;
  }
  @media ${device.laptopL} {
    margin-top: 100px;
  }
`

export default MarketHeader
