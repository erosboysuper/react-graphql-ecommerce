import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import { Letter, Space } from '~/utils/styles'
import { dateDiffInDays } from '~/utils/functions'

import CoCreateModal from '~/components/pages/products/CoCreateModal'

import CheckImg from '~/images/Assets/check-icon.png'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'
import BlankCircleImg from '~/images/Assets/Process-incomplete.svg'

const ProductStage = ({ product, value = 70 }) => {
  const [activeNum, setActiveNum] = useState(0)
  const [availableInDays, setAvailableInDays] = useState(null)
  const [coCreateModal, setCoCreateModal] = useState(false)

  useEffect(() => {
    let num = Math.floor(60 / 33)
    setActiveNum(num)

    if (product.isTboCommunity && product.availabilityDate) {
      let _availableInDays = dateDiffInDays(
        new Date(),
        new Date(product.availabilityDate)
      )
      if (_availableInDays < 1) {
        _availableInDays = null
      }
      setAvailableInDays(_availableInDays)
    }
  }, [product])

  return (
    <React.Fragment>
      <div>
        <LetterContainer>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeTablet={22}
            sizeLaptopL={19}
            sizeLaptop={16}
            sizeDesktop={22}
            color={darkFont}
          >
            Product Stage
          </Letter>
          <Right>
            <Letter
              font="Titillium Web"
              size={14}
              sizeTablet={18}
              sizeLaptop={14}
              sizeLaptopL={16}
              sizeDesktop={18}
              color="#FF8C00"
              onClick={() => setCoCreateModal(true)}
            >
              What’s to Co-Create? &nbsp;
              <img src={ArrowImg} alt="Arrow" />
            </Letter>
          </Right>
        </LetterContainer>
        <Space height={10} />
        <ProgressBar>
          <Img1 src={CheckImg} alt="CheckImg" />
          {activeNum > 0 ? (
            <Img2 src={CheckImg} alt="CheckImg" />
          ) : (
            <Img2 src={BlankCircleImg} alt="CheckImg" />
          )}
          {activeNum > 1 ? (
            <Img3 src={CheckImg} alt="CheckImg" />
          ) : (
            <Img3 src={BlankCircleImg} alt="CheckImg" />
          )}
          {activeNum > 2 ? (
            <Img4 src={CheckImg} alt="CheckImg" />
          ) : (
            <Img4 src={BlankCircleImg} alt="CheckImg" />
          )}
          <Bar />
          <InComplete value={value} />
        </ProgressBar>
        <TextBar>
          <Letter1>
            <Letter
              font="Titillium Bold"
              size={14}
              sizeTablet={18}
              color="#FF8C00"
            >
              Designed
            </Letter>
          </Letter1>
          <Letter2>
            <Letter
              font="Titillium Bold"
              size={14}
              sizeTablet={18}
              color="#FF8C00"
            >
              Funded
            </Letter>
          </Letter2>
          <Letter3>
            <Letter
              font="Titillium Bold"
              size={14}
              sizeTablet={18}
              color="#FF8C00"
            >
              Production
            </Letter>
          </Letter3>
          <Letter4>
            <FloatRight>
              <Letter
                font="Titillium Web"
                size={12}
                sizeTablet={16}
                color="#A9ACAF"
              >
                Available
              </Letter>
            </FloatRight>
            <br />
            {availableInDays ? (
              <BelowLetter>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeTablet={18}
                  color="#A9ACAF"
                >
                  {availableInDays} days left
                </Letter>
              </BelowLetter>
            ) : (
              <BelowLetter>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeTablet={18}
                  color="#A9ACAF"
                >
                  few days left
                </Letter>
              </BelowLetter>
            )}
          </Letter4>
        </TextBar>
      </div>
      {coCreateModal && (
        <CoCreateModal onClose={() => setCoCreateModal(false)} />
      )}
    </React.Fragment>
  )
}

