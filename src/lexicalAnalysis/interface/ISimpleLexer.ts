import { ISimpleToken } from "./ISimpleToken";

export interface ISimpleLexer {
  dump(): void;
  getTokens(): ISimpleToken[];
  getCode(): string;
}