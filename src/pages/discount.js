import { useEffect } from 'react'
import { navigate } from 'gatsby'

const DiscountPage = ({ coupon, pageContext: { locale, localeFolder } }) => {
  useEffect(() => {
    if (coupon) {
      localStorage.setItem(`${locale}-discoupon`, coupon)
    }
    navigate(`/${localeFolder}/`)
  }, [coupon])

  return null
}

export default DiscountPage
