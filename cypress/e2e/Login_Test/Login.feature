Feature: Verify Login

    @stage
    Scenario: Verify login with valid credentials
        Given User is logged into TS Admin

    @stage
    Scenario Outline: Verify login with valid credentials
        Given User is navigated to login page
        And User enter details as below:
            | username | password |
            | <un>     | <pw>     |
        When User click on login button
        Then User should be logged in as '<user>'

        Examples:
            | un    | pw   | user         |
            | Diego | test | Diego Duarte |


    Scenario Outline: Verify error messages with invalid credentials
        Given User is navigated to login page
        And User enter details as below:
            | username | password |
            | <un>     | <pw>     |
        When User click on login button
        Then Error message should be displayed as below:
            | error_message |
            | <em>          |
        @stage
        Examples:
            | un    | pw          | em                                          |
            | tom   | test        | Login failed. Please check your credentials |
            | Diego | password123 | Login failed. Please check your credentials |
            | tom   | password123 | Login failed. Please check your credentials |
