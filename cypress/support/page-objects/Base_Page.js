import  DateTime from '../../support/keywords/DateTime'

const dateTime = new DateTime()
export default class BasePage {

    elements = {
        a_normalize_link: (text) => cy.xpath('(//a[normalize-space()=\'' + text + '\'])[1]'),
        button_normalize_link: (text) => cy.xpath('(//button[normalize-space()=\''+text+'\'])[1]'),

        textarea_field: (text, index) => cy.xpath('(//*[contains(text(),\'' + text + '\')])[' + index + ']/following-sibling::textarea[1]'),
        input_field: (text, index) => cy.xpath('(//*[contains(text(),\'' + text + '\')])[' + index + ']/following-sibling::input[1]'),
        input_suggest_field: (text, index) => cy.xpath('(//*[contains(@formcontrolname,\''+text+'\')])['+index+']/descendant-or-self::input[1]|(//div[@class=\'ng-placeholder\' and contains(text(),\''+text+'\')])['+index+']/following-sibling::div/input[1]'),
        suggest_field: (text) => cy.xpath('(//span[contains(@class,\'ng-star-inserted\') and contains(text(),\''+ text +'\')])[1]|(//div[contains(@class,\'ng-option ng-option-marked ng-star-inserted\')])[1]'), 

        div_calender: (text, index) => cy.xpath('(//label[contains(text(),\''+text+'\')])['+index+']/following-sibling::div/div'),
        select_year: () => cy.xpath('(//select[@title= "Select year"])[1]'),
        select_month: () => cy.xpath('(//select[@title= "Select month"])[1]'),
        select_day: (text) => cy.xpath('//div[@class=\'btn-light ng-star-inserted\' and text()=\''+text+'\']')
    }

    clickOnNormalizeLink(text) {
        this.elements.a_normalize_link(text).click();
    }

    clickOnNormalizeButton(text) {
        this.elements.button_normalize_link(text).click();
    }

    enterValueInput(question, answer) {
        if (question.match('.*\\[[\\d.]]')) {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : " + valueAndIndex[1])
            this.elements.input_field(valueAndIndex[0], valueAndIndex[1]).type(answer);
        } else {
            console.log("Field_name : " + question)
            console.log("Index : 1")
            this.elements.input_field(question, 1).type(answer);
        }
    }

    enterValueTextArea(question, answer) {
        if (question.match('.*\\[[\\d.]]')) {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : " + valueAndIndex[1])
            this.elements.textarea_field(valueAndIndex[0], valueAndIndex[1]).type(answer);
        } else {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : 1")
            this.elements.textarea_field(valueAndIndex[0], 1).type(answer);
        }
    }

    enterValueSuggest(question, answer) {
        if (question.match('.*\\[[\\d.]]')) {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : " + valueAndIndex[1])
            this.elements.input_suggest_field(valueAndIndex[0], valueAndIndex[1]).type(answer);
            this.elements.suggest_field(answer).click();

        } else {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : 1")
            this.elements.input_suggest_field(valueAndIndex[0], 1).type(answer);
            this.elements.suggest_field(answer).click();
        }
    }


    enterValueDate(question, answer) {

        //question = lable = Start Date
        //answer = date = 1 May 2021

        /*
        1. format answer to this format 1 May 2021 ===> D MMM yyyy
        */
        answer = dateTime.formatIfDatetime(answer)

        let date_parts = answer.split(' ')
        let day = date_parts[0]
        let month = date_parts[1]
        let year = date_parts[2]

        if (question.match('.*\\[[\\d.]]')) {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : " + valueAndIndex[1])
            this.elements.div_calender(valueAndIndex[0], valueAndIndex[1]).click(); //Open Calender

        } else {
            let valueAndIndex = getValueAndIndex(question)
            console.log("Field_name : " + valueAndIndex[0])
            console.log("Index : 1")
            this.elements.div_calender(valueAndIndex[0], 1).click(); //Open Calender
        }

        this.elements.select_year().select(year);
        this.elements.select_month().select(month);
        this.elements.select_day(day).click();
    
    }

    enter_value(question, answer) {

        console.log("Input ::: " + question)

        switch (switch_option(question)) {

            case 'suggest':
                console.log('This is for Suggest tag')
                this.enterValueSuggest(question, answer)
                break;

            case 'textarea':
                console.log('This is for Text Area tag')
                this.enterValueTextArea(question, answer)
                break;

            case 'date':
                console.log('This is for Date tag')
                this.enterValueDate(question, answer)
                break;

            default:
                console.log('This is for Input tag')
                this.enterValueInput(question, answer)
                break;
        }
    }


}

function getValueAndIndex(value) {

    if (value.includes('[')) {
        let values = value.split('[')
        let result = values.map(x => x.replace(']', ''));
        return result
    } else {
        return value
    }

}

function switch_option(text) {

    let valueAndIndex = getValueAndIndex(text)

    if (valueAndIndex.length > 1) {
        return getValueAndIndex(text)[1]
    } else {
        return getValueAndIndex(text)[0]
    }

}