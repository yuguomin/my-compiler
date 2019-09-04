export interface ITokenItem {
  type: ITokenType | null;
  text: string;
}

export enum ITokenType {
  Identifier,
  NumberLiteral,
  StringLiteral
}

export enum DfaState {
  Initial,
  Id,
  NumberLiteral
}