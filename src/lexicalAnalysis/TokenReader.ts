import { ITokenReader } from 'src/common/interface/ITokenReader';
import { ISimpleToken } from 'src/common/interface/ISimpleToken';

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
}