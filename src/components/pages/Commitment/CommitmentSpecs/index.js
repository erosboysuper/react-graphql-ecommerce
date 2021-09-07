import React from 'react'
import styled from 'styled-components'
import LazyLoad from '~/components/Common/LazyLoad'

import { Letter, Img } from '~/utils/styles'
import { device } from '~/utils/device'

const CommitmentSpecs = ({ commitmentHighlight }) => {
  return (
    <Container>
      <SpecList>
        {commitmentHighlight.map(item => (
          <Item key={item.id}>
            <LazyLoad>
              <LogoContainer>
                {item.image.fluid ? (
                  <Img fluid={item.image.fluid} alt="Logo" />
                ) : (
                  <img src={item.image.url} alt="Logo" />
                )}
              </LogoContainer>
            </LazyLoad>
            <LetterPart>
              <Letter
                font="Titillium Bold"
                sizeDesktop={32}
                sizeLaptopL={29}
                sizeLaptop={26}
                sizeMobileS={14}
                sizeMobileM={15}
                sizeMobileL={16}
                color="#202122"
              >
                {item.title}
              </Letter>
              <hr />
              <Letter
                font="Titillium Light"
                sizeDesktop={32}
                sizeLaptopL={29}
                sizeLaptop={22}
                sizeMobileS={14}
                sizeMobileM={15}
                sizeMobileL={16}
                color="#202122"
                dangerouslySetInnerHTML={{ __html: item.description || '' }}
              />
              <BorderBox />
            </LetterPart>
          </Item>
        ))}
      </SpecList>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  & hr {
    border: none;
  }
  @media ${device.desktop} {
    margin-top: 280px;
  }
`

const SpecList = styled.div`
  display: block;
  padding-left: 7%;
  @media ${device.laptop} {
    display: flex;
  }
`

const Item = styled.div`
  width: 90%;
  margin-top: 50px;
  @media ${device.laptop} {
    width: 23%;
    margin-right: 100px;
  }
  @media ${device.laptopL} {
    width: 28%;
    margin-right: 60px;
  }
`

const LetterPart = styled.div`
  position: relative;
  margin-top: 30px;
  @media ${device.laptop} {
    margin-top: -70px;
  }
  @media ${device.laptopL} {
    margin-top: 70px;
  }
  @media ${device.desktopL} {
    margin-top: 220px;
  }
`

const BorderBox = styled.div`
  position: absolute;
  border-left: 1px solid #afafaf;
  border-top: 1px solid #afafaf;
  width: 230px;
  height: 154px;
  left: -10px;
  top: -10px;
  @media ${device.laptop} {
    width: 230px;
    height: 350px;
  }
`

const LogoContainer = styled.div`
  height: auto;
  position: relative;
  & img {
    position: relative;
    width: 70%;
  }
  @media ${device.mobileS} {
    width: 70%;
    height: unset;
  }
  @media ${device.laptop} {
    height: 380px;
    position: relative;
    & img {
      position: absolute;
      bottom: 0px;
    }
  }
  @media ${device.laptopL} {
  }
  @media ${device.desktop} {
    height: 510px;
  }
`

export default CommitmentSpecs
