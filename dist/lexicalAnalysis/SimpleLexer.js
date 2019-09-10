"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ISimpleLexer_1 = require("./interface/ISimpleLexer");
const TokenReader_1 = require("./TokenReader");
const SimpleToken_1 = require("./SimpleToken");
const stringVerify_1 = require("../common/utils/stringVerify");
const lexicalAnalysis_1 = require("./contants/lexicalAnalysis");
const isVariableStart_1 = require("./utils/isVariableStart");
const isVariableFollow_1 = require("./utils/isVariableFollow");
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
            let state = ISimpleLexer_1.DfaState.Initial;
            try {
                while ((char = code[readCharIndex++]) !== undefined) {
                    switch (state) {
                        case ISimpleLexer_1.DfaState.Initial:
                            state = this.initToken(char);
                            break;
                        case ISimpleLexer_1.DfaState.Id:
                            if (isVariableFollow_1.isVariableFollow(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Id_variable1:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.VARIABLE_ID_SECOND) {
                                state = ISimpleLexer_1.DfaState.Id_variable2;
                                this.append2TokenText(char);
                            }
                            else if (stringVerify_1.isAlpha(char) || stringVerify_1.isDigit(char)) {
                                state = ISimpleLexer_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Id_variable2:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.VARIABLE_ID_END) {
                                state = ISimpleLexer_1.DfaState.Id_variable3;
                                this.append2TokenText(char);
                            }
                            else if (stringVerify_1.isAlpha(char) || stringVerify_1.isDigit(char)) {
                                state = ISimpleLexer_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Id_variable3:
                            if (stringVerify_1.isBlank(char)) {
                                this.changeTokenType(ISimpleLexer_1.TokenType.VariableIdentifier);
                                state = this.initToken(char);
                            }
                            else {
                                state = ISimpleLexer_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.NumberLiteral:
                            if (stringVerify_1.isDigit(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.GT:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(ISimpleLexer_1.TokenType.GE);
                                this.append2TokenText(char);
                                state = ISimpleLexer_1.DfaState.GE;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.LT:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(ISimpleLexer_1.TokenType.LE);
                                this.append2TokenText(char);
                                state = ISimpleLexer_1.DfaState.LE;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Assignment:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(ISimpleLexer_1.TokenType.NSC);
                                this.append2TokenText(char);
                                state = ISimpleLexer_1.DfaState.NSC;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.NSC:
                            if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                                this.changeTokenType(ISimpleLexer_1.TokenType.SC);
                                this.append2TokenText(char);
                                state = ISimpleLexer_1.DfaState.SC;
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.SC:
                        case ISimpleLexer_1.DfaState.GE:
                        case ISimpleLexer_1.DfaState.LE:
                        case ISimpleLexer_1.DfaState.Plus:
                        case ISimpleLexer_1.DfaState.Minus:
                        case ISimpleLexer_1.DfaState.Star:
                        case ISimpleLexer_1.DfaState.Slash:
                        case ISimpleLexer_1.DfaState.Semicolon:
                        case ISimpleLexer_1.DfaState.LeftParen:
                        case ISimpleLexer_1.DfaState.RightParen:
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
            let newState = ISimpleLexer_1.DfaState.Initial;
            if (isVariableStart_1.isVariableStart(char)) {
                newState = char === lexicalAnalysis_1.SPECIAL_TOKEN.VARIABLE_ID_BEGIN ? ISimpleLexer_1.DfaState.Id_variable1 : ISimpleLexer_1.DfaState.Id;
                this.changeTokenType(ISimpleLexer_1.TokenType.Identifier);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isDigit(char)) {
                newState = ISimpleLexer_1.DfaState.NumberLiteral;
                this.changeTokenType(ISimpleLexer_1.TokenType.NumberLiteral);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.ASSIGNMENT) {
                newState = ISimpleLexer_1.DfaState.Assignment;
                this.changeTokenType(ISimpleLexer_1.TokenType.Assignment);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.GREATER_THAN) {
                newState = ISimpleLexer_1.DfaState.GT;
                this.changeTokenType(ISimpleLexer_1.TokenType.GT);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.LESS_THAN) {
                newState = ISimpleLexer_1.DfaState.LT;
                this.changeTokenType(ISimpleLexer_1.TokenType.LT);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.PLUS) {
                newState = ISimpleLexer_1.DfaState.Plus;
                this.changeTokenType(ISimpleLexer_1.TokenType.Plus);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.MINUS) {
                newState = ISimpleLexer_1.DfaState.Minus;
                this.changeTokenType(ISimpleLexer_1.TokenType.Minus);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.STAR) {
                newState = ISimpleLexer_1.DfaState.Star;
                this.changeTokenType(ISimpleLexer_1.TokenType.Star);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.SLASH) {
                newState = ISimpleLexer_1.DfaState.Slash;
                this.changeTokenType(ISimpleLexer_1.TokenType.Slash);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.SEMICOLIN) {
                newState = ISimpleLexer_1.DfaState.Semicolon;
                this.changeTokenType(ISimpleLexer_1.TokenType.Semicolon);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.LEFT_PAREN) {
                newState = ISimpleLexer_1.DfaState.LeftParen;
                this.changeTokenType(ISimpleLexer_1.TokenType.LeftParen);
                this.append2TokenText(char);
            }
            else if (char === lexicalAnalysis_1.SPECIAL_TOKEN.RIGHT_PAREN) {
                newState = ISimpleLexer_1.DfaState.RightParen;
                this.changeTokenType(ISimpleLexer_1.TokenType.RightParen);
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
