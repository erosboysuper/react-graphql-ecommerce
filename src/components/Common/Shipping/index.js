import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import StoreContext from '~/context/StoreContext'

import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import { Letter, Space, DesktopContain } from '~/utils/styles'

import CheckImg from '~/images/Assets/Check.svg'
import BlankCircleImg from '~/images/Assets/Process-incomplete.svg'

const Shipping = ({ isCartPage }) => {
  const { cartSum, cartItems, locale, localeSetting } = useContext(StoreContext)
  const [percent, setPercent] = useState(0)
  const [savingAmount, setSavingAmount] = useState(0)
  const [activeStage, setActiveStage] = useState({})
  const { shippingOption_en, shippingOption_de, shippingOption_ch } =
    useStaticQuery(graphql`
      query {
        shippingOption_en: datoCmsShippingOption(locale: { eq: "en" }) {
          ...shippingOption_commonFields
        }
        shippingOption_de: datoCmsShippingOption(locale: { eq: "de" }) {
          ...shippingOption_commonFields
        }
        shippingOption_ch: datoCmsShippingOption(locale: { eq: "en-CH" }) {
          ...shippingOption_commonFields
        }
      }
      fragment shippingOption_commonFields on DatoCmsShippingOption {
        shippingStages {
          id
          minimumAmount
          displayText
        }
      }
    `)
  let shippingOption = {}
  if (locale === 'en') {
    shippingOption = shippingOption_en
  } else if (locale === 'de') {
    shippingOption = shippingOption_de
  } else if (locale === 'en-CH') {
    shippingOption = shippingOption_ch
  }

  const shippingStages = shippingOption.shippingStages || []
  let lastStage = {}
  if (shippingStages.length > 0) {
    lastStage = shippingStages[shippingStages.length - 1]
  }

  useEffect(() => {
    let _percent = (cartSum / lastStage.minimumAmount) * 100
    if (cartSum >= lastStage.minimumAmount) {
      _percent = 100
    }
    setPercent(_percent)

    let _activeStage = {}
    let _activeStageIndex = null
    shippingStages.forEach((stage, index) => {
      if (cartSum >= stage.minimumAmount) {
        _activeStage = { ...stage }
        _activeStageIndex = index
      }
    })
    if (
      _activeStage.displayText &&
      _activeStage.displayText.indexOf('{cal_amount}') !== -1
    ) {
      let cal_amount = ``
      const nextIndex = _activeStageIndex + 1
      if (shippingStages[nextIndex].minimumAmount) {
        cal_amount = `${localeSetting.CURRENCY_SYMBOL}${(
          shippingStages[nextIndex].minimumAmount - cartSum
        ).toFixed(2)}`
      }
      _activeStage.displayText = _activeStage.displayText.replace(
        '{cal_amount}',
        cal_amount
      )
    }
    setActiveStage(_activeStage)
  }, [cartSum])

  useEffect(() => {
    let _savingAmount = 0
    Object.keys(cartItems).forEach(vId => {
      const variant = cartItems[vId]
      const saveAmount = variant.compareAtPrice - variant.price
      if (saveAmount > 0) {
        _savingAmount += saveAmount * variant.num
      }
    })
    setSavingAmount(_savingAmount)
  }, [cartItems])

  return (
    <React.Fragment>
      {!isCartPage && <Space height={40} />}
      {isCartPage === true && (
        <SummaryLetter>
          <Letter
            font="Titillium Bold"
            size={22}
            sizeTablet={26}
            sizeLaptop={20}
            sizeLaptopL={24}
            sizeDesktop={28}
            color="#202122"
          >
            Shipping
          </Letter>
        </SummaryLetter>
      )}
      <ProgressBar isCartPage={isCartPage}>
        {shippingStages.map((stage, index) => {
          let left = (stage.minimumAmount / lastStage.minimumAmount) * 100
          if (index > 0) {
            left = left - 1
          }
          return (
            <Image
              key={stage.id}
              left={left}
              src={cartSum >= stage.minimumAmount ? CheckImg : BlankCircleImg}
              alt="CheckImg"
            />
          )
        })}
        <Bar />
        <InComplete value={percent} />
      </ProgressBar>
      <Space height={15} />
      <LetterContainer isCartPage={isCartPage}>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeLaptop={16}
          sizeLaptopL={19}
          sizeDesktop={22}
          color={darkFont}
        >
          Your item was added correctly!
        </Letter>
        <div>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeLaptop={16}
            sizeLaptopL={19}
            sizeDesktop={22}
            color={darkFont}
            dangerouslySetInnerHTML={{ __html: activeStage.displayText || '' }}
          />
        </div>
        {isCartPage === true && savingAmount > 0 && (
          <DesktopContain>
            <div>
              <Space height={30} />
              <SaveLetter>
                <Letter
                  font="Titillium Bold"
                  size={22}
                  sizeTablet={25}
                  sizeLaptop={20}
                  sizeLaptopL={24}
                  sizeDesktop={28}
                  color="#202122"
                >
                  Saving
                </Letter>
                <Space height={10} />
                <div>
                  <Letter
                    font="Titillium Bold"
                    size={16}
                    sizeTablet={20}
                    sizeLaptop={16}
                    sizeLaptopL={19}
                    sizeDesktop={22}
                    color="#202122"
                  >
                    Yeah! You are {` `}
                  </Letter>
                  <Letter
                    font="Titillium Bold"
                    size={16}
                    sizeTablet={20}
                    sizeLaptop={16}
                    sizeLaptopL={19}
                    sizeDesktop={22}
                    color="#FF8C00"
                  >
                    saving {` `}
                    {localeSetting.CURRENCY_SYMBOL}
                    {savingAmount.toFixed(2)}
                    {` `} in your order.
                  </Letter>
                </div>
              </SaveLetter>
            </div>
            <Space1 />
          </DesktopContain>
        )}
        <Letter
          font="Titillium Web"
          size={12}
          sizeLaptop={12}
          sizeLaptopL={14}
          sizeDesktop={16}
          color="#A9ACAF"
        >
          *Final shipping, taxes and discounts codes are calculated at checkout
        </Letter>
      </LetterContainer>
    </React.Fragment>
  )
}

