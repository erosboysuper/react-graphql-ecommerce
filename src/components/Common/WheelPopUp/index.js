import React, { useContext, useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'

import { btn_color, gray_back } from '~/utils/colors'
import { Cover, Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import SpinWheel from '~/components/Common/SpinWheel'

import BackImg from '~/images/Assets/spinnerBack.png'
import CloseModalImg from '~/images/Assets/Close-modal.svg'
import { Link } from '@reach/router'

const WheelPopUp = () => {
  const {
    wheelPopModal,
    setWheelPopModal,
    wheelPrize,
    wheelPopClosed,
    setWheelPopClosed,
    locale,
    localeFolder,
    localeSetting,
  } = useContext(StoreContext)
  const urlReg = /http(s):/
  const [coupon, setCoupon] = useState(false)
  const [button, setButton] = useState(false)
  const [email, setEmail] = useState('')
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const { spinWheel_en, spinWheel_de, spinWheel_ch } = useStaticQuery(graphql`
    {
      spinWheel_en: datoCmsSpinTheWheel(locale: { eq: "en" }) {
        ...spinWheel_commonFields
      }
      spinWheel_de: datoCmsSpinTheWheel(locale: { eq: "de" }) {
        ...spinWheel_commonFields
      }
      spinWheel_ch: datoCmsSpinTheWheel(locale: { eq: "en-CH" }) {
        ...spinWheel_commonFields
      }
    }
    fragment spinWheel_commonFields on DatoCmsSpinTheWheel {
      id
      showWheelPopup
      wheelPopupDelay
      title
      subTitle
      couponCode
      shopNowLink
      wheelItems {
        id
        title
        isSelected
      }
    }
  `)
  let spinWheel = {}
  if (locale === 'en') {
    spinWheel = spinWheel_en
  } else if (locale === 'de') {
    spinWheel = spinWheel_de
  } else if (locale === 'en-CH') {
    spinWheel = spinWheel_ch
  }

  let wheelItems = spinWheel.wheelItems || []
  wheelItems = wheelItems.map((item, i) => {
    item['index'] = i
    return item
  })
  const preSelectedItem =
    wheelItems.find(item => item.isSelected === true) || null

  useEffect(() => {
    const wheelCoupon = localStorage.getItem('wheelCoupon')
    if (!wheelCoupon && !wheelPopClosed) {
      setTimeout(() => setWheelPopModal(true), 1000 * spinWheel.wheelPopupDelay)
    }
  }, [])

  useEffect(() => {
    const isValidEmail = reg.test(`${email}`.toLowerCase())
    if (email !== '' && isValidEmail) setButton(true)
    else setButton(false)
  }, [email])

  const getCoupon = () => {
    const isValidEmail = reg.test(`${email}`.toLowerCase())
    if (isValidEmail) {
      setCoupon(true)
      localStorage.setItem('wheelCoupon', true)

      // CALL EMAIL SUBSCRIPTION API
      fetch(`${process.env.EMAIL_SUBSCRIBE_URL}`, {
        method: 'POST',
        async: true,
        crossDomain: true,
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          currency_code: `${localeSetting.CURRENCY_CODE}`,
        }),
      }).then(() => {})
    }
  }

  const CloseModal = () => {
    setWheelPopModal(false)
    setWheelPopClosed(true)
  }
  const anchorLink = urlReg.test(`${spinWheel.shopNowLink}`)
    ? `${spinWheel.shopNowLink}`
    : `/${localeFolder}${spinWheel.shopNowLink}`
  return spinWheel.showWheelPopup === true && wheelPopModal === true ? (
    <React.Fragment>
      <Cover background={0.5} index={10} onClick={() => CloseModal()} />
      <Container>
        <Background>
          <img src={BackImg} alt="BackImg" />
        </Background>
        <CloseIcon
          src={CloseModalImg}
          alt="CloseModalImg"
          onClick={() => CloseModal()}
        />
        {wheelPrize === undefined && coupon === false && (
          <SpinReady>
            <RelativePart>
              <Title>
                <Letter
                  font="Titillium Black"
                  size={40}
                  sizeMobileS={30}
                  sizeMobileM={40}
                  sizeMobileL={40}
                  color="#202122"
                >
                  {spinWheel.title}
                </Letter>
              </Title>
              <SubTitle>
                <Letter
                  font="Titillium Bold"
                  size={20}
                  sizeMobileS={16}
                  sizeMobileM={20}
                  sizeMobileL={20}
                  color="#202122"
                >
                  {' '}
                  {spinWheel.subTitle}
                </Letter>
              </SubTitle>
            </RelativePart>
            <WheelPart>
              <SpinWheel items={wheelItems} preSelectedItem={preSelectedItem} />
            </WheelPart>
          </SpinReady>
        )}
        {wheelPrize !== undefined && coupon === false && (
          <SpinResult>
            <RelativePart>
              <Title>
                <Letter
                  font="Titillium Black"
                  size={40}
                  sizeMobileS={30}
                  sizeMobileM={40}
                  sizeMobileL={40}
                  color="#202122"
                >
                  Awesome!
                </Letter>
              </Title>
              <SubTitle>
                <Letter
                  font="Titillium Black"
                  size={28}
                  sizeMobileS={24}
                  sizeMobileM={28}
                  sizeMobileL={28}
                  color="#202122"
                >
                  {' '}
                  You’ve won {wheelPrize.title}.
                </Letter>
              </SubTitle>
              <CouponLetter>
                <Letter
                  font="Titillium Bold"
                  size={18}
                  sizeMobileS={15}
                  sizeMobileM={18}
                  sizeMobileL={18}
                  color="#202122"
                >
                  Enter your email address for your coupon code
                </Letter>
              </CouponLetter>
              <input
                placeholder="Enter Your Best Email Address"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <NextButton onClick={() => getCoupon()} isActive={button}>
                <Letter
                  font="Titillium Bold"
                  size={22}
                  sizeMobileS={18}
                  sizeMobileM={22}
                  sizeMobileL={22}
                  color={button ? 'white' : 'black'}
                >
                  NEXT
                </Letter>
              </NextButton>
              <Shadow />
            </RelativePart>
          </SpinResult>
        )}
        {coupon === true && (
          <ShopPart>
            <RelativePart>
              <Title>
                <Letter
                  font="Titillium Black"
                  size={40}
                  sizeMobileS={30}
                  sizeMobileM={40}
                  sizeMobileL={40}
                  color="#202122"
                >
                  Thanks
                </Letter>
              </Title>
              <SubTitle>
                <Letter
                  font="Titillium Black"
                  size={28}
                  sizeMobileS={24}
                  sizeMobileM={28}
                  sizeMobileL={28}
                  color="#202122"
                >
                  {' '}
                  Use Coupon Code.
                </Letter>
              </SubTitle>
              <SelectedCoupon>{spinWheel.couponCode}</SelectedCoupon>
              <CheckoutLetter>
                <Letter
                  font="Titillium Bold"
                  size={18}
                  sizeMobileS={15}
                  sizeMobileM={18}
                  sizeMobileL={18}
                  color="#202122"
                >
                  at the time of checkout
                </Letter>
              </CheckoutLetter>
              <Link to={anchorLink}>
                <NextButton isActive={true}>
                  <Letter
                    font="Titillium Bold"
                    size={22}
                    sizeMobileS={18}
                    sizeMobileM={22}
                    sizeMobileL={22}
                  >
                    Shop Now
                  </Letter>
                </NextButton>
                <Shadow />
              </Link>
            </RelativePart>
          </ShopPart>
        )}
      </Container>
    </React.Fragment>
  ) : null
}

