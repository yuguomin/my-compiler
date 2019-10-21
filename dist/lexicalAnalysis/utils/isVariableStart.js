"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringVerify_1 = require("../../common/utils/stringVerify");
const SpecialToken_1 = require("../../common/constant/SpecialToken");
exports.isVariableStart = (ch) => {
    return stringVerify_1.isAlpha(ch) || [SpecialToken_1.SPECIAL_TOKEN.DOLLAR_SIGN, SpecialToken_1.SPECIAL_TOKEN.UNDER_LINE].includes(ch);
};
