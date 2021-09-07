import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter } from '~/utils/styles'
import SeeMoreImg from '~/images/Assets/DESKTOP-See more.svg'
import SeeLessImg from '~/images/Assets/DESKTOP-See less.svg'

const FAQs = ({ faqs, individualPage }) => {
  const [faqList, setFaqList] = useState([])
  useEffect(() => {
    const _faqList = faqs
      .filter(x => x.isPublished)
      .map(x => {
        x.active = false
        return x
      })
    setFaqList(_faqList)
  }, [])

  const toggleView = item => {
    let _faqList = [...faqList]
    let findItem = _faqList.find(x => x.id === item.id)
    findItem.active = !findItem.active
    setFaqList(_faqList)
  }

  return (
    <Container>
      {individualPage !== true && (
        <Title>
          <Letter
            font="Titillium Black"
            sizeDesktop={42}
            sizeLaptopL={36}
            sizeLaptop={26}
            sizeMobileS={23}
            sizeMobileM={26}
            sizeMobileL={26}
            color="white"
          >
            FAQs
          </Letter>
        </Title>
      )}
      <FAQList>
        <ListContainer>
          {faqList.map(item => (
            <Item key={item.id}>
              <Letter
                font="Titillium Web"
                sizeDesktop={26}
                sizeLaptopL={22}
                sizeLaptop={18}
                sizeMobileS={16}
                sizeMobileM={18}
                sizeMobileL={18}
                color="white"
              >
                {item.title}
              </Letter>
              <img
                src={item.active ? SeeLessImg : SeeMoreImg}
                onClick={() => toggleView(item)}
                alt="See More"
              />
              <MoreContent display={item.active ? 'block' : 'none'}>
                <Letter
                  font="Titillium Web"
                  sizeDesktop={20}
                  sizeLaptopL={17}
                  sizeLaptop={14}
                  sizeMobileS={15}
                  sizeMobileM={16}
                  sizeMobileL={16}
                  color="white"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </MoreContent>
            </Item>
          ))}
        </ListContainer>
      </FAQList>
    </Container>
  )
}

const Container = styled.div`
  height: auto;
  width: 100%;
  background: #535558;
  padding-top: 50px;
  padding-bottom: 54px;
`

const Title = styled.div`
  padding-top: 27px;
  text-align: center;
  @media ${device.mobileS} {
    text-align: unset;
    margin-left: 4%;
  }
  @media ${device.laptop} {
    text-align: center;
  }
`

const FAQList = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 57px;
  @media ${device.mobileS} {
    display: flex;
    flex-wrap: wrap;
    margin-top: 39px;
  }
  @media ${device.laptop} {
    flex-wrap: unset;
    margin-top: 57px;
  }
`

const ListContainer = styled.div`
  width: 30%;
  @media ${device.mobileS} {
    width: 92%;
  }
  @media ${device.laptop} {
    width: 74%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const Item = styled.div`
  position: relative;
  height: auto;
  padding-bottom: 30px;
  margin-bottom: 30px;
  padding-right: 10%;
  border-bottom: ${props => (props.border ? 0 : 1)}px solid #202122;
  & img {
    position: absolute;
    top: 0px;
    cursor: pointer;
    right: 0px;
  }
  @media ${device.mobileS} {
    & img {
      width: 28px;
    }
    padding-bottom: 16px;
    border-bottom: ${props => (props.borderMobile ? 0 : 1)}px solid #202122;
  }
  @media ${device.laptop} {
    width: 40%;
    & img {
      width: 28px;
    }
    padding-bottom: 30px;
    border-bottom: ${props => (props.border ? 0 : 1)}px solid #202122;
  }
  @media ${device.laptopL} {
    & img {
      width: 32px;
    }
  }
  @media ${device.desktop} {
    & img {
      width: 38px;
    }
  }
`

const MoreContent = styled.div`
  width: 90%;
  display: ${props => props.display};
`

export default FAQs
