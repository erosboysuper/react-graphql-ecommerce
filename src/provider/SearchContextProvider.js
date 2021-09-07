import React, { useState } from 'react'

import Context from '~/context/SearchContext'

const SearchContextProvider = ({ children }) => {
  const [viewSearch, setViewSearch] = useState(false)
  const [focus, setFocused] = useState(false)
  const [apolloClient, setApolloClient] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [activeCut, setActiveCut] = useState([])
  const [activeColor, setActiveColor] = useState([])
  const [activeSize, setActiveSize] = useState([])
  const [activeSizeId, setActiveSizeId] = useState([])
  const [activeTag, setActiveTag] = useState([])
  const [showResults, setShowResults] = useState(false)

  const setFocus = (i, e) => {
    e.stopPropagation()
    setFocused(i)
  }

  return (
    <Context.Provider
      value={{
        focus,
        setFocus,
        searchText,
        setSearchText,
        viewSearch,
        setViewSearch,
        apolloClient,
        setApolloClient,
        activeCut,
        setActiveCut,
        activeColor,
        setActiveColor,
        activeSize,
        setActiveSize,
        activeSizeId,
        setActiveSizeId,
        activeTag,
        setActiveTag,
        showResults,
        setShowResults,
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default SearchContextProvider
