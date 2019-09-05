"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ISimpleLexer_1 = require("../common/interface/ISimpleLexer");
const TokenReader_1 = require("./TokenReader");
const SimpleToken_1 = require("./SimpleToken");
const stringVerify_1 = require("../common/utils/stringVerify");
class SimpleLexer {
    constructor() {
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
                        case ISimpleLexer_1.DfaState.NumberLiteral:
                            if (stringVerify_1.isDight(char)) {
                                this.append2TokenText(char);
                            }
                            else {
                                state = this.initToken(char);
                            }
                            break;
                        case ISimpleLexer_1.DfaState.GE:
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
            return new TokenReader_1.TokenReader(this.tokenList);
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
                newState = ISimpleLexer_1.DfaState.Id;
                this.changeTokenType(ISimpleLexer_1.TokenType.Identifier);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isDight(char)) {
                newState = ISimpleLexer_1.DfaState.NumberLiteral;
                this.changeTokenType(ISimpleLexer_1.TokenType.NumberLiteral);
                this.append2TokenText(char);
            }
            else if (stringVerify_1.isGE(char)) {
                newState = ISimpleLexer_1.DfaState.GE;
                this.changeTokenType(ISimpleLexer_1.TokenType.GE);
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
        this.dumps = (tokenReader) => {
            const pos = 0;
            let token = null;
            console.log('text\ttype');
            while (token = tokenReader.read()) {
                console.log(token.getText() + "\t" + token.getType());
            }
        };
    }
}
exports.SimpleLexer = SimpleLexer;
