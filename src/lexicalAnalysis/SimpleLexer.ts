import { DfaState, TokenType, ISimpleLexer } from '../common/interface/ISimpleLexer';
import { TokenReader } from './TokenReader';
import { ITokenReader } from '../common/interface/ITokenReader';
import { SimpleToken } from './SimpleToken';
import { isAlpha, isDight, isGE } from '../common/utils/stringVerify';
import { ISimpleToken } from '../common/interface/ISimpleToken';

export class SimpleLexer implements ISimpleLexer {
  constructor(code: string) {
    this.tokenize(code);
  }

  private tokenList: ISimpleToken[] = [];
  private token: ISimpleToken = new SimpleToken();
  private tokenText: string = '';
  private tokenReader: ITokenReader;

  /**
   * @description
   * Finite perpetual motion machine, parse to get every token to the list.
   * Rules: judge machine state, go init or just append to text.
   */
  private tokenize: (code: string) => ITokenReader = (code) => {
    let readCharIndex: number = 0;
    let char: string = '';
    let state = DfaState.Initial;
    try {
      while ((char = code[readCharIndex++]) !== undefined) {
        switch (state) {
          case DfaState.Initial:
            state = this.initToken(char);
            break;
          case DfaState.Id:
            if (isAlpha(char) || isDight(char)) {
              this.append2TokenText(char);
            } else {
              state = this.initToken(char);
            }
            break;
          case DfaState.NumberLiteral:
            if (isDight(char)) {
              this.append2TokenText(char);
            } else {
              state = this.initToken(char);
            }
            break;
          case DfaState.GE:
            state = this.initToken(char);
            break;
        }
      }
      if (this.tokenText) {
        this.initToken(char);
      }
    } catch (err) {
      console.log('err:', err);
    }
    return this.tokenReader = new TokenReader(this.tokenList);
    // return this.tokenList;
  }

  /**
   * @description
   * init token and judge current char state to parse machine
   * Rules: if has token, need append to list first, and init token and text, then jurdge char state.
   */
  private initToken: (char: string) => DfaState = (char) => {
    // init token
    if (this.tokenText.length) {
      this.token.text = this.tokenText;
      this.tokenList.push(this.token);
      this.token = new SimpleToken();
      this.tokenText = '';
    }
    return this.getInitCharState(char);
  }

  private getInitCharState: (char: string) => DfaState = (char) => {
    let newState = DfaState.Initial;
    if (isAlpha(char)) {
      newState = DfaState.Id;
      this.changeTokenType(TokenType.Identifier);
      this.append2TokenText(char);
    } else if (isDight(char)) {
      newState = DfaState.NumberLiteral;
      this.changeTokenType(TokenType.NumberLiteral);
      this.append2TokenText(char);
    } else if (isGE(char)) {
      newState = DfaState.GE;
      this.changeTokenType(TokenType.GE);
      this.append2TokenText(char);
    }
    return newState;
  }

  private append2TokenText: (char: string) => void = (char) => {
    this.tokenText = this.tokenText + char;
  }

  private changeTokenType: (state: TokenType) => void = (state) => {
    this.token.type = state;
  }


  public dump = () => {
    let token: ISimpleToken | null = null;
    console.log('text\ttype')
    while (token = this.tokenReader.read()) {
      console.log(token.getText()+"\t"+token.getType());
    }
  }

  public getTokens = () => {
    return this.tokenList;
  }
}