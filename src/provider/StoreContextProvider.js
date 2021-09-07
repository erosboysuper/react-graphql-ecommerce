import React, { useState, useEffect } from 'react'
import fetch from 'isomorphic-fetch'
import Client from 'shopify-buy'
import { encode, decode } from 'js-base64'
import { useApolloClient } from '@apollo/client'

import useWindowSize from '~/utils/windowResizeHook'
import StoreContext from '~/context/StoreContext'
import { SEARCH_LIVE, SEARCH_STAGING } from '~/gql'

const version = `v1`
const localeSettings = {
  en: {
    CURRENCY_SYMBOL: `$`,
    CURRENCY_CODE: `USD`,
    SHOP_NAME: `shop-us.tbo.clothing`,
    SHOPIFY_ACCESS_TOKEN: `48f083d6908b00939ffe38476cb49f6f`,
  },
  de: {
    CURRENCY_SYMBOL: `€`,
    CURRENCY_CODE: `EUR`,
    SHOP_NAME: `shop-de.tbo.clothing`,
    SHOPIFY_ACCESS_TOKEN: `f5efb2a7bbad39eeedaa7014ff35da8d`,
  },
  'en-CH': {
    CURRENCY_SYMBOL: `CHF`,
    CURRENCY_CODE: `CHF`,
    SHOP_NAME: `shop-ch.tbo.clothing`,
    SHOPIFY_ACCESS_TOKEN: `4b5154d1ac0bc35914ae8191b2409e9d`,
  },
}

let shopifyClients = {}
Object.keys(localeSettings).forEach(lang => {
  const localeSetting = localeSettings[lang]
  shopifyClients[lang] = Client.buildClient(
    {
      storefrontAccessToken: localeSetting.SHOPIFY_ACCESS_TOKEN,
      domain: `${localeSetting.SHOP_NAME}`,
      apiVersion: `2021-01`,
    },
    fetch
  )
})

