"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringVerify_1 = require("../../common/utils/stringVerify");
const lexicalAnalysis_1 = require("../contants/lexicalAnalysis");
exports.isVariableFollow = (char) => {
    return stringVerify_1.isAlpha(char) || stringVerify_1.isDigit(char) || [lexicalAnalysis_1.SPECIAL_TOKEN.DOLLAR_SIGN, lexicalAnalysis_1.SPECIAL_TOKEN.UNDER_LINE].includes(char);
};
