import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { btn_color } from '~/utils/colors'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'
import { device } from '~/utils/device'

const SubTitle = ({ title, subtitle, link, top, long, cb }) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const anchorLink = reg.test(`${link}`) ? `${link}` : `/${localeFolder}${link}`
  return (
    <Container long={long === true ? 1 : 0}>
      <Title top={top ? top : 40}>{title}</Title>
      {link && (
        <Link
          to={anchorLink}
          onClick={() => {
            if (typeof cb === 'function') {
              cb()
            }
          }}
        >
          <Label color={btn_color}>
            {subtitle} &nbsp; &nbsp;
            <Image src={ArrowImg} alt="ArrowImg" />
          </Label>
        </Link>
      )}
      {!link && (
        <Label
          color={btn_color}
          onClick={() => {
            if (typeof cb === 'function') {
              cb()
            }
          }}
        >
          {subtitle} &nbsp; &nbsp;
          <Image src={ArrowImg} alt="ArrowImg" />
        </Label>
      )}
    </Container>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
    // margin-left: -50px;
    // margin-right: 40px;
    // margin-top: 320px;
    max-width: ${props => props.long * 60 + 170}px;
  }
  @media ${device.laptopL} {
    max-width: ${props => props.long * 50 + 200}px;
  }
  @media ${device.desktop} {
    max-width: ${props => props.long * 50 + 250}px;
  }
`

const Title = styled.p`
  margin-top: 60px;
  font-weight: 800;
  font-size: 26px;
  text-align: center;
  margin: ${props => props.top}px 5px 5px 5px !important;
  font-family: Titillium Black;
  @media ${device.mobileS} {
    font-size: 23px;
  }
  @media ${device.mobileM} {
    font-size: 26px;
  }
  @media ${device.mobileL} {
    font-size: 26px;
  }
  @media ${device.tablet} {
    font-size: 34px;
  }
  @media ${device.laptop} {
    font-size: 30px;
    text-align: end;
    line-height: 1em;
    margin: ${props => props.top}px 5px 25px 5px !important;
  }
  @media ${device.laptopL} {
    font-size: 36px;
    text-align: end;
    line-height: 1em;
    margin: ${props => props.top}px 5px 40px 5px !important;
  }
  @media ${device.desktop} {
    font-size: 46px;
  }
`

const Label = styled.span`
  & {
    font-size: 16px;
    text-align: center;
    font-family: Titillium Web;
    margin: 0px 5px 20px 5px !important;
    color: ${props => props.color};
    // transform: translate(-10px, 0px);
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  & img {
    margin-top: 0px;
    width: 12px;
  }
  @media ${device.mobileS} {
    font-size: 14px;
    & img {
      margin-top: 0px;
    }
  }
  @media ${device.mobileM} {
    font-size: 16px;
    & img {
      margin-top: 0px;
      width: 14px;
    }
  }

  @media ${device.laptop} {
    display: block;
    font-size: 18px;
    text-align: end;
    float: right;
    max-width: 200px;
    & img {
      width: 14px;
    }
  }
`

const Image = styled.img``

export default SubTitle
