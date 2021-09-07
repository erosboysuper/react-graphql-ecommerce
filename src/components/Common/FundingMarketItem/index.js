import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Img, Space, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'

import { btn_color, darkFont } from '~/utils/colors'
import backImg from '~/images/Assets/spinnerBack.png'
import FundingBack from '~/images/Assets/FundingItemBack.png'

import InFundImg from '~/images/Assets/Infunding.svg'
import PledgeImg from '~/images/Assets/Pledge.svg'
import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'

const FundingMarketItem = ({ product, position = false }) => {
  const { localeSetting } = useContext(StoreContext)
  return (
    <React.Fragment>
      <Parent display={position === 'vertical' ? 'block' : 'flex'}>
        <Contain width={position === 'vertical' ? 90 : 41}>
          <Background>
            <LazyLoad>
              <img
                src={position === true ? FundingBack : backImg}
                alt="backImg"
              />
            </LazyLoad>
          </Background>
          <ProductImage>
            {product.media && product.media.length > 0 && (
              <Img fluid={product.media[0].fluid} />
            )}
          </ProductImage>

          <Save market={position !== 'vertical' ? true : false}>
            <span size={14}>Pledge</span> &nbsp;&nbsp;
            <LazyLoad>
              <Image1 src={PledgeImg} alt="PledgeImg" />
            </LazyLoad>
          </Save>

          {position !== true && (
            <TipImage>
              <LazyLoad>
                <Image src={InFundImg} alt="InFundImg" />
              </LazyLoad>
              <TipLetter>IN FUNDING</TipLetter>
            </TipImage>
          )}
        </Contain>
        <br />
        <Parallel width={position === 'vertical' ? 96 : 48}>
          <Contain1>
            <ColPart>
              {product.variants && product.variants.length > 0 && (
                <BoldLabel
                  size={24}
                  sizeLaptop={position === 'vertical' ? 18 : 32}
                  sizeLaptopL={position === 'vertical' ? 22 : 40}
                  sizeDesktop={position === 'vertical' ? 26 : 48}
                >
                  <BoldLabel
                    size={18}
                    sizeLaptop={position === 'vertical' ? 14 : 27}
                    sizeLaptopL={position === 'vertical' ? 17 : 32}
                    sizeDesktop={position === 'vertical' ? 20 : 37}
                  >
                    {localeSetting.CURRENCY_SYMBOL}
                  </BoldLabel>
                  {product.variants[0].price}
                </BoldLabel>
              )}{' '}
              {position === true && (
                <Labels color="#7D7F81" size={14} sizeDesktop={18}>
                  30/40 pre orders
                </Labels>
              )}
            </ColPart>
            {position === true && (
              <ColPart1>
                <br />
                <Label
                  size={16}
                  sizeLaptopL={20}
                  sizeLaptop={16}
                  sizeDesktop={24}
                  font="Titillium Web"
                  color={darkFont}
                >
                  75% founded &nbsp;
                </Label>
                <Label
                  font="Titillium Bold"
                  size={13}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color={btn_color}
                >
                  24 days left
                </Label>
              </ColPart1>
            )}
          </Contain1>
          <ContainProgress>
            <Progress>
              <ProgressBar color={btn_color} value={75}></ProgressBar>
            </Progress>
          </ContainProgress>
          <DesktopContainer
            font="Titillium Web"
            size={24}
            color="#202122"
            display={position === 'vertical' ? 'none' : 'block'}
          >
            <Space height={20}></Space>
            <Letter>
              Extremely comfortable and functional for sports. Co-created for a
              group of hikers, specially designed for cold days in the
              mountains.
            </Letter>
          </DesktopContainer>

          {position !== true && (
            <InfoContain display={position === 'vertical' ? 'flex' : 'block'}>
              <br />

              <Label
                size={16}
                sizeLaptopL={26}
                sizeLaptop={20}
                sizeDesktop={position === 'vertical' ? 24 : 30}
                font="Titillium Web"
                color={darkFont}
              >
                75% founded &nbsp;
              </Label>
              <Label
                font="Titillium Bold"
                size={13}
                sizeLaptop={20}
                sizeLaptopL={26}
                sizeDesktop={position === 'vertical' ? 24 : 30}
                color={btn_color}
              >
                24 days left
              </Label>
              {position !== true && (
                <Labels
                  color="#7D7F81"
                  size={14}
                  sizeLaptopL={25}
                  sizeLaptop={20}
                  sizeDesktop={position === 'vertical' ? 20 : 28}
                >
                  30/40 pre orders
                </Labels>
              )}
            </InfoContain>
          )}

          {position !== true && (
            <React.Fragment>
              <LetterContainer top={position === 'vertical' ? 0 : 1}>
                <Title size={position === 'vertical' ? 0 : 1}>SPORTS</Title>
                <Contain2>
                  <H2
                    size={position === 'vertical' ? 34 : 64}
                    sizeDesktop={position === 'vertical' ? 34 : 64}
                    sizeLaptopL={position === 'vertical' ? 29 : 50}
                    sizeLaptop={position === 'vertical' ? 25 : 44}
                  >
                    Boxer Ultra Sport
                  </H2>
                </Contain2>
              </LetterContainer>
              <Authors
                align={position === 'vertical' ? 'flex-start' : 'space-between'}
              >
                <LazyLoad>
                  <img src={dummyProfilePic} alt="No Profile Image" />
                </LazyLoad>
                <Letter font="Titillium Web" size={16} color="#202122">
                  Simon R. & Tobie C.
                </Letter>
              </Authors>
              <DesktopContainer>
                <Save>
                  <span size={14}>Pledge</span> &nbsp;&nbsp;
                  <LazyLoad>
                    <Image1 src={PledgeImg} alt="PledgeImg" />
                  </LazyLoad>
                </Save>
              </DesktopContainer>
            </React.Fragment>
          )}
        </Parallel>
      </Parent>
    </React.Fragment>
  )
}

