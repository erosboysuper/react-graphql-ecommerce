import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import './style.css'

import StoreContext from '~/context/StoreContext'
import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

import SpinIcon from '~/images/Assets/SpinIcon.png'

const SpinWheel = ({ items, preSelectedItem }) => {
  const { setWheelPrize } = useContext(StoreContext)
  const [selectedItem, setSelectedItem] = useState(null)
  const [spinning, setSpinning] = useState('')
  const [wheelVars, setWheelVars] = useState()

  const selectItem = () => {
    setSpinning('spinning')
    if (preSelectedItem) {
      setSelectedItem(preSelectedItem.index)
    }
  }

  useEffect(() => {
    setWheelVars({
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    })
    if (selectedItem !== null) {
      setTimeout(() => setWheelPrize(preSelectedItem), 6000)
    }
  }, [selectedItem])

  return (
    <div className="wheel-container">
      <SpinButton onClick={() => selectItem()}>
        <Letter
          font="Titillium Bold"
          size={22}
          sizeMobileS={18}
          sizeMobileM={22}
          sizeMobileL={22}
          color="white"
        >
          SPIN NOW
        </Letter>
      </SpinButton>
      <Shadow />
      <LazyLoad>
        <Icon src={SpinIcon} alt="SpinIcon" />
      </LazyLoad>
      <div className={`wheel ${spinning}`} style={wheelVars}>
        {items.map((item, index) => (
          <div key={`${index}-wheelObject`}>
            <div
              className="wheel-item"
              key={`${index}-item`}
              style={{ '--item-nb': index }}
            >
              <Letter
                font="Titillium Bold"
                size="18"
                color={index % 2 === 0 ? 'white' : 'black'}
              >
                {item.title}
              </Letter>
            </div>
            {index % 2 ? (
              ''
            ) : (
              <div
                className="wheel-evenBackground"
                style={{ '--item-nb': index, '--length': items.length }}
              />
            )}
            <div
              className="wheel-border"
              key={`${index}-border`}
              style={{ '--item-nb': index }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const SpinButton = styled.div`
  position: absolute;
  left: 50%;
  top: -30%;
  background: #ff8c00;
  width: 58%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #202122;
  transform: translate(-50%, 0px);
  z-index: 40;
  @media ${device.mobileS} {
    top: -30%;
    height: 50px;
  }
  @media ${device.mobileM} {
    top: -36%;
    height: 56px;
  }
  @media ${device.tablet} {
    top: -30%;
  }
`

const Shadow = styled.div`
  position: absolute;
  left: 50%;
  top: -30%;
  background: transparent;
  width: 58%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #202122;
  transform: translate(-47%, 6px);
  @media ${device.mobileS} {
    top: -30%;
    height: 50px;
  }
  @media ${device.mobileM} {
    top: -36%;
    height: 56px;
  }
  @media ${device.tablet} {
    top: -30%;
  }
`

const Icon = styled.img`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -38%);
  z-index: 2;
`

export default SpinWheel
