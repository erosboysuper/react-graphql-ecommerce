import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter, Img } from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import { DesktopContain } from '~/utils/styles'

import Gray2Img from '~/images/Assets/02 gray.svg'

const CommitmentTwo = ({
  section2Title,
  section2SubTitle,
  section2Description,
  section2Image,
}) => {
  return (
    <React.Fragment>
      <Space height={60} />
      <Container>
        {section2Image && (
          <LazyLoad>
            <SecondPart>
              {section2Image.fluid ? (
                <Img fluid={section2Image.fluid} alt="Section 2" />
              ) : (
                <img src={section2Image.url} alt="Section 2" />
              )}
            </SecondPart>
          </LazyLoad>
        )}
        <LazyLoad>
          <GrayImgTwo src={Gray2Img} alt="Gray Two" />
        </LazyLoad>
        <FirstPart>
          <LazyLoad>
            <DesktopContain>
              <img src={Gray2Img} alt="Gray Two" />
            </DesktopContain>
          </LazyLoad>
          <Space height={30} />
          <Letter
            font="Titillium Web"
            size={30}
            sizeMobileS={26}
            sizeMobileM={28}
            sizeMobileL={30}
            sizeTablet={40}
            sizeLaptop={45}
            sizeLaptopL={55}
            sizeDesktop={66}
            color={darkFont}
          >
            {section2Title}
          </Letter>
          <hr />
          <Letter
            font="Titillium Bold"
            sizeDesktop={40}
            sizeLaptopL={36}
            sizeLaptop={32}
            sizeMobileS={16}
            sizeMobileM={18}
            sizeMobileL={20}
            color="#FF8C00"
          >
            {section2SubTitle}
          </Letter>
          <hr />
          <Letter
            font="Titillium Light"
            sizeDesktop={32}
            sizeLaptopL={29}
            sizeLaptop={26}
            sizeMobileS={16}
            sizeMobileM={17}
            sizeMobileL={18}
            color="#202122"
            dangerouslySetInnerHTML={{ __html: section2Description || '' }}
          />
        </FirstPart>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  & hr {
    border: none;
  }
  @media ${device.laptop} {
  }
`

const FirstPart = styled.div`
  width: 100%;
  padding-top: 58%;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 1.3;
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
    width: 100%;
    padding-top: 62%;
    & img {
      width: 200px;
    }
  }
  @media ${device.laptop} {
    padding-top: 0%;
    padding-left: 7%;
    width: 45%;
    padding-top: 0%;
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
    & span {
      &:last-child {
        line-height: 1.6;
      }
    }
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 0px;
    top: 10px;
    width: 45%;
    padding-top: 0px;
    padding-bottom: 20px;
  }
  & img {
    width: 80%;
  }
  @media ${device.tablet} {
    width: 46%;
    padding-bottom: 0px;
    padding-top: 0px;
  }
  @media ${device.laptop} {
    width: 34%;
    top: 0px;
  }
`

const Space = styled.div`
  width: 100%;
  height: ${props => (props.height ? props.height : 100)}px;
`

const GrayImgTwo = styled.img`
  position: absolute;
  left: 10px;
  top: 118px;
  @media ${device.mobileM} {
    top: 174px;
  }
  @media ${device.tablet} {
    top: 348px;
    width: 200px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

export default CommitmentTwo
