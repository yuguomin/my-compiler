"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showError = (errorMsg) => {
    new Error(errorMsg);
    console.error(errorMsg);
};
