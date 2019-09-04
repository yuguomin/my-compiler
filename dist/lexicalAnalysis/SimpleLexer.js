"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ISimpleLexer_1 = require("src/common/interface/ISimpleLexer");
const TokenReader_1 = require("./TokenReader");
const SimpleToken_1 = require("./SimpleToken");
class SimpleLexer {
    constructor(code) {
        this.tokenList = [];
        /**
         * @description
         * Finite perpetual motion machine, parse to get every token to the list.
         * Rules: judge machine state, go init or just append to text.
         */
        this.tokenize = (code) => {
            let readIndex = 0;
            let char = '';
            let state = ISimpleLexer_1.DfaState.Initial;
            while ((char = code[readIndex++]) !== undefined) {
                try {
                    switch (state) {
                        case ISimpleLexer_1.DfaState.Initial:
                            break;
                    }
                }
                catch (err) {
                    console.log('err:', err);
                }
            }
            return new TokenReader_1.TokenReader(this.tokenList);
        };
        /**
         * @description
         * init token and judge current char state to parse machine
         * Rules: if has token, need append to list first, and init token and text, then jurdge char state.
         */
        this.initToken = () => {
            if (this.tokenText.length) {
                this.token.text = this.tokenText;
                this.token = new SimpleToken_1.SimpleToken();
            }
            return ISimpleLexer_1.DfaState.Initial;
        };
        this.tokenize(code);
    }
}
exports.SimpleLexer = SimpleLexer;
