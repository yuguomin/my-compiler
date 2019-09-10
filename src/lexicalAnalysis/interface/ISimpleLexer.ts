import { ISimpleToken } from "./ISimpleToken";

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

export enum DfaState {
  Initial,
  Id,
  Id_variable1,
  Id_variable2,
  Id_variable3,
  Assignment,
  NSC,
  SC,
  NumberLiteral,
  GE,
  GT,
  LT,
  LE,
  Plus, Minus, Star, Slash,
  Semicolon,
  LeftParen,
  RightParen
}

export interface ISimpleLexer {
  dump(): void;
  getTokens(): ISimpleToken[];
  getCode(): string;
}