import React from 'react'
import LazyLoad from 'react-lazy-load'

const LazyLoadComponent = ({ children, removeLazyLoad = false }) => {
  return removeLazyLoad ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <LazyLoad>{children}</LazyLoad>
  )
}

export default LazyLoadComponent
