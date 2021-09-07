import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import CommunityContext from '~/context/CommunityContext'
import { Letter, DesktopContain, MobileContain } from '~/utils/styles'

const FilterBar = ({ showFilters = true, showSortBy = true }) => {
  const { filters, setFilters, categoryData, getCategories } =
    useContext(CommunityContext)
  const sortOptions = [
    {
      id: `most_recent`,
      title: `Most Recent`,
    },
    {
      id: `trending`,
      title: `Trending`,
    },
  ]
  const [category, setCategory] = useState(filters.category)
  const [sortBy, setSortBy] = useState(filters.sortBy)

  useEffect(() => {
    const userPreferredSortBy = localStorage.getItem(`topic-sortBy`)
    setSortBy(userPreferredSortBy || filters.sortBy)
    getCategories()
  }, [])

  useEffect(() => {
    setFilters(prevState => {
      return { ...prevState, category, sortBy }
    })
    localStorage.setItem(`topic-sortBy`, sortBy)
  }, [category, sortBy])

  return showFilters === true || showSortBy === true ? (
    <Container>
      {showFilters === true && (
        <OptionSet>
          <Letter font="Titillium Bold" size={16} color="black">
            Filter By Category
          </Letter>
          <DesktopContain>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categoryData.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                )
              })}
            </select>
          </DesktopContain>
          <MobileContain>
            <OptionList>
              {categoryData.map(item => (
                <ListContainer
                  key={item.id}
                  background={category === item.id ? '#F57B00' : 'transparent'}
                  onClick={() => setCategory(item.id)}
                >
                  <Letter
                    font="Titillium Web"
                    size={12}
                    color={category === item.id ? 'white' : '#7D7F81'}
                  >
                    {item.title}
                  </Letter>
                </ListContainer>
              ))}
            </OptionList>
          </MobileContain>
        </OptionSet>
      )}
      {showSortBy === true && (
        <OptionSet>
          <Letter font="Titillium Bold" size={16} color="black">
            Sort By
          </Letter>
          <DesktopContain>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              {sortOptions.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                )
              })}
            </select>
          </DesktopContain>
          <MobileContain>
            <OptionList>
              {sortOptions.map(item => (
                <ListContainer
                  key={item.id}
                  background={sortBy === item.id ? '#F57B00' : 'transparent'}
                  onClick={() => setSortBy(item.id)}
                >
                  <Letter
                    font="Titillium Web"
                    size={12}
                    color={sortBy === item.id ? 'white' : '#7D7F81'}
                  >
                    {item.title}
                  </Letter>
                </ListContainer>
              ))}
            </OptionList>
          </MobileContain>
        </OptionSet>
      )}
    </Container>
  ) : null
}

const Container = styled.div`
  margin-top: 23px;
  padding-left: 16px;
  padding-top: 16px;
  height: auto;
  min-height: 96px;
  background: #f2f2f7;
  width: 100%;
  @media ${device.laptop} {
    margin-top: 0px;
    display: flex;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 0px;
    & select {
      margin-left: 20px;
      margin-right: 20px;
      max-width: 200px;
      background: #f2f2f7;
      border: none;
      font-size: 20px;
      color: #ff8c00;
      & option {
        font-size: 20px;
        background: #f2f2f7;
        color: black;
      }
    }
  }
`

const OptionSet = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  @media ${device.laptop} {
    flex-direction: unset;
    padding-bottom: unset;
  }
`

const OptionList = styled.div`
  display: flex;
  overflow: auto;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 10px;
`

const ListContainer = styled.div`
  height: 30px;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid black;
  margin-right: 6px;
  background: ${props => props.background};
`

export default FilterBar
