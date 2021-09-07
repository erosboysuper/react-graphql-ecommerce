import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { device } from '~/utils/device'
import OfferProductShow from '~/components/pages/landing/OfferProductShow'
import ProductDetailChoose from '~/components/pages/landing/ProductDetailChoose'
import CartPageModal from '~/components/pages/landing/CartPageModal'
import StoreContext from '~/context/StoreContext'
import ProductContext from '~/context/ProductContext'
import { Letter, MobileContain, DesktopContain } from '~/utils/styles'

const LimitedOfferModal = ({ promotionText }) => {
  const { locale } = useContext(StoreContext)
  const { limitedModalStep, setLimitedModalStep } = useContext(ProductContext)
  let {
    usStoreRating,
    bestSelling_en,
    bestSelling_de,
    bestSelling_ch,
  } = useStaticQuery(graphql`
    query {
      usStoreRating: datoCmsHomePage(locale: { eq: "en" }) {
        bestSellingCollection {
          products {
            handle
            productReviewGroup {
              products {
                variant {
                  sku
                }
              }
            }
          }
        }
      }
      bestSelling_en: datoCmsHomePage(
        locale: { eq: "en" }
        bestSellingCollection: {
          products: { elemMatch: { locale: { eq: "en" } } }
        }
      ) {
        ...bestSelling_commonFields
      }
      bestSelling_de: datoCmsHomePage(
        locale: { eq: "de" }
        bestSellingCollection: {
          products: { elemMatch: { locale: { eq: "de" } } }
        }
      ) {
        ...bestSelling_commonFields
      }
      bestSelling_ch: datoCmsHomePage(
        locale: { eq: "en-CH" }
        bestSellingCollection: {
          products: { elemMatch: { locale: { eq: "en-CH" } } }
        }
      ) {
        ...bestSelling_commonFields
      }
    }
    fragment bestSelling_commonFields on DatoCmsHomePage {
      showBestSelling
      bestSellingHeadingText
      bestSellingAnchorText
      bestSellingAnchorLink
      bestSellingCollection {
        id
        name
        products {
          id
          availableForSale
          handle
          name
          shopifyId
          isFadingOut
          isInFunding
          isTboCommunity
          isLimitedEdition
          isSingleProduct
          availabilityDate
          media {
            url
            fluid(
              forceBlurhash: true
              maxWidth: 910
              imgixParams: { w: "300" }
            ) {
              sizes
              aspectRatio
              src
              srcSet
              width
              height
            }
          }
          variant {
            id
            sku
            shopifyId
            availableForSale
            price
            compareAtPrice
            color {
              name
              colorCode {
                hex
              }
              colorImage {
                url
              }
            }
            size {
              name
              helpText
            }
            images {
              url
              fluid(
                forceBlurhash: true
                maxWidth: 910
                imgixParams: { w: "300" }
              ) {
                sizes
                aspectRatio
                src
                srcSet
                width
                height
              }
            }
          }
        }
      }
    }
  `)

  let bestSelling = {}

  bestSelling = bestSelling_en

  const ProductList = () => {
    const List = []
    if (bestSelling && bestSelling.bestSellingCollection) {
      bestSelling.bestSellingCollection.products.forEach(product => {
        const _findprod = usStoreRating.bestSellingCollection.products.find(
          x => x.handle === product.handle
        )
        product['productReviewGroup'] = _findprod.productReviewGroup || {}
        List.push(
          <ListItem key={product.id}>
            <BestProduct>
              <OfferProductShow product={product} />
            </BestProduct>
          </ListItem>
        )
      })
    }
    return List
  }

  return (
    <Container>
      <Header>Limited-Time-Offer</Header>
      {limitedModalStep === 1 && <Ul className="itemlist">{ProductList()}</Ul>}
      {limitedModalStep === 2 && (
        <ProductDetailChoose
          product={bestSelling.bestSellingCollection.products[1]}
        />
      )}
      {limitedModalStep === 3 && <CartPageModal />}
      {limitedModalStep === 2 && (
        <React.Fragment>
          <GetButton onClick={() => setLimitedModalStep(3)}>
            <Letter
              font="Titillium Bold"
              sizeDesktop={25}
              sizeLaptop={20}
              sizeMobileS={16}
              color="white"
            >
              GET IT NOW
            </Letter>
          </GetButton>
          <Shadow />
        </React.Fragment>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0%;
  bottom: 0%;
  background: white;
  width: 100%;
  height: 100%;

  padding-bottom: 120px;
  z-index: 15;

  overflow: auto;
  @media ${device.laptop} {
    position: fixed;
    left: 7%;
    bottom: 7%;
    background: white;
    width: 86%;
    height: 86%;

    padding-bottom: 120px;
    z-index: 15;

    overflow: auto;
  }
`

const Header = styled.div`
  background: #ff8c00;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100%;
`

const BestProduct = styled.div`
  height: 500px;
  position: relative;
  @media ${device.laptopL} {
    height: 650px;
  }
  @media ${device.desktop} {
    height: 740px;
  }
`

const ListItem = styled.div`
  width: 43%;
  margin: 2%;
  @media ${device.laptop} {
    width: 20%;
    margin: 2%;
  }
`

const Ul = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  margin-left: 16px;
`

const GetButton = styled.button`
  position: fixed;
  bottom: 0%;
  height: 50px;
  background: #ff8c00;
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 2;
  border: 0px solid #202122;

  @media ${device.mobileS} {
    height: 50px;
    width: 100%;
  }
  @media ${device.mobileM} {
    height: 50px;
  }
  @media ${device.mobileL} {
    height: 55px;
    width: 100%;
  }
  @media ${device.laptop} {
    letter-spacing: 2.5px;
    height: 55px;
    width: 20%;
    margin-top: 100px;
    bottom: 7%;
    transform: translate(-50%, 50%);
    border: 2px solid #202122;
  }
  @media ${device.laptopL} {
    height: 62px;
  }
  @media ${device.desktop} {
    height: 75px;
  }
`

const Shadow = styled.div`
  position: fixed;
  bottom: 7%;
  height: 86px;
  background: white;
  border: 2px solid #202122;
  width: 56.6%;
  left: 50%;
  background: #202122;
  transform: translate(-47.5%, 50%);
  @media ${device.mobileS} {
    width: 84%;
    height: 68px;
    display: none;
  }
  @media ${device.mobileM} {
    height: 76px;
  }
  @media ${device.mobileL} {
    height: 76px;
  }
  @media ${device.tablet} {
    transform: translate(-48.5%, 50%);
    width: 83.6%;
  }
  @media ${device.laptop} {
    width: 20%;
    height: 55px;
    transform: translate(-47%, 50%);
    bottom: 6%;
    display: block;
  }
  @media ${device.laptopL} {
    transform: translate(-48%, 50%);
    height: 62px;
    bottom: 6%;
  }
  @media ${device.desktop} {
    height: 75px;
    transform: translate(-47.5%, 51%);
  }
`

export default LimitedOfferModal
