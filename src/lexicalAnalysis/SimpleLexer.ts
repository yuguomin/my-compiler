import { ISimpleLexer } from './interface/ISimpleLexer';
import { TokenReader } from './TokenReader';
import { ITokenReader } from './interface/ITokenReader';
import { SimpleToken } from './SimpleToken';
import { isAlpha, isDigit, isBlank } from '../common/utils/stringVerify';
import { ISimpleToken } from './interface/ISimpleToken';
import { SPECIAL_TOKEN } from '../common/constant/SpecialToken';
import { isVariableStart } from './utils/isVariableStart';
import { isVariableFollow } from './utils/isVariableFollow';
import { DfaState } from './enum/DfaState';
import { TokenType } from './enum/TokenType';

/** 
 * @description
 * for a piece of code create a lexer class, can do something about tokens.
 */
export class SimpleLexer implements ISimpleLexer {
  constructor(code: string) {
    this.tokenReader = this.tokenize(code);
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
    let readChIndex: number = 0;
    let ch: string = '';
    let state = DfaState.Initial;
    try {
      while ((ch = code[readChIndex++]) !== undefined) {
        switch (state) {
          case DfaState.Initial:
            state = this.initToken(ch);
            break;
          case DfaState.Id:
            if (isVariableFollow(ch)) {
              this.append2TokenText(ch);
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.Id_variable1:
            if (ch === SPECIAL_TOKEN.VARIABLE_ID_SECOND) {
              state = DfaState.Id_variable2;
              this.append2TokenText(ch);
            } else if (isAlpha(ch) || isDigit(ch)) {
              state = DfaState.Id;
              this.append2TokenText(ch);
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.Id_variable2:
            if (ch === SPECIAL_TOKEN.VARIABLE_ID_END) {
              state = DfaState.Id_variable3;
              this.append2TokenText(ch);
            } else if (isAlpha(ch) || isDigit(ch)) {
              state = DfaState.Id;
              this.append2TokenText(ch);
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.Id_variable3:
            if (isBlank(ch)) { // TODO: '%' '*' will be error, judge not variable will be ok
              this.changeTokenType(TokenType.VariableIdentifier);
              state = this.initToken(ch);
            } else {
              state = DfaState.Id;
              this.append2TokenText(ch);
            }
            break;
          case DfaState.NumberLiteral:
            if (isDigit(ch)) {
              this.append2TokenText(ch);
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.GT:
            if (ch === SPECIAL_TOKEN.ASSIGNMENT) {
              this.changeTokenType(TokenType.GE);
              this.append2TokenText(ch);
              state = DfaState.GE;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.LT:
            if (ch === SPECIAL_TOKEN.ASSIGNMENT) {
              this.changeTokenType(TokenType.LE);
              this.append2TokenText(ch);
              state = DfaState.LE;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.Assignment:
            if (ch === SPECIAL_TOKEN.ASSIGNMENT) {
              this.changeTokenType(TokenType.NSC);
              this.append2TokenText(ch);
              state = DfaState.NSC;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.NSC:
            if (ch === SPECIAL_TOKEN.ASSIGNMENT) {
              this.changeTokenType(TokenType.SC);
              this.append2TokenText(ch);
              state = DfaState.SC;
            } else {
              state = this.initToken(ch);
            }
            break;
          case DfaState.SC:
          case DfaState.GE:
          case DfaState.LE:
          case DfaState.Plus:
          case DfaState.Minus:
          case DfaState.Star:
          case DfaState.Slash:
          case DfaState.Semicolon:
          case DfaState.LeftParen:
          case DfaState.RightParen:
            state = this.initToken(ch);
            break;
        }
      }
      if (this.tokenText) {
        this.initToken(ch);
      }
    } catch (err) {
      console.log('err:', err);
    }
    return new TokenReader(this.tokenList);
  }

  /**
   * @description
   * init token and judge current ch state to parse machine
   * Rules: if has token, need append to list first, and init token and text, then jurdge ch state.
   */
  private initToken: (ch: string) => DfaState = (ch) => {
    // init token
    if (this.tokenText.length) {
      this.token.text = this.tokenText;
      this.tokenList.push(this.token);
      this.token = new SimpleToken();
      this.tokenText = '';
    }
    return this.getInitChState(ch);
  }

  private getInitChState: (ch: string) => DfaState = (ch) => {
    let newState = DfaState.Initial;
    if (isVariableStart(ch)) {
      newState = ch === SPECIAL_TOKEN.VARIABLE_ID_BEGIN ? DfaState.Id_variable1 : DfaState.Id;
      this.changeTokenType(TokenType.Identifier);
      this.append2TokenText(ch);
    } else if (isDigit(ch)) {
      newState = DfaState.NumberLiteral;
      this.changeTokenType(TokenType.NumberLiteral);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.ASSIGNMENT) {
      newState = DfaState.Assignment;
      this.changeTokenType(TokenType.Assignment);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.GREATER_THAN) {
      newState = DfaState.GT;
      this.changeTokenType(TokenType.GT);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.LESS_THAN) {
      newState = DfaState.LT;
      this.changeTokenType(TokenType.LT);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.PLUS) {
      newState = DfaState.Plus;
      this.changeTokenType(TokenType.Plus);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.MINUS) {
      newState = DfaState.Minus;
      this.changeTokenType(TokenType.Minus);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.STAR) {
      newState = DfaState.Star;
      this.changeTokenType(TokenType.Star);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.SLASH) {
      newState = DfaState.Slash;
      this.changeTokenType(TokenType.Slash);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.SEMICOLIN) {
      newState = DfaState.Semicolon;
      this.changeTokenType(TokenType.Semicolon);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.LEFT_PAREN) {
      newState = DfaState.LeftParen;
      this.changeTokenType(TokenType.LeftParen);
      this.append2TokenText(ch);
    } else if (ch === SPECIAL_TOKEN.RIGHT_PAREN) {
      newState = DfaState.RightParen;
      this.changeTokenType(TokenType.RightParen);
      this.append2TokenText(ch);
    }
    return newState;
  }

  private append2TokenText: (ch: string) => void = (ch) => {
    this.tokenText = this.tokenText + ch;
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

  public getTokenReader = () => {
    return this.tokenReader;
  }

  public getTokens = () => {
    return this.tokenList;
  }

  public getCode = () => {
    return this.code;
  }
}