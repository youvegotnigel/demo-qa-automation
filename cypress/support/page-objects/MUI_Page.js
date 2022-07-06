import  DateTime from '../../support/keywords/DateTime'

const moment = require('moment-timezone');
const dateTime = new DateTime()

export default class MuiPage {

    elements = {
        calendar_icon: (text) => cy.xpath('(//label[contains(text(),\'' + text + '\')]/../descendant-or-self::button)[1]'),
        calendar_widget: () => cy.xpath('(//div[@class=\'MuiCalendarPicker-root css-1brzq0m\'])[1]'),
        calendar_period: () => cy.xpath('(//div[@class=\'css-1v994a0\'])[1]'),
        calendar_left_arrow: () => cy.xpath('(//button[@aria-label="Previous month"])[1]'),
        calendar_right_arrow: () => cy.xpath('(//button[@aria-label="Next month"])[1]'),
        input_date_selected: (text) => cy.xpath('(//label[contains(text(),\'' + text + '\')]/../div/input)[1]'),
        calendar_date: (text) => cy.xpath('(//div[@class=\'MuiCalendarPicker-root css-1brzq0m\'])[1]//button[normalize-space()=\''+text+'\']')
    }

    navigateToDatePickerPage() {
        cy.visit('https://mui.com/x/react-date-pickers/getting-started/')
    }

    openCalendar(text) {
        this.elements.calendar_icon(text).click()
    }

    isCaldendarOpen() {
        this.elements.calendar_widget().should('be.visible')
    }

    clickOnLeftArrow() {
        this.elements.calendar_left_arrow().click()
    }

    clickOnRightArrow() {
        this.elements.calendar_right_arrow().click()
    }

    verifySelectedDate(question, answer) {
        answer = dateTime.formatIfDatetime(answer)
        //08/03/2014
        let expected_value = moment(answer, 'DD/MM/YYYY')
        this.elements.input_date_selected(question).invoke('attr', 'value').should('contain', expected_value)
    }

    setDate(answer) {

        answer = dateTime.formatIfDatetime(answer)
        let day = answer.split(' ')[0]

        //let end_date = moment(answer, 'MMMM YYYY')
        let current_month_year = ''

        this.elements.calendar_period().invoke('text').then(text => {
            current_month_year = text.trim()
        })

        //let start_date = moment(start_date_text, 'MMMM YYYY')

        let monthsAway = calculate_months_away(current_month_year, answer)
        let arrow = monthsAway < 0 ? this.elements.calendar_left_arrow() : this.elements.calendar_right_arrow();

        for(let i = 0; i < Math.abs(monthsAway); i++){

            // if(monthsAway>0){
            //     this.elements.calendar_right_arrow().click()
            // }else{
            //     this.elements.calendar_left_arrow().click()
            // }
            arrow.click()
        }

        this.elements.calendar_date(day).click()
    }
}


function calculate_months_away(start, end) {

    let startDate = moment(start, 'MMMM YYYY')
    let endDate = moment(end, 'MMMM YYYY')

    var monthDiff = endDate.diff(startDate, 'months')
    console.log('Month Diff: ' + monthDiff)

    return monthDiff
}