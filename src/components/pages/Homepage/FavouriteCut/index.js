import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { btn_color } from '~/utils/colors'
import { device } from '~/utils/device'
import { Img } from '~/utils/styles'

import SubTitle from '~/components/Common/SubTitle'

const FavouriteCut = ({
  favouriteCutHeading,
  favouriteCutAnchorText,
  favouriteCutAnchorLink,
}) => {
  const reg = /http(s):/
  const { locale, localeFolder } = useContext(StoreContext)
  const { favouriteCuts_en, favouriteCuts_de, favouriteCuts_ch } =
    useStaticQuery(graphql`
      query {
        favouriteCuts_en: allDatoCmsFavouriteCut(
          filter: { locale: { eq: "en" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...favouriteCuts_commonFields
            }
          }
        }
        favouriteCuts_de: allDatoCmsFavouriteCut(
          filter: { locale: { eq: "de" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...favouriteCuts_commonFields
            }
          }
        }
        favouriteCuts_ch: allDatoCmsFavouriteCut(
          filter: { locale: { eq: "en-CH" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...favouriteCuts_commonFields
            }
          }
        }
      }
      fragment favouriteCuts_commonFields on DatoCmsFavouriteCut {
        id
        name
        link
        cutImage {
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
  let favouriteCuts = {}
  if (locale === 'en') {
    favouriteCuts = favouriteCuts_en
  } else if (locale === 'de') {
    favouriteCuts = favouriteCuts_de
  } else if (locale === 'en-CH') {
    favouriteCuts = favouriteCuts_ch
  }

  let _favouriteCuts = []
  if (favouriteCuts && favouriteCuts.edges && favouriteCuts.edges.length > 0) {
    let cuts = []
    favouriteCuts.edges.forEach((x, index) => {
      if (x.node.cutImage) {
        const anchorLink = reg.test(`${x.node.link}`)
          ? `${x.node.link}`
          : `/${localeFolder}${x.node.link}`
        cuts.push(
          <Contain key={x.node.id}>
            <Link to={anchorLink}>
              <ImgContainer>
                <ImageContainer>
                  <Img fluid={x.node.cutImage.fluid} hideBottom={true} />
                </ImageContainer>
                <Shadow color={btn_color}>
                  <span>{x.node.name}</span>
                </Shadow>
              </ImgContainer>
            </Link>
          </Contain>
        )
        if ((index + 1) % 2 === 0 || index + 1 === favouriteCuts.edges.length) {
          _favouriteCuts.push(<Product key={x.node.id}>{cuts}</Product>)
          cuts = []
        }
      }
    })
  }

  return (
    <React.Fragment>
      <Container1>
        <ContainTitle>
          <SubTitle
            title={favouriteCutHeading}
            subtitle={favouriteCutAnchorText}
            link={favouriteCutAnchorLink}
            long={true}
          />
        </ContainTitle>
        <Container>{_favouriteCuts}</Container>
      </Container1>
    </React.Fragment>
  )
}

const ContainTitle = styled.div`
  @media ${device.laptop} {
    margin-top: 135px;
    display: flex;
    align-items: center;
    margin-top: 43px;
    width: 28%;
    padding-left: 2%;
  }
  @media ${device.laptopL} {
    padding-left: 8%;
    margin-top: 135px;
    display: flex;
    align-items: center;
    margin-top: 80px;
  }
  @media ${device.desktop} {
    padding-left: 8%;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 30px;
  @media ${device.laptop} {
    display: flex;
    width: 70%;
  }
`

const Container1 = styled.div`
  width: 100%;
  height: 100%;
  min-height: 439px;
  padding: 0;
  position: relative;
  margin-top: 30px;
  @media ${device.tablet} {
    min-height: unset;
    margin-top: 60px;
  }
  @media ${device.laptop} {
    & {
      display: flex;
      margin-top: 140px;
    }
  }
  @media ${device.laptopL} {
    & {
      display: flex;
      margin-top: 180px;
    }
  }
  @media ${device.desktop} {
    & {
      display: flex;
      margin-top: 240px;
    }
  }
`

const ImgContainer = styled.div`
  position: relative;
`

const Product = styled.div`
  width: 96%;
  display: flex;
  margin-left: 1.5%;
  margin-bottom: 24px;

  :last-child {
    margin-bottom: 0px;
  }
`

const ImageContainer = styled.div`
  left: 10%;
  width: 95%;
  z-index: 10;
  @media ${device.laptop} {
    width: 12.2vw;
    max-width: 250px;
  }
  @media ${device.laptopL} {
  }
`

const Contain = styled.div`
  position: relative;
  width: 42%;
  margin-left: 4%;
  margin-top: 30px;
  @media ${device.tablet} {
    width: 30%;
    margin-left: 13%;
  }
  @media ${device.laptop} {
    & {
      width: 42%;
      margin-left: 4%;
      max-width: 250px;
      margin-right: 37px;
    }
    & img {
      max-width: 234px;
    }
  }
  @media ${device.laptopL} {
     {
      max-width: 250px;
      margin-right: 45px;
    }
    & img {
      max-width: 234px;
    }
  }
  @media ${device.desktop} {
    margin-right: 75px;
  }
`

const Shadow = styled.div`
  & {
    width: 90%;
    height: 68%;
    position: absolute;
    bottom: -40px;
    left: 13%;
    background-color: ${props => props.color};
    z-index: -4;
    line-height: 14px;
  }
  & span {
    position: absolute;
    left: 50%;
    bottom: 12px;
    z-index: 5;
    font-family: Titillium Bold;
    font-size: 14px;
    color: white;
    transform: translate(-50%, 0px);
    width: 100px;
    text-align: center;
    text-transform: uppercase;
  }

  @media ${device.tablet} {
    & {
      bottom: -59px;
      left: 18%;
    }
    & span {
      line-height: 1em;
      font-size: 24px;
    }
  }

  @media only screen and ${device.laptop} {
    & {
      max-width: 204px;
      height: 70%;
      height: 68%;
      position: absolute;
      bottom: 0px;
      transform: translate(10px, 40%);
      left: 36px;
      width: 10.8vw;
    }
    & span {
      font-size: 12px;
      // width: 140px;
      bottom: 18px;
    }
  }

  @media only screen and ${device.laptopL} {
    & {
      height: 70%;
      position: absolute;
      bottom: 0px;
      transform: translate(10px, 36%);
      left: 40px;
    }
    & span {
      font-size: 16px;
      width: 140px;
      bottom: 18px;
    }
  }
  @media ${device.desktop} {
    & {
      height: 70%;
      position: absolute;
      bottom: 0px;
      transform: translate(10px, 36%);
      left: 40px;
    }
    & span {
      font-size: 20px;
      width: 140px;
      bottom: 18px;
    }
  }
`

export default FavouriteCut
