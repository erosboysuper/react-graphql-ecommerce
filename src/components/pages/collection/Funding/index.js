import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import FundingItem from '~/components/Common/FundingItem'

const Funding = () => {
  const { locale } = useContext(StoreContext)
  const { fundingProducts_en, fundingProducts_de, fundingProducts_ch } =
    useStaticQuery(graphql`
      query {
        fundingProducts_en: allDatoCmsProduct(
          filter: { isPublished: { eq: true }, locale: { eq: "en" } }
          sort: { fields: name, order: ASC }
          limit: 5
        ) {
          edges {
            node {
              ...fundingProducts_commonFields
            }
          }
        }
        fundingProducts_de: allDatoCmsProduct(
          filter: { isPublished: { eq: true }, locale: { eq: "de" } }
          sort: { fields: name, order: ASC }
          limit: 5
        ) {
          edges {
            node {
              ...fundingProducts_commonFields
            }
          }
        }
        fundingProducts_ch: allDatoCmsProduct(
          filter: { isPublished: { eq: true }, locale: { eq: "en-CH" } }
          sort: { fields: name, order: ASC }
          limit: 5
        ) {
          edges {
            node {
              ...fundingProducts_commonFields
            }
          }
        }
      }
      fragment fundingProducts_commonFields on DatoCmsProduct {
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
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "300" }) {
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
    `)
  let fundingProducts = {}
  if (locale === 'en') {
    fundingProducts = fundingProducts_en
  } else if (locale === 'de') {
    fundingProducts = fundingProducts_de
  } else if (locale === 'en-CH') {
    fundingProducts = fundingProducts_ch
  }

  return (
    <div>
      <Contain>
        {fundingProducts.edges ? (
          fundingProducts.edges.map(
            ({ node: { id, name, handle, media, variant } }, index) => {
              if (media.length > 0 && index === 1) {
                return (
                  <BestProduct key={id}>
                    <FundingItem
                      product={{
                        id,
                        name,
                        handle,
                        media,
                        variants: variant,
                      }}
                    ></FundingItem>
                  </BestProduct>
                )
              } else {
                return null
              }
            }
          )
        ) : (
          <p>No Record Found!</p>
        )}
      </Contain>
    </div>
  )
}

const BestProduct = styled.div`
  width: 92%;
  margin-left: 4%;
  @media ${device.laptop} {
  }
`

const Contain = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media ${device.laptop} {
    padding-bottom: 50px;
  }
`

export default Funding
