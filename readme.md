## Getting Started

To install and start:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```


## Using this component

### Script tag

- [Publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- Put a script tag similar to this `<script src='https://unpkg.com/my-component@0.0.1/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-component --save`
- Put a script tag similar to this `<script src='node_modules/my-component/dist/mycomponent.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc

### Framework Integrations

https://stenciljs.com/docs/overview

## Phemium-card Usage

The component itsef is inside components/phemium-card. my-component it's just a main component to test phemium-card.

Component properties:

    - phemiumForm: Form from the call to Phemium API.
    - inputFileHidden: Boolean to hide or not <input type="file"> so you can customize it.

Component slots:

These slots are created to customize <input type="file"> instead of the default one.

    - file-start: To inject an element at the start of the <input type="file">
    
        For example: <span slot="file-start">Select a file from your device</span>

    - file-end: To inject an element at the end of the <input type="file">

        For example: <img slot="file-end" src="path/to/icon.png">
