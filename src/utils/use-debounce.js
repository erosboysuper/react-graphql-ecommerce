import React, { useState, useEffect } from 'react'

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export function throttle(fn, delay) {
  let _this, args
  let scheduled = false
  let call = function () {
    scheduled = false
    fn.apply(_this, args)
  }
  return function () {
    _this = this
    args = arguments
    if (scheduled) {
      return
    }
    scheduled = true
    setTimeout(call, delay)
  }
}
