"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VeriableMap {
    constructor() {
        this.veriableMap = {};
    }
    push(name, value) {
        this.veriableMap[name] = value;
    }
    get(name) {
        if (this.veriableMap[name]) {
            return this.veriableMap[name];
        }
        return null;
    }
}
exports.VeriableMap = VeriableMap;
