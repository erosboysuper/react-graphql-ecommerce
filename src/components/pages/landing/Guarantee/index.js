import React, { useContext } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'

const Guarantee = ({ guaranteeTitle, guarantees, buttonText }) => {
  const { setModal } = useContext(StoreContext)
  guarantees = guarantees || []
  return (
    <Container>
      <Title>
        <Letter
          font="Titillium Black"
          sizeDesktop={42}
          sizeLaptopL={36}
          sizeLaptop={30}
          sizeMobileS={23}
          sizeMobileM={26}
          sizeMobileL={26}
          color="#202122"
        >
          {guaranteeTitle}
        </Letter>
      </Title>
      <GuaranteeList>
        {guarantees.map(item => (
          <Item key={item.id}>
            {item.image.fluid ? (
              <LazyLoad>
                <Image fluid={item.image.fluid} className="item-img" />
              </LazyLoad>
            ) : (
              <LazyLoad>
                <img src={item.image.url} alt="img" className="item-img" />
              </LazyLoad>
            )}
            <div>
              <Letter
                font="Titillium Bold"
                sizeDesktop={30}
                sizeLaptopL={25}
                sizeLaptop={20}
                sizeMobileS={16}
                sizeMobileM={18}
                sizeMobileL={18}
                color="#202122"
              >
                {item.title}
              </Letter>
            </div>
          </Item>
        ))}
      </GuaranteeList>
      <ClaimButton onClick={() => setModal(true)}>
        <Letter
          font="Titillium Bold"
          sizeDesktop={20}
          sizeLaptopL={17}
          sizeLaptop={13}
          color="white"
        >
          {buttonText}
        </Letter>
      </ClaimButton>
      <Shadow />
    </Container>
  )
}

const Container = styled.div`
  height: 472px;
  width: 100%;
  background: #f2f2f7;
  position: relative;
  @media ${device.laptopL} {
    height: 440px;
  }
  @media ${device.desktop} {
    height: 472px;
  }
`

const Title = styled.div`
  text-align: center;
  padding-top: 51px;
`

const GuaranteeList = styled.div`
  display: flex;
  padding-left: 14.5%;
  padding-right: 14.5%;
  justify-content: space-between;
  padding-top: 40px;
  flex-wrap: wrap;
  text-align: center;
  @media ${device.mobileS} {
    display: block;
    padding-left: 11%;
    padding-right: 11%;
    display: flex;
    padding-top: 34px;
  }
  @media ${device.laptop} {
    display: flex;
    padding-top: 40px;
    padding-left: 14.5%;
    padding-right: 14.5%;
  }
`

const Item = styled.div`
  width: 20%;
  min-height: 124px;
  & .item-img {
    margin: 0px auto;
  }
  @media ${device.mobileS} {
    width: 50%;
    margin-bottom: 34px;
    & .item-img {
      width: 70px;
    }
  }
  @media ${device.laptopL} {
    margin-bottom: unset;
    width: 22%;
    & .item-img {
      width: 95px;
      margin-bottom: 6px;
    }
  }
  @media ${device.desktop} {
    width: 20%;
    & .item-img {
      width: 110px;
    }
  }
`

const ClaimButton = styled.button`
  background: #ff8c00;
  height: 86px;
  width: 19.6%;
  position: absolute;
  left: 50%;
  bottom: -40px;
  transform: translate(-50%, 0px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: 2px solid #202122;
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptop} {
    height: 55px;
    display: flex;
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

const Shadow = styled.div`
  background: transparent;
  height: 86px;
  border: 2px solid #202122;
  width: 19.6%;
  position: absolute;
  left: 50%;
  bottom: -47px;
  transform: translate(-48%, 0px);
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.laptopL} {
    height: 70px;
    display: flex;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

export default Guarantee
