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

And('User enter details as below:',(dataTable)=>{
    dataTable.hashes().forEach(element => {
        
    });
});
