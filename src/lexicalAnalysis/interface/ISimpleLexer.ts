import { ISimpleToken } from "./ISimpleToken";

export enum TokenType {
  Identifier = 'Identifier',
  Int = 'Int',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  Assignment = 'Assignment',
  GE = 'GE',
  GT = 'GT'
}

export enum DfaState {
  Initial,
  Id,
  Id_Int1,
  Id_Int2,
  Id_Int3,
  Assignment,
  NumberLiteral,
  GE,
  GT
}

export interface ISimpleLexer {
  dump(): void;
  getTokens(): ISimpleToken[];
}