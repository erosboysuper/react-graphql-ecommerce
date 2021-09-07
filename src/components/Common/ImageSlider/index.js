import React, { useRef } from 'react'
import Swiper from 'react-id-swiper'

const Carousel = props => {
  const swiperRef = useRef(null)
  const params = {
    initialSlide: 0,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    spaceBetween: 0,
    loop: true,
    autoplay: false,
  }

  return (
    <Swiper {...params} ref={swiperRef}>
      {props.children}
    </Swiper>
  )
}

export default Carousel
