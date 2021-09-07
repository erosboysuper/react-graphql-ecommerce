import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import { darkFont, btn_color, gray_back } from '~/utils/colors'
import { Space, Letter } from '~/utils/styles'
import ProductContext from '~/context/ProductContext'
import { device } from '~/utils/device'

import CloseModalImg from '~/images/Assets/Close-modal.svg'
import SendImg from '~/images/Assets/Send-contact.svg'

const ContactUs = () => {
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')
  const [button, setButton] = useState(false)
  const [sendingData, setSendingData] = useState(false)
  const { setModal, setContactModal } = useContext(ProductContext)
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  useEffect(() => {
    const isValidEmail = reg.test(`${mail}`.toLowerCase())
    if (name !== '' && mail !== '' && message !== '' && isValidEmail)
      setButton(true)
    else setButton(false)
  }, [name, mail, message])

  useEffect(() => {
    if (sendingData) {
      fetch(`${process.env.CONTACT_EMAIL_URL}`, {
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
          name: name,
          mail: mail,
          message: message,
          sourcePage: window.location.href,
        }),
      }).then(() => {
        setName('')
        setMail('')
        setMessage('')
        setButton(false)
        setSendingData(false)
      })
    }
  }, [sendingData])

  return (
    <div>
      <Container>
        <Header>
          <Letter
            font="Titillium Bold"
            size={16}
            sizeDesktop={20}
            sizeLaptopL={18}
            sizeLaptop={16}
            color={darkFont}
          >
            CONTACT US
          </Letter>
          <img
            src={CloseModalImg}
            onClick={() => {
              setModal(false)
              setContactModal(false)
            }}
            alt="Close Image"
          />
        </Header>
        <Space height={30} />
        <InputField
          padding={name !== '' ? 15 : 5}
          display={name !== '' ? 'block' : 'none'}
        >
          <Letter
            font="Titillium Web"
            size={11}
            sizeLaptop={16}
            sizeLaptopL={18}
            sizeDesktop={20}
            color="#A9ACAF"
          >
            Your Name
          </Letter>
          <input
            placeholder="Your Name"
            onChange={event => setName(event.target.value)}
            value={name}
          />
        </InputField>
        <InputField1
          padding={mail !== '' ? 15 : 5}
          display={mail !== '' ? 'block' : 'none'}
        >
          <Letter
            font="Titillium Web"
            size={11}
            sizeLaptop={16}
            sizeLaptopL={18}
            sizeDesktop={20}
            color="#A9ACAF"
          >
            Your Email
          </Letter>
          <input
            placeholder="Your Email"
            onChange={event => setMail(event.target.value)}
            value={mail}
          />
        </InputField1>
        <TextField
          padding={message !== '' ? 20 : 5}
          display={message !== '' ? 'block' : 'none'}
        >
          <Letter
            font="Titillium Web"
            size={11}
            sizeLaptop={16}
            sizeLaptopL={18}
            sizeDesktop={20}
            color="#A9ACAF"
          >
            Your Message
          </Letter>
          <textarea
            placeholder="Your Message"
            onChange={event => setMessage(event.target.value)}
            value={message}
          />
        </TextField>
        <SendButton onClick={() => setSendingData(button)} isActive={button}>
          {sendingData ? `SENDING...` : `SEND`}
          <img src={SendImg} alt="Send Image" />
        </SendButton>
      </Container>
    </div>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  height: 500px;
  width: 100%;
  background: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  @media ${device.laptop} {
    height: 100%;
    width: 42%;
    right: 0px;
    padding-left: 40px;
    padding-right: 80px;
    max-width: 450px;
  }
  @media ${device.laptopL} {
    width: 34%;
    max-width: unset;
    padding-left: 50px;
    padding-right: 120px;
  }
`

const Header = styled.div`
  & {
    text-align: center;
    padding-top: 20px;
    position: relative;
  }
  & img {
    position: absolute;
    right: 10px;
    top: 20px;
    cursor: pointer;
  }
  @media ${device.laptop} {
    & {
      text-align: center;
      padding-top: 47px;
      position: relative;
    }
    & img {
      position: absolute;
      left: 20px;
      top: 44px;
      width: 30px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 30px;
      top: 47px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 38px;
    }
  }
`

const InputField = styled.div`
  & {
    padding: 10px 16px;
    position: relative;
  }
  & input {
    width: 100%;
    height: 54px;
    font-size: 16px;
    padding: ${props => props.padding}px 10px 0px;
    background: #f2f2f7;
    border: none;
  }

  & span {
    position: absolute;
    top: 16px;
    left: 25px;
    display: ${props => props.display};
  }
  @media ${device.laptop} {
    padding-top: 50px;
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
    }
    & input {
      font-size: 16px;
      padding: 0px 10px;
      height: 42px;
    }
  }
  @media ${device.laptopL} {
    padding-top: 60px;
    & input {
      font-size: 18px;
      padding: 0px 10px;
      height: 46px;
    }
  }
  @media ${device.desktop} {
    padding-top: 90px;
    & input {
      font-size: 20px;
      padding: 0px 10px;
      height: 54px;
    }
  }
