# phemium-card



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                                                                                                                                                                                                                                           | Default                                                                                                                                                                                                                                                                                  |
| ---------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `card`     | `card`     |             | `any`                                                                                                                                                                                                                                          | `undefined`                                                                                                                                                                                                                                                                              |
| `config`   | --         |             | `{ apiEndpoint: string; token: string; userId: number; hideSubmitButton: boolean; selectionStyle: string; showStaticText: boolean; soloText: boolean; submitButtonText: string; maxFileSize: any; formStyle: string; inputChecked: boolean; }` | `{     apiEndpoint: '',     token: '',     userId: 0,     hideSubmitButton: false,     selectionStyle: 'checkbox',     showStaticText: true,     soloText: false,     submitButtonText: 'Continuar',     maxFileSize: null,     formStyle: 'single-column',     inputChecked: false   }` |
| `language` | `language` |             | `string`                                                                                                                                                                                                                                       | `'es'`                                                                                                                                                                                                                                                                                   |


## Events

| Event             | Description | Type               |
| ----------------- | ----------- | ------------------ |
| `changedCheckbox` |             | `CustomEvent<any>` |
| `exceedFileSize`  |             | `CustomEvent<any>` |
| `filesUploaded`   |             | `CustomEvent<any>` |
| `formCompleted`   |             | `CustomEvent<any>` |
| `showInformation` |             | `CustomEvent<any>` |
| `uploadingFiles`  |             | `CustomEvent<any>` |


## Methods

### `handleSubmit() => Promise<void>`

Function to handle submit event when user finishes inserting values. It uploads resources if needed and emits an event with
  an array containing all form values on it, prepared to send to phemium.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