const Parent = styled.div`
  width: 100%;
  padding: 0;
  position: relative;
  @media ${device.laptop} {
    display: ${props => props.display};
    padding-top: 60px;
  }
`

const Contain = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  @media ${device.laptop} {
    width: ${props => props.width}%;
    margin-right: 7%;
    margin-left: 2%;
  }
`

const ContainProgress = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  margin-top: 10px;
  @media ${device.laptop} {
    height: auto;
  }
`

const Contain1 = styled.div`
  width: 100%;
  height: 100%;
  max-width: 960px;
  padding: 0;
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-top: 20px;
    height: auto;
  }

  @media ${device.laptopL} {
    margin-top: 35px;
    height: auto;
  }
  @media ${device.desktop} {
    margin-top: 50px;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    & img {
    }
  }
  @media ${device.laptopL} {
    & img {
    }
  }
  @media ${device.desktop} {
    & img {
    }
  }
`

const ProductImage = styled.div`
  position: absolute;
  width: 82%;
  top: 10%;
  left: 10%;
`
const TipImage = styled.div`
  position: absolute;
  top: -5px;
  right: 7%;
  @media ${device.laptop} {
    width: 65px;
    top: -9px;
    right: 4%;
  }
  @media ${device.laptopL} {
    width: 80px;
    top: -13px;
    right: 5%;
  }
  @media ${device.desktop} {
    width: 67px;
    top: -15px;
    right: 7%;
  }
`

const Save = styled.div`
  display: flex;
  position: absolute;
  padding: 16px 20px;
  bottom: -5px;
  right: -5px;
  text-align: center;
  color: white;
  background-color: rgb(255, 140, 0);
  font-size: 14px;
  font-family: Titillium Bold;
  height: 40px;
  width: 106px;
  align-items: center;
  justify-content: center;
  @media ${device.laptop} {
    font-size: 18px;
    width: auto;
    right: 0px;
    bottom: 0px;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    & img {
    }
    margin-top: 10px;
  }
  @media ${device.laptopL} {
    font-size: 22px;
    width: auto;
    right: 0px;
    bottom: -15px;
    left: unset;
    justify-content: space-between;
    height: 75px;
    align-items: center;
    & img {
    }
    margin-top: 15px;
  }
  @media ${device.desktop} {
    height: 90px;
    height: ${props => (props.market ? '90px' : '74px')};
    font-size: ${props => (props.market ? '26px' : '20px')};
    margin-top: 15px;
  }
`

const Image = styled.img`
  width: 100%;
  @media ${device.laptop} {
    width: 75%;
  }
  @media ${device.laptopL} {
    width: 80%;
  }
  @media ${device.desktop} {
    width: 100%;
  }
`

