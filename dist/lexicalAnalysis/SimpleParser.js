"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ILexicalParser_1 = require("src/common/interface/ILexicalParser");
const tokenReader_1 = require("./tokenReader");
class LexicalParser {
    constructor(code) {
        this.tokenList = [];
        /**
         * @description
         * Finite perpetual motion machine, parse to get every token to the list.
         * Rules: judge machine state, go init or just append to text.
         */
        this.tokenize = (code) => {
            const state = ILexicalParser_1.DfaState.Initial;
            return new tokenReader_1.TokenReader(this.tokenList);
        };
        this.tokenize(code);
    }
}
exports.LexicalParser = LexicalParser;
