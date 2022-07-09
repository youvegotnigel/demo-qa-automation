import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"
import  MUI_Page from '../../../support/page-objects/MUI_Page'

const muiPage = new MUI_Page()

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