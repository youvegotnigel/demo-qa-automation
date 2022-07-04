Feature: Contract Scenarios

    Background:
        Given User is logged into TS Admin

    @stage
    Scenario Outline: Create a contract
        Given User click on the 'Add New Contract' link
        And User enter details as below:
            | Name   | Description[textarea] | Product[suggest] | Add new users[suggest] | Start Date  | End Date  |
            | <name> | <description>         | <product>        | <user>                 | <startDate> | <endDate> |
        #And User click on the "Add" link
        #And User click on the "Create" link

        Examples:
            | name            | description      | product | user              | startDate  | endDate     |
            | _dummy_ts_user1 | dummy contract 1 | Action  | Active Automation | 1 May 2021 | 30 May 2021 |