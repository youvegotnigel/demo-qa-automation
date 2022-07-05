export default class BasePage {

    elements = {
        a_normalize_link: (text) => cy.xpath('//a[normalize-space()=\'' + text + '\']'),
        input_field: (text, index) => cy.xpath('(//*[contains(text(),\'' + text + '\')])[' + index + ']/following-sibling::input[1]'),
        textarea_field: (text, index) => cy.xpath('(//*[contains(text(),\'' + text + '\')])[' + index + ']/following-sibling::textarea[1]')

    }

    clickOnNormalizeLink(text) {
        this.elements.a_normalize_link(text).click();
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

    enter_value(question, answer) {

        console.log("Input ::: " + question)

        switch (switch_option(question)) {

            case 'suggest':
                console.log('This is for Suggest tag')
                if (question.match('.*\\[[\\d.]]')) {
                    let valueAndIndex = getValueAndIndex(question)
                    console.log("Field_name : " + valueAndIndex[0])
                    console.log("Index : " + valueAndIndex[2])
                } else {
                    let valueAndIndex = getValueAndIndex(question)
                    console.log("Field_name : " + valueAndIndex[0])
                    console.log("Index : 1")
                }
                break;

            case 'textarea':
                console.log('This is for Text Area tag')
                this.enterValueTextArea(question, answer)
                break;

            case 'date':
                console.log('This is for Date tag')
                if (question.match('.*\\[[\\d.]]')) {
                    let valueAndIndex = getValueAndIndex(question)
                    console.log("Field_name : " + valueAndIndex[0])
                    console.log("Index : " + valueAndIndex[2])
                } else {
                    let valueAndIndex = getValueAndIndex(question)
                    console.log("Field_name : " + valueAndIndex[0])
                    console.log("Index : 1")
                }
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