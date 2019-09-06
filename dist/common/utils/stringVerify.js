"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlpha = (singleChar) => {
    return /[a-zA-Z]/.test(singleChar);
};
exports.isDight = (singleChar) => {
    return /[0-9]/.test(singleChar);
};
exports.isAssignment = (singleChar) => {
    return /^=$/.test(singleChar);
};
exports.isGT = (singleChar) => {
    return /^>$/.test(singleChar);
};
exports.isBlank = (singleChar) => {
    return /\s/.test(singleChar);
};
