import React, { useState, useEffect, useContext } from 'react'

import Context from '~/context/CheckoutContext'

const CheckoutContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false)
  const [shippingOption, setShippingOption] = useState('Select an option')
  return (
    <Context.Provider
      value={{
        modal,
        setModal,
        shippingOption,
        setShippingOption,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default CheckoutContextProvider
