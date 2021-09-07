import React, { useContext } from 'react'

import ProductBuilderContext from '~/context/ProductBuilderContext'
import { Cover } from '~/utils/styles'

import ExitBuilderModal from '~/components/pages/ProductBuilder/ExitBuilderModal'
import Lightbox from '~/components/Common/Lightbox'

const ProductBuilderModals = () => {
  const { exitBuilderModal, setExitBuilderModal } = useContext(
    ProductBuilderContext
  )

  return (
    <React.Fragment>
      {exitBuilderModal === true && (
        <React.Fragment>
          <Cover
            background={0.8}
            index={10}
            onClick={() => setExitBuilderModal(false)}
          />
          <ExitBuilderModal />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ProductBuilderModals
