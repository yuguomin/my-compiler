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
        return this.veriableMap[name];
    }
    containsKey(name) {
        return this.veriableMap.hasOwnProperty(name);
    }
}
exports.VeriableMap = VeriableMap;
