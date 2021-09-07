import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import StoreContext from '~/context/StoreContext'
import SearchContext from '~/context/SearchContext'

import { device } from '~/utils/device'
import { Cover } from '~/utils/styles'
import { zendeskWidget } from '~/utils/functions'

import MoreFilterImg from '~/images/Assets/More-filters.svg'

import Header from '~/components/Common/Header'
import SEO from '~/components/seo'
import FrontIn from '~/components/pages/collection/FrontIn'
import CollectionItems from '~/components/pages/collection/collectionItems'
import Pattern from '~/components/pages/collection/Pattern'
import JoinCommunity from '~/components/pages/Homepage/JoinCommunity'
// import Funding from '~/components/pages/collection/Funding'
import SearchModal from '~/components/Common/SearchModal'
import Footer from '~/components/Common/Footer'

const CollectionPage = ({ data, pageContext: { locale, localeFolder } }) => {
  const { setLocale, setLocaleFolder } = useContext(StoreContext)
  let collPage = data.datoCmsCollectionPage || {}
  const usStoreRating = data.usStoreRating || {}
  const seo = collPage.seo || {}
  const { modal } = useContext(StoreContext)
  const { viewSearch, setViewSearch } = useContext(SearchContext)
  // const [fundingNum, setFundingNum] = useState([1, 1])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)

    if (locale === 'en') {
      setTimeout(() => zendeskWidget(), 1000 * 10)
    }
  }, [locale, localeFolder])

  if (usStoreRating.collections && collPage.collections) {
    usStoreRating.collections.forEach(x => {
      const searchId = x.id.match(/\d+/gi).join('')
      const regExp = new RegExp(`${searchId}`)
      let coll = collPage.collections.find(col => col.id.search(regExp) !== -1)
      if (coll && coll.products && x.products) {
        x.products.forEach(z => {
          let prod = coll.products.find(y => y.handle === z.handle)
          if (prod) {
            prod['productReviewGroup'] = z['productReviewGroup'] || {}
          }
        })
      }
    })
  }

  return (
    <Container>
      <SEO
        title={seo.title || collPage.title}
        description={seo.description || collPage.title}
        image={seo.image ? seo.image.url : null}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          seo.title,
          collPage.title,
        ]}
      />
      <Header />
      <FrontIn
        pageTitle={collPage.pageTitle}
        pageDescription={collPage.pageDescription}
        bannerImage={collPage.bannerImage}
        desktopBannerImage={collPage.desktopBannerImage}
        position={collPage.position}
      />
      {collPage.showToggleButton && <Pattern />}
      {collPage.collections &&
        collPage.collections.map((collection, index) => (
          <React.Fragment key={collection.id}>
            <CollectionItems
              name={collection.name}
              products={collection.products}
              showItemCount={collPage.showItemCount}
              showCollectionTitle={collPage.showCollectionTitle}
              showToggleButton={collPage.showToggleButton}
              index={index}
            />
            <br />
            <br />
          </React.Fragment>
        ))}

      <JoinCommunity active={true} />
      {/* <JoinCommunity active={fundingNum.length > 0 ? false : true} /> */}
      <Space1 />
      {/* {
        fundingNum.map((item, index) => {
          return (
            <div key={index}>
              <Space height={30} />
              <Funding />
            </div>
          )
        })
      } */}

      <Footer activeMenu="shop" />
      <FilterImg
        src={MoreFilterImg}
        alt="MoreFilterImg"
        onClick={() => setViewSearch(true)}
      />

      {modal === true && (
        <Cover
          background={modal === true ? 0.5 : 0}
          index={modal === true ? 10 : 0}
        />
      )}
      {viewSearch === true && <SearchModal />}
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
`

const FilterImg = styled.img`
  position: fixed;
  bottom: 85px;
  right: 10px;
  cursor: pointer;
  @media ${device.laptop} {
    right: 7%;
    bottom: 20%;

    width: 55px;
  }
  @media ${device.laptopL} {
    width: 75px;
    right: 7%;
    bottom: 20%;
  }
  @media ${device.desktop} {
    width: 100px;
  }
`

const Space1 = styled.div`
  width: 100%;
  height: 0px;
  @media ${device.tablet} {
    height: 0px;
  }
  @media ${device.laptop} {
    height: 23px;
  }
  @media ${device.laptopL} {
    height: 24px;
  }
  @media ${device.desktop} {
    height: 22px;
  }
`

export default CollectionPage

export const query = graphql`
  query ($handle: String!, $locale: String!) {
    usStoreRating: datoCmsCollectionPage(
      locale: { eq: "en" }
      handle: { eq: $handle }
      collections: {
        elemMatch: { products: { elemMatch: { isPublished: { eq: true } } } }
      }
    ) {
      collections {
        id
        products {
          handle
          productReviewGroup {
            products {
              variant {
                sku
              }
            }
          }
        }
      }
    }
    datoCmsCollectionPage(
      locale: { eq: $locale }
      handle: { eq: $handle }
      collections: {
        elemMatch: { products: { elemMatch: { isPublished: { eq: true } } } }
      }
    ) {
      id
      handle
      title
      pageTitle
      pageDescription
      showItemCount
      showToggleButton
      showCollectionTitle
      position
      bannerImage {
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
      desktopBannerImage {
        url
        fluid(forceBlurhash: true, maxWidth: 1500) {
          aspectRatio
          src
          srcSet
          sizes
          width
          height
        }
      }
      collections {
        id
        name
        products {
          id
          availableForSale
          handle
          name
          shopifyId
          isFadingOut
          isInFunding
          isTboCommunity
          isLimitedEdition
          isSingleProduct
          availabilityDate
          media {
            url
            fluid(
              forceBlurhash: true
              maxWidth: 910
              imgixParams: { w: "300" }
            ) {
              sizes
              aspectRatio
              src
              srcSet
              width
              height
            }
          }
          variant {
            id
            sku
            shopifyId
            availableForSale
            price
            compareAtPrice
            color {
              name
              colorCode {
                hex
              }
              colorImage {
                url
              }
            }
            size {
              name
              helpText
            }
            images {
              url
              fluid(
                forceBlurhash: true
                maxWidth: 910
                imgixParams: { w: "300" }
              ) {
                sizes
                aspectRatio
                src
                srcSet
                width
                height
              }
            }
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
  }
`
