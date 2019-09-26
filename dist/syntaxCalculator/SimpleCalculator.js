"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleParser_1 = require("../syntaxAnalysis/SimpleParser");
const ASTNodeType_1 = require("../syntaxAnalysis/enum/ASTNodeType");
const SpecialToken_1 = require("../common/constant/SpecialToken");
class SimpleCalculator {
    constructor(code) {
        this.rootNode = null;
        this.evaluate = (node = this.rootNode, indent = '') => {
            let result = 0;
            let child1 = null;
            let child2 = null;
            let value1 = 0;
            let value2 = 0;
            if (!node) {
                return result;
            }
            console.log(indent + 'Calculating: ' + node.getType());
            switch (node.getType()) {
                case ASTNodeType_1.ASTNodeType.Program:
                    node.getChildren().forEach((child) => {
                        result = this.evaluate(child, indent + '\t');
                    });
                    break;
                case ASTNodeType_1.ASTNodeType.Additive:
                    child1 = node.getChildren()[0];
                    value1 = this.evaluate(child1, indent + '\t');
                    child2 = node.getChildren()[1];
                    value2 = this.evaluate(child2, indent + '\t');
                    if (node.getText() === SpecialToken_1.SPECIAL_TOKEN.PLUS) {
                        result = value1 + value2;
                    }
                    else {
                        result = value1 - value2;
                    }
                    break;
                case ASTNodeType_1.ASTNodeType.Multiplicative:
                    child1 = node.getChildren()[0];
                    value1 = this.evaluate(child1, indent + '\t');
                    child2 = node.getChildren()[1];
                    value2 = this.evaluate(child2, indent + '\t');
                    if (node.getText() === SpecialToken_1.SPECIAL_TOKEN.STAR) {
                        result = value1 * value2;
                    }
                    else {
                        result = value1 / value2;
                    }
                    break;
                case ASTNodeType_1.ASTNodeType.NumberLiteral:
                    result = Number(node.getText());
                    break;
            }
            console.log(indent + "Result: " + result);
            return result;
        };
        this.rootNode = new SimpleParser_1.SimpleParser(code).getRootNode();
    }
}
exports.SimpleCalculator = SimpleCalculator;
