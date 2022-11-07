# calculator.feature

Feature: Basic Operations with a Calculator
  I want to execute the four basic operations

  Scenario: Sum of two numbers
    Given an API REST Calculator
    When we want to sum <input_1> and <input_2>
    Then the result must be <output>

  Examples:
  | input_1 | input_2 | output  |
  | 2       | 2       | 4       |
  | 0       | 0       | 0       |
  | 2.5     | 2.5     | 5       |

  Scenario: Substraction of two numbers
    Given an API REST Calculator
    When we want to execute <input_1> minus <input_2>
    Then the result must be <output>

    Examples:
    | input_1 | input_2 | output             |
    | 2       | 2       | 0      |
    | 0       | 0       | 0      |
    | 5       | 2.5     | 2.5    |

  Scenario: Multiplication of two numbers
    Given an API REST Calculator
    When we want to execute <input_1> multiplied by <input_2>
    Then the result must be <output>

    Examples:
    | input_1 | input_2 | output |
    | 2       | 2       | 4      |
    | 2       | 0       | 0      |
    | 5       | 2.5     | 12.5   |

  Scenario: Division of two numbers
    Given an API REST Calculator
    When we want to execute <input_1> divided by <input_2>
    Then the result must be <output>

    Examples:
    | input_1 | input_2 | output |
    | 2       | 2       | 1      |
    | 12      | 2       | 6      |
    | 12      | 5       | 2.4    |

  Scenario: Division by zero
    Given an API REST Calculator
    When we want to execute <input_1> divided by <input_2>
    Then the result must have the next error message <output>

    Examples:
    | input_1 | input_2 | output                                                |
    | 2       | 0       | 'Can not divide by zero'     |
    | 0       | 0       | 'Can not divide by zero'     |
    | 5.5     | 0       | 'Can not divide by zero'     |

  Scenario: Stopping the server
    Given an API REST Calculator
    When we want to stop the server
    Then the server must be stopped