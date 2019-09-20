"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenReader {
    constructor(tokenList) {
        this.tokenList = [];
        this.pos = 0;
        this.tokenList = tokenList;
    }
    read() {
        if (this.pos < this.tokenList.length) {
            return this.tokenList[this.pos++];
        }
        return null;
    }
    peek() {
        if (this.pos < this.tokenList.length) {
            return this.tokenList[this.pos];
        }
        return null;
    }
    getPosition() {
        return this.pos;
    }
    setPosition(pos) {
        this.pos = pos;
    }
}
exports.TokenReader = TokenReader;
