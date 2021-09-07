import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { useStaticQuery, graphql } from 'gatsby'

import { darkFont, btn_color } from '~/utils/colors'
import { Letter, Img } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

const DiffListDesktop = ({ tboDifferenceTitle }) => {
  const { locale } = useContext(StoreContext)
  const { tboHighlights_en, tboHighlights_de, tboHighlights_ch } =
    useStaticQuery(graphql`
      query {
        tboHighlights_en: datoCmsTboDifferencePage(locale: { eq: "en" }) {
          ...tboDiffDesktopTboHighlights_commonFields
        }
        tboHighlights_de: datoCmsTboDifferencePage(locale: { eq: "de" }) {
          ...tboDiffDesktopTboHighlights_commonFields
        }
        tboHighlights_ch: datoCmsTboDifferencePage(locale: { eq: "en-CH" }) {
          ...tboDiffDesktopTboHighlights_commonFields
        }
      }
      fragment tboDiffDesktopTboHighlights_commonFields on DatoCmsTboDifferencePage {
        tboDifference {
          id
          title
          shortText
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
        }
      }
    `)
  let tboHighlights = {}
  if (locale === 'en') {
    tboHighlights = tboHighlights_en
  } else if (locale === 'de') {
    tboHighlights = tboHighlights_de
  } else if (locale === 'en-CH') {
    tboHighlights = tboHighlights_ch
  }

  return (
    <div>
      <Container>
        <Container1>
          {tboHighlights.tboDifference &&
            tboHighlights.tboDifference.map((x, index) => (
              <Contain key={x.id} width={index < 2 ? 31 : 22}>
                {x.image && (
                  <ImgContainer>
                    {x.image.fluid && (
                      <Img fluid={x.image.fluid} alt={x.title} />
                    )}
                    {!x.image.fluid && (
                      <LazyLoad>
                        <img src={x.image.url} alt={x.title} />
                      </LazyLoad>
                    )}
                  </ImgContainer>
                )}
                <LetterContainer border={index % 2 === 0 ? 2 : 0}>
                  <TopLetter>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={30}
                      sizeLaptopL={25}
                      sizeLaptop={19}
                      color={darkFont}
                    >
                      {x.title}
                    </Letter>
                  </TopLetter>
                  <BottomLetter>
                    <Letter
                      font="Titillium Web"
                      size={14}
                      sizeDesktop={20}
                      sizeLaptop={17}
                      color={btn_color}
                    >
                      {x.shortText}
                    </Letter>
                  </BottomLetter>
                </LetterContainer>
              </Contain>
            ))}
        </Container1>
        <Title>
          <TitleLetter>
            <Letter
              font="Titillium Black"
              size={26}
              sizeLaptop={32}
              sizeLaptopL={40}
              sizeDesktop={46}
              color={darkFont}
            >
              {tboDifferenceTitle}
            </Letter>
          </TitleLetter>
        </Title>
      </Container>
    </div>
  )
}

const Container = styled.div`
  margin-top: 100px;
  background: #f2f2f7;
  display: none;
  @media ${device.laptop} {
    display: flex;
    background: white;
  }
`

const TitleLetter = styled.div`
  position: absolute;
  width: 260px;
  margin-left: 10%;
  top: 50%;
  text-align: end;
  transform: translate(11px, -65%);
`

const Container1 = styled.div`
  @media ${device.laptop} {
    width: 60%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 840px;
  }
`

const Title = styled.div`
  width: auto;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 60px;
  @media ${device.laptop} {
    background: #f2f2f7;
    width: 40%;
    position: relative;
  }
`

const Contain = styled.div`
  min-height: 56px;
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  margin-bottom: 10px;
  @media ${device.laptop} {
    width: ${props => props.width}%;
    padding-left: ${props => (props.width === 31 ? '6%' : '14px')};
    display: block;
    margin-right: 15px;
    background: #f2f2f7;
    margin-left: ${props => (props.width === 31 ? '0px' : '15px')};
    margin-right: 0px;
    height: 420px;
    margin-bottom: 0px;
    z-index: 2;
  }
`

const ImgContainer = styled.div`
  & {
    width: 60px;
  }
  & img {
    width: 50px;
  }
  @media ${device.laptop} {
    width: 110px;
    margin-top: 50px;
    height: 120px;
    & img {
      width: 110px;
    }
  }
`

const LetterContainer = styled.div`
  margin-left: 10px;
  width: 90%;
  border-bottom: ${props => props.border}px solid #202122;
  height: 200px;
  @media ${device.laptop} {
    height: 220px;
  }
  @media ${device.laptopL} {
    height: 230px;
  }
`

const TopLetter = styled.div`
  min-height: 100px;
`

const BottomLetter = styled.div`
  min-height: 25px;
`

export default DiffListDesktop
