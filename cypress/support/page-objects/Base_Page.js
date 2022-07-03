class BasePage{
    
    static elements = {
        a_normalize_link : (text) => cy.xpath('//a[normalize-space()=\'' + text + '\']'),
    }

    static clickOnNormalizeLink(text){
        this.elements.a_normalize_link(text).click();
    }
    
}
export default BasePage;