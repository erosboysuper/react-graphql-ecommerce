import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'

import SwimmingModelIcon from '~/images/Assets/Swimming-Model.png'
import ProfileImg from '~/images/Assets/Profile pic.png'
import VoteDown from '~/images/Assets/Vot-down.svg'
import VoteDownActive from '~/images/Assets/Vot-down active.svg'
import VoteUp from '~/images/Assets/Vot-up.svg'
import VoteUpActive from '~/images/Assets/Vot-up active.svg'
import CommentIcon from '~/images/Assets/Comment.svg'
import FollowingIcon from '~/images/Assets/Following.svg'
import FollowIcon from '~/images/Assets/Follow.svg'
import NoImage from '~/images/Assets/No-Image.svg'

const ProductComment = ({}) => {
  return (
    <React.Fragment>
      <Container>
        <LeftWrapper>
          <AdverImg>
            <img src={SwimmingModelIcon} alt />
          </AdverImg>
          <LeftWrapperBody>
            <AdverTitle>Room</AdverTitle>
            <ProductTitle>Swimming briefs</ProductTitle>
            <MemberCount>15 MEMBERS</MemberCount>
          </LeftWrapperBody>
        </LeftWrapper>

        <RightWrapper>
          <CommentContainer>
            <MainCommentWrapper>
              <span> Creator</span>
              <CommentHeader>
                <CommentLeft>
                  <UserAvatar src={ProfileImg} alt />
                  <UserProfile>
                    <CommentorName>Simon R.</CommentorName>
                    <CommentTitle>
                      New design <i>In Funding</i>
                    </CommentTitle>
                  </UserProfile>
                </CommentLeft>
                <CreatedTime>3 days ago</CreatedTime>
              </CommentHeader>
              <ComentBody>
                Hey guys! Here is the design that we created with{' '}
                <span>@JamesA.</span> and all of you.
              </ComentBody>

              <CommentFooter>
                <VoteNum>
                  <img src={CommentIcon} alt /> 15
                </VoteNum>
                <UpVote>
                  <img src={VoteUpActive} alt />
                  134
                </UpVote>
                <DownVote>
                  <img src={VoteDown} alt />2
                </DownVote>
                <Following>
                  Following <img src={FollowingIcon} alt />
                </Following>
              </CommentFooter>
            </MainCommentWrapper>

            <SpliteLine />
            <ReplyWrapper>
              <ReplyItem>
                <ReplyMain>
                  <ReplyLeft>
                    <UserAvatar src={ProfileImg} alt />
                    <ReplyLeftText>
                      <ReplyAuthor>Tobie C.</ReplyAuthor>
                      <ReplyText>
                        I wear proper pants for running and when wearing joggers
                        or shorts, I go for boxers.
                      </ReplyText>
                    </ReplyLeftText>
                  </ReplyLeft>

                  <CreatedTime>20 min ago</CreatedTime>
                </ReplyMain>
                <ReplyFooter>
                  <ReplyUpVote>
                    <img src={VoteUp} alt /> 12
                  </ReplyUpVote>
                  <ReplyDownVote>
                    <img src={VoteDown} alt />
                  </ReplyDownVote>
                </ReplyFooter>
              </ReplyItem>

              <ReplyItem>
                <ReplyMain>
                  <ReplyLeft>
                    <UserAvatar src={ProfileImg} alt />
                    <ReplyLeftText>
                      <ReplyAuthor>Tobie C.</ReplyAuthor>
                      <ReplyText>I do prefer microfiber boxers</ReplyText>
                    </ReplyLeftText>
                  </ReplyLeft>

                  <CreatedTime>4 hours ago</CreatedTime>
                </ReplyMain>
                <ReplyFooter>
                  <ReplyUpVote>
                    <img src={VoteUpActive} alt /> 44
                  </ReplyUpVote>
                  <ReplyDownVote>
                    <img src={VoteDown} alt /> 6
                  </ReplyDownVote>
                </ReplyFooter>
              </ReplyItem>

              <ReplyItem>
                <ReplyMain>
                  <ReplyLeft>
                    <UserAvatar src={ProfileImg} alt />
                    <ReplyLeftText>
                      <ReplyAuthor>Tobie C.</ReplyAuthor>
                      <ReplyText>Yes, exactly: for boxers!</ReplyText>
                    </ReplyLeftText>
                  </ReplyLeft>

                  <CreatedTime>7 hours ago</CreatedTime>
                </ReplyMain>
                <ReplyFooter>
                  <ReplyUpVote>
                    <img src={VoteUp} alt /> 3
                  </ReplyUpVote>
                  <ReplyDownVote>
                    <img src={VoteDown} alt />1
                  </ReplyDownVote>
                </ReplyFooter>
              </ReplyItem>

              <LoadAllCommentButton>LOAD ALL COMMENTS</LoadAllCommentButton>
            </ReplyWrapper>

            <WriteCommentContainer>
              <UserAvatar src={ProfileImg} alt />
              <InputWrapper>
                <input type="text" placeholder="Write a comment..." />
                <UploadImgWrapper>
                  <UploadImgIcon src={NoImage} alt />
                  IMAGE
                </UploadImgWrapper>
              </InputWrapper>
            </WriteCommentContainer>
          </CommentContainer>
        </RightWrapper>
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: #f7f7fa;
  font-family: Titillium Web;
  @media ${device.tablet} {
    flex-direction: row;
    padding: 35px 80px;
  }
`

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: -20px -20px 20px -20px;
  width: 100vw;
  background: white;
  padding: 20px 20px 50px 20px;

  @media ${device.tablet} {
    background: transparent;
    flex-direction: column;
    width: 30%;
    padding: 0;
    margin: 0;
  }
`

const LeftWrapperBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  @media ${device.tablet} {
    flex-direction: column;
    margin-left: 0px;
  }
`

const AdverImg = styled.div`
  display: block;
  width: 150px;
  height: 150px;
  & img {
    width: 100%;
    height: 100%;
  }
`

const AdverTitle = styled.div`
  display: flex;
  margin-top: 30px;
  font-size: 14px;
  font-family: Titillium Bold;
`

const ProductTitle = styled.div`
  display: flex;
  font-size: 26px;
  margin-top: 10px;
  font-family: Titillium Bold;
`

const MemberCount = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  font-family: Titillium Bold;
  letter-spacing: 2px;
  color: gray;
`

const RightWrapper = styled.div`
  margin: -20px;
  width: 100vw;

  @media ${device.tablet} {
    margin: 0px;
    width: 70%;
  }
`

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  width: 100%;

  & > span {
    font-family: Titillium Bold;
    font-size: 16px;
    margin-bottom: 10px;
  }
`

const MainCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: -20px;
  padding: 20px;
  background-color: #f2f2f7;

  & > span {
    font-family: Titillium Bold;
    font-size: 16px;
    margin-bottom: 10px;
  }

  @media ${device.tablet} {
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CommentLeft = styled.div`
  display: flex;
  align-items: center;
`

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
`

const UserProfile = styled.div``

const CommentorName = styled.div`
  font-size: 18px;
  color: #f57b00;
  font-family: Titillium Bold;
`

const CommentTitle = styled.div`
  font-size: 18px;
  font-family: Titillium Bold;
`

const ComentBody = styled.div`
  margin-top: 15px;
  padding-left: 20px;
  & span {
    color: #f57b00;
    font-family: Titillium Bold;
  }
`

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px 0;
  padding-left: 20px;
`

const VoteNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`

const UpVote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`

const DownVote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`

const Following = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f57b00;
  font-family: Titillium Bold;
  & img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
`

const SpliteLine = styled.div`
  display: none;
  margin-left: 20px;
  width: 100%;
  height: 5px;
  background-color: #f7f7fa;

  @media ${device.tablet} {
    display: block;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`

const ReplyItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 0;

  @media ${device.tablet} {
    margin: 0 0 20px 0;
  }
`

const ReplyMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const ReplyLeft = styled.div`
  display: flex;
`

const ReplyLeftText = styled.div`
  display: flex;
  flex-direction: column;
`

const ReplyAuthor = styled.div`
  font-size: 17px;
  font-family: Titillium Bold;
  color: #f57b00;
`

const ReplyText = styled.div`
  margin-top: 5px;
  line-height: 20px;

  @media ${device.tablet} {
    line-height: 4px;
  }
`

const CreatedTime = styled.div`
  font-size: 14px;
  color: #a9acaf;
`

const ReplyFooter = styled.div`
  display: flex;
  margin-top: 15px;
  padding-left: 60px;
`

const ReplyUpVote = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  & img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`

const ReplyDownVote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }
`

const LoadAllCommentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 60px;
  flex-wrap: wrap;
  width: 150px;
  height: 30px;
  font-size: 13px;
  border: 1px solid gray;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`

const WriteCommentContainer = styled.div`
  display: flex;
  margin-top: 30px;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;

  & input {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    width: 100%;
    height: 100%;
    background-color: #f2f2f7;
    border: none;
    outline: none;
  }
`

const UploadImgWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
  color: gray;
  font-size: 14px;
  letter-spacing: 2px;
  cursor: pointer;
`

const UploadImgIcon = styled.img`
  margin-right: 5px;
  width: 25px;
  height: 25px;
`

export default ProductComment
