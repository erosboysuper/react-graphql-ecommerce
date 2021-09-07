import React, { useContext } from 'react'
import styled from 'styled-components'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { Space, DesktopContain, MobileContain } from '~/utils/styles'

import ProductSale from '~/components/Common/ProductSale'

const CollectionItems = ({
  name: collectionName,
  products,
  showItemCount,
  showCollectionTitle,
  showToggleButton,
  index,
}) => {
  const { toggle } = useContext(StoreContext)
  return (
    <div>
      <H3>
        {showCollectionTitle && <span>{collectionName}</span>}
        {showItemCount && index === 0 && (
          <ItemCount>{products.length || 0} items</ItemCount>
        )}
      </H3>
      <DesktopContain>
        <Space height={47} />
      </DesktopContain>
      <MobileContain>
        <Space height={30} />
      </MobileContain>
      <Contain>
        {products.map(product => {
          return (
            <BestProduct key={product.id} view={showToggleButton && toggle}>
              <ProductSale
                product={product}
                vertical={toggle && showToggleButton ? true : false}
              />
            </BestProduct>
          )
        })}
      </Contain>
    </div>
  )
}

const BestProduct = styled.div`
  width: ${props => (props.view ? '94' : '45.5')}%;
  margin-left: 3%;
  margin-bottom: 50px;
  @media ${device.laptop} {
    width: 20vw;
    margin-bottom: 60px;
  }
  @media ${device.laptopL} {
    width: 20vw;
    margin-bottom: 80px;
  }
  @media ${device.desktop} {
    margin-bottom: 100px;
  }
`

const Contain = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media ${device.laptop} {
    margin-left: 4%;
  }
`

const H3 = styled.span`
  margin-left: 10px;
  font-size: 22px;
  font-family: Titillium Black;
  visibility: ${props => (props.hide ? 'hidden' : 'inherit')};
  @media ${device.tablet} {
    font-size: 34px;
    margin-left: 22px;
  }
  @media ${device.laptop} {
    margin-left: 10px;
    font-size: 32px;
    margin-left: 7%;
  }
  @media ${device.laptopL} {
    font-size: 38px;
    margin-left: 7%;
  }
  @media ${device.desktop} {
    font-size: 44px;
    margin-left: 7%;
  }
`

const ItemCount = styled.label`
  margin-top: 0px;
  font-size: 16px;
  margin-left: 10px;
  font-family: Titillium Bold;
  @media ${device.laptop} {
    font-size: 24px;
  }
`

export default CollectionItems
