import React, { useContext, useEffect } from 'react'

import SEO from '~/components/seo'

import ProductBuilderHeader from '~/components/pages/ProductBuilder/Header'
import ProductBuilderSection from '~/components/pages/ProductBuilder/Section'

import Footer from '~/components/Common/Footer'
import ProductBuilderModals from '~/components/Common/ProductBuilderModals'

const ProductBuilderPage = ({
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  return (
    <React.Fragment>
      <ProductBuilderHeader />
      <ProductBuilderSection />
      <ProductBuilderModals />
    </React.Fragment>
  )
}

export default ProductBuilderPage
