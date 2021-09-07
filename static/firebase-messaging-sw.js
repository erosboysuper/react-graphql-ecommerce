importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')

const config = {
    apiKey: `AIzaSyBF4JomUTiGJFp6AOPl62F1Qd3ugl2vj78`,
    authDomain: `tbo-clothing.firebaseapp.com`,
    databaseURL: `https://tbo-clothing-default-rtdb.firebaseio.com`,
    projectId: `tbo-clothing`,
    storageBucket: `tbo-clothing.appspot.com`,
    messagingSenderId: `508294473373`,
    appId: `1:508294473373:web:72b4de813053bf65f5d674`,
    measurementId: `G-QS95HPBG38`,
}

const app = firebase.initializeApp(config)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
    console.log("onBackgroundMessage---", payload)
    const image = (payload.notification.image)
        ? payload.notification.image
        : (payload.data && payload.data['gcm.notification.imageUrl'] ? payload.data['gcm.notification.imageUrl'] : null)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: image,
        image: image,
    }
    return self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', event => {
    console.log("notificationclick---", event)
    event.notification.close();
    if (event.notification.click_action) {
        const url = `${event.notification.click_action}`;
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then(windowClients => {
                // Check if there is already a window/tab open with the target URL
                for (let i = 0; i < windowClients.length; i++) {
                    const client = windowClients[i];
                    // If so, just focus it.
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not, then open the target URL in a new window/tab.
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
        );
    }
})