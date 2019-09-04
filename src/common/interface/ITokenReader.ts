import { ITokenItem } from "./ISimpleLexer";

export interface ITokenReader {
  read(): ITokenItem | null;
}