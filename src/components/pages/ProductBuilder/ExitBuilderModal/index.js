import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import ProductBuilderContext from '~/context/ProductBuilderContext'

import CloseIcon from '~/images/Assets/Close-modal.svg'
import BackIcon from '~/images/Assets/DESKTOP-Back from Cart.svg'

const CategoryData = [
  {
    title: 'Continue creating',
    description: 'Pick up your design where you left off...',
    url: require('~/images/Assets/Demo-Trunk-Yello.svg'),
  },
  {
    title: 'Underwear',
    description: 'Start a design of a Brief, Boxer Briefs or Trunks',
    url: require('~/images/Assets/DESKTOP-Filters-All-categories.svg'),
  },
  {
    title: 'Tee',
    description: 'Start a design of Pants and adipiscing elit, sed do eiusmod',
    url: require('~/images/Assets/DESKTOP-Filters-Tees.svg'),
  },
  {
    title: 'Continue creating',
    description: 'Pick up your design where you left off...',
    url: require('~/images/Assets/DESKTOP-Filters-Boxer-briefs.svg'),
  },
]
const ExitBuilderModal = () => {
  const { setExitBuilderModal, setBuilderStep } = useContext(
    ProductBuilderContext
  )

  const [modalStep, setModalStep] = useState(0)
  const [optionName, setOptionName] = useState('')

  const onBackToOption = () => {
    setModalStep(0)
  }

  const handleContinue = () => {
    if (modalStep === 0) setModalStep(1)
    else {
      setExitBuilderModal(false)
      setBuilderStep('save')
    }
  }
  return (
    <React.Fragment>
      <Container>
        <CloseIconButton
          src={CloseIcon}
          enabled={modalStep === 1}
          onClick={() => setExitBuilderModal(false)}
        />
        {modalStep === 1 && (
          <img src={BackIcon} onClick={() => onBackToOption()} />
        )}
        <Header style={modalStep === 1 ? { justifyContent: 'flex-start' } : {}}>
          <Letter
            font="Titillium Bold"
            size={18}
            color="#202122"
            onClick={() => (modalStep === 1 ? onBackToOption() : '')}
            style={modalStep === 1 ? { cursor: 'pointer' } : {}}
          >
            {modalStep === 0 ? 'Exit' : 'BACK TO OPTION'}
          </Letter>
        </Header>
        <Description>
          {modalStep === 0 ? (
            ''
          ) : (
            <DescriptionLogo
              src={require('~/images/Assets/Logo-round.png')}
              alt=""
            />
          )}

          <Letter
            font="Titillium Bold"
            size={18}
            sizeLaptopL={20}
            color="#202122"
          >
            {modalStep === 0
              ? 'Before leaving, what would you like to do?'
              : 'What product are we talking about?'}
          </Letter>
        </Description>
        {modalStep === 0 ? (
          <Wrapper>
            <OptionItem
              onClick={() => setOptionName('save')}
              selected={optionName === 'save'}
            >
              <h6>SAVE DESIGN</h6>
              <span>
                Co-create a limited edition based on existing products
              </span>
            </OptionItem>
            <OptionItem
              onClick={() => setOptionName('delete')}
              selected={optionName === 'delete'}
            >
              <h6>DELETE DESIGN</h6>
              <span>Your current design won't be saved</span>
            </OptionItem>
          </Wrapper>
        ) : (
          <Wrapper>
            {CategoryData.map((item, index) => (
              <CategoryItem key={`cat-s-${index}`}>
                <CategoryLogo>
                  <img src={item.url} alt="product-item" />
                </CategoryLogo>
                <CategoryBody>
                  <CategoryTitle>{item.title}</CategoryTitle>
                  <CategoryDescription>{item.description}</CategoryDescription>
                </CategoryBody>
              </CategoryItem>
            ))}
          </Wrapper>
        )}

        <ButtonWrapper onClick={() => handleContinue()}>
          {modalStep === 0 ? 'EXIT PRODUCT BUILDER' : 'CONTINUE'}
        </ButtonWrapper>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: 90%;
  background: white;
  overflow: scroll;
  z-index: 20;
  & > img {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
  @media ${device.laptop} {
    width: 34%;
    max-width: 520px;
    min-width: 450px;
    height: 100vh;
    max-height: 100%;
    padding: 20px 80px 100px 30px;
    & > img {
      top: 40px;
      left: 30px;
    }
  }
`

const CloseIconButton = styled.img`
  left: ${props => (props.enabled ? 'unset !important' : '')};
  right: ${props => (props.enabled ? '20px' : '')};
  @media ${device.laptop} {
    right: ${props => (props.enabled ? '50px' : '')};
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 60px;
  @media ${device.laptop} {
    padding: 20px 45px;
  }
`

const Description = styled.div`
  padding: 10px 20px;
  @media ${device.laptop} {
    margin: 70px 0px;
    padding: 0px;
  }
`

const DescriptionLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media ${device.laptop} {
    padding: 10px;
    margin-bottom: 120px;
  }
`

const OptionItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 5px;
  padding: 10px 15px;
  border: ${props => (props.selected ? '' : '1px solid #a9acaf')};
  min-height: 100px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#f2f2f7' : '')};
  & h6 {
    color: ${props => (props.selected ? '#FF8C00' : '#202122')};
  }
  & span {
    color: ${props => (props.selected ? '#161617' : '#a9acaf')};
  }
  &:hover {
    background-color: #f2f2f7;
  }
  @media ${device.laptop} {
    width: 100%;
    align-items: center;
    text-align: center;
  }
`

const CategoryItem = styled.div`
  display: flex;
  border: 1px solid #cecece;
  padding: 10px 20px;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f7;
  }
  @media ${device.laptop} {
  }
`

const CategoryLogo = styled.div`
  margin: 0 30px 0 0;
  & img {
    width: 70px;
    height: auto;
  }
  @media ${device.laptop} {
  }
`

const CategoryBody = styled.div`
  @media ${device.laptop} {
  }
`

const CategoryTitle = styled.div`
  font-size: 18px;
  font-family: Titillium Bold;
`

const CategoryDescription = styled.div`
  @media ${device.laptop} {
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 20px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  background-color: #ff8c00;
  color: white;
  &:hover {
    background-color: #f1921e;
  }
`

export default ExitBuilderModal
