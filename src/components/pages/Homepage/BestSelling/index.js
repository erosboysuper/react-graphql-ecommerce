import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import ProductSale from '~/components/Common/ProductSale'
import SubTitle from '~/components/Common/SubTitle'

const BestSelling = () => {
  const { locale } = useContext(StoreContext)
  let { usStoreRating, bestSelling_en, bestSelling_de, bestSelling_ch } =
    useStaticQuery(graphql`
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
  if (locale === 'en') {
    bestSelling = bestSelling_en
  } else if (locale === 'de') {
    bestSelling = bestSelling_de
  } else if (locale === 'en-CH') {
    bestSelling = bestSelling_ch
  }

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
              <ProductSale product={product} />
            </BestProduct>
          </ListItem>
        )
      })
    }
    return List
  }

  return bestSelling && bestSelling.showBestSelling ? (
    <Container>
      <TitlePosition>
        <SubTitle
          title={bestSelling.bestSellingHeadingText}
          subtitle={bestSelling.bestSellingAnchorText}
          link={bestSelling.bestSellingAnchorLink}
        />
      </TitlePosition>
      <Contain>
        <ThumbBox>
          <Ul className="items">{ProductList()}</Ul>
        </ThumbBox>
      </Contain>
    </Container>
  ) : (
    <HiddenPart />
  )
}

const TitlePosition = styled.div`
  @media ${device.laptop} {
    padding-left: 8%;
    display: flex;
    align-items: center;
    width: 30%;
  }
`

const Container = styled.div`
  @media ${device.laptop} {
    display: flex;
    margin-top: 25px;
  }
  @media ${device.laptopL} {
    margin-top: 40px;
  }
  @media ${device.desktop} {
    margin-top: 55px;
  }
`

const BestProduct = styled.div`
  width: 100%;
  margin-left: 0%;
  padding-bottom: 10px;
  min-height: 464px;
`

const Contain = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow: auto;
  @media ${device.laptop} {
    width: 70%;
    position: relative;
    overflow: auto;
  }
`

const ThumbBox = styled.div``

const Ul = styled.div`
  display: flex;
  width: auto;
  padding-left: 10px;
`

const ListItem = styled.div`
  display: inline-block;
  width: 190px;
  margin-right: 10px;
  -webkit-transition: all 500ms ease-in;
  -moz-transition: all 500ms ease-in;
  -o-transition: all 500ms ease-in;
  transition: all 500ms ease-in;
  @media ${device.mobileS} {
    width: 165px;
  }
  @media ${device.mobileM} {
    width: 190px;
  }
  @media ${device.tablet} {
    min-width: 240px;
  }
  @media ${device.laptop} {
    width: 20vw;
  }
`

const HiddenPart = styled.div`
  width: 100%;
  background: transparent;
  height: 1px;
`

export default BestSelling