const StoreContextProvider = ({ children }) => {
  let initialStoreState = {
    shopifyClient: {},
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  }
  const apolloClient = useApolloClient()
  const [toggle, setToggle] = useState(false)
  const toggleChange = () => setToggle(!toggle)
  const [store, updateStore] = useState(initialStoreState)
  const [modal, setModal] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const [cartSum, setCartSum] = useState(0)
  const [cartModal, setCartModal] = useState(false)
  const [landingCartModal, setLandingCartModal] = useState(false)
  const [wheelPopModal, setWheelPopModal] = useState(false)
  const [wheelPopClosed, setWheelPopClosed] = useState(false)
  const [wheelPrize, setWheelPrize] = useState()
  const [popModal, setPopModal] = useState(false)
  const [locale, setLocale] = useState('en')
  const [localeFolder, setLocaleFolder] = useState('us')
  const [localeSetting, setLocaleSetting] = useState({})
  const [localeCartItems, setLocaleCartItems] = useState({})
  const [loader, setLoader] = useState(false)
  let isRemoved = false
  const windowSize = useWindowSize()
  const [isMobile, setIsMobile] = useState(false)

  const addCartItems = async variants => {
    const { checkout } = store
    let new_cartItems = { ...localeCartItems[locale] }
    let shopifyLineItems = { add: [], update: [], remove: [] }
    variants.forEach(variant => {
      if (!variant['gqlShopifyId']) {
        variant['gqlShopifyId'] = encode(
          `gid://shopify/ProductVariant/${variant.shopifyId}`
        )
      }
      let existingItem = new_cartItems[variant.id]
        ? new_cartItems[variant.id]
        : null
      if (existingItem) {
        existingItem.num += 1
        const cartLineId = checkout.lineItems.find(
          x => x.variant.id === variant.gqlShopifyId
        )
        if (cartLineId && cartLineId.id) {
          shopifyLineItems.update.push({
            id: cartLineId.id,
            qty: existingItem.num,
          })
        }
      } else {
        variant['num'] = 1
        new_cartItems[variant.id] = variant
        shopifyLineItems.add.push({
          id: variant['gqlShopifyId'],
          qty: variant['num'],
        })
      }
      if (process.env.DATO_ENV === 'main') {
        addToCartAction(new_cartItems[variant.id])
      }
    })
    setLocaleCartItems(prevState => {
      return { ...prevState, [locale]: new_cartItems }
    })
    await actionOnCart(shopifyLineItems)
  }

  const removeCartItems = async (variants, cb) => {
    const { checkout } = store
    let new_cartItems = { ...localeCartItems[locale] }
    let shopifyLineItems = { add: [], update: [], remove: [] }
    variants.forEach(variant => {
      if (!variant['gqlShopifyId']) {
        variant['gqlShopifyId'] = encode(
          `gid://shopify/ProductVariant/${variant.shopifyId}`
        )
      }
      let existingItem = new_cartItems[variant.id]
        ? new_cartItems[variant.id]
        : null
      const cartLineId = checkout.lineItems.find(
        x => x.variant.id === variant.gqlShopifyId
      )
      if (existingItem && existingItem.num > 1) {
        existingItem.num -= 1
        if (cartLineId && cartLineId.id) {
          shopifyLineItems.update.push({
            id: cartLineId.id,
            qty: existingItem.num,
          })
        }
      } else {
        delete new_cartItems[variant.id]
        if (cartLineId && cartLineId.id) {
          shopifyLineItems.remove.push({
            id: cartLineId.id,
          })
        }
      }
    })
    if (Object.keys(new_cartItems).length === 0 && typeof cb === 'function') {
      cb()
    }
    setLocaleCartItems(prevState => {
      return { ...prevState, [locale]: new_cartItems }
    })
    await actionOnCart(shopifyLineItems)
  }

  const deleteCartItems = async (variants, cb) => {
    const { checkout } = store
    let new_cartItems = { ...localeCartItems[locale] }
    let shopifyLineItems = { add: [], update: [], remove: [] }
    variants.forEach(variant => {
      if (!variant['gqlShopifyId']) {
        variant['gqlShopifyId'] = encode(
          `gid://shopify/ProductVariant/${variant.shopifyId}`
        )
      }
      const cartLineId = checkout.lineItems.find(
        x => x.variant.id === variant.gqlShopifyId
      )
      if (new_cartItems[variant.id]) {
        delete new_cartItems[variant.id]
        if (cartLineId && cartLineId.id) {
          shopifyLineItems.remove.push({
            id: cartLineId.id,
          })
        }
      }
    })
    if (Object.keys(new_cartItems).length === 0 && typeof cb === 'function') {
      cb()
    }
    setLocaleCartItems(prevState => {
      return { ...prevState, [locale]: new_cartItems }
    })
    await actionOnCart(shopifyLineItems)
  }

  const actionOnCart = async shopifyLineItems => {
    const { checkout, shopifyClient: client } = store
    const checkoutId = checkout.id
    let promiseAry = []

    if (shopifyLineItems.add.length > 0) {
      const lineItemsToUpdate = shopifyLineItems.add.map(x => ({
        variantId: x.id,
        quantity: parseInt(x.qty, 10),
      }))
      promiseAry.push(
        new Promise((resolve, reject) => {
          client.checkout
            .addLineItems(checkoutId, lineItemsToUpdate)
            .then(res => {
              resolve(res)
            })
        })
      )
    }

    if (shopifyLineItems.update.length > 0) {
      const lineItemsToUpdate = shopifyLineItems.update.map(x => ({
        id: x.id,
        quantity: parseInt(x.qty, 10),
      }))
      promiseAry.push(
        new Promise((resolve, reject) => {
          client.checkout
            .updateLineItems(checkoutId, lineItemsToUpdate)
            .then(res => {
              resolve(res)
            })
        })
      )
    }

    if (shopifyLineItems.remove.length > 0) {
      const lineItemIds = shopifyLineItems.remove.map(x => x.id)
      promiseAry.push(
        new Promise((resolve, reject) => {
          client.checkout.removeLineItems(checkoutId, lineItemIds).then(res => {
            resolve(res)
          })
        })
      )
    }

    if (promiseAry.length > 0) {
      Promise.all(promiseAry).then(res => {
        const resLen = res.length - 1
        const _checkout = res[resLen]
        updateStore(prevState => {
          return { ...prevState, checkout: _checkout }
        })
      })
    }
  }

  const addDiscount = async discountCode => {
    if (!discountCode) {
      return
    }
    // Add a discount code to the checkout
    const { checkout, shopifyClient: client } = store
    const checkoutId = checkout.id
    await client.checkout.addDiscount(checkoutId, discountCode).then(res => {})
  }

  const addToCartAction = variant => {
    const item_sku = variant.sku
    const item_qty = variant.num
    const item_price = (variant.price * variant.num).toFixed(2)
    const item_name = `${variant.product_name} - ${variant.size.name}${
      variant.size.helpText ? ' | ' + variant.size.helpText : ''
    }${variant.color.name ? ' / ' + variant.color.name : ''}`

    // FACEBOOK PIXEL //
    fetch(`${process.env.FbxAddToCart_API}`, {
      method: 'post',
      async: true,
      mode: 'no-cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sourcePage: window.location.href,
        item: {
          content_ids: [variant.product_shopify_id],
          content_name: item_name,
          sku: item_sku,
          value: item_price,
          qty: item_qty,
          currency: `${localeSetting.CURRENCY_CODE}`,
        },
      }),
    }).then(res => {})

    // SNAPCHAT PIXEL //
    if (window.snaptr) {
      window.snaptr('track', 'ADD_CART', {
        number_items: item_qty,
        description: item_name,
        price: item_price,
        item_ids: [item_sku],
        currency: `${localeSetting.CURRENCY_CODE}`,
        additional_init_data: { shopify_id: variant.product_shopify_id },
      })
    }
  }

  const fbxInitialCheckout = async (webUrl, discountCode = null) => {
    // if (process.env.DATO_ENV !== 'main') {
    //   return
    // }

    let allPromises = []
    if (!discountCode) {
      discountCode = localStorage.getItem(`${locale}-discoupon`)
    }
    if (discountCode) {
      const discountCode_promise = new Promise(async (resolve, reject) => {
        await addDiscount(discountCode)
        setTimeout(() => localStorage.removeItem(`${locale}-discoupon`), 300)
        resolve(true)
      })
      allPromises.push(discountCode_promise)
    }

    let items = []
    let total_qty = 0
    let total_price = 0
    let item_ids = []
    for (let item of Object.values(cartItems)) {
      items.push({
        pid: item.product_shopify_id,
        sku: item.sku,
        value: (item.price * item.num).toFixed(2),
        qty: item.num,
      })
      item_ids.push(item.sku)
      total_qty += item.num
      total_price += parseFloat((item.price * item.num).toFixed(2))
    }

    // FACEBOOK PIXEL //
    const fbPixel_promise = new Promise(async (resolve, reject) => {
      fetch(`${process.env.FbxInitialCheckout_API}`, {
        method: 'post',
        async: true,
        mode: 'no-cors',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          currency: `${localeSetting.CURRENCY_CODE}`,
          sourcePage: window.location.href,
          items: items,
        }),
      }).then(res => {
        resolve(true)
      })
    })
    allPromises.push(fbPixel_promise)

    // SNAPCHAT PIXEL //
    if (window.snaptr) {
      window.snaptr('track', 'START_CHECKOUT', {
        number_items: total_qty,
        price: total_price,
        item_ids: item_ids,
        currency: `${localeSetting.CURRENCY_CODE}`,
      })
    }

    if (webUrl) {
      Promise.all(allPromises).then(results => {
        window.location.href = webUrl
      })
    }
  }

  useEffect(() => {
    // DISABLE CART MODIFICATION AFTER BRWSER CLOSE //
    return () => {
      isRemoved = true
    }
  }, [])

  useEffect(() => {
    const _isMobile = windowSize.width < 1024
    setIsMobile(_isMobile)
  }, [windowSize])

  useEffect(() => {
    // CART SUM //
    let sum = 0
    Object.keys(cartItems).forEach(id => {
      const item = cartItems[id]
      sum += item.price * item.num
    })
    setCartSum(sum)

    // LOCAL STORAGE //
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    if (locale) {
      const _localeSetting = localeSettings[locale] || {}
      setLocaleSetting(_localeSetting)

      const shopifyClient = shopifyClients[locale] || null
      if (shopifyClient) {
        updateStore(prevState => {
          return { ...prevState, shopifyClient }
        })
      }
    }
  }, [locale])

  // CREATE SHOPIFY CHECKOUT ID //
  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined'
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(`${locale}_${version}_shopify_checkout_id`)
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem(
            `${locale}_${version}_shopify_checkout_id`,
            checkout.id
          )
        }

        // 1. FETCH DATA FROM DATOCMS BASED ON SKU
        // 2. OVERRIDE LOCAL CART CACHE BY checkout.lineItems
        if (
          apolloClient &&
          checkout &&
          checkout.lineItems &&
          checkout.lineItems.length > 0
        ) {
          const isProduction = process.env.DATO_ENV === 'main'
          let variantIds = []
          let shopifyCartItems = {}
          for (let x of checkout.lineItems) {
            if (x.variant && x.variant.sku) {
              const productId = decode(x.variant.product.id).split('/').pop()
              const variantId = decode(x.variant.id).split('/').pop()
              variantIds.push(variantId)
              shopifyCartItems[x.variant.sku] = {
                gqlShopifyId: x.variant.id,
                product_name: x.title,
                num: x.quantity,
                product_shopify_id: productId,
                product_handle: x.variant.product.handle,
                // "isSingleProduct": true,
              }
            }
          }
          if (variantIds.length > 0) {
            apolloClient
              .query({
                query: isProduction ? SEARCH_LIVE : SEARCH_STAGING,
                variables: isProduction
                  ? {
                      lang: locale.replace(/-/gi, '_'),
                      filters: { shopifyId: { in: variantIds } },
                    }
                  : {
                      filters: {
                        locale: { eq: locale },
                        shopifyId: { in: variantIds },
                      },
                    },
              })
              .then(result => {
                const records = isProduction
                  ? result.data.allVariants
                  : result.data.allDatoCmsVariant.nodes
                let tmpShopifyCartItems = {}
                for (let data of records) {
                  if (!shopifyCartItems[data.sku].id) {
                    shopifyCartItems[data.sku] = {
                      ...shopifyCartItems[data.sku],
                      ...data,
                    }
                    tmpShopifyCartItems[data.id] = {
                      ...shopifyCartItems[data.sku],
                    }
                  }
                }
                setLocaleCartItems(prevState => {
                  return { ...prevState, [locale]: tmpShopifyCartItems }
                })
              })
          } else {
            setLocaleCartItems(prevState => {
              return { ...prevState, [locale]: {} }
            })
          }
        } else {
          setLocaleCartItems(prevState => {
            return { ...prevState, [locale]: {} }
          })
        }

        updateStore(prevState => {
          return { ...prevState, checkout }
        })
      }

      const createNewCheckout = async () => {
        const newCheckout = await store.shopifyClient.checkout.create()
        if (!isRemoved && newCheckout) {
          setLocaleCartItems(prevState => {
            return { ...prevState, [locale]: {} }
          })
          setCheckoutInState(newCheckout)
        }
      }

      if (existingCheckoutID) {
        try {
          const checkout = await store.shopifyClient.checkout.fetch(
            existingCheckoutID
          )
          // Make sure this cart hasn’t already been purchased.
          if (!isRemoved && !checkout.completedAt) {
            setCheckoutInState(checkout)
          } else {
            createNewCheckout()
          }
        } catch (e) {
          // localStorage.removeItem(`${locale}_${version}_shopify_checkout_id`)
        }
      } else {
        createNewCheckout()
      }
    }
    if (store.shopifyClient.checkout) {
      initializeCheckout()
    }
  }, [store.shopifyClient.checkout])

  useEffect(() => {
    const _cartItems = localeCartItems[locale] || {}
    setCartItems(_cartItems)
  }, [localeCartItems])

  return (
    <StoreContext.Provider
      value={{
        modal,
        setModal,
        store,
        toggle,
        setToggle,
        toggleChange,
        cartItems,
        cartModal,
        setCartModal,
        landingCartModal,
        setLandingCartModal,
        addCartItems,
        removeCartItems,
        deleteCartItems,
        cartSum,
        updateStore,
        fbxInitialCheckout,
        wheelPopModal,
        setWheelPopModal,
        wheelPrize,
        setWheelPrize,
        popModal,
        setPopModal,
        wheelPopClosed,
        setWheelPopClosed,
        locale,
        setLocale,
        localeFolder,
        setLocaleFolder,
        localeSetting,
        setLocaleSetting,
        loader,
        setLoader,
        windowSize,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider
