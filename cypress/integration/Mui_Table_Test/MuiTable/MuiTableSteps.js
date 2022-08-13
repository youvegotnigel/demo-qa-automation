import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"
import  Base_Page from '../../../support/page-objects/Base_Page'
import  MUI_Page from '../../../support/page-objects/MUI_Page'
import  MuiTable from '../../../support/keywords/MuiTable'

const basePage = new Base_Page()
const muiPage = new MUI_Page()
const muiTable = new MuiTable()

Given('User is navigated to data grid page',()=>{
    muiPage.navigateToDataGridPage()
});


Then('Table {string} should be displayed as bellow:',(tableName, dataTable)=>{

    const dataArray = dataTable.raw()
    const transposedDataArray = dataArray[0].map((_, colIndex) => dataArray.map(row => row[colIndex]));

    let tableKeys = []
    let tableValues = []

    for(let i = 0; i < transposedDataArray.length; i++) {

        tableKeys.push(transposedDataArray[i][0])
        tableValues.push(transposedDataArray[i][1])
    }

    console.log('Tabl Keys   :: ' + tableKeys)
    console.log('Tabl values :: ' + tableValues)

    muiPage.verifyDataGridValues(tableName, 1, tableKeys)
    muiPage.verifyDataGridValues(tableName, 1, tableValues)
});


When('User set checkbox for {string} in table {string}',(question, tableName)=>{
    let tableValues = []
    tableValues.push(question)
    muiPage.setTableCheckBox(tableName, 1, tableValues)
});

When('User uncheck checkbox for {string} in table {string}',(question, tableName)=>{
    let tableValues = []
    tableValues.push(question)
    muiPage.unsetTableCheckBox(tableName, 1, tableValues)
});

Then('System should display {string}',(answer)=>{
    basePage.isDivTextDisplayed(answer)
});

And('User navigates to previous page in table',()=>{
    muiTable.clickOnTablePreviousPageButton()
});

And('User navigates to next page in table',()=>{
    muiTable.clickOnTableNextPageButton()
});