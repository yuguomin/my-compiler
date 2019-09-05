export enum TokenType {
  Identifier = 'Identifier',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  GE = 'GE'
}

export enum DfaState {
  Initial,
  Id,
  NumberLiteral,
  GE
}