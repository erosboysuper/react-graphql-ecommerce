import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

import ArrowBackIcon from '~/images/Assets/Arrow-back.svg'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import TutorialLinkIcon from '~/images/Assets/DESKTOP-Arrow-orange.svg'
import LogoIcon from '~/images/Assets/Logo-round.png'
import LockIcon from '~/images/Assets/DESKTOP-Lock.svg'
import CheckIcon from '~/images/Assets/DESKTOP-Process-check.svg'
import BoxerBriefIcon from '~/images/Assets/DESKTOP-Boxer brief icon.svg'
import TrunksIcon from '~/images/Assets/DESKTOP-Trunks icon.svg'
import BriefsIcon from '~/images/Assets/DESKTOP-Briefs icon.svg'
import OtherIcon from '~/images/Assets/DESKTOP-Other.svg'

import BambooElastaneIcon from '~/images/Assets/DESKTOP-Bamboo-Elastane.svg'
import BambooRecycledIcon from '~/images/Assets/DESKTOP-Bamboo-Recycled polyester.svg'
import BambooMerin from '~/images/Assets/DESKTOP-Bamboo-Merin wool.svg'

import ColorGranite from '~/images/Assets/Color-Granite.svg'
import ColorYellow from '~/images/Assets/Color-Yellow.svg'
import ColorVibrantBlue from '~/images/Assets/Color-Vibrant-blue.svg'
import ColorBlack from '~/images/Assets/Color-Black.svg'
import ColorBlueStripe from '~/images/Assets/Color-Blue-stripes.svg'
import ColorYellowRed from '~/images/Assets/Colors-Yellow-Red.svg'
import ColorPicker from '~/images/Assets/DESKTOP-Color picker.png'
import DesktopImage from '~/images/Assets/DESKTOP-Upload-Image.png'

import DesktopBigLogo from '~/images/Assets/DESKTOP-big-logo.svg'
import DesktopSmalllLogo from '~/images/Assets/DESKTOP-small-logo.svg'
import DesktopDefaultModel from '~/images/Assets/DESKTOP-default-model.svg'
import DesktopCustomIcon from '~/images/Assets/DESKTOP-Custom option.svg'

import CommentIcon from '~/images/Assets/Comment.svg'
import VoteUpIcon from '~/images/Assets/Vot-up.svg'
import VoteDownIcon from '~/images/Assets/Vot-down.svg'
import VoteDownActiveIcon from '~/images/Assets/Vot-down active.svg'
import FollowingIcon from '~/images/Assets/Following.svg'
import VoteUpActiveIcon from '~/images/Assets/Vot-up active.svg'
import FollowIcon from '~/images/Assets/Follow.svg'
import UserAvatar from '~/images/Assets/Profile pic.png'
import NoImage from '~/images/Assets/No-Image.svg'
import SendIcon from '~/images/Assets/Send.svg'
import PledgeIcon from '~/images/Assets/Pledge-Icon.png'
import CartIcon from '~/images/Assets/Cart-Icon.svg'
import StarActive from '~/images/Assets/Star-active.svg'
import OpColorIcon from '~/images/Assets/Op-Colors.png'
import BlueMark from '~/images/Assets/Limited-edition.png'

import GrayProductModel from '~/images/Assets/Gray-Pant-Model.png'
import WhiteSelectIcon from '~/images/Assets/White-Selected.svg'

const stepTitle = [
  'Ideation',
  'Design',
  'Prototyping',
  'Funding',
  'Production',
  'Delivery',
]

const mainTitle = [
  'Design Tasks',
  'Prototyping Tasks',
  'Prototyping Task',
  'Design in Production',
]

const initialCompletedStep = [
  [
    {
      title: 'The Cut',
      completedTitle: 'The Cut',
      completedFullTitle: 'The Cut',
      description: '',
      activeIndex: '',
      timeline: '10 days left',
      topic: 'Let’s talk about The Cut',
      subTopic: 'How do you want the cut of your underwear?',
      shadowSize: '45px',
      data: [
        {
          icon: BoxerBriefIcon,
          voteNum: 0,
          subTitle: 'Boxer Briefs',
          description: '',
        },
        { icon: TrunksIcon, voteNum: 0, subTitle: 'Trunks', description: '' },
        { icon: BriefsIcon, voteNum: 0, subTitle: 'Briefs', description: '' },
        { icon: OtherIcon, subTitle: 'Other', description: '' },
      ],
    },
    {
      title: 'The Fabric',
      completedTitle: 'The Fabric',
      completedFullTitle: 'The Fabric',
      description: '',
      activeIndex: '',
      timeline: '5 days left',
      topic: 'Let’s talk about The Fabric',
      subTopic: 'How do you want the fabric of your underwear?',
      shadowSize: '35%',
      data: [
        {
          icon: BambooElastaneIcon,
          voteNum: 4,
          subTitle: 'Bamboo 95% Elastane 5%',
          description: '',
        },
        {
          icon: BambooRecycledIcon,
          voteNum: 2,
          subTitle: 'Bamboo & Recycled polyester',
          description: '',
        },
        {
          icon: BambooMerin,
          voteNum: 0,
          subTitle: 'Bamboo & Merino wool',
          description: '',
        },
        { icon: OtherIcon, subTitle: 'Other', description: '' },
      ],
    },
    {
      title: 'Design/Color',
      completedTitle: 'Design/Color',
      completedFullTitle: 'Design/Color',
      description: '',
      activeIndex: '',
      timeline: '2 days left',
      topic: 'Let’s talk about Color & Print',
      subTopic: 'How do you want the color & print of your underwear?',
      shadowSize: 'calc( 100% - 100px )',
      data: [
        {
          icon: ColorGranite,
          voteNum: 10,
          subTitle: 'Granite',
        },
        {
          icon: ColorYellow,
          voteNum: 3,
          subTitle: 'Vibrant yellow',
        },
        {
          icon: ColorVibrantBlue,
          voteNum: 2,
          subTitle: 'Vibrant blue',
          description: '',
        },
        { icon: ColorBlack, voteNum: 0, subTitle: 'Black', description: '' },
        {
          icon: ColorBlueStripe,
          voteNum: 0,
          subTitle: 'Blue stripes',
          description: '',
        },
        {
          icon: ColorYellowRed,
          voteNum: 0,
          subTitle: 'Yellow + Red',
          description: '',
        },
        { icon: ColorPicker, subTitle: 'SELELCT COLOR', description: '' },
        { icon: DesktopImage, subTitle: 'UPLOAD PRINT', description: '' },
      ],
    },
    {
      title: 'Additional features',
      completedTitle: 'Additional features',
      completedFullTitle: 'Additional features',
      description: '',
      activeIndex: '',
      timeline: '2 days left',
      topic: 'Let’s talk about Additional features',
      subTopic: 'Select all the additional features you would like to have:',
      shadowSize: 'calc( 100% - 160px )',
      data: [
        {
          icon: DesktopDefaultModel,
          voteNum: 10,
          subTitle: 'Elastic band style 1',
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.',
        },
        {
          icon: DesktopDefaultModel,
          voteNum: 2,
          subTitle: 'Elastic band style 2',
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.',
        },
        {
          icon: DesktopDefaultModel,
          voteNum: 3,
          subTitle: 'Pouch with fly',
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.',
        },
        {
          icon: DesktopDefaultModel,
          voteNum: 0,
          subTitle: 'Pouch without fly',
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.',
        },
        {
          icon: DesktopBigLogo,
          voteNum: 1,
          subTitle: 'Big logo on the front',
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.',
        },
        {
          icon: DesktopSmalllLogo,
          voteNum: 0,
          subTitle: 'Small logo on a side',
          description:
            'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.',
        },
      ],
    },
  ],
  [
    {
      title: 'The Cut',
      completedTitle:
        'Manufacturing prototypes <br><span>We are currently manufacturing the prototypes. Secure yours to give your feedback.</span>',
      completedFullTitle: 'Manufacturing prototypes',
      description: '',
      activeIndex: '',
      timeline: '10 days left',
      topic: 'Secure your prototype and receive the following advantages:',
      subTopic:
        '• You’ll receive the <b>first prototype</b> <br> • In case that a second round of feedback is needed, you’ll receive a <b>second prototype</b> <br> • You can <b>give your feedback</b> about the product <br> • You’ll receive <b>2 items of the final product</b>',
      shadowSize: '45px',
      data: [
        {
          icon: BoxerBriefIcon,
          voteNum: 0,
          subTitle: 'Boxer Briefs',
          description: '',
        },
        { icon: TrunksIcon, voteNum: 0, subTitle: 'Trunks', description: '' },
        { icon: BriefsIcon, voteNum: 0, subTitle: 'Briefs', description: '' },
        { icon: OtherIcon, subTitle: 'Other', description: '' },
      ],
    },
    {
      title: 'The Fabric',
      completedTitle: 'Wear test',
      completedFullTitle: 'Wear test',
      description: '',
      activeIndex: '',
      timeline: '5 days left',
      topic: 'Prototype feedback',
      subTopic: 'It’s time to tell your opinion about the product',
      shadowSize: '45px',
      data: [
        {
          icon: BambooElastaneIcon,
          voteNum: 4,
          subTitle: 'Bamboo 95% Elastane 5%',
          description: '',
        },
        {
          icon: BambooRecycledIcon,
          voteNum: 2,
          subTitle: 'Bamboo & Recycled polyester',
          description: '',
        },
        {
          icon: BambooMerin,
          voteNum: 0,
          subTitle: 'Bamboo & Merino wool',
          description: '',
        },
        { icon: OtherIcon, subTitle: 'Other', description: '' },
      ],
    },
    {
      title: 'Design/Color',
      completedTitle:
        'Co-creator approval<br><span>Our team is working on community feedback.</span>',
      completedFullTitle: 'Co-creator approval',
      description: '',
      activeIndex: '',
      timeline: '10 days left',
      topic: 'Prototype feedback',
      subTopic: 'It’s time to tell your opinion about the product',
      shadowSize: '45px',
      data: [
        {
          icon: ColorGranite,
          voteNum: 10,
          subTitle: 'Granite',
        },
        {
          icon: ColorYellow,
          voteNum: 3,
          subTitle: 'Vibrant yellow',
        },
        {
          icon: ColorVibrantBlue,
          voteNum: 2,
          subTitle: 'Vibrant blue',
          description: '',
        },
        { icon: ColorBlack, voteNum: 0, subTitle: 'Black', description: '' },
        {
          icon: ColorBlueStripe,
          voteNum: 0,
          subTitle: 'Blue stripes',
          description: '',
        },
        {
          icon: ColorYellowRed,
          voteNum: 0,
          subTitle: 'Yellow + Red',
          description: '',
        },
        { icon: ColorPicker, subTitle: 'SELELCT COLOR', description: '' },
        { icon: DesktopImage, subTitle: 'UPLOAD PRINT', description: '' },
      ],
    },
  ],
  [
    {
      title: 'The Cut',
      completedTitle:
        'Manufacturing prototypes <br><span>We are currently manufacturing the prototypes. Secure yours to give your feedback.</span>',
      completedFullTitle: 'Manufacturing prototypes',
      description: '',
      activeIndex: '',
      timeline: '10 days left',
      topic: 'New design In Funding',
      subTopic:
        'Hey guys! Here is the design that we created with @JamesA. and all of you.',
      shadowSize: '45px',
      data: [
        {
          icon: BoxerBriefIcon,
          voteNum: 0,
          subTitle: 'Boxer Briefs',
          description: '',
        },
        { icon: TrunksIcon, voteNum: 0, subTitle: 'Trunks', description: '' },
        { icon: BriefsIcon, voteNum: 0, subTitle: 'Briefs', description: '' },
        { icon: OtherIcon, subTitle: 'Other', description: '' },
      ],
    },
  ],
  [
    {
      title: 'The Cut',
      completedTitle:
        'Manufacturing prototypes <br><span>We are currently manufacturing the prototypes. Secure yours to give your feedback.</span>',
      completedFullTitle: 'Manufacturing prototypes',
      description: '',
      activeIndex: '',
      timeline: '10 days left',
      topic: 'New design In Funding',
      subTopic:
        'Hey guys! Here is the design that we created with @JamesA. and all of you.',
      shadowSize: '45px',
      data: [
        {
          icon: BoxerBriefIcon,
          voteNum: 0,
          subTitle: 'Boxer Briefs',
          description: '',
        },
        { icon: TrunksIcon, voteNum: 0, subTitle: 'Trunks', description: '' },
        { icon: BriefsIcon, voteNum: 0, subTitle: 'Briefs', description: '' },
        { icon: OtherIcon, subTitle: 'Other', description: '' },
      ],
    },
  ],
]