`

const InputField1 = styled.div`
  & {
    padding: 10px 16px;
    position: relative;
  }
  & input {
    width: 100%;
    height: 54px;
    font-size: 16px;
    padding: ${props => props.padding}px 10px 0px;
    background: #f2f2f7;
    border: none;
  }

  & span {
    position: absolute;
    top: 16px;
    left: 25px;
    display: ${props => props.display};
  }
  @media ${device.laptop} {
    padding-top: 30px;
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
    }
    & input {
      font-size: 16px;
      height: 42px;
      padding: 0px 10px;
    }
  }
  @media ${device.laptopL} {
    padding-top: 30px;
    & input {
      font-size: 18px;
      padding: 0px 10px;
      height: 46px;
    }
  }
  @media ${device.desktop} {
    padding-top: 50px;
    & input {
      font-size: 20px;
      padding: 0px 10px;
      height: 54px;
    }
  }
`

const TextField = styled.div`
  & {
    padding: 10px 16px;
    position: relative;
  }

  & span {
    position: absolute;
    top: 16px;
    left: 25px;
    display: ${props => props.display};
  }
  & textarea {
    width: 100%;
    height: 54px;
    font-size: 16px;
    padding: ${props => props.padding}px 10px 0px;
    height: 140px;
    background: #f2f2f7;
    border: none;
  }
  @media ${device.laptop} {
    padding-top: 30px;
    & span {
      display: block;
      position: relative;
      top: unset;
      left: unset;
    }
    & textarea {
      padding: 0px 10px;
      font-size: 16px;
    }
  }
  @media ${device.laptopL} {
    padding-top: 30px;
    & textarea {
      padding: 0px 10px;
      font-size: 18px;
    }
  }
  @media ${device.desktop} {
    padding-top: 50px;
    & textarea {
      padding: 0px 10px;
      font-size: 20px;
    }
  }
`

const SendButton = styled.button`
  & {
    width: 100%;
    text-align: center;
    height: 60px;
    background: ${props => (props.isActive ? btn_color : gray_back)};
    color: ${props => (props.isActive ? 'white' : 'black')};
    font-family: Titillium Bold;
    font-size: 16px;
    border: none;
    position: relative;
    margin-top: auto;
    cursor: ${props => (props.isActive ? 'pointer' : 'unset')};
  }
  & img {
    position: absolute;
    top: 14px;
    right: 14px;
  }
  @media ${device.laptop} {
    margin-top: unset;
    margin: 30px 16px;
    height: 54px;
    width: unset;
    letter-spacing: 2px;
    margin-bottom: unset;
    font-size: 16px;
    & img {
      position: absolute;
      top: 12px;
      right: 20px;
      width: 30px;
    }
  }
  @media ${device.laptopL} {
    height: 64px;
    font-size: 18px;
    & img {
      top: 18px;
    }
  }
  @media ${device.desktop} {
    height: 83px;
    font-size: 20px;
    & img {
      top: 29px;
    }
  }
`

export default ContactUs
