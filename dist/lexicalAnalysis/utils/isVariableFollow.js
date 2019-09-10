"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringVerify_1 = require("../../common/utils/stringVerify");
const SpecialToken_1 = require("../constant/SpecialToken");
exports.isVariableFollow = (char) => {
    return stringVerify_1.isAlpha(char) || stringVerify_1.isDigit(char) || [SpecialToken_1.SPECIAL_TOKEN.DOLLAR_SIGN, SpecialToken_1.SPECIAL_TOKEN.UNDER_LINE].includes(char);
};
