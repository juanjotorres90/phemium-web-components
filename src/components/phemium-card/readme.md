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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
