"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ITokenType;
(function (ITokenType) {
    ITokenType[ITokenType["Identifier"] = 0] = "Identifier";
    ITokenType[ITokenType["NumberLiteral"] = 1] = "NumberLiteral";
    ITokenType[ITokenType["StringLiteral"] = 2] = "StringLiteral";
})(ITokenType = exports.ITokenType || (exports.ITokenType = {}));
var DfaState;
(function (DfaState) {
    DfaState[DfaState["Initial"] = 0] = "Initial";
    DfaState[DfaState["Id"] = 1] = "Id";
    DfaState[DfaState["NumberLiteral"] = 2] = "NumberLiteral";
})(DfaState = exports.DfaState || (exports.DfaState = {}));