const LetterContainer = styled.div`
  position: relative;
  margin-left: 5%;
  @media ${device.laptop} {
    margin-left: 0px;
  }
`

const Right = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  cursor: pointer;
`

const ProgressBar = styled.div`
  position: relative;
  padding-top: 5px;
  width: 90%;
  margin-left: 5%;
  display: flex;
  @media ${device.tablet} {
    margin-left: 5%;
    & img {
      width: 30px;
    }
  }
  @media ${device.laptop} {
    margin-left: 0px;
    & img {
      width: auto;
      margin-top: 5px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 30px;
      margin-top: 0px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 25px;
      margin-top: 1px;
    }
  }
`

const Img1 = styled.img`
  position: absolute;
  left: 0%;
  top: 0px;
  z-index: 3;
  border-radius: 50%;
  background: white;
  @media ${device.tablet} {
    border-radius: 50%;
    background: white;
  }
`

const Img2 = styled.img`
  position: absolute;
  left: 31.6%;
  top: 0px;
  z-index: 3;
  border-radius: 50%;
  background: white;
  @media ${device.tablet} {
    border-radius: 50%;
    background: white;
  }
`

const Img3 = styled.img`
  position: absolute;
  left: 63.6%;
  top: 0px;
  border-radius: 50%;
  background: white;
  z-index: 3;
  @media ${device.tablet} {
    border-radius: 50%;
    background: white;
  }
`

const Img4 = styled.img`
  position: absolute;
  left: 97%;
  top: 0px;
  z-index: 3;
  border-radius: 50%;
  background: white;
  @media ${device.tablet} {
    border-radius: 50%;
    background: white;
  }
`

const Bar = styled.div`
  width: 100%;
  background: #f57b00;
  height: 8px;
  margin-left: 10px;
  // @media ${device.tablet} {
  //   width: 96%;
  // }
  @media ${device.tablet} {
    width: 100%;
    height: 11px;
    margin-top: 4px;
    margin-left: 8px;
  }
  @media ${device.laptop} {
    height: 8px;
  }
  @media ${device.laptopL} {
    width: 100%;
    height: 11px;
    margin-top: 4px;
    margin-left: 8px;
  }
`

const InComplete = styled.div`
  position: absolute;
  left: ${props => props.value}%;
  width: ${props => 100 - props.value}%;
  height: 8px;
  background: white;
  border: 1px solid black;
  border-left: none;
  border-right: none;
  // @media ${device.tablet} {
  //   width: ${props => 100 - props.value - 2}%;
  // }
  @media ${device.tablet} {
    width: ${props => 100 - props.value}%;
    height: 11px;
    margin-top: 4px;
  }
  @media ${device.laptop} {
    width: ${props => 100 - props.value - 2}%;
    height: 8px;
  }
  @media ${device.laptopL} {
    width: ${props => 100 - props.value}%;
    height: 11px;
    margin-top: 4px;
  }
`

const TextBar = styled.div`
  position: relative;
  margin-left: 5%;
  @media ${device.laptop} {
    margin-left: 0%;
  }
`

const Letter1 = styled.div`
  position: absolute;
  left: 0px;
  transform: translate(0px, 10px);
`

const Letter2 = styled.div`
  position: absolute;
  left: 32%;
  transform: translate(-50%, 10px);
`

const Letter3 = styled.div`
  position: absolute;
  left: 61%;
  transform: translate(-50%, 10px);
`

const Letter4 = styled.div`
  position: absolute;
  right: 20px;
`

const FloatRight = styled.div`
  float: right;
  line-height: 0.5em;
  margin-top: 8px;
  @media ${device.laptop} {
    margin-top: 14px;
  }
  @media ${device.laptopL} {
    margin-top: 8px;
  }
`

const BelowLetter = styled.div`
  margin-top: -6px;
  @media ${device.laptop} {
    margin-top: 1px;
  }
  @media ${device.laptopL} {
    margin-top: -6px;
  }
`

export default ProductStage
