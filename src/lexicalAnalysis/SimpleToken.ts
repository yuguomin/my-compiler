import { ISimpleToken } from './interface/ISimpleToken';
import { TokenType } from './enum/TokenType';

export class SimpleToken implements ISimpleToken {
  public type: TokenType | null = null;
  public text: string = '';

  public getType = () => {
    return this.type;
  }

  public getText = () => {
    return this.text;
  }
}