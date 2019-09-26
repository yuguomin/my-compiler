import { ISimpleToken } from './ISimpleToken';

export interface ITokenReader {
  read(): ISimpleToken | null;
  peek(): ISimpleToken | null;
  unRead(): void;
  getPosition(): number;
  setPosition(pos: number): void;
}