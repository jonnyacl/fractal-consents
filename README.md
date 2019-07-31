# Consents App

Little test-harness react app for consuming Fractal banking connection API

## Requirements

- npm https://www.npmjs.com/get-npm
- yarn https://yarnpkg.com/lang/en/

Ensure you are using at least version 8.10.0 of node (use nvm to install different versions https://github.com/nvm-sh/nvm/blob/master/README.md)

## Local config

In order to run the app, you will need to create a `config.js` file in the `src` directory, with the following params:

```
const key = <key_from_dev_portal>
const partner = <any_number_for_sandbox>
const companyId = <company_id_created>
const api = "https://sandbox.askfractal.com"

export default {
    key,
    partner,
    companyId,
    api
}
```

## Available Scripts

In the project directory, you can run:


### `yarn install`
### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


