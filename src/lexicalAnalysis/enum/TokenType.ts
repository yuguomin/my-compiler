export enum TokenType {
  Identifier = 'Identifier',
  VariableIdentifier = 'VariableIdentifier',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  Assignment = 'Assignment',
  GE = 'GreaterThanOrEqual',
  GT = 'GreaterThan',
  LT = 'LessThan',
  LE = 'LessThanOrEqual',
  NSC = 'NonstrictComparison',
  SC = 'StrictComparison',
  Plus = 'Plus',
  Minus = 'Minus',
  Star = 'Star',
  Slash = 'Slash',
  Semicolon = 'Semicolon',
  LeftParen = 'LeftParen',
  RightParen = 'RightParen'
}