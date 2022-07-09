Feature: MUI Table Scenarios

    @stage
    Scenario: Veify type #1 data grid values
        When User is navigated to data grid page
        Then Table 'grid' should be displayed as bellow:
            | ID | First name | Last name | Age | Full name |
            | 1  | Jon        | Snow      | 35  | Jon Snow  |
        And Table 'grid' should be displayed as bellow:
            | ID | First name | Last name | Age | Full name          |
            | 5  | Daenerys   | Targaryen |     | Daenerys Targaryen |


    @stage
    Scenario Outline: Veify type #1 data grid values
        When User is navigated to data grid page
        Then Table 'grid' should be displayed as bellow:
            | ID   | First name | Last name | Age   | Full name  |
            | <id> | <fname>    | <lname>   | <age> | <fullname> |

        Examples:
            | id | fname    | lname     | age | fullname           |
            | 1  | Jon      | Snow      | 35  | Jon Snow           |
            | 2  | Cersei   | Lannister | 42  | Cersei Lannister   |
            | 4  | Arya     | Stark     | 16  | Arya Stark         |
            | 5  | Daenerys | Targaryen |     | Daenerys Targaryen |

    @stage
    Scenario: Veify table checkbox
        Given User is navigated to data grid page
        When User set checkbox for 'Jon' in table 'grid'
        Then System should display '1 row selected'

    @stage
    Scenario: Veify table checkbox
        Given User is navigated to data grid page
        When User set checkbox for 'ID' in table 'grid'
        Then System should display '9 rows selected'

    @stage
    Scenario: Veify table checkbox
        Given User is navigated to data grid page
        When User set checkbox for 'ID' in table 'grid'
        And User uncheck checkbox for 'Arya' in table 'grid'
        And User uncheck checkbox for 'Jon Snow' in table 'grid'
        Then System should display '7 rows selected'


#Verify Click on a cell

#Verify click on check box

# Verify acceding decening order

