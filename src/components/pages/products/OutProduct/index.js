import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import ProductContext from '~/context/ProductContext'

import {
  Letter,
  Space,
  Img,
  DesktopContain,
  MobileContain,
} from '~/utils/styles'
import { darkFont, dangerColor, successColor } from '~/utils/colors'
import { device } from '~/utils/device'

import SendContractImg from '~/images/Assets/Send-contact.svg'

import SizeSelect from '~/components/pages/products/SizeSelect'

const OutProduct = ({ product }) => {
  const [email, setEmail] = useState('')
  const [showEmailError, setShowEmailError] = useState(false)
  const [showSizeError, setShowSizeError] = useState(false)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const { size, color } = useContext(ProductContext)
  const { localeSetting } = useContext(StoreContext)
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  let options = { Size: {}, Color: {} }
  product.variant.forEach(v => {
    if (v.size) {
      if (!options['Size'][v.size.name]) {
        options['Size'][v.size.name] = { helpText: v.size.helpText, colors: {} }
      }
      if (v.color) {
        options['Size'][v.size.name]['helpText'] = v.size.helpText || ''
        options['Size'][v.size.name]['colors'][v.color.name] =
          v.availableForSale
      }
    }
    if (v.color) {
      const colorCode = v.color.colorCode
        ? v.color.colorCode.hex
        : v.color.colorImage
        ? v.color.colorImage.url
        : null

      if (colorCode) {
        options['Color'][v.color.name] = colorCode
      }
    }
  })

  useEffect(() => {
    if (reg.test(`${email}`.toLowerCase())) {
      setShowEmailError(false)
    } else {
      setShowEmailError(true)
    }
  }, [email])

  useEffect(() => {
    if (size) {
      setShowSizeError(false)
    } else {
      setShowSizeError(true)
    }
  }, [size])

  const sendRequest = async () => {
    const isValidEmail = reg.test(`${email}`.toLowerCase())
    if (isValidEmail && size) {
      setShowEmailError(false)
      setShowSizeError(false)
      fetch(`${process.env.ACTIVE_CAMPAIGN_URL}`, {
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
          product: product.name || '',
          size: size || '',
          color: color || '',
          currency_code: `${localeSetting.CURRENCY_CODE}`,
        }),
      }).then(res => {
        setEmail('')
        setShowSuccessMsg(true)
      })
    }
    if (!isValidEmail) {
      setShowEmailError(true)
    } else if (!size) {
      setShowSizeError(true)
    }
  }

  return (
    <React.Fragment>
      <Space height={10} />
      <Container>
        <ImgContainer>
          {product.media && product.media.length > 0 && (
            <Img
              fluid={product.media[0].fluid}
              alt={product.media[0].name}
              alt="Media"
            />
          )}
        </ImgContainer>
        <ContainerDetail>
          <Title>
            {product.variant && product.variant.length > 0 && (
              <React.Fragment>
                <Letter
                  font="Titillium Bold"
                  size={10}
                  sizeLaptopL={11}
                  sizeLaptop={10}
                  sizeDesktop={12}
                >
                  {localeSetting.CURRENCY_SYMBOL}
                </Letter>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptopL={16}
                  sizeLaptop={14}
                  sizeDesktop={18}
                >
                  {product.variant[0].price}
                </Letter>
              </React.Fragment>
            )}
          </Title>
          <DesktopContain>
            <Space height={10} />
          </DesktopContain>
          <Letter
            font="Titillium Bold"
            size={18}
            sizeLaptopL={20}
            sizeLaptop={17}
            sizeDesktop={24}
          >
            {product.name}
          </Letter>
        </ContainerDetail>
      </Container>
      <Space height={10} />
      <PaddingContainer>
        <DesktopContain>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeLaptopL={18}
            sizeLaptop={16}
            sizeDesktop={20}
          >
            Can't you find your size?
          </Letter>
          <br />
          <Letter
            font="Titillium Web"
            size={18}
            sizeLaptopL={19}
            sizeLaptop={16}
            sizeDesktop={22}
          >
            We can notify you if the product is back on stock
          </Letter>
          <Space height={40} />
        </DesktopContain>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeLaptopL={18}
          sizeLaptop={16}
          sizeDesktop={20}
        >
          Select the size you prefer
        </Letter>
        {showSizeError && <SizeError>Please select your size</SizeError>}
        <MobileContain>
          <Letter
            font="Titillium Web"
            size={18}
            sizeLaptopL={19}
            sizeLaptop={16}
            sizeDesktop={22}
          >
            We can notify you if the product is back on stock
          </Letter>
        </MobileContain>
        <Space height={10} />
        <PaddingSize>
          <SizeSelect sizes={options['Size']} modal={true} />
        </PaddingSize>
        <Space height={10} />
        <Letter
          font="Titillium Bold"
          size={16}
          sizeLaptop={16}
          sizeLaptopL={18}
          sizeDesktop={20}
        >
          Your Email
        </Letter>
      </PaddingContainer>

      <Space height={20} />
      <SubTitle>
        <input
          type="email"
          required
          placeholder="Enter your email id"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <MobileContain>
          <SendIcon onClick={() => sendRequest()}>
            <img src={SendContractImg} alt="Send" />
          </SendIcon>
        </MobileContain>
      </SubTitle>
      {showSuccessMsg && (
        <SuccessMsg>Email has been sent successfully!</SuccessMsg>
      )}
      {showEmailError && email !== '' && (
        <ErrorMsg>Please enter your valid email.</ErrorMsg>
      )}
      {!showEmailError && (
        <DesktopContain>
          {' '}
          <SendButton onClick={() => sendRequest()}>
            SEND
            <SendIconDesk>
              <img src={SendContractImg} alt="Send" />
            </SendIconDesk>
          </SendButton>
        </DesktopContain>
      )}
    </React.Fragment>
  )
}

