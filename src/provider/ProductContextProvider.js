import React, { useState, useEffect } from 'react'

import Context from '~/context/ProductContext'

const ProductContextProvider = ({ children }) => {
  const [color, setColor] = useState('')
  const [colors, setColors] = useState([])
  const [size, setSize] = useState('')
  const [sizeChart, setSizeChart] = useState(false)
  const [commentActive, setCommentActive] = useState(false)
  const [shippingModal, setShippingModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [sizeModal, setSizeModal] = useState(false)
  const [contactModal, setContactModal] = useState(false)
  const [cart, setCart] = useState(0)
  const [sizeColor, setSizeColor] = useState({})
  const [variant, setVariant] = useState({})
  const [variants, setVariants] = useState([])
  const [selectedOpt, setSelectedOpt] = useState({})
  const [buttonLetter, setButtonLetter] = useState('SELECT YOUR SIZE')
  const [limitedOfferModal, setLimitedOfferModal] = useState(false)
  const [limitedModalStep, setLimitedModalStep] = useState(1)
  useEffect(() => () => {}, [])

  return (
    <Context.Provider
      value={{
        color,
        setColor,
        colors,
        setColors,
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
        sizeColor,
        setSizeColor,
        variant,
        setVariant,
        variants,
        setVariants,
        selectedOpt,
        setSelectedOpt,
        buttonLetter,
        setButtonLetter,
        limitedOfferModal,
        setLimitedOfferModal,
        limitedModalStep,
        setLimitedModalStep,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default ProductContextProvider
