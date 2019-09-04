"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleToken {
    constructor() {
        //Token类型
        this.type = null;
        this.text = '';
        this.getType = () => {
            return this.type;
        };
        this.getText = () => {
            return this.text;
        };
    }
}
exports.SimpleToken = SimpleToken;
