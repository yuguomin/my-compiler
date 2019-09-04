import { ITokenType } from "./ISimpleLexer";

export interface ISimpleToken {
  getType(): ITokenType | null;
  getText(): string;
}