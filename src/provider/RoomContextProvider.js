import React, { useState } from 'react'

import Context from '~/context/RoomContext'

const RoomContextProvider = ({ children }) => {
  const [shareDesignModal, setShareDesignModal] = useState(false)

  return (
    <Context.Provider
      value={{
        shareDesignModal,
        setShareDesignModal,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default RoomContextProvider
