# phemium-card

## Usage

In your HTML files:

```
 <phemium-card card="cardObject" config="configObject"></phemium-card>
```

This is how your configuration object should look. Change values to whatever you need.

```
     this.configObject = {
      apiEndpoint: 'API_ENDPOINT',
      token: 'xxxxxxxx',
      userId: 12,
      hideSubmitButton: true,
      selectionStyle: 'checkbox',
      showStaticText: false,
      soloText: false,
      submitButtonText: 'Siguiente',
      maxFileSize: 120000,
      formStyle: 'single-column',
      inputChecked: true
    };
```

## Methods

|     Property     |                         Description                          |
| :--------------: | :----------------------------------------------------------: |
| `handleSubmit()` | `Component will emit formCompleted event with field values.` |

## Properties

|  Property  | Default |                                  Description                                   |
| :--------: | :-----: | :----------------------------------------------------------------------------: |
|   `card`   |         |                             `Phemium card object.`                             |
|  `config`  | `false` | `Configuration object to initialize the component. Details on the next table.` |
| `language` |  `es`   |                      `Language to display texts on card.`                      |

## config property

|      Property      |   Type    |         Possible values         |     Default     |                 Description                 |
| :----------------: | :-------: | :-----------------------------: | :-------------: | :-----------------------------------------: |
|   `apiEndpoint`    | `string`  |                                 |                 | `API Endpoint to handle phemium petitions.` |
|      `token`       | `string`  |                                 |                 |      `Token needed for api requests.`       |
|      `userId`      | `number`  |                                 |                 |     `User id needed for api requests.`      |
| `hideSubmitButton` | `boolean` |         `true | false`          |     `false`     |            `Hide submit button.`            |
|  `selectionStyle`  | `string`  |       `checkbox | toggle`       |   `checkbox`    |    `Style to display selection inputs.`     |
|  `showStaticText`  | `boolean` |         `true | false`          |     `true`      |   `Show static text associated to field.`   |
|     `soloText`     | `boolean` |         `true | false`          |     `false`     |    `Show only the static text on field.`    |
| `submitButtonText` | `boolean` |         `true | false`          |   `Continuar`   |        `Text for the submit button.`        |
|   `maxFileSize`    | `number`  |                                 |      null       |        `Maximum file size allowed.`         |
|    `formStyle`     | `string`  | `single-column | double-column` | `single-column` |            `Style of the form.`             |
|   `inputChecked`   | `boolean` |         `true | false`          |     `false`     |       `Initial input checkbox value.`       |

## Customize CSS

|                Property                |             Default              |
| :------------------------------------: | :------------------------------: |
|           `--color-primary`            |            `#86bd17`             |
|          `--color-secondary`           |            `#cccccc;`            |
|          `--max-field-width`           |              `45%`               |
|      `--field-file-button-color`       |             `black`              |
|     `--field-file-button-padding`      |            `0.35rem`             |
|            `--field-height`            |              `2rem`              |
|          `--field-border-top`          |              `none`              |
|         `--field-border-right`         |              `none`              |
|        `--field-border-bottom`         | `1px solid var(--color-primary)` |
|         `--field-border-left`          |              `none`              |
|            `--field-margin`            |           `0 0 1rem 0`           |
|       `--field-background-color`       |             `white`              |
|        `--submit-button-width`         |             `15rem`              |
|        `--submit-button-height`        |              `2rem`              |
|       `--submit-button-padding`        |               `0`                |
|      `--submit-button-background`      |      `var(--color-primary)`      |
|      `--submit-button-text-color`      |             `white`              |
|        `--submit-button-radius`        |              `7px`               |
|       `--submit-button-position`       |             `fixed`              |
|         `--submit-button-top`          |             `unset`              |
|        `--submit-button-right`         |             `unset`              |
|        `--submit-button-bottom`        |              `2rem`              |
|         `--submit-button-left`         |             `unset`              |
|      `--refuse-button-background`      |     `var(--color-secondary)`     |
|      `--refuse-button-text-color`      |             `black`              |
|      `--accept-button-background`      |     `var(--color-secondary)`     |
|      `--accept-button-text-color`      |             `white`              |
|    `--field-text-placeholder-color`    |             `black`              |
| `--field-text-placeholder-font-weight` |              `400`               |

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
