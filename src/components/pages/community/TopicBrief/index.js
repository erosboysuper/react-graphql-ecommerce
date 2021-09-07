import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { device } from '~/utils/device'
import { dateFormat, formatedHtml, subStr } from '~/utils/functions'
import { Letter, Space } from '~/utils/styles'
import CommunityContext from '~/context/CommunityContext'
import StoreContext from '~/context/StoreContext'

import TopicComments from '~/components/pages/community/TopicComments'

import dummyProfilePic from '~/images/Assets/dummyProfilePic.svg'
import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const TopicBrief = ({
  topic,
  displayAll = false,
  showRoomDetail = false,
  removeLazyLoad = false,
}) => {
  const {
    userInfo,
    setLightboxModal,
    setLightboxAsset,
    setEditModal,
    setEditRecord,
    setRoomId,
    setProfileInfo,
  } = useContext(CommunityContext)
  const { localeFolder } = useContext(StoreContext)
  const [isBlogPost, setIsBlogPost] = useState(false)

  useEffect(() => {
    if (topic.id) {
      if (topic.reference_id) {
        setIsBlogPost(true)
      } else {
        setIsBlogPost(false)
      }
    }
  }, [topic])

  return (
    <Container>
      {isBlogPost === true ? (
        <React.Fragment>
          <HeaderWrapper>
            <Link to={`/${localeFolder}/blog/${topic.handle}`}>
              {topic.reference_image && (
                <HeaderBackground>
                  <img src={topic.reference_image} alt={topic.title} />
                </HeaderBackground>
              )}
              <HeaderTitle>{topic.title}</HeaderTitle>
            </Link>
          </HeaderWrapper>
          <Content>
            <Letter
              font="Titillium Web"
              size={16}
              sizeDesktop={20}
              color="#202122"
              style={{ wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{
                __html: subStr(topic.description || '', 350),
              }}
            />
            <ReadMore>
              <Link to={`/${localeFolder}/blog/${topic.handle}`}>
                Read full article {` `}
                <img src={ArrowImg} alt="arrow" width={14} height={12} />
              </Link>
            </ReadMore>
          </Content>
          <Space height={20} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {showRoomDetail === true && (
            <React.Fragment>
              <Title>
                <Link to={`/room/${topic.room.slug}`}>
                  <Letter
                    font="Titillium Black"
                    size={20}
                    sizeLaptop={24}
                    sizeLaptopL={20}
                    sizeDesktop={34}
                    color="black"
                  >
                    {topic.room.title}
                  </Letter>
                </Link>
              </Title>
              <CategoryContainer>
                {topic.room.categories &&
                  topic.room.categories.map(x => (
                    <CategoryItem key={x.id}>
                      <Letter
                        font="Titillium Web"
                        size={12}
                        sizeLaptopL={16}
                        sizeLaptop={14}
                        sizeDesktop={18}
                      >
                        {x.title}
                      </Letter>
                    </CategoryItem>
                  ))}
              </CategoryContainer>
            </React.Fragment>
          )}
          <Profile_Time>
            <ProfileName>
              <LazyLoad removeLazyLoad={removeLazyLoad}>
                <img
                  src={topic.owner.image ? topic.owner.image : dummyProfilePic}
                  alt={topic.owner.name}
                  title={topic.owner.name}
                  onClick={() =>
                    userInfo ? setProfileInfo(topic.owner) : null
                  }
                />
              </LazyLoad>
              <ProfileContain>
                <Letter
                  font="Titillium Bold"
                  size={18}
                  sizeLaptop={20}
                  sizeLaptopL={23}
                  sizeDesktop={26}
                  color="#F57B00"
                >
                  {topic.owner.name}
                </Letter>
                <SubTitle>
                  <Letter
                    font="Titillium Bold"
                    size={18}
                    sizeLaptop={20}
                    sizeLaptopL={23}
                    sizeDesktop={26}
                    color="black"
                  >
                    {topic.title}
                  </Letter>
                </SubTitle>
              </ProfileContain>
              <PublishTime>
                <Letter
                  font="Titillium Web"
                  size={14}
                  sizeLaptop={14}
                  sizeLaptopL={16}
                  sizeDesktop={18}
                  color="#A9ACAF"
                >
                  {dateFormat(topic.created_at)}
                </Letter>
                {userInfo &&
                  userInfo.user.owned_topics.indexOf(topic.id) !== -1 && (
                    <EditButton
                      onClick={() => {
                        setRoomId(topic.room.id)
                        setEditModal(true)
                        setEditRecord({
                          type: `topic`,
                          id: topic.id,
                        })
                      }}
                    >
                      <CircleItem />
                      <CircleItem />
                      <CircleItem />
                    </EditButton>
                  )}
              </PublishTime>
            </ProfileName>
          </Profile_Time>
          <Content>
            <Letter
              font="Titillium Web"
              size={16}
              sizeDesktop={24}
              color="#202122"
              style={{ wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{
                __html: formatedHtml(topic.description || ''),
              }}
            />
          </Content>
          {topic.image && (
            <React.Fragment>
              <LazyLoad removeLazyLoad={removeLazyLoad}>
                <TopicImage
                  src={topic.image}
                  alt="Topic Image"
                  onClick={() => {
                    setLightboxModal(true)
                    setLightboxAsset([`${topic.image_large}`])
                  }}
                />
              </LazyLoad>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <TopicComments
        topic={topic}
        displayAll={displayAll}
        removeLazyLoad={removeLazyLoad}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 16px;
  padding-right: 16px;
  padding-left: 16px;
  position: relative;
  background: white;
`

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  & a {
    color: inherit;
  }
`

const HeaderBackground = styled.div`
  width: 100%;
  height: auto;
  min-height: 45px;
  & img {
    width: 100%;
  }
`

const HeaderTitle = styled.div`
  position: relative;
  width: 100%;
  padding: 5px 0px;
  height: auto;
  background-color: white;
  font-size: 45px;
  font-family: Titillium Black;
  font-size: 24px;
  line-height: 1.2;
  @media ${device.mobileL} {
    font-size: 27px;
  }
  @media ${device.tablet} {
    padding: 10px;
    font-size: 28px;
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 85%;
  }
  @media ${device.laptop} {
    font-size: 35px;
  }
`

const ReadMore = styled.div`
  position: absolute;
  padding: 5px;
  right: 0;
  bottom: -30px;
  color: #ff8c00;
  & a {
    color: inherit;
  }
`

const Title = styled.div`
  width: 60%;
`

const CategoryContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 16px;
  display: flex;

  & .edit-btn {
    margin-right: 10px;
  }
`

const CategoryItem = styled.div`
  height: 30px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid black;
  margin-right: 6px;

  @media ${device.laptop} {
    height: 40px;
    display: flex;
    align-items: center;
  }
  @media ${device.laptopL} {
    height: 45px;
  }
  @media ${device.desktop} {
    height: 50px;
  }
`

const Profile_Time = styled.div`
  position: relative;
  margin-top: 14px;
`

const ProfileName = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-start;
  & img {
    margin-right: 15px;
    border-radius: 50%;
    width: 46px;
    height: 46px;
    cursor: pointer;
  }
  @media ${device.laptop} {
    & img {
      margin-right: 15px;
      border-radius: 50%;
      width: 56px;
      height: 56px;
    }
  }
`

const PublishTime = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`

const SubTitle = styled.div`
  margin-top: 0px;
`

const Content = styled.div`
  position: relative;
  margin-top: 10px;
`

const ProfileContain = styled.div`
  width: 60%;
  margin-top: -5px;
  @media ${device.laptop} {
    width: 80%;
  }
`

const TopicImage = styled.img`
  max-width: 40%;
  cursor: pointer;
  margin: 10px 0px 10px 0px;
`

const EditButton = styled.div`
  display: flex;
  padding-top: 12px;
  cursor: pointer;
  flex-direction: row-reverse;
  @media ${device.laptop} {
    padding-top: 15px;
  }
`

const CircleItem = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-right: 3px;
  background: #cecece;
`

export default TopicBrief