const Image1 = styled.img`
  width: 18px;
  margin-left: 12px;
  @media ${device.laptop} {
    width: 23px;
    float: right;
  }
  @media ${device.laptopL} {
    width: 28px;
    float: right;
  }
  @media ${device.desktop} {
    width: 33px;
    float: right;
  }
`

const Label = styled.label`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: ${props => props.font};
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const BoldLabel = styled.span`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: Titillium Bold;
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`

const Progress = styled.div`
  width: 100%;
  height: 10px;
  border: 1px solid gray;
  @media ${device.laptop} {
    height: 10px;
  }
  @media ${device.laptopL} {
    height: 13px;
  }
  @media ${device.desktop} {
    height: 17px;
  }
`
const ProgressBar = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background-color: ${props => props.color};
  border: 5px solid #ff8c00;
  margin-top: -1px;
  margin-left: -2px;
  @media ${device.laptop} {
    border: 5px solid #ff8c00;
  }
  @media ${device.laptopL} {
    border: 6.5px solid #ff8c00;
  }
  @media ${device.desktop} {
    border: 8.5px solid #ff8c00;
  }
`

const TipLetter = styled.label`
  height: 100px;
  width: 100px;
  color: white;
  transform: rotate(-90deg);
  transform-origin: left top 0;
  position: absolute;
  left: 12px;
  top: 109px;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: Titillium Bold;
  @media ${device.laptop} {
    font-size: 16px;
    width: 200px;
    left: 11px;
    letter-spacing: 3px;
    top: 135px;
  }
  @media ${device.laptopL} {
    font-size: 19px;
    width: 200px;
    left: 14px;
    top: 171px;
    letter-spacing: 4px;
  }
  @media ${device.desktop} {
    font-size: 20px;
    width: 200px;
    left: 16px;
    top: 183px;
    letter-spacing: 5px;
  }
`
const ColPart = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
    width: 64%;
  }
  @media ${device.laptopL} {
    width: 50%;
  }
  @media ${device.desktop} {
    width: 57%;
  }
`
const ColPart1 = styled.div`
  width: 56%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 15px;
  @media ${device.laptop} {
    width: 65%;
    display: flex;
    align-items: flex-end;
    line-height: 1em;
  }
  @media ${device.laptopL} {
    width: 80%;
    display: flex;
    line-height: 1.3em;
  }
  @media ${device.desktop} {
  }
`

const Labels = styled.span`
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: Titillium Web;
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
  }
`
const Title = styled.span`
  font-size: 12px;
  border-radius: 33px;
  border: 1px solid gray;
  color: gray;

  padding: 7px 18px;
  font-family: Titillium Web;
  @media ${device.laptop} {
    font-size: 16px;
    padding: 13px 27px;
  }
  @media ${device.laptopL} {
    font-size: 14px;
    padding: 14px 20px;
  }
  @media ${device.desktop} {
    font-size: ${props => (props.size ? '26px' : '16px')};
    padding: ${props => (props.size ? '18px 27px' : '9px 15px')};
  }
`

const Contain2 = styled.div`
  padding-top: 25px;
`
const H2 = styled.span`
  font-family: Titillium Bold;
  font-size: 20px;
  @media ${device.laptop} {
    font-size: 30px;
  }
  @media ${device.laptopL} {
    font-size: 40px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.size}px;
  }
`

const Parallel = styled.div`
  @media ${device.laptop} {
    width: ${props => props.width}%;
    height: auto;
    position: relative;
  }
`

const LetterContainer = styled.div`
  margin-top: 30px;
  @media ${device.laptop} {
    margin-top: 30px;
  }
  @media ${device.laptopL} {
    margin-top: 50px;
  }
  @media ${device.desktop} {
    margin-top: 80px;
    margin-top: ${props => (props.top ? '80px' : '20px')};
  }
`

const Authors = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-top: 10px;
  & span {
    width: 50%;
  }
  @media ${device.laptop} {
    justify-content: ${props => props.align};
    & img {
      padding-right: 20px;
    }
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: ${props => props.display};
  }
`

const InfoContain = styled.div`
  @media ${device.laptop} {
    display: ${props => props.display};
    flex-wrap: wrap;
  }
`

export default FundingMarketItem
