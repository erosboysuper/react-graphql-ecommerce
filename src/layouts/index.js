import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { Helmet } from 'react-helmet'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from 'react-cookie-consent'
import { ToastProvider } from 'react-toast-notifications'

import StoreContextProvider from '~/provider/StoreContextProvider'
import SearchContextProvider from '~/provider/SearchContextProvider'
import ProductContextProvider from '~/provider/ProductContextProvider'
import CommunityContextProvider from '~/provider/CommunityContextProvider'
import RoomContextProvider from '~/provider/RoomContextProvider'
import ProductBuilderContextProvider from '~/provider/ProductBuilderContextProvider'
import CheckoutContextProvider from '~/provider/CheckoutContextProvider'

import Notification from '~/components/Common/Notification'

import { btn_color } from '~/utils/colors'
import { GlobalStyle } from '~/utils/styles'
import { gtagLibrary } from '~/utils/functions'
import { initFirebase, getToken, onMessageListener } from '~/utils/firebase'
import './bootstrap.css'
import '../../static/fonts/fonts.css'

const client = new ApolloClient({
  uri: `${process.env.DATO_GRAPHQL_URL}`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `${process.env.DATO_API_TOKEN}`,
  },
})

const Wrapper = styled.div`
  margin: 0 auto;
`

const Layout = ({ children }) => {
  const [isGdpr, setIsGdpr] = useState(false)
  const [notification, setNotification] = useState(null)
  const [enabledCookies, setEnabledCookies] = useState(
    getCookieConsentValue('tbo-enable-cookies') || false
  )

  const siteLocation = () => {
    fetch(`https://ipapi.co/json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.country_code) {
          const country_code = data.country_code.toLowerCase()
          if (country_code === 'de') {
            setIsGdpr(true)
          } else {
            Cookies.set('tbo-enable-cookies', true)
            setEnabledCookies(true)
            setIsGdpr(false)
          }
        } else {
          setIsGdpr(true)
        }
      })
      .catch(() => {
        setIsGdpr(true)
      })
  }

  const setupFirebase = () => {
    const firebase = initFirebase()
    firebase.then(() => {
      getToken()

      onMessageListener()
        .then(payload => setNotification(payload))
        .catch(err => console.log('notification err --- ', err))
    })
  }

  useEffect(() => {
    if (!enabledCookies) {
      siteLocation()
    }
    setupFirebase()
  }, [])

  useEffect(() => {
    if (enabledCookies) {
      setTimeout(() => {
        gtagLibrary()
      }, 1000 * 10)
    }
  }, [enabledCookies])

  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <StoreContextProvider>
          <SearchContextProvider>
            <ProductContextProvider>
              <RoomContextProvider>
                <CommunityContextProvider>
                  <ProductBuilderContextProvider>
                    <CheckoutContextProvider>
                      <GlobalStyle />
                      <React.Fragment>
                        <Wrapper>
                          {/* <Helmet>
                            <script
                              async
                              src="https://www.googleoptimize.com/optimize.js?id=OPT-KTL2ZK2"
                            />
                            <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                            w[l].push({event:'optimize.activate'});window['gtag']=(...args)=>{window['dataLayer'].push(args)};
                            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://metrics.tbo.clothing/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N47D5RJ');`}</script>
                          </Helmet> */}
                          {children}
                          {isGdpr === true && (
                            <CookieConsent
                              // overlay
                              location="bottom"
                              expires={365}
                              cookieName="tbo-enable-cookies"
                              style={{
                                background: '#f3f3f8',
                                color: '#212529',
                              }}
                              buttonText="Accept to continue"
                              buttonStyle={{
                                background: btn_color,
                                color: '#ffffff',
                              }}
                              enableDeclineButton
                              declineButtonText="Decline"
                              onAccept={() => setEnabledCookies(true)}
                              onDecline={() => setEnabledCookies(false)}
                            >
                              For the tastiest onsite experience, say yes to the
                              cookies
                            </CookieConsent>
                          )}
                          {notification && (
                            <Notification
                              notification={notification}
                              onClose={() => setNotification(null)}
                            />
                          )}
                        </Wrapper>
                      </React.Fragment>
                    </CheckoutContextProvider>
                  </ProductBuilderContextProvider>
                </CommunityContextProvider>
              </RoomContextProvider>
            </ProductContextProvider>
          </SearchContextProvider>
        </StoreContextProvider>
      </ToastProvider>
    </ApolloProvider>
  )
}

export default Layout
