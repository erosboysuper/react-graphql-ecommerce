import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'

import ProductSale from '~/components/Common/ProductSale'
import SubTitle from '~/components/Common/SubTitle'

const MoreLike = ({ hideSubTitle }) => {
  const { locale } = useContext(StoreContext)
  const { usStoreRating, moreLikes_en, moreLikes_de, moreLikes_ch } =
    useStaticQuery(graphql`
      query {
        usStoreRating: datoCmsHomePage(locale: { eq: "en" }) {
          recommendationCollection {
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
        moreLikes_en: datoCmsHomePage(locale: { eq: "en" }) {
          ...moreLikes_commonFields
        }
        moreLikes_de: datoCmsHomePage(locale: { eq: "de" }) {
          ...moreLikes_commonFields
        }
        moreLikes_ch: datoCmsHomePage(locale: { eq: "en-CH" }) {
          ...moreLikes_commonFields
        }
      }
      fragment moreLikes_commonFields on DatoCmsHomePage {
        showRecommendationSection
        recommendationHeading
        recommendationAnchorText
        recommendationAnchorLink
        recommendationCollection {
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

  let moreLikes = {}
  if (locale === 'en') {
    moreLikes = moreLikes_en
  } else if (locale === 'de') {
    moreLikes = moreLikes_de
  } else if (locale === 'en-CH') {
    moreLikes = moreLikes_ch
  }

  const ProductList = () => {
    const List = []
    if (moreLikes && moreLikes.recommendationCollection) {
      moreLikes.recommendationCollection.products.forEach(product => {
        const _findprod = usStoreRating.recommendationCollection.products.find(
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

  return moreLikes && moreLikes.showRecommendationSection ? (
    <Container>
      {hideSubTitle ? (
        <TitleOnly>{moreLikes.recommendationHeading}</TitleOnly>
      ) : (
        <TitleContainer>
          <SubTitle
            title={moreLikes.recommendationHeading}
            subtitle={moreLikes.recommendationAnchorText}
            link={moreLikes.recommendationAnchorLink}
          />
        </TitleContainer>
      )}
      <Contain>
        <ThumbBox>
          <Ul className="itemlist">{ProductList()}</Ul>
        </ThumbBox>
      </Contain>
    </Container>
  ) : (
    <HiddenPart />
  )
}

const TitleContainer = styled.div`
  @media ${device.laptop} {
    padding-left: 8%;
    width: 30%;
    display: flex;
    align-items: center;
  }
`

const Container = styled.div`
  min-height: 470px;
  @media ${device.laptop} {
    display: flex;
    margin-top: 150px;
  }
`

const BestProduct = styled.div`
  width: 100%;
  margin-left: 0%;
  padding-bottom: 10px;
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

const TitleOnly = styled.div`
  text-align: center;
  font-family: Titillium Black;
  font-size: 22px;
  color: ${darkFont};
  margin-bottom: 20px;
`

const HiddenPart = styled.div`
  width: 100%;
  background: transparent;
  height: 1px;
`

export default MoreLike
