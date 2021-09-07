import React, { useContext } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'

const TboDiff = ({
  highlightTitle,
  highlightImage,
  highlights,
  buttonText,
  tboNumbers,
}) => {
  const { setModal } = useContext(StoreContext)

  return (
    <Container>
      <TboDiffDiv>
        <Title>
          <Letter
            font="Titillium Black"
            sizeDesktop={42}
            sizeLaptopL={38}
            sizeLaptop={30}
            sizeMobileS={23}
            sizeMobileM={26}
            sizeMobileL={26}
            color="#202122"
          >
            {highlightTitle}
          </Letter>
        </Title>
        <Content>
          <PrevPart>
            {highlights.map((item, index) => {
              if (index >= 3) return
              return (
                <Item key={item.id} left={index}>
                  <LetterPart>
                    <div>
                      <Letter
                        font="Titillium Bold"
                        sizeDesktop={30}
                        sizeLaptopL={25}
                        sizeLaptop={17}
                        sizeTablet={16}
                        sizeMobileS={16}
                        sizeMobileM={18}
                        sizeMobileL={20}
                        color="#FF8C00"
                      >
                        {item.title}
                      </Letter>
                    </div>
                    <Letter
                      font="Titillium Light"
                      sizeDesktop={26}
                      sizeLaptopL={22}
                      sizeLaptop={16}
                      sizeTablet={14}
                      sizeMobileS={14}
                      sizeMobileM={16}
                      sizeMobileL={18}
                      color="#202122"
                    >
                      {item.shortText}
                    </Letter>
                  </LetterPart>
                  <ImagePart>
                    <Image
                      fluid={tboNumbers.edges[index].node.childImageSharp.fluid}
                      alt="background"
                    />
                  </ImagePart>
                </Item>
              )
            })}
          </PrevPart>
          <CenterImage>
            <CenterImageDiv>
              <Image fluid={highlightImage.fluid} />
            </CenterImageDiv>
          </CenterImage>
          <NextPart>
            {highlights.map((item, index) => {
              if (index < 3) return
              return (
                <Item key={item.id} left={3 - index}>
                  <ImagePart1>
                    <Image
                      fluid={tboNumbers.edges[index].node.childImageSharp.fluid}
                      alt="background"
                    />
                  </ImagePart1>
                  <LetterPart1>
                    <div>
                      <Letter
                        font="Titillium Bold"
                        sizeDesktop={30}
                        sizeLaptopL={25}
                        sizeLaptop={17}
                        sizeTablet={16}
                        sizeMobileS={16}
                        sizeMobileM={18}
                        sizeMobileL={20}
                        color="#FF8C00"
                      >
                        {item.title}
                      </Letter>
                    </div>
                    <Letter
                      font="Titillium Light"
                      sizeDesktop={26}
                      sizeLaptopL={22}
                      sizeLaptop={16}
                      sizeTablet={14}
                      sizeMobileS={14}
                      sizeMobileM={16}
                      sizeMobileL={18}
                      color="#202122"
                    >
                      {item.shortText}
                    </Letter>
                  </LetterPart1>
                </Item>
              )
            })}
          </NextPart>
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
        </Content>
      </TboDiffDiv>
    </Container>
  )
}

const Container = styled.div`
  min-height: 650px;
  @media ${device.laptop} {
    min-height: 423px;
  }
`

const TboDiffDiv = styled.div``

const Title = styled.div`
  margin-top: 100px;
  text-align: center;
  @media ${device.mobileS} {
    margin-top: 70px;
    width: 70%;
    margin-left: 15%;
  }
  @media ${device.laptop} {
    margin-top: 100px;
    width: unset;
    margin-left: unset;
  }
`

const Content = styled.div`
  display: flex;
  position: relative;
  @media ${device.mobileS} {
    display: block;
    overflow: hidden;
  }
  @media ${device.tablet} {
    display: flex;
    overflow: unset;
  }
`

const PrevPart = styled.div`
  width: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: 8%;
  margin-top: 69px;
  @media ${device.mobileS} {
    margin-top: 37px;
    width: 71%;
    margin-left: 40%;
  }
  @media ${device.mobileM} {
    margin-left: 36%;
  }
  @media ${device.mobileL} {
    margin-left: 35%;
  }
  @media ${device.tablet} {
    width: 32%;
    margin-left: 4%;
    margin-top: 69px;
  }
  @media ${device.laptop} {
    width: 30%;
    margin-left: 8%;
    margin-top: 69px;
  }
`

const LetterPart = styled.div`
  display: grid;
  text-align: end;
  @media ${device.mobileS} {
    display: inline;
    order: 2;
    text-align: start;
    margin-left: 10px;
  }
  @media ${device.mobileM} {
    margin-left: 15px;
  }
  @media ${device.laptop} {
    display: grid;
    order: unset;
    text-align: end;
    margin-left: unset;
  }
`

