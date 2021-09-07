import React, { useState, useEffect, useContext } from 'react'

import Context from '~/context/ProductBuilderContext'

const ProductBuilderContextProvider = ({ children }) => {
  const [exitBuilderModal, setExitBuilderModal] = useState(false)
  const [builderStep, setBuilderStep] = useState('edit')
  return (
    <Context.Provider
      value={{
        exitBuilderModal,
        setExitBuilderModal,
        builderStep,
        setBuilderStep,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default ProductBuilderContextProvider
