import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'

import ProfileImg from '~/images/Assets/Profile pic.png'
import PledgeIcon from '~/images/Assets/Pledge-Icon.png'
import BackImg from '~/images/homepage/productBack.png'
import ProductImgIcon from '~/images/Assets/Survey-model.png'
import FundingMarkIcon from '~/images/Assets/DESKTOP-Community-in funding.png'

const FundingRelatedProducts = ({}) => {
  return (
    <React.Fragment>
      <Container>
        <LeftContainer>
          <Letter
            font="Titillium Web"
            size={20}
            sizeDesktop={36}
            sizeLaptopL={32}
            sizeLaptop={28}
          >
            More Designs
          </Letter>

          <Letter
            font="Titillium Web"
            size={20}
            sizeDesktop={36}
            sizeLaptopL={32}
            sizeLaptop={28}
          >
            You Might
          </Letter>

          <Letter
            font="Titillium Web"
            size={20}
            sizeDesktop={36}
            sizeLaptopL={32}
            sizeLaptop={28}
          >
            Also Like...
          </Letter>
        </LeftContainer>

        <RightContainer>
          <ProductContainer>
            <ProductList>
              <ProductWrapper>
                <ProductImgWrapper>
                  <ProductBackground>
                    <img src={BackImg} alt />
                  </ProductBackground>
                  <ProductImg src={ProductImgIcon} alt />

                  <FundingMark>
                    <img src={FundingMarkIcon} alt />

                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                      color={'white'}
                    >
                      IN FUNDING
                    </Letter>
                  </FundingMark>
                  <PledgeButton>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={17}
                      sizeLaptop={15}
                      color={'white'}
                    >
                      PLEDGE
                    </Letter>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={17}
                      sizeLaptop={15}
                      color={'white'}
                    >
                      &nbsp;10% OFF
                    </Letter>

                    <img src={PledgeIcon} alt />
                  </PledgeButton>
                </ProductImgWrapper>

                <PriceWrapper>
                  <CurrentPrice>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      $22.99
                    </Letter>
                  </CurrentPrice>
                  <OldPrice>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                      color={'gray'}
                    >
                      $25.28
                    </Letter>
                  </OldPrice>
                </PriceWrapper>

                <ProgressWrapper>
                  <ProgressBar></ProgressBar>
                </ProgressWrapper>

                <ProgressDescription>
                  <ProgressDescriptionHeader>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      75% founded ·
                    </Letter>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                      color={'#ff8c00'}
                    >
                      24 days left
                    </Letter>
                  </ProgressDescriptionHeader>
                  <ProgressDescriptionText>
                    <Letter
                      font="Titillium Web"
                      size={13}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      30/40 Pre-orders
                    </Letter>
                  </ProgressDescriptionText>
                </ProgressDescription>

                <CategoryButtonWrapper>
                  <CategoryButton>
                    <Letter
                      font="Titillium Web"
                      size={14}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      DAILY
                    </Letter>
                  </CategoryButton>
                </CategoryButtonWrapper>

                <Title>
                  <Letter
                    font="Titillium Bold"
                    size={20}
                    sizeDesktop={26}
                    sizeLaptopL={24}
                    sizeLaptop={22}
                  >
                    Boxer Ultra Sport
                  </Letter>
                </Title>
                <UserProfile>
                  <UserAvatar src={ProfileImg} alt />
                  <UserName>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                    >
                      Simon R.
                    </Letter>
                  </UserName>
                </UserProfile>
              </ProductWrapper>

              <ProductWrapper>
                <ProductImgWrapper>
                  <ProductBackground>
                    <img src={BackImg} alt />
                  </ProductBackground>
                  <ProductImg src={ProductImgIcon} alt />

                  <FundingMark>
                    <img src={FundingMarkIcon} alt />

                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                      color={'white'}
                    >
                      IN FUNDING
                    </Letter>
                  </FundingMark>
                  <PledgeButton>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={17}
                      sizeLaptop={15}
                      color={'white'}
                    >
                      PLEDGE
                    </Letter>

                    <img src={PledgeIcon} alt />
                  </PledgeButton>
                </ProductImgWrapper>

                <PriceWrapper>
                  <CurrentPrice>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      $22.99
                    </Letter>
                  </CurrentPrice>
                </PriceWrapper>

                <ProgressWrapper>
                  <ProgressBar></ProgressBar>
                </ProgressWrapper>

                <ProgressDescription>
                  <ProgressDescriptionHeader>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      75% founded ·
                    </Letter>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                      color={'#ff8c00'}
                    >
                      38 days left
                    </Letter>
                  </ProgressDescriptionHeader>
                  <ProgressDescriptionText>
                    <Letter
                      font="Titillium Web"
                      size={13}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      10/40 Pre-orders
                    </Letter>
                  </ProgressDescriptionText>
                </ProgressDescription>

                <CategoryButtonWrapper>
                  <CategoryButton>
                    <Letter
                      font="Titillium Web"
                      size={14}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      SPORTS
                    </Letter>
                  </CategoryButton>
                </CategoryButtonWrapper>

                <Title>
                  <Letter
                    font="Titillium Bold"
                    size={20}
                    sizeDesktop={26}
                    sizeLaptopL={24}
                    sizeLaptop={22}
                  >
                    Boxer Ultra Sport
                  </Letter>
                </Title>
                <UserProfile>
                  <UserAvatar src={ProfileImg} alt />
                  <UserName>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                    >
                      Simon R.
                    </Letter>
                  </UserName>
                </UserProfile>
              </ProductWrapper>

              <ProductWrapper>
                <ProductImgWrapper>
                  <ProductBackground>
                    <img src={BackImg} alt />
                  </ProductBackground>
                  <ProductImg src={ProductImgIcon} alt />

                  <FundingMark>
                    <img src={FundingMarkIcon} alt />

                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                      color={'white'}
                    >
                      IN FUNDING
                    </Letter>
                  </FundingMark>
                  <PledgeButton>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={17}
                      sizeLaptop={15}
                      color={'white'}
                    >
                      PLEDGE
                    </Letter>

                    <img src={PledgeIcon} alt />
                  </PledgeButton>
                </ProductImgWrapper>

                <PriceWrapper>
                  <CurrentPrice>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      $22.99
                    </Letter>
                  </CurrentPrice>
                </PriceWrapper>

                <ProgressWrapper>
                  <ProgressBar></ProgressBar>
                </ProgressWrapper>

                <ProgressDescription>
                  <ProgressDescriptionHeader>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      90% founded ·
                    </Letter>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                      color={'#ff8c00'}
                    >
                      8 days left
                    </Letter>
                  </ProgressDescriptionHeader>
                  <ProgressDescriptionText>
                    <Letter
                      font="Titillium Web"
                      size={13}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      30/40 Pre-orders
                    </Letter>
                  </ProgressDescriptionText>
                </ProgressDescription>

                <CategoryButtonWrapper>
                  <CategoryButton>
                    <Letter
                      font="Titillium Web"
                      size={14}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      TRAVEL
                    </Letter>
                  </CategoryButton>
                </CategoryButtonWrapper>

                <Title>
                  <Letter
                    font="Titillium Bold"
                    size={20}
                    sizeDesktop={26}
                    sizeLaptopL={24}
                    sizeLaptop={22}
                  >
                    Boxer Ultra Sport
                  </Letter>
                </Title>
                <UserProfile>
                  <UserAvatar src={ProfileImg} alt />
                  <UserName>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                    >
                      Simon R.&amp; Tobie C.
                    </Letter>
                  </UserName>
                </UserProfile>
              </ProductWrapper>

              <ProductWrapper>
                <ProductImgWrapper>
                  <ProductBackground>
                    <img src={BackImg} alt />
                  </ProductBackground>
                  <ProductImg src={ProductImgIcon} alt />

                  <FundingMark>
                    <img src={FundingMarkIcon} alt />

                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                      color={'white'}
                    >
                      IN FUNDING
                    </Letter>
                  </FundingMark>
                  <PledgeButton>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={20}
                      sizeLaptopL={17}
                      sizeLaptop={15}
                      color={'white'}
                    >
                      PLEDGE
                    </Letter>
                    <img src={PledgeIcon} alt />
                  </PledgeButton>
                </ProductImgWrapper>

                <PriceWrapper>
                  <CurrentPrice>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      $14.99
                    </Letter>
                  </CurrentPrice>
                </PriceWrapper>

                <ProgressWrapper>
                  <ProgressBar></ProgressBar>
                </ProgressWrapper>

                <ProgressDescription>
                  <ProgressDescriptionHeader>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                    >
                      75% founded ·
                    </Letter>
                    <Letter
                      font="Titillium Bold"
                      size={16}
                      sizeDesktop={22}
                      sizeLaptopL={20}
                      sizeLaptop={18}
                      color={'#ff8c00'}
                    >
                      24 days left
                    </Letter>
                  </ProgressDescriptionHeader>
                  <ProgressDescriptionText>
                    <Letter
                      font="Titillium Web"
                      size={13}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      30/40 Pre-orders
                    </Letter>
                  </ProgressDescriptionText>
                </ProgressDescription>

                <CategoryButtonWrapper>
                  <CategoryButton>
                    <Letter
                      font="Titillium Web"
                      size={14}
                      sizeDesktop={18}
                      sizeLaptopL={16}
                      sizeLaptop={14}
                      color={'gray'}
                    >
                      DATE NIGHT
                    </Letter>
                  </CategoryButton>
                </CategoryButtonWrapper>

                <Title>
                  <Letter
                    font="Titillium Bold"
                    size={20}
                    sizeDesktop={26}
                    sizeLaptopL={24}
                    sizeLaptop={22}
                  >
                    Boxer Ultra Sport Long Name
                  </Letter>
                </Title>
                <UserProfile>
                  <UserAvatar src={ProfileImg} alt />
                  <UserName>
                    <Letter
                      font="Titillium Web"
                      size={16}
                      sizeLaptopL={18}
                      sizeLaptop={16}
                    >
                      Arthur S.
                    </Letter>
                  </UserName>
                </UserProfile>
              </ProductWrapper>
            </ProductList>
          </ProductContainer>
        </RightContainer>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  background-color: white;
  font-family: Titillium Web;
  @media ${device.tablet} {
    flex-direction: row;
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  line-height: 35px;
  & p {
    margin: 0;
  }

  @media ${device.tablet} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 27%;
    padding-right: 80px;
  }
`

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  @media ${device.tablet} {
    width: 73%;
    padding: 0;
  }
`

const ProductContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`

const ProductList = styled.div`
  display: inline-flex;
`

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 52vw;
  margin-right: 15px;
  padding-bottom: 30px;

  @media ${device.tablet} {
    width: 20vw;
  }
`

const ProductImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 15px;
`

const ProductBackground = styled.div`
  width: 100%;
  & img {
    width: 100%;
    height: auto;
  }
`

const ProductImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: auto;
`

const FundingMark = styled.div`
  position: absolute;
  top: 7px;
  right: 12px;
  letter-spacing: 1px;
  & img {
    width: 45px;
    height: auto;
  }
  & span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(270deg);
    color: white;
    white-space: nowrap;
  }

  @media ${device.laptopL} {
    & img {
      width: 50px;
    }
  }

  @media ${device.lapmid} {
    & img {
      width: 60px;
    }
  }
`

const PledgeButton = styled.div`
  position: absolute;
  bottom: -10px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff8c00;
  padding: 12px 20px;
  & img {
    width: 20px;
    margin-left: 20px;
  }
`

const PriceWrapper = styled.div`
  display: flex;
  margin-top: 15px;
`

const CurrentPrice = styled.div`
  font-family: Titillium Bold;
`

const OldPrice = styled.div`
  margin-left: 10px;
`

const ProgressWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  border: 1px solid gray;
  width: 100%;
  height: 10px;
`

const ProgressBar = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
  width: 75%;
  height: calc(100% + 2px);
  background-color: #ff8c00;
`

const ProgressDescription = styled.div``

const ProgressDescriptionHeader = styled.div`
  margin-top: 7px;
  font-size: 15px;
  & span {
    margin-right: 5px;
  }
`

const ProgressDescriptionText = styled.div``

const CategoryButtonWrapper = styled.div`
  display: flex;
  margin-top: 12px;
`

const CategoryButton = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;
  border: 1px solid gray;
  border-radius: 20px;
  cursor: pointer;
`

const Title = styled.div`
  font-size: 22px;
  font-family: Titillium Bold;
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 5px;
`

const UserAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
`

const UserName = styled.div`
  font-size: 15px;
`

export default FundingRelatedProducts
