import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import StoreContext from '~/context/StoreContext'

import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import { Letter, Space, Cover } from '~/utils/styles'

import CloseModalImg from '~/images/Assets/Close-modal.svg'

const CoCreateModal = ({ onClose }) => {
  const { locale } = useContext(StoreContext)
  const { coCreatePopup_en, coCreatePopup_de, coCreatePopup_ch } =
    useStaticQuery(graphql`
      query {
        coCreatePopup_en: datoCmsCoCreatePopup(locale: { eq: "en" }) {
          ...coCreatePopup_commonFields
        }
        coCreatePopup_de: datoCmsCoCreatePopup(locale: { eq: "de" }) {
          ...coCreatePopup_commonFields
        }
        coCreatePopup_ch: datoCmsCoCreatePopup(locale: { eq: "en-CH" }) {
          ...coCreatePopup_commonFields
        }
      }
      fragment coCreatePopup_commonFields on DatoCmsCoCreatePopup {
        id
        title
        description
      }
    `)
  let coCreatePopup = {}
  if (locale === 'en') {
    coCreatePopup = coCreatePopup_en
  } else if (locale === 'de') {
    coCreatePopup = coCreatePopup_de
  } else if (locale === 'en-CH') {
    coCreatePopup = coCreatePopup_ch
  }

  return (
    <React.Fragment>
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
            {coCreatePopup.title}
          </Letter>
          <img src={CloseModalImg} onClick={() => onClose()} alt="Close" />
        </Header>
        <Space height={20} />
        <Container>
          <Letter
            font="Titillium Web"
            size={14}
            sizeLaptop={16}
            sizeLaptopL={19}
            sizeDesktop={22}
            color={darkFont}
            dangerouslySetInnerHTML={{ __html: coCreatePopup.description }}
          />
        </Container>
      </Modal>
      <Cover background={0.5} index={10} onClick={() => onClose()} />
    </React.Fragment>
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

export default CoCreateModal
