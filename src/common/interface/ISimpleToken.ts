import { TokenType } from './ISimpleLexer';

export interface ISimpleToken {
  type: TokenType | null;
  text: string;
  getType(): TokenType | null;
  getText(): string;
}