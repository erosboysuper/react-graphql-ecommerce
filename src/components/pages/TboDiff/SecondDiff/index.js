import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import Gray2Img from '~/images/Assets/02 gray.svg'

const SecondDiff = ({
  bambooFabricTitle,
  bambooFabricDescription,
  bambooFabricImage,
  bambooFabricIcon,
}) => {
  return (
    <React.Fragment>
      <Space height={60} />
      <Container>
        <FirstPart>
          <LazyLoad>
            <img src={Gray2Img} alt="Gray Two" />
          </LazyLoad>
          <Space height={30} />
          <Letter
            font="Titillium Web"
            size={36}
            sizeMobileS={30}
            sizeMobileM={34}
            sizeTablet={66}
            sizeLaptop={45}
            sizeLaptopL={55}
            sizeDesktop={66}
            color={darkFont}
          >
            {bambooFabricTitle}
          </Letter>
        </FirstPart>
        {bambooFabricImage && (
          <SecondPart>
            <Img fluid={bambooFabricImage.fluid} alt="Panda" />
          </SecondPart>
        )}
        {bambooFabricIcon && (
          <CenterImage>
            <LazyLoad>
              <img src={bambooFabricIcon.url} alt="Comfy" />
            </LazyLoad>
          </CenterImage>
        )}
      </Container>
      <Space height={30} />
      <LetterContainer>
        <Letter
          font="Titillium Light"
          size={16}
          color={darkFont}
          dangerouslySetInnerHTML={{ __html: bambooFabricDescription || '' }}
        />
      </LetterContainer>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  @media ${device.laptop} {
    margin-top: 190px;
  }
`

const FirstPart = styled.div`
  width: 45%;
  padding-top: 35%;
  padding-left: 22px;
  line-height: 2em;
  @media ${device.mobileS} {
    & img {
      width: 100px;
    }
  }
  @media ${device.mobileM} {
    & img {
      width: 110px;
    }
  }
  @media ${device.mobileL} {
    & img {
      width: 122px;
    }
  }
  @media ${device.tablet} {
    width: 40%;
    line-height: 3em;
    & img {
      width: 200px;
    }
  }
  @media ${device.laptop} {
    line-height: 2em;
    padding-top: 0%;
    padding-left: 7%;
    width: 60%;
    & img {
      width: 180px;
    }
  }
  @media ${device.laptopL} {
    padding-top: 0%;
    padding-left: 7%;
    width: 50%;
    & img {
      width: 220px;
    }
  }
  @media ${device.desktop} {
    padding-top: 0%;
    padding-left: 7%;
    & img {
      width: 290px;
    }
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 0px;
    top: 100px;
    width: 45%;
  }
  @media ${device.tablet} {
    width: 46%;
  }
  @media ${device.laptop} {
    width: 34%;
    top: 0px;
  }
`

const CenterImage = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, 10px);
  width: 29%;
  & img {
    width: 100%;
  }
  @media ${device.tablet} {
    & img {
      width: 200px;
    }
  }
  @media ${device.laptop} {
    position: absolute;
    top: 0px;
    right: 34%;
    transform: translate(50%, -30%);
    width: 16%;
    & img {
      width: 78%;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 84%;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 100%;
    }
  }
`

const LetterContainer = styled.div`
  padding: 35px 32px 20px 22px;
  @media ${device.tablet} {
    & h3 {
      font-size: 27px;
    }
    & p {
      font-size: 22px;
    }
  }
  @media ${device.laptop} {
    width: 65%;
    padding-left: 7%;
    margin-top: -20px;
    & h3 {
      font-size: 25px;
    }
    & p {
      font-size: 22px;
      margin-top: 0px;
    }
  }
  @media ${device.laptopL} {
    width: 60%;
    padding-left: 7%;
    margin-top: -20px;
    & h3 {
      font-size: 34px;
    }
    & p {
      font-size: 28px;
      margin-top: 10px;
    }
  }
  @media ${device.desktop} {
    width: 56%;
    padding-left: 7%;
    margin-top: 40px;
    & h3 {
      font-size: 40px;
    }
    & p {
      font-size: 32px;
      margin-top: 30px;
    }
  }
`

const Space = styled.div`
  width: 100%;
  height: ${props => (props.height ? props.height : 100)}px;
`

export default SecondDiff
