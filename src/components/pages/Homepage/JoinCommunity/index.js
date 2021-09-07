import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { Img } from '~/utils/styles'
import { device } from '~/utils/device'
import StoreContext from '~/context/StoreContext'

import ArrowImg from '~/images/Assets/Arrow-orange.svg'

const JoinCommunity = ({ removeFooterSpace, active }) => {
  const { locale, localeFolder } = useContext(StoreContext)
  const { community_en, community_de, community_ch } = useStaticQuery(graphql`
    query {
      community_en: datoCmsHomePage(locale: { eq: "en" }) {
        ...community_commonFields
      }
      community_de: datoCmsHomePage(locale: { eq: "de" }) {
        ...community_commonFields
      }
      community_ch: datoCmsHomePage(locale: { eq: "en-CH" }) {
        ...community_commonFields
      }
    }
    fragment community_commonFields on DatoCmsHomePage {
      showCommunitySection
      communityImage {
        url
        fluid(forceBlurhash: true, maxWidth: 910) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      desktopCommunityImage {
        url
        fluid(forceBlurhash: true, maxWidth: 1500) {
          sizes
          aspectRatio
          src
          srcSet
          width
          height
        }
      }
      communityHeadline1
      communityHeadline2
      communityButtonText
      communityButtonLink
      showCommunityButton
    }
  `)
  let community = {}
  if (locale === 'en') {
    community = community_en
  } else if (locale === 'de') {
    community = community_de
  } else if (locale === 'en-CH') {
    community = community_ch
  }

  let sources = []
  if (community.communityImage && community.communityImage.fluid) {
    sources.push(community.communityImage.fluid)
  }
  if (
    community.desktopCommunityImage &&
    community.desktopCommunityImage.fluid
  ) {
    sources.push({
      ...community.desktopCommunityImage.fluid,
      media: `(min-width: 768px)`,
    })
  }
  const reg = /http(s):/
  const _communityButtonLink =
    reg.test(`${community.communityButtonLink}`) ||
    `${community.communityButtonLink}`.indexOf('community') !== -1
      ? `${community.communityButtonLink}`
      : `/${localeFolder}${community.communityButtonLink}`

  return community.showCommunitySection ? (
    <Container removeFooterSpace={removeFooterSpace} bottom={0}>
      <Background>
        {sources.length > 0 && active !== true && (
          <Img fluid={sources} alt="Join Background" />
        )}
        {active === true && (
          <MobileContainer>
            <Img
              fluid={community.communityImage.fluid}
              alt="Mobile Background Fit"
            />
          </MobileContainer>
        )}
        {active === true && (
          <DesktopContainer>
            <Img
              fluid={community.desktopCommunityImage.fluid}
              alt="Desktop Background Fit"
            />
          </DesktopContainer>
        )}
      </Background>
      <LetterContainer>
        <Title>
          <Letter
            size={44}
            sizeMobileS={40}
            sizeMobileM={44}
            line={44}
            sizeTablet={40}
            sizeLaptop={48}
            sizeLaptopL={65}
            sizeDesktop={84}
            lineDesktop={50}
          >
            <Span font="Titillium Bold">{community.communityHeadline1}</Span>
          </Letter>
        </Title>
        <br />
        <Space />
        <Title1>
          <Letter
            size={20}
            sizeMobileS={16}
            line={24}
            top={13}
            sizeTablet={16}
            sizeLaptop={20}
            sizeLaptopL={26}
            sizeDesktop={34}
            lineDesktop={36}
          >
            <label>{community.communityHeadline2}</label>
          </Letter>
        </Title1>
        <br />
        <br />
        {community.showCommunityButton && (
          <Link to={_communityButtonLink}>
            <Title>
              <Button>
                {community.communityButtonText}{' '}
                <img src={ArrowImg} alt="arrow" />
              </Button>
            </Title>
          </Link>
        )}
      </LetterContainer>
    </Container>
  ) : (
    <HiddenPart />
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  margin-top: 40px;
  margin-bottom: ${props => (props.removeFooterSpace ? '-33px' : '')};
  @media ${device.laptop} {
    margin-top: 90px;
    margin-bottom: ${props => props.bottom}px;
  }
  @media ${device.laptopL} {
    margin-top: 120px;
  }
  @media ${device.desktop} {
    margin-top: 150px;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media ${device.laptop} {
    & img {
      width: 100%;
    }
    margin-bottom: -24px;
  }
`

const Title = styled.div`
  margin-left: 7px;
  margin-top: 0px;
  display: inline-block;
`

const Title1 = styled.div`
  margin-left: 7px;
  margin-top: 0px;
  display: inline-block;
  @media ${device.tablet} {
    width: 90%;
  }
  @media ${device.laptop} {
    width: 583px;
  }
  @media ${device.laptopL} {
    width: 540px;
  }
  @media ${device.desktop} {
    width: 650px;
  }
`

const Letter = styled.div`
  display: inline-block;
  font-size: ${props => props.size}px;
  font-family: ${props => (props.font ? props.font : 'Titillium Web')};
  color: white;
  padding: 0px 12px 2px 3px;
  margin-top: ${props => props.top}px;
  line-height: ${props => props.line}px;
  @media ${device.mobileS} {
    font-size: ${props =>
      props.sizeMobileS ? props.sizeMobileS : props.size}px;
    line-height: ${props => props.line - 3}px;
  }
  @media ${device.mobileM} {
    font-size: ${props =>
      props.sizeMobileM ? props.sizeMobileM : props.size}px;
  }
  @media ${device.mobileL} {
    font-size: ${props =>
      props.sizeMobileL ? props.sizeMobileL : props.size}px;
  }
  @media ${device.tablet} {
    font-size: ${props => (props.sizeTablet ? props.sizeTablet : props.size)}px;
  }
  @media ${device.laptop} {
    font-size: ${props =>
      props.sizeLaptop ? props.sizeLaptop : props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop - 10}px;
  }
  @media ${device.laptopL} {
    font-size: ${props =>
      props.sizeLaptopL ? props.sizeLaptopL : props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop - 8}px;
  }
  @media ${device.desktop} {
    font-size: ${props => props.sizeDesktop}px;
    line-height: ${props => props.lineDesktop}px;
  }
`

const LetterContainer = styled.div`
  position: absolute;
  height: 54%;
  bottom: 55px;
  left: 0px;
  @media ${device.mobileL} {
    bottom: 0px;
  }
  @media ${device.tablet} {
    bottom: 55px;
  }
  @media ${device.laptop} {
    left: 12.5%;
    height: 57%;
  }
  @media ${device.laptopL} {
    height: 55%;
  }
  @media ${device.desktop} {
    height: 55%;
  }
`

const Button = styled.button`
  & {
    font-size: 15px;
    padding: 15px 15px 15px 15px;
    margin-top: -10px;
    -webkit-appearance: none;
    font-family: Titillium Bold;
    /* border-radius: 0; */
    background-color: white;
  }

  & img {
    margin-left: 10px;
  }
  @media ${device.mobileS} {
    font-size: 13px;
    padding: 13px;
    & img {
      width: 12px;
    }
  }
  @media ${device.mobileM} {
    font-size: 15px;
    padding: 15px;
    & img {
      width: 14px;
    }
  }

  @media ${device.laptop} {
    width: auto;
    height: 60px;
    font-size: 16px;
    margin-top: 0px;
  }

  @media ${device.laptopL} {
    width: auto;
    height: 68px;
    font-size: 19px;
    margin-top: 10px;
  }
  @media ${device.desktop} {
    width: auto;
    height: 90px;
    font-size: 22px;
    margin-top: 30px;
  }
`

const Span = styled.span`
  font-family: ${props => props.font};
`

const HiddenPart = styled.div`
  width: 100%;
  background: transparent;
  height: 1px;
`

const Space = styled.div`
  @media ${device.laptop} {
    width: 100%;
    height: 10px;
  }
`

const MobileContainer = styled.div`
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`

const DesktopContainer = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
    & img {
      width: 100%;
    }
  }
`

export default JoinCommunity
