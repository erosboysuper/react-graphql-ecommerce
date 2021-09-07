import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import { darkFont } from '~/utils/colors'
import { Letter, MobileContain } from '~/utils/styles'
import { device } from '~/utils/device'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const ShippingInfo = ({ guaranteeHeading, guaranteeAnchorText }) => {
  const { locale } = useContext(StoreContext)
  const { setShippingModal, setModal } = useContext(ProductContext)
  const { guarantees_en, guarantees_de, guarantees_ch } =
    useStaticQuery(graphql`
      query {
        guarantees_en: allDatoCmsGuarantee(
          filter: { locale: { eq: "en" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...shippingGuarantees_commonFields
            }
          }
        }
        guarantees_de: allDatoCmsGuarantee(
          filter: { locale: { eq: "de" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...shippingGuarantees_commonFields
            }
          }
        }
        guarantees_ch: allDatoCmsGuarantee(
          filter: { locale: { eq: "en-CH" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...shippingGuarantees_commonFields
            }
          }
        }
      }
      fragment shippingGuarantees_commonFields on DatoCmsGuarantee {
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

  return (
    <React.Fragment>
      <Div>
        <TotalContainer>
          <BannerBar>
            <Letter
              font="Titillium SemiBold"
              size={14}
              sizeTablet={18}
              color="white"
            >
              {guaranteeHeading}
            </Letter>
          </BannerBar>
          <Container>
            {guarantees.edges &&
              guarantees.edges.map((x, index) => {
                if (index > 2) {
                  return (
                    <MobileContain key={x.node.id}>
                      <Contain>
                        <LazyLoad>
                          <Icon src={x.node.image.url} alt="Icon" />
                        </LazyLoad>
                        <LetterContainer>
                          <Letter
                            font="Titillium Bold"
                            size={16}
                            sizeLaptop={14}
                            sizeLaptopL={17}
                            sizeDesktop={20}
                            color={darkFont}
                          >
                            {x.node.title}
                          </Letter>
                        </LetterContainer>
                      </Contain>
                    </MobileContain>
                  )
                } else {
                  return (
                    <Contain key={x.node.id}>
                      <LazyLoad>
                        <Icon src={x.node.image.url} alt="Icon" />
                      </LazyLoad>
                      <LetterContainer border={index === 2 ? 0 : 1}>
                        <Letter
                          font="Titillium Bold"
                          size={16}
                          sizeTablet={20}
                          sizeLaptop={14}
                          sizeLaptopL={17}
                          sizeDesktop={20}
                          color={darkFont}
                        >
                          {x.node.title}
                        </Letter>
                      </LetterContainer>
                    </Contain>
                  )
                }
              })}
          </Container>
        </TotalContainer>
        <Label>
          <Letter
            font="Titillium Web"
            size={14}
            sizeLaptop={14}
            sizeLaptopL={16}
            sizeDesktop={18}
            color="#FF8C00"
            onClick={() => {
              setShippingModal(true)
              setModal(true)
            }}
          >
            {guaranteeAnchorText} &nbsp; &nbsp;
            <img src={ArrowImg} alt="Arrow Image" />{' '}
          </Letter>
        </Label>
      </Div>
    </React.Fragment>
  )
}

const Div = styled.div`
  @media ${device.laptop} {
    margin-left: 10%;
  }
  @media ${device.laptopL} {
    margin-left: 8%;
  }
  @media ${device.desktop} {
    margin-left: 12%;
  }
`

const Container = styled.div`
  background: #f2f2f7;
  padding: 10px;
  padding-top: 30px;
  @media ${device.laptop} {
    display: flex;
    width: 100%;
    padding-top: 20px;
  }
  @media ${device.laptopL} {
    padding-top: 25px;
  }
  @media ${device.desktop} {
    padding-top: 30px;
  }
`

const Contain = styled.div`
  & {
    display: flex;
    margin-bottom: 10px;
  }
  & img {
    margin-left: 15px;
    margin-right: 20px;
  }
  @media ${device.laptop} {
    align-items: center;
    width: 33%;
    padding-left: 0%;
    & img {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  @media ${device.laptopL} {
    align-items: center;
    width: 33%;
    padding-left: 3%;
    & img {
      margin-left: 15px;
      margin-right: 20px;
    }
  }
`

const LetterContainer = styled.div`
  width: 80%;
  border-bottom: 1px solid ${darkFont};
  padding-top: 5px;
  @media ${device.laptop} {
    border-bottom: none;
    border-right: ${props => props.border}px solid ${darkFont};
    padding-right: 10px;
    height: 55px;
    padding-top: 0px;
    display: flex;
    align-items: center;
  }
  @media ${device.laptopL} {
    height: auto;
    min-height: 50px;
  }
  @media ${device.desktop} {
    min-height: 60px;
  }
`

const BannerBar = styled.div`
  background: #ff8c00;
  top: 0px;
  position: absolute;
  left: 50%;
  width: 90%;
  text-align: center;
  padding: 7px;
  transform: translate(-50%, -50%);
  @media ${device.laptop} {
    display: none;
  }
`

const TotalContainer = styled.div`
  position: relative;
  @media ${device.laptop} {
    display: flex;
  }
`

const Label = styled.div`
  float: right;
  margin-right: 18px;
  margin-top: 10px;
  cursor: pointer;
`

const Icon = styled.img`
  height: 40px;
  @media ${device.tablet} {
    height: 50px;
  }
  @media ${device.laptop} {
    height: 40px;
  }
  @media ${device.laptopL} {
    height: 50px;
  }
`

export default ShippingInfo
