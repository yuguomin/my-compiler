import { ITokenReader } from "src/common/interface/ITokenReader";
import { ITokenItem } from "src/common/interface/ISimpleLexer";

export class TokenReader implements ITokenReader {
    constructor(tokenList: ITokenItem[]) {
      this.tokenList = tokenList;
    }

    private tokenList: ITokenItem[] = [];
    private pos = 0;

    public read() {
      if (this.pos < this.tokenList.length) {
          return this.tokenList[this.pos++];
      }
      return null;
  }
}