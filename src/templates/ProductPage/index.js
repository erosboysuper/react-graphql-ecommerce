import React, { useContext, useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import {
  Space,
  Cover,
  Letter,
  MobileContain,
  DesktopContain,
} from '~/utils/styles'
import { darkFont } from '~/utils/colors'
import { device } from '~/utils/device'
import { zendeskWidget } from '~/utils/functions'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import ArrowImg from '~/images/Assets/Arrow-orange.svg'
import CloseModalImg from '~/images/Assets/Close-modal.svg'
import OrderImg from '~/images/Assets/Quick-pre-order-big.svg'
import MoreImg from '~/images/Assets/More.svg'
import LessImg from '~/images/Assets/Less.svg'
import RightArrowImg from '~/images/Assets/DESKTOP-Arrow-white.png'
import FadingImg from '~/images/Assets/FadingOut.svg'
import LimitedImg from '~/images/Assets/Limited-edition.svg'
import TboImg from '~/images/Assets/TboCommunity.svg'

import SEO from '~/components/seo'
import Header from '~/components/Common/Header'
import StandardProduct from '~/components/pages/products/StandardProduct'
import ProductComment from '~/components/pages/products/ProductComment'
import FundingRelatedProducts from '~/components/pages/products/FundingRelatedProducts'
import ShippingInfo from '~/components/pages/products/ShippingInfo'
import AdLetter from '~/components/pages/Homepage/AdLetter'
import TboDifference from '~/components/pages/Homepage/TboDifference'
import RelatedProducts from '~/components/pages/products/RelatedProducts'
import Footer from '~/components/Common/Footer'
import ModalSelect from '~/components/pages/products/ModalSelect'
import OutProduct from '~/components/pages/products/OutProduct'
import ShipModal from '~/components/pages/products/ShipModal'
import SizeChart from '~/components/pages/products/SizeChart'
import ContactUs from '~/components/pages/products/ContactUs'
import JoinCommunity from '~/components/pages/Homepage/JoinCommunity'
import ProductReviews from '~/components/Common/ProductReviews'

const ProductPage = ({ data, pageContext: { locale, localeFolder } }) => {
  let product = data.datoCmsProduct || {}
  const seo = product.seo || {}
  const pageSetting = data.pageSetting || {}
  const {
    size,
    setSize,
    commentActive,
    setCommentActive,
    sizeChart,
    setSizeChart,
    shippingModal,
    setShippingModal,
    modal,
    setModal,
    sizeModal,
    setSizeModal,
    contactModal,
    setContactModal,
    cart,
    setCart,
    color,
    setColor,
    setSizeColor,
    variant,
    setVariant,
    selectedOpt,
    setSelectedOpt,
    buttonLetter,
    setButtonLetter,
  } = useContext(ProductContext)

  const {
    removeCartItems,
    cartItems,
    addCartItems,
    setLocale,
    setLocaleFolder,
    localeSetting,
  } = useContext(StoreContext)

  const [productRating, setProductRating] = useState({})
  const [hidden, setHidden] = useState(false)
  const [media, setMedia] = useState(product.media || [])
  const [fundStatus, setFundStatus] = useState('funding')

  const usStoreRating = data.usStoreRating || {}
  if (usStoreRating.handle) {
    product['productReviewGroup'] = usStoreRating.productReviewGroup || {}
    product.relatedProduct = product.relatedProduct.map(relatedProd => {
      const _foundData = usStoreRating.relatedProduct.find(
        x => x.handle === relatedProd.handle
      )
      if (_foundData) {
        relatedProd['productReviewGroup'] = _foundData.productReviewGroup || {}
      }
      return relatedProd
    })
  }

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop
    if (top > 0) setHidden(true)
    else setHidden(false)
  }

  const addToCart = count => {
    if (
      buttonLetter !== 'SELECT YOUR SIZE' &&
      buttonLetter !== 'Not available yet'
    ) {
      setCart(count)
      variant.product_shopify_id = product.shopifyId
      variant.product_name = product.name
      variant.product_handle = product.handle
      variant.isSingleProduct = product.isSingleProduct
      addCartItems([variant])
    }
  }

  const removeFromCart = () => {
    if (
      buttonLetter !== 'SELECT YOUR SIZE' &&
      buttonLetter !== 'Not available yet'
    ) {
      setCart(cart - 1)
      removeCartItems([variant])
    }
  }

  const displayQuickCart = flag => {
    setModal(flag)
    setSizeModal(flag)
  }

  const removeModal = () => {
    setModal(false)
    setSizeChart(false)
    setShippingModal(false)
    setContactModal(false)
    setCommentActive(false)
  }

  let showCompareAtPrice = false
  const checkCompareAtPrice = () => {
    showCompareAtPrice =
      !product.isTboCommunity &&
      product.variant &&
      product.variant.length > 0 &&
      (variant.id
        ? variant.compareAtPrice && variant.compareAtPrice - variant.price > 0
        : product.variant[0].compareAtPrice &&
        product.variant[0].compareAtPrice - product.variant[0].price > 0)
  }
  checkCompareAtPrice()

  useEffect(() => {
    checkCompareAtPrice()
  }, [variant])

  useEffect(() => {
    setButtonLetter('SELECT YOUR SIZE')
    if (selectedOpt[product.id] && selectedOpt[product.id].size && !size) {
      setSize(selectedOpt[product.id].size)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      setSize('')
      setColor('')
      setSizeColor({})
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (commentActive === true) setModal(true)
    else setModal(false)
  }, [commentActive])

  useEffect(() => {
    const selectedVariant = product.variant.filter(
      x => x.size.name === size && x.color.name === color
    )
    if (
      selectedVariant.length > 0 &&
      selectedVariant[0].images &&
      selectedVariant[0].images.length > 0
    ) {
      setMedia(selectedVariant[0].images)
    } else {
      setMedia(product.media || [])
    }

    let status = true
    if (selectedVariant.length > 0) {
      setVariant(selectedVariant[0])
      if (cartItems[selectedVariant[0].id]) {
        setCart(selectedVariant[0].num)
        status = false
      }

      if (
        !selectedOpt[product.id] ||
        selectedOpt[product.id].size !== size ||
        selectedOpt[product.id].color !== color
      ) {
        setSelectedOpt({
          ...selectedOpt,
          [product.id]: {
            color,
            size,
          },
        })
      }
    }
    if (status === true) setCart(0)
  }, [size, color])

  useEffect(() => {
    setLocale(locale)
    setLocaleFolder(localeFolder)

    if (locale === 'en') {
      setTimeout(() => zendeskWidget(), 1000 * 10)
    }
  }, [locale, localeFolder])

  return (
    <React.Fragment>
      <SEO
        title={seo.title || product.name}
        description={seo.description || product.name}
        image={seo.image ? seo.image.url : null}
        keywords={[
          `tbo clothing`,
          `underwears`,
          `tbo`,
          seo.title,
          product.name,
        ]}
      />
      <OpacityContainer id="ProductPage">
        <Header />
        {product.isFadingOut === true && (
          <LogoContainer>
            <TypeImg src={FadingImg} alt="FadingImg" />
            <TipLetter top={10}>FADING OUT</TipLetter>
          </LogoContainer>
        )}
        {product.isLimitedEdition && (
          <LogoContainer>
            <TypeImg src={LimitedImg} alt="LimitedImg" />
            <TipLetter1 top={10}>Limited Edition</TipLetter1>
          </LogoContainer>
        )}
        {product.isTboCommunity && (
          <LogoContainer>
            <TypeImg src={TboImg} alt="TboImg" />
            <TipLetter2 top={10}>TBô COMMUNITY</TipLetter2>
          </LogoContainer>
        )}
        <StandardProduct
          product={product}
          media={media}
          pageSetting={pageSetting}
          setProductRating={setProductRating}
          fundStatus={fundStatus}
        />

        {(() => {
          switch (fundStatus) {
            case 'normal':
              return (
                <React.Fragment>
                  {pageSetting.showGuaranteeSection && (
                    <React.Fragment>
                      <Space height={60} />
                      <MobileContain>
                        <ShippingInfo
                          guaranteeHeading={pageSetting.guaranteeHeading}
                          guaranteeAnchorText={pageSetting.guaranteeAnchorText}
                        />
                      </MobileContain>
                    </React.Fragment>
                  )}
                  {pageSetting.showCompanyLogo && (
                    <React.Fragment>
                      <Space1 />
                      <AdLetter />
                    </React.Fragment>
                  )}
                  {pageSetting.tboHighlightGroup && (
                    <React.Fragment>
                      <TboDifference
                        hideSubTitle={true}
                        tboHighlightsContent={product.tboHighlightGroup}
                      />
                    </React.Fragment>
                  )}
                  <DesktopContain>
                    <Space height={70} />
                  </DesktopContain>
                  {pageSetting.showQuestionButton && (
                    <ButtonContain>
                      <MobileContain>
                        <Space height={30} />
                      </MobileContain>
                      <DesktopContain>
                        <ButtonContainer
                          onClick={() => {
                            window.history.back()
                          }}
                        >
                          <Button1>
                            <img src={RightArrowImg} alt="Arrow " /> Go Back &nbsp;
                          </Button1>
                          <ShawdowButton1 />
                        </ButtonContainer>
                      </DesktopContain>
                      <ButtonContainer
                        onClick={() => {
                          setContactModal(true)
                          setModal(true)
                        }}
                      >
                        <Button>
                          {pageSetting.questionButtonText} &nbsp;{' '}
                          <img src={ArrowImg} alt="Arrow" />
                        </Button>
                        <ShawdowButton />
                      </ButtonContainer>
                    </ButtonContain>
                  )}
                  {pageSetting.showReviewSection && !product.isTboCommunity && (
                    <React.Fragment>
                      <Space height={30} />
                      <ProductReviews
                        product={product}
                        productRating={productRating}
                      />
                    </React.Fragment>
                  )}
                </React.Fragment>
              )
            case 'funding':
              return (
                <React.Fragment>
                  <ProductComment />
                </React.Fragment>
              )
          }
        })()}

        {(() => {
          switch (fundStatus) {
            case 'normal':
              return (
                <React.Fragment>
                  {pageSetting.showRelatedProduct && (
                    <React.Fragment>
                      <Space height={60} />
                      <RelatedProducts
                        heading={pageSetting.relatedProductHeading}
                        products={product.relatedProduct}
                      />
                    </React.Fragment>
                  )}
                </React.Fragment>
              )
            case 'funding':
              return (
                <React.Fragment>
                  <FundingRelatedProducts />
                </React.Fragment>
              )
          }
        })()}

        {pageSetting.showBottomBanner && !product.isTboCommunity && (
          <JoinCommunity active={true} />
        )}

        {fundStatus === 'selected' ? (
          <React.Fragment>
            <Space1 />
            <AdLetter />

            <TboDifference hideSubTitle={true} />

            <ButtonContainerForFunding>
              <ButtonContain>
                <MobileContain>
                  <Space height={30} />
                </MobileContain>
                <DesktopContain>
                  <ButtonContainer
                    onClick={() => {
                      window.history.back()
                    }}
                  >
                    <Button1>
                      <img src={RightArrowImg} alt="Arrow " /> Go Back &nbsp;
                    </Button1>
                    <ShawdowButton1 />
                  </ButtonContainer>
                </DesktopContain>
                <ButtonContainer
                  onClick={() => {
                    setContactModal(true)
                    setModal(true)
                  }}
                >
                  <Button>
                    {pageSetting.questionButtonText} &nbsp;{' '}
                    <img src={ArrowImg} alt="Arrow" />
                  </Button>
                  <ShawdowButton />
                </ButtonContainer>
              </ButtonContain>
            </ButtonContainerForFunding>

            <RelatedProducts
              heading={pageSetting.relatedProductHeading}
              products={product.relatedProduct}
            />
          </React.Fragment>
        ) : (
            ''
          )}

        {product.isTboCommunity && (
          <React.Fragment>
            <DesktopContain>
              <Space height={200}></Space>
            </DesktopContain>
            <MobileContain>
              <Space height={100}></Space>
            </MobileContain>
          </React.Fragment>
        )}
        <DesktopContain>
          <Footer
            activeMenu="product"
            additionalStyle={{
              marginTop: fundStatus === 'selected' ? '90px' : '-90px',
            }}
          />
        </DesktopContain>
        <MobileContain>
          <Footer
            activeMenu="product"
            hideStickyMenu={true}
            additionalStyle={{ marginTop: `-90px` }}
          />
        </MobileContain>
        {product.availableForSale === true && <SpaceChange />}
        {/* QUICK BUTTON TO CHOOSE SIZE & COLOR */}
        {hidden && (!size || !color) && product.availableForSale === true && (
          <ModalAppear onClick={() => displayQuickCart(true)}>
            {buttonLetter}
            <div>
              <img src={MoreImg} alt="More" />
            </div>
          </ModalAppear>
        )}
        {/* ADD TO CART BUTTON, WHEN SIZE & COLOR SELECTED ON SCREEN */}
        {hidden &&
          size !== '' &&
          color !== '' &&
          cart === 0 &&
          !sizeModal &&
          product.availableForSale === true && (
            <AddCartStick
              onClick={() => addToCart(cart + 1)}
              className="add-to-cart"
            >
              <Letter
                font="Titillium Bold"
                size={16}
                color="white"
                className="add-to-cart"
              >
                {product.isTboCommunity ? `PRE-ORDER` : `ADD TO CART`}
              </Letter>
              &nbsp;&nbsp;
              {showCompareAtPrice && (
                <Letter font="Titillium Light" size={14} color="white">
                  /SAVE {localeSetting.CURRENCY_SYMBOL}
                  {(variant.id
                    ? variant.compareAtPrice - variant.price
                    : product.variant[0].compareAtPrice -
                    product.variant[0].price
                  ).toFixed(2)}
                </Letter>
              )}
              <img src={OrderImg} alt="Order" />
            </AddCartStick>
          )}
        {modal === true && (
          <Cover
            background={modal === true ? 0.5 : 0}
            index={modal === true ? 10 : 0}
            onClick={() => removeModal()}
          />
        )}
      </OpacityContainer>

      {/* SHOW CHOOSE SIZE & COLOR QUICK MODEL */}
      {modal === true &&
        sizeModal === true &&
        product.availableForSale === true && (
          <SizeSelect>
            <Title>
              <Letter font="Titillium Bold" size={16} color={darkFont}>
                SELECT YOUR SIZE
                <img
                  src={CloseModalImg}
                  onClick={() => displayQuickCart(false)}
                  alt="CloseModalImg"
                />
              </Letter>
            </Title>
            <ModalSelect
              product={product}
              media={media}
              display={displayQuickCart}
              isProductPage={true}
            />
          </SizeSelect>
        )}

      {/* SET CART QUANTITY MODEL */}
      {cart > 0 && !sizeModal && hidden && (
        <CartSelect>
          <NumberChoose>
            <img src={LessImg} onClick={() => removeFromCart()} alt="Less" />{' '}
            &nbsp;&nbsp;
            <Letter font="Titillium Bold" size={18} color="white">
              {' '}
              {cart}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Letter>
            <img
              src={MoreImg}
              onClick={() => addToCart(cart + 1)}
              alt="More"
              className="add-to-cart"
            />
            <CartLetter className="add-to-cart">
              <Letter
                font="Titillium Bold"
                size={16}
                color="white"
                className="add-to-cart"
              >
                IN YOUR CART
              </Letter>
            </CartLetter>
            <CartImg>
              <Link to={`/${localeFolder}/cart`}>
                <img src={OrderImg} alt="Order" />
              </Link>
            </CartImg>
          </NumberChoose>
        </CartSelect>
      )}

      {commentActive === true && (
        <MailModal>
          <LetterBox>
            <Letter
              font="Titillium Bold"
              size={16}
              sizeLaptop={14}
              sizeLaptopL={17}
              sizeDesktop={20}
              color={darkFont}
            >
              CAN'T FIND YOUR SIZE?
            </Letter>
            <img
              src={CloseModalImg}
              onClick={() => setCommentActive(false)}
              alt="Close Modal"
            />
          </LetterBox>
          <OutProduct product={product} />
        </MailModal>
      )}

      {sizeChart === true && <SizeChart sizeChart={product.sizeChart || {}} />}
      {shippingModal === true && <ShipModal />}
      {contactModal === true && <ContactUs />}
    </React.Fragment>
  )
}

export const query = graphql`
  query ($handle: String!, $locale: String!) {
    usStoreRating: datoCmsProduct(
      locale: { eq: "en" }
      handle: { eq: $handle }
    ) {
      handle
      productReviewGroup {
        products {
          variant {
            sku
          }
        }
      }
      relatedProduct {
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
    datoCmsProduct(locale: { eq: $locale }, handle: { eq: $handle }) {
      id
      name
      handle
      shopifyId
      description
      availableForSale
      isFadingOut
      isInFunding
      isTboCommunity
      isLimitedEdition
      isSingleProduct
      availabilityDate
      taxInfo
      media {
        url
        fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "600" }) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      productVideo {
        url
        video {
          mp4Url
          streamingUrl
          thumbnailUrl(format: gif)
          gifThumbnail: thumbnailUrl(format: gif)
          pngThumbnail: thumbnailUrl(format: png)
        }
      }
      variant {
        id
        sku
        shopifyId
        weight
        price
        compareAtPrice
        barcode
        weightUnit
        availableForSale
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
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "600" }) {
            sizes
            aspectRatio
            src
            srcSet
            width
            height
          }
        }
      }
      sizeChart {
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
      relatedProduct {
        id
        name
        handle
        shopifyId
        description
        availableForSale
        isFadingOut
        isInFunding
        isTboCommunity
        isLimitedEdition
        isSingleProduct
        availabilityDate
        media {
          url
          fluid(forceBlurhash: true, maxWidth: 910, imgixParams: { w: "300" }) {
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
          weight
          price
          compareAtPrice
          barcode
          weightUnit
          shopifyId
          availableForSale
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
      seo {
        title
        description
        image {
          url
        }
      }
      tboHighlightGroup {
        id
        tboDifferenceHeading
        tboDifferenceAnchorText
        tboDifferenceAnchorLink
        tboDifference {
          id
          title
          shortText
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
      }
    }
    pageSetting: datoCmsProductPage(locale: { eq: $locale }) {
      showGuaranteeSection
      guaranteeHeading
      guaranteeAnchorText
      showCompanyLogo
      showReviewSection
      showQuestionButton
      questionButtonText
      showRelatedProduct
      relatedProductHeading
      showBottomBanner
    }
  }
`

const Button = styled.button`
  background-color: ${darkFont};
  border: 2px solid black;
  color: white;
  font-family: Titillium Bold;
  font-size: 16px;
  width: 190px;
  height: 60px;
  text-align: center;
  cursor: pointer;
  @media ${device.laptop} {
    width: 200px;
    height: 70px;
    font-size: 18px;
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 78px;
    font-size: 19px;
    & img {
      width: 16px;
      margin-right: 5px;
      margin-top: -2px;
    }
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    font-size: 22px;
  }
`
const Button1 = styled.button`
  background-color: #ff8c00;
  border: 2px solid black;
  color: white;
  font-family: Titillium Bold;
  font-size: 16;
  width: 190px;
  height: 60px;
  text-align: center;
  @media ${device.laptop} {
    width: 200px;
    height: 70px;
    font-size: 18px;
    position: absolute;
    z-index: 2;
    & img {
      width: 14px;
    }
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 78px;
    font-size: 19px;
    & img {
      width: 16px;
      margin-right: 5px;
      margin-top: -2px;
    }
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    font-size: 22px;
    position: absolute;
    z-index: 2;
  }
`

const ButtonContainer = styled.div`
  text-align: center;
  position: relative;
`

const ButtonContainerForFunding = styled.div`
  margin: 60px 0px;
`

const ShawdowButton = styled.div`
  position: absolute;
  width: 190px;
  height: 60px;
  border: 2px solid ${darkFont};
  left: 50%;
  top: 0px;
  transform: translate(-47%, 5px);
  @media ${device.laptop} {
    width: 200px;
    height: 70px;
    transform: translate(-47%, 7px);
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 78px;
    transform: translate(-47%, 7px);
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(-47%, 7px);
  }
`

const ShawdowButton1 = styled.div`
  position: absolute;
  width: 190px;
  height: 60px;
  border: 2px solid ${darkFont};
  left: 50%;
  top: 0px;
  transform: translate(-47%, 5px);
  @media ${device.laptop} {
    width: 200px;
    height: 70px;
    transform: translate(3%, 7px);
  }
  @media ${device.laptopL} {
    width: 250px;
    height: 78px;
    transform: translate(3%, 7px);
  }
  @media ${device.desktop} {
    width: 288px;
    height: 90px;
    transform: translate(3%, 7px);
  }
`

const ModalAppear = styled.div`
  & {
    height: 83px;
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    font-family: Titillium Bold;
    font-size: 16px;
    color: white;
    background: #ff8c00;
    padding: 30px;
    z-index: 6;
    letter-spacing: 1px;
  }
  & img {
    position: absolute;
    top: 28px;
    right: 18px;
    border: 1px solid white;
    padding: 5px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const SizeSelect = styled.div`
  position: fixed;
  height: auto;
  width: 100%;
  background: white;
  bottom: 0px;
  border-top: 6px solid #ff8c00;
  z-index: 10;
  padding-bottom: 100px;
`

const Title = styled.div`
  & {
    position: relative;
    text-align: center;
    padding-top: 20px;
  }
  & img {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`

const OpacityContainer = styled.div`
  opacity: ${props => props.opacity};
  position: relative;
  visibility: visible;
  overflow: hidden;
`

const AddCartStick = styled.div`
  & {
    position: fixed;
    bottom: 0px;
    height: 83px;
    width: 100%;
    background: #ff8c00;
    padding: 30px 0px;
    text-align: center;
  }
  & span {
    letter-spacing: 1px;
  }
  & img {
    width: 33px;
    position: absolute;
    right: 20px;
    top: 26px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

const CartSelect = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 83px;
  z-index: 100;
  background: #f57b00;
  @media ${device.laptop} {
    display: none;
  }
`

const NumberChoose = styled.div`
  & {
    padding: 25px;
  }
  & span {
    vertical-align: middle;
  }
  & img {
    cursor: pointer;
  }
`

const CartLetter = styled.label`
  width: 195px;
  text-align: center;
  letter-spacing: 1px;
`

const CartImg = styled.div`
  & {
    position: absolute;
    height: 83px;
    right: 0px;
    width: 83px;
    background: #ff8c00;
    top: 0px;
    padding: 20px 25px;
  }
  & img {
    width: 33px;
  }
`

const MailModal = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0px;
  height: auto;
  background: white;
  width: 100%;
  padding: 20px;
  @media ${device.laptop} {
    height: 100%;
    width: 43%;
    right: 0px;
    -webkit-transition: all 500ms ease-in;
    -moz-transition: all 500ms ease-in;
    -o-transition: all 500ms ease-in;
    transition: all 500ms ease-in;
    overflow: auto;
    overflow-x: hidden;
    max-width: 460px;
  }
  @media ${device.laptopL} {
    width: 34%;
    max-width: unset;
  }
`

const LetterBox = styled.div`
  & {
    text-align: center;
    margin-top: 10px;
    position: relative;
    letter-spacing: 1px;
  }
  & img {
    position: absolute;
    top: -2px;
    right: 20px;
    cursor: pointer;
  }
  @media ${device.laptop} {
    margin-top: 47px;
    & img {
      top: -4px;
      left: 31px;
      width: 28px;
    }
  }
  @media ${device.laptopL} {
    margin-top: 47px;
    & img {
      top: -4px;
      left: 31px;
      width: 32px;
    }
  }
  @media ${device.desktop} {
    margin-top: 47px;
    & img {
      top: -4px;
      left: 31px;
      width: 38px;
    }
  }
`

const SpaceChange = styled.div`
  height: 83px;
  width: 100%;
  @media ${device.laptop} {
    height: 24px;
    width: 100%;
  }
  @media ${device.laptopL} {
    height: 22px;
  }
  @media ${device.desktop} {
    height: 24px;
  }
`

const ButtonContain = styled.div`
  @media ${device.laptop} {
    display: flex;
    justify-content: space-around;
  }
`

const LogoContainer = styled.div`
  @media ${device.laptop} {
    display: none;
  }
`
const TypeImg = styled.img`
  position: absolute;
  top: 32px;
  right: 20px;
  width: 45px;
  height: 140px;
  z-index: 10;
  @media ${device.tablet} {
    position: absolute;
    top: 21px;
    right: 20px;
    width: 86px;
    height: 246px;
    z-index: 10;
  }
  @media ${device.laptop} {
    width: 76px;
    height: 236px;
    right: 0px;
    top: -61px;
  }
`

const TipLetter = styled.label`
  height: 100px;
  width: 100px;
  color: white;
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
  -webkit-transform-origin: left top 0;
  -ms-transform-origin: left top 0;
  transform-origin: left top 0;
  position: absolute;
  right: -45px;
  top: 144px;
  font-size: 12px;
  font-family: Titillium Bold;
  letter-spacing: 2px;
  z-index: 11;
  @media ${device.tablet} {
    right: -58px;
    top: 208px;
    font-size: 21px;
    height: 157px;
    width: 140px;
  }
  @media ${device.laptop} {
    font-size: 20px;
    letter-spacing: 3px;
    width: 145px;
    right: -87px;
    top: 129px;
  }
`

const TipLetter1 = styled.label`
  height: 124px;
  width: 110px;
  color: white;
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
  -webkit-transform-origin: left top 0;
  -ms-transform-origin: left top 0;
  -webkit-transform-origin: left top 0;
  -ms-transform-origin: left top 0;
  transform-origin: left top 0;
  position: absolute;
  right: -57px;
  top: 157px;
  font-size: 12px;
  font-family: Titillium Bold;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  letter-spacing: 2px;
  z-index: 11;
  @media ${device.tablet} {
    height: 204px;
    width: 220px;
    right: -137px;
    top: 227px;
    font-size: 21px;
    letter-spacing: 2px;
  }
  @media ${device.laptop} {
    font-size: 20px;
    letter-spacing: 3px;
    width: 178px;
    right: -119px;
    top: 144px;
  }
`

const TipLetter2 = styled.label`
  height: 100px;
  width: 100px;
  color: white;
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
  -webkit-transform-origin: left top 0;
  -ms-transform-origin: left top 0;
  -webkit-transform-origin: left top 0;
  -ms-transform-origin: left top 0;
  transform-origin: left top 0;
  position: absolute;
  right: -46px;
  top: 152px;
  font-size: 12px;
  font-family: Titillium Bold;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  letter-spacing: 0.5px;
  z-index: 11;
  @media ${device.tablet} {
    height: 200px;
    width: 200px;
    right: -118px;
    top: 241px;
    font-size: 21px;
    letter-spacing: 2px;
  }
  @media ${device.laptop} {
    font-size: 20px;
    letter-spacing: 3px;
    width: 193px;
    right: -137px;
    top: 152px;
  }
`
const Space1 = styled.div`
  width: 100%;
  height: 70px;
  @media ${device.laptop} {
    height: 0px;
  }
  @media ${device.laptopL} {
    height: 30px;
  }
  @media ${device.desktop} {
    height: 70px;
  }
`

export default ProductPage
