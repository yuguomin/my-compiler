"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType;
(function (TokenType) {
    TokenType["Identifier"] = "Identifier";
    TokenType["Int"] = "Int";
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
    DfaState[DfaState["Id_Int1"] = 2] = "Id_Int1";
    DfaState[DfaState["Id_Int2"] = 3] = "Id_Int2";
    DfaState[DfaState["Id_Int3"] = 4] = "Id_Int3";
    DfaState[DfaState["Assignment"] = 5] = "Assignment";
    DfaState[DfaState["NumberLiteral"] = 6] = "NumberLiteral";
    DfaState[DfaState["GE"] = 7] = "GE";
    DfaState[DfaState["GT"] = 8] = "GT";
})(DfaState = exports.DfaState || (exports.DfaState = {}));
