import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import {
  Letter,
  Space,
  Img,
  MobileContain,
  DesktopContain,
} from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const ShareFeedback = ({
  ahaMomentImage,
  ahaMomentHeading,
  ahaMomentDescription,
  showFeedbackButton,
  feedbackButtonLink,
  feedbackButtonText,
}) => {
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  const anchorLink = reg.test(`${feedbackButtonLink}`)
    ? `${feedbackButtonLink}`
    : `/${localeFolder}${feedbackButtonLink}`
  return (
    <React.Fragment>
      <Space height={30} />
      <Container>
        {ahaMomentImage && (
          <ImageContainer>
            <Img fluid={ahaMomentImage.fluid} alt="Co Crreate" />
          </ImageContainer>
        )}
        <SecondPart>
          <HeadingContainer>
            <Letter
              font="Titillium Web"
              size={36}
              sizeMobileS={28}
              sizeMobileM={33}
              sizeMobileL={36}
              sizeTablet={56}
              sizeLaptop={44}
              sizeLaptopL={55}
              sizeDesktop={66}
              color={darkFont}
            >
              {ahaMomentHeading}
            </Letter>
          </HeadingContainer>
          <DesktopContain>
            <LetterContainer>
              <Letter
                font="Titillium Light"
                size={16}
                sizeDesktop={32}
                sizeLaptopL={27}
                sizeLaptop={22}
                color={darkFont}
                dangerouslySetInnerHTML={{ __html: ahaMomentDescription || '' }}
              />
              <Space height={10} />
            </LetterContainer>

            {showFeedbackButton && (
              <Link to={anchorLink}>
                <ButtonContainer>
                  <Button>
                    {feedbackButtonText} &nbsp;{' '}
                    <img src={ArrowImg} alt="Arrow" />
                  </Button>
                </ButtonContainer>
                <Shadow />
              </Link>
            )}
          </DesktopContain>
        </SecondPart>
      </Container>
      <MobileContain>
        <LetterContainer>
          <Space height={30} />
          <Letter
            font="Titillium Light"
            size={16}
            sizeTablet={25}
            color={darkFont}
            dangerouslySetInnerHTML={{ __html: ahaMomentDescription || '' }}
          />
          <Space height={10} />
        </LetterContainer>

        {showFeedbackButton && (
          <Link to={anchorLink}>
            <ButtonContainer>
              <Button>
                {feedbackButtonText} &nbsp; <img src={ArrowImg} alt="Arrow" />
              </Button>
            </ButtonContainer>
            <Shadow />
          </Link>
        )}
      </MobileContain>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
`

const ImageContainer = styled.div`
  & {
    width: 60%;
    position: relative;
  }
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    width: 34%;
  }
`
const HeadingContainer = styled.div`
  @media ${device.laptop} {
    width: 100%;
    text-align: end;
    margin-top: 80px;
    margin-bottom: 90px;
  }
`

const SecondPart = styled.div`
  & {
    position: absolute;
    right: 13px;
    bottom: -13px;
    background: white;
    line-height: 2em;
    padding: 11px;
    width: 50%;
  }
  & img {
    float: right;
  }
  @media ${device.tablet} {
    bottom: -2px;
    line-height: 3em;
  }
  @media ${device.laptop} {
    line-height: 2em;
    position: relative;
    width: 50%;
    margin-left: 9%;
    padding: unset;
    right: unset;
    bottom: unset;
  }
`

const LetterContainer = styled.div`
  padding: 10px 32px 10px 22px;
  @media ${device.laptop} {
    padding: 0px;
    line-height: 2em;
    & p {
      margin-top: 30px;
    }
  }
  @media ${device.laptopL} {
    line-height: 2.3em;
  }
  @media ${device.desktop} {
    line-height: 2.7em;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10px);
  @media ${device.laptop} {
    position: relative;
    margin-top: 60px;
    left: unset;
    transform: unset;
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
    transform: translate(7px, -63px);
    left: unset;
    position: relative;
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
    transform: translate(7px, -68px);
    left: unset;
    position: relative;
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(10px, -80px);
    left: unset;
    position: relative;
  }
`

const Button = styled.button`
  & {
    width: 210px;
    height: 60px;
    background: #202122;
    color: white;
    text-align: center;
    font-family: Titillium Bold;
  }
  & img {
    padding-top: 0px;
  }
  @media ${device.mobileS} {
    font-size: 14px;
    width: 180px;
    height: 50px;
  }
  @media ${device.mobileM} {
    width: 210px;
    font-size: 16px;
    height: 60px;
  }
  @media ${device.laptop} {
    width: 220px;
    height: 70px;
    align-items: center;
    display: flex;
    font-size: 16px;
    font-family: 'Titillium Bold';
    padding-left: 30px;
    & img {
      padding-top: 0px;
      padding-left: 10px;
      width: 20px;
    }
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 75px;
    font-size: 19px;
    & img {
      width: 24px;
    }
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    font-size: 22px;
    & img {
      width: 24px;
    }
  }
`

export default ShareFeedback
