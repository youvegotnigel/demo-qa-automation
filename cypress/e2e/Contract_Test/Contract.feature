Feature: Contract Scenarios

    Background:
        Given User is logged into TS Admin

    @stage
    Scenario Outline: Create a contract
        Given User click on the 'Add New Contract' link
        And User enter details as below:
            | Name   | Description[textarea] | productId[suggest] | Add new users[suggest] | Start Date[date] | End Date[date] |
            | <name> | <description>         | <product>          | <user>                 | <startDate>      | <endDate>      |
        And User click on the "Add" link
        When User click on the "Create" button

        Examples:
            | name             | description        | product | user              | startDate  | endDate |
            | Cypress Contract | Cypress Automation | Covid   | Active Automation | 1 May 2021 | today   |