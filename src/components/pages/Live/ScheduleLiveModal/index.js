import React, { useContext, useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { MobileContain, DesktopContain, Letter } from '~/utils/styles'
import StoreContext from '~/context/StoreContext'
import CloseIcon from '~/images/Assets/Close-modal.svg'
import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'
import AddProductItem from '~/components/pages/Live/AddProductItem'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'

const ScheduleLiveModal = () => {
  const { setScheduleLiveModal, setScheduleDetail } = useContext(
    CommunityContext
  )
  const [value, onChange] = useState(null)
  const [step, setStep] = useState(false)
  const [imageChoose, setImageChoose] = useState(null)
  const [imageId, setImageId] = useState(null)
  useEffect(() => {
    console.log('value', value)
  }, [value])
  const images = [
    {
      category: 'daily',
      images: [
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea.png',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
      ],
    },
    {
      category: 'Sport',
      images: [
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea.png',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
      ],
    },
    {
      category: 'Game',
      images: [
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea.png',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
      ],
    },
    {
      category: 'Cap',
      images: [
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea/medium_866_BBA_33_29_C0_4_DB_2_AD_81_5_F12_DF_9_F5213_cac1d393ea.png',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
        'https://storage.googleapis.com/tbo-clothing.appspot.com/medium_ME_Ntal_Wellness_e204726a0e/medium_ME_Ntal_Wellness_e204726a0e',
      ],
    },
  ]
  return (
    <Container>
      {step === false ? (
        <Step1>
          <Title>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Choose A Date
            </Letter>
          </Title>
          <CloseImg
            src={CloseIcon}
            alt="CloseIcon"
            onClick={() => setScheduleLiveModal(false)}
          />
          <CalendarContainer>
            <Calendar onChange={onChange} value={value} />
          </CalendarContainer>
          {value && (
            <ContinueButton onClick={() => setStep(true)}>
              <Letter font="Titillim Web" size={24} color="white">
                Continue
              </Letter>
            </ContinueButton>
          )}
        </Step1>
      ) : (
        <Step1>
          <Title>
            <Letter font="Titillium Bold" size={20} color="#202122">
              Select a Live Image{' '}
            </Letter>
          </Title>
          <CloseImg
            src={CloseIcon}
            alt="CloseIcon"
            onClick={() => setScheduleLiveModal(false)}
          />
          {images.map((item, ind) => {
            return (
              <div key={ind + 'container'}>
                <Title>
                  <Letter font="Titillium Bold" size={20} color="#202122">
                    {item.category}
                  </Letter>
                </Title>
                <ImageContainer>
                  {item.images.map((detail, index) => {
                    return (
                      <img
                        src={detail}
                        alt=""
                        key={index + detail + item.category}
                        className={
                          index + detail + item.category === imageId
                            ? 'selected'
                            : ''
                        }
                        onClick={() => {
                          setImageChoose(detail)
                          setImageId(index + detail + item.category)
                        }}
                      />
                    )
                  })}
                </ImageContainer>
              </div>
            )
          })}

          {value && (
            <ContinueButton
              onClick={() => {
                setScheduleDetail({
                  date: format(new Date(value), 'yyyy/MM/dd').toString(),
                  image: imageChoose,
                })
                setScheduleLiveModal(false)
              }}
            >
              <Letter font="Titillim Web" size={24} color="white">
                Continue
              </Letter>
            </ContinueButton>
          )}
        </Step1>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: white;
  width: 100%;
  padding-left: 16px;
  padding-bottom: 120px;
  z-index: 15;
  padding-right: 16px;
  @media ${device.laptop} {
    height: 100%;
    width: 30%;
    overflow-x: hidden;
    overflow-y: auto;
    right: 0px;
    left: unset;
  }
`

const Step1 = styled.div``

const Title = styled.div`
  text-align: center;
  margin-top: 40px;
`

const CloseImg = styled.img`
  position: absolute;
  right: 16px;
  top: 19px;
  @media ${device.laptop} {
    right: 31px;
    top: 43px;
    width: 38px;
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5%;
`

const CalendarContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`

const ContinueButton = styled.button`
  height: 83px;
  width: 350px;
  background: #ff8c00;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 30px;
`

const ImageContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  & img {
    height: 120px;
    margin-right: 20px;
    opacity: 0.5;
  }
  img.selected {
    opacity: 1;
  }
`

export default ScheduleLiveModal
