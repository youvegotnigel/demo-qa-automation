import { Given, And } from "cypress-cucumber-preprocessor/steps"
import  Login_Page from '../../../support/page-objects/Login_Page'
import  Base_Page from '../../../support/page-objects/Base_Page'

const loginPage = new Login_Page()
const basePage = new Base_Page()

Given('User is logged into TS Admin',()=>{
    loginPage.logInSucessfully();
});

And('User click on the {string} link',(text)=>{
    basePage.clickOnNormalizeLink(text)
});

And('User click on the {string} button',(text)=>{
    basePage.clickOnNormalizeButton(text)
});

And('User enter details as below:',(dataTable)=>{

    const dataArray = dataTable.raw()
    const transposedDataArray = dataArray[0].map((_, colIndex) => dataArray.map(row => row[colIndex]));

    for(let i = 0; i < transposedDataArray.length; i++) {

        let key   = transposedDataArray[i][0]
        let value = transposedDataArray[i][1]

        console.log("Key   ==> " + key)
        console.log("Value ==> " + value) 

        basePage.enter_value(key,value)
    }

});
