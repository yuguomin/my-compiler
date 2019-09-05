"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["Identifier"] = "Identifier";
    TokenType["NumberLiteral"] = "NumberLiteral";
    TokenType["StringLiteral"] = "StringLiteral";
    TokenType["GE"] = "GE";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var DfaState;
(function (DfaState) {
    DfaState[DfaState["Initial"] = 0] = "Initial";
    DfaState[DfaState["Id"] = 1] = "Id";
    DfaState[DfaState["NumberLiteral"] = 2] = "NumberLiteral";
    DfaState[DfaState["GE"] = 3] = "GE";
})(DfaState = exports.DfaState || (exports.DfaState = {}));
