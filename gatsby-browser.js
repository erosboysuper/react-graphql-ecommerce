/**
 * Implement Gatsby's Browser APIs in this file.
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
exports.onRouteUpdate = ({ location, prevLocation }) => {
    const CookieConsent = require('react-cookie-consent')
    const enabledCookies = CookieConsent.Cookies.get('tbo-enable-cookies')
    if (enabledCookies) {
        if (window['dataLayer'] && window['dataLayer'].length > 0) {
            window['dataLayer'].push({ event: 'pageview' })
            window['dataLayer'].push({ event: 'optimize.activate' })
        }
    }
}
