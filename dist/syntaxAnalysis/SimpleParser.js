"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleASTNode_1 = require("./SimpleASTNode");
const ASTNodeType_1 = require("./enum/ASTNodeType");
const SimpleLexer_1 = require("../lexicalAnalysis/SimpleLexer");
const TokenType_1 = require("../lexicalAnalysis/enum/TokenType");
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
            const node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Program, 'pwc');
            if (this.tokenReader) {
                if (this.tokenReader.peek()) {
                    // test every parse, no success will return null, test next 
                    let childNode = this.variableDeclare(this.tokenReader);
                    if (childNode) {
                        node.append2Child(childNode);
                    }
                }
            }
            return node;
        };
        this.variableDeclare = (tokenReader) => {
            let node = null;
            let nodeText = '';
            let token = tokenReader.peek();
            if (token && token.getType() === TokenType_1.TokenType.VariableIdentifier) {
                tokenReader.read();
                token = tokenReader.peek();
                if (token && token.getType() === TokenType_1.TokenType.Identifier) {
                    token = tokenReader.read();
                    nodeText = token ? token.getText() : '';
                    node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.VariableDeclare, nodeText);
                    token = tokenReader.peek();
                    if (token && token.getType() === TokenType_1.TokenType.Assignment) {
                        tokenReader.read();
                        const child = this.additive(tokenReader);
                        if (child) {
                            node.append2Child(child);
                        }
                        else {
                            throw new Error("invalide variable initialization, expecting an expression");
                        }
                    }
                }
                else {
                    throw new Error(`variable name expected`);
                }
            }
            if (node) {
                token = tokenReader.peek();
                if (token && token.getType() === TokenType_1.TokenType.Semicolon) {
                    tokenReader.read();
                }
                else {
                    throw new Error("invalid statement, expecting semicolon");
                }
            }
            return node;
        };
        this.additive = (tokenReader) => {
            tokenReader.read();
            return new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.NumberLiteral, '123');
        };
        this.dumpAST = (indent = '', rootNode = this.rootNode) => {
            if (rootNode) {
                console.log(`${indent}${rootNode.getType()} ${rootNode.getText()}`);
                rootNode.getChildren().forEach((child) => {
                    this.dumpAST(indent + '\t', child);
                });
            }
        };
        this.tokenReader = this.getTokenReader(code);
        this.rootNode = this.syntaxParse();
    }
}
exports.SimpleParser = SimpleParser;
