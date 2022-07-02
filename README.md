# Cypress-Cucumber-POC
This project is created to show how we can leverage Cucumber BDD framework in Cypress. Steps involved in configuring your project are following:

## Pre-Requisites
* Node JS and NPM - [Node](https://nodejs.org/en/download/) 
* IDE - [VS Code](https://code.visualstudio.com/download) 


## Set Up
```
npm init -y
npm install cypress@9.7.0
npm install cypress-xpath
npm install cypress-cucumber-preprocessor 
npm install multiple-cucumber-html-reporter 
npm install --save-dev cypress-cucumber-attach-screenshots-to-failed-steps 
npm i @shelex/cypress-allure-plugin
npm install --save-dev @percy/cli @percy/cypress
```  

## Cypress Help
```
npx cypress run --help
```  

## Dependencies
* cypress - v9.7.0
* cypress-cucumber-preprocessor - v4.3.1
* multiple-cucumber-html-reporter - v1.21.2

## Configuration

### 1. Add cypress-cucumber-preprocessor by add the following in `cypress/plugins/index.js`:

```
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```
### 2. Add support for feature files to your Cypress configuration by add the following in `cypress.json`

```
"testFiles": "**/*.{feature,features}"
```

### 3. Configure the plugin to use the Cypress Cucumber Preprocessor Style pattern for placing step definitions files by adding the following in `package.json`

```
  "cypress-cucumber-preprocessor": {
    "nonGlobalStepDefinitions": true
  }
```
### 4. Generate Cucumber HTML report and attach screenshot of failed steps by modyfing the following in `package.json`

```
  "cypress-cucumber-preprocessor": {
    "cucumberJson": {
      "generate": true,
      "outputFolder": "cypress/reports/cucumber-json",
      "filePrefix": "",
      "fileSuffix": ".cucumber"
    },
    "nonGlobalStepDefinitions": true
  }
```
### 5. Add cucumber-html-reporter Plugin for converting the JSON output to HTML report by creating the following in `report.js` file in the `cypress` folder

```
const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "cypress/reports/cucumber-json",  // ** Path of .json file **//
    reportPath: "cypress/reports", // ** Path of .html file **//
    metadata: {
        browser: {
            name: "chrome",
            version: "102",
        },
        device: "Local test machine",
        platform: {
            name: "windows",
            version: "10",
        },
    },
});
```
### 6. Add the following code into `cypress/support/index.js` to attach screenshot of failed steps:
```
afterEach(() => {
    const screenshotsFolder = Cypress.config("screenshotsFolder");
    if (window.cucumberJson?.generate) {
      const testState = window.testState;
      const stepResult =
        testState.runTests[testState.currentScenario.name][testState.currentStep];
      if (stepResult?.status === "failed") {
        const screenshotFileName = `${testState.feature.name} -- ${testState.currentScenario.name} (failed).png`;
        cy.readFile(
          `${screenshotsFolder}/${Cypress.spec.name}/${screenshotFileName}`,
          "base64"
        ).then((imgData) => {
          stepResult.attachment = {
            data: imgData,
            media: { type: "image/png" },
            index: testState.currentStep,
            testCase: testState.formatTestCase(testState.currentScenario),
          };
        });
      }
    }
  });
```

### 7. Configure VS Code. Use `ctrl + shift + p` and search for  `Preferences: Open Settings (JSON)` and open VS Codes settings. Add the following in `settings.json`

```
 "[feature]":{
        "editor.formatOnSave": true,
    },
    "cucumberautocomplete.strictGherkinCompletion": true,
    "cucumberautocomplete.steps": [
        "cypress/integration/**/*.js",
        "cypress/e2e/**/*.js",
    ]
```

### 8. Add the following code into `cypress/support/index.js` to use `cy.xpath()` function:

```
require('cypress-xpath')
```

## Features
- BDD Framework
- Page Object Model
- Cucumber HTML Report

## Documentation
- https://github.com/badeball/cypress-cucumber-preprocessor
- https://github.com/wswebcreation/multiple-cucumber-html-reporter
- https://github.com/dane-harnett/cypress-cucumber-attach-screenshots-to-failed-steps
- https://docs.cypress.io/guides/overview/why-cypress
- https://cucumber.io/docs/gherkin/reference/


## How to Run and Generate Report

### GUI Mode
```
npx cypress open
npm run cy:report
```  

### CLI Mode

#### Run All Features
```
npm run cy:run
npm run allure:clear
npm run cy:report
npm run allure:report
```

#### Run All Features and Generate Allure Report
```
npm run cy:run
npm run cy:report
```
#### Run Specific Feature
```
npx cypress run --browser "chrome" --spec "cypress/integration/LoginTest/Login.feature"
or
npx cypress-tags run -g 'cypress/integration/LoginTest/Login.feature' --browser "chrome"
or
npx cypress-tags run --browser "chrome" -e tags=@stage --spec "cypress/integration/LoginTest/Login.feature" --env configFile=qa
npm run cy:report
npm run allure:report
```  

#### Run Specific Feature with Percy Vishual Testing
```
npm run allure:clear
$env:PERCY_TOKEN = "<token>"
npx cypress-tags run --browser "chrome" -e tags=@stage --spec "cypress/integration/LoginTest/Login.feature" --env configFile=qa
npm run cy:report
npm run allure:report
``` 

## Cucumber Report


## Tags usage

### Tagging tests

###### usage of `not`

###### usage of `and` 


## Author
* **Nigel Mulholland** - [Linkedin](https://www.linkedin.com/in/nigel-mulholland/) 
