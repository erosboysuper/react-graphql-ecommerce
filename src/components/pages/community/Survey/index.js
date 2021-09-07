import React from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'

import CloseImg from '~/images/Assets/Close-modal.svg'
import FilterTrunkImg from '~/images/Assets/Filters-Trunks.svg'
import FilterBoxBriefImg from '~/images/Assets/Filters-Boxer-briefs.svg'
import BriefImg from '~/images/Assets/Filters-Briefs.svg'

const Survey = () => {
  return (
    <Container>
      <Letter
        font="Titillium Bold"
        size={13}
        sizeLaptopL={17}
        sizeLaptop={14}
        sizeDesktop={20}
        color="#FF8C00"
      >
        SURVEY
      </Letter>
      <CloseButton>
        <img src={CloseImg} alt="Close Icon" />
      </CloseButton>
      <Title>
        <Letter
          font="Titillium Bold"
          size={18}
          sizeLaptop={20}
          sizeLaptopL={24}
          sizeDesktop={28}
          color="#202122"
        >
          What’s your favorite type of cut?
        </Letter>
      </Title>
      <TypeContainer>
        <TypeContain>
          <ImgContainer>
            <img src={FilterBoxBriefImg} alt="Filter Trunk" />
          </ImgContainer>
          <LetterContainer>
            <DesktopContain>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={24}
                color="#202122"
              >
                34%
              </Letter>
            </DesktopContain>
            <MobileContain>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={24}
                color="#161617"
              >
                Boxer Briefs
              </Letter>
            </MobileContain>
            <BelowLetter>
              <DesktopContain>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color="#161617"
                >
                  Boxer Briefs
                </Letter>
              </DesktopContain>
              <MobileContain>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color="#202122"
                >
                  34%
                </Letter>
                &nbsp;
              </MobileContain>
              <div>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="gray"
                >
                  312 votes
                </Letter>
              </div>
            </BelowLetter>
          </LetterContainer>
        </TypeContain>
        <TypeContain>
          <ImgContainer>
            <img src={FilterTrunkImg} alt="Filter Trunk" />
          </ImgContainer>
          <LetterContainer>
            <DesktopContain>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={24}
                color="#202122"
              >
                34%
              </Letter>
            </DesktopContain>
            <MobileContain>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={24}
                color="#161617"
              >
                Trunks
              </Letter>
            </MobileContain>
            <BelowLetter>
              <DesktopContain>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color="#161617"
                >
                  Trunks
                </Letter>
              </DesktopContain>
              <MobileContain>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color="#202122"
                >
                  34%
                </Letter>
                &nbsp;
              </MobileContain>
              <div>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="gray"
                >
                  312 votes
                </Letter>
              </div>
            </BelowLetter>
          </LetterContainer>
        </TypeContain>
        <TypeContain>
          <ImgContainer>
            <img src={BriefImg} alt="Filter Trunk" />
          </ImgContainer>
          <LetterContainer>
            <DesktopContain>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={24}
                color="#202122"
              >
                34%
              </Letter>
            </DesktopContain>
            <MobileContain>
              <Letter
                font="Titillium Bold"
                size={14}
                sizeLaptop={16}
                sizeLaptopL={20}
                sizeDesktop={24}
                color="#161617"
              >
                Briefs
              </Letter>
            </MobileContain>
            <BelowLetter>
              <DesktopContain>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color="#161617"
                >
                  Briefs
                </Letter>
              </DesktopContain>
              <MobileContain>
                <Letter
                  font="Titillium Bold"
                  size={14}
                  sizeLaptop={16}
                  sizeLaptopL={20}
                  sizeDesktop={24}
                  color="#202122"
                >
                  34%
                </Letter>
                &nbsp;
              </MobileContain>
              <div>
                <Letter
                  font="Titillium Bold"
                  size={12}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="gray"
                >
                  312 votes
                </Letter>
              </div>
            </BelowLetter>
          </LetterContainer>
        </TypeContain>
      </TypeContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 16px;
  padding-top: 17px;
  background: #f2f2f7;
  height: 202px;
  width: 100%;
  position: relative;
  @media ${device.laptop} {
    height: 260px;
    padding-left: 32px;
    padding-top: 25px;
  }
`

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 16px;
  & img {
    width: 28px;
  }
  @media ${device.laptop} {
    & img {
      width: 38px;
    }
  }
`

const Title = styled.div``

const TypeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 18px;
  @media ${device.laptop} {
    margin-top: 30px;
    justify-content: flex-start;
  }
`

const TypeContain = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85px;
  justify-content: center;
  @media ${device.laptop} {
    width: 24%;
    align-items: center;
    justify-content: center;
    min-width: 88px;
    flex-wrap: nowrap;
    & div {
      margin-right: 5px;
      margin-left: 5px;
    }
  }
  @media ${device.laptopL} {
    width: 28%;
    & div {
      margin-right: 5px;
      margin-left: 5px;
    }
  }
  @media ${device.desktop} {
    & div {
      margin-right: 12.5px;
      margin-left: 12.5px;
    }
  }
`

const ImgContainer = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 64.6px;
  }
  @media ${device.laptop} {
    height: 75px;
    width: 75px;
    & img {
      width: 60px;
    }
  }
  @media ${device.laptopL} {
    height: 75px;
    width: 75px;
    & img {
      width: 60px;
    }
  }
  @media ${device.desktop} {
    height: 100px;
    width: 100px;
    & img {
      width: 80px;
    }
  }
`

const LetterContainer = styled.div`
  text-align: center;
  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
  }
`

const BelowLetter = styled.div`
  display: flex;
  flex-direction: row;
  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
  }
`

export default Survey
