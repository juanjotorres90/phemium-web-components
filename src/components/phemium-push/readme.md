# phemium-push

## Usage

In your HTML files:

```html
 <phemium-push phemium-config="phemiumConfig" firebase-config="firebaseConfig" app-id="com.phemium.enduser.testapp">
 </phemium-push>
```

This is how your phemium configuration object should look. Change values to whatever you need.

```javascript
  phemiumConfig = {
    customer: 'Phemium Demos Testing',
    token: '3af3e8c801a7fdb20ffba393139e3df5d94722ed',
    enduser_id: 1,
    portal: 'Standard'
  };
```

This is how your firebase configuration object should look. Change values to whatever you need.

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

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type      | Default     |
| ---------------- | ----------------- | ----------- | --------- | ----------- |
| `active`         | `active`          |             | `boolean` | `false`     |
| `appId`          | `app-id`          |             | `string`  | `undefined` |
| `firebaseConfig` | `firebase-config` |             | `any`     | `undefined` |
| `phemiumConfig`  | `phemium-config`  |             | `any`     | `undefined` |
| `token`          | `token`           |             | `string`  | `undefined` |


## Methods

### `initialize() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `showPushInstances() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
