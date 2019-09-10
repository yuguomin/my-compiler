"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenReader_1 = require("./TokenReader");
const SimpleToken_1 = require("./SimpleToken");
const stringVerify_1 = require("../common/utils/stringVerify");
const lexicalAnalysis_1 = require("./contants/lexicalAnalysis");
const isVariableStart_1 = require("./utils/isVariableStart");
const isVariableFollow_1 = require("./utils/isVariableFollow");
const DfaState_1 = require("./enum/DfaState");
const TokenType_1 = require("./enum/TokenType");
/**
 * @description
 * for a piece of code create a lexer class, can do something about tokens.
 */
class SimpleLexer {
    constructor(code) {
        this.code = '';
        this.tokenList = [];
        this.token = new SimpleToken_1.SimpleToken();
        this.tokenText = '';
        /**
         * @description
         * Finite perpetual motion machine, parse to get every token to the list.
         * Rules: judge machine state, go init or just append to text.
         */
        this.tokenize = (code) => {
            this.code = code;
            let readCharIndex = 0;
            let char = '';
            let state = DfaState_1.DfaState.Initial;
            try {
                while ((char = code[readCharIndex++]) !== undefined) {
                    switch (state) {
                        case DfaState_1.DfaState.Initial:
                            state = this.initToken(char);
                            break;
                        case DfaState_1.DfaState.Id:
                            if (isVariableFollow_1.isVariableFollow(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.Id_variable1:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.VARIABLE_ID_SECOND) {
                                state = DfaState_1.DfaState.Id_variable2;
                                this.append2TokenText(char);
                            }
                            else if (stringVerify_1.isAlpha(char) || stringVerify_1.isDigit(char)) {
                                state = DfaState_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.Id_variable2:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.VARIABLE_ID_END) {
                                state = DfaState_1.DfaState.Id_variable3;
                                this.append2TokenText(char);
                            }
                            else if (stringVerify_1.isAlpha(char) || stringVerify_1.isDigit(char)) {
                                state = DfaState_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.Id_variable3:
                            if (stringVerify_1.isBlank(char)) {
                                this.changeTokenType(TokenType_1.TokenType.VariableIdentifier);
                                state = this.initToken(char);
                            }
                            else {
                                state = DfaState_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            break;
                        case DfaState_1.DfaState.NumberLiteral:
                            if (stringVerify_1.isDigit(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.GT:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(TokenType_1.TokenType.GE);
                                this.append2TokenText(char);
                                state = DfaState_1.DfaState.GE;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.LT:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(TokenType_1.TokenType.LE);
                                this.append2TokenText(char);
                                state = DfaState_1.DfaState.LE;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.Assignment:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(TokenType_1.TokenType.NSC);
                                this.append2TokenText(char);
                                state = DfaState_1.DfaState.NSC;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.NSC:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(TokenType_1.TokenType.SC);
                                this.append2TokenText(char);
                                state = DfaState_1.DfaState.SC;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case DfaState_1.DfaState.SC:
                        case DfaState_1.DfaState.GE:
                        case DfaState_1.DfaState.LE:
                        case DfaState_1.DfaState.Plus:
                        case DfaState_1.DfaState.Minus:
                        case DfaState_1.DfaState.Star:
                        case DfaState_1.DfaState.Slash:
                        case DfaState_1.DfaState.Semicolon:
                        case DfaState_1.DfaState.LeftParen:
                        case DfaState_1.DfaState.RightParen:
                            state = this.initToken(char);
                            break;
                    }
                }
                if (this.tokenText) {
                    this.initToken(char);
                }
            }
            catch (err) {
                console.log('err:', err);
            }
            return this.tokenReader = new TokenReader_1.TokenReader(this.tokenList);
        };
        /**
         * @description
         * init token and judge current char state to parse machine
         * Rules: if has token, need append to list first, and init token and text, then jurdge char state.
         */
        this.initToken = (char) => {
            // init token
            if (this.tokenText.length) {
                this.token.text = this.tokenText;
                this.tokenList.push(this.token);
                this.token = new SimpleToken_1.SimpleToken();
                this.tokenText = '';
            }
            return this.getInitCharState(char);
        };
        this.getInitCharState = (char) => {
            let newState = DfaState_1.DfaState.Initial;
            if (isVariableStart_1.isVariableStart(char)) {
                newState = char === lexicalAnalysis_1.SPECIAL_TOKEN.VARIABLE_ID_BEGIN ? DfaState_1.DfaState.Id_variable1 : DfaState_1.DfaState.Id;
                this.changeTokenType(TokenType_1.TokenType.Identifier);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isDigit(char)) {
                newState = DfaState_1.DfaState.NumberLiteral;
                this.changeTokenType(TokenType_1.TokenType.NumberLiteral);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                newState = DfaState_1.DfaState.Assignment;
                this.changeTokenType(TokenType_1.TokenType.Assignment);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.GREATER_THAN) {
                newState = DfaState_1.DfaState.GT;
                this.changeTokenType(TokenType_1.TokenType.GT);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.LESS_THAN) {
                newState = DfaState_1.DfaState.LT;
                this.changeTokenType(TokenType_1.TokenType.LT);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.PLUS) {
                newState = DfaState_1.DfaState.Plus;
                this.changeTokenType(TokenType_1.TokenType.Plus);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.MINUS) {
                newState = DfaState_1.DfaState.Minus;
                this.changeTokenType(TokenType_1.TokenType.Minus);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.STAR) {
                newState = DfaState_1.DfaState.Star;
                this.changeTokenType(TokenType_1.TokenType.Star);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.SLASH) {
                newState = DfaState_1.DfaState.Slash;
                this.changeTokenType(TokenType_1.TokenType.Slash);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.SEMICOLIN) {
                newState = DfaState_1.DfaState.Semicolon;
                this.changeTokenType(TokenType_1.TokenType.Semicolon);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.LEFT_PAREN) {
                newState = DfaState_1.DfaState.LeftParen;
                this.changeTokenType(TokenType_1.TokenType.LeftParen);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.RIGHT_PAREN) {
                newState = DfaState_1.DfaState.RightParen;
                this.changeTokenType(TokenType_1.TokenType.RightParen);
                this.append2TokenText(char);
            }
            return newState;
        };
        this.append2TokenText = (char) => {
            this.tokenText = this.tokenText + char;
        };
        this.changeTokenType = (state) => {
            this.token.type = state;
        };
        this.dump = () => {
            let token = null;
            console.log('text\ttype');
            while (token = this.tokenReader.read()) {
                console.log(token.getText() + "\t" + token.getType());
            }
        };
        this.getTokens = () => {
            return this.tokenList;
        };
        this.getCode = () => {
            return this.code;
        };
        this.tokenize(code);
    }
}
exports.SimpleLexer = SimpleLexer;
