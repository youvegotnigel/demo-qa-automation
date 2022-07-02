import { Given, And } from "cypress-cucumber-preprocessor/steps"
import  loginPage from '../../../support/page-objects/Login_Page'


Given('User is logged into TS Admin',()=>{
    loginPage.logInSucessfully();
});

Given('User is navigated to login page',()=>{
    loginPage.navigateToLoginPage();
});

And('User click on login button',()=>{
    loginPage.clickLogin();
});

And('User enter details as below:',(dataTable)=>{
    dataTable.hashes().forEach(element => {
        loginPage.typeUsername(element.username);
        loginPage.typePassword(element.password);
    });
});

And('User should be logged in as {string}',(user)=>{
    loginPage.isLoggedIn(user);
});

And('Error message should be displayed as below:',(dataTable)=>{
    dataTable.hashes().forEach(element => {
        loginPage.getErrorMessage(element.error_message);
    });
});