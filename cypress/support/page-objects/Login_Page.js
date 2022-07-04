import  BasePage from '../../support/page-objects/Base_Page'

class LoginPage extends BasePage{

    static elements = {
        usernameInput: () => cy.xpath('//input[@placeholder=\'Email\']'),
        passwordInput: () => cy.xpath('//input[@placeholder=\'Password\']'),
        loginBtn: () => cy.get('#kt_login_signin_submit'),
        errorMessage: () => cy.get('.alert-text'),
        loggedUser: () => cy.get('.text-dark-50')
    }

    static navigateToLoginPage() {
        cy.visit('/');
        cy.percySnapshot('Login Page');
    }
    
    static typeUsername(username){
        this.elements.usernameInput().type(username);
    }

    static typePassword(password){
        this.elements.passwordInput().type(password);
    }

    static clickLogin(){
        this.elements.loginBtn().click();
    }

    static getErrorMessage(text){
        this.elements.errorMessage().should('include.text', text);
    }

    static isLoggedIn(user){
        this.elements.loggedUser().should('include.text', user);
        cy.url().should('contain', Cypress.env('landing_page'));
        cy.url().should('include', Cypress.env('landing_page'));
        cy.wait(2000);
        cy.percySnapshot('Golbal Admin Page');
    }

    static logInSucessfully(){

        this.navigateToLoginPage();

        //TODO: This method needs tobe updated such that:
        //      If user is logged in then return
        //      Else provide login credentials to login sucessfully
                
        /*
        if(this.elements.loggedUser().should('include.text', Cypress.env('username'))){
            return {};
        }

        cy.get('body').then($user => {
            if($user.find(this.elements.loggedUser).length>0){
                return {};
            }
            cy.wrap(this.typeUsername(Cypress.env('email')));
            this.typePassword(Cypress.env('password'));
            this.clickLogin();
            this.isLoggedIn(Cypress.env('username'));
            cy.wait(2000);
            cy.percySnapshot('Landing Page');
        })
        */

        
        this.typeUsername(Cypress.env('email'));
        this.typePassword(Cypress.env('password'));
        this.clickLogin();
        this.isLoggedIn(Cypress.env('username'));
        cy.wait(2000);
        cy.percySnapshot('Landing Page');
 
    }
}

export default LoginPage;