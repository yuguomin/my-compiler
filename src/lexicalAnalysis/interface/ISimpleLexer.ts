import { ISimpleToken } from "./ISimpleToken";

export enum TokenType {
  Identifier = 'Identifier',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  Assignment = 'Assignment',
  GE = 'GE',
  GT = 'GT'
}

export enum DfaState {
  Initial,
  Id,
  Assignment,
  NumberLiteral,
  GE,
  GT
}

export interface ISimpleLexer {
  dump(): void;
  getTokens(): ISimpleToken[];
}