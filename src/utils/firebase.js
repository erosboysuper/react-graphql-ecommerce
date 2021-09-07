import { getBrowserDetail } from './functions'

const config = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
}

let firebaseInstance
let firebaseMessaging

export const initFirebase = async () => {
  if (firebaseInstance) {
    return firebaseInstance
  }
  const lazyApp = import('firebase/app')
  const lazyMessaging = import('firebase/messaging')
  return Promise.all([lazyApp, lazyMessaging]).then(([firebase]) => {
    firebaseInstance = firebase.default
    firebaseInstance.initializeApp(config)
    firebaseMessaging = firebaseInstance.messaging()

    return firebaseInstance
  })
}

export const getToken = () => {
  if (!firebaseMessaging) return

  return firebaseMessaging
    .requestPermission()
    .then(() =>
      firebaseMessaging.getToken({
        vapidKey: `${process.env.REACT_APP_CERTIFICATE_ID}`,
      })
    )
    .then(currentToken => {
      if (currentToken) {
        const env =
          window.location.hostname === 'tbo.clothing' ? 'prod' : 'stag'
        const browserDetai = getBrowserDetail()
        window['currentToken'] = currentToken
        let userInfo = localStorage.getItem(`userInfo`)
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
        }
        fetch(`${process.env.API_BASE}/subscribeFCM`, {
          method: 'POST',
          async: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...browserDetai,
            env,
            currentToken,
            user_token: userInfo ? userInfo.jwt : null,
          }),
        })
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        )
      }
    })
    .catch(err => console.log('BLOCKED --- ', err))
}

export const onMessageListener = () => {
  return new Promise(resolve => {
    if (!firebaseMessaging) resolve(null)

    firebaseMessaging.onMessage(payload => {
      resolve(payload)
    })
  })
}
