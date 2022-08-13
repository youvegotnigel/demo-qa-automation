import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"
import  MUI_Page from '../../../support/page-objects/MUI_Page'

const muiPage = new MUI_Page()

Given('User is navigated to calendar page',()=>{
    muiPage.navigateToDatePickerPage()

});

When('User set date {string} for {string}',(answer, question)=>{
    
    muiPage.openCalendar(question)
    muiPage.setDate(answer)

});


Then('System should display date {string} for {string}',(answer, question)=>{
    muiPage.verifySelectedDate(question, answer)
});