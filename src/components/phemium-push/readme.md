# phemium-push

## Before using phemium-push web component Firebase must be configurated

<!-- Link to firebase configuration document -->

## Usage

In your HTML files:

```
 <phemium-push></phemium-push>
```

This is how your phemium configuration object should look. Change values to whatever you need.
(_customer only needed on web applications_)

```javascript
phemiumConfig = {
  customer: 'Phemium Demos Testing',
  token: '3af3e8c801a7fdb20ffba393139e3df5d94722ed',
  enduser_id: 1,
  portal: 'Standard'
};
```

This is how your firebase configuration object should look. Change values to whatever you need.
(_firebaseConfig only needed on web applications_)

```javascript
firebaseConfig = {
  apiKey: 'AIzaSyAVCs15Up66CZCqyOG9XcWf0albXleFFgU',
  authDomain: 'phemium-enduser-mobile.firebaseapp.com',
  databaseURL: 'https://phemium-enduser-mobile.firebaseio.com',
  projectId: 'phemium-enduser-mobile',
  storageBucket: 'phemium-enduser-mobile.appspot.com',
  messagingSenderId: '949680591977',
  appId: '1:949680591977:web:83d05094f2cf1cec'
};
```

This is how your app id should look. Change values to whatever you need.
(_app id only needed on Android and iOS applications_)

```javascript
appID = 'com.phemium.enduser.testapp';
```

### AngularJS (1.x)

First of all you need to copy all content from node_modules/@phemium-costaisa/phemium-web-components/dist into to somewhere else inside your project (e.g. your-app/phemium-web-components).

Once you have all the compiled files inside your project you will need to add the following line inside HEAD tag of your index.html:

In your HTML file:

```
 <phemium-push id="phemiumPush"></phemium-push>
```

Once your component has been rendered your may initialize it in your component file:
(_firebaseConfig only needed in web and appID only needed on Android and iOS applications, NULL otherwise_)

```
  const phemiumPush = document.querySelector('#phemiumPush');
```

Whenever you have all data needed:

```
  await phemiumPush.initialize(this.phemiumConfig, this.firebaseConfig, this.appID);
```

### Angular 2-7

In your HTML file:

```
  <phemium-push #phemiumPush></phemium-push>
```

Once your component has been rendered your may initialize it in your component file:
(_firebaseConfig only needed in web and appID only needed on Android and iOS applications, NULL otherwise_)

```
   @ViewChild('phemiumPush') phemiumPush: any;

```

Whenever you have all data needed:

```
      await this.phemiumPush.nativeElement.initialize(this.phemiumConfig, this.firebaseConfig, this.appID);
```

### Angular 8

In your HTML file:

```
 <phemium-push #phemiumPush></phemium-push>
```

Once your component has been rendered your may initialize it in your component file:
(_firebaseConfig only needed in web and appID only needed on Android and iOS applications, NULL otherwise_)

```
   @ViewChild('phemiumPush', {static: false}) phemiumPush: any;
```

Whenever you have all data needed:

```
      await this.phemiumPush.nativeElement.initialize(this.phemiumConfig, this.firebaseConfig, this.appID);
```

## Notification callback

By default phemium-push will use a callback on each phemium notification received. This callback will display a toast. Whenever this toast is clicked it will open the corresponding consultation if its not opened yet.

Instead of this default beheviour you can emmit an event from phemium-push component to handle push notifications callback on your application. This event will emmit all data received from Phemium API. To use your own custom handler and emmit the data you must set property "customHandler" to true and listen to notificationHandler event:

### ANGULAR

HTML file:

```
<phemium-push #phemiumPush custom-handler=true (onNotification)="notificationHandler($event)"></phemium-push>
```

TS file:

```
notificationHandler(event){
  console.log(event);
}
```

### Other

HTML file:

```
<phemium-push id='phemiumPush' custom-handler=true></phemium-push>
```

Vanilla JS:

```
document.querySelector('#phemium-push').addEventListener(onNotification, (event)=>{console.log(event)})
```

<!--FIREBASE SERVICE WORKER EXAMPLE  -->

```
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: 'YOUR-SENDER-ID'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    data: payload.data
  };

  // Condition to send all consultations from Phemium received in background to phemium-push web component
  if (payload.data.params && payload.data.params.includes('consultation_id')) {
    const promiseChain = clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          payload.fromBackground = true;
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return self.registration.showNotification(notificationTitle, notificationOptions);
      });
    return promiseChain;
  } else {
    return self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type      | Default |
| ------------------ | ------------------- | ----------- | --------- | ------- |
| `active`           | `active`            |             | `boolean` | `false` |
| `customHandler`    | `custom-handler`    |             | `boolean` | `false` |
| `showNotification` | `show-notification` |             | `boolean` | `false` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `onNotification` |             | `CustomEvent<any>` |


## Methods

### `initialize(phemiumConfig: any, firebaseConfig: any, appID: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
