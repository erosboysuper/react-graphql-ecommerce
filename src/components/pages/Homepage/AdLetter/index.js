import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { Img } from '~/utils/styles'
import { device } from '~/utils/device'

const AdLetter = () => {
  const { locale } = useContext(StoreContext)
  const { companyLogos_en, companyLogos_de, companyLogos_ch } =
    useStaticQuery(graphql`
      query {
        companyLogos_en: allDatoCmsCompanyLogo(
          filter: { locale: { eq: "en" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...companyLogos_commonFields
            }
          }
        }
        companyLogos_de: allDatoCmsCompanyLogo(
          filter: { locale: { eq: "de" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...companyLogos_commonFields
            }
          }
        }
        companyLogos_ch: allDatoCmsCompanyLogo(
          filter: { locale: { eq: "en-CH" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...companyLogos_commonFields
            }
          }
        }
      }
      fragment companyLogos_commonFields on DatoCmsCompanyLogo {
        id
        name
        companyLink
        logoImage {
          url
          fluid(
            forceBlurhash: false
            imgixParams: { w: "380" }
            sizes: "(max-width: 400px) 60px,(max-width: 768px)  60px,(max-width: 1366px) 380px,(max-width: 1920px) 380px, 1920px"
          ) {
            ...GatsbyDatoCmsFluid_tracedSVG
          }
        }
      }
    `)
  let companyLogos = {}
  if (locale === 'en') {
    companyLogos = companyLogos_en
  } else if (locale === 'de') {
    companyLogos = companyLogos_de
  } else if (locale === 'en-CH') {
    companyLogos = companyLogos_ch
  }

  const openLink = node => {
    if (node.companyLink) {
      window.location.href = node.companyLink
    }
  }

  let _companyLogos = []
  if (companyLogos && companyLogos.edges && companyLogos.edges.length > 0) {
    _companyLogos = companyLogos.edges.map(x => {
      if (!x.node.logoImage) {
        return ''
      }
      return (
        <ImgContainer key={x.node.id}>
          <Img
            fluid={x.node.logoImage.fluid}
            onClick={() => {
              openLink(x.node)
            }}
            objectFit="contain"
          />
        </ImgContainer>
      )
    })
  }

  return (
    <React.Fragment>
      {_companyLogos.length > 0 ? <Contain>{_companyLogos}</Contain> : null}
    </React.Fragment>
  )
}

const Contain = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  justify-content: center;
  @media ${device.mobileS} {
    justify-content: unset;
  }
  @media ${device.tablet} {
    justify-content: center;
  }
  @media ${device.laptop} {
    justify-content: center;
  }
`

const ImgContainer = styled.div`
  min-width: 80px;
  margin-right: 10px;
  min-width: 160px;
  height: 100px;
  & img {
    height: 50px !important;
  }
  @media ${device.laptop} {
    height: auto;
    transform: scale(0.6);
    min-width: 20%;
    & img {
      height: auto !important;
    }
  }
`

export default AdLetter
