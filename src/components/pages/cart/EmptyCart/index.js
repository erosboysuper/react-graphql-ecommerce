import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const EmptyCart = ({
  pageLogo,
  emptyMessage,
  showShopNowButton,
  shopNowButtonText,
  shopNowButtonLink,
}) => {
  const reg = /http(s):/
  const { localeFolder } = useContext(StoreContext)
  const anchorLink = reg.test(`${shopNowButtonLink}`)
    ? `${shopNowButtonLink}`
    : `/${localeFolder}${shopNowButtonLink}`
  return (
    <React.Fragment>
      <Container>
        <Logo>
          <LazyLoad>
            <img src={pageLogo.url} alt="Logo" />
          </LazyLoad>
        </Logo>
        <EmptyLetter>
          <Letter
            font="Titillium Web"
            size={32}
            sizeDesktop-={40}
            color="#7D7F81"
          >
            {emptyMessage}
          </Letter>
        </EmptyLetter>
        {showShopNowButton && (
          <Link to={anchorLink}>
            <Button>
              {shopNowButtonText} <img src={ArrowImg} alt="Arrow" />
            </Button>
            <Shadow />
          </Link>
        )}
      </Container>
    </React.Fragment>
  )
}

const Logo = styled.div`
  & img {
    padding-top: 40px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0px);
    width: 200px;
  }
  @media ${device.laptop} {
    & img {
      padding-top: 70px;
      // width: 16%;
    }
  }
`

const Container = styled.div`
  & {
    width: 100%;
    height: 370px;
    background: #f2f2f7;
    position: relative;
  }
  @media ${device.laptop} {
    height: 500px;
  }
`

const EmptyLetter = styled.div`
  width: 250px;
  height: 90px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  top: 180px;
  text-align: center;
  @media ${device.laptop} {
    width: 500px;
    top: 300px;
  }
`

const Button = styled.button`
  & {
    width: 210px;
    height: 60px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 30px);
    font-size: 16px;
    font-family: 'Titillium Bold';
    color: white;
    background: #202122;
    z-index: 3;
  }
  & img {
    position: absolute;
    right: 10px;
    top: 23px;
  }
  @media ${device.laptop} {
    width: 210px;
    height: 60px;
    transform: translate(-50%, 33px);
    font-size: 16px;
    & img {
      top: 28px;
      width: 13px;
      right: 20px;
    }
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 78px;
    transform: translate(-50%, 39px);
    font-size: 19px;
    & img {
      top: 32px;
      width: 15px;
      right: 20px;
    }
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(-50%, 45px);
    font-size: 22px;
    & img {
      top: 38px;
      width: 17px;
      right: 20px;
    }
  }
`

const Shadow = styled.div`
  & {
    width: 210px;
    height: 60px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-47.5%, 35px);
    font-size: 16px;
    font-family: 'Titillium Bold';
    color: white;
    background: white;
    border: 2px solid #202122;
  }
  @media ${device.laptop} {
    width: 200px;
    height: 60px;
    transform: translate(-47%, 40px);
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 78px;
    transform: translate(-47%, 46px);
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(-47%, 52px);
  }
`

export default EmptyCart
