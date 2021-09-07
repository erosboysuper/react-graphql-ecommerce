import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { device } from '~/utils/device'
import { Letter, DesktopContain } from '~/utils/styles'

import CheckoutContext from '~/context/CheckoutContext'

import SEO from '~/components/seo'

import CheckoutHeader from '~/components/pages/Checkout/CheckoutHeader'
import CheckoutInformation from '../components/pages/Checkout/CheckoutInformation'
import CheckoutOrderSummary from '../components/pages/Checkout/CheckoutOrderSummary'
import CheckoutShipping from '../components/pages/Checkout/CheckoutShipping'
import CheckoutPaymentMethod from '../components/pages/Checkout/CheckoutPaymentMethod'
import CheckoutTotal from '../components/pages/Checkout/CheckoutTotal'
import CheckoutSpecial from '../components/pages/Checkout/CheckoutSpecial'

const CheckOut = ({
  checkout_slug,
  pageContext: { locale = 'en', localeFolder = 'us' },
}) => {
  const {} = useContext(CheckoutContext)
  const [completeDetails, setCompleteDetails] = useState(false)
  const checkoutData = {
    summary: {
      title: 'Order Summary',
      data: [
        {
          icon: require('~/images/Assets/Boxer-Brief.png'),
          price: 29.98,
          title: 'Boxer Brief Long 3 Pack',
          description: 'Size: Small 28-31” / Color: Black / Quantity: 1',
        },
        {
          icon: require('~/images/Assets/Boxer-Brief-Long.png'),
          price: 14.99,
          title: 'The Ballsy Boxer Briefs Long',
          description:
            'Size: Small 28-31” / Color: Pirate Black Stripes / Quantity: 2',
        },
        {
          icon: require('~/images/Assets/Boxer-Brief-White.png'),
          price: 14.99,
          title: 'The Must-have Boxer Briefs Long',
          description: 'Size: Small 28-31” / Color: White / Quantity: 1',
        },
      ],
    },
    shipping: {
      title: 'Shipping',
      data: [
        {
          title: 'USA standard shipping',
          description: '3-7 days Delivery',
          price: 'FREE',
        },
        {
          title: 'USA express shipping',
          description: '2-3 Days Delivery',
          price: '+ $7.50',
        },
        {
          title: 'Canada standard shipping',
          description: '5-10 Days Delivery',
          price: '+ $7.50',
        },
      ],
    },
    payment: {
      title: 'Payment Method',
      data: [
        {
          title: 'Credit Card',
          icon: [
            {
              url: require('~/images/Assets/DESKTOP-Visa.svg'),
            },
            {
              url: require('~/images/Assets/DESKTOP-MasterCard.svg'),
            },
            {
              url: require('~/images/Assets/Path 234.svg'),
            },
            {
              url: require('~/images/Assets/DESKTOP-Discover.svg'),
            },
          ],
        },
        {
          title: 'Paypal',
          icon: [
            {
              url: require('~/images/Assets/DESKTOP-PayPal.svg'),
            },
          ],
        },
        {
          title: 'Apple Pay',
          icon: [
            {
              url: require('~/images/Assets/DESKTOP-Pay.svg'),
            },
          ],
        },
      ],
    },
  }

  return (
    <React.Fragment>
      <DesktopContainer>
        <TopBar>
          <CheckoutHeader />
          <TopBody>
            <TopBodyLeft>
              <CheckoutOrderSummary data={checkoutData.summary} />
            </TopBodyLeft>
          </TopBody>
        </TopBar>
        <DesktopBody>
          <DesktopBodyLeft>
            <DesktopLeftWrapper>
              <CheckoutInformation />
              <CheckoutShipping data={checkoutData.shipping} />
              <CheckoutPaymentMethod data={checkoutData.payment} />
            </DesktopLeftWrapper>
          </DesktopBodyLeft>
        </DesktopBody>
        <DesktopTotalSection>
          <CheckoutTotal />
          <CheckoutSpecial />
          <CompleteButton
            active={completeDetails}
            onClick={() => setCompleteDetails(!completeDetails)}
          >
            COMPLETE ALL THE DETAILS
          </CompleteButton>
        </DesktopTotalSection>
      </DesktopContainer>

      <MobileContainer>
        <CheckoutHeader />
        <MobileWrapper>
          <CheckoutOrderSummary data={checkoutData.summary} />
          <CheckoutSpecial />
          <CheckoutInformation />
          <CheckoutShipping data={checkoutData.shipping} />
          <CheckoutPaymentMethod data={checkoutData.payment} />
          <CheckoutTotal />
        </MobileWrapper>
        <CompleteButton
          active={completeDetails}
          onClick={() => setCompleteDetails(!completeDetails)}
        >
          {completeDetails ? 'COMPLETE ORDER' : 'COMPLETE ALL THE DETAILS'}
        </CompleteButton>
      </MobileContainer>
    </React.Fragment>
  )
}

const DesktopContainer = styled.div`
  display: none;
  @media ${device.tablet} {
    display: block;
  }
`

const MobileContainer = styled.div`
  display: block;
  @media ${device.tablet} {
    display: none;
  }
`

const MobileWrapper = styled.div`
  padding: 0px 10px;
  @media ${device.mobileL} {
    padding: 0px 15px;
  }
`

const TopBar = styled.div`
  background-color: #f2f2f7;
  @media ${device.laptop} {
  }
`

const TopBody = styled.div`
  display: flex;
  @media ${device.laptop} {
  }
`

const TopBodyLeft = styled.div`
  width: 50%;
  @media ${device.laptop} {
  }
`

const TopBodyRight = styled.div`
  position: relative;
  @media ${device.laptop} {
  }
`

const DesktopBody = styled.div`
  margin-bottom: 70px;
  @media ${device.laptop} {
  }
`

const DesktopBodyLeft = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;

  @media ${device.laptop} {
  }
`

const DesktopLeftWrapper = styled.div`
  @media ${device.tablet} {
    width: 80%;
  }
  @media ${device.laptop} {
    width: 70%;
  }
`

const DesktopTotalSection = styled.div`
  position: fixed;
  top: 130px;

  background-color: white;
  @media ${device.tablet} {
    width: 38%;
    padding: 15px;
    right: 30px;
  }
  @media ${device.laptop} {
    width: 30%;
    padding: 30px;
    right: 60px;
  }
`

const CompleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  margin-top: 30px;
  color: white;
  cursor: pointer;
  background-color: ${props => (props.active ? '#FF8C00' : '#a9acaf')};
  font-family: Titillium Bold;
`

export default CheckOut
