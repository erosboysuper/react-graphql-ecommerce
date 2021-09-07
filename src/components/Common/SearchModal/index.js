import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import SearchContext from '~/context/SearchContext'
import StoreContext from '~/context/StoreContext'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import { Space, Letter, MobileContain, DesktopContain } from '~/utils/styles'

import CloseFilterImg from '~/images/Assets/Close-filters.svg'
import ArrowBackImg from '~/images/Assets/Arrow-back.svg'

import SearchTitle from '~/components/pages/search/SearchTitle'
import InputField from '~/components/pages/search/InputField'
import CutType from '~/components/pages/search/CutType'
import ColorSelect from '~/components/pages/search/ColorSelect'
import SizeSelect from '~/components/pages/search/SizeSelect'
// import TagSelect from '~/components/pages/search/TagSelect'
import SearchItem from '~/components/pages/search/SearchItem'

const SearchModal = () => {
  const { locale } = useContext(StoreContext)
  const {
    focus,
    setFocus,
    searchText,
    setViewSearch,
    activeCut,
    activeColor,
    activeSize,
    showResults,
    setShowResults,
  } = useContext(SearchContext)

  const {
    colors,
    dbProducts_en,
    dbProducts_de,
    dbProducts_ch,
    sizes_en,
    sizes_de,
    sizes_ch,
  } = useStaticQuery(graphql`
    query {
      colors: allDatoCmsColor(filter: { locale: { eq: "en" } }) {
        nodes {
          id
          name
          colorCode {
            hex
          }
          colorImage {
            url
          }
        }
      }
      dbProducts_en: allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true }, locale: { eq: "en" } }
        sort: { fields: position, order: ASC }
      ) {
        nodes {
          ...searchProducts_commonFields
        }
      }
      dbProducts_de: allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true }, locale: { eq: "de" } }
        sort: { fields: position, order: ASC }
      ) {
        nodes {
          ...searchProducts_commonFields
        }
      }
      dbProducts_ch: allDatoCmsCollectionPage(
        filter: { isPublished: { eq: true }, locale: { eq: "en-CH" } }
        sort: { fields: position, order: ASC }
      ) {
        nodes {
          ...searchProducts_commonFields
        }
      }
      sizes_en: datoCmsFilterOption(locale: { eq: "en" }) {
        ...sizesFilter_commonFields
      }
      sizes_de: datoCmsFilterOption(locale: { eq: "de" }) {
        ...sizesFilter_commonFields
      }
      sizes_ch: datoCmsFilterOption(locale: { eq: "en-CH" }) {
        ...sizesFilter_commonFields
      }
    }
    fragment searchProducts_commonFields on DatoCmsCollectionPage {
      id
      handle
      title
      menuIcon {
        url
      }
      collections {
        products {
          id
          name
          handle
          media {
            url(imgixParams: { w: "300" })
          }
          variant {
            id
            price
            compareAtPrice
            color {
              id
            }
            size {
              id
            }
          }
        }
      }
    }
    fragment sizesFilter_commonFields on DatoCmsFilterOption {
      sizeOptions {
        id
        title
        sizes {
          id
        }
      }
    }
  `)
  let sizes = {}
  let dbProducts = {}
  if (locale === 'en') {
    sizes = sizes_en
    dbProducts = dbProducts_en
  } else if (locale === 'de') {
    sizes = sizes_de
    dbProducts = dbProducts_de
  } else if (locale === 'en-CH') {
    sizes = sizes_ch
    dbProducts = dbProducts_ch
  }

  let allProducts = {}
  for (let cut of dbProducts.nodes) {
    for (let coll of cut.collections) {
      for (let prod of coll.products) {
        if (!allProducts[prod.id]) {
          prod['cuts'] = []
          allProducts[prod.id] = prod
        }
        allProducts[prod.id] = {
          ...allProducts[prod.id],
          cuts: [...allProducts[prod.id].cuts, cut.id],
        }
      }
    }
  }
  allProducts = Object.values(allProducts)

  let options = { Size: {}, Color: {} }
  if (colors && colors.nodes && colors.nodes.length > 0) {
    colors.nodes.forEach(color => {
      const colorCode = color.colorCode
        ? color.colorCode.hex
        : color.colorImage
        ? color.colorImage.url
        : null

      if (colorCode) {
        options['Color'][color.name] = {
          id: color.id,
          color: colorCode,
        }
      }
    })
  }
  if (sizes && sizes.sizeOptions && sizes.sizeOptions.length > 0) {
    sizes.sizeOptions.forEach(size => {
      options['Size'][size.id] = {
        id: size.id,
        name: size.title,
        sizeIds: size.sizes.map(x => x.id),
      }
    })
  }

  const [products, setProducts] = useState([])
  const [lastSearch, setLastSearch] = useState(['boxer', 'Long'])

  useEffect(() => {
    const regStr = new RegExp(searchText, 'i')
    allProducts = allProducts.map(x => {
      x.name = x.name.replace('<u>', '').replace('</u>', '')
      return x
    })
    let filterProducts = allProducts.filter(prod => {
      let isVisible = {}

      // CHECK FOR KEYWORD SEARCH //
      if (searchText !== '') {
        isVisible['name'] = false
        const isStrFound = prod.name
          .toLowerCase()
          .indexOf(searchText.toLowerCase())
        if (isStrFound !== -1) {
          prod.name = prod.name.replace(regStr, '<u>$&</u>')
          isVisible.name = true
        }
      }

      // CHECK FOR CUTS //
      if (activeCut.length > 0) {
        isVisible['cuts'] = false
        const findCut = prod.cuts.filter(
          cutId => activeCut.indexOf(cutId) !== -1
        )
        if (findCut.length > 0) {
          isVisible.cuts = true
        }
      }

      // CHECK FOR COLORS //
      if (activeColor.length > 0) {
        isVisible['colors'] = false
        const findColor = prod.variant.filter(
          vari => vari.color && activeColor.indexOf(vari.color.id) !== -1
        )
        if (findColor.length > 0) {
          isVisible.colors = true
        }
      }

      // CHECK FOR COLORS //
      if (activeSize.length > 0) {
        isVisible['sizes'] = false
        const findSize = prod.variant.filter(
          vari => vari.size && activeSize.indexOf(vari.size.id) !== -1
        )
        if (findSize.length > 0) {
          isVisible.sizes = true
        }
      }

      const trueCount = Object.values(isVisible).filter(x => x).length
      const visibleFlagCount = Object.values(isVisible).length

      // return (trueCount > 0) // ANY FILTER FOULD
      return trueCount > 0 && visibleFlagCount === trueCount // ALL FILTER FOULD
    })
    setProducts(filterProducts)
  }, [searchText, activeCut, activeColor, activeSize])

  // const tags = [
  //   'TBô Community',
  //   'Limited Edition',
  //   'Fading Out',
  //   'In Funding',
  //   'Sports',
  //   'Daily',
  //   'Community Tag',
  // ]
  return (
    <Container onClick={event => setFocus(false, event)}>
      {showResults === true ? (
        <BackImg onClick={() => setShowResults(false)}>
          <img src={ArrowBackImg} alt="Arrow Back" />
        </BackImg>
      ) : null}
      <MobileContain>
        <SearchTitle />
      </MobileContain>
      <InputField />
      {/* FILTER OPTIONS */}
      {!focus && !showResults ? (
        <TypeContainer>
          <SelectContainer>
            <Span>Type of Cut</Span>
            <Space height={15} />
            <CutType cutTypes={dbProducts} />
            <Space height={25} />
          </SelectContainer>
          <SelectContainer>
            <Span>Color</Span>
            <Space height={15} />
            <ColorSelect colors={options['Color']} />
            <Space height={25} />
          </SelectContainer>
          <SelectContainer>
            <Span>Size</Span>
            <Space height={15} />
            <SizeSelect sizes={options['Size']} />
            <Space height={25} />
          </SelectContainer>
          {/* <SelectContainer>
            <Span>Category</Span>
            <Space height={15} />
            <TagSelect tags={tags} />
          </SelectContainer> */}
          <MobileContain>
            <Space height={30} />
          </MobileContain>
          <DesktopContain>
            <Space height={115} />
          </DesktopContain>
        </TypeContainer>
      ) : (
        <div />
      )}
      {/* SHOW PAST HISTORY */}
      {focus && searchText === '' && products.length === 0 ? (
        <MobileContain>
          <Contain>
            <Letter font="Titillium Light" size={14} color="#7D7F81">
              Last Search
            </Letter>
            <Space height={10} />
            {lastSearch.map((item, index) => (
              <div key={index}>
                <Letter font="Titillium Bold" size={20} color="white">
                  {item}
                </Letter>
                <Space height={10} />
              </div>
            ))}
          </Contain>
        </MobileContain>
      ) : (
        <div />
      )}
      {/* RESULT SCREEN */}
      {showResults || (products.length > 0 && focus) ? (
        <ResultContainer>
          <ResultProducts>
            {products.length > 0 ? (
              products.map(product => (
                <div key={product.id}>
                  <SearchItem product={product} />
                </div>
              ))
            ) : (
              <p>No Record Found!</p>
            )}
          </ResultProducts>
          <DesktopContainer>
            <Contain>
              <Letter
                font="Titillium Light"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={19}
                sizeDesktop={22}
                color="#7D7F81"
              >
                Last Search
              </Letter>
              <Space height={10} />
              {lastSearch.map((item, index) => (
                <div key={index}>
                  <Letter
                    font="Titillium Bold"
                    size={20}
                    sizeLaptop={22}
                    sizeLaptopL={28}
                    sizeDesktop={34}
                    color="white"
                  >
                    {item}
                  </Letter>
                  <Space height={10} />
                </div>
              ))}
            </Contain>
          </DesktopContainer>
        </ResultContainer>
      ) : (
        <div />
      )}
      {products.length > 0 && !showResults && (
        <ResultProduct onClick={() => setShowResults(true)}>
          SHOW {products.length} PRODUCTS
        </ResultProduct>
      )}
      <CloseImg
        src={CloseFilterImg}
        alt="Close"
        onClick={() => setViewSearch(false)}
      />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: auto;
  background-color: ${darkFont};
  min-height: 100vh;
  z-index: 100;
  width: 100%;
  height: 100%;
`

const Span = styled.span`
  font-size: 14px;
  font-family: Titillium Light;
  margin-left: 5%;
  color: #7d7f81;
  @media ${device.laptop} {
    font-size: 16px;
  }
  @media ${device.laptopL} {
    font-size: 19px;
  }
  @media ${device.desktop} {
    font-size: 22px;
  }
`

const Contain = styled.div`
  margin-left: 5%;
  margin-top: 5px;
  @media ${device.laptop} {
    width: 40%;
  }
`

const CloseImg = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 105;
  cursor: pointer;
  @media ${device.laptop} {
    width: 66px;
    height: 66px;
    bottom: 20%;
    right: 7%;
  }
  @media ${device.laptopL} {
    width: 75px;
    height: 75px;
  }
  @media ${device.desktop} {
    width: 96px;
    height: 96px;
  }
`

const TypeContainer = styled.div`
  display: block;
  @media ${device.laptop} {
    display: flex;
    margin-left: 13%;
    margin-right: 13%;
    justify-content: space-between;
  }
  @media ${device.laptopL} {
    margin-left: 15%;
    margin-right: 15%;
  }
`

const SelectContainer = styled.div`
  @media ${device.laptop} {
    width: 100%;
    margin-top: 50px;
    margin-right: 25px;
    min-width: 130px;
    max-width: 300px;
  }
  @media ${device.laptopL} {
    margin-right: 50px;
    min-width: 160px;
    max-width: unset;
  }
`

const ResultProduct = styled.div`
  position: initial;
  height: 83px;
  bottom: 0px;
  width: 100%;
  color: white;
  background: #ff8c00;
  font-size: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Titillium Web;
  letter-spacing: 2px;
  cursor: pointer;
  @media ${device.laptop} {
    display: flex;
    width: 250px;
    height: 66px;
    position: fixed;
    bottom: 95px;
    right: 144px;
    font-size: 18px;
    border-radius: 50px;
    border-bottom: 4px solid white;
  }
  @media ${device.laptopL} {
    width: 280px;
    height: 80px;
    font-size: 19px;
  }
  @media ${device.desktop} {
    width: 350px;
    height: 96px;
    font-size: 22px;
  }
`

const ResultContainer = styled.div`
  @media ${device.laptop} {
    display: flex;
    padding-left: 13%;
  }
  @media ${device.laptopL} {
    display: flex;
    padding-left: 15%;
  }
`

const ResultProducts = styled.div`
  @media ${device.laptop} {
    width: 40%;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    width: 40%;
    margin-left: 5%;
  }
`

const BackImg = styled.div`
  & {
    position: fixed;
    top: 25px;
    left: 20px;
    z-index: 1;
  }
  & img {
    width: 58px;
  }
`

export default SearchModal
