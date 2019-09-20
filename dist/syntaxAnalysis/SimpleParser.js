"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleASTNode_1 = require("./SimpleASTNode");
const ASTNodeType_1 = require("./enum/ASTNodeType");
const SimpleLexer_1 = require("../lexicalAnalysis/SimpleLexer");
const TokenType_1 = require("../lexicalAnalysis/enum/TokenType");
/**
 * @description write a syntax analyzer
 * will get a root node
 * can parse:
 * programm -> initializeStatement | expressionStatement | assignmentStatement
 * initializeStatement -> 'var' Id ( '=' additive) ';'
 * addtive -> multiplicative (('+' | '-') multiplicative)*
 * multiplicative -> primary (('* ' | '/') primary)*
 * primary -> number | Id | (additive)
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
                    if (childNode === null) {
                        childNode = this.expressionStatement(this.tokenReader);
                    }
                    if (childNode) {
                        node.append2Child(childNode);
                    }
                    else {
                        throw new Error('unknown statement');
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
                            throw new Error('invalide variable initialization, expecting an expression');
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
                    throw new Error('invalid statement, expecting semicolon');
                }
            }
            return node;
        };
        this.expressionStatement = (tokenReader) => {
            const pos = tokenReader.getPosition();
            const node = this.additive(tokenReader);
            return node;
        };
        /**
         * @description Analysis of additive expression
         */
        this.additive = (tokenReader) => {
            tokenReader.read();
            // return new SimpleASTNode(ASTNodeType.NumberLiteral, '123');
            return null;
        };
        /**
         * @description Analysis of multiplicative expression
         * multiplicative -> primary (('* ' | '/') primary)*
         */
        this.multiplicative = (tokenReader) => {
            const child1 = this.primary(tokenReader);
            let node = child1;
            while (child1) {
                let token = tokenReader.peek();
                const tokenType = token ? token.getType() : null;
                if (tokenType && [TokenType_1.TokenType.Star, TokenType_1.TokenType.Slash].includes(tokenType)) {
                    token = tokenReader.read();
                    const child2 = this.primary(tokenReader);
                    if (child2) {
                        const tokenText = token ? token.getText() : '';
                        node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Multiplicative, tokenText);
                        node.append2Child(child1);
                        node.append2Child(child2);
                    }
                    else {
                        throw new Error('invalid multiplicative expression, expecting the right part.');
                    }
                }
            }
            return node;
        };
        /**
         * @description Analysis of primary expression
         */
        this.primary = (tokenReader) => {
            // tokenReader.read();
            // return new SimpleASTNode(ASTNodeType.NumberLiteral, '123');
            let node = null;
            let token = tokenReader.peek();
            if (token) {
                const tokenType = token.getType();
                if (tokenType === TokenType_1.TokenType.NumberLiteral) {
                    tokenReader.read();
                    node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.NumberLiteral, token.getText());
                }
                else if (tokenType === TokenType_1.TokenType.Identifier) {
                    tokenReader.read();
                    node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Identifier, token.getText());
                }
            }
            return node;
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
