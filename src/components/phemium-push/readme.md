# phemium-push

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

Once your component has been rendered your may initialize it:

### AngularJS (1.x)

First of all you need to copy all content from node_modules/@phemium-costaisa/phemium-web-components/dist into to somewhere else inside your project (e.g. your-app/phemium-web-components).

Once you have all the compiled files inside your project you will need to add the following line inside HEAD tag of your index.html:

In your HTML file:

```
 <phemium-push id="phemiumPush"></phemium-push>
```

In your component file:
(_firebaseConfig and appID are only needed on Android and iOS applications_)

```
  const phemiumPush = document.querySelector('#phemiumPush');

  await phemiumPush.initialize(this.phemiumConfig, this.firebaseConfig, this.appID);
```

### Angular 2-7

In your HTML file:

```
  <phemium-push #phemiumPush></phemium-push>
```

In your component file:
(_firebaseConfig and appID are only needed on Android and iOS applications_)

```
   @ViewChild('phemiumPush') phemiumPush: any;

    async ngAfterViewInit() {
      await this.phemiumPush.nativeElement.initialize(this.phemiumConfig, this.firebaseConfig, this.appID);
    }
```

### Angular 8

In your HTML file:

```
 <phemium-push #phemiumPush></phemium-push>
```

In your component file:
(_firebaseConfig and appID are only needed on Android and iOS applications_)

```
   @ViewChild('phemiumPush', {static: false}) phemiumPush: any;
    async ngAfterViewInit() {
      await this.phemiumPush.nativeElement.initialize(this.phemiumConfig, this.firebaseConfig, this.appID);
    }
```

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `active` | `active`  |             | `boolean` | `false` |

## Methods

### `initialize(phemiumConfig: any, firebaseConfig: any, appID?: string) => Promise<void>`

#### Returns

Type: `Promise<void>`

### `showPushInstances() => Promise<void>`

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
