export default class BasePage{
    
    elements = {
        a_normalize_link : (text) => cy.xpath('//a[normalize-space()=\'' + text + '\']'),
    }

    clickOnNormalizeLink(text){
        this.elements.a_normalize_link(text).click();
    }
    
}