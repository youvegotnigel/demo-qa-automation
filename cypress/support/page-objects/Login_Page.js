class LoginPage{

    static elements = {
        usernameInput: () => cy.xpath('//input[@placeholder=\'Email\']'),
        passwordInput: () => cy.xpath('//input[@placeholder=\'Password\']'),
        loginBtn: () => cy.get('#kt_login_signin_submit'),
        errorMessage: () => cy.get('.alert-text'),
        loggedUser: () => cy.get('.text-dark-50')
    }

    static navigateToLoginPage() {
        cy.visit('/');
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
        //cy.url().should('contain', 'global-admin/contracts')
        //cy.url().should('include', 'global-admin/contracts')
    }

    static logInSucessfully(){
        this.navigateToLoginPage();
        this.typeUsername(Cypress.env('email'));
        this.typePassword(Cypress.env('password'));
        this.clickLogin();
        this.isLoggedIn(Cypress.env('username'));
    }
}

export default LoginPage;