const DesignTask = () => {
  const [showModal, setShowModal] = useState(false)
  const [otherOptionValue, setOtherOptionValue] = useState('')
  const [isOtherOption, setOtherOption] = useState(false)
  const [mainStep, setMainStep] = useState(0)
  const [designStep, setDesignStep] = useState(0)
  const [completedStep, setCompletedStep] = useState(initialCompletedStep)
  const [mobileDesignModal, setMobileDesignModal] = useState(false)
  const [voteUpActive, setVoteUpActive] = useState(false)
  const [voteDownActive, setVoteDownActive] = useState(false)
  const [followingActive, setFollowingActive] = useState(true)
  const [feedbackModal, setFeedbackModal] = useState(false)
  const [textNameTip, setTextNameTip] = useState('')
  const [imgPreview, setImgPreview] = useState(null)
  const [picture, setPicture] = useState(null)
  const [funded, setFunded] = useState(true)

  const renderTimeLine = (currentStep, index, timeline) => {
    if (index > currentStep) {
      return <img src={LockIcon} alt />
    } else if (index === currentStep) {
      return timeline
    } else {
      return 'COMPLETED'
    }
  }

  const onHandleDesignStep = (index, title) => {
    let temp = [...completedStep]
    temp[mainStep][designStep].activeIndex = index
    setCompletedStep([...temp])

    if (title === 'Other') {
      setShowModal(true)
      return false
    }
    if (designStep === 3) {
      return false
    }
    setDesignStep(designStep + 1)
    setMobileDesignModal(false)
    document.body.style.overflow = 'auto'
  }

  const onHandleSaveOption = () => {
    let temp = [...completedStep]
    let tempData = [...temp[designStep].data]
    let startData = tempData.slice(0, tempData.length - 1)
    let endData = tempData.slice(-1)
    let resData = [
      ...startData,
      {
        icon: DesktopCustomIcon,
        voteNum: 0,
        subTitle: otherOptionValue,
        description: '',
      },
      ...endData,
    ]
    temp[designStep].data = [...resData]
    setCompletedStep([...temp])
    setCompletedStep([...temp])
    setShowModal(false)
    setOtherOption(false)
  }

  const changeOtherOption = e => {
    if (e.target.value === '') {
      setOtherOption(false)
    } else {
      setOtherOption(true)
    }
    setOtherOptionValue(e.target.value)
  }

  const handleMobileDesignModal = isShow => {
    setMobileDesignModal(isShow)
    document.body.style.overflow = 'hidden'
  }

  const setTextActive = () => {
    const textarea = document.getElementById('textArea')
    textarea.focus()
  }

  const onChangePicture = e => {
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        setPicture(file)
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          setImgPreview(reader.result)
        })
        reader.readAsDataURL(file)
      })
    } else {
      setPicture(null)
      setImgPreview(null)
    }
  }

  const removePic = () => {
    setImgPreview(null)
    setPicture(null)
  }

  const handleCloseFeedbackModal = () => {
    setFeedbackModal(false)
    setDesignStep(2)
  }

  const handleClickPlege = () => {
    setFunded(!funded)
  }

  const handlePreOrder = () => {
    setMainStep(-1)
  }

  const handleNextStep = () => {
    if (mainStep < 3) {
      setMainStep(mainStep + 1)
    }

    setDesignStep(0)
  }

  const handleGetPrototype = () => {
    setMobileDesignModal(false)
    setDesignStep(designStep + 1)
    document.body.style.overflow = 'auto'
  }
  return (
    <Container>
      {mainStep === -1 && (
        <React.Fragment>
          <RoomDesignContainer>
            <RoomDesignHeader>
              <RoomDesignTitle>Room Design</RoomDesignTitle>
              <RoomDesignProductWrapper>
                <img src={GrayProductModel} alt />
              </RoomDesignProductWrapper>
              <RoomDesignCartButton>
                <img src={CartIcon} alt />
              </RoomDesignCartButton>
              <RoomDesignMark>
                <img src={BlueMark} alt />
                <span>LIMITED EDITION</span>
              </RoomDesignMark>
            </RoomDesignHeader>

            <RoomDesignBody>
              <RoomDesignPrice>$14.99</RoomDesignPrice>
              <RoomDesignStar>
                <img src={StarActive} alt />
                <img src={StarActive} alt />
                <img src={StarActive} alt />
                <img src={StarActive} alt />
                <img src={StarActive} alt />
                /120
              </RoomDesignStar>

              <RoomDesignSubTitle>
                The Must-have Briefs
                <img src={OpColorIcon} alt />
              </RoomDesignSubTitle>

              <RoomDesignSize>S - M - XL</RoomDesignSize>
            </RoomDesignBody>
          </RoomDesignContainer>
        </React.Fragment>
      )}
      {funded && (
        <Header>
          <Title
            onClick={() => console.log('design step', mainStep, designStep)}
          >
            {mainTitle[mainStep]} {designStep + 1}/4
          </Title>
          <Tutorial onClick={() => handleNextStep()}>
            How it works
            <img src={TutorialLinkIcon} alt="tutorial-link" />
          </Tutorial>
        </Header>
      )}
      {funded && (
        <StepperContainer>
          {stepTitle.map((title, index) => {
            return (
              <StepperItem
                zIndex={index}
                current={mainStep === index - 1}
                completed={index < mainStep + 1}
                key={'step title' + index}
              >
                <span>{title}</span>
                <HideItem
                  enable={index === 0 || index === stepTitle.length - 1}
                  isLast={index === stepTitle.length - 1}
                />
                <StepperBar completed={index < mainStep + 1} />
                <StepperRound
                  completed={index < mainStep + 1}
                  isLast={index === stepTitle.length - 1}
                  isFirst={index === 0}
                >
                  {index < mainStep + 1 ? (
                    <img src={WhiteSelectIcon} alt />
                  ) : (
                    ''
                  )}
                </StepperRound>
              </StepperItem>
            )
          })}
        </StepperContainer>
      )}

      {mainStep > -1 ? (
        <React.Fragment>
          <DesktopContainer>
            <Description>
              <SurveyLogo src={LogoIcon} alt="survey-logo" />
              <DescriptionBody>
                <DescriptionBodyLeft>
                  <DescriptionTitle>TBô Bodywear</DescriptionTitle>
                  <DescriptionText active={funded}>
                    {completedStep[mainStep][designStep].topic}
                  </DescriptionText>
                </DescriptionBodyLeft>
                <DescriptionBodyRight>10 days left</DescriptionBodyRight>
              </DescriptionBody>
            </Description>

            <Topic
              dangerouslySetInnerHTML={{
                __html: completedStep[mainStep][designStep].subTopic,
              }}
              active={funded}
            ></Topic>

            <ProductContainer>
              {(() => {
                switch (mainStep) {
                  case 0:
                    return (
                      <React.Fragment>
                        {completedStep[mainStep][designStep].data.map(
                          (item, index) => {
                            return (
                              <ProductItem
                                onClick={() =>
                                  onHandleDesignStep(index, item.subTitle)
                                }
                                fixedSize={designStep === 2}
                                fixedMaxSize={designStep === 3}
                              >
                                <ProductImgWrapper>
                                  <ProductImg
                                    src={item.icon}
                                    alt="product-img"
                                  />
                                </ProductImgWrapper>
                                <ProductItemBody>
                                  <VoteNum>
                                    {isNaN(item.voteNum)
                                      ? ``
                                      : `${item.voteNum} votes`}
                                  </VoteNum>
                                  <ProductTitle>{item.subTitle}</ProductTitle>
                                  <ProductDescription>
                                    {item.description}
                                  </ProductDescription>
                                </ProductItemBody>
                              </ProductItem>
                            )
                          }
                        )}
                      </React.Fragment>
                    )

                  case 1:
                    return (
                      <React.Fragment>
                        {(() => {
                          switch (designStep) {
                            case 0:
                              return (
                                <React.Fragment>
                                  <PrototypingProductWrapper>
                                    <PrototypingProductImg
                                      src={GrayProductModel}
                                      alt
                                    />
                                    <PrototypingProductWrapperRight>
                                      <PrototypingProductWrapperRightText>
                                        <div>
                                          <p>Boxer Brief</p>
                                          <p>95% Bamboo 5% Elastane</p>
                                          <p>Granite</p>
                                        </div>
                                        <div>
                                          <p>Covered elastic band </p>
                                          <p>Pouch without fly</p>
                                          <p>Small logo on a side</p>
                                        </div>
                                      </PrototypingProductWrapperRightText>
                                      <PrototypingSecureButton
                                        onClick={() =>
                                          onHandleDesignStep(-1, '')
                                        }
                                      >
                                        SECURE YOUR PROTOTYPE
                                      </PrototypingSecureButton>
                                    </PrototypingProductWrapperRight>
                                  </PrototypingProductWrapper>
                                </React.Fragment>
                              )
                            case 1:
                              return (
                                <React.Fragment>
                                  <PrototypingProductWrapper>
                                    <PrototypingProductImg
                                      src={GrayProductModel}
                                      alt
                                    />
                                    <PrototypingProductWrapperRight>
                                      <PrototypingProductWrapperRightText>
                                        <div>
                                          <p>Boxer Brief</p>
                                          <p>95% Bamboo 5% Elastane</p>
                                          <p>Granite</p>
                                        </div>
                                        <div>
                                          <p>Covered elastic band </p>
                                          <p>Pouch without fly</p>
                                          <p>Small logo on a side</p>
                                        </div>
                                      </PrototypingProductWrapperRightText>
                                      <PrototypingSecureButton
                                        onClick={() => setFeedbackModal(true)}
                                      >
                                        GIVE YOUR FEEDBACK
                                      </PrototypingSecureButton>
                                    </PrototypingProductWrapperRight>
                                  </PrototypingProductWrapper>
                                </React.Fragment>
                              )
                            case 2:
                              return (
                                <React.Fragment>
                                  <PrototypingProductWrapper>
                                    <PrototypingProductImg
                                      src={GrayProductModel}
                                      alt
                                    />
                                    <PrototypingProductWrapperRight>
                                      <PrototypingProductWrapperRightText>
                                        <div>
                                          <p>Boxer Brief</p>
                                          <p>95% Bamboo 5% Elastane</p>
                                          <p>Granite</p>
                                        </div>
                                        <div>
                                          <p>Covered elastic band </p>
                                          <p>Pouch without fly</p>
                                          <p>Small logo on a side</p>
                                        </div>
                                      </PrototypingProductWrapperRightText>
                                    </PrototypingProductWrapperRight>
                                  </PrototypingProductWrapper>
                                </React.Fragment>
                              )
                          }
                        })()}
                      </React.Fragment>
                    )
                  case 2:
                    return (
                      <React.Fragment>
                        <PrototypingProductWrapper>
                          <PrototypingProductImg src={GrayProductModel} alt />
                          <PrototypingProductWrapperRight active={funded}>
                            <h3>$22.99</h3>
                            <PrototypingProgressContainer>
                              <PrototypingProgressLeftWrapper active={funded}>
                                30/40 Pre-orders
                              </PrototypingProgressLeftWrapper>
                              <PrototypingProgressRightWrapper active={funded}>
                                75% founded · <span>24 days left</span>
                              </PrototypingProgressRightWrapper>
                            </PrototypingProgressContainer>

                            <PrototypingProgressBar>
                              <FullBar />
                              <ProgressBar />
                            </PrototypingProgressBar>

                            <PledgeButton
                              onClick={() => handleClickPlege()}
                              active={funded}
                            >
                              PLEDGE
                              <img src={PledgeIcon} alt />
                            </PledgeButton>
                          </PrototypingProductWrapperRight>
                        </PrototypingProductWrapper>
                      </React.Fragment>
                    )
                  case 3:
                    return (
                      <React.Fragment>
                        <PrototypingProductWrapper>
                          <ProductionImgWrapper>
                            <img src={GrayProductModel} alt />
                            <MarkButtonWrapper>
                              FUNDED
                              <img src={PledgeIcon} alt />
                            </MarkButtonWrapper>
                          </ProductionImgWrapper>
                          <PrototypingProductWrapperRight active={funded}>
                            <ProductionHeader>
                              <ProductionTitle>$22.99</ProductionTitle>
                              <ProductionHeaderRight>
                                Available in 40 days
                              </ProductionHeaderRight>
                            </ProductionHeader>

                            <ProductionBody>
                              <ProductionBodyTitle>
                                Boxer Ultra Sport
                              </ProductionBodyTitle>
                              Extremely comfortable and functional for sports.
                              Co-created for a group of hikers, specially
                              designed for cold days in the mountains.
                            </ProductionBody>

                            <PreOrderButton onClick={() => handlePreOrder()}>
                              PRE-ORDER
                              <img src={CartIcon} alt />
                            </PreOrderButton>
                          </PrototypingProductWrapperRight>
                        </PrototypingProductWrapper>
                      </React.Fragment>
                    )
                }
              })()}
            </ProductContainer>
          </DesktopContainer>
          <MobileContainer>
            {(() => {
              switch (mainStep) {
                case 1:
                  return (
                    <React.Fragment>
                      {(() => {
                        switch (designStep) {
                          case 0:
                            return (
                              <React.Fragment>
                                <PrototypingProductWrapper>
                                  <PrototypingProductImg
                                    src={GrayProductModel}
                                    alt
                                  />
                                </PrototypingProductWrapper>
                              </React.Fragment>
                            )
                          case 1:
                            return (
                              <React.Fragment>
                                <PrototypingProductWrapper>
                                  <PrototypingProductImg
                                    src={GrayProductModel}
                                    alt
                                  />
                                </PrototypingProductWrapper>
                              </React.Fragment>
                            )
                          case 2:
                            return (
                              <React.Fragment>
                                <PrototypingProductWrapper>
                                  <PrototypingProductImg
                                    src={GrayProductModel}
                                    alt
                                  />
                                </PrototypingProductWrapper>
                              </React.Fragment>
                            )
                        }
                      })()}
                    </React.Fragment>
                  )
                case 2:
                  return (
                    <React.Fragment>
                      <Description>
                        <SurveyLogo src={LogoIcon} alt="survey-logo" />
                        <DescriptionBody>
                          <DescriptionBodyLeft>
                            <DescriptionTitle>TBô Bodywear</DescriptionTitle>
                            <DescriptionText active={funded}>
                              {completedStep[mainStep][designStep].topic}
                            </DescriptionText>
                          </DescriptionBodyLeft>
                          <DescriptionBodyRight>
                            10 days left
                          </DescriptionBodyRight>
                        </DescriptionBody>
                      </Description>

                      <Topic active={funded}>
                        Hey guys! Here is the design that we created with
                        @JamesA. and all of you.
                      </Topic>

                      <PrototypingProductWrapper>
                        <MobilePrototypingProductImg>
                          <img src={GrayProductModel} alt />
                          <MobilePledgeButton
                            onClick={() => handleClickPlege()}
                            active={funded}
                          >
                            PLEDGE
                            <img src={PledgeIcon} alt />
                          </MobilePledgeButton>
                        </MobilePrototypingProductImg>
                        <PrototypingProductWrapperRight1 active={funded}>
                          <h3>$22.99</h3>
                          <PrototypingProgressContainer>
                            <PrototypingProgressLeftWrapper active={funded}>
                              30/40 Pre-orders
                            </PrototypingProgressLeftWrapper>
                            <PrototypingProgressRightWrapper active={funded}>
                              75% founded · <span>24 days left</span>
                            </PrototypingProgressRightWrapper>
                          </PrototypingProgressContainer>

                          <PrototypingProgressBar>
                            <FullBar />
                            <ProgressBar />
                          </PrototypingProgressBar>

                          <PledgeButton
                            onClick={() => handleClickPlege()}
                            active={funded}
                          >
                            PLEDGE
                            <img src={PledgeIcon} alt />
                          </PledgeButton>
                        </PrototypingProductWrapperRight1>
                      </PrototypingProductWrapper>
                    </React.Fragment>
                  )
                case 3:
                  return (
                    <React.Fragment>
                      <MobileProductionBar>
                        <MobileProductionBarLeft>
                          Production
                        </MobileProductionBarLeft>
                        <MobileProductionBarRight>
                          40 days left
                        </MobileProductionBarRight>
                        <MobileProductionBarHidden></MobileProductionBarHidden>
                      </MobileProductionBar>

                      <PrototypingProductWrapper>
                        <ProductionImgWrapper>
                          <img src={GrayProductModel} alt />
                          <MarkButtonWrapper>
                            FUNDED
                            <img src={PledgeIcon} alt />
                          </MarkButtonWrapper>
                          <MobilePreOrderButton
                            onClick={() => handlePreOrder()}
                          >
                            PRE-ORDER
                            <img src={CartIcon} alt />
                          </MobilePreOrderButton>
                        </ProductionImgWrapper>
                        <PrototypingProductWrapperRight active={funded}>
                          <ProductionHeader>
                            <ProductionTitle>$22.99</ProductionTitle>
                            <ProductionHeaderRight>
                              Available in 40 days
                            </ProductionHeaderRight>
                          </ProductionHeader>

                          <ProductionBody>
                            <ProductionBodyTitle>
                              Boxer Ultra Sport
                            </ProductionBodyTitle>
                            Extremely comfortable and functional for sports.
                            Co-created for a group of hikers, specially designed
                            for cold days in the mountains.
                          </ProductionBody>
                        </PrototypingProductWrapperRight>
                      </PrototypingProductWrapper>
                    </React.Fragment>
                  )
              }
            })()}
          </MobileContainer>
        </React.Fragment>
      ) : (
        <StartDesignWrapper>
          <StartDesignButton onClick={() => setMainStep(0)}>
            START A NEW DESIGN
          </StartDesignButton>
        </StartDesignWrapper>
      )}

      {mainStep > -1 && (
        <Body>
          {mainStep === 0 || mainStep === 1 ? (
            <React.Fragment>
              {completedStep[mainStep].map((item, index) => {
                return (
                  <CompletedStepItem completed={index < designStep}>
                    <MarkItem
                      visible={index === designStep}
                      shadowSize={item.shadowSize}
                    />
                    <CompletedTextWrapper>
                      <CompletedTitle
                        active={index === designStep}
                        completed={index < designStep}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              index < designStep
                                ? `${item.completedFullTitle}:`
                                : item.completedTitle,
                          }}
                        />
                      </CompletedTitle>
                      &nbsp; &nbsp;
                      <CompletedDescription>
                        {index < designStep && item.activeIndex > 0
                          ? item.data[item.activeIndex].subTitle
                          : ''}
                      </CompletedDescription>
                      {index < designStep && <img src={CheckIcon} alt />}
                    </CompletedTextWrapper>
                    <MobileCompletedTextWrapper>
                      <div>
                        <CompletedTitle
                          active={index === designStep}
                          completed={index < designStep}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                index < designStep
                                  ? `${item.completedTitle}:`
                                  : item.completedTitle,
                            }}
                          />
                        </CompletedTitle>
                        &nbsp; &nbsp;
                        {index < designStep && <img src={CheckIcon} alt />}
                      </div>
                      <CompletedDescription>
                        {index < designStep && item.activeIndex > 0
                          ? item.data[item.activeIndex].subTitle
                          : ''}
                      </CompletedDescription>
                    </MobileCompletedTextWrapper>
                    <CompletedRightWrapper completed={index < designStep}>
                      {renderTimeLine(designStep, index, item.timeline)}
                    </CompletedRightWrapper>
                  </CompletedStepItem>
                )
              })}
            </React.Fragment>
          ) : (
            ''
          )}

          {(() => {
            switch (mainStep) {
              case 0:
                return (
                  <CollaborateButton
                    onClick={() => handleMobileDesignModal(true)}
                  >
                    COLLABORATE ON THE DESIGN
                  </CollaborateButton>
                )
              case 1:
                return (
                  <React.Fragment>
                    {(() => {
                      switch (designStep) {
                        case 0:
                          return (
                            <CollaborateButton
                              onClick={() => handleMobileDesignModal(true)}
                            >
                              SECURE YOUR PROTOTYPE
                            </CollaborateButton>
                          )
                        case 1:
                          return (
                            <CollaborateButton
                              onClick={() => setFeedbackModal(true)}
                            >
                              PROTOTYPE FEEDBACK
                            </CollaborateButton>
                          )
                        case 2:
                          return ''
                      }
                    })()}
                  </React.Fragment>
                )
            }
          })()}
        </Body>
      )}
      {mobileDesignModal && (
        <MobileCollaborateContainer>
          {showModal ? (
            <React.Fragment>
              <MobileCloseIcon
                src={CloseIcon}
                onClick={() => setShowModal(false)}
              />
              <span>OTHER OPTION</span>
            </React.Fragment>
          ) : (
            <BackIcon
              src={ArrowBackIcon}
              alt="arrow"
              onClick={() => {
                window.history.back()
              }}
            />
          )}
          {(() => {
            switch (mainStep) {
              case 1:
                return (
                  <React.Fragment>
                    <SecureProductBody>
                      <SecureProductWrapper>
                        <img src={GrayProductModel} alt />
                        <SecureProductText>
                          <p>Boxer Brief / 95% Bamboo 5% Elastane /</p>
                          <p> Granite / Covered elastic band / Pouch </p>
                          <p>without fly / Small logo on a side</p>
                        </SecureProductText>
                      </SecureProductWrapper>

                      <SecureMobileDescription>
                        <SecureMobileDescriptionHeader>
                          <img src={LogoIcon} alt />
                          <SecureMobileDescriptionTitle>
                            Secure your prototype and receive the following
                            advantages:
                          </SecureMobileDescriptionTitle>
                        </SecureMobileDescriptionHeader>
                        <SecureMobileDescriptionText>
                          <p>• You’ll receive the first prototype</p>
                          <p>
                            • In case that a second round of feedback is needed,
                            you’ll receive a second prototype{' '}
                          </p>
                          <p>• You can give your feedback about the product </p>
                          <p>• You’ll receive 2 items of the final product</p>
                        </SecureMobileDescriptionText>
                      </SecureMobileDescription>
                    </SecureProductBody>

                    <SecureProductFooter>
                      <GetPrototypeButton onClick={() => handleGetPrototype()}>
                        <span>GET YOUR PROTOTYPE </span>/$14.99
                        <img src={CartIcon} alt />
                      </GetPrototypeButton>
                    </SecureProductFooter>
                  </React.Fragment>
                )

              default:
                return (
                  <React.Fragment>
                    <MobileCollaborateWrapper>
                      {!showModal && (
                        <MobileCollaborateHeader>
                          <Title>Design Tasks {designStep + 1}/4</Title>
                          <SportButton>SPORTS</SportButton>
                        </MobileCollaborateHeader>
                      )}

                      {!showModal && (
                        <Description>
                          <SurveyLogo src={LogoIcon} alt="survey-logo" />
                          <DescriptionBody>
                            <DescriptionBodyLeft>
                              <DescriptionTitle>TBô Bodywear</DescriptionTitle>
                              <DescriptionText>
                                {completedStep[mainStep][designStep].topic}
                              </DescriptionText>
                            </DescriptionBodyLeft>
                            <DescriptionBodyRight>
                              10 days left
                            </DescriptionBodyRight>
                          </DescriptionBody>
                        </Description>
                      )}

                      <Topic>{completedStep[designStep].subTopic}</Topic>

                      <ProductContainer>
                        {completedStep[mainStep][designStep].data.map(
                          (item, index) => {
                            return (
                              <ProductItem
                                onClick={() =>
                                  onHandleDesignStep(index, item.subTitle)
                                }
                                fixedSize={designStep === 2}
                                fixedMaxSize={designStep === 3}
                              >
                                <ProductImgWrapper>
                                  <ProductImg
                                    isColor={designStep === 2}
                                    src={item.icon}
                                    alt="product-img"
                                  />
                                </ProductImgWrapper>
                                <ProductItemBody>
                                  <VoteNum isFinal={designStep === 3}>
                                    {isNaN(item.voteNum)
                                      ? ``
                                      : `${item.voteNum} votes`}
                                  </VoteNum>
                                  <ProductTitle isFinal={designStep === 3}>
                                    {item.subTitle}
                                  </ProductTitle>
                                  <ProductDescription>
                                    {item.description}
                                  </ProductDescription>
                                </ProductItemBody>
                              </ProductItem>
                            )
                          }
                        )}
                      </ProductContainer>

                      {!showModal && (
                        <MobileReactionContainer>
                          <MobileReactionItem>
                            <img src={CommentIcon} alt="Comment Active" />
                          </MobileReactionItem>

                          <MobileReactionItem>
                            <img
                              src={voteUpActive ? VoteUpActiveIcon : VoteUpIcon}
                              alt="Vote Up"
                            />
                          </MobileReactionItem>

                          <MobileReactionItem>
                            <img
                              src={
                                voteDownActive
                                  ? VoteDownActiveIcon
                                  : VoteDownIcon
                              }
                              alt="Comment inactive"
                            />
                          </MobileReactionItem>

                          <MobileReactionItem active={followingActive}>
                            <span>
                              {followingActive ? `Following` : `Follow`}
                            </span>
                            <img
                              src={followingActive ? FollowingIcon : FollowIcon}
                              alt="Follow Topic"
                            />
                          </MobileReactionItem>
                        </MobileReactionContainer>
                      )}
                    </MobileCollaborateWrapper>

                    {showModal ? (
                      <MobileOtherOptionWrapper>
                        <FormUserAvatar src={UserAvatar} alt="user-avatar" />
                        <input
                          type="text"
                          placeholder="Suggest other..."
                          onChange={e => changeOtherOption(e)}
                        />
                        {isOtherOption && (
                          <SendButton
                            src={SendIcon}
                            alt="send-btn"
                            onClick={() => onHandleSaveOption()}
                          />
                        )}
                      </MobileOtherOptionWrapper>
                    ) : (
                      <MobileCommentFormWrapper>
                        <FormUserAvatar src={UserAvatar} alt="user-avatar" />
                        <input type="text" placeholder="Write a comment..." />
                        <UploadImageIcon src={NoImage} alt="upload-btn" />
                      </MobileCommentFormWrapper>
                    )}
                  </React.Fragment>
                )
            }
          })()}
        </MobileCollaborateContainer>
      )}
      {showModal && (
        <HiddenWrapperForModal onClick={() => setShowModal(false)} />
      )}
      {showModal && (
        <ModalContainer>
          <img src={CloseIcon} onClick={() => setShowModal(false)} />
          <ModalHeader>OTHER OPTION</ModalHeader>
          <ModalTopic>
            Do you want to suggest another option for The Cut?
          </ModalTopic>
          <ModalBody>
            <ModalFormWrapper>
              <FormLabel>Other option</FormLabel>
              <InputText
                type="text"
                placeholder="Type your suggestion"
                onChange={e => changeOtherOption(e)}
              />
            </ModalFormWrapper>

            {isOtherOption && (
              <SaveButton onClick={() => onHandleSaveOption()}>
                SHARE OPTION
              </SaveButton>
            )}
          </ModalBody>
        </ModalContainer>
      )}
      {feedbackModal && (
        <FeedbackModalContainer>
          <FeedbackModalWrapper>
            <ModalCloseIcon
              onClick={() => handleCloseFeedbackModal()}
              src={CloseIcon}
              alt
            />
            <ModalHeader>SHARE YOUR FEEDBACK</ModalHeader>
            <FeedbackModalBody>
              <span>Feedback</span>
              <TextArea>
                <OuterDiv>
                  <TextareaAutosize
                    minRows={4}
                    maxRows={10}
                    id="textArea"
                    onChange={e => setTextNameTip(e.target.value)}
                    value={textNameTip}
                  />
                </OuterDiv>
                <TipLetter
                  top={textNameTip !== '' ? 4 : 15}
                  size={textNameTip !== '' ? 11 : 16}
                  color={textNameTip !== '' ? '#A9ACAF' : 'black'}
                  font={
                    textNameTip !== '' ? 'Titillium Web' : 'Titillium Light'
                  }
                  onClick={() => setTextActive()}
                  display={textNameTip !== '' ? 'none' : 'block'}
                >
                  <Letter>
                    {textNameTip !== ''
                      ? 'Description'
                      : 'What’s the question or problem that you would like to share with the community?'}
                  </Letter>
                </TipLetter>
                {!imgPreview && (
                  <Buttons>
                    <UploadButton>
                      <input
                        type="file"
                        id="file"
                        onChange={onChangePicture}
                        accept="image/*"
                      />
                      <label htmlFor="file">
                        <img src={NoImage} alt="NoImage" />
                      </label>
                    </UploadButton>
                    <div>
                      <Letter font="Titillium Web" size={18} color="#7D7F81">
                        IMAGE
                      </Letter>
                    </div>
                  </Buttons>
                )}
                {imgPreview && (
                  <ImagePreview>
                    <img src={imgPreview} alt="imgPreview" />
                    <DeleteButton>
                      <RemoveImg
                        src={CloseIcon}
                        alt="CloseIcon"
                        onClick={() => removePic()}
                      />
                      <div>
                        <Letter font="Titillium Web" size={18}>
                          DELETE IMAGE
                        </Letter>
                      </div>
                    </DeleteButton>
                  </ImagePreview>
                )}
              </TextArea>
            </FeedbackModalBody>
          </FeedbackModalWrapper>
        </FeedbackModalContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  background-color: #f2f2f7;
  font-family: Titillium Web;
  width: 100%;
  padding: 20px;

  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`

const RoomDesignContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f2f7;
  @media ${device.tablet} {
    display: none;
  }
`

const RoomDesignMark = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
  & span {
    position: absolute;
    left: -40px;
    top: 58px;
    white-space: nowrap;
    color: white;
    font-family: Titillium Bold;
    transform: rotate(90deg);
  }
`

const RoomDesignHeader = styled.div`
  position: relative;
`

const RoomDesignTitle = styled.div`
  margin: 15px 0px;
`

const RoomDesignProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
  & img {
    width: 80%;
  }
`

const RoomDesignCartButton = styled.div`
  position: absolute;
  bottom: -10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff8c00;
  cursor: pointer;
  & img {
    width: 70%;
    height: auto;
  }
`

const RoomDesignBody = styled.div`
  background-color: white;
  padding: 30px 20px;
  margin: 0 -20px;
`

const RoomDesignPrice = styled.div`
  font-size: 18px;
  font-family: Titillium Bold;
`

const RoomDesignStar = styled.div`
  font-size: 14px;
  color: gray;
  margin-top: 20px;
  & img {
    width: 15px;
  }
`

const RoomDesignSubTitle = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  font-size: 20px;
  font-family: Titillium Bold;
  & img {
    position: absolute;
    right: 0;
    top: -10px;
    width: 20px;
  }
`

const RoomDesignSize = styled.div`
  font-size: 14px;
  color: gray;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0px;
`

const Title = styled.div`
  font-family: Titillium Black;
  font-size: 20px;
`

const Tutorial = styled.div`
  color: #ff8c00;
  cursor: pointer;
  & img {
    margin-left: 15px;
  }
`

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  overflow: hidden;
  margin-bottom: 20px;
  @media ${device.tablet} {
    margin-bottom: 0px;
  }
`

const StepperItem = styled.div`
  position: relative;
  z-index: ${props => (props.zIndex ? props.zIndex : 1)};
  & span {
    color: ${props =>
      props.current ? '#161617' : props.completed ? '#f57b00' : '#161617'};
    font-family: ${props =>
      props.current || props.completed
        ? 'Titillium Bold'
        : 'font-family: Titillium Web'};
  }
  padding: 0 20px;
  &:first-child {
    padding: 0 20px 0px 0px;
    & > div:nth-child(3) {
      left: 0px;
    }
  }

  @media ${device.tablet} {
    padding: 0px;
    &:first-child {
      padding: 0px;
    }
  }
`

const StepperRound = styled.div`
  position: absolute;
  top: -25px;
  width: 24px;
  background-color: white;
  height: 24px;
  border-radius: 50%;
  border: ${props => (props.completed ? 'none' : '1px solid gray')};
  z-index: 10;
  left: ${props => (props.isLast || props.isFirst ? 'unset' : '50%')};
  transform: ${props =>
    props.isLast || props.isFirst ? 'unset' : 'translate(-50%, 0)'};
  right: ${props => (props.isLast ? 0 : '')};
  & img {
    position: absolute;
    left: 1px;
    top: 0;
    width: 100%;
  }
`

const HideItem = styled.div`
  position: absolute;
  width: 15px;
  height: 100%;
  top: -26px;
  background-color: #f2f2f7;
  z-index: 8;
  display: ${props => (props.enable ? 'block' : 'none')};
  right: ${props => (props.isLast ? 0 : '')};
`

const StepperBar = styled.div`
  position: absolute;
  top: -19px;
  left: 50%;
  min-width: 500px;
  height: 10px;
  border-top: ${props => (props.completed ? '' : '1px solid gray')};
  border-bottom: ${props => (props.completed ? '' : '1px solid gray')};
  background-color: ${props => (props.completed ? '#f57b00' : '#f2f2f7')};
  @media ${device.tablet} {
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`

const MobileContainer = styled.div`
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`

const Description = styled.div`
  display: flex;
  margin-top: 20px;
  @media ${device.tablet} {
    margin-top: 35px;
  }
`

const SurveyLogo = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 15px;
`

const DescriptionBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const DescriptionBodyLeft = styled.div``

const DescriptionBodyRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #a9acaf;
  font-size: 14px;
  min-width: 70px;
`

const DescriptionTitle = styled.div`
  font-size: 20px;
  font-family: Titillium Bold;
  color: #f57b00;
  line-height: 23px;
`

const DescriptionText = styled.div`
  font-size: 20px;
  color: ${props => (props.active ? '#202122' : '#A9ACAF')};
  font-family: Titillium Bold;
  line-height: 23px;
`

const Topic = styled.div`
  margin: 20px 0px;
  padding-left: 0px;
  font-size: 16px;
  color: ${props => (props.active ? '#202122' : '#A9ACAF')};

  @media ${device.tablet} {
    padding-left: 20px;
    font-size: 18px;
  }
`

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  @media ${device.tablet} {
    margin-top: 0px;
  }
`

const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.fixedMaxSize ? 'flex-start' : 'center')};
  cursor: pointer;
  flex-wrap: wrap;
  width: ${props => (props.fixedSize ? '25%' : '')};
  max-width: ${props => (props.fixedMaxSize ? '50%' : '25%')};
  margin-bottom: 20px;
  &:hover {
    & > div:first-child {
      background-color: #ff8c00;
    }
    & > div:last-child {
      & > div:nth-child(2) {
        color: #ff8c00;
      }
    }
  }

  @media ${device.tablet} {
    flex-direction: row;
    align-items: center;
  }
`

const ProductImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
  margin-right: 5px;
  margin-bottom: 5px;
  @media ${device.tablet} {
  }
`

const ProductImg = styled.img`
  width: ${props => (props.isColor ? '58px' : '52px')};
  height: ${props => (props.isColor ? '58px' : '52px')};
  @media ${device.tablet} {
    width: 50px;
    height: 50px;
  }
`

const ProductItemBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 40px;

  @media ${device.tablet} {
    justify-content: flex-start;
    width: calc(100% - 75px);
    min-height: unset;
  }
`

const PrototypingProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  width: 100%;
  @media ${device.tablet} {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    margin-bottom: 20px;
  }
`

const MobileProductionBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid gray;
  padding: 0px 15px;
  margin-top: 30px;
`

const MobileProductionBarLeft = styled.div`
  z-index: 2;
  font-family: Titillium Bold;
`

const MobileProductionBarRight = styled.div`
  z-index: 2;
  font-family: Titillium Web;
  color: gray;
`

const MobileProductionBarHidden = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 100%;
  background-color: #cecece;
`

const MobilePrototypingProductImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 60px 0px;
  width: 100%;
`

const PrototypingProductImg = styled.img`
  position: relative;
  width: 60%;
  @media ${device.tablet} {
    width: 30%;
  }
`

const ProductionImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 40px 0px;
  text-align: center;
  & > img {
    width: 80%;
    height: auto;
  }
  @media ${device.tablet} {
    width: 50%;
    padding: 0px;
    text-align: unset;
    & > img {
      width: 100%;
      height: auto;
    }
  }
`

const MarkButtonWrapper = styled.div`
  position: absolute;
  left: -10px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  background-color: black;
  color: white;
  font-family: Titillium Bold;
  & img {
    margin-left: 20px;
    width: 25px;
  }

  @media ${device.tablet} {
    left: 0;
  }
`

const PrototypingProductWrapperRight1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  margin: -30px;
  padding: 20px;
  background-color: white;
  & h3 {
    font-family: Titillium Bold;
    font-size: 28px;
    color: ${props => (props.active ? '#202122' : '#A9ACAF')};
  }
`

const PrototypingProductWrapperRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0;
  & p {
    margin-bottom: 0px;
  }
  & h3 {
    font-family: Titillium Bold;
    font-size: 28px;
    color: ${props => (props.active ? '#202122' : '#A9ACAF')};
  }
  @media ${device.tablet} {
    display: flex;
    width: 70%;
    padding: 0 80px;
  }
`

const PrototypingProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const PrototypingProgressLeftWrapper = styled.div`
  color: ${props => (props.active ? '#7d7f81' : '#A9ACAF')};
`

const PrototypingProgressRightWrapper = styled.div`
  color: ${props => (props.active ? '#202122' : '#A9ACAF')};
  & span {
    font-family: Titillium Bold;
    color: ${props => (props.active ? '#ff8c00' : '#A9ACAF')};
  }
`

const PrototypingProgressBar = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 10px;

  @media ${device.tablet} {
    margin-bottom: 60px;
  }
`

const FullBar = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid gray;
`

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ff8c00;
  width: 75%;
  height: 100%;
`

const MobilePledgeButton = styled.div`
  position: absolute;
  right: -10px;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  font-size: 16px;
  font-family: Titillium Web;
  color: ${props => (props.active ? 'white' : '#CECECE')};
  background-color: ${props => (props.active ? '#ff8c00' : '#7D7F81')};
  cursor: pointer;
  & img {
    width: 20px;
    height: auto;
    margin-left: 30px;
  }
`

const PledgeButton = styled.div`
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 16px;
  font-family: Titillium Bold;
  color: ${props => (props.active ? 'white' : '#CECECE')};
  background-color: ${props => (props.active ? '#ff8c00' : '#7D7F81')};
  cursor: pointer;
  & img {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    width: 23px;
    height: auto;
  }

  @media ${device.tablet} {
    display: flex;
  }
`

const StartDesignWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0px;
`

const StartDesignButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50px;
  font-size: 16px;
  font-family: Titillium Bold;
  color: white;
  background-color: #ff8c00;
  cursor: pointer;

  @media ${device.tablet} {
    width: 50%;
    height: 60px;
  }
`

const PreOrderButton = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 16px;
  font-family: Titillium Bold;
  color: white;
  background-color: #ff8c00;
  cursor: pointer;
  & img {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    width: 23px;
    height: auto;
  }
`

const MobilePreOrderButton = styled.div`
  position: absolute;
  right: -10px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 50px;
  font-size: 16px;
  font-family: Titillium Bold;
  color: white;
  background-color: #ff8c00;
  cursor: pointer;
  & img {
    margin-left: 15px;
    width: 23px;
    height: auto;
  }
`

const PrototypingProductWrapperRightText = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
  & div {
    width: 50%;
    padding: 10px;
  }
`

const PrototypingSecureButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 100%;
  background-color: #ff8c00;
  color: white;
  font-family: Titillium Bold;
  font-size: 16px;
  cursor: pointer;
`

const VoteNum = styled.div`
  color: #a9acaf;
  font-size: 15px;
  text-align: ${props => (props.isFinal ? 'unset' : 'center')};
  @media ${device.tablet} {
    text-align: unset;
  }
`

const ProductionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -30px;
  padding: 70px 30px 30px 30px;
  background-color: white;
  @media ${device.tablet} {
    margin: 0 0 20px 0;
    padding: 0px;
    background-color: transparent;
  }
`

const ProductionTitle = styled.h3``

const ProductionHeaderRight = styled.div`
  font-family: Titillium Bold;
  color: #ff8c00;
`

const ProductionBody = styled.div`
  display: none;
  margin-bottom: 20px;

  @media ${device.tablet} {
    display: block;
  }
`

const ProductionBodyTitle = styled.div`
  font-size: 24px;
  font-family: Titillium Bold;
`

const ProductTitle = styled.div`
  color: #161617;
  font-size: 15px;
  line-height: 19px;
  font-family: Titillium Bold;
  text-align: ${props => (props.isFinal ? 'unset' : 'center')};
  @media ${device.tablet} {
    font-size: 18px;
    text-align: unset;
  }
`

const ProductDescription = styled.div`
  line-height: 20px;
`

const Body = styled.div`
  margin-top: 0px;
  @media ${device.tablet} {
    margin-top: 0px;
  }
`

const CompletedStepItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 15px;
  min-height: 45px;
  margin-bottom: 8px;
  border: 1px solid #a9acaf;
  width: 100%;
  cursor: pointer;
  background-color: ${props => (props.completed ? '#202122' : '')};
  @media ${device.tablet} {
    height: unset;
    padding: 6px 15px;
    align-items: flex-start;
  }
`

const MarkItem = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${props => (props.shadowSize ? props.shadowSize : 0)};
  height: 100%;
  background-color: #cecece;
  display: ${props => (props.visible ? 'block' : 'none')};
`

const CompletedTextWrapper = styled.div`
  display: none;
  color: #a9acaf;
  font-size: 17px;
  z-index: 3;
  & img {
    width: 25px;
    height: 25px;
    margin-left: 15px;
  }
  @media ${device.tablet} {
    display: flex;
  }
`

const MobileCompletedTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #a9acaf;
  font-size: 17px;
  z-index: 3;
  & > div {
    line-height: 18px;
    &:first-child {
      display: flex;
      align-items: center;
      & img {
        width: 15px;
        height: 15px;
        margin-left: 5px;
      }
    }
  }

  @media ${device.tablet} {
    display: none;
  }
`

const CompletedTitle = styled.div`
  color: ${props =>
    props.active ? '#161617' : props.completed ? 'white' : '#A9ACAF'};
  font-family: ${props =>
    props.active
      ? 'Titillium Bold'
      : props.completed
      ? 'Titillium Bold'
      : 'Titillium Web'};
  & span {
    color: #161617;
    font-size: 14px;
    font-family: Titillium Web;
  }
`

const CompletedDescription = styled.div`
  color: white;
`

const CompletedRightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 65px;
  color: ${props => (props.completed ? 'white' : '#a9acaf')};
  padding-bottom: ${props => (props.completed ? '20px' : '0px')};
  font-family: ${props =>
    props.completed ? 'Titillium Bold' : 'Titillium Web'};
  letter-spacing: ${props => (props.completed ? '2px' : '0px')};
  font-size: 13px;
  & img {
    width: 30px;
    height: 30px;
  }

  @media ${device.tablet} {
    font-size: 15px;
    padding-bottom: 0px;
    font-family: Titillium Web;
    letter-spacing: 0px;
  }
`

const CollaborateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #ff8c00;
  color: white;
  margin-top: 40px;
  font-size: 17px;
  font-family: Titillium Bold;

  @media ${device.tablet} {
    display: none;
  }
`

const HiddenWrapperForModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`

const ModalContainer = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: none;
  width: 100%;
  height: 100vh;
  background: white;
  overflow: scroll;
  z-index: 101;
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

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
  font-family: Titillium Bold;
  font-size: 19px;
`

const ModalTopic = styled.div`
  margin-top: 40px;
  font-size: 18px;
  font-family: Titillium Bold;
`

const ModalBody = styled.div`
  margin-top: 60px;
`

const ModalFormWrapper = styled.div`
  padding: 10px 0px;
`

const FormLabel = styled.div`
  font-family: Titillium Bold;
  font-size: 18px;
  margin-bottom: 10px;
`

const InputText = styled.input`
  width: 100%;
  height: 45px;
  border: none;
  outline: none;
  background-color: #f2f2f7;
  padding: 0px 20px;
`

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #ff8c00;
  color: white;
  font-size: 17px;
  margin-top: 350px;
  cursor: pointer;
`

const MobileCollaborateContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 100vw;
  min-height: 100vh;
  z-index: 200;
  overflow: scroll;
  max-height: 100vh;
  & > span {
    position: absolute;
    top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Titillium Bold;
    font-size: 17px;
  }

  @media ${device.tablet} {
    display: none;
  }
`

const MobileCloseIcon = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 27px;
  height: 27px;
`

const MobileCollaborateWrapper = styled.div`
  overflow: scroll;
  max-height: 100vh;
  padding: 120px 20px 20px 20px;
  background-color: #f2f2f7;
`

const MobileReactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const MobileReactionItem = styled.div`
  & span {
    margin-right: 5px;
    color: ${props => (props.active ? '#f57b00' : 'black')};
  }
`

const MobileCommentFormWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  display: flex;
  & input {
    width: 100%;
    border: none;
    outline: none;
    padding: 0px 70px;
    background-color: #f2f2f7;
  }
`

const MobileOtherOptionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 75px;
  display: flex;
  & input {
    width: 100%;
    border: none;
    outline: none;
    padding: 0px 70px;
    background-color: #f2f2f7;
  }
`

const FormUserAvatar = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
`

const UploadImageIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  width: 30px;
  height: 30px;
  transform: translate(0, -50%);
`

const SendButton = styled.img`
  position: absolute;
  bottom: 0;
  right: 0px;
  width: 50px;
  height: 50px;
`

const BackIcon = styled.img`
  position: fixed;
  top: 38px;
  left: 16px;
  z-index: 5;
  @media ${device.laptop} {
    display: none;
  }
`

const SecureProductBody = styled.div``

const SecureProductFooter = styled.div``

const GetPrototypeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff8c00;
  color: white;
  letter-spacing: 2px;
  height: 70px;
  & span {
    font-size: 18px;
    font-family: Titillium Bold;
  }
  & img {
    width: 30px;
    margin-left: 20px;
  }
`

const SecureProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 60px 0 20px 0;
  background-color: #f2f2f7;
  & img {
    width: 80%;
    height: auto;
  }
`

const SecureMobileDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
`

const SecureMobileDescriptionHeader = styled.div`
  display: flex;
  & img {
    margin-right: 10px;
  }
`

const SecureMobileDescriptionTitle = styled.div`
  margin-top: 10px;
  font-size: 17px;
  font-family: Titillium Bold;
`

const SecureMobileDescriptionText = styled.div`
  margin-top: 5px;
  line-height: 20px;
  font-size: 17px;
  padding-left: 60px;
  & p {
    margin: 0;
  }
`

const SecureProductText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 18px;
  & p {
    margin: 0px;
  }
`

const MobileCollaborateHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const SportButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 15px;
  border-radius: 20px;
  border: 1px solid #a9acaf;
  color: #a9acaf;
`

const FeedbackModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #707070;
  z-index: 200;
`

const FeedbackModalWrapper = styled.div`
  position: fixed;
  right: 0px;
  bottom: 0px;
  display: block;
  width: 100%;
  background: white;
  overflow: scroll;
  z-index: 201;
  & > img {
    position: absolute;
    top: 20px;
    right: 20px;ffffffffffffffff
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      transform: scale(1.05);
    }
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 30%;
    max-width: 580px;
    min-width: 520px;
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

const ModalCloseIcon = styled.img``

const FeedbackModalBody = styled.div`
  padding: 0px 20px;
  margin-top: 60px;
  margin-bottom: 100px;
  & > span {
    display: none;
  }

  @media ${device.tablet} {
    padding: 0;
    margin-bottom: 0px;
    & > span {
      display: block;
      font-family: Titillium Bold;
    }
  }
`

const TextArea = styled.div`
  position: relative;
  & textarea {
    margin-top: 0px;
    width: 100%;
    height: 200px;
    background: #f2f2f7;
    border: none;
  }
  & textarea:focus {
    outline: none;
  }
  @media ${device.tablet} {
    & textarea {
      background: #f2f2f7;
      border: none;
      font-family: Titillium Light;
      font-size: 20px;
    }
  }
`

const OuterDiv = styled.div`
  overflow: auto;
  padding: 15px 0 50px 15px;
  height: auto;
  margin-top: 12px;
  margin-bottom: 10px;
  background: #f2f2f7;

  & textarea {
    width: 100%;
    height: auto;
    border: none;
    outline: none;
    resize: none;
    max-height: calc(100vh - 650px);
  }
  @media ${device.tablet} {
    background: #f2f2f7;
    width: 100%;
  }
`

const TipLetter = styled.div`
  position: absolute;
  left: 19px;
  top: ${props => props.top}px;
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  font-family: ${props => props.font};
  @media ${device.laptop} {
    display: ${props => props.display};
    top: 19px;
    left: 18px;
    width: 75%;
  }
`

const UploadButton = styled.div`
  & input[type='file'] {
    border: 2px solid #333;
    display: none;
  }

  & input[type='file'] + label {
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
  }
  & img {
    width: 36px;
  }
  & label {
    margin-bottom: 0px;
  }
`

const ImagePreview = styled.div`
  background: #f2f2f7;
  padding: 9px 20px;
  & img {
    max-height: 120px;
    max-width: 50%;
  }
  margin-left: 0px;
  width: 100%;
  margin-top: -10px;
  display: block;
  align-items: baseline;
  @media ${device.laptop} {
    padding: 18px 20px;
    display: flex;
    width: 80%;
  }
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
`

const RemoveImg = styled.img`
  margin-left: 18px;
  margin-right: 18px;
  width: 20px !important;
  @media ${device.laptop} {
    width: 38px !important;
  }
`

const Buttons = styled.div`
  position: absolute;
  bottom: 4px;
  left: 20px;
  align-items: center;
  height: 50px;
  & span {
    margin-left: 16px;
    margin-right: 17px;
  }
  display: flex;
  @media ${device.laptop} {
    bottom: 7px;
    display: flex;
    left: 30px;
  }
`

export default DesignTask
