Feature: Calendar Scenarios

    @stage
    Scenario Outline: Select "<date>" date from Calendar widget
        Given User is navigated to calendar page
        When User set date "<date>" for "Date desktop"
        Then System should display date "<date>" for "Date desktop"

        Examples:
            | date        |
            | 3 May 2016  |
            | 19 Jun 2012 |
            | previous+1  |