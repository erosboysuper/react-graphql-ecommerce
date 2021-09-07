import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { btn_color, black_color1 } from '~/utils/colors'
import { device } from '~/utils/device'
import { Img, Cover } from '~/utils/styles'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import NumImage1 from '~/images/Assets/90.svg'
import NumImage2 from '~/images/Assets/Fast.svg'
import NumImage3 from '~/images/Assets/Free.svg'
import NumImage4 from '~/images/Assets/100.svg'

import SubTitle from '~/components/Common/SubTitle'
import ShipModal from '~/components/pages/products/ShipModal'

const Guarantee = ({
  guaranteeHeadline,
  guaranteeAnchorText,
  guaranteeAnchorLink,
}) => {
  const { locale } = useContext(StoreContext)
  const { shippingModal, setShippingModal } = useContext(ProductContext)
  const { guarantees_en, guarantees_de, guarantees_ch } =
    useStaticQuery(graphql`
      query {
        guarantees_en: allDatoCmsGuarantee(
          filter: { locale: { eq: "en" } }
          sort: { fields: position, order: ASC }
          limit: 4
        ) {
          edges {
            node {
              ...guarantees_commonFields
            }
          }
        }
        guarantees_de: allDatoCmsGuarantee(
          filter: { locale: { eq: "de" } }
          sort: { fields: position, order: ASC }
          limit: 4
        ) {
          edges {
            node {
              ...guarantees_commonFields
            }
          }
        }
        guarantees_ch: allDatoCmsGuarantee(
          filter: { locale: { eq: "en-CH" } }
          sort: { fields: position, order: ASC }
          limit: 4
        ) {
          edges {
            node {
              ...guarantees_commonFields
            }
          }
        }
      }
      fragment guarantees_commonFields on DatoCmsGuarantee {
        id
        title
        image {
          url
          fluid(forceBlurhash: true, maxWidth: 910) {
            aspectRatio
            src
            srcSet
            sizes
            width
            height
          }
        }
      }
    `)
  let guarantees = {}
  if (locale === 'en') {
    guarantees = guarantees_en
  } else if (locale === 'de') {
    guarantees = guarantees_de
  } else if (locale === 'en-CH') {
    guarantees = guarantees_ch
  }

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
      default:
        return null
    }
  }

  let _guarantees = []
  if (guarantees && guarantees.edges && guarantees.edges.length > 0) {
    guarantees.edges.forEach((x, index) => {
      if (!x.node.image) {
        return
      }

      if (index === 0)
        _guarantees.push(
          <Container1 key={x.node.id}>
            <Background>
              <LazyLoad>
                <Image src={renderImg(index + 1)} alt="BackgroundImg" />
              </LazyLoad>
            </Background>
            <ImageContainer left={5} width={60} leftDesktop={30}>
              <Title>
                <IconContainer>
                  <Img fluid={x.node.image.fluid} hideBottom={true} />
                </IconContainer>
              </Title>
            </ImageContainer>
            <LetterContainer
              left={5}
              width={80}
              widthDesktop={60}
              leftDesktop={30}
            >
              <Title1>
                <Letter
                  line={24}
                  size={20}
                  sizeMobileS={15}
                  sizeMobileM={18}
                  sizeMobileL={20}
                  sizeTablet={26}
                  sizeDesktop={30}
                  sizeLaptop={20}
                  sizeLaptopL={24}
                  color={black_color1}
                  lineDesktop={35}
                >
                  <Span font="Titillium Bold">{x.node.title}</Span>
                </Letter>
              </Title1>
              <br />
              <Title>
                <Letter
                  size={16}
                  sizeDesktop={20}
                  sizeLaptop={16}
                  line={20}
                  color={btn_color}
                  lineDesktop={30}
                >
                  <Span>{x.node.shortText}</Span>
                </Letter>
              </Title>
            </LetterContainer>
          </Container1>
        )
      if (index === 1)
        _guarantees.push(
          <Container2 key={x.node.id}>
            <Background2>
              <LazyLoad>
                <Image src={renderImg(index + 1)} alt="BackgroundImage" />
              </LazyLoad>
            </Background2>
            <ImageContainer1 left={5}>
              <Title>
                <IconContainer>
                  <Img fluid={x.node.image.fluid} hideBottom={true} />
                </IconContainer>
              </Title>
            </ImageContainer1>
            <LetterContainer2 left={45} leftDesktop={5} width={60}>
              <Title1>
                <Letter
                  line={24}
                  size={20}
                  sizeMobileS={15}
                  sizeMobileM={18}
                  sizeMobileL={20}
                  color={black_color1}
                  sizeTablet={26}
                  sizeDesktop={30}
                  sizeLaptop={20}
                  sizeLaptopL={24}
                  lineDesktop={35}
                >
                  <Span font="Titillium Bold">{x.node.title}</Span>
                </Letter>
              </Title1>
              <br />
              <Title>
                <Letter
                  size={16}
                  line={20}
                  color={btn_color}
                  sizeDesktop={20}
                  lineDesktop={30}
                >
                  <Span>{x.node.shortText}</Span>
                </Letter>
              </Title>
            </LetterContainer2>
          </Container2>
        )

      if (index === 2)
        _guarantees.push(
          <Container2 key={x.node.id}>
            <Background3>
              <LazyLoad>
                <Image src={renderImg(index + 1)} alt="BackgroundImage" />
              </LazyLoad>
            </Background3>
            <ImageContainer left={5}>
              <Title>
                <IconContainer>
                  <Img fluid={x.node.image.fluid} hideBottom={true} />
                </IconContainer>
              </Title>
            </ImageContainer>
            <LetterContainer3 left={10} width={75}>
              <Title1>
                <Letter
                  line={24}
                  size={20}
                  sizeMobileS={15}
                  sizeMobileM={18}
                  sizeMobileL={20}
                  sizeTablet={26}
                  color={black_color1}
                  sizeLaptopL={24}
                  sizeLaptop={20}
                  sizeDesktop={30}
                  lineDesktop={35}
                >
                  <Span font="Titillium Bold">{x.node.title}</Span>
                </Letter>
              </Title1>
              <br />
              <Title>
                <Letter
                  size={16}
                  line={20}
                  color={btn_color}
                  sizeDesktop={20}
                  lineDesktop={30}
                >
                  <Span>{x.node.shortText}</Span>
                </Letter>
              </Title>
            </LetterContainer3>
          </Container2>
        )

      if (index === 3)
        _guarantees.push(
          <Container3 key={x.node.id}>
            <Background4>
              <LazyLoad>
                <Image src={renderImg(index + 1)} alt="BackgroundImage" />
              </LazyLoad>
            </Background4>
            <ImageContainer1 left={(index + 1) % 2 === 0 ? 5 : 25}>
              <Title>
                <IconContainer>
                  <Img fluid={x.node.image.fluid} hideBottom={true} />
                </IconContainer>
              </Title>
            </ImageContainer1>
            <LetterContainer4 left={(index + 1) % 2 === 0 ? 27 : 43}>
              <Title1>
                <Letter
                  line={24}
                  size={20}
                  sizeMobileS={15}
                  sizeMobileM={18}
                  sizeMobileL={20}
                  sizeLaptopL={24}
                  sizeLaptop={20}
                  color={black_color1}
                  sizeTablet={26}
                  sizeDesktop={30}
                  lineDesktop={35}
                >
                  <Span font="Titillium Bold">{x.node.title}</Span>
                </Letter>
              </Title1>
              <br />
              <Title>
                <Letter
                  size={16}
                  line={20}
                  color={btn_color}
                  sizeDesktop={20}
                  lineDesktop={30}
                >
                  <Span>{x.node.shortText}</Span>
                </Letter>
              </Title>
            </LetterContainer4>
            <TitleContainer>
              <SubTitle
                title={guaranteeHeadline}
                subtitle={guaranteeAnchorText}
                link={guaranteeAnchorLink}
                cb={() => setShippingModal(true)}
              />
            </TitleContainer>
          </Container3>
        )
    })
  }

  return (
    <React.Fragment>
      <Container>
        <TitleMobile>
          <SubTitle
            title={guaranteeHeadline}
            subtitle={guaranteeAnchorText}
            link={guaranteeAnchorLink}
            cb={() => setShippingModal(true)}
          />
        </TitleMobile>
        <Space height={30} />
        <Contain>{_guarantees}</Contain>
      </Container>
      {shippingModal === true && (
        <React.Fragment>
          <ShipModal />
          <Cover
            background={0.5}
            index={10}
            onClick={() => setShippingModal(false)}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  margin-top: 0px;
  @media ${device.laptop} {
    margin-top: 200px;
  }
`

const Container1 = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 0px;
  height: 100px;
  background: #f2f2f7;
  margin-bottom: 10px;
  display: flex;
  @media ${device.tablet} {
    height: 130px;
  }
  @media ${device.laptop} {
    width: 20%;
    height: 450px;
    margin-right: 15px;
    display: block;
    padding-left: 7%;
  }
  @media ${device.laptopL} {
    height: 530px;
  }
  @media ${device.desktop} {
    height: 610px;
  }
`

const TitleContainer = styled.div`
  display: none;
  @media ${device.laptop} {
     {
      display: block;
      position: absolute;
      right: 50px;
      top: 27%;
    }
  }
  @media ${device.laptopL} {
     {
      display: block;
      position: absolute;
      right: 25%;
      top: 50%;
      transform: translate(10px, -50%);
    }
  }
`

const Container2 = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 0px;
  height: 100px;
  background: #f2f2f7;
  margin-bottom: 10px;
  display: flex;
  @media ${device.tablet} {
    height: 130px;
  }
  @media ${device.laptop} {
    display: block;
    width: 15%;
    height: 450px;
    margin-right: 15px;
  }
  @media ${device.laptopL} {
    height: 530px;
  }
  @media ${device.desktop} {
    height: 610px;
  }
`

const Container3 = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 0px;
  height: 100px;
  background: #f2f2f7;
  margin-bottom: 10px;
  display: flex;
  @media ${device.tablet} {
    height: 130px;
  }
  @media ${device.laptop} {
    display: block;
    width: 48%;
    height: 450px;
  }
  @media ${device.laptopL} {
    height: 530px;
  }
  @media ${device.desktop} {
    height: 610px;
  }
`

const Space = styled.div`
  width: 100%;
  height: ${props => props.height}px;
`

const Background = styled.div`
  width: 110px;
  position: absolute;
  bottom: -11px;
  right: 30px;
  @media ${device.mobileS} {
    width: 29%;
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
    width: 110px;
  }
  @media ${device.tablet} {
    right: 18%;
  }
  @media ${device.laptop} {
    right: 2%;
    width: 46%;
    left: auto;
    & img {
      height: 60px;
    }
  }
  @media ${device.laptopL} {
    right: 2%;
    left: auto;
    & img {
      height: 70px;
    }
  }
  @media ${device.desktop} {
    & img {
      height: 80px;
    }
  }
`

const Background2 = styled.div`
  width: 200px;
  position: absolute;
  bottom: -2px;
  left: 14px;
  @media ${device.mobileS} {
    width: 50%;
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
    width: 200px;
  }
  @media ${device.tablet} {
    left: 20%;
  }
  @media ${device.laptop} {
    width: 86%;
    right: 5%;
    left: auto;
    & img {
      height: 60px;
    }
  }
  @media ${device.laptopL} {
    right: 2%;
    left: auto;
    & img {
      height: 70px;
    }
  }
  @media ${device.desktop} {
    & img {
      height: 80px;
    }
  }
`

const Background3 = styled.div`
  width: 200px;
  position: absolute;
  bottom: -11px;
  right: 30px;
  @media ${device.mobileS} {
    width: 50%;
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
    width: 200px;
  }
  @media ${device.tablet} {
    right: 18%;
    bottom: -2px;
  }
  @media ${device.laptop} {
    right: 2%;
    left: auto;
    width: 86%;
    & img {
      height: 60px;
    }
  }
  @media ${device.laptopL} {
    right: 2%;
    left: auto;
    & img {
      height: 70px;
    }
  }
  @media ${device.desktop} {
    & img {
      height: 80px;
    }
  }
`

const Background4 = styled.div`
  width: 200px;
  position: absolute;
  bottom: -2px;
  left: 14px;
  @media ${device.mobileS} {
    width: 50%;
  }
  @media ${device.mobileM} {
  }
  @media ${device.mobileL} {
    width: 200px;
  }
  @media ${device.tablet} {
    left: 20%;
  }
  @media ${device.laptop} {
    left: 3%;
    width: 32%;
    bottom: -11px;
    & img {
      height: 60px;
    }
  }
  @media ${device.laptopL} {
    left: 3%;
    & img {
      height: 70px;
    }
  }
  @media ${device.desktop} {
    & img {
      height: 80px;
    }
  }
`

const Title = styled.div`{P}
  margin-left: 5px;
  margin-top: 2px;
  display: inline-block;
  @media ${device.laptop} {
    width: 90px;
    margin-left: 15px;
  }
  @media ${device.laptopL} {
    width: 115px;
  }
  @media ${device.desktop} {
    width: 140px;
    height: 130px;
    display: flex;
    align-items: center;
  }
`

const Title1 = styled.div`{P}
  margin-left: 5px;
  margin-top: 2px;
  display: inline-block;
  @media ${device.laptop} {
    width: 130px;
    height: 110px;
    display: flex;
    align-items: center;
  }
  @media ${device.laptopL} {
    width: 150px;
    height: 130px;
    display: flex;
    align-items: center;
  }
  @media ${device.desktop} {
    width: 180px;
    height: 130px;
    display: flex;
    align-items: center;
  }
`

const Letter = styled.div`
  display: flex;
  font-size: ${props => props.size}px;
  font-weight: bold;
  color: ${props => props.color};
  padding: 0px 12px 0px 3px;
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
  }
  @media ${device.laptop} {
    font-size: ${props => props.sizeLaptop}px;
    line-height: ${props => props.lineDesktop}px;
  }
  @media ${device.laptopL} {
    font-size: ${props => props.sizeLaptopL}px;
    line-height: ${props => props.lineDesktop}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop}px;
  }
`

const LetterContainer = styled.div`
  position: relative;
  height: 50%;
  margin-top: 10%;
  margin-left: ${props => props.left}%;
  width: ${props => props.width}%;
  @media ${device.mobileS} {
    margin-top: 12%;
  }
  @media ${device.mobileM} {
    margin-top: 10%;
  }
  @media ${device.mobileL} {
    margin-top: 10%;
  }
  @media ${device.tablet} {
    margin-top: 7%;
  }

  @media ${device.laptop} {
    position: relative;
    margin-top: -30px;
    margin-left: 0%;
    width: ${props => props.widthDesktop}%;
  }
  @media ${device.laptopL} {
    margin-top: 0%;
  }
`

const LetterContainer2 = styled.div`
  position: relative;
  height: 50%;
  margin-top: 10%;
  margin-left: ${props => props.left}%;
  width: ${props => props.width}%;
  @media ${device.mobileS} {
    margin-left: ${props => props.left - 7}%;
    margin-top: 12%;
  }
  @media ${device.mobileM} {
    margin-left: ${props => props.left - 6}%;
    margin-top: 10%;
  }
  @media ${device.mobileL} {
    margin-left: 40%;
    margin-top: 10%;
  }
  @media ${device.tablet} {
    margin-top: 7%;
  }

  @media ${device.laptop} {
    position: relative;
    margin-top: -30px;
    margin-left: ${props => props.leftDesktop}%;
    width: ${props => props.widthDesktop}%;
  }
  @media ${device.laptopL} {
    margin-top: 0%;
  }
`

const LetterContainer3 = styled.div`
  position: relative;
  height: 50%;
  margin-top: 10%;
  width: 50%;
  width: ${props => props.width}%;
  margin-left: 5%;
  @media ${device.mobileS} {
    margin-top: 12%;
  }
  @media ${device.mobileM} {
    margin-top: 10%;
  }
  @media ${device.mobileL} {
    margin-top: 10%;
  }
  @media ${device.tablet} {
    margin-top: 7%;
  }

  @media ${device.laptop} {
    margin-top: -30px;
    position: relative;
    margin-left: 14px;
  }
  @media ${device.laptopL} {
    margin-top: 0px;
  }
`

const LetterContainer4 = styled.div`
  position: relative;
  height: 50%;
  margin-top: 9%;
  margin-left: 109px;
  @media ${device.mobileS} {
    margin-left: 21%;
    margin-top: 11%;
  }
  @media ${device.mobileM} {
    margin-left: 21%;
    margin-top: 9%;
  }
  @media ${device.mobileL} {
    margin-left: 22%;
  }
  @media ${device.tablet} {
    margin-top: 7%;
    margin-left: 33%;
  }
  @media ${device.laptop} {
    position: relative;
    margin-top: -30px;
    margin-left: 1.5%;
  }
  @media ${device.laptopL} {
    margin-top: 0%;
  }
`
const Contain = styled.div`
  @media ${device.laptop} {
    width: 100%;
    display: flex;
  }
`

const ImageContainer = styled.div`
  position: relative;
  height: 50%;
  margin-top: 5%;
  margin-left: ${props => props.left}%;

  @media ${device.tablet} {
    margin-top: 3%;
    margin-left: ${props => props.left + 14}%;
  }

  @media ${device.laptop} {
    & {
      position: relative;
      height: 35%;
      margin-top: 80px;
      margin-left: 0%;
      width: 100%;
    }
    & img {
      width: 160px;
    }
  }
  @media ${device.laptopL} {
    margin-top: 100px;
  }
  @media ${device.desktop} {
    margin-top: 120px;
  }
`

const ImageContainer1 = styled.div`
  position: absolute;
  height: 50%;
  top: 17%;
  right: 8%;
  @media ${device.tablet} {
    right: 19%;
  }
  @media ${device.laptop} {
    & {
      position: relative;
      height: 35%;
      margin-top: 80px;
      width: 100%;
      right: auto;
      top: 0%;
    }
    & img {
      width: 160px;
    }
  }
  @media ${device.laptopL} {
    margin-top: 100px;
  }
  @media ${device.desktop} {
    margin-top: 120px;
  }
`

const Image = styled.img`
  width: 100%;
`

const IconContainer = styled.div`
  width: 60px;
  @media ${device.tablet} {
    width: 80px;
  }
  @media ${device.laptop} {
    width: 100%;
  }
`

const Span = styled.span`
  font-family: ${props => props.font};
  margin-top: ${props => props.top};
`
const TitleMobile = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`

export default Guarantee
