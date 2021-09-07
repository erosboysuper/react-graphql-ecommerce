import { gql } from '@apollo/client'

export const SEARCH_STAGING = gql`
  query ($filters: DatoCmsVariantFilterInput) {
    allDatoCmsVariant(filter: $filters) {
      nodes {
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
          url(imgixParams: { w: "400" })
        }
      }
    }
  }
`

export const SEARCH_LIVE = gql`
  query ($lang: SiteLocale, $filters: VariantModelFilter) {
    allVariants(locale: $lang, filter: $filters) {
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
        url(imgixParams: { w: "400" })
      }
    }
  }
`
