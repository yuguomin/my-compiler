"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleASTNode_1 = require("./SimpleASTNode");
const ASTNodeType_1 = require("./enum/ASTNodeType");
const SimpleLexer_1 = require("../lexicalAnalysis/SimpleLexer");
/**
 * @description write a syntax analyzer
 * can parse:
 * initializeStatement | assignmentStatement | expressionStatement
 * will get a root node
 */
class SimpleParser {
    constructor(code) {
        this.tokenReader = null;
        this.rootNode = null;
        this.getTokenReader = (code) => {
            return new SimpleLexer_1.SimpleLexer(code).getTokenReader();
        };
        this.syntaxParse = () => {
            const node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Program, 'program');
            return node;
        };
        this.dumpAST = (rootNode = this.rootNode) => {
            if (rootNode) {
                console.log(rootNode.getType() + " " + rootNode.getText());
                rootNode.getChildren().forEach((child) => {
                    this.dumpAST(child);
                });
            }
        };
        this.tokenReader = this.getTokenReader(code);
        this.rootNode = this.syntaxParse();
    }
}
exports.SimpleParser = SimpleParser;
