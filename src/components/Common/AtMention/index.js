import React, { useRef, useEffect, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import defaultStyle from './defaultStyle'

const AtMention = ({
  roomMembers = [],
  roomList = [],
  value,
  placeholder,
  onChange,
  additionStyle = {},
}) => {
  const inputRef = useRef(null)
  const [cssStyle, setCssStyle] = useState(defaultStyle)

  useEffect(() => {
    if (inputRef) {
      inputRef.current.parentElement.style.height = `${inputRef.current.previousElementSibling.offsetHeight}px`
    }
  }, [value])

  useEffect(() => {
    const additionCssKeys = Object.keys(additionStyle)
    if (additionCssKeys.length > 0) {
      let _cssStyle = { ...defaultStyle }
      additionCssKeys.forEach(keyL1 => {
        const objL1 = additionStyle[keyL1]
        const objL2Keys = Object.keys(objL1)
        objL2Keys.forEach(keyL2 => {
          if (typeof objL1[keyL2] === 'object') {
            const objL2 = objL1[keyL2]
            const objL3Keys = Object.keys(objL2)
            objL3Keys.forEach(keyL3 => {
              _cssStyle = {
                ..._cssStyle,
                [keyL1]: {
                  ..._cssStyle[keyL1],
                  [keyL2]: {
                    ..._cssStyle[keyL1][keyL2],
                    [keyL3]: objL2[keyL3],
                  },
                },
              }
            })
          } else {
            _cssStyle = {
              ..._cssStyle,
              [keyL1]: {
                ..._cssStyle[keyL1],
                [keyL2]: objL1[keyL2],
              },
            }
          }
        })
      })
      setCssStyle(_cssStyle)
    } else {
      setCssStyle(defaultStyle)
    }
  }, [additionStyle])

  return (
    <MentionsInput
      inputRef={inputRef}
      value={value}
      onChange={onChange}
      style={cssStyle}
      placeholder={placeholder || "Mention people using '@'"}
    >
      <Mention
        trigger="@"
        data={roomMembers}
        appendSpaceOnAdd={true}
        style={{
          backgroundColor: '#f6d3ac',
        }}
        renderSuggestion={(
          suggestion,
          search,
          highlightedDisplay,
          index,
          focused
        ) => (
          <div className={`user ${focused ? 'focused' : ''}`}>
            {highlightedDisplay}
          </div>
        )}
      />
      <Mention
        trigger="/"
        markup="/[__display__](room:__id__)"
        data={roomList}
        appendSpaceOnAdd={true}
        style={{
          backgroundColor: '#d0d0d0',
        }}
        renderSuggestion={(
          suggestion,
          search,
          highlightedDisplay,
          index,
          focused
        ) => (
          <div className={`user ${focused ? 'focused' : ''}`}>
            {highlightedDisplay}
          </div>
        )}
      />
    </MentionsInput>
  )
}

export default AtMention
