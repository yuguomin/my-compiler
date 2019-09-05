import { ISimpleToken } from './ISimpleToken';

export interface ITokenReader {
  read(): ISimpleToken | null;
}