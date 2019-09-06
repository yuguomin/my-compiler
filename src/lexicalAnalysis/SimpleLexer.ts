import { DfaState, TokenType, ISimpleLexer } from './interface/ISimpleLexer';
import { TokenReader } from './TokenReader';
import { ITokenReader } from './interface/ITokenReader';
import { SimpleToken } from './SimpleToken';
import { isAlpha, isDight, isBlank } from '../common/utils/stringVerify';
import { ISimpleToken } from './interface/ISimpleToken';
import { SPECIAL_TOKEN } from './contants/lexicalAnalysis';

/** 
 * @description
 * for a piece of code create a lexer class, can do something about tokens.
 */
export class SimpleLexer implements ISimpleLexer {
  constructor(code: string) {
    this.tokenize(code);
  }

  private code: string = '';
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
    this.code = code;
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
          case DfaState.Id_Int1:
            if (char === SPECIAL_TOKEN.INT_ID_SECOND) {
              state = DfaState.Id_Int2;
              this.append2TokenText(char);
            } else if (isAlpha(char) || isDight(char)) {
              state = DfaState.Id;
              this.append2TokenText(char);
            } else {
              state = this.initToken(char);
            }
            break;
          case DfaState.Id_Int2:
            if (char === SPECIAL_TOKEN.INT_ID_END) {
              state = DfaState.Id_Int3;
              this.append2TokenText(char);
            } else if (isAlpha(char) || isDight(char)) {
              state = DfaState.Id;
              this.append2TokenText(char);
            } else {
              state = this.initToken(char);
            }
            break;
          case DfaState.Id_Int3:
            if (isBlank(char)) {
              this.changeTokenType(TokenType.Int);
            } else {
              state = DfaState.Id;
              this.append2TokenText(char);
            }
          case DfaState.NumberLiteral:
            if (isDight(char)) {
              this.append2TokenText(char);
            } else {
              state = this.initToken(char);
            }
            break;
          case DfaState.GT:
            if (char === SPECIAL_TOKEN.ASSIGNMENT) {
              this.token.type = TokenType.GE;
              state = DfaState.GE;
              this.append2TokenText(char);
            } else {
              state = this.initToken(char);
            }
            break;
          case DfaState.Assignment:
          case DfaState.GE:
          case DfaState.Plus:
          case DfaState.Minus:
          case DfaState.Star:
          case DfaState.Slash:
          case DfaState.Semicolon:
          case DfaState.LeftParen:
          case DfaState.RightParen:
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
      newState = char === SPECIAL_TOKEN.INT_ID_BEGIN ? DfaState.Id_Int1 : DfaState.Id;
      this.changeTokenType(TokenType.Identifier);
      this.append2TokenText(char);
    } else if (isDight(char)) {
      newState = DfaState.NumberLiteral;
      this.changeTokenType(TokenType.NumberLiteral);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.ASSIGNMENT) {
      newState = DfaState.Assignment;
      this.changeTokenType(TokenType.Assignment);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.GREATER_THAN) {
      newState = DfaState.GT;
      this.changeTokenType(TokenType.GT);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.PLUS) {
      newState = DfaState.Plus;
      this.changeTokenType(TokenType.Plus);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.MINUS) {
      newState = DfaState.Minus;
      this.changeTokenType(TokenType.Minus);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.STAR) {
      newState = DfaState.Star;
      this.changeTokenType(TokenType.Star);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.SLASH) {
      newState = DfaState.Slash;
      this.changeTokenType(TokenType.Slash);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.SEMICOLIN) {
      newState = DfaState.Semicolon;
      this.changeTokenType(TokenType.Semicolon);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.LEFT_PAREN) {
      newState = DfaState.LeftParen;
      this.changeTokenType(TokenType.LeftParen);
      this.append2TokenText(char);
    } else if (char === SPECIAL_TOKEN.RIGHT_PAREN) {
      newState = DfaState.RightParen;
      this.changeTokenType(TokenType.RightParen);
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
      console.log(token.getText() + "\t" + token.getType());
    }
  }

  public getTokens = () => {
    return this.tokenList;
  }

  public getCode = () => {
    return this.code;
  }
}