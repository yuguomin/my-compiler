"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleASTNode_1 = require("./SimpleASTNode");
const ASTNodeType_1 = require("./enum/ASTNodeType");
const SimpleLexer_1 = require("../lexicalAnalysis/SimpleLexer");
const TokenType_1 = require("../lexicalAnalysis/enum/TokenType");
/**
 * @description write a syntax analyzer
 * use to get a root node
 * can parse:
 * programm -> initializeStatement | expressionStatement | assignmentStatement
 * initializeStatement -> 'var' Id ( '=' additive) ';'
 * additive -> multiplicative (('+' | '-') multiplicative)*
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
                    if (childNode === null) {
                        childNode = this.assignmentStatement(this.tokenReader);
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
                        // Only expressions are currently supported，can add string boolean and so on
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
            let node = this.additive(tokenReader);
            // verify next token is semicolon
            if (node) {
                this.isSemicolonToken(tokenReader, () => {
                    node = null;
                    tokenReader.setPosition(pos);
                });
            }
            return node;
        };
        this.assignmentStatement = (tokenReader) => {
            let node = null;
            let token = tokenReader.peek();
            if (token && token.getType() === TokenType_1.TokenType.Identifier) {
                tokenReader.read();
                node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Identifier, token.getText());
                token = tokenReader.peek();
                if (token && token.getType() === TokenType_1.TokenType.Assignment) {
                    tokenReader.read();
                    let child = this.additive(tokenReader);
                    if (child) {
                        node.append2Child(child);
                        this.isSemicolonToken(tokenReader, () => {
                            throw new Error('invalid statement, expecting semicolon');
                        });
                    }
                    else {
                        throw new Error('invalide assignment statement, expecting an expression');
                    }
                }
                else {
                    tokenReader.unRead();
                    node = null;
                }
            }
            return node;
        };
        /**
         * @description Analysis of additive expression
         * additive -> multiplicative (('+' | '-') multiplicative)*
         */
        this.additive = (tokenReader) => {
            let child1 = this.multiplicative(tokenReader);
            let node = child1;
            while (child1) {
                let token = tokenReader.peek();
                const tokenType = token ? token.getType() : null;
                if (tokenType && [TokenType_1.TokenType.Plus, TokenType_1.TokenType.Minus].includes(tokenType)) {
                    token = tokenReader.read();
                    const child2 = this.multiplicative(tokenReader);
                    if (child2) {
                        const tokenText = token ? token.getText() : '';
                        node = new SimpleASTNode_1.SimpleASTNode(ASTNodeType_1.ASTNodeType.Additive, tokenText);
                        node.append2Child(child1);
                        node.append2Child(child2);
                        child1 = node;
                    }
                    else {
                        throw new Error('invalid additive expression, expecting the right part.');
                    }
                }
                else {
                    break;
                }
            }
            return node;
        };
        /**
         * @description Analysis of multiplicative expression
         * multiplicative -> primary (('* ' | '/') primary)*
         */
        this.multiplicative = (tokenReader) => {
            let child1 = this.primary(tokenReader);
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
                        child1 = node;
                    }
                    else {
                        throw new Error('invalid multiplicative expression, expecting the right part.');
                    }
                }
                else {
                    break;
                }
            }
            return node;
        };
        /**
         * @description Analysis of primary expression
         * primary -> number | Id | (additive)
         */
        this.primary = (tokenReader) => {
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
                else if (tokenType === TokenType_1.TokenType.LeftParen) {
                    tokenReader.read();
                    node = this.additive(tokenReader);
                    if (node) {
                        token = tokenReader.peek();
                        if (token && token.getType() === TokenType_1.TokenType.RightParen) {
                            tokenReader.read();
                        }
                        else {
                            throw new Error('expecting right parenthesis');
                        }
                    }
                    else {
                        throw new Error('expecting an additive expression inside parenthesis');
                    }
                }
            }
            return node;
        };
        this.isSemicolonToken = (tokenReader, unSemicolonCb = () => { }) => {
            const token = tokenReader.peek();
            if (token != null && token.getType() == TokenType_1.TokenType.Semicolon) {
                tokenReader.read();
            }
            else {
                unSemicolonCb();
            }
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
