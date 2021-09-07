import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import FilterImgActive from '~/images/Assets/Filer-1-row-active.svg'
import FilterImgUnactive from '~/images/Assets/Filter-1-row-unactive.svg'
import FilterImg2Active from '~/images/Assets/Filter-2-rpws-active.svg'
import FilterImg2Unactive from '~/images/Assets/Filter-2-rpws-unactive.svg'

const Pattern = () => {
  const { toggle, toggleChange } = useContext(StoreContext)
  return (
    <LazyLoad>
      <Contain>
        {toggle === false ? (
          <ImageContainer>
            <img src={FilterImg2Active} alt="filterunactive" />
            <img
              onClick={() => toggleChange()}
              src={FilterImgUnactive}
              alt="filteractive"
            />
          </ImageContainer>
        ) : (
          <ImageContainer>
            <img
              onClick={() => toggleChange()}
              src={FilterImg2Unactive}
              alt="filterunactive"
            />
            <img src={FilterImgActive} alt="filteractive" />
          </ImageContainer>
        )}
      </Contain>
    </LazyLoad>
  )
}

const Contain = styled.div`
  display: flex;
  position: relative;
`

const ImageContainer = styled.div`
  & {
    padding: 10px;
    position: absolute;
    right: 10px;
    margin-top: -5px;
  }

  & img {
    margin-left: 15px;
  }
  @media ${device.laptop} {
    display: none;
  }
`

export default Pattern
