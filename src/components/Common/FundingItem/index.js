import React, { useContext } from 'react'
import { Img } from '~/utils/styles'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { btn_color, darkFont } from '~/utils/colors'
import { MobileContain, DesktopContain } from '~/utils/styles'

import backImg from '~/images/homepage/productBack1.png'
import InFundImg from '~/images/Assets/Infunding.svg'
import PledgeImg from '~/images/Assets/Pledge.svg'

const FundingItem = ({ product }) => {
  const { localeSetting } = useContext(StoreContext)
  return (
    <React.Fragment>
      <Parent>
        <Contain>
          <Background>
            <LazyLoad>
              <Image src={backImg} alt="backImg" />
            </LazyLoad>
          </Background>
          <ProductImage>
            {product.media && product.media.length > 0 && (
              <Img fluid={product.media[0].fluid} />
            )}
          </ProductImage>
          <MobileContain>
            <Save>
              <span size={14}>Pledge</span> &nbsp;&nbsp;
              <LazyLoad>
                <Image1 src={PledgeImg} alt="PledgeImg" />
              </LazyLoad>
            </Save>
          </MobileContain>
          <TipImage>
            <LazyLoad>
              <Image src={InFundImg} alt="InFundImg" />
            </LazyLoad>
            <TipLetter>IN FUNDING</TipLetter>
          </TipImage>
        </Contain>
        <br />
        <Parallel>
          <Contain1>
            <ColPart>
              {product.variants && product.variants.length > 0 && (
                <BoldLabel
                  size={24}
                  sizeLaptop={36}
                  sizeLaptopL={40}
                  sizeDesktop={48}
                >
                  <BoldLabel
                    size={18}
                    sizeLaptop={25}
                    sizeLaptopL={31}
                    sizeDesktop={37}
                  >
                    {localeSetting.CURRENCY_SYMBOL}
                  </BoldLabel>
                  {product.variants[0].price}
                </BoldLabel>
              )}{' '}
              <br />
              <Labels
                color="#7D7F81"
                size={14}
                sizeLaptopL={25}
                sizeLaptop={20}
                sizeDesktop={28}
              >
                30/40 pre orders
              </Labels>
            </ColPart>
            <ColPart1>
              <br />
              <Label
                size={16}
                sizeLaptopL={26}
                sizeLaptop={20}
                sizeDesktop={30}
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
                sizeDesktop={30}
                color={btn_color}
              >
                24 days left
              </Label>
            </ColPart1>
          </Contain1>
          <ContainProgress>
            <br />
            <Progress>
              <ProgressBar color={btn_color} value={75}></ProgressBar>
            </Progress>
          </ContainProgress>
          <LetterContainer>
            <Title>SPORTS</Title>
            <Contain2>
              <H2>Boxer Ultra Sport</H2>
              <br />
              <Label
                sizeDesktop={34}
                sizeLaptop={20}
                sizeLaptopL={25}
                size={18}
                font="Titillium Light"
                color={darkFont}
              >
                Extremely comfortable and functional for sports Co-created for a
                group of hikers, specially designed for cold days in the
                mountains
              </Label>
            </Contain2>
          </LetterContainer>
          <DesktopContain>
            <Save>
              <span size={14}>Pledge</span> &nbsp;&nbsp;
              <LazyLoad>
                <Image1 src={PledgeImg} alt="PledgeImg" />
              </LazyLoad>
            </Save>
          </DesktopContain>
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
    display: flex;
  }
`

const Contain = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  @media ${device.laptop} {
    width: 41%;
    margin-right: 7%;
    margin-left: 7%;
  }
`

const ContainProgress = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
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
    top: -11px;
  }
  @media ${device.laptopL} {
    width: 80px;
    top: -14px;
  }
  @media ${device.desktop} {
    width: 99px;
    top: -18px;
  }
`

const Save = styled.div`
  display: flex;
  position: relative;
  padding: 16px 20px;
  bottom: -5px;
  right: -5px;
  text-align: center;
  color: white;
  background-color: rgb(255, 140, 0);
  font-size: 14px;
  font-family: Titillium Bold;
  @media ${device.laptop} {
    font-size: 18px;
    width: 55%;
    left: 0px;
    bottom: 0px;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    & img {
    }
    margin-top: 10px;
  }
  @media ${device.laptopL} {
    font-size: 22px;
    width: 55%;
    left: 0px;
    bottom: 0px;
    justify-content: space-between;
    height: 75px;
    align-items: center;
    & img {
    }
    margin-top: 15px;
  }
  @media ${device.desktop} {
    height: 90px;
    font-size: 26px;
    margin-top: 15px;
  }
`

const Image = styled.img`
  width: 100%;
  @media ${device.laptop} {
  }
  @media ${device.desktop} {
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
    font-size: 18px;
    width: 200px;
    left: 16px;
    letter-spacing: 4px;
    top: 173px;
  }
  @media ${device.laptopL} {
    font-size: 24px;
    width: 200px;
    left: 18px;
    top: 209px;
    letter-spacing: 4px;
  }
  @media ${device.desktop} {
    font-size: 28px;
    width: 200px;
    left: 25px;
    top: 255px;
    letter-spacing: 5px;
  }
`
const ColPart = styled.div`
  width: 48%;
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
  width: 48%;
  @media ${device.laptop} {
    width: 65%;
    display: flex;
    align-items: flex-end;
    line-height: 1em;
  }
  @media ${device.laptopL} {
    width: 60%;
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

  padding: 18px 27px;
  font-family: Titillium Web;
  @media ${device.laptop} {
    font-size: 16px;
    padding: 13px 27px;
  }
  @media ${device.laptopL} {
    font-size: 21px;
    padding: 18px 27px;
  }
  @media ${device.desktop} {
    font-size: 26px;
  }
`

const Contain2 = styled.div`
  padding-top: 25px;
`
const H2 = styled.span`
  font-family: Titillium Bold;
  font-size: 26px;
  @media ${device.laptop} {
    font-size: 30px;
  }
  @media ${device.laptopL} {
    font-size: 45px;
  }
  @media ${device.desktop} {
    font-size: 64px;
  }
`

const Parallel = styled.div`
  @media ${device.laptop} {
    width: 48%;
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
  }
`

export default FundingItem
