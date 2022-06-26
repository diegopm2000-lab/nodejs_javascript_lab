# calculator.feature

Feature: Basic Operations with a Calculator
  I want to execute the four basic operations

  Scenario: Sum of two numbers (multiple values)
    Given a calculator
    When we want to execute <input_1> plus <input_2>
    Then the result must be <output>

    Examples:
    | input_1 | input_2 | output |
    | 2       | 2       | 4      |
    | 0       | 0       | 0      |
    | 2.5     | 2.5     | 5      |

  Scenario: Substraction of two integers
    Given a calculator
    When we want to execute 6 minus 6
    Then the result must be 0

  Scenario: Multiplication of two integers
    Given a calculator
    When we want to execute 6 multiplied by 6
    Then the result must be 36

  Scenario: Division of two integers, with integer as result
    Given a calculator
    When we want to execute 6 divided by 2
    Then the result must be 3

  Scenario: Division of two integers, with float as result
    Given a calculator
    When we want to execute 6 divided by 4
    Then the result must be 1.5

  Scenario: Divide by zero
    Given a calculator
    When we want to execute 12 divided by 0
    Then should receive this error: You can not divide by zero!
