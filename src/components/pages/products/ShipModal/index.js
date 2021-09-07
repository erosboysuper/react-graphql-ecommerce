import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import { darkFont } from '~/utils/colors'
import { Letter, Space } from '~/utils/styles'
import { device } from '~/utils/device'
import CloseModalImg from '~/images/Assets/Close-modal.svg'

const ShipModal = () => {
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
              ...shipGuarantees_commonFields
            }
          }
        }
        guarantees_de: allDatoCmsGuarantee(
          filter: { locale: { eq: "de" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...shipGuarantees_commonFields
            }
          }
        }
        guarantees_ch: allDatoCmsGuarantee(
          filter: { locale: { eq: "en-CH" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...shipGuarantees_commonFields
            }
          }
        }
      }
      fragment shipGuarantees_commonFields on DatoCmsGuarantee {
        id
        title
        description
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
    <Modal>
      <Header>
        <Letter
          font="Titillium Bold"
          size={16}
          sizeLaptop={16}
          sizeLaptopL={18}
          sizeDesktop={20}
          color={darkFont}
        >
          SHIPPING & RETURNS
        </Letter>
        <img
          src={CloseModalImg}
          onClick={() => {
            setShippingModal(false)
            setModal(false)
          }}
          alt="Close"
        />
      </Header>
      <Space height={20} />
      {guarantees.edges.map(x => (
        <Container key={x.node.id}>
          <LazyLoad>
            <Icon src={x.node.image.url} alt="Icon" /> &nbsp; &nbsp;
          </LazyLoad>
          <Letter
            font="Titillium Bold"
            size={18}
            sizeLaptop={16}
            sizeLaptopL={19}
            sizeDesktop={22}
            color={darkFont}
          >
            {x.node.title}
          </Letter>
          <Space height={20} />
          <Letter
            font="Titillium Web"
            size={14}
            sizeLaptop={16}
            sizeLaptopL={19}
            sizeDesktop={22}
            color={darkFont}
            dangerouslySetInnerHTML={{ __html: x.node.description }}
          />
        </Container>
      ))}
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  height: 85%;
  width: 100%;
  background: white;
  z-index: 100;
  bottom: 0px;
  overflow: scroll;
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    max-width: 450px;
  }
  @media ${device.laptopL} {
    height: 100%;
    width: 34%;
    right: 0px;
    max-width: unset;
  }
`

const Header = styled.div`
  & {
    text-align: center;
    position: relative;
    padding-top: 20px;
  }

  & img {
    position: absolute;
    top: 18px;
    right: 10px;
  }
  @media ${device.laptop} {
    padding-top: 47px;
    & img {
      width: 26px;
      top: 42px;
      left: 30px;
    }
    margin-bottom: 6%;
  }
  @media ${device.laptopL} {
    & img {
      width: 32px;
      top: 42px;
      left: 30px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 38px;
      top: 42px;
      left: 30px;
    }
  }
`

const Container = styled.div`
  margin: 10px 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid #707070;
  @media ${device.laptop} {
    margin-left: 7.4%;
    margin-right: 7.4%;
    & p {
      font-size: 16px !important;
    }
    & span {
      font-size: 16px !important;
    }
  }
  @media ${device.laptopL} {
    margin-left: 7.4%;
    margin-right: 7.4%;
    & p {
      font-size: 19px !important;
    }
    & span {
      font-size: 19px !important;
    }
  }
  @media ${device.desktop} {
    margin-left: 7.4%;
    margin-right: 7.4%;
    & p {
      font-size: 22px !important;
    }
    & span {
      font-size: 22px !important;
    }
  }
`

const Icon = styled.img`
  height: 40px;
  @media ${device.laptop} {
    width: 30px;
    height: 30px;
  }
  @media ${device.laptopL} {
    width: 40px;
    height: 40px;
  }
  @media ${device.desktop} {
    width: 50px;
    height: 50px;
  }
`

export default ShipModal
