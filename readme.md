# Phemium Card Web Component

<!-- ## Installation

```bash
 npm i phemium-card
``` -->

## Usage

In your HTML files:

```
 <phemium-card config="configObject"></phemium-card>
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

<!-- ### Javascript or AngularJS (1.x)

```
<script src="https://unpkg.com/phemium@latest/dist/phemium-web-components.js"></script>
``` -->

### Angular 2+

Somewhere in your project (e.g. `main.ts`):

```
import { defineCustomElements as phemiumLoader } from 'phemium-web-components/loader';
phemiumLoader(window);

```

### React

On your index.js:

```
import { defineCustomElements as phemiumLoader } from 'phemium-web-components/loader';
phemiumLoader(window);
```

### Vue

```
import { defineCustomElements as phemiumLoader } from 'phemium-web-components/loader';
Vue.config.ignoredElements = [/test-\w*/];
phemiumLoader(window);
```

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
|        `--submit-button-width`         |             `15rem`              |
|        `--submit-button-height`        |              `2rem`              |
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
