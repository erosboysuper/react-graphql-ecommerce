import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Letter, Space, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import PlusImg from '~/images/Assets/Plus gray.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const AddicFeature = ({
  comfyBambooFabricTitle,
  comfyBambooFabricDescription,
  comfyBambooFabricImage,
  shopNowButtonText,
  shopNowButtonLink,
}) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const _shopNowButtonLink = reg.test(`${shopNowButtonLink}`)
    ? `${shopNowButtonLink}`
    : `/${localeFolder}${shopNowButtonLink}`
  return (
    <React.Fragment>
      <Space height={60} />
      <Container>
        <FirstPart>
          <img src={PlusImg} alt="Plug" />
          <Space height={20} />
          <Letter
            font="Titillium Web"
            size={36}
            sizeMobileS={26}
            sizeMobileM={31}
            sizeMobileL={36}
            sizeDesktop={55}
            sizeTablet={66}
            sizeLaptopL={55}
            sizeLaptop={55}
            color={darkFont}
          >
            {comfyBambooFabricTitle}
          </Letter>
        </FirstPart>
        {comfyBambooFabricImage && (
          <SecondPart>
            <Img
              fluid={comfyBambooFabricImage.fluid}
              alt="Comfy Bamboo Fabric"
            />
          </SecondPart>
        )}
      </Container>
      <Space height={30} />
      <LetterContainer>
        <Letter
          font="Titillium Light"
          size={16}
          dangerouslySetInnerHTML={{
            __html: comfyBambooFabricDescription || '',
          }}
        />
      </LetterContainer>

      <Link to={_shopNowButtonLink}>
        <ButtonContainer>
          <Button>
            {shopNowButtonText} <img src={ArrowImg} alt="Arrow" />
          </Button>
        </ButtonContainer>
        <Shadow />
      </Link>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-top: 150px;
  }
`

const FirstPart = styled.div`
  width: 50%;
  padding-top: 13%;
  padding-left: 22px;
  line-height: 2em;
  @media ${device.tablet} {
    line-height: 3em;
    & img {
      width: 200px;
    }
  }
  @media ${device.laptop} {
    width: 60%;
    line-height: 2em;
    padding-top: 0%;
    padding-left: 7%;
    & img {
      width: 130px;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 160px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 200px;
    }
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 45%;
  }
  @media ${device.tablet} {
    width: 46%;
  }
  @media ${device.laptop} {
    top: 0px;
    width: 34%;
    & img {
      width: 100%;
    }
  }
`

const LetterContainer = styled.div`
  padding: 20px 32px 20px 22px;
  @media ${device.tablet} {
    & h3 {
      font-size: 32px;
    }
    & p {
      font-size: 25px;
    }
  }
  @media ${device.laptop} {
    padding-left: 7%;
    width: 50%;
    & h3 {
      font-size: 25px;
    }
    & p {
      font-size: 22px;
    }
  }
  @media ${device.laptopL} {
    padding-left: 7%;
    width: 50%;
    & h3 {
      font-size: 34px;
    }
    & p {
      font-size: 28px;
    }
  }
  @media ${device.desktop} {
    padding-left: 7%;
    width: 50%;
    & h3 {
      font-size: 40px;
    }
    & p {
      font-size: 32px;
    }
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10px);
  @media ${device.laptop} {
    position: relative;
    padding-left: 7%;
  }
`

const Shadow = styled.div`
  position: absolute;
  width: 210px;
  height: 60px;
  left: 50%;
  transform: translate(-48%, 14px);
  border: 2px solid #202122;
  @media ${device.mobileS} {
    width: 180px;
    height: 50px;
  }
  @media ${device.mobileM} {
    width: 210px;
    height: 60px;
  }
  @media ${device.laptop} {
    width: 220px;
    height: 70px;
    position: relative;
    margin-left: 7%;
    left: unset;
    transform: translate(7px, -53px);
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
    transform: translate(10px, -56px);
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(10px, -71px);
  }
`

const Button = styled.button`
  & {
    width: 210px;
    height: 60px;
    background: #202122;
    color: white;
    text-align: center;
  }
  & img {
    // padding-top: 9px;
    position: absolute;
    top: 25px;
    right: 20px;
  }
  @media ${device.mobileS} {
    width: 180px;
    height: 50px;
    font-size: 14px;
    & img {
      top: 20px;
    }
  }
  @media ${device.mobileM} {
    width: 210px;
    height: 60px;
    font-size: 16px;
    & img {
      top: 25px;
    }
  }
  @media ${device.laptop} {
    width: 220px;
    height: 70px;
    font-size: 17px;
    & img {
      position: relative;
      top: unset;
      right: unset;
      transform: scale(1.1);
      padding-top: 0px;
      padding-left: 40px;
    }
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
    font-size: 19px;
    & img {
      position: relative;
      top: unset;
      right: unset;
      transform: scale(1.3);
      padding-top: 0px;
      padding-left: 40px;
    }
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    font-size: 22px;
    & img {
      position: relative;
      top: unset;
      right: unset;
      transform: scale(1.5);
      padding-top: 0px;
      padding-left: 40px;
    }
  }
`

export default AddicFeature
