import { ITokenReader } from './interface/ITokenReader';
import { ISimpleToken } from './interface/ISimpleToken';

export class TokenReader implements ITokenReader {
  constructor(tokenList: ISimpleToken[]) {
    this.tokenList = tokenList;
  }

  private tokenList: ISimpleToken[] = [];
  private pos = 0;

  public read() {
    if (this.pos < this.tokenList.length) {
      return this.tokenList[this.pos++];
    }
    return null;
  }

  public peek() {
    if (this.pos < this.tokenList.length) {
      return this.tokenList[this.pos];
    }
    return null;
  }

  public getPosition() {
    return this.pos;
  }

  public setPosition(pos: number) {
    this.pos = pos;
  }
}