const SummaryLetter = styled.div`
  margin: 0 20px 10px 20px;
  @media ${device.tablet} {
    margin: 0 5% 10px 5%;
  }
`

const ProgressBar = styled.div`
  position: relative;
  padding-top: 5px;
  width: 90%;
  margin: 0 5% 10px 5%;
  display: flex;
  @media ${device.laptop} {
    width: ${props => (props.isCartPage === true ? undefined : `77%`)};
    margin-left: ${props => (props.isCartPage === true ? undefined : `50px`)};
  }
`

const Image = styled.img`
  position: absolute;
  left: ${props => `${props.left}%`};
  top: 0px;
  z-index: 3;
  border-radius: 50%;
  background: white;
  @media ${device.laptop} {
    width: 20px;
  }
  @media ${device.laptopL} {
    width: 25px;
  }
  @media ${device.desktop} {
    width: 30px;
  }
`

const Bar = styled.div`
  width: 100%;
  background: #f57b00;
  height: 8px;
  margin-left: 10px;
  @media ${device.laptop} {
    height: 7px;
    margin-left: 16px;
    margin-top: 2px;
  }
  @media ${device.laptopL} {
    height: 9px;
    margin-left: 16px;
    margin-top: 4px;
  }
  @media ${device.desktop} {
    height: 11px;
    margin-left: 16px;
    margin-top: 4px;
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
  @media ${device.laptop} {
    height: 7px;
    margin-top: 2px;
  }
  @media ${device.laptopL} {
    height: 9px;
    margin-top: 4px;
  }
  @media ${device.desktop} {
    height: 11px;
    margin-top: 4px;
  }
`

const LetterContainer = styled.div`
  padding: 0 25px;
  @media ${device.tablet} {
    padding: 0 5%;
  }
  @media ${device.laptop} {
    padding: ${props => (props.isCartPage === true ? undefined : `0 50px`)};
  }
`

const SaveLetter = styled.div``

const Space1 = styled.div`
  width: 100%;
  @media ${device.laptop} {
    height: 30px;
  }
  @media ${device.laptopL} {
    height: 35px;
  }
  @media ${device.desktop} {
    height: 70px;
  }
`

export default Shipping
