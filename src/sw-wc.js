// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
const firebaseConfig = {
  apiKey: 'AIzaSyAVCs15Up66CZCqyOG9XcWf0albXleFFgU',
  authDomain: 'phemium-enduser-mobile.firebaseapp.com',
  databaseURL: 'https://phemium-enduser-mobile.firebaseio.com',
  projectId: 'phemium-enduser-mobile',
  storageBucket: 'phemium-enduser-mobile.appspot.com',
  messagingSenderId: '949680591977',
  appId: '1:949680591977:web:1346fe7f29a59546'
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  console.log('Service worker from web component notification', payload);
});
