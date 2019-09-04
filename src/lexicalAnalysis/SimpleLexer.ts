import { ITokenItem, DfaState } from "src/common/interface/ISimpleLexer";
import { TokenReader } from "./TokenReader";
import { ITokenReader } from "src/common/interface/ITokenReader";
import { SimpleToken } from "./SimpleToken";

export class SimpleLexer {
  constructor(code: string) {
    this.tokenize(code);
  }

  private tokenList: ITokenItem[] = [];
  private token: ITokenItem;
  private tokenText: string;
  
  /**
   * @description
   * Finite perpetual motion machine, parse to get every token to the list.
   * Rules: judge machine state, go init or just append to text.
   */
  public tokenize: (code: string) => ITokenReader = (code) => {
    let readIndex: number = 0;
    let char: string = '';
    let state = DfaState.Initial;
    while ((char = code[readIndex++]) !== undefined) {
      try {
        switch (state) {
          case DfaState.Initial:
            break;
        }
      } catch (err) {
        console.log('err:', err);
      }
    }
    return new TokenReader(this.tokenList);
  }

  /**
   * @description
   * init token and judge current char state to parse machine
   * Rules: if has token, need append to list first, and init token and text, then jurdge char state.
   */
  private initToken: (char: string) => DfaState = () => {
    if (this.tokenText.length) {
      this.token.text = this.tokenText;
      this.token = new SimpleToken();
    }
    return DfaState.Initial;
  }
}