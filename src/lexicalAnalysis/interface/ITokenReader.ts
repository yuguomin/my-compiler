import { ISimpleToken } from './ISimpleToken';

export interface ITokenReader {
  read(): ISimpleToken | null;
  peek(): ISimpleToken | null;
  getPosition(): number;
  getPosition(pos: number): void;
}