const ImgContainer = styled.div`
  width: 88px;
  height: 88px;
  margin: 15px;
  @media ${device.laptop} {
    height: 108px;
    & div {
      width: 108px;
    }
  }
`

const Title = styled.div`
  font-family: Titillium Bold;
  font-size: 24px;
  color: ${darkFont};
  margin-top: -3px;
  @media ${device.laptop} {
    line-height: 0.3em;
  }
`

const SubTitle = styled.div`
  & {
    display: flex;
  }

  & input {
    height: 54px;
    font-size: 16px;

    width: 85%;
    padding-left: 20px;
    background: #f2f2f7;
    border: none;
  }
  @media ${device.laptop} {
    & input {
      margin-left: 7%;
      height: 48px;
      font-size: 15px;
    }
  }
  @media ${device.laptopL} {
    & input {
      margin-left: 7%;
      height: 56px;
      font-size: 17px;
    }
  }
  @media ${device.desktop} {
    & input {
      margin-left: 7%;
      height: 64px;
      font-size: 20px;
    }
  }
`

const Container = styled.div`
  display: flex;
  @media ${device.laptop} {
    margin-left: 7%;
    padding-right: 10%;
    margin-top: 30px;
  }
  @media ${device.laptopL} {
    margin-top: 40px;
  }
  @media ${device.desktop} {
    margin-top: 90px;
  }
`

const ContainerDetail = styled.div`
  margin-left: 10px;
  width: 70%;
  margin-top: 15px;
  @media ${device.laptop} {
    padding-top: 15px;
    margin-left: 20px;
  }
`

const SendIcon = styled.div`
  height: 54px;
  background: #ff8c00;
  width: 54px;
  padding: 11px 8px;
`
const SendIconDesk = styled.div`
  height: 54px;
  background: #ff8c00;
  width: 54px;
  padding: 11px 8px;
  @media ${device.laptop} {
    position: absolute;
    height: 54px;
    background: #ff8c00;
    width: 54px;
    padding: 11px 8px;
    right: 30px;
  }
  @media ${device.laptopL} {
    height: 54px;
    background: #ff8c00;
    width: 54px;
    padding: 11px 8px;
    right: 30px;
  }
  @media ${device.desktop} {
    height: 54px;
    background: #ff8c00;
    width: 54px;
    padding: 11px 8px;
    right: 30px;
  }
`

const SizeError = styled.div`
  display: inline-block;
  color: ${dangerColor};
  font-size: 14px;
  font-family: Titillium Web;
  float: right;
  margin-top: 2px;
  @media ${device.laptop} {
    margin-top: 4px;
  }
}
`

const ErrorMsg = styled.div`
  display: inline-block;
  font-family: Titillium Web;
  font-size: 14px;
  color: ${dangerColor};
  position: relative;
  width: 100%;
  margin-top: 10px;
  @media ${device.laptop} {
    margin-left: 50px;
    font-size: 14px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`

const SuccessMsg = styled.div`
  display: inline-block;
  font-family: Titillium Web;
  font-size: 14px;
  color: ${successColor};
  position: relative;
  width: 100%;
  margin-top: 10px;
  @media ${device.laptop} {
    margin-left: 50px;
    font-size: 14px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
  }
  @media ${device.desktop} {
    font-size: 18px;
  }
`

const PaddingContainer = styled.div`
  @media ${device.laptop} {
    padding-left: 7%;
    padding-right: 10%;
    padding-top: 50px;
  }
  @media ${device.laptopL} {
  }
`

const SendButton = styled.button`
  height: 83px;
  background: #ff8c00;
  font-size: 20px;
  margin-left: 7%;
  color: white;
  width: 85%;
  border: none;
  text-align: center;
  font-family: Titillium Bold;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  position: relative;
  margin-top: 60px;
  @media ${device.laptop} {
    height: 58px;
    font-size: 15px;
  }
  @media ${device.laptopL} {
    height: 70px;
    font-size: 17px;
  }
  @media ${device.desktop} {
    height: 83px;
    font-size: 20px;
  }
`
const PaddingSize = styled.div`
  margin-left: -5%;
  @media ${device.laptop} {
    margin-left: unset;
  }
`

export default OutProduct
