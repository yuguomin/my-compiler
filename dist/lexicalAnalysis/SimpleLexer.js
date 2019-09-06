"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ISimpleLexer_1 = require("./interface/ISimpleLexer");
const TokenReader_1 = require("./TokenReader");
const SimpleToken_1 = require("./SimpleToken");
const stringVerify_1 = require("../common/utils/stringVerify");
const lexicalAnalysis_1 = require("./contants/lexicalAnalysis");
/**
 * @description
 * for a piece of code create a lexer class, can do something about tokens.
 */
class SimpleLexer {
    constructor(code) {
        this.tokenList = [];
        this.token = new SimpleToken_1.SimpleToken();
        this.tokenText = '';
        /**
         * @description
         * Finite perpetual motion machine, parse to get every token to the list.
         * Rules: judge machine state, go init or just append to text.
         */
        this.tokenize = (code) => {
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
                            if (stringVerify_1.isAlpha(char) || stringVerify_1.isDight(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Id_Int1:
                            if (char === lexicalAnalysis_1.INT_ID_TOKEN_SECOND) {
                                state = ISimpleLexer_1.DfaState.Id_Int2;
                                this.append2TokenText(char);
                            }
                            else if (stringVerify_1.isAlpha(char) || stringVerify_1.isDight(char)) {
                                state = ISimpleLexer_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Id_Int2:
                            if (char === lexicalAnalysis_1.INT_ID_TOKEN_END) {
                                state = ISimpleLexer_1.DfaState.Id_Int3;
                                this.append2TokenText(char);
                            }
                            else if (stringVerify_1.isAlpha(char) || stringVerify_1.isDight(char)) {
                                state = ISimpleLexer_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Id_Int3:
                            if (stringVerify_1.isBlank(char)) {
                                this.changeTokenType(ISimpleLexer_1.TokenType.Int);
                            }
                            else {
                                state = ISimpleLexer_1.DfaState.Id;
                                this.append2TokenText(char);
                            }
                        case ISimpleLexer_1.DfaState.NumberLiteral:
                            if (stringVerify_1.isDight(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.Assignment:
                        case ISimpleLexer_1.DfaState.GE:
                            state = this.initToken(char);
                            break;
                        case ISimpleLexer_1.DfaState.GT:
                            if (stringVerify_1.isAssignment(char)) {
                                this.token.type = ISimpleLexer_1.TokenType.GE;
                                state = ISimpleLexer_1.DfaState.GE;
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
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
            if (stringVerify_1.isAlpha(char)) {
                newState = char === lexicalAnalysis_1.INT_ID_TOKEN_BEGIN ? ISimpleLexer_1.DfaState.Id_Int1 : ISimpleLexer_1.DfaState.Id;
                this.changeTokenType(ISimpleLexer_1.TokenType.Identifier);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isDight(char)) {
                newState = ISimpleLexer_1.DfaState.NumberLiteral;
                this.changeTokenType(ISimpleLexer_1.TokenType.NumberLiteral);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isAssignment(char)) {
                newState = ISimpleLexer_1.DfaState.Assignment;
                this.changeTokenType(ISimpleLexer_1.TokenType.Assignment);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isGT(char)) {
                newState = ISimpleLexer_1.DfaState.GT;
                this.changeTokenType(ISimpleLexer_1.TokenType.GT);
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
        this.tokenize(code);
    }
}
exports.SimpleLexer = SimpleLexer;
