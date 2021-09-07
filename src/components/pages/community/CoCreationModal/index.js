import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Letter, Img } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'
import CommunityContext from '~/context/CommunityContext'

import CloseModalImg from '~/images/Assets/Close-modal.svg'

const CoCreationModal = () => {
  const { setCoCreationModal } = useContext(CommunityContext)
  const { coCreationPopup } = useStaticQuery(graphql`
    query {
      coCreationPopup: datoCmsCoCreationPopup {
        id
        title
        subTitle
        image {
          url
          fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
        coCreationButtons {
          id
          title
          link
        }
      }
    }
  `)
  const { localeFolder } = useContext(StoreContext)
  const reg = /http(s):/
  return (
    <Container>
      <Header>
        <img src={CloseModalImg} onClick={() => setCoCreationModal(false)} />
        <Letter font="Titillium Bold" size={20} color="#202122">
          Co Creation Tool
        </Letter>
      </Header>
      <Title>
        <LogoImg>
          <Img fluid={coCreationPopup.image.fluid} />
        </LogoImg>
        <Letters>
          <Letter
            font="Titillium Black"
            sizeDesktop={30}
            sizeLaptopL={27}
            sizeLaptop={24}
            size={20}
            color="#202122"
          >
            {coCreationPopup.title}
          </Letter>
          <Letter
            font="Titillium Bold"
            sizeDesktop={26}
            sizeLaptopL={23}
            sizeLaptop={20}
            size={18}
            color="#202122"
          >
            {coCreationPopup.subTitle}
          </Letter>
        </Letters>
      </Title>
      <Items>
        {coCreationPopup.coCreationButtons.map(btn => {
          const link = reg.test(`${btn.link}`)
            ? `${btn.link}`
            : `/survey/${btn.link}`
          return (
            <Link key={btn.id} to={link}>
              <Item>
                <Letter
                  font="Titillium Bold"
                  sizeDesktop={20}
                  sizeLaptopL={18}
                  sizeLaptop={16}
                  size={16}
                  color="#202122"
                >
                  {btn.title}
                </Letter>
              </Item>
            </Link>
          )
        })}
      </Items>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background: white;
  z-index: 10;
  bottom: 0px;
  overflow: scroll;
  padding-left: 16px;
  padding-right: 16px;
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    max-width: 450px;
    padding-left: 3%;
  }
  @media ${device.laptopL} {
    height: 100%;
    width: 34%;
    right: 0px;
    max-width: unset;
    display: flex;
    flex-direction: column;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  & img {
    position: absolute;
    top: 43px;
    left: 30px;
  }
`

const Title = styled.div`
  display: flex;
  margin-top: 30px;
  @media ${device.laptop} {
    margin-top: 120px;
  }
`

const LogoImg = styled.div`
  width: 46px;
  height: 46px;
  margin-right: 14px;
  margin-top: 10px;
  @media ${device.laptop} {
    width: 56px;
    height: 56px;
    margin-right: 14px;
    margin-top: 10px;
  }
`

const Letters = styled.div`
  display: flex;
  flex-direction: column;
`

const Items = styled.div`
  margin-top: 66px;
`

const Item = styled.div`
  border: 1px solid #202122;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
  cursor: pointer;
  & span {
    width: 60%;
    text-align: center;
  }
  @media ${device.laptop} {
    height: 100px;
    width: 80%;
  }
`

export default CoCreationModal