const Container = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  z-index: 20;
  @media ${device.mobileS} {
    width: 100%;
  }
  @media ${device.tablet} {
    width: unset;
  }
`

const Background = styled.div`
  @media ${device.mobileS} {
    & img {
      width: 100%;
    }
  }
  @media ${device.tablet} {
    & img {
      width: unset;
    }
  }
`

const CloseIcon = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 38px;
  z-index: 31;
  cursor: pointer;
`

const Title = styled.div`
  width: 90%;
`

const SubTitle = styled.div`
  width: 90%;
  @media ${device.mobileS} {
    width: 90%;
  }
  @media ${device.mobileM} {
    width: 75%;
  }
  @media ${device.tablet} {
    width: 90%;
  }
`

const WheelPart = styled.div`
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 50;
`

const SpinReady = styled.div``

const SpinResult = styled.div`
  & input {
    width: 90%;
    font-size: 20px;
    color: #202122;
    margin-top: 30px;
    height: 64px;
    padding-left: 10px;
  }
  @media ${device.mobileS} {
    & input {
      height: 50px;
    }
  }
  @media ${device.mobileM} {
    & input {
      height: 64px;
    }
  }
  @media ${device.mobileL} {
    & input {
      margin-top: 50px;
    }
  }
  @media ${device.tablet} {
    & input {
      margin-top: 30px;
    }
  }
`

const ShopPart = styled.div`
  & input {
    width: 90%;
    font-size: 20px;
    color: #202122;

    height: 64px;
    padding-left: 10px;
  }
  @media ${device.mobileS} {
    & input {
      height: 50px;
    }
  }
  @media ${device.mobileM} {
    & input {
      height: 64px;
    }
  }
  @media ${device.mobileL} {
  }
`

const CouponLetter = styled.div`
  width: 90%;
`

const NextButton = styled.div`
  position: absolute;
  left: 46%;
  bottom: 22%;
  background: ${props => (props.isActive ? btn_color : gray_back)};
  color: ${props => (props.isActive ? 'white' : 'black')};
  width: 58%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #202122;
  transform: translate(-50%, 0px);
  z-index: 40;
  cursor: pointer;
  @media ${device.mobileS} {
    height: 50px;
  }
  @media ${device.mobileM} {
    height: 56px;
  }
  @media ${device.mobileL} {
    bottom: 26%;
  }
  @media ${device.tablet} {
    bottom: 22%;
  }
`

const Shadow = styled.div`
  position: absolute;
  left: 46%;
  bottom: 22%;
  background: transparent;
  width: 58%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #202122;
  transform: translate(-47%, 6px);
  @media ${device.mobileS} {
    height: 50px;
  }
  @media ${device.mobileM} {
    height: 56px;
  }
  @media ${device.mobileL} {
    bottom: 26%;
  }
  @media ${device.tablet} {
    bottom: 22%;
  }
`

const SelectedCoupon = styled.div`
  width: 90%;
  font-size: 20px;
  color: #202122;
  margin-top: 30px;
  height: 64px;
  padding-left: 10px;
  border: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CheckoutLetter = styled.div`
  margin-top: 10px;
`

const RelativePart = styled.div`
  position: absolute;
  top: 60px;
  left: 20px;
  width: 100%;
  height: 100%;
  @media ${device.mobileS} {
    top: 60px;
  }
  @media ${device.mobileM} {
    top: 60px;
  }
  @media ${device.mobileL} {
    top: 75px;
  }
  @media ${device.tablet} {
    top: 60px;
  }
`

export default WheelPopUp
