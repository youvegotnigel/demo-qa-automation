import { Given, And } from "cypress-cucumber-preprocessor/steps"
import  loginPage from '../../../support/page-objects/Login_Page'
import  BasePage from '../../../support/page-objects/Base_Page'


And('User click on the {string} link',(text)=>{
    BasePage.clickOnNormalizeLink(text)
});

And('User enter details as below:',(dataTable)=>{
    dataTable.hashes().forEach(element => {
        loginPage.typeUsername(element.username);
        loginPage.typePassword(element.password);
    });
});
