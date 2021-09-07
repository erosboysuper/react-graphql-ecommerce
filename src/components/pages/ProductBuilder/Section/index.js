import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { Letter, Cover } from '~/utils/styles'
import ProductBuilderContext from '~/context/ProductBuilderContext'

const ProductBuilderSection = () => {
  const cardData = [
    {
      title: 'Sport underwear',
      url: require('~/images/Assets/Background-Sport-underwear.svg'),
    },
    {
      title: 'Travelling, camping and all trips',
      url: require('~/images/Assets/Background-Travelling.svg'),
    },
    {
      title: 'Sportifs',
      url: require('~/images/Assets/Background-Sportifs.svg'),
    },
    {
      title: 'Room name two lines',
      url: require('~/images/Assets/Background-Room-Two.svg'),
    },
    {
      title: 'Room name',
      url: require('~/images/Assets/Background-Room.svg'),
    },
  ]
  const editDetailData = {
    shape: [
      {
        icon: require('~/images/Assets/DESKTOP-Filters-Boxer-briefs.svg'),
        title: 'Boxer Brief',
        price: 14.99,
        description:
          'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam.',
      },
      {
        icon: require('~/images/Assets/DESKTOP-Filters-Trunks.svg'),
        title: 'Trunks',
        price: 12.99,
        description:
          'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enuim adminim veniam',
      },
      {
        icon: require('~/images/Assets/DESKTOP-Filters-Briefs.svg'),
        title: 'Briefs',
        price: 10.99,
        description:
          'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enuim adminim veniam',
      },
    ],
    details: {
      elastic_band: {
        title: 'ELASTIC BAND',
        data: [
          {
            icon: require('~/images/Assets/DESKTOP-Filters-Boxer-briefs.svg'),
            title: 'Elastic band style 1',
            price: 4.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
          {
            icon: require('~/images/Assets/DESKTOP-Filters-Boxer-briefs.svg'),
            title: 'Elastic band style 2',
            price: 2.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
        ],
      },
      pouch_style: {
        title: 'POUCH STYLE',
        data: [
          {
            icon: require('~/images/Assets/DESKTOP-Filters-Boxer-briefs.svg'),
            title: 'With fly',
            price: 1.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
          {
            icon: require('~/images/Assets/DESKTOP-Filters-Boxer-briefs.svg'),
            title: 'No fly',
            price: 0.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
        ],
      },
      label_logo: {
        title: 'LABEL & LOGO',
        data: [
          {
            icon: require('~/images/Assets/Label-Logo-Front.svg'),
            title: 'Big logo on the front',
            price: 4.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
          {
            icon: require('~/images/Assets/Label-Logo-Side.svg'),
            title: 'Small logo on the side',
            price: 2.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
        ],
      },
      packaging: {
        title: 'PACKAGING',
        data: [
          {
            icon: require('~/images/Assets/Packaging-Cardboard.svg'),
            title: 'Cardboard packaging',
            price: 4.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
          {
            icon: require('~/images/Assets/Packaging-Plastic.svg'),
            title: 'Plastic packaging',
            price: 2.99,
            description:
              'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor.',
          },
        ],
      },
    },
    design: {
      color: [
        {
          icon: require('~/images/Assets/Color-Yello.svg'),
          price: 4.99,
          title: 'Vibrant yellow',
        },
        {
          icon: require('~/images/Assets/Color-Granite.svg'),
          price: 4.99,
          title: 'Granite',
        },
        {
          icon: require('~/images/Assets/Color-Red.svg'),
          price: 4.99,
          title: 'Red',
        },
        {
          icon: require('~/images/Assets/Color-Blue.svg'),
          price: 4.99,
          title: 'Vibrant blue',
        },
        {
          icon: require('~/images/Assets/Color-Black.svg'),
          price: 4.99,
          title: 'Black',
        },
        {
          icon: require('~/images/Assets/Color-Select.svg'),
          title: 'SELECT COLOR',
        },
      ],
      print: [
        {
          icon: require('~/images/Assets/Print-Blue.svg'),
          price: 6.99,
          title: 'Blue stripes',
        },
        {
          icon: require('~/images/Assets/Print-Black-White.svg'),
          price: 6.99,
          title: 'Black & white',
        },
        {
          icon: require('~/images/Assets/Print-Yellow-Red.svg'),
          price: 8.99,
          title: 'Yellow + Red',
        },
        {
          icon: require('~/images/Assets/Print-Granite-Red.svg'),
          price: 8.99,
          title: 'Granite + Red',
        },
        {
          icon: require('~/images/Assets/Print-Upload.svg'),
          title: 'UPLOAD YOUR PRINT',
        },
      ],
    },
    story: [
      {
        title: "what's the name of your design",
        placeholder: 'Yellow Power',
        rows: 1,
        name: 'design-name',
      },
      {
        title: 'Description',
        placeholder:
          'Lorem ipsum dolor sit amet consetetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enuim adminim veniam',
        rows: 6,
        name: 'description',
      },
      {
        title: 'What you like to invite a Co-Creator?',
        placeholder: '',
      },
    ],
  }

  const { builderStep, setBuilderStep, setExitBuilderModal } = useContext(
    ProductBuilderContext
  )
  const [selectedMenu, setSelectedMenu] = useState('shape')
  const [selectedCard, setSelectedCard] = useState()
  const [selectedShape, setSelectedShape] = useState()
  const [selectedDetails, setSelectedDetails] = useState({})
  const [selectedDesign, setSelectedDesign] = useState({})
  const [designName, setDesignName] = useState('')
  const [designDescription, setDesignDescription] = useState('')

  const handleChangeNextTab = () => {
    const currentMenuIndex = Object.keys(editDetailData).indexOf(selectedMenu)
    setSelectedMenu(Object.keys(editDetailData)[currentMenuIndex + 1])
  }

  const onChangeShape = title => {
    setSelectedShape(title)
  }

  const onChangeDetails = (type, title) => {
    const obj = { ...selectedDetails }
    obj[type] = title
    setSelectedDetails({ ...obj })
  }

  const onChangeDesign = (type, title) => {
    const obj = { ...selectedDesign }
    obj[type] = title
    setSelectedDesign({ ...obj })
  }

  const onSaveNewDesign = () => {
    setBuilderStep('save')
    setExitBuilderModal(true)
  }

  const onChangeInput = e => {
    if (e.target.name === 'design-name') setDesignName(e.target.value)
    else setDesignDescription(e.target.value)
  }

  return (
    <React.Fragment>
      <Container>
        <ProductWrapper>
          {builderStep === 'edit' ? (
            <div>
              <img
                src={require('~/images/Assets/Demo-Trunk-Trans.svg')}
                alt="save-product"
              ></img>
              <img
                src={require('~/images/Assets/Demo-Trunk-White.svg')}
                alt="save-product"
              ></img>
              <img
                src={require('~/images/Assets/Demo-Trunk-Yello.svg')}
                alt="save-product"
              ></img>
              <RotateIcon>
                <img
                  src={require('~/images/Assets/DESKTOP-3d-rotate.svg')}
                  alt="rotate-icon"
                />
              </RotateIcon>
            </div>
          ) : (
            <div>
              <img
                src={require('~/images/Assets/Demo-Trunk-Yello.svg')}
                alt="save-product"
              ></img>
            </div>
          )}
        </ProductWrapper>
        {builderStep === 'edit' ? (
          <EditorWrapper>
            <ExitIcon>
              <img
                src={require('~/images/Assets/DESKTOP-Exit.svg')}
                alt="exit-icon"
              />
            </ExitIcon>
            <TabMenuWrapper>
              {Object.keys(editDetailData).map((title, index) => {
                return (
                  <TabMenuItem
                    key={`tab-${index}`}
                    active={title === selectedMenu}
                    onClick={() => setSelectedMenu(title)}
                  >
                    {title}
                  </TabMenuItem>
                )
              })}
              <TabUnderLine />
            </TabMenuWrapper>

            {(() => {
              switch (selectedMenu) {
                case 'shape':
                  return (
                    <React.Fragment>
                      {editDetailData[selectedMenu].map((item, index) => (
                        <SelectionWrapper key={`shape-wrapper-${index}`}>
                          <ItemWrapper
                            size="full"
                            onClick={() => onChangeShape(item.title)}
                            selected={selectedShape === item.title}
                          >
                            <ItemIcon selected={selectedShape === item.title}>
                              <img src={item.icon} alt="shape-icon" />
                            </ItemIcon>
                            <ItemBody>
                              <ItemHeader>
                                <ItemTitle
                                  selected={selectedShape === item.title}
                                >
                                  {item.title}
                                </ItemTitle>
                                <ItemPrice
                                  selected={selectedShape === item.title}
                                >
                                  ${item.price}
                                </ItemPrice>
                              </ItemHeader>
                              <ItemDescription
                                selected={selectedShape === item.title}
                              >
                                {item.description}
                              </ItemDescription>
                            </ItemBody>
                          </ItemWrapper>
                        </SelectionWrapper>
                      ))}
                      <ButtonWrapper onClick={() => handleChangeNextTab()}>
                        <span>SELECT & CONTINUE</span>
                        <span>{}</span>
                      </ButtonWrapper>
                    </React.Fragment>
                  )
                case 'details':
                  return (
                    <React.Fragment>
                      {Object.keys(editDetailData[selectedMenu]).map(type => {
                        return (
                          <React.Fragment key={`detail-container-${type}`}>
                            <SelectionWrapper>
                              <WrapperTitle>
                                {editDetailData[selectedMenu][type].title}
                              </WrapperTitle>
                              {editDetailData[selectedMenu][type].data.map(
                                (item, index) => (
                                  <React.Fragment key={`detail-${index}`}>
                                    <ItemWrapper
                                      size="full"
                                      bottomGap
                                      onClick={() =>
                                        onChangeDetails(type, item.title)
                                      }
                                    >
                                      <ItemIcon
                                        category={type}
                                        selected={
                                          selectedDetails[type] === item.title
                                        }
                                      >
                                        <img src={item.icon} alt="shape-icon" />
                                      </ItemIcon>
                                      <ItemBody>
                                        <ItemHeader>
                                          <ItemTitle
                                            selected={
                                              selectedDetails[type] ===
                                              item.title
                                            }
                                          >
                                            {item.title}
                                          </ItemTitle>
                                          <ItemPrice
                                            selected={
                                              selectedDetails[type] ===
                                              item.title
                                            }
                                          >
                                            ${item.price}
                                          </ItemPrice>
                                        </ItemHeader>
                                        <ItemDescription
                                          selected={
                                            selectedDetails[type] === item.title
                                          }
                                        >
                                          {item.description}
                                        </ItemDescription>
                                      </ItemBody>
                                    </ItemWrapper>
                                  </React.Fragment>
                                )
                              )}
                            </SelectionWrapper>
                          </React.Fragment>
                        )
                      })}
                      <ButtonWrapper onClick={() => handleChangeNextTab()}>
                        <span>SELECT & CONTINUE</span>
                        <span>{}</span>
                      </ButtonWrapper>
                    </React.Fragment>
                  )
                case 'design':
                  return (
                    <React.Fragment>
                      {Object.keys(editDetailData[selectedMenu]).map(
                        (type, index) => {
                          return (
                            <React.Fragment key={`dg-p-${index}`}>
                              <SelectionWrapper direction="row">
                                <WrapperTitle>{type}</WrapperTitle>
                                {editDetailData[selectedMenu][type].map(
                                  (item, index) => (
                                    <React.Fragment key={`dg-s-${index}`}>
                                      <ItemWrapper
                                        onClick={() =>
                                          onChangeDesign(type, item.title)
                                        }
                                      >
                                        <ItemIcon
                                          selected={
                                            selectedDesign[type] === item.title
                                          }
                                        >
                                          <img
                                            src={item.icon}
                                            alt="shape-icon"
                                          />
                                        </ItemIcon>
                                        <ItemBody>
                                          <ItemHeader direction="col">
                                            {item.price && item.price !== '' ? (
                                              <ItemPrice
                                                selected={
                                                  selectedDesign[type] ===
                                                  item.title
                                                }
                                              >
                                                ${item.price}
                                              </ItemPrice>
                                            ) : (
                                              ''
                                            )}
                                            <ItemTitle
                                              selected={
                                                selectedDesign[type] ===
                                                item.title
                                              }
                                            >
                                              {item.title}
                                            </ItemTitle>
                                          </ItemHeader>
                                        </ItemBody>
                                      </ItemWrapper>
                                    </React.Fragment>
                                  )
                                )}
                              </SelectionWrapper>
                            </React.Fragment>
                          )
                        }
                      )}
                      <ButtonWrapper onClick={() => handleChangeNextTab()}>
                        <span>SELECT & CONTINUE</span>
                        <span>{}</span>
                      </ButtonWrapper>
                    </React.Fragment>
                  )
                case 'story':
                  return (
                    <React.Fragment>
                      <SelectionWrapper>
                        {editDetailData[selectedMenu].map((item, index) => (
                          <FormWrapper key={`st-s-${index}`}>
                            <FormLabel>{item.title}</FormLabel>
                            {item.placeholder && item.placeholder !== '' ? (
                              <FormInput
                                rows={item.rows}
                                placeholder={item.placeholder}
                                name={item.name}
                                onChange={e => onChangeInput(e)}
                              ></FormInput>
                            ) : (
                              ''
                            )}
                          </FormWrapper>
                        ))}
                      </SelectionWrapper>
                      <CoCreatorItem>
                        <div>
                          <img
                            src={require('~/images/Assets/DESKTOP-More-white.svg')}
                            alt="more"
                          ></img>
                        </div>
                        <span>Add Co-Creator</span>
                      </CoCreatorItem>
                      <ButtonWrapper
                        onClick={() => onSaveNewDesign()}
                        enabled={designName !== '' && designDescription !== ''}
                        saveDesign
                      >
                        <span>SAVE NEW DESIGN</span>
                      </ButtonWrapper>
                    </React.Fragment>
                  )
                default:
                  return <React.Fragment></React.Fragment>
              }
            })()}
          </EditorWrapper>
        ) : (
          <SaveWrapper>
            <SaveHeader>
              <Letter
                font="Titillium Bold"
                size={18}
                sizeLaptopL={20}
                color="#202122"
              >
                Yeah! Your design has been successfully saved in your profile
                until approval.
              </Letter>
              <br />
              <br />
              <Letter size={18} sizeLaptopL={18} color="#202122">
                If you design is approved it will be listed at{' '}
                <strong>$32.95</strong> and you will need to reach{' '}
                <strong>40 pre-orders within 40 days.</strong>
              </Letter>
            </SaveHeader>

            <SaveBody>
              <SaveBodyTitle>
                <Letter size={15} color="#202122">
                  Would you like to link the design to one of your Rooms?
                </Letter>
              </SaveBodyTitle>
              <CardWrapper>
                {cardData.map((item, index) => (
                  <CardItem
                    onClick={() => setSelectedCard(index)}
                    selected={selectedCard === index}
                    key={`card-s-${index}`}
                  >
                    <img src={item.url} alt="card-img"></img>
                    <CardTitle selected={selectedCard === index}>
                      {item.title}
                    </CardTitle>
                  </CardItem>
                ))}
              </CardWrapper>
            </SaveBody>
            <ButtonWrapper>
              <span>CLOSE</span>
            </ButtonWrapper>
          </SaveWrapper>
        )}
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f7;
  @media ${device.tablet} {
    flex-direction: row;
    height: 100vh;
  }
`

const ProductWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f2f2f7;
  min-height: 120vw;
  & > div {
    display: flex;
    position: absolute;
    width: 80%;
    max-height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & > img {
      width: 100%;
    }
  }
  & > img {
    position: absolute;
    max-width: 800px;
    max-height: 80vh;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media ${device.tablet} {
    height: 100%;
    margin: 0px;
    min-height: 100vh;
    & > div {
      max-width: 800px;
      top: 42%;
    }
  }
`

const RotateIcon = styled.div`
  position: absolute;
  right: -30px;
  bottom: -30px;
  cursor: pointer;
  & > img {
    width: 35px;
    height: 35px;
  }
  &:hover {
    & > img {
      transform: scale(1.05);
    }
  }
  @media ${device.tablet} {
  }
`

const EditorWrapper = styled.div`
  position: relative;
  background-color: white;
  @media ${device.tablet} {
    width: 600px;
    padding: 80px 60px 20px 40px;
    height: 100%;
    overflow-y: auto;
  }
`

const ExitIcon = styled.div`
  position: absolute;
  top: calc(-120vw + 20px);
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 5px;
  & img {
    width: 50px;
    height: 50px;
  }

  @media ${device.tablet} {
    top: 20px;
    width: 30px;
    height: 30px;
    right: 25px;
    & img {
      width: 30px;
      height: 30px;
    }
  }
`

const TabMenuWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 20px;
  background-color: #f2f2f7;
  @media ${device.tablet} {
    padding: 0px;
    background-color: white;
  }
`

const TabUnderLine = styled.div`
  display: none;
  @media ${device.tablet} {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 2px;
    border-bottom: 1px solid gray;
    z-index: -1;
  }
`

const TabMenuItem = styled.div`
  text-transform: capitalize;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  border-bottom: ${props => (props.active ? '2px solid #202122' : '')};
  font-family: ${props => (props.active ? 'Titillium Bold' : '')};
  @media ${device.tablet} {
  }
`

const SelectionWrapper = styled.div`
  display: flex;
  flex-flow: ${props => (props.direction === 'row' ? 'row wrap' : 'column')};
  padding: ${props =>
    props.direction === 'row' ? '30px 15px 0 15px' : '30px 10px 0px 10px'};

  @media ${device.mobileL} {
    padding: ${props =>
      props.direction === 'row' ? '30px 20px 0 20px' : '50px 20px 0px 20px'};
  }
  @media ${device.tablet} {
    padding: ${props =>
      props.direction === 'row' ? '30px 0 0 0' : '10px 0px 0px 0px'};
  }
`

const WrapperTitle = styled.div`
  font-size: 17px;
  font-family: Titillium Bold;
  text-transform: uppercase;
  width: 100%;
  @media ${device.tablet} {
  }
`

const ItemWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: ${props => (props.size === 'full' ? '100%;' : '50%')};
  padding: ${props =>
    props.size === 'full' ? '10px 5px 10px 5px' : '10px 20px 10px 0px'};
  border-radius: 10px;
  margin-bottom: ${props => (props.bottomGap ? '10px' : '0px')};
  @media ${device.tablet} {
    padding: ${props =>
      props.size === 'full' ? '20px 0px' : '10px 20px 10px 0px'};
    margin-bottom: 0px;
  }
`

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 8px;
  border-radius: 50%;
  border: 1px solid gray;
  margin-right: 10px;
  background-color: ${props => (props.selected ? '#FF8C00' : '')};
  & img {
    width: 50px;
    height: 50px;
    transform: ${props =>
      props.category === 'packaging' ? 'scale(1.3) translate(2px, -7px)' : ''};
  }
  @media ${device.tablet} {
  }
`

const ItemBody = styled.div`
  @media ${device.tablet} {
    width: 100%;
  }
`

const ItemHeader = styled.div`
  display: flex;
  justify-content: ${props =>
    props.direction === 'col' ? 'flex-start' : 'space-between'};
  flex-direction: ${props => (props.direction === 'col' ? 'column' : 'row')};
  @media ${device.tablet} {
  }
`

const ItemTitle = styled.div`
  line-height: 1.2;
  color: ${props => (props.selected ? '#FF8C00' : '')};
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 17px;
  }
`

const ItemPrice = styled.div`
  color: ${props => (props.selected ? '#FF8C00' : '')};
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 17px;
  }
`

const ItemDescription = styled.div`
  color: #a9acaf;
  color: ${props => (props.selected ? '#161617' : '#a9acaf')};
  @media ${device.tablet} {
    line-height: 1.2;
  }
`

const FormWrapper = styled.div`
  display: block;
  margin: 15px 0px;
  @media ${device.tablet} {
  }
`

const FormLabel = styled.p`
  font-size: 18px;
  font-family: Titillium Bold;
  margin-bottom: 8px;
  padding: 0px 5px;
  @media ${device.tablet} {
    padding: 0px;
  }
`
const FormInput = styled.textarea`
  width: 100%;
  background-color: #f2f2f7;
  padding: 13px 20px;
  outline: none;
  border: none;
  resize: none;
  @media ${device.tablet} {
  }
`

const CoCreatorItem = styled.div`
  display: flex;
  padding: 0px 20px;
  margin-bottom: 20px;
  & div:first-child {
    position: relative;
    color: white;
    background-color: #ff8c00;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    font-size: 20px;
    & img {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 15px;
      height: 15px;
      transform: translate(-50%, -50%);
    }
  }
  @media ${device.tablet} {
    padding: 0px 0px;
    margin-bottom: 0px;
  }
`

const ButtonWrapper = styled.div`
  justify-content: center;
  padding: 15px 20px;
  background-color: #ff8c00;
  color: white;
  margin-top: 20px;
  cursor: pointer;
  display: ${props => (!props.enabled && props.saveDesign ? 'none' : 'flex')};
  & span:first-child {
    letter-spacing: 1.3px;
    font-family: Titillium Bold;
  }
  @media ${device.tablet} {
    display: flex;
  }
`

const SaveWrapper = styled.div`
  position: relative;
  background-color: white;

  @media ${device.tablet} {
    width: 600px;
    padding: 80px 60px 20px 40px;
    height: 100%;
    overflow-y: auto;
  }
`

const SaveHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
  padding: 0px 20px 30px 20px;
  background-color: #f2f2f7;
  & strong {
    color: #ff8c00;
    font-family: Titillium Bold;
  }
  @media ${device.tablet} {
    background-color: white;
    text-align: inherit;
    padding: 0px;
  }
`

const SaveBody = styled.div`
  margin: 40px 0px;
`

const SaveBodyTitle = styled.div`
  padding: 0px 15px;
  margin-bottom: 10px;
  font-weight: 600;
  @media ${device.tablet} {
    padding: 0px;
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  width: 400vw;
  @media ${device.tablet} {
    width: 100%;
  }
`

const CardItem = styled.div`
  width: 32vw;
  padding: 5px;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#FF8C00' : '')};
  & img {
    width: 100%;
  }
  @media ${device.tablet} {
    width: 33%;
  }
`

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  background-color: ${props => (props.selected ? '#FF8C00' : '#161617')};
  color: white;
  height: 35px;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
`
export default ProductBuilderSection
