# ContextDropdown

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

Allows a user to select a context value via a dropdown to pass to Coveo for relevance tuning.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/context-dropdown
```

2. Use the Component or extend it

Typescript:

```javascript
import { ContextDropdown, IContextDropdownOptions } from '@coveops/context-dropdown';
```

Javascript

```javascript
const ContextDropdown = require('@coveops/context-dropdown').ContextDropdown;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/context-dropdown'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/context-dropdown@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component in your markup:

```html
<div class="CoveoContextDropdown"></div>
```

## Options

The following options can be configured:

| Option | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `contextKey` | Yes | string | | The name of the context field to pass the value to. |
| `values` | Yes | IOption[] or IGroupedOption[] |  | An array of objects formatted to be an option or group depending on the `isGrouped` value |
| `isGrouped` | No | boolean | false | Whether the values passed represent options divided into groups |
| `initialChoice` | No | string |  | An initial option to be automatically selected by the dropdown |
| `triggerSearch` | No | boolean | false | Whether to trigger a search query when the value is changed. Note: Setting this to true will incur a query every time a user changes the value of this component and will impact your QPM. Please ensure there is no impact on your QPM or make necessary adjustments before setting this value to true. |

Examples found in `/pages/index.html`

## Extending

Extending the component can be done as follows:

```javascript
import { ContextDropdown, IContextDropdownOptions } from "@coveops/context-dropdown";

export interface IExtendedContextDropdownOptions extends IContextDropdownOptions {}

export class ExtendedContextDropdown extends ContextDropdown {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`