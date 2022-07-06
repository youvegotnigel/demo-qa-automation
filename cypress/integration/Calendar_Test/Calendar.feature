Feature: Calendar Scenarios

    @stage
    Scenario: Create a contract
        Given User is navigated to calendar page
        When User set date "today" for "Date desktop"
        Then System should display date "today" for "Date desktop"