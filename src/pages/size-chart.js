import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import {
  Img,
  Letter,
  Space,
  MobileContain,
  DesktopContain,
} from '~/utils/styles'

import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import Footer from '~/components/Common/Footer'
import SizeChartItem from '~/components/Common/SizeChartItem'

const SizeChart = ({ pageContext: { locale, localeFolder } }) => {
  const { sizeChart_en, sizeChart_de, sizeChart_ch } = useStaticQuery(graphql`
    query {
      sizeChart_en: datoCmsSizeChartPage(locale: { eq: "en" }) {
        ...sizeChart_commonFields
      }
      sizeChart_de: datoCmsSizeChartPage(locale: { eq: "de" }) {
        ...sizeChart_commonFields
      }
      sizeChart_ch: datoCmsSizeChartPage(locale: { eq: "en-CH" }) {
        ...sizeChart_commonFields
      }
    }
    fragment sizeChart_commonFields on DatoCmsSizeChartPage {
      id
      pageTitle
      subTitle
      pageLogo {
        url
        fluid {
          base64
          aspectRatio
          src
          srcSet
          sizes
        }
      }
      sizeChart {
        id
        title
        heading
        description
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
        sizes {
          id
          title
          sizeVariant {
            id
            title
            cmHelpText
            inchHelpText
          }
        }
      }
      seo {
        title
        description
        image {
          url
        }
      }
    }
  `)
  let sizeChart = {}
  if (locale === 'en') {
    sizeChart = sizeChart_en
  } else if (locale === 'de') {
    sizeChart = sizeChart_de
  } else if (locale === 'en-CH') {
    sizeChart = sizeChart_ch
  }
  const seo = sizeChart.seo || {}
  const [chartSelected, setChartSelected] = useState(0)
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO
        title={seo.title}
        description={seo.description}
        image={seo.image ? seo.image.url : null}
        keywords={[`tbo clothing`, `underwears`, `tbo`, seo.title]}
      />
      <Header />
      <Container>
        <Logo>
          {sizeChart.pageLogo && (
            <ImgContainer>
              <Img fluid={sizeChart.pageLogo.fluid} alt={sizeChart.pageTitle} />
            </ImgContainer>
          )}
          <Space height={5} />
          <DesktopContain>
            <Space height={20} />
          </DesktopContain>
          <Letter
            font="Titillium Black"
            size={26}
            sizeTablet={32}
            sizeLaptop={30}
            sizeLaptopL={35}
            sizeDesktop={40}
            color={darkFont}
          >
            {sizeChart.pageTitle}
          </Letter>
        </Logo>
        <BackImg
          onClick={() => {
            window.history.back()
          }}
        >
          <img src={ArrowBackImg} alt="Arrow Back" />
        </BackImg>
      </Container>
      <ImageShow>
        <ImageCarousel>
          {sizeChart.sizeChart.map((sc, index) => {
            if (sc.image)
              return (
                <LazyLoad>
                  <ChartImageItem
                    src={sc.image.url}
                    key={sc.id}
                    alt="img"
                    onClick={() => setChartSelected(index)}
                    opacity={chartSelected === index ? 1 : 0.3}
                  />
                </LazyLoad>
              )
          })}
        </ImageCarousel>
      </ImageShow>
      {sizeChart.sizeChart.map(sc => {
        return (
          <DesktopContain key={sc.id}>
            <SizeChartItem sizeChart={sc} />
          </DesktopContain>
        )
      })}
      {sizeChart.sizeChart.length > 0 && (
        <MobileContain>
          <SizeChartItem
            sizeChart={sizeChart.sizeChart[chartSelected]}
            key="mobile show"
          />
        </MobileContain>
      )}
      <Footer activeMenu="size-chart" />
    </React.Fragment>
  )
}

const Container = styled.div`
  position: relative;
`

const Logo = styled.div`
  text-align: center;
  padding-top: 40px;
  @media ${device.laptop} {
    padding-top: 72px;
  }
`

const ImgContainer = styled.div`
  width: 164px;
  margin: 0px auto;

  & div {
    margin-bottom: 0px;
  }
  @media ${device.tablet} {
    width: 230px;
  }
  @media ${device.laptop} {
    width: 17%;
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
  }
`

const BackImg = styled.div`
  & {
    position: fixed;
    top: 25px;
    left: 20px;
    cursor: pointer;
  }
  & img {
    width: 58px;
  }
`

const ImageShow = styled.div`
  display: flex;
  overflow: auto;
  @media ${device.laptop} {
    display: none;
  }
`
const ImageCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 20px;
  margin-left: 16px;
  & img {
    width: 66px;
    margin-right: 10px;
  }
`

const ChartImageItem = styled.img`
  opacity: ${props => props.opacity};
`

export default SizeChart
