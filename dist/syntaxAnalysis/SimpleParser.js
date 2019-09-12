"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleASTNode_1 = require("./SimpleASTNode");
const ASTNodeType_1 = require("./enum/ASTNodeType");
/**
 * @description write a syntax analyzer
 * can parse:
 * initializeStatement | assignmentStatement | expressionStatement
 */
class SimpleParser {
    constructor() {
        new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Program, '');
    }
}
exports.SimpleParser = SimpleParser;
