import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { Letter } from '~/utils/styles'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'

import CloseIcon from '~/images/Assets/Close-modal.svg'
import BackIcon from '~/images/Assets/DESKTOP-Back from Cart.svg'
import ActiveIcon from '~/images/Assets/Active.svg'
import CircleUnActiveIcon from '~/images/Assets/Circle unactive.svg'
import CirCleCompleteIcon from '~/images/Assets/Circle completed.svg'
import SendIcon from '~/images/Assets/Send-contact.svg'

const initialFuncType = [
  { active: false, label: 'Improve existing product' },
  { active: false, label: 'Pitch a new product' },
  {
    active: false,
    label: 'Co-create a limited edition based on existing products',
  },
  { active: false, label: 'Submit your print for a limited edition' },
]

const initialProducts = [
  {
    type: 'row',
    data: [
      {
        imgUrl: require('~/images/Assets/DESKTOP-Boxer brief icon.svg'),
        title: 'Boxer Brief',
      },
      {
        imgUrl: require('~/images/Assets/DESKTOP-Trunks icon.svg'),
        title: 'Trunks',
      },
      {
        imgUrl: require('~/images/Assets/DESKTOP-Briefs icon.svg'),
        title: 'Brief',
      },
      {
        imgUrl: require('~/images/Assets/DESKTOP-Tees icon.svg'),
        title: 'Tee',
      },
      {
        imgUrl: require('~/images/Assets/DESKTOP-Boxer brief icon.svg'),
        title: 'Lounge Pants',
      },
    ],
  },
  { type: 'col', data: [] },
  {
    type: 'col',
    data: [
      {
        imgUrl: require('~/images/Assets/DESKTOP-Filters-All-categories.svg'),
        title: 'Underwear',
        text: 'Start a design of a Brief, Boxer Briefs or Trunks',
      },
      {
        imgUrl: require('~/images/Assets/DESKTOP-Tee-reviews.svg'),
        title: 'Tee',
        text: 'Start adesign of a Tee and consectetur elit, sed do eiusmod',
      },
      {
        imgUrl: require('~/images/Assets/DESKTOP-Boxer-brief-reviews.svg'),
        title: 'Lounge Pants',
        text: 'Start a design of Pants and adipiscing elit, sed do eiusmod',
      },
    ],
  },
  { type: 'col', data: [] },
]

const modalTitle = [
  'CO-CREATION TOOL',
  'BACK TO OPTION',
  'UNDERWEAR',
  'UNDERWEAR / SPORT',
  'UNDERWEAR / SPORT',
  'UNDERWEAR / SPORT',
]
const surveyTitle = [
  'Is cereal soup?',
  'Example of a question ipsum dolor sit amet, adipiscing elit, sed do eiusmod?',
]
const descriptionHeader = [
  { title: ['Hey Jake,', ' Welcome to T-Bo Co-Creation!'] },
  { title: [] },
  { title: [] },
  { title: [] },
  { title: [] },
  { title: [] },
]
const descriptionBody = [
  'What do you want to do today?',
  'What product are we talking about',
  'For what type of activities is this product made for?',
  'Hey! The Tribesman are already co-creating similar products, do you want to join them or continue with a new product?',
  'Awesome! Now I’m going to create a room for your project. In this room you will be able to:',
  'Who else do you want to invite to join this exciting project?',
]

const surveyItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const CoCreationToolModal = () => {
  const { setCoCreationToolModal } = useContext(CommunityContext)
  const [dispMode, setDispMode] = useState('selection')
  const [modalStep, setModalStep] = useState(0)
  const [funcStep, setFuncStep] = useState(0)
  const [surveyStep, setSurveyStep] = useState(0)
  const [funcType, setFuncType] = useState(initialFuncType)
  const [nextStepAllow, setNextStepAllow] = useState(false)
  const [continueAllow, setContinueAllow] = useState(false)
  const [products, setProducts] = useState(initialProducts)
  const [selectedKey, setSelectedKey] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [focusedKey, setFocusedKey] = useState('')
  const [activeActivity, setActiveActivity] = useState('')
  const [inviteType, setInviteType] = useState('name')

  const onActionMode = index => {
    const tempFuncType = [...funcType]
    tempFuncType.forEach(item => {
      item.active = false
    })
    tempFuncType[index].active = true
    setFuncType(tempFuncType)
    setFuncStep(index)
    setNextStepAllow(true)
  }

  const onNextStep = () => {
    setModalStep(modalStep + 1)
    // if (modalStep === 0) {
    //   setModalStep(1)
    // } else {
    //   setDispMode('survey')
    // }

    setNextStepAllow(false)
  }

  const onSelectProduct = title => {
    setSelectedProduct(title)
    setNextStepAllow(true)
  }

  const onBackToOption = () => {
    setModalStep(0)
    setNextStepAllow(false)
  }

  const backToSelectionModal = () => {
    setDispMode('selection')
    setContinueAllow(false)
    setSurveyStep(0)
  }

  const onContinueSurvey = () => {
    setSurveyStep(surveyStep + 1)
    setContinueAllow(false)
  }

  const onChooseCategory = key => {
    setSelectedKey(key)
    setContinueAllow(true)
  }

  const onFocusTextArea = key => {
    onChooseCategory(key)
    setFocusedKey(key)
  }

  const onFocusOutTextArea = () => {
    setFocusedKey('')
  }

  const onActiveActivity = index => {
    setActiveActivity(index)
    setNextStepAllow(true)
  }

  const onChangeActivityOther = e => {
    if (e.target.value !== '') setNextStepAllow(true)
    // else setNextStepAllow(false)
  }

  return (
    <React.Fragment>
      {dispMode === 'selection' ? (
        <Container>
          <img
            src={CloseIcon}
            style={modalStep !== 0 ? { left: 'unset', right: '50px' } : {}}
            onClick={() => setCoCreationToolModal(false)}
          />
          {modalStep !== 0 && (
            <img src={BackIcon} onClick={() => onBackToOption()} />
          )}
          <Header
            style={modalStep === 1 ? { justifyContent: 'flex-start' } : {}}
            activity={modalStep === 2}
            activityDetail={
              modalStep === 3 || modalStep === 4 || modalStep === 5
            }
          >
            <Letter
              font="Titillium Bold"
              size={18}
              sizeDesktop={22}
              sizeLaptopL={20}
              color="#202122"
              onClick={() => (modalStep === 1 ? onBackToOption() : '')}
              style={modalStep === 1 ? { cursor: 'pointer' } : {}}
            >
              {modalTitle[modalStep]}
            </Letter>
            <img
              src={require('~/images/Assets/act-underwear.png')}
              alt="act-underwear"
            />
          </Header>
          <Description style={modalStep === 1 ? { alignItems: 'center' } : {}}>
            <DescriptionLogo
              src={require('~/images/Assets/Logo-round.png')}
              alt=""
            />
            <DescriptionBody>
              {descriptionHeader[modalStep].title.map((item, index) => {
                return (
                  <Letter
                    font="Titillium Black"
                    size={18}
                    sizeDesktop={26}
                    sizeLaptopL={24}
                    color="#202122"
                    key={`description-header-${index}`}
                  >
                    {item}
                  </Letter>
                )
              })}
              <Letter
                font="Titillium Bold"
                size={16}
                sizeDesktop={22}
                sizeLaptopL={20}
                color="#202122"
              >
                {descriptionBody[modalStep]}
              </Letter>
            </DescriptionBody>
          </Description>
          <Wrapper>
            {(() => {
              switch (modalStep) {
                case 0:
                  return (
                    <React.Fragment>
                      {funcType.map((item, id) => {
                        return (
                          <ButtonItem
                            active={item.active}
                            onClick={() => onActionMode(id)}
                            key={`btn-item-${id}`}
                          >
                            {item.label}
                          </ButtonItem>
                        )
                      })}
                    </React.Fragment>
                  )
                case 1:
                  return (
                    <React.Fragment>
                      <ProductContainer type={products[funcStep].type}>
                        {products[funcStep].data.map((item, index) => {
                          return (
                            <React.Fragment key={`prod-container-${index}`}>
                              <ProductWrapper
                                type={products[funcStep].type}
                                selected={item.title === selectedProduct}
                                onClick={() => onSelectProduct(item.title)}
                              >
                                {item.title === selectedProduct && (
                                  <SelectedProfile
                                    type={products[funcStep].type}
                                    src={require('~/images/Assets/Profile pic.png')}
                                    alt="selected-profile"
                                  />
                                )}
                                <ProductImg
                                  type={products[funcStep].type}
                                  src={item.imgUrl}
                                  alt="product-image"
                                />
                                <ProductDescription
                                  type={products[funcStep].type}
                                >
                                  <ProductDescriptionTitle
                                    type={products[funcStep].type}
                                    checked={item.title === selectedProduct}
                                  >
                                    {item.title || ''}
                                  </ProductDescriptionTitle>
                                  <ProductDescriptionText
                                    type={products[funcStep].type}
                                  >
                                    {item.text || ''}
                                  </ProductDescriptionText>
                                </ProductDescription>
                              </ProductWrapper>
                            </React.Fragment>
                          )
                        })}
                      </ProductContainer>
                    </React.Fragment>
                  )
                case 2:
                  return (
                    <React.Fragment>
                      <ActivityButton
                        active={activeActivity === 0}
                        onClick={() => onActiveActivity(0)}
                      >
                        <img
                          src={require('~/images/Assets/dummyProfilePic.svg')}
                          alt="active-activity-input"
                        />
                        EveryDay
                      </ActivityButton>
                      <ActivityButton
                        active={activeActivity === 1}
                        onClick={() => onActiveActivity(1)}
                      >
                        <img
                          src={require('~/images/Assets/dummyProfilePic.svg')}
                          alt="active-activity-input"
                        />
                        Sport
                      </ActivityButton>
                      <ActivityButton
                        active={activeActivity === 2}
                        onClick={() => onActiveActivity(2)}
                      >
                        <img
                          src={require('~/images/Assets/dummyProfilePic.svg')}
                          alt="active-activity-input"
                        />
                        Chilling at home
                      </ActivityButton>
                      <ActivityOtherButton
                        placeholder="Other"
                        onChange={e => onChangeActivityOther(e)}
                      />
                    </React.Fragment>
                  )
                case 3:
                  return (
                    <React.Fragment>
                      <OtherRoomWrapper>
                        <OtherRoomLeft>
                          <img
                            src={require('~/images/Assets/other-room-item-avatar-1.png')}
                            alt="other-room"
                          />
                        </OtherRoomLeft>
                        <OtherRoomRight>
                          <OtherRoomMemberNum>32 MEMBERS</OtherRoomMemberNum>
                          <OtherRoomTitle>Sport Underwear</OtherRoomTitle>
                          <OtherRoomFoother>
                            <span>Last activity today</span>
                            <JoinButton>JOIN</JoinButton>
                          </OtherRoomFoother>
                        </OtherRoomRight>
                      </OtherRoomWrapper>

                      <OtherRoomWrapper>
                        <OtherRoomLeft>
                          <img
                            src={require('~/images/Assets/other-room-item-avatar-2.png')}
                            alt="other-room"
                          />
                        </OtherRoomLeft>
                        <OtherRoomRight>
                          <OtherRoomMemberNum>32 MEMBERS</OtherRoomMemberNum>
                          <OtherRoomTitle>
                            Sport example name long name
                          </OtherRoomTitle>
                          <OtherRoomFoother>
                            <span>Last activity 02.11.2020</span>
                            <JoinButton>JOIN</JoinButton>
                          </OtherRoomFoother>
                        </OtherRoomRight>
                      </OtherRoomWrapper>
                      <CreateNewRoomButton onClick={() => setModalStep(4)}>
                        I WANT TO CREATE A NEW ROOM
                      </CreateNewRoomButton>
                    </React.Fragment>
                  )
                case 4:
                  return (
                    <React.Fragment>
                      <CreateRoomCategoryWrapper>
                        <CreateRoomCategoryItem>
                          <CategoryMark />
                          Invite co-creators
                        </CreateRoomCategoryItem>

                        <CreateRoomCategoryItem>
                          <CategoryMark />
                          Discuss about the product
                        </CreateRoomCategoryItem>

                        <CreateRoomCategoryItem>
                          <CategoryMark />
                          Define functionalities and requirements
                        </CreateRoomCategoryItem>
                      </CreateRoomCategoryWrapper>

                      <CreateRoomDescription>
                        To help you with the process I’ve created a “To Do”
                        list. So let’s start by giving your room a name:
                      </CreateRoomDescription>

                      <CreateRoomFormWrapper>
                        <CreateRoomInputLabel>Room name</CreateRoomInputLabel>
                        <CreateRoomInput placeholder="Swimming briefs" />
                      </CreateRoomFormWrapper>

                      <ContinueButton onClick={() => setModalStep(5)}>
                        CONTINUE
                      </ContinueButton>

                      <MobileCreateRoomFormWrapper>
                        <input placeholder="Swimming briefs" />
                        <img
                          src={require('~/images/Assets/Profile pic.png')}
                          alt="other-room"
                        />
                        <div onClick={() => setModalStep(5)}>
                          <img src={SendIcon} alt="send-btn" />
                        </div>
                      </MobileCreateRoomFormWrapper>
                    </React.Fragment>
                  )

                case 5:
                  return (
                    <React.Fragment>
                      <InviteCategoryWrapper>
                        <InviteCategoryItem
                          active={inviteType === 'name'}
                          onClick={() => setInviteType('name')}
                        >
                          Invite by name
                          {inviteType === 'name' && <CategoryActiveBorder />}
                        </InviteCategoryItem>

                        <InviteCategoryItem
                          active={inviteType === 'email'}
                          onClick={() => setInviteType('email')}
                        >
                          Invite by email
                          {inviteType === 'email' && <CategoryActiveBorder />}
                        </InviteCategoryItem>
                      </InviteCategoryWrapper>

                      <InviteSearchItem
                        type={inviteType === 'name' ? 'text' : 'email'}
                        placeholder={
                          inviteType === 'name'
                            ? 'Search by member name'
                            : 'Search by member email'
                        }
                      />
                      <SkipButtonWrapper>
                        <SkipButton>SKIP FOR NOW</SkipButton>
                      </SkipButtonWrapper>
                    </React.Fragment>
                  )
                default:
                  return null
              }
            })()}
          </Wrapper>
          {nextStepAllow === true && (
            <ConfirmWrapper>
              <ConfirmButton onClick={() => onNextStep()}>
                {(() => {
                  switch (modalStep) {
                    case 0:
                      return 'START NOW'
                    case 1:
                      return 'CONTINUE'
                    case 2:
                      return 'CONTINUE'
                    default:
                      return null
                  }
                })()}
              </ConfirmButton>
            </ConfirmWrapper>
          )}
        </Container>
      ) : (
        <SurveyContainer>
          <img src={CloseIcon} onClick={() => backToSelectionModal()} />
          <Stepper>
            {surveyItems.map(item => {
              if (item < surveyStep + 1)
                return <img src={CirCleCompleteIcon} key={'inactive' + item} />
            })}
            <img src={ActiveIcon} alt="ActiveIcon" />
            {surveyItems.map(item => {
              if (item > surveyStep + 1)
                return <img src={CircleUnActiveIcon} key={'inactive' + item} />
            })}
          </Stepper>
          <SurveyWrapper>
            <SurveyHeader>
              <SurveyLogo
                src={require('~/images/Assets/Logo-round.png')}
                alt="survey-logo"
              />
              <SurveyHeaderBody>
                <SurveyStep>{surveyStep + 1}/10</SurveyStep>
                <SurveyTitle>{surveyTitle[surveyStep]}</SurveyTitle>
              </SurveyHeaderBody>
            </SurveyHeader>
            <SurveyBody>
              {(() => {
                switch (surveyStep) {
                  case 0:
                    return (
                      <>
                        <SurveyItemButton
                          key="survey-1-1"
                          checked={selectedKey === 'survey-1-1'}
                          onClick={() => onChooseCategory('survey-1-1')}
                        >
                          <div>
                            <img
                              src={require('~/images/Assets/Profile pic.png')}
                              alt="profile-pic"
                            />
                          </div>
                          <div>Yes</div>
                        </SurveyItemButton>
                        <SurveyItemButton
                          key="survey-1-2"
                          checked={selectedKey === 'survey-1-2'}
                          onClick={() => onChooseCategory('survey-1-2')}
                        >
                          <div>
                            <img
                              src={require('~/images/Assets/Profile pic.png')}
                              alt="profile-pic"
                            />
                          </div>
                          <div>No</div>
                        </SurveyItemButton>
                        <SurveyItemButton
                          key="survey-1-3"
                          checked={selectedKey === 'survey-1-3'}
                          onClick={() => onChooseCategory('survey-1-3')}
                        >
                          <div>
                            <img
                              src={require('~/images/Assets/Profile pic.png')}
                              alt="profile-pic"
                            />
                          </div>
                          <div>Who is asking?</div>
                        </SurveyItemButton>
                        <SurveyItemInput
                          key="survey-1-4"
                          checked={selectedKey === 'survey-1-4'}
                          focused={focusedKey === 'survey-1-4'}
                        >
                          <div>
                            <img
                              src={require('~/images/Assets/Profile pic.png')}
                              alt="profile-pic"
                            />
                          </div>
                          <textarea
                            rows="1"
                            type="text"
                            placeholder="Give your answer..."
                            onFocus={() => onFocusTextArea('survey-1-4')}
                            onBlur={() => onFocusOutTextArea()}
                          ></textarea>
                        </SurveyItemInput>
                      </>
                    )
                  case 1:
                    return (
                      <>
                        <SurveyItemInput
                          key="survey-1-5"
                          checked={selectedKey === 'survey-1-5'}
                          focused={focusedKey === 'survey-1-5'}
                        >
                          <div>
                            <img
                              src={require('~/images/Assets/Profile pic.png')}
                              alt="profile-pic"
                            />
                          </div>
                          <textarea
                            rows="4"
                            type="text"
                            placeholder="Write a comment"
                            onFocus={() => onFocusTextArea('survey-1-5')}
                            onBlur={() => onFocusOutTextArea()}
                          ></textarea>
                          <div>
                            <img src={SendIcon} alt="send" />
                          </div>
                        </SurveyItemInput>
                      </>
                    )
                  case 2:
                    return
                  case 3:
                    return
                  default:
                }
              })()}
            </SurveyBody>
            <SurveyProduct
              src={require('~/images/Assets/Survey-model.png')}
              alt="survey-product"
            />
            {continueAllow === true && (
              <SurveyStepButton onClick={() => onContinueSurvey()}>
                Continue
              </SurveyStepButton>
            )}
          </SurveyWrapper>
        </SurveyContainer>
      )}
    </React.Fragment>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: block;
  width: 100%;
  height: 100vh;
  background: white;
  overflow: scroll;
  z-index: 20;
  & > img {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      transform: scale(1.05);
    }
  }
  & > img:nth-child(2) {
    left: 20px;
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 30%;
    max-width: 650px;
    min-width: 580px;
    height: 100vh;
    max-height: 100%;
    padding: 20px 80px 100px 30px;
    overflow-x: hidden;
    & > img {
      top: 40px;
      left: 30px;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 60px;
  position: relative;
  ${props =>
    props.activity
      ? 'background-color: #F2F2F7; height: 200px; margin-bottom: 30px;'
      : ''}
  ${props =>
    props.activityDetail
      ? 'background-color: #F2F2F7; margin-bottom: 30px;'
      : ''}
  & img {
    ${props => (props.activity ? 'display: block' : 'display: none')};
    transform: scale(1, 1.1) translate(-50%, 0);
    width: 170px;
    position: absolute;
    bottom: -25px;
    left: 50%;
  }
  @media ${device.laptop} {
    ${props =>
      props.activity
        ? '    margin: -20px -80px -20px -30px; height: 230px;position: relative; background-color: #F2F2F7; padding: 40px 45px;'
        : 'padding: 20px 45px;'}
    ${props =>
      props.activityDetail
        ? '    margin: -20px -80px -20px -30px; height: 100px;position: relative; background-color: #F2F2F7; padding: 40px 45px;'
        : 'padding: 20px 45px;'}
  }
`

const Description = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: start;
  padding: 15px;
  @media ${device.laptop} {
    padding: 0px;
    margin-top: 100px;
  }
`

const DescriptionLogo = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px 20px 0 0;
  border-radius: center;
`

const DescriptionBody = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  & span:last-child {
    margin-top: 5px;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px 20px 0px 20px;
  @media ${device.laptop} {
    padding: 10px;
    margin-top: 50px;
  }
`

const ButtonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 20px;
  max-height: 70px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: ${props => (props.active ? '#FF8C00' : '#202122')};
  background-color: ${props => (props.active ? '#f2f2f7' : '#FFFFFF')};
  border: ${props => (props.active ? 'none' : '1px solid #CECECE')};
  &:hover {
    background-color: #f2f2f7;
    color: #ff8c00;
    border: none;
  }
`

const ConfirmWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px;
  margin-top: 20px;
  @media ${device.laptop} {
    position: unset;
    bottom: unset;
    padding: 10px;
    margin-top: 0px;
  }
`

const ConfirmButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;  
  width 100%;
  padding: 15px;
  background-color: #FF8C00;
  color: white;
  cursor: pointer;
  &: hover {
    outline: 1px solid gray;
  }
`

const ProductContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${props => (props.type === 'col' ? 'column' : 'row')};
`

const ProductWrapper = styled.div`
  position: relative;
  display: flex;
  width: ${props => (props.type === 'col' ? '100%' : '33%')};
  flex-direction: ${props => (props.type === 'col' ? 'row' : 'column')};
  border: ${props => (props.type === 'col' ? '1px solid gray' : 'none')};
  margin-bottom: ${props => (props.type === 'col' ? '10px' : '0px')};
  align-items: center;
  padding: 10px;
  cursor: pointer;
`

const SelectedProfile = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  left: ${props => (props.type === 'col' ? '-10px' : '-8px')};
  bottom: ${props => (props.type === 'col' ? '-10px' : '25px')};
  @media ${device.laptop} {
    left: ${props => (props.type === 'col' ? '-15px' : '-5px')};
    top: ${props => (props.type === 'col' ? '-15px' : '-5px')};
  }
`

const ProductImg = styled.img`
  width: ${props => (props.type === 'col' ? '60px' : '100%')};
  height: ${props => (props.type === 'col' ? '60px' : 'auto')};
  margin: ${props => (props.type === 'col' ? '0 25px' : '0px')};
`

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductDescriptionTitle = styled.div`
  display: flex;
  justify-content: ${props => (props.type === 'col' ? 'flex-start' : 'center')};
  text-align: center;
  font-weight: 600;
  color: ${props => (props.checked ? '#FF8C00' : '#202122')};
`

const ProductDescriptionText = styled.div`
  line-height: 19px;
`

const ActivityButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 50px;
  width: calc(100% - 50px);
  height: 45px;
  padding: 15px;
  border: ${props => (props.active ? '' : '1px solid #a9acaf')};
  color: ${props => (props.active ? '#161617' : '#a9acaf')};
  font-family: ${props => (props.active ? 'Titillium Bold' : 'Titillium Web')};
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: ${props => (props.active ? '#F2F2F7' : 'white')};
  & img {
    position: absolute;
    left: -55px;
    top: 2px;
    display: ${props => (props.active ? 'block' : 'none')};
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
  @media ${device.tablet} {
    margin-left: 0px;
    width: 100%;
    height: 60px;
    margin-bottom: 15px;
    & img {
      position: unset;
      left: unset;
      width: 50px;
      height: 50px;
    }
  }
`

const ActivityOtherButton = styled.input`
  display: flex;
  align-items: center;
  height: 45px;
  margin: 20px 0px;
  padding: 15px;
  background-color: #f2f2f7;
  border: none;
  color: #a9acaf;
  font-size: 18px;
  margin-left: 50px;
  width: calc(100% - 50px);
  margin-bottom: 50px;
  @media ${device.tablet} {
    margin-left: 0px;
    width: 100%;
    height: 60px;
    margin-bottom: 0px;
  }
`

const OtherRoomWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`

const OtherRoomLeft = styled.div`
  width: 120px;
  height: 120px;
  & img {
    width: 100%;
    height: 1005;
  }
`

const OtherRoomRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 100px);
  padding: 5px 15px;
`

const OtherRoomMemberNum = styled.div`
  color: #7d7f81;
  font-size: 13px;
  font-family: Titillium Bold;
  @media ${device.tablet} {
    font-size: 16px;
  }
`

const OtherRoomTitle = styled.div`
  font-size: 20px;
  font-family: Titillium Bold;
`

const OtherRoomFoother = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  & span {
    color: #ff8c00;
  }
  @media ${device.tablet} {
    font-size: 16px;
  }
`

const JoinButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 35px;
  color: white;
  background-color: #ff8c00;
  font-size: 14px;
  font-family: Titillium Bold;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
  &:active {
    font-size: 14px;
  }
  @media ${device.tablet} {
    width: 100px;
    height: 40px;
    font-size: 16px;
    &:hover {
      font-size: 17px;
    }
    &:active {
      font-size: 16px;
    }
  }
`

const CreateNewRoomButton = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  font-size: 18px;
  font-family: Titillium Bold;
  background-color: #ff8c00;
  color: white;
  cursor: pointer;
  width: 100vw;
  margin-left: -20px;
  &:hover {
    font-size: 19px;
  }
  &:active {
    font-size: 18px;
  }
  @media ${device.tablet} {
    position: unset;
    bottom: unset;
    margin-left: 0px;
    margin-top: 120px;
    width: 100%;
    height: 60px;
  }
`

const CreateRoomCategoryWrapper = styled.div`
  display: block;
  width: 100%;
  padding-left: 50px;
  font-family: Titillium Web;
  font-size: 17px;
  color: #202122;
`

const CreateRoomCategoryItem = styled.div`
  display: flex;
  align-items: center;
`

const CategoryMark = styled.div`
  width: 5px;
  height: 5px;
  background-color: black;
  margin-right: 10px;
`

const CreateRoomDescription = styled.div`
  padding-left: 50px;
  font-size: 19px;
  font-family: Titillium Bold;
  color: black;
  margin-top: 15px;
`

const CreateRoomFormWrapper = styled.div`
  display: none;
  @media ${device.tablet} {
    margin-top: 60px;
    display: block;
  }
`

const CreateRoomInputLabel = styled.div`
  margin-bottom: 15px;
  font-family: Titillium Bold;
  font-size: 17px;
`

const CreateRoomInput = styled.input`
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  background-color: #f2f2f7;
`

const ContinueButton = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  height: 60px;
  font-size: 18px;
  font-family: Titillium Bold;
  background-color: #ff8c00;
  color: white;
  cursor: pointer;
  width: 100vw;
  margin-left: -20px;
  &:hover {
    font-size: 19px;
  }
  &:active {
    font-size: 18px;
  }
  @media ${device.tablet} {
    display: flex;
    margin-left: 0px;
    width: 100%;
  }
`

const MobileCreateRoomFormWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100vw;
  height: 70px;
  margin-left: -20px;
  & input {
    width: 100%;
    height: 100%;
    background-color: #f2f2f7;
    padding: 10px 70px;
    outline: none;
    border: none;
  }
  & > img {
    position: absolute;
    left: 10px;
    top: 15px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  & div {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    background-color: #ff8c00;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      width: 30px;
      height: 30px;
    }
  }
  @media ${device.tablet} {
    display: none;
  }
`

const InviteCategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border-bottom: 1px solid gray;
  @media ${device.tablet} {
    justify-content: space-between;
  }
`

const InviteSearchItem = styled.input`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 50px;
  margin-top: 25px;
  background-color: #f2f2f7;
  outline: none;
  border: none;
`

const SkipButtonWrapper = styled.div`
  margin-top: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`

const SkipButton = styled.div`
  display: flex;
  felx-wrap: wrap;
  color: #a9acaf;
  font-size: 16px;
  font-family: Titillium Bold;
  cursor: pointer;
  letter-spacing: 2px;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1);
  }
  @media ${device.laptop} {
    font-size: 18px;
  }
`

const InviteCategoryItem = styled.div`
  position: relative;
  font-size: 18px;
  cursor: pointer;
  font-family: ${props => (props.active ? 'Titillium Bold' : 'Titillium Web')};
  &:first-child {
    margin-right: 20px;
  }
  @media ${device.tablet} {
    font-size: 21px;
  }
`

const CategoryActiveBorder = styled.div`
  position: absolute;
  bottom: -5px;
  border-bottom: 4px solid black;
  display: block;
  width: 100%;
`

const SurveyContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 12;
  width: 100vw;
  height: 100vh;
  background-color: #f7f7fa;
  & > img {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    &: hover {
      transform: scale(1.05);
    }
  }
  @media ${device.laptop} {
    & > img {
      left: 80px;
    }
  }
`

const SurveyWrapper = styled.div`
  position: absolute;
  max-width: 860px;
  max-height: 660px;
  background-color: #ffffff;
  width: 100%;
  height: 70%;
  left: 0;
  bottom: 0;
  @media ${device.laptop} {
    width: 50%;
    height: 60%;
    left: 50%;
    top: 50%;
    transform: translate(-40%, -55%);
    padding: 30px 30px 30px 15%;
  }
`

const SurveyHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-top: 100px;
  @media ${device.laptop} {
    padding: 40px 10px;
    margin-top: 0;
  }
`

const SurveyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`

const SurveyHeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const SurveyStep = styled.div`
  position: fixed;
  top: 20px;
  left: 30px;
  @media ${device.laptop} {
    position: inherit;
    top: unset;
    left: unset;
    display: block;
    font-size: 20px;
    font-weight: 600;
  }
`

const SurveyTitle = styled.div`
  font-size: 16px;
`

const SurveyBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 15px;
  @media ${device.laptop} {
    padding: 30px 10px 30px 10px;
  }
`

const SurveyItemButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  & div:first-child {
    display: flex;
    align-items: center;
    justify-center: center;
    width: 45px;
    height: 40px;
    margin-right: 20px;
    & img {
      display: ${props => (props.checked ? 'block' : 'none')};
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  & div:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 15px;
    border: ${props => (props.checked ? 'none' : '1px solid #a9acaf')};
    background-color: ${props => (props.checked ? '#F2F2F7' : '#ffffff')};
    color: ${props => (props.checked ? '#161617' : '#a9acaf')};
    font-weight: ${props => (props.checked ? '700' : '400')};
    width: 100%;
    cursor: pointer;
  }
`

const SurveyItemInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  position: ${props => (props.focused ? 'fixed' : '')};
  bottom: ${props => (props.focused ? '0px' : '')};
  left: ${props => (props.focused ? '0px' : '')};
  width: ${props => (props.focused ? '100vw' : '')};
  z-index: ${props => (props.focused ? '14' : '')};
  & div:first-child {
    position: ${props => (props.focused ? 'absolute' : '')};
    left: ${props => (props.focused ? '10px' : '')};
    top: ${props => (props.focused ? '40%' : '')};
    display: flex;
    align-items: center;
    justify-center: center;
    width: 45px;
    height: 40px;
    margin-right: 20px;
    & img {
      display: ${props => (props.focused ? 'flex' : 'none')};
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  & textarea {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 15px 10px;
    margin-top: 25px;
    width: 100%;
    outline: none;
    border: none;
    background-color: #f2f2f7;
    color: ${props => (props.checked ? '#161617' : '#a9acaf')};
    width: ${props => (props.focused ? '100%' : '')};
    height: ${props => (props.focused ? '65px' : '')};
    padding-left: ${props => (props.focused ? '70px' : '')};
  }
  & div:last-child {
    position: absolute;
    right: 0;
    bottom: 0;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #ff8c00;
    z-index: 14;
    display: ${props => (props.focused ? 'flex' : 'none')};
  }
  &:focus {
    border: none;
    outline: none;
  }
  @media ${device.laptop} {
    position: inherit;
    left: unset;
    bottom: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
    & div:first-child {
      position: inherit;
      display: flex;
      align-items: center;
      justify-center: center;
      width: 45px;
      height: 40px;
      margin-right: 20px;
      & img {
        display: ${props => (props.checked ? 'block' : 'none')};
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    & textarea {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 15px 10px;
      margin-top: 25px;
      width: 100%;
      height: auto;
      outline: none;
      border: ${props => (props.checked ? '1px solid #a9acaf' : 'none')};
      background-color: #f2f2f7;
      color: ${props => (props.checked ? '#161617' : '#a9acaf')};
      font-weight: ${props => (props.checked ? '700' : '400')};
    }
    & div:last-child {
      display: none;
    }
  }
`

const SurveyItemTextArea = styled.textarea`
  padding: 15px 10px;
  margin-top: 25px;
  width: 100%;
  background-color: #f2f2f7;
  border: none;
  &:hover {
    border: none;
    outline: none;
  }
  &:focus {
    border: none;
    outline: none;
    border: 1px solid gray;
  }
`

const SurveyProduct = styled.img`
  position: absolute;
  left: 50%;
  top: 0%;
  width: 50%;
  transform: translate(-50%, -65%);
  @media ${device.laptop} {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
  }
`

const SurveyStepButton = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  background-color: #ff8c00;
  color: white;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    outline: 1px solid gray;
  }
  @media ${device.laptop} {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
    width: 300px;
    padding: 10px;
  }
`

const Stepper = styled.div`
  display: flex;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translate(-40%, -45%);
  & img {
    margin-right: 8px;
  }
  @media ${device.laptop} {
    top: 50%;
    left: 0px;
    transform: rotate(90deg) translate(-40%, -45%);
  }
`

export default CoCreationToolModal