const LetterPart1 = styled.div`
  display: grid;
  text-align: start;
  @media ${device.mobileS} {
    text-align: start;
    display: inline;
  }
  @media ${device.laptop} {
    text-align: start;
    display: grid;
  }
`

const ImagePart = styled.div`
  margin-left: 40px;
  width: 70px;
  @media ${device.mobileS} {
    margin-left: 20px;
    & . gatsby-image-wrapper {
      width: 70px;
    }
  }
  @media ${device.tablet} {
    & .gatsby-image-wrapper {
      width: 60px;
    }
  }
  @media ${device.laptop} {
    margin-left: 20px;
    & .gatsby-image-wrapper {
      width: 90px;
    }
  }
  @media ${device.laptopL} {
    margin-left: 30px;
    & .gatsby-image-wrapper {
      width: 100px;
    }
  }
  @media ${device.desktop} {
    margin-left: 40px;
    & .gatsby-image-wrapper {
      width: 114px;
    }
  }
`

const ImagePart1 = styled.div`
  margin-right: 40px;
  width: 70px;

  @media ${device.mobileS} {
    margin-left: 20px;
    margin-right: 10px;
    & .gatsby-image-wrapper {
      width: 70px;
    }
  }
  @media ${device.mobileM} {
    margin-right: 15px;
  }
  @media ${device.tablet} {
    & .gatsby-image-wrapper {
      width: 60px;
    }
  }
  @media ${device.laptop} {
    margin-left: 20px;
    margin-right: 40px;
    & .gatsby-image-wrapper {
      width: 90px;
    }
  }
  @media ${device.laptopL} {
    margin-left: 30px;
    & .gatsby-image-wrapper {
      width: 100px;
    }
  }
  @media ${device.desktop} {
    margin-left: 40px;
    & .gatsby-image-wrapper {
      width: 114px;
    }
  }
`

const Item = styled.div`
  display: flex;
  margin-bottom: 57px;
  height: 85px;
  @media ${device.mobileS} {
    margin-bottom: 24px;
    height: unset;
    transform: translate(${props => (props.left - 3) * 30}px, 0px);
  }
  @media ${device.tablet} {
    margin-bottom: 20px;
    height: 85px;
    transform: translate(
      ${props =>
        props.left === 1 || props.left === -1 ? props.left * -30 : 0}px,
      0px
    );
  }
  @media ${device.laptopL} {
    margin-bottom: 30px;
  }
  @media ${device.desktop} {
    margin-bottom: 57px;
  }
`

const CenterImage = styled.div`
  width: 21%;
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
  margin-top: 80px;
  @media ${device.mobileS} {
    margin-top: 0px;
  }
  @media ${device.tablet} {
    margin-top: 80px;
  }
`

const CenterImageDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  & img {
    width: 80%;
  }
  @media ${device.mobileS} {
    width: 61%;
    margin: 0px;
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  @media ${device.mobileM} {
    width: 63%;
  }
  @media ${device.mobileL} {
    width: 65%;
  }
  @media ${device.tablet} {
    position: relative;
    left: unset;
    top: unset;
    width: 90%;
    margin-left: 5%;
    margin-right: 30px;
    margin-top: 46px;
    transform: unset;
  }
  @media ${device.laptop} {
    position: relative;
    left: unset;
    top: unset;
    width: 80%;
    margin-left: 10%;
    margin-right: 30px;
    margin-top: 8px;
    transform: unset;
  }
`

const NextPart = styled.div`
  width: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 0px;
  margin-top: 69px;
  @media ${device.mobileS} {
    width: 71%;
    margin-top: 0px;
    margin-left: 59%;
  }
  @media ${device.mobileM} {
    margin-left: 52%;
  }
  @media ${device.mobileL} {
    margin-left: 50%;
  }
  @media ${device.tablet} {
    width: 32%;
    margin-left: 0px;
    margin-top: 69px;
  }
  @media ${device.laptop} {
    width: 30%;
    margin-left: 0px;
    margin-top: 69px;
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
    display: flex;
    height: 64px;
  }
  @media ${device.laptopL} {
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

const Shadow = styled.div`
  background: white;
  height: 86px;
  border: 2px solid black;
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
  @media ${device.laptop} {
    display: flex;
    height: 64px;
    transform: translate(-47%, 0px);
  }
  @media ${device.laptopL} {
    transform: translate(-48%, 0px);
    height: 70px;
  }
  @media ${device.desktop} {
    height: 86px;
  }
`

export default TboDiff
