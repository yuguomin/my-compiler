import { ISimpleToken } from 'src/common/interface/ISimpleToken';
import { TokenType } from 'src/common/interface/ISimpleLexer';

export class SimpleToken implements ISimpleToken {
  //Token类型
  public type: TokenType | null = null;
  public text: string = '';

  public getType = () => {
    return this.type;
  }

  public getText = () => {
    return this.text;
  }
}