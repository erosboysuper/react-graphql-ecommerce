import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import FundingMarketItem from '~/components/Common/FundingMarketItem'

const FundingItems = () => {
  const { locale } = useContext(StoreContext)
  const { fundingItems_en, fundingItems_de, fundingItems_ch } =
    useStaticQuery(graphql`
      query {
        fundingItems_en: allDatoCmsProduct(
          filter: { isPublished: { eq: true }, locale: { eq: "en" } }
          sort: { fields: name, order: ASC }
          limit: 8
        ) {
          totalCount
          edges {
            node {
              ...fundingItems_commonFields
            }
          }
        }
        fundingItems_de: allDatoCmsProduct(
          filter: { isPublished: { eq: true }, locale: { eq: "de" } }
          sort: { fields: name, order: ASC }
          limit: 5
        ) {
          totalCount
          edges {
            node {
              ...fundingItems_commonFields
            }
          }
        }
        fundingItems_ch: allDatoCmsProduct(
          filter: { isPublished: { eq: true }, locale: { eq: "en-CH" } }
          sort: { fields: name, order: ASC }
          limit: 5
        ) {
          totalCount
          edges {
            node {
              ...fundingItems_commonFields
            }
          }
        }
      }
      fragment fundingItems_commonFields on DatoCmsProduct {
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
  let fundingItems = {}
  if (locale === 'en') {
    fundingItems = fundingItems_en
  } else if (locale === 'de') {
    fundingItems = fundingItems_de
  } else if (locale === 'en-CH') {
    fundingItems = fundingItems_ch
  }

  return (
    <div>
      <Contain>
        {fundingItems.edges ? (
          fundingItems.edges.map(
            ({ node: { id, name, handle, media, variant } }, index) => {
              if (media.length > 0) {
                return (
                  <BestProduct key={id}>
                    <FundingMarketItem
                      product={{
                        id,
                        name,
                        handle,
                        media,
                        variants: variant,
                      }}
                      position="vertical"
                    />
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
  width: 45%;
  margin-left: 10px;
  margin-bottom: 40px;
  @media ${device.laptop} {
    width: 23%;
    margin-left: 16px;
  }
  @media ${device.laptopL} {
    width: 23%;
    margin-left: 22px;
  }
  @media ${device.desktop} {
    width: 24%;
    margin-left: 16px;
  }
`

const Contain = styled.div`
  display: flex;
  padding-top: 40px;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 6px;
  overflow: hidden;
  @media ${device.laptop} {
    padding-bottom: 50px;
    justify-content: flex-start;
    padding: 0px 7% 50px 7%;
  }
`

export default FundingItems
