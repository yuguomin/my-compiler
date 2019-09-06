"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["Identifier"] = "Identifier";
    TokenType["NumberLiteral"] = "NumberLiteral";
    TokenType["StringLiteral"] = "StringLiteral";
    TokenType["Assignment"] = "Assignment";
    TokenType["GE"] = "GE";
    TokenType["GT"] = "GT";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var DfaState;
(function (DfaState) {
    DfaState[DfaState["Initial"] = 0] = "Initial";
    DfaState[DfaState["Id"] = 1] = "Id";
    DfaState[DfaState["Assignment"] = 2] = "Assignment";
    DfaState[DfaState["NumberLiteral"] = 3] = "NumberLiteral";
    DfaState[DfaState["GE"] = 4] = "GE";
    DfaState[DfaState["GT"] = 5] = "GT";
})(DfaState = exports.DfaState || (exports.DfaState = {}));
