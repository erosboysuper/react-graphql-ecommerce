import React, { useContext, useState, useEffect } from 'react'
import Image from 'gatsby-image'
import styled from 'styled-components'
import { encode } from 'js-base64'
import { Link } from 'gatsby'

import { device } from '~/utils/device'
import { darkFont } from '~/utils/colors'
import { Letter, Space } from '~/utils/styles'
import { dateDiffInDays } from '~/utils/functions'

import ProductContext from '~/context/ProductContext'
import StoreContext from '~/context/StoreContext'

import BackImg from '~/images/Assets/Arrow-back.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'
import FadingImg from '~/images/Assets/FadingOut.svg'
import LimitedImg from '~/images/Assets/Limited-edition.svg'
import TboImg from '~/images/Assets/TboCommunity.svg'
import OrderImg from '~/images/Assets/Quick-pre-order-big.svg'

import SizeSelect from '~/components/pages/products/SizeSelect'
import ColorSelect from '~/components/pages/products/ColorSelect'
import ProductStage from '~/components/pages/products/ProductStage'
import Buy2Get1OfferBanner from '~/components/Common/Buy2Get1OfferBanner'
import ShippingInfo from '~/components/pages/products/ShippingInfo'
import Carousel from '~/components/Common/ImageSlider'
import ProductRating from '~/components/Common/ProductRating'
import WhiteSelectIcon from '~/images/Assets/White-Selected.svg'
import PledgeIcon from '~/images/Assets/Pledge-Icon.png'
import SpecialOfferIcon from '~/images/Assets/Special-Offer.png'
import BuyFreeIcon from '~/images/Assets/Buy-Free.png'
import WhiteModel from '~/images/Assets/Boxer-Brief-White.png'
import BlueModel from '~/images/Assets/DesginImgItem.png'

import 'swiper/css/swiper.css'

