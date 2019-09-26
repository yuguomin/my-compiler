"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleParser_1 = require("../syntaxAnalysis/SimpleParser");
const ASTNodeType_1 = require("../syntaxAnalysis/enum/ASTNodeType");
class SimpleCalculator {
    constructor(code) {
        this.rootNode = null;
        this.evaluate = (node = this.rootNode, indent = '') => {
            let result = 0;
            if (!node) {
                return result;
            }
            console.log(indent + 'Calculating: ' + node.getType());
            switch (node.getType()) {
                case ASTNodeType_1.ASTNodeType.Program:
                    break;
                case ASTNodeType_1.ASTNodeType.Additive:
                    break;
                case ASTNodeType_1.ASTNodeType.Multiplicative:
                    break;
                case ASTNodeType_1.ASTNodeType.NumberLiteral:
                    break;
            }
            return result;
        };
        this.rootNode = new SimpleParser_1.SimpleParser(code).getRootNode();
    }
}
exports.SimpleCalculator = SimpleCalculator;
