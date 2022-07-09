import DateTime from '../../support/keywords/DateTime'
import MuiTable from '../../support/keywords/MuiTable'

const moment = require('moment-timezone');
const dateTime = new DateTime()
const muiTable = new MuiTable()

export default class MuiPage {

    elements = {
        calendar_icon: (text) => cy.xpath('(//label[contains(text(),\'' + text + '\')]/../descendant-or-self::button)[1]'),
        calendar_widget: () => cy.xpath('(//div[@class=\'MuiCalendarPicker-root css-1brzq0m\'])[1]'),
        calendar_period: () => cy.xpath('(//div[@class=\'css-1v994a0\'])[1]'),
        calendar_left_arrow: () => cy.xpath('(//button[@aria-label="Previous month"])[1]'),
        calendar_right_arrow: () => cy.xpath('(//button[@aria-label="Next month"])[1]'),
        input_date_selected: (text) => cy.xpath('(//label[contains(text(),\'' + text + '\')]/../div/input)[1]'),
        calendar_date: (text) => cy.xpath('(//div[@class=\'MuiCalendarPicker-root css-1brzq0m\'])[1]//button[normalize-space()=\'' + text + '\']')
    }

    navigateToDatePickerPage() {
        cy.visit('https://mui.com/x/react-date-pickers/getting-started/')
    }

    navigateToDataGridPage() {
        cy.visit('https://mui.com/x/react-data-grid/')
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

        this.elements.input_date_selected(question).invoke('attr', 'value').then(date1 => {

            let date2 = moment(answer).format('MM/DD/YYYY').toString()

            console.log("Date 1 :: " + date1)
            console.log("Date 2 :: " + date2)

            expect(date1).to.be.equal(date2)
        })
    }

    setDate(answer) {

        answer = dateTime.formatIfDatetime(answer)
        let day = answer.split(' ')[0]

        this.elements.calendar_period().invoke('text').then(month_year => {
            console.log("MONTH YEAR :: " + month_year)

            let monthsAway = calculate_months_away(month_year, answer)
            let arrow = monthsAway < 0 ? this.elements.calendar_left_arrow() : this.elements.calendar_right_arrow();

            for (let i = 0; i < Math.abs(monthsAway); i++) {
                arrow.click()
            }

            cy.wait(1500)
            this.elements.calendar_date(day).click()

        })
    }

    verifyDataGridValues(tableName, index, cellInfo){

        let xpath = muiTable.getTableRowXpath(tableName, index, cellInfo)
        cy.xpath(xpath).should('exist')
    }

    setTableCheckBox(tableName, index, cellInfo){
        let xpath = muiTable.getTableRowCheckBoxXpath(tableName, index, cellInfo)
        cy.xpath(xpath).check()
    }

    unsetTableCheckBox(tableName, index, cellInfo){
        let xpath = muiTable.getTableRowCheckBoxXpath(tableName, index, cellInfo)
        cy.xpath(xpath).uncheck()
    }
}


function calculate_months_away(start, end) {

    let startDate = moment(start, 'MMMM YYYY')
    let endDate = moment(end, 'MMMM YYYY')

    var monthDiff = endDate.diff(startDate, 'months')
    console.log('Month Diff: ' + monthDiff)

    return monthDiff
}