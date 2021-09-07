import React, { useContext } from 'react'
import styled from 'styled-components'

import { useStaticQuery, graphql } from 'gatsby'

import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

const Header = () => {
  const { locale } = useContext(StoreContext)
  const { topBanner_en, topBanner_de, topBanner_ch } = useStaticQuery(graphql`
    query {
      topBanner_en: datoCmsHomePage(locale: { eq: "en" }) {
        ...commonFields
      }
      topBanner_de: datoCmsHomePage(locale: { eq: "de" }) {
        ...commonFields
      }
      topBanner_ch: datoCmsHomePage(locale: { eq: "en-CH" }) {
        ...commonFields
      }
    }
    fragment commonFields on DatoCmsHomePage {
      showTopPromotion
      promotionText
    }
  `)
  let topBanner = {}
  if (locale === 'en') {
    topBanner = topBanner_en
  } else if (locale === 'de') {
    topBanner = topBanner_de
  } else if (locale === 'en-CH') {
    topBanner = topBanner_ch
  }

  return topBanner.showTopPromotion || true ? (
    <TopAdvertise>
      <Container>{topBanner.promotionText}</Container>
    </TopAdvertise>
  ) : (
    <HiddenPart />
  )
}

const TopAdvertise = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  background: #ff8c00;
  min-height: 44px;
  > div {
    width: 100%;
    min-height: 21px;
    color: white;
    text-align: center;
    font-size: 14px;
  }
  @media ${device.laptop} {
    min-height: 40px;
    > div {
      font-size: 16px;
      min-height: 24px;
    }
  }
  @media ${device.laptopL} {
    > div {
      font-size: 18px;
      min-height: 27px;
    }
  }
`

const Container = styled.div`
  font-family: Titillium Bold;
  font-size: 18px;
  letter-spacing: 3px;
  @media ${device.mobileS} {
    letter-spacing: 1px;
  }
  @media ${device.mobileM} {
    letter-spacing: 3px;
  }
`

const HiddenPart = styled.div`
  width: 100%;
  background: transparent;
  height: 1px;
`

export default Header
