import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import NumImage1 from '~/images/Assets/DESKTOP-01.svg'
import NumImage2 from '~/images/Assets/DESKTOP-02.svg'
import NumImage3 from '~/images/Assets/DESKTOP-03.svg'
import NumImage4 from '~/images/Assets/DESKTOP-04.svg'
import NumImage5 from '~/images/Assets/DESKTOP-05.svg'
import NumImage6 from '~/images/Assets/DESKTOP-06.svg'
import NumImage7 from '~/images/Assets/DESKTOP-07.svg'
import NumImage8 from '~/images/Assets/DESKTOP-08.svg'

import { btn_color, black_color1, darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import { Img } from '~/utils/styles'

import SubTitle from '~/components/Common/SubTitle'

const TboDifference = ({ hideSubTitle, tboHighlightsContent }) => {
  const [tboHighlights, setTboHighlights] = useState([])

  const renderImg = index => {
    switch (index) {
      case 1:
        return NumImage1
      case 2:
        return NumImage2
      case 3:
        return NumImage3
      case 4:
        return NumImage4
      case 5:
        return NumImage5
      case 6:
        return NumImage6
      case 7:
        return NumImage7
      case 8:
        return NumImage8
      default:
        return null
    }
  }

  useEffect(() => {
    if (
      tboHighlightsContent &&
      tboHighlightsContent.tboDifference &&
      tboHighlightsContent.tboDifference.length > 0
    ) {
      const _tboHighlights = tboHighlightsContent.tboDifference.map(
        (x, index) => {
          if (!x.image) {
            return null
          }
          return (
            <Container2 key={x.id}>
              <Background2 position={index % 2 === 0 ? true : false}>
                <Image src={renderImg(index + 1)} alt="BackgroundImage" />
              </Background2>
              <ImageContainer left={index % 2 === 0 ? 30 : 0}>
                <Title>
                  <IconContainer>
                    {x.image.fluid ? (
                      <Img fluid={x.image.fluid} hideBottom={true} />
                    ) : (
                      <LazyLoad>
                        <img src={x.image.url} alt="Icon pic" />
                      </LazyLoad>
                    )}
                  </IconContainer>
                </Title>
              </ImageContainer>
              <LetterContainer1 left={5} width={87}>
                <Title1>
                  <Letter
                    line={24}
                    size={20}
                    sizeMobileS={17}
                    sizeMobileM={19}
                    sizeMobileL={20}
                    sizeTablet={24}
                    color={black_color1}
                    sizeDesktop={29}
                    sizeLaptopL={25}
                    sizeLaptop={17}
                    lineDesktop={35}
                  >
                    <Span font="Titillium Bold">{x.title}</Span>
                  </Letter>
                </Title1>
                <Title>
                  <Letter
                    size={16}
                    line={20}
                    sizeMobileS={12}
                    sizeMobileM={15}
                    sizeMobileL={16}
                    color={btn_color}
                    sizeDesktop={20}
                    sizeTablet={18}
                    sizeLaptop={12}
                    sizeLaptopL={17}
                    lineDesktop={30}
                  >
                    <Span>{x.shortText}</Span>
                  </Letter>
                </Title>
              </LetterContainer1>
              <WhiteBorder />
            </Container2>
          )
        }
      )
      setTboHighlights(_tboHighlights)
    }
  }, [])

  return tboHighlightsContent ? (
    <Container>
      <Space height={45} />
      {hideSubTitle ? (
        <div>
          <TitleOnly>{tboHighlightsContent.tboDifferenceHeading}</TitleOnly>
        </div>
      ) : (
        <MobileTitle>
          <SubTitle
            title={tboHighlightsContent.tboDifferenceHeading}
            subtitle={tboHighlightsContent.tboDifferenceAnchorText}
            link={tboHighlightsContent.tboDifferenceAnchorLink}
          />
        </MobileTitle>
      )}
      <Space height={30} />
      <Contain>
        <List>
          <ListContain width={tboHighlights.length}>
            {tboHighlights}
          </ListContain>
        </List>
        <TitleContainer>
          <SubTitle
            title={tboHighlightsContent.tboDifferenceHeading}
            subtitle={tboHighlightsContent.tboDifferenceAnchorText}
            link={tboHighlightsContent.tboDifferenceAnchorLink}
          />
        </TitleContainer>
      </Contain>
    </Container>
  ) : (
    <HiddenPart />
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  margin-top: 0px;
  overflow: hidden;
  @media ${device.laptop} {
    margin-top: 40px;
  }
`

const MobileTitle = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`

const TitleContainer = styled.div`
  display: none;
  @media ${device.laptop} {
     {
      display: block;
      position: absolute;
      top: 50%;
      right: 12%;
      transform: translate(0px, -50%);
    }
  }
`

const Container2 = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 0px;
  height: 160px;
  background: #f2f2f7;
  margin-bottom: 10px;
  display: flex;
  @media ${device.laptop} {
    display: block;
    width: 15vw;
    height: 410px;
    margin-right: 15px;
    margin-bottom: 0px;
  }
  @media ${device.laptopL} {
    height: 510px;
  }
  @media ${device.desktop} {
    height: 610px;
  }
`

const Contain = styled.div`
  @media ${device.laptop} {
    width: 100%;
    display: flex;
    background: #f2f2f7;
    padding-left: 6.5%;
    position: relative;
  }
`

const Space = styled.div`
  width: 100%;
  height: ${props => props.height}px;
`

const Background2 = styled.div`
  width: 110px;
  position: absolute;
  bottom: -11px;
  right: 14px;
  left: ${props => (props.position === true ? '14px' : 'unset')};
  @media ${device.tablet} {
    right: 16%;
    
  }
  @media ${device.laptop} {
    right: 2%;
    left: auto;
    
    width: 90px;
  }
  @media ${device.laptopL} {
    width: 110px;
  }
  @media ${device.desktop} {
    width: 140px;
`

const Title = styled.div`{P}
  margin-left: 16px;
  margin-top: 2px;
  display: inline-block;
  width: ${props => (props.width ? props.width : 70)}%; 
  @media ${device.mobileS} {
    width: ${props => (props.width ? props.width + 6 : 70)}%; 
    margin-left: 8px;
  }
  @media ${device.mobileM} {
    width: ${props => (props.width ? props.width + 4 : 70)}%; 
    margin-left: 10px;
  }
  @media ${device.mobileL} {
    width: ${props => (props.width ? props.width : 70)}%; 
    margin-left: 16px;
  }
  @media ${device.laptop} {
    width: 100%;
  }
`

const Title1 = styled.div`{P}
  margin-left: 16px;
  margin-top: 2px;
  display: flex;
  height: auto;
  padding-top: 0px;
  width: ${props => (props.width ? props.width : 70)}%;
  align-items: flex-end;
  @media ${device.mobileS} {
    width: ${props => (props.width ? props.width + 10 : 86)}%;
    margin-left: 8px;
  }
  @media ${device.mobileM} {
    width: ${props => (props.width ? props.width + 9 : 87)}%;
    margin-left: 10px;
  }
  @media ${device.mobileL} {
    width: ${props => (props.width ? props.width + 9 : 80)}%;
    margin-left: 16px;
  }
  @media ${device.laptop} {
    height: 134px;
    padding-top: 30px;
    width: 99%;
  }
`

const Letter = styled.div`
  display: flex;
  font-size: ${props => props.size}px;
  font-weight: bold;
  color: ${props => props.color};
  padding: 0px 0px 0px 3px;
  line-height: ${props => props.line}px;
  @media ${device.mobileS} {
    font-size: ${props =>
      props.sizeMobileS ? props.sizeMobileS : props.size}px;
  }
  @media ${device.mobileM} {
    font-size: ${props =>
      props.sizeMobileM ? props.sizeMobileM : props.size}px;
  }
  @media ${device.mobileL} {
    font-size: ${props =>
      props.sizeMobileL ? props.sizeMobileL : props.size}px;
  }
  @media ${device.tablet} {
    font-size: ${props => props.sizeTablet}px;
    line-height: 28px;
  }
  @media ${device.laptop} {
    font-size: ${props =>
      props.sizeLaptop ? props.sizeLaptop : props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop - 12}px;
  }
  @media ${device.laptopL} {
    font-size: ${props =>
      props.sizeLaptopL ? props.sizeLaptopL : props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop - 7}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop}px;
  }
`

const LetterContainer1 = styled.div`
  position: relative;
  height: 50%;
  margin-top: 10%;
  width: 50%;
  width: ${props => props.width}%;
  // margin-left: ${props => props.left}%;

  @media ${device.mobileL} {
    width: ${props => props.width}%;
    height: 100%;
    margin-top: 0%;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
  @media ${device.mobileM} {
    width: ${props => props.width}%;
  }
  @media ${device.mobileS} {
    width: ${props => props.width}%;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    height: 100%;
    margin-top: 0%;
    margin-left: 0%;
  }
  @media ${device.tablet} {
    width: 50%;
  }

  @media ${device.laptop} {
    position: relative;
    margin-left: 0px;
    margin-top: -85px;
    width: ${props => props.width}%;
    display: block;
    flex-wrap: unset;
    align-items: unset;
  }
  @media ${device.laptopL} {
    margin-top: -50px;
  }
  @media ${device.desktop} {
    margin-top: -25px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  height: 50%;
  margin-top: 10%;
  margin-left: ${props => props.left}%;
  @media ${device.mobileS} {
    margin-left: ${props => props.left - 2}%;
    margin-top: 0%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  @media ${device.mobileM} {
    margin-left: ${props => props.left - 2}%;
  }
  @media ${device.mobileL} {
    margin-left: ${props => props.left}%;
  }
  @media ${device.tablet} {
    margin-top: 0%;
    margin-left: ${props => props.left + 14}%;
  }

  @media ${device.laptop} {
    & {
      position: relative;
      height: 35%;
      margin-left: 0%;
      margin-top: 68px;
      width: 50%;
      display: block;
      align-items: unset;
    }
    & img {
      width: 160px;
    }
  }
`

const Image = styled.img`
  width: 100%;
`

const IconContainer = styled.div`
  width: 80px;
  & img {
    width: 80px;
    height: 80px;
  }
  @media ${device.laptop} {
    width: 100px;
    & img {
      width: 100px;
      height: 100px;
    }
  }
  @media ${device.laptopL} {
    width: 130px;
    & img {
      width: 130px;
      height: 130px;
    }
  }
  @media ${device.desktop} {
    width: 160px;
    & img {
      width: 160px;
      height: 160px;
    }
  }
`

const Span = styled.span`
  font-family: ${props => props.font};
  margin-top: ${props => props.top};
`
const TitleOnly = styled.div`
  text-align: center;
  font-family: Titillium Black;
  font-size: 22px;
  color: ${darkFont};
  @media ${device.tablet} {
    font-size: 34px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const HiddenPart = styled.div`
  width: 100%;
  background: transparent;
  height: 1px;
`

const List = styled.div`
  @media ${device.laptop} {
    display: block;
    width: 60%;
    overflow-x: auto;
    overflow-y: hidden;
  }
`

const ListContain = styled.div`
  @media ${device.laptop} {
    width: ${props => (props.width * 100) / 4 + 4}%;
    display: flex;
  }
`

const WhiteBorder = styled.div`
  @media ${device.laptop} {
    height: 100%;
    width: 9px;
    position: absolute;
    right: -15px;
    background: white;
    top: 0px;
  }
  @media ${device.laptopL} {
    width: 12px;
  }
  @media ${device.desktop} {
    width: 15px;
  }
`

export default TboDifference
