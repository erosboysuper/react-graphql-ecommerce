import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { Img } from '~/utils/styles'

const Buy2Get1OfferBanner = () => {
  const { locale } = useContext(StoreContext)
  const { buy2Get1Offer_en, buy2Get1Offer_de, buy2Get1Offer_ch } =
    useStaticQuery(graphql`
      query {
        buy2Get1Offer_en: datoCmsBuy2Get1FreeOffer(locale: { eq: "en" }) {
          ...buy2Get1Offer_commonFields
        }
        buy2Get1Offer_de: datoCmsBuy2Get1FreeOffer(locale: { eq: "de" }) {
          ...buy2Get1Offer_commonFields
        }
        buy2Get1Offer_ch: datoCmsBuy2Get1FreeOffer(locale: { eq: "en-CH" }) {
          ...buy2Get1Offer_commonFields
        }
      }
      fragment buy2Get1Offer_commonFields on DatoCmsBuy2Get1FreeOffer {
        isOfferActive
        showOnProductPage
        offerImage {
          url
          fluid(forceBlurhash: true) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
      }
    `)
  let buy2Get1Offer = {}
  if (locale === 'en') {
    buy2Get1Offer = buy2Get1Offer_en
  } else if (locale === 'de') {
    buy2Get1Offer = buy2Get1Offer_de
  } else if (locale === 'en-CH') {
    buy2Get1Offer = buy2Get1Offer_ch
  }

  return buy2Get1Offer &&
    buy2Get1Offer.isOfferActive &&
    buy2Get1Offer.showOnProductPage &&
    buy2Get1Offer.offerImage &&
    buy2Get1Offer.offerImage.fluid ? (
    <Container>
      <Img fluid={buy2Get1Offer.offerImage.fluid} />
    </Container>
  ) : (
    ``
  )
}

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 0 5%;
  position: relative;
  margin: 0 auto;
  @media ${device.laptop} {
    padding: 0px;
  }
`

export default Buy2Get1OfferBanner
