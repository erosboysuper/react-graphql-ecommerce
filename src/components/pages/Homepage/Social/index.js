import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'

import SubTitle from '~/components/Common/SubTitle'

const Social = ({
  socialHeadling,
  socialShortText,
  instagramHandler,
  instagramHandleLink,
}) => {
  const { locale } = useContext(StoreContext)
  const { socialPictures_en, socialPictures_de, socialPictures_ch } =
    useStaticQuery(graphql`
      query {
        socialPictures_en: allDatoCmsSocialPicture(
          filter: { published: { eq: true }, locale: { eq: "en" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...socialPictures_commonFields
            }
          }
        }
        socialPictures_de: allDatoCmsSocialPicture(
          filter: { published: { eq: true }, locale: { eq: "de" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...socialPictures_commonFields
            }
          }
        }
        socialPictures_ch: allDatoCmsSocialPicture(
          filter: { published: { eq: true }, locale: { eq: "en-CH" } }
          sort: { fields: position, order: ASC }
        ) {
          edges {
            node {
              ...socialPictures_commonFields
            }
          }
        }
      }
      fragment socialPictures_commonFields on DatoCmsSocialPicture {
        id
        image {
          url
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "250" }) {
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
  let socialPictures = {}
  if (locale === 'en') {
    socialPictures = socialPictures_en
  } else if (locale === 'de') {
    socialPictures = socialPictures_de
  } else if (locale === 'en-CH') {
    socialPictures = socialPictures_ch
  }

  let socialPictures1 = []
  let _socialPictures = []
  if (
    socialPictures &&
    socialPictures.edges &&
    socialPictures.edges.length > 0
  ) {
    socialPictures.edges.forEach((x, index) => {
      if (x.node.image && index % 2 === 0) {
        _socialPictures.push(
          <LazyLoad key={x.node.id}>
            <Li>
              <Image fluid={x.node.image.fluid} />
            </Li>
          </LazyLoad>
        )
      } else {
        socialPictures1.push(
          <LazyLoad key={x.node.id}>
            <Li>
              <Image fluid={x.node.image.fluid} />
            </Li>
          </LazyLoad>
        )
      }
    })

    // if (_socialPictures.length > 0) {
    //   _socialPictures.push(<Li key="rommy-garg"></Li>)
    // }
  }

  useEffect(() => {
    document.getElementById('scroll').scrollLeft += 50
  }, [])

  return (
    <React.Fragment>
      <Container>
        <SpaceContainer>
          <Space height={25} />
        </SpaceContainer>
        <Contain>
          <SubTitle
            title={socialHeadling}
            subtitle={`${socialShortText} ${instagramHandler}`}
            link={instagramHandleLink}
          />
        </Contain>
        <ContainerUI>
          <Ul id="scroll">
            <Slider>{_socialPictures}</Slider>{' '}
            <Slider1>{socialPictures1}</Slider1>{' '}
          </Ul>
        </ContainerUI>
      </Container>
    </React.Fragment>
  )
}

const SpaceContainer = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 40px;
  @media ${device.laptop} {
    display: flex;
    margin-top: 210px;
  }
`

const ContainerUI = styled.div`
  width: 100%;
  height: 100%;

  padding: 0;
  position: relative;
  margin-top: 40px;
  @media ${device.laptop} {
    display: flex;
    width: 75%;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
    width: 79%;
  }
`

const Space = styled.div`
  height: ${props => props.height}px;
  width: 100%;
`

const Ul = styled.div`
  height: 390px;
  display: flex;
  padding: 0px 10px 0px 0px;
  overflow: auto;
  flex-wrap: wrap;
  padding-left: 50px;
  @media ${device.laptop} {
    height: 100%;
    overflow-y: hidden;
    margin-left: 130px;
  }
  @media ${device.laptopL} {
    // height: 490px;
    margin-left: 130px;
  }
  @media ${device.desktop} {
    height: 625px;
    margin-left: 130px;
  }
`

const Li = styled.div`
  width: 180px;
  height: 180px;
  display: inline-table;

  margin: 5px 10px 5px 0px;

  & img {
    width: 100%;
    height: 150px;
  }

  @media ${device.laptop} {
    & {
      width: 15vw;
    }
    & img {
      height: 290px;
    }
  }
`
const Slider = styled.div`
  display: flex;
  @media ${device.laptop} {
    margin-left: 145px;
  }
`

const Slider1 = styled.div`
  display: flex;
  margin-left: -50px;
  @media ${device.laptop} {
    margin-left: 0px;
  }
`
const Contain = styled.div`
  @media ${device.laptop} {
    margin-left: 7%;
    display: flex;
    align-items: center;
  }
  @media ${device.laptopL} {
    margin-left: 10%;
  }
  @media ${device.desktop} {
    margin-left: 10%;
  }
`

export default Social
