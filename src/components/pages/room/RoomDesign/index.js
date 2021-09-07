import React, { useContext } from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'
import { btn_color } from '~/utils/colors'
import ArrowBack from '~/images/Assets/Arrow-back.svg'
import { Letter } from '~/utils/styles'
import PledgeIcon from '~/images/Assets/Pledge.svg'

const RoomDesign = ({ detail }) => {
  const ImageList = [
    {
      url: 'https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:best,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b03FDC857-4894-4953-990C-CAEC65AF9C21%7d%3fv%3d5616a2d7ec9769bed91fd751efb3edcb',
    },
    {
      url: 'https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:best,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b03FDC857-4894-4953-990C-CAEC65AF9C21%7d%3fv%3d5616a2d7ec9769bed91fd751efb3edcb',
    },
    {
      url: 'https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:best,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b03FDC857-4894-4953-990C-CAEC65AF9C21%7d%3fv%3d5616a2d7ec9769bed91fd751efb3edcb',
    },
    {
      url: 'https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:best,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b03FDC857-4894-4953-990C-CAEC65AF9C21%7d%3fv%3d5616a2d7ec9769bed91fd751efb3edcb',
    },
    {
      url: 'https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:best,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b03FDC857-4894-4953-990C-CAEC65AF9C21%7d%3fv%3d5616a2d7ec9769bed91fd751efb3edcb',
    },
    {
      url: 'https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:best,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2fen-IN%2f%7b03FDC857-4894-4953-990C-CAEC65AF9C21%7d%3fv%3d5616a2d7ec9769bed91fd751efb3edcb',
    },
  ]

  const ImageRender = () => {
    const List = []
    ImageList.map((item, index) => {
      List.push(
        <ImgContain>
          <LazyLoad>
            <img src={item.url} />
          </LazyLoad>
          <TipLetter>
            <Letter font="Titillium Web" size={11} color="white">
              Pledge
            </Letter>
            <img src={PledgeIcon} />
          </TipLetter>
        </ImgContain>
      )
    })
    return List
  }

  return (
    <Container>
      <Letter font="Titillium Black" size={20} color="black">
        Designs
      </Letter>
      <ImgContainer>{ImageRender()}</ImgContainer>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  padding-bottom: 30px;
  background: #f2f2f7;
  height: 248px;
  width: 100%;
  padding-left: 16px;
  padding-top: 17px;
`

const ImgContainer = styled.div`
  display: flex;
  width: auto;
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 15px;
`

const ImgContain = styled.div`
  width: 154px;
  margin-right: 12px;
  position: relative;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 140px;
    height: 140px;
  }
`

const TipLetter = styled.div`
  position: absolute;
  bottom: -5px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  width: 70%;
  background: #ff8c00;
  & img {
    width: 14px;
  }
`

export default RoomDesign
