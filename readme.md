# Phemium Card Web Component

<!-- TOC depthFrom: 2 -->

- [Installation](#installation)
  - [AngularJS (1.x)](#angularjs-1x)
  - [Angular 2+](#angular-2)
  - [React](#react)
  - [Vue](#vue)
- [Contribute](#contribute)

<!-- /TOC -->

## Installation

```bash
 npm i @phemium-costaisa/phemium-web-components
```

### AngularJS (1.x)

First of all you need to copy all the content from node_modules/@phemium-costaisa/phemium-web-components/dist into to somewhere else inside your project (e.g. your-app/phemium-web-components).

Once you have all the compiled files inside your project you will need to add the following line inside index.html:

```
<script src='phemium-web-components/pdf-web-components.js'></script>
```

### Angular 2+

Somewhere in your project (e.g. `main.ts`):

```
import { defineCustomElements as phemiumLoader } from '@phemium-costaisa/phemium-web-components/loader';
phemiumLoader(window);

```

### React

On your index.js:

```
import { defineCustomElements as phemiumLoader } from '@phemium-costaisa/phemium-web-components/loader';
phemiumLoader(window);
```

### Vue

```
import { defineCustomElements as phemiumLoader } from '@phemium-costaisa/phemium-web-components/loader';
Vue.config.ignoredElements = [/test-\w*/];
phemiumLoader(window);
```

## Contribute

```bash
git clone https://gitlab.phemium.com/phemium/phemium-web-components
cd phemium-web-components
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```
