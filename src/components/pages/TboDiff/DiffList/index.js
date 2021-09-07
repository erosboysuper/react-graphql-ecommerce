import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { darkFont, btn_color } from '~/utils/colors'
import { Letter, Space, Img } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

const DiffList = ({ tboDifferenceTitle }) => {
  const { locale } = useContext(StoreContext)
  const { tboHighlights_en, tboHighlights_de, tboHighlights_ch } =
    useStaticQuery(graphql`
      query {
        tboHighlights_en: datoCmsTboDifferencePage(locale: { eq: "en" }) {
          ...tboDiffTboHighlights_commonFields
        }
        tboHighlights_de: datoCmsTboDifferencePage(locale: { eq: "de" }) {
          ...tboDiffTboHighlights_commonFields
        }
        tboHighlights_ch: datoCmsTboDifferencePage(locale: { eq: "en-CH" }) {
          ...tboDiffTboHighlights_commonFields
        }
      }
      fragment tboDiffTboHighlights_commonFields on DatoCmsTboDifferencePage {
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
        <Title>
          <Letter font="Titillium Black" size={26} color={darkFont}>
            {tboDifferenceTitle}
          </Letter>
        </Title>
        {tboHighlights.tboDifference &&
          tboHighlights.tboDifference.map(x => (
            <Contain key={x.id}>
              {x.image && (
                <ImgContainer>
                  {x.image.fluid && <Img fluid={x.image.fluid} alt={x.title} />}
                  {!x.image.fluid && (
                    <LazyLoad>
                      <img src={x.image.url} alt={x.title} />
                    </LazyLoad>
                  )}
                </ImgContainer>
              )}
              <LetterContainer>
                <TopLetter>
                  <Letter font="Titillium Bold" size={16} color={darkFont}>
                    {x.title}
                  </Letter>
                </TopLetter>
                <BottomLetter>
                  <Letter font="Titillium Web" size={14} color={btn_color}>
                    {x.shortText}
                  </Letter>
                </BottomLetter>
              </LetterContainer>
            </Contain>
          ))}
        <Space height={30} />
      </Container>
    </div>
  )
}

const Container = styled.div`
  margin-top: 100px;
  background: #f2f2f7;
  @media ${device.laptop} {
    display: none;
  }
`

const Title = styled.div`
  width: 80%;
  margin-left: 10%;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 60px;
`

const Contain = styled.div`
  min-height: 56px;
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  margin-bottom: 10px;
`

const ImgContainer = styled.div`
  & {
    width: 60px;
  }
  & img {
    width: 50px;
  }
`

const LetterContainer = styled.div`
  border-bottom: 1px solid #202122;
  margin-left: 10px;
  width: 80%;
`

const TopLetter = styled.div`
  min-height: 20px;
`

const BottomLetter = styled.div`
  min-height: 25px;
`

export default DiffList
