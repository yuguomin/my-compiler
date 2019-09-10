import { TokenType } from '../enum/TokenType';

export interface ISimpleToken {
  type: TokenType | null;
  text: string;
  getType(): TokenType | null;
  getText(): string;
}