const stepTitle = [
  'Designed',
  'Funded',
  'Production',
  'Available: 40 days left',
]

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const StandardProduct = ({
  product,
  pageSetting,
  setProductRating,
  fundStatus,
  media = [],
}) => {
  const {
    addCartItems,
    cartItems,
    removeCartItems,
    store: { shopifyClient },
    localeSetting,
    localeFolder,
  } = useContext(StoreContext)
  const {
    color,
    size,
    setCommentActive,
    setSizeChart,
    setModal,
    variant,
    selectedOpt,
    buttonLetter,
    setButtonLetter,
  } = useContext(ProductContext)
  const mediaLength = media.length
  const [chooseNum, setChooseNum] = useState(0)
  const [startNum, setStartNum] = useState(-1)
  const [cartNum, setCartNum] = useState(0)
  const [isSold, setIsSold] = useState(!product.availableForSale)
  const [availableInDays, setAvailableInDays] = useState(null)
  const [options, setOptions] = useState({ Size: {}, Color: {} })
  const [canNotFindSize, setCanNotFindSize] = useState(false)
  const [mainStep, setMainStep] = useState(1)
  const [width, height] = useWindowSize()
  let showCompareAtPrice = false

  const variantOptions = () => {
    let _options = { ...options }
    product.variant.forEach(v => {
      if (v.size) {
        if (!_options['Size'][v.size.name]) {
          _options['Size'][v.size.name] = {
            helpText: v.size.helpText,
            colors: {},
            sold: false,
          }
        }
        if (v.color) {
          _options['Size'][v.size.name]['helpText'] = v.size.helpText || ''
          _options['Size'][v.size.name]['colors'][v.color.name] =
            v.availableForSale
        }
      }
      if (v.color) {
        const colorCode = v.color.colorCode
          ? v.color.colorCode.hex
          : v.color.colorImage
            ? v.color.colorImage.url
            : null

        if (colorCode) {
          _options['Color'][v.color.name] = colorCode
        }
      }
    })

    Object.keys(_options['Size']).forEach(sizeCode => {
      const hasActiveColors = Object.values(
        _options['Size'][sizeCode]['colors']
      ).filter(x => x)
      if (hasActiveColors.length === 0) {
        _options['Size'][sizeCode].sold = true
        setCanNotFindSize(true)
      }
    })

    setOptions(_options)
  }

  const ChooseDesktopPictureLap = index => {
    setChooseNum(index)
    slideImage1(index)
  }

  const showVideo = () => {
    const index = mediaLength + 1
    ChooseDesktopPictureLap(index)
  }

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

  const slideImage1 = index => {
    if (index === 0) {
      const ele = document.querySelector('ul').childNodes[0]
      ele.style.marginTop = '0px'
      setStartNum(index)
    } else if (mediaLength <= 5) {
      const ele = document.querySelector('ul').childNodes[0]
      ele.style.marginTop = '0px'
    } else if (index + 4 > mediaLength && mediaLength > 5) {
      const ele = document.querySelector('ul').childNodes[0]

      if (width >= 1440) ele.style.marginTop = `${-117 * (mediaLength - 4)}px`
      else ele.style.marginTop = `${-83 * (mediaLength - 4)}px`

      setStartNum(index)
    } else {
      const ele = document.querySelector('ul').childNodes[0]

      if (width >= 1440) ele.style.marginTop = `${-117 * (index - 1)}px`
      else ele.style.marginTop = `${-83 * (index - 1)}px`
      setStartNum(index)
    }
  }

  useEffect(() => {
    if (startNum === 0 || startNum === -1 || mediaLength <= 5) {
      const ele = document.querySelector('ul').childNodes[0]
      ele.style.marginTop = '0px'
    } else if (startNum + 4 > mediaLength && mediaLength > 5) {
      const ele = document.querySelector('ul').childNodes[0]
      if (width >= 1440) ele.style.marginTop = `${-117 * (mediaLength - 4)}px`
      else ele.style.marginTop = `${-83 * (mediaLength - 4)}px`
    } else {
      const ele = document.querySelector('ul').childNodes[0]
      if (width >= 1440) ele.style.marginTop = `${-117 * (startNum - 1)}px`
      else ele.style.marginTop = `${-83 * (startNum - 1)}px`
    }
  }, [width])

  const addToCart = () => {
    if (
      buttonLetter !== 'SELECT YOUR SIZE' &&
      buttonLetter !== 'Not available yet'
    ) {
      variant.product_shopify_id = product.shopifyId
      variant.product_name = product.name
      variant.product_handle = product.handle
      variant.isSingleProduct = product.isSingleProduct
      addCartItems([variant])
    }
  }

  const removeToCart = () => {
    if (
      buttonLetter !== 'SELECT YOUR SIZE' &&
      buttonLetter !== 'Not available yet'
    ) {
      variant.product_name = product.name
      variant.product_handle = product.handle
      variant.isSingleProduct = product.isSingleProduct
      removeCartItems([variant])
    }
  }

  useEffect(() => {
    checkCompareAtPrice()
  }, [variant])

  useEffect(() => {
    if (product.isTboCommunity && product.availabilityDate) {
      let _availableInDays = dateDiffInDays(
        new Date(),
        new Date(product.availabilityDate)
      )
      if (_availableInDays < 1) {
        _availableInDays = null
      }
      setAvailableInDays(_availableInDays)
    }

    // LIVE DATA FROM SHOPIFY FOR INDIVIDUAL PRODUCT //
    const pId = encode(`gid://shopify/Product/${product.shopifyId}`)
    if (shopifyClient && shopifyClient.product) {
      shopifyClient.product.fetch(pId).then(fetchedProduct => {
        if (fetchedProduct) {
          product.availableForSale = fetchedProduct.availableForSale
          setIsSold(!product.availableForSale)

          product.variant.forEach(v => {
            const result = fetchedProduct.variants.filter(
              fv => fv.sku === v.sku
            )
            if (result.length > 0) {
              v.availableForSale = result[0].available
            }
          })
          variantOptions()
        } else {
          setButtonLetter('Not available yet')
        }
      })
    }
  }, [shopifyClient])

  useEffect(() => {
    const selectedVariant = product.variant.filter(
      x => x.size.name === size && x.color.name === color
    )
    if (size !== '') setButtonLetter('ADD TO CART')
    let new_cartItems = { ...cartItems }
    let existingItem = null
    if (selectedVariant.length > 0) {
      existingItem = new_cartItems[selectedVariant[0].id]
    }
    if (existingItem) {
      setCartNum(existingItem.num)
    } else setCartNum(0)
  }, [cartItems, size, color])

  return (
    <React.Fragment>
      <Container>
        <ArrowBack
          onClick={() => {
            window.history.back()
          }}
        >
          <img src={BackImg} alt="Back Image" />
        </ArrowBack>
        <PreviewContainer>
          <OneRow>
            <SliderLap>
              {media.map((item, index) => {
                return (
                  <PrevContainerLap
                    key={index}
                    onClick={() => ChooseDesktopPictureLap(index)}
                    opacity={chooseNum === index ? 1 : 0.5}
                  >
                    <Image fluid={item.fluid} />
                  </PrevContainerLap>
                )
              })}
              {product.productVideo && product.productVideo.video && (
                <PrevContainerLap
                  onClick={() => showVideo()}
                  opacity={chooseNum === mediaLength + 1 ? 1 : 0.5}
                >
                  <img
                    src={product.productVideo.video.pngThumbnail}
                    alt="Video Image"
                  />
                </PrevContainerLap>
              )}
            </SliderLap>
            <ProductShow>
              <ImageContainer>
                {mediaLength > 0 &&
                  media[chooseNum] &&
                  media[chooseNum].fluid && (
                    <Image fluid={media[chooseNum].fluid} />
                  )}
                {chooseNum === mediaLength + 1 && (
                  <VideoImage>
                    <video
                      width={`100%`}
                      controls
                      controlsList={`nodownload`}
                      poster={product.productVideo.video.gifThumbnail}
                    >
                      <source
                        src={product.productVideo.video.mp4Url}
                        type="video/mp4"
                      />
                    </video>
                  </VideoImage>
                )}
              </ImageContainer>
            </ProductShow>
            <ImgContainerMobile opacity={isSold ? 0.5 : 1}>
              <Carousel title="Carousel">
                {media &&
                  mediaLength > 0 &&
                  media.map((item, index) => {
                    return (
                      <Item key={index + 'item'}>
                        <Image fluid={item.fluid} />
                      </Item>
                    )
                  })}
                {product.productVideo && product.productVideo.video ? (
                  <Item>
                    <VideoImage>
                      <video
                        width={`100%`}
                        controls
                        controlsList={`nodownload`}
                        poster={product.productVideo.video.gifThumbnail}
                      >
                        <source
                          src={product.productVideo.video.mp4Url}
                          type="video/mp4"
                        />
                      </video>
                    </VideoImage>
                  </Item>
                ) : (
                    <></>
                  )}
              </Carousel>
            </ImgContainerMobile>
          </OneRow>
          <DesktopContain>
            {(() => {
              switch (fundStatus) {
                case 'funding':
                  return ''
                default:
                  return (
                    <ShippingInfo
                      guaranteeHeading={pageSetting.guaranteeHeading || null}
                      guaranteeAnchorText={
                        pageSetting.guaranteeAnchorText || null
                      }
                    />
                  )
              }
            })()}
          </DesktopContain>
        </PreviewContainer>
        <InformationContainer>
          <DesktopContainer>
            {product.isFadingOut === true && (
              <div>
                <TypeImg src={FadingImg} alt="FadingImg" />
                <TipLetter top={10}>FADING OUT</TipLetter>
              </div>
            )}
            {product.isLimitedEdition && (
              <div>
                <TypeImg src={LimitedImg} alt="LimitedImg" />
                <TipLetter1 top={10}>Limited Edition</TipLetter1>
              </div>
            )}
            {product.isTboCommunity && (
              <div>
                <TypeImg src={TboImg} alt="TboImg" />
                <TipLetter2 top={10}>TBô COMMUNITY</TipLetter2>
              </div>
            )}
          </DesktopContainer>
          <DesktopContain>
            <Space height={30} />
          </DesktopContain>
          {(() => {
            switch (fundStatus) {
              case 'normal':
                return (
                  <React.Fragment>
                    <Title>{product.name}</Title>

                    <StarContainer>
                      <ProductRating
                        product={product}
                        setProductRating={setProductRating}
                      />
                    </StarContainer>
                    <FlexBox>
                      {!isSold &&
                        product.variant &&
                        product.variant.length > 0 && (
                          <LetterContainer>
                            <PriceLetter>
                              <Letter
                                font="Titillium Bold"
                                size={14}
                                sizeTablet={22}
                                sizeLaptop={14}
                                sizeLaptopL={17}
                                sizeDesktop={22}
                                color={darkFont}
                              >
                                {localeSetting.CURRENCY_SYMBOL}
                              </Letter>
                              <Letter
                                font="Titillium Bold"
                                size={20}
                                sizeTablet={28}
                                sizeLaptop={19}
                                sizeLaptopL={23}
                                sizeDesktop={28}
                                color={darkFont}
                              >
                                {variant.id
                                  ? variant.price
                                  : product.variant[0].price}
                              </Letter>
                              &nbsp; &nbsp;
                            </PriceLetter>
                            {!isSold && showCompareAtPrice && (
                              <Del>
                                <Letter
                                  font="Titillium Web"
                                  size={16}
                                  sizeLaptop={14}
                                  sizeTablet={21}
                                  sizeLaptopL={18}
                                  sizeDesktop={21}
                                  color="#A9ACAF"
                                >
                                  {localeSetting.CURRENCY_SYMBOL}
                                  {(variant.id
                                    ? variant.compareAtPrice
                                    : product.variant[0].compareAtPrice
                                  ).toFixed(2)}
                                </Letter>
                              </Del>
                            )}
                            &nbsp;
                          </LetterContainer>
                        )}
                      {isSold ? (
                        <LetterBox>
                          <Letter
                            font="Titillium Bold"
                            size={16}
                            sizeTablet={21}
                            sizeLaptopL={18}
                            sizeLaptop={14}
                            sizeDesktop={21}
                            color="#A9ACAF"
                          >
                            SOLD OUT
                          </Letter>
                        </LetterBox>
                      ) : product.taxInfo ? (
                        <LetterContainer>
                          <Letter
                            font="Titillium Web"
                            size={14}
                            sizeLaptop={12}
                            sizeTablet={18}
                            sizeLaptopL={15}
                            sizeDesktop={18}
                            color="#A9ACAF"
                          >
                            &nbsp; &nbsp; {product.taxInfo}
                          </Letter>
                          {availableInDays && (
                            <Letter
                              font="Titillium Bold"
                              size={14}
                              sizeLaptop={12}
                              sizeTablet={18}
                              sizeLaptopL={15}
                              sizeDesktop={18}
                              color="#FF8C00"
                            >
                              &nbsp; {availableInDays} days until shipping
                            </Letter>
                          )}

                          {!isSold &&
                            showCompareAtPrice &&
                            product.variant[0].compareAtPrice >
                            product.variant[0].price && (
                              <Letter
                                font="Titillium Bold"
                                size={16}
                                sizeLaptop={14}
                                sizeTablet={21}
                                sizeLaptopL={18}
                                sizeDesktop={21}
                                color="#FF8C00"
                              >
                                &nbsp;&middot;&nbsp; Save &nbsp;{' '}
                                {localeSetting.CURRENCY_SYMBOL}
                                {(
                                  product.variant[0].compareAtPrice -
                                  product.variant[0].price
                                ).toFixed(2)}
                              </Letter>
                            )}
                        </LetterContainer>
                      ) : (
                            ``
                          )}
                    </FlexBox>
                    {product.isSingleProduct && (
                      <React.Fragment>
                        <Space height={20} />
                        <Buy2Get1OfferBanner />
                      </React.Fragment>
                    )}
                    {product.isTboCommunity && (
                      <React.Fragment>
                        <Space height={40} />
                        <ProductStage product={product} />
                        <Space height={60} />
                      </React.Fragment>
                    )}
                    <SpaceAboveSize />

                    {!isSold && Object.keys(options['Size']).length > 0 && (
                      <div>
                        <SubTitle>
                          <Letter
                            font="Titillium Bold"
                            color={darkFont}
                            size={16}
                            sizeLaptop={15}
                            sizeTablet={22}
                            sizeLaptopL={19}
                            sizeDesktop={22}
                          >
                            Size
                          </Letter>
                          {product.sizeChart && (
                            <SizeCheck
                              onClick={() => {
                                setSizeChart(true)
                                setModal(true)
                              }}
                            >
                              <Letter
                                font="Titillium Web"
                                color="#FF8C00"
                                size={14}
                                sizeLaptop={13}
                                sizeLaptopL={16}
                                sizeTablet={18}
                                sizeDesktop={18}
                              >
                                What's my size? &nbsp;{' '}
                                <img src={ArrowImg} alt="arrow" />
                              </Letter>
                            </SizeCheck>
                          )}
                        </SubTitle>
                        <SizeSelect sizes={options['Size']} />
                      </div>
                    )}
                    <SizeComment decoration={'underline'}>
                      {(isSold || canNotFindSize) && (
                        <Letter
                          font="Titillium Bold"
                          size={16}
                          sizeLaptop={15}
                          sizeLaptopL={19}
                          sizeDesktop={22}
                          color={darkFont}
                          onClick={() => setCommentActive(true)}
                        >
                          Can’t find your size?
                        </Letter>
                      )}
                    </SizeComment>
                    {!isSold && Object.keys(options['Color']).length > 0 && (
                      <div>
                        <SubTitle>
                          <Letter
                            font="Titillium Bold"
                            color={darkFont}
                            size={16}
                            sizeLaptopL={19}
                            sizeLaptop={16}
                            sizeTablet={22}
                            sizeDesktop={22}
                          >
                            Color
                          </Letter>
                          {!size && (
                            <SizeCheck>
                              <Letter
                                font="Titillium Web"
                                color="#FF8C00"
                                size={14}
                                sizeLaptopL={16}
                                sizeLaptop={13}
                                sizeTablet={18}
                                sizeDesktop={18}
                              >
                                Select size to choose color
                              </Letter>
                            </SizeCheck>
                          )}
                        </SubTitle>
                        <ColorSelect
                          colors={options['Color']}
                          isRectangular={true}
                          showBorder={true}
                          width={58}
                          height={56}
                          widthDesktop={105}
                          heightDesktop={105}
                          additionalCss={`margin: 0 5px 5px 0;`}
                          preSelectedColor={
                            selectedOpt[product.id] &&
                              selectedOpt[product.id].color
                              ? selectedOpt[product.id].color
                              : null
                          }
                        />
                        <br />{' '}
                      </div>
                    )}
                    {product.isTboCommunity === true && (
                      <div>
                        {' '}
                        {cartNum === 0 && (
                          <SelectButton
                            onClick={() => addToCart()}
                            className="add-to-cart"
                          >
                            {buttonLetter}
                          </SelectButton>
                        )}
                        {cartNum > 0 && (
                          <CartButton>
                            <CountPart>
                              <RemoveCart onClick={() => removeToCart()}>
                                -
                              </RemoveCart>{' '}
                              &nbsp;&nbsp;{cartNum} &nbsp;&nbsp;
                              <AddCart
                                onClick={() => addToCart()}
                                className="add-to-cart"
                              >
                                {' '}
                                +
                              </AddCart>{' '}
                            </CountPart>
                            <CartLetter>
                              <Link to={`/${localeFolder}/cart`}>
                                IN YOUR CART
                              </Link>
                            </CartLetter>
                            <CartImg>
                              <Link to={`/${localeFolder}/cart`}>
                                {' '}
                                <img src={OrderImg} alt="OrderImg" />
                              </Link>
                            </CartImg>
                          </CartButton>
                        )}
                      </div>
                    )}
                    {!isSold && product.isTboCommunity !== true && (
                      <div>
                        {' '}
                        {cartNum === 0 && (
                          <SelectButton
                            onClick={() => addToCart()}
                            className="add-to-cart"
                          >
                            {buttonLetter}
                          </SelectButton>
                        )}
                        {cartNum > 0 && (
                          <CartButton>
                            <CountPart>
                              <RemoveCart onClick={() => removeToCart()}>
                                -
                              </RemoveCart>{' '}
                              &nbsp;&nbsp;{cartNum} &nbsp;&nbsp;
                              <AddCart
                                onClick={() => addToCart()}
                                className="add-to-cart"
                              >
                                {' '}
                                +
                              </AddCart>{' '}
                            </CountPart>
                            <CartLetter>
                              {' '}
                              <Link to={`/${localeFolder}/cart`}>
                                IN YOUR CART{' '}
                              </Link>
                            </CartLetter>
                            <CartImg>
                              <Link to={`/${localeFolder}/cart`}>
                                {' '}
                                <img src={OrderImg} alt="OrderImg" />
                              </Link>
                            </CartImg>
                          </CartButton>
                        )}
                      </div>
                    )}
                    <SubTitle>
                      <Letter
                        font="Titillium Bold"
                        color={darkFont}
                        size={16}
                        sizeLaptop={15}
                        sizeLaptopL={19}
                        sizeTablet={22}
                        sizeDesktop={22}
                      >
                        Description
                      </Letter>
                    </SubTitle>
                    <Description>
                      <Letter
                        font="Titillium Light"
                        size={16}
                        sizeTablet={22}
                        sizeLaptop={15}
                        sizeLaptopL={19}
                        sizeDesktop={22}
                        color={darkFont}
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </Description>
                  </React.Fragment>
                )
              case 'funding':
                return (
                  <React.Fragment>
                    <Title>Boxer Ultra Sport</Title>
                    <CategoryButtonWrapper>
                      <CategoryButton>SPORTS</CategoryButton>
                    </CategoryButtonWrapper>

                    <PriceWrapper>
                      <h3>$22.99</h3> <span>30/40 Pre-orders</span>
                    </PriceWrapper>
                    <StageWrapper>
                      <StageTitle>Product Stage</StageTitle>

                      <ProressBarContainer>
                        <CheckedStepIcon>
                          <img src={WhiteSelectIcon} alt />
                        </CheckedStepIcon>
                        <BlankStepIcon></BlankStepIcon>
                        <ProgressBarWrapper>
                          <ProgressLine />
                          <WhiteLine />
                        </ProgressBarWrapper>
                      </ProressBarContainer>

                      <StageDescription>
                        <div>
                          <span>Designed</span>
                        </div>
                        <div>
                          75% founded · <span>24 days left</span>
                        </div>
                      </StageDescription>
                    </StageWrapper>

                    <PledgeButton>
                      PLEDGE
                      <img src={PledgeIcon} alt />
                    </PledgeButton>

                    <PledgeDescription>
                      *This design will become a TBo Community product if is
                      founded before deadline.
                    </PledgeDescription>

                    <FundingDescription>
                      <FundingDescriptionTitle>
                        Description
                      </FundingDescriptionTitle>
                      <FundingDescriptionText>
                        The Must-have Boxer Briefs Long have been created for
                        our TBô Community because of (description and
                        explanation of why was created, plus new benefits).
                      </FundingDescriptionText>
                    </FundingDescription>
                  </React.Fragment>
                )

              case 'selected':
                return (
                  <React.Fragment>
                    {' '}
                    <Title>Boxer Ultra Sport</Title>
                    <CategoryButton>SPORTS</CategoryButton>
                    <PriceWrapper>
                      <h3>$22.99</h3> <span>30/40 Pre-orders</span>
                      <TimeLine>
                        <Letter
                          font="Titillium Bold"
                          size={14}
                          sizeDesktop={18}
                          sizeLaptopL={18}
                          sizeLaptop={16}
                          color={'#ff8c00'}
                        >
                          Available in 40 days
                        </Letter>
                      </TimeLine>
                    </PriceWrapper>
                    <SpecialButtonWrapper>
                      <SpecialButtonItem>
                        <img src={SpecialOfferIcon} alt />
                        <Letter
                          font="Titillium Bold"
                          size={14}
                          sizeDesktop={18}
                          sizeLaptopL={18}
                          sizeLaptop={16}
                          color={'#ff8c00'}
                        >
                          SPECIAL OFFER
                        </Letter>
                      </SpecialButtonItem>
                      <BuyFreeButtonItem>
                        <img src={BuyFreeIcon} alt />
                        <Letter
                          font="Titillium Bold"
                          size={14}
                          sizeDesktop={18}
                          sizeLaptopL={18}
                          sizeLaptop={16}
                        >
                          BUY 2 GET 1 FREE
                        </Letter>
                      </BuyFreeButtonItem>
                    </SpecialButtonWrapper>
                    <ProductStageWrapper>
                      <ProductStageTitle>Product Stage</ProductStageTitle>
                      <CoCreateLink>
                        What's to Co-Create?{' '}
                        <img src={ArrowImg} alt="ArrowImg" />
                      </CoCreateLink>
                    </ProductStageWrapper>
                    <StepperContainer>
                      {stepTitle.map((title, index) => {
                        return (
                          <StepperItem
                            zIndex={index}
                            current={mainStep === index - 1}
                            completed={index < mainStep + 1}
                          >
                            <span>{title}</span>
                            <HideItem
                              enable={
                                index === 0 || index === stepTitle.length - 1
                              }
                              isLast={index === stepTitle.length - 1}
                            />
                            <StepperBar completed={index < mainStep + 1} />
                            <StepperRound
                              completed={index < mainStep + 1}
                              isLast={index === stepTitle.length - 1}
                              isFirst={index === 0}
                            >
                              {index < mainStep + 1 ? (
                                <img src={WhiteSelectIcon} alt />
                              ) : (
                                  ''
                                )}
                            </StepperRound>
                          </StepperItem>
                        )
                      })}
                    </StepperContainer>
                    <SizeWrapper>
                      <SizeWrapperHeader>
                        <SizeTitle>Size</SizeTitle>
                        <SizeLink>
                          What's my size?
                          <img src={ArrowImg} alt="ArrowImg" />
                        </SizeLink>
                      </SizeWrapperHeader>
                      <SizeBody>
                        <SizeItem state={'hidden'}>
                          <SizeItemTitle>XS</SizeItemTitle>
                          <SizeDescription>24-28"</SizeDescription>
                          <HiddenBar1></HiddenBar1>
                          <HiddenBar2></HiddenBar2>
                        </SizeItem>

                        <SizeItem state={'hidden'}>
                          <SizeItemTitle>S</SizeItemTitle>
                          <SizeDescription>28-31"</SizeDescription>
                          <HiddenBar1></HiddenBar1>
                          <HiddenBar2></HiddenBar2>
                        </SizeItem>

                        <SizeItem state={'active'}>
                          <SizeItemTitle>M</SizeItemTitle>
                          <SizeDescription>31-33"</SizeDescription>
                        </SizeItem>

                        <SizeItem state={'normal'}>
                          <SizeItemTitle>L</SizeItemTitle>
                          <SizeDescription>33-36"</SizeDescription>
                        </SizeItem>

                        <SizeItem state={'normal'}>
                          <SizeItemTitle>XL</SizeItemTitle>
                          <SizeDescription>36-40"</SizeDescription>
                        </SizeItem>

                        <SizeItem state={'hidden'}>
                          <SizeItemTitle>XXL</SizeItemTitle>
                          <SizeDescription>40-44"</SizeDescription>
                          <HiddenBar1></HiddenBar1>
                          <HiddenBar2></HiddenBar2>
                        </SizeItem>
                      </SizeBody>
                    </SizeWrapper>
                    <NoFindSize>Can't find your size?</NoFindSize>
                    <ColorWrapper>
                      <ColorTitle>Color</ColorTitle>
                      <ColorBody>
                        <ColorItem state={'active'}>
                          <img src={WhiteModel} alt />
                        </ColorItem>

                        <ColorItem state={'normal'}>
                          <img src={BlueModel} alt />
                        </ColorItem>
                      </ColorBody>
                    </ColorWrapper>
                    <PreOrderButton>PRE-ORDER</PreOrderButton>
                    <PreOrderDescription>
                      *Estimated delivery on 13th December.
                    </PreOrderDescription>
                    <SelectedDescription>
                      <SelectedDescriptionTitle>
                        Description
                      </SelectedDescriptionTitle>
                      <SelectedDescriptionText>
                        The Must-have Boxer Briefs Long have been created for
                        our TBô Community because of (description and
                        explanation of why was created, plus new benefits).
                      </SelectedDescriptionText>
                    </SelectedDescription>
                  </React.Fragment>
                )
            }
          })()}
        </InformationContainer>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  @media ${device.laptop} {
    display: flex;
  }
`

const PreviewContainer = styled.div`
  @media ${device.laptop} {
    width: 60%;
    display: block;
  }
`
const InformationContainer = styled.div`
  // margin-top: 50px;
  @media ${device.laptop} {
    width: 34%;
    margin-left: 3%;
    margin-top: 40px;
  }
  @media ${device.laptopL} {
    width: 33%;
  }
  @media ${device.desktop} {
    width: 31%;
  }
`

const ArrowBack = styled.div`
  position: fixed;
  top: 30px;
  left: 10px;
  z-index: 2;
  @media ${device.laptop} {
    & img {
      width: 70%;
    }
  }
  @media ${device.laptopL} {
    & img {
      width: 80%;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 100%;
    }
  }
`

const ImgContainerMobile = styled.div`
  width: 100%;
  padding: 0px 0px 10px 0px;
  opacity: ${props => props.opacity};
  position: relative;
  display: block;
  & > div {
    padding-bottom: 25px;
    & > div:nth-child(2) {
      & span {
        width: 25px;
        height: 4px;
        background: rgb(174 174 183);
        margin: 0px 5px 0px 0px !important;
        border-radius: 0%;
      }
      & .swiper-pagination-bullet-active {
        background-color: black;
      }
    }
  }
  @media ${device.laptop} {
    width: 705px;
    margin-top: 16px;
    display: none;
  }
`

const ProductShow = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    align-items: center;
    width: 480px;
    margin-top: 16px;
  }
  @media ${device.laptopL} {
    width: 580px;
  }
  @media ${device.desktop} {
    width: 705px;
  }
`

const SliderLap = styled.ul`
  display: none;
  @media ${device.laptop} {
    padding: 0px;
    width: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 16px;
    max-height: 480px;
    overflow: hidden;
    height: 580px;
    & div {
      -webkit-transition: all 500ms ease-in;
      -moz-transition: all 500ms ease-in;
      -o-transition: all 500ms ease-in;
      transition: all 500ms ease-in;
      width: 75px;
    }
  }
  @media ${device.laptopL} {
    max-height: 570px;
    width: 90px;
    display: flex;
    & div {
      width: 90px;
    }
  }
  @media ${device.desktop} {
    width: 100px;
    max-height: 705px;
    height: 705px;
    display: flex;
  }
`

const LetterContainer = styled.div`
  & {
    text-align: center;
  }
  @media ${device.laptop} {
    text-align: start;
  }
`

const LetterBox = styled.div`
  & {
    text-align: center;
    margin-top: 20px;
  }
  & span {
    letter-spacing: 1px;
  }
  @media ${device.laptop} {
    text-align: start;
  }
`

const Del = styled.del`
  & {
    color: #a9acaf;
    text-decoration: none;
    position: relative;
    margin-top: 10px;
  }
  &:before {
    content: ' ';
    display: block;
    width: 90%;
    border-top: 2px solid #a9acaf;
    height: 8px;
    position: absolute;
    bottom: 2px;
    left: 7px;
    transform: rotate(7deg);
  }
`

const PriceLetter = styled.span`
  margin-top: 5px;
`

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  @media ${device.tablet} {
    font-size: 28px;
  }
  @media ${device.laptop} {
    font-size: 14px;
    justify-content: start;
    color: #ff8c00;
  }
  @media ${device.laptopL} {
    font-size: 17px;
  }
  @media ${device.desktop} {
    font-size: 20px;
  }
`

const Title = styled.div`
  text-align: center;
  font-family: Titillium Bold;
  font-size: 24px;
  color: ${darkFont};
  @media ${device.tablet} {
    font-size: 34px;
  }
  @media ${device.laptop} {
    font-size: 26px;
    text-align: start;
    width: 80%;
    margin-bottom: 20px;
    line-height: 1.2em;
  }
  @media ${device.laptopL} {
    font-size: 30px;
    text-align: start;
    margin-bottom: 20px;
  }
  @media ${device.desktop} {
    font-size: 40px;
  }
`

const CategoryButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media ${device.tablet} {
    justify-content: flex-start;
  }
`

const CategoryButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  border: 1px solid gray;
  color: gray;
  border-radius: 15px;
`

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0px 60px 0px;
  & h3 {
    font-size: 24px;
    font-family: Titillium Bold;
    margin-right: 20px;
    margin-bottom: 0px;
  }
  & span {
    font-size: 16px;
    color: #a9acaf;
  }

  @media ${device.tablet} {
    margin: 10px 0px 60px 0px;
    flex-direction: row;
    align-items: flex-end;
  }
`

const StageWrapper = styled.div`
  padding: 0px 20px;
  @media ${device.tablet} {
    padding: 0;
  }
`

const StageTitle = styled.div`
  font-size: 20px;
  font-family: Titillium Bold;
  margin-bottom: 20px;
`

const ProressBarContainer = styled.div`
  position: relative;
`

const CheckedStepIcon = styled.div`
  position: absolute;
  left: -2px;
  top: 50%;
  width: 25px;
  height: 25px;
  z-index: 10;
  background-color: white;
  border-radius: 50%;
  transform: translate(0, -50%);
  & img {
    position: absolute;
    left: 1px;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

const BlankStepIcon = styled.div`
  position: absolute;
  right: -2px;
  top: 50%;
  width: 25px;
  height: 25px;
  z-index: 10;
  border: 1px solid gray;
  border-radius: 50%;
  background-color: white;
  transform: translate(0, -50%);
`

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border: 1px solid gray;
`

const ProgressLine = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
  width: 75%;
  height: calc(100% + 2px);
  background-color: #ff8c00;
`

const WhiteLine = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 25%;
  height: 100%;
  background-color: white;
`

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  overflow: hidden;
`

const StageDescription = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  & span {
    color: #ff8c00;
    font-family: Titillium Bold;
  }
`

const StepperItem = styled.div`
  position: relative;
  z-index: ${props => (props.zIndex ? props.zIndex : 1)};
  & span {
    color: ${props =>
    props.current ? '#161617' : props.completed ? '#f57b00' : 'gray'};
    font-family: ${props =>
    props.current || props.completed
      ? 'Titillium Bold'
      : 'font-family: Titillium Web'};
  }
  padding: 0 20px;
  &:first-child {
    padding: 0 20px 0px 0px;
    & > div:nth-child(3) {
      left: 0px;
    }
  }

  @media ${device.tablet} {
    padding: 0px;
    &:first-child {
      padding: 0px;
    }
  }
`

const StepperRound = styled.div`
  position: absolute;
  top: -25px;
  width: 24px;
  background-color: white;
  height: 24px;
  border-radius: 50%;
  border: ${props => (props.completed ? 'none' : '1px solid gray')};
  z-index: 10;
  left: ${props => (props.isLast || props.isFirst ? 'unset' : '50%')};
  transform: ${props =>
    props.isLast || props.isFirst ? 'unset' : 'translate(-50%, 0)'};
  right: ${props => (props.isLast ? 0 : '')};
  & img {
    position: absolute;
    left: 1px;
    top: 0;
    width: 100%;
  }
`

const HideItem = styled.div`
  position: absolute;
  width: 15px;
  height: 100%;
  top: -26px;
  background-color: #f2f2f7;
  z-index: 8;
  display: ${props => (props.enable ? 'block' : 'none')};
  right: ${props => (props.isLast ? 0 : '')};
`

const StepperBar = styled.div`
  position: absolute;
  top: -19px;
  left: 50%;
  min-width: 500px;
  height: 10px;
  border-top: ${props => (props.completed ? '' : '1px solid gray')};
  border-bottom: ${props => (props.completed ? '' : '1px solid gray')};
  background-color: ${props => (props.completed ? '#f57b00' : '#f2f2f7')};
  @media ${device.tablet} {
  }
`

const SizeWrapper = styled.div`
  margin-top: 25px;
  width: 100%;
`

const SizeWrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`

const SizeTitle = styled.div`
  font-size: 18px;
  font-family: Titillium Bold;
`

const SizeLink = styled.div`
  font-size: 14px;
  color: #ff8c00;
`

const SizeBody = styled.div`
  display: flex;
`

const SizeItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  width: 80px;
  height: 80px;
  margin-right: 5px;
  background-color: ${props =>
    props.state === 'active'
      ? '#FF8C00'
      : props.state === 'normal'
        ? 'white'
        : '#f7f7f9'};
  color: ${props =>
    props.state === 'active'
      ? 'white'
      : props.state === 'normal'
        ? '#202122'
        : '#CECECE'};
  & div {
    &:first-child {
      font-family: ${props =>
    props.state === 'active' ? 'Titillium Bold' : 'Titillium Web'};
    }
  }
`

const SizeItemTitle = styled.div`
  font-size: 18px;
`

const SizeDescription = styled.div`
  font-size: 14px;
`

const HiddenBar1 = styled.div`
  position: absolute;
  left: -16px;
  top: 50%;
  width: 141%;
  height: 1px;
  background-color: #cecece;
  transform: rotate(45deg);
`

const HiddenBar2 = styled.div`
  position: absolute;
  left: -16px;
  top: 50%;
  width: 141%;
  height: 1px;
  background-color: #cecece;
  transform: rotate(-45deg);
`

const NoFindSize = styled.div`
  margin-top: 15px;
  font-family: Titillium Bold;
  font-size: 18px;
`

const ColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const ColorTitle = styled.div`
  font-family: Titillium Bold;
`

const ColorBody = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
`

const ColorItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  background-color: ${props =>
    props.state === 'active' ? '#FF8C00' : 'white'};
  border: ${props => (props.state === 'active' ? 'none' : '1px solid gray')};
  cursor: pointer;
  & img {
    width: 90%;
    height: auto;
  }
`

const PreOrderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #ff8c00;
  font-size: 18px;
  font-family: Titillium Bold;
  width: 100%;
  height: 60px;
  margin-top: 25px;
`

const PreOrderDescription = styled.div`
  margin-top: 5px;
  color: #a9acaf;
  font-size: 14px;
`

const SelectedDescription = styled.div`
  margin-top: 25px;
`

const SelectedDescriptionTitle = styled.div`
  font-family: Titillium Bold;
`

const SelectedDescriptionText = styled.div`
  margin-top: 5px;
`

const PledgeButton = styled.div`
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-top: 50px;
  font-size: 16px;
  font-family: Titillium Bold;
  color: white;
  background-color: #ff8c00;
  cursor: pointer;
  letter-spacing: 3px;
  & img {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    width: 23px;
    height: auto;
  }

  @media ${device.tablet} {
    display: flex;
  }
`

const PledgeDescription = styled.div`
  margin-top: 15px;
  padding: 0 20px;
  font-size: 15px;
  color: gray;

  @media ${device.tablet} {
    margin-top: 10px;
    padding: 0;
  }
`

const FundingDescription = styled.div`
  padding: 0 20px;

  @media ${device.tablet} {
    padding: 0;
  }
`

const FundingDescriptionTitle = styled.div`
  margin-top: 25px;
  font-size: 20px;
  font-family: Titillium Bold;
`

const FundingDescriptionText = styled.div`
  font-size: 17px;
  margin-bottom: 40px;
`

const SpecialButtonWrapper = styled.div`
  position: relative;  
  margin 60px 0px;
  height: 50px;
  width: 100%;
`

const ProductStageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const ProductStageTitle = styled.div`
  font-family: Titillium Bold;
`

const CoCreateLink = styled.div`
  color: #ff8c00;
  font-size: 14px;
`

const SpecialButtonItem = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 45%;
  height: 100%;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
  & span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
  &:hover {
    & span {
      transform: translate(-50%, -50%) scale(1.05);
    }
  }
`

const BuyFreeButtonItem = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 56%;
  height: 100%;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
  & span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }
  &:hover {
    & span {
      transform: translate(-50%, -50%) scale(1.05);
    }
  }
`

const TimeLine = styled.div``

const SubTitle = styled.div`
  position: relative;
  margin-left: 16px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  @media ${device.tablet} {
    margin-left: 5%;
  }
  @media ${device.laptop} {
    margin-left: 0px;
  }
`

const SizeCheck = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
`

const Description = styled.div`
  padding: 0% 5%;
  @media ${device.laptop} {
    padding: 0px;
    & h2 {
      font-size: 1.5rem;
    }
  }
  @media ${device.laptopL} {
    padding: 0px;
    & h2 {
      font-size: 1.5rem;
    }
  }
  @media ${device.desktop} {
    padding: 0px;
    & h2 {
      font-size: 2rem;
    }
  }
`

const SizeComment = styled.div`
  & {
    margin-left: 5%;
    margin-top: 10px;
    cursor: pointer;
  }
  & span {
    text-decoration: ${props => props.decoration};
  }
  @media ${device.laptop} {
    margin-left: 0px;
    margin-bottom: 30px;
  }
`

const TypeImg = styled.img`
  position: absolute;
  top: -12px;
  right: 20px;
  width: 45px;
  height: 140px;
  @media ${device.laptop} {
    width: 48px;
    height: 221px;
    right: -4px;
    top: -89px;
  }
  @media ${device.laptopL} {
    width: 60px;
    height: 236px;
    right: 0px;
    top: -81px;
  }
  @media ${device.desktop} {
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
  top: 95px;
  font-size: 12px;
  font-family: Titillium Bold;
  letter-spacing: 2px;
  @media ${device.laptop} {
    font-size: 14px;
    letter-spacing: 3px;
    width: 141px;
    right: -107px;
    top: 75px;
  }
  @media ${device.laptopL} {
    font-size: 19px;
    letter-spacing: 3px;
    width: 145px;
    right: -97px;
    top: 106px;
  }
  @media ${device.desktop} {
    font-size: 20px;
    letter-spacing: 3px;
    width: 145px;
    right: -87px;
    top: 129px;
  }
`

const TipLetter1 = styled.label`
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
  top: 105px;
  font-size: 12px;
  font-family: Titillium Bold;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  letter-spacing: 0.5px;
  @media ${device.laptop} {
    font-size: 13px;
    letter-spacing: 2.5px;
    width: 178px;
    right: -145px;
    top: 83px;
  }
  @media ${device.laptopL} {
    letter-spacing: 3px;
    width: 179px;
    right: -132px;
    top: 110px;
    font-size: 16px;
  }
  @media ${device.desktop} {
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
  top: 105px;
  font-size: 12px;
  font-family: Titillium Bold;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  letter-spacing: 0.5px;
  @media ${device.laptop} {
    font-size: 12px;
    letter-spacing: 3px;
    width: 193px;
    right: -163px;
    top: 88px;
  }
  @media ${device.laptopL} {
    font-size: 16px;
    letter-spacing: 3px;
    width: 193px;
    right: -149px;
    top: 121px;
  }
  @media ${device.desktop} {
    font-size: 20px;
    letter-spacing: 3px;
    width: 193px;
    right: -137px;
    top: 152px;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  display: inline-block;
  @media ${device.laptop} {
  }
`

const PrevContainerLap = styled.div`
  width: 100%;
  display: inline-block;
  cursor: pointer;
  & img {
    width: 100%;
  }
  @media ${device.laptop} {
    margin-bottom: 8px;
    opacity: ${props => props.opacity};
  }
  @media ${device.laptopL} {
    margin-bottom: 27px;
  }
`

const FlexBox = styled.div`
  @media ${device.laptop} {
    display: flex;
    align-items: baseline;
  }
`

const DesktopContain = styled.div`
  display: none;
  @media ${device.laptop} {
    width: 100%;
    display: block;
  }
`

const OneRow = styled.div`
  @media ${device.laptop} {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
  }
`
const SelectButton = styled.div`
  display: none;
  @media ${device.laptop} {
    width: 100%;
    height: 60px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: white;
    font-family: Titillium Bold;
    font-size: 16px;
    background-color: #ff8c00;
    letter-spacing: 2px;
    cursor: pointer;
  }
  @media ${device.laptopL} {
    width: 100%;
    height: 68px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: white;
    font-family: Titillium Bold;
    font-size: 17px;
    background-color: #ff8c00;
    letter-spacing: 2px;
  }
  @media ${device.desktop} {
    height: 83px;
    font-size: 20px;
  }
`

const CartButton = styled.div`
  display: none;
  @media ${device.laptop} {
    width: 100%;
    height: 55px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: white;
    font-family: Titillium Bold;
    font-size: 15px;
    background-color: #f57b00;
    letter-spacing: 2px;
    position: relative;
  }

  @media ${device.laptopL} {
    height: 70px;
    font-size: 17px;
  }
  @media ${device.desktop} {
    height: 83px;
    font-size: 20px;
  }
`
const CartLetter = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & a {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    color: white;
  }
`

const CountPart = styled.div`
  position: absolute;
  left: 15px;
  font-size: 24px;
  font-family: Titillium Bold;
  display: flex;
  @media ${device.laptop} {
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  @media ${device.laptopL} {
    font-size: 21px;
  }
  @media ${device.desktop} {
    font-size: 24px;
  }
`

const CartImg = styled.div`
  position: absolute;
  right: 0px;
  width: 100px;
  background: #ff8c00;
  height: 100%;
  & img {
    width: 33px;
    padding-top: 25px;
  }
  @media ${device.laptop} {
    & img {
      width: 25px;
      padding-top: 16px;
    }
    width: 70px;
  }
  @media ${device.laptopL} {
    & img {
      width: 33px;
      padding-top: 19px;
    }
    width: 85px;
  }
  @media ${device.desktop} {
    & img {
      width: 33px;
      padding-top: 25px;
    }
    width: 100px;
  }
`

const AddCart = styled.div`
  cursor: pointer;
  @media ${device.laptop} {
    font-size: 20px;
    padding: 5px;
  }
  @media ${device.laptopL} {
    font-size: 23px;
  }
  @media ${device.desktop} {
    font-size: 27px;
  }
`

const RemoveCart = styled.div`
  cursor: pointer;
  @media ${device.laptop} {
    font-size: 22px;
    padding: 5px;
  }
  @media ${device.laptopL} {
    font-size: 28px;
  }
  @media ${device.desktop} {
    font-size: 34px;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    position: relative;
    display: block;
  }
`

const SpaceAboveSize = styled.div`
  @media ${device.laptop} {
    margin-top: 25px;
  }
  @media ${device.laptopL} {
    margin-top: 40px;
  }
  @media ${device.desktop} {
    margin-top: 67px;
  }
`

const CategoryContainer = styled.div`
  height: 30px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #a9acaf;
  margin-right: 6px;
  background: white;
  width: fit-content;
  margin-top: 23px;
  margin-bottom: 5px;
`

const Item = styled.div`
  text-align: center;
  background-size: cover;
  width: 100%;
  margin-bottom: 20px;
  & img {
    object-fit: contain;
    width: 100%;
    opacity: 1 !important;
  }
`

const VideoImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 360px;

  & video::-internal-media-controls-download-button {
    display: none;
  }
  & video::-webkit-media-controls-enclosure {
    overflow: hidden;
  }
  & video::-webkit-media-controls-panel {
    width: calc(100% + 30px); /* Adjust as needed */
  }
`

export default StandardProduct
