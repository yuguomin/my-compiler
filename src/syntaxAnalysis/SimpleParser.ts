import { SimpleASTNode } from './SimpleASTNode';
import { ASTNodeType } from './enum/ASTNodeType';
import { SimpleLexer } from '../lexicalAnalysis/SimpleLexer';
import { ITokenReader } from '../lexicalAnalysis/interface/ITokenReader';
import { ISimpleParser } from './interface/ISimpleParser';
import { IASTNode } from './interface/IAstNode';
import { TokenType } from '../lexicalAnalysis/enum/TokenType';

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

export class SimpleParser implements ISimpleParser {
  constructor(code: string) {
    this.tokenReader = this.getTokenReader(code);
    this.rootNode = this.syntaxParse();
  }

  private tokenReader: ITokenReader | null = null;
  private rootNode: IASTNode | null = null;

  private getTokenReader: (code: string) => ITokenReader = (code) => {
    return new SimpleLexer(code).getTokenReader();
  }

  private syntaxParse = () => {
    const node = new SimpleASTNode(ASTNodeType.Program, 'pwc');
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
        } else {
          throw new Error('unknown statement');
        }
      }
    }
    return node;
  }

  private variableDeclare: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
    let node: IASTNode | null = null;
    let nodeText: string = '';
    let token = tokenReader.peek();
    if (token && token.getType() === TokenType.VariableIdentifier) {
      tokenReader.read();
      token = tokenReader.peek();
      if (token && token.getType() === TokenType.Identifier) {
        token = tokenReader.read();
        nodeText = token ? token.getText() : '';
        node = new SimpleASTNode(ASTNodeType.VariableDeclare, nodeText);
        token = tokenReader.peek();
        if (token && token.getType() === TokenType.Assignment) {
          tokenReader.read();
          // Only expressions are currently supported，can add string boolean and so on
          const child = this.additive(tokenReader);
          if (child) {
            node.append2Child(child);
          } else {
            throw new Error('invalide variable initialization, expecting an expression');
          }
        }
      } else {
        throw new Error(`variable name expected`);
      }
    }
    if (node) {
      token = tokenReader.peek();
      if (token && token.getType() === TokenType.Semicolon) {
        tokenReader.read();
      } else {
        throw new Error('invalid statement, expecting semicolon');
      }
    }
    return node;
  }

  private expressionStatement: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
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
  }

  private assignmentStatement: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
    let node: IASTNode | null = null;
    let token = tokenReader.peek();
    if (token && token.getType() === TokenType.Identifier) {
      tokenReader.read();
      node = new SimpleASTNode(ASTNodeType.Identifier, token.getText());
      token = tokenReader.peek();
      if (token && token.getType() === TokenType.Assignment) {
        tokenReader.read();
        let child = this.additive(tokenReader);
        if (child) {
          node.append2Child(child);
          this.isSemicolonToken(tokenReader, () => {
            throw new Error('invalid statement, expecting semicolon');
          });
        } else {
          throw new Error('invalide assignment statement, expecting an expression');
        }
      } else {
        tokenReader.unRead();
        node = null;
      }
    }
    return node;
  }

  /**
   * @description Analysis of additive expression
   * additive -> multiplicative (('+' | '-') multiplicative)*
   */
  private additive: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
    let child1 = this.multiplicative(tokenReader);
    let node = child1;

    while (child1) {
      let token = tokenReader.peek();
      const tokenType = token ? token.getType() : null;
      if (tokenType && [TokenType.Plus, TokenType.Minus].includes(tokenType)) {
        token = tokenReader.read();
        const child2 = this.multiplicative(tokenReader);
        if (child2) {
          const tokenText = token ? token.getText() : '';
          node = new SimpleASTNode(ASTNodeType.Additive, tokenText)
          node.append2Child(child1);
          node.append2Child(child2);
          child1 = node;
        } else {
          throw new Error('invalid additive expression, expecting the right part.');
        }
      } else { break; }
    }
    return node;
  }

  /**
   * @description Analysis of multiplicative expression
   * multiplicative -> primary (('* ' | '/') primary)*
   */
  private multiplicative: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
    let child1 = this.primary(tokenReader);
    let node = child1;

    while (child1) {
      let token = tokenReader.peek();
      const tokenType = token ? token.getType() : null;
      if (tokenType && [TokenType.Star, TokenType.Slash].includes(tokenType)) {
        token = tokenReader.read();
        const child2 = this.primary(tokenReader);
        if (child2) {
          const tokenText = token ? token.getText() : '';
          node = new SimpleASTNode(ASTNodeType.Multiplicative, tokenText);
          node.append2Child(child1);
          node.append2Child(child2);
          child1 = node;
        } else {
          throw new Error('invalid multiplicative expression, expecting the right part.');
        }
      } else { break; }
    }
    return node;
  }

  /**
   * @description Analysis of primary expression
   * primary -> number | Id | (additive)
   */
  private primary: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
    let node: IASTNode | null = null;
    let token = tokenReader.peek();
    if (token) {
      const tokenType = token.getType();
      if (tokenType === TokenType.NumberLiteral) {
        tokenReader.read();
        node = new SimpleASTNode(ASTNodeType.NumberLiteral, token.getText());
      } else if (tokenType === TokenType.Identifier) {
        tokenReader.read();
        node = new SimpleASTNode(ASTNodeType.Identifier, token.getText());
      } else if (tokenType === TokenType.LeftParen) {
        tokenReader.read();
        node = this.additive(tokenReader);
        if (node) {
          token = tokenReader.peek();
          if (token && token.getType() === TokenType.RightParen) {
            tokenReader.read();
          } else {
            throw new Error('expecting right parenthesis');
          }
        } else {
          throw new Error('expecting an additive expression inside parenthesis');
        }
      }
    }
    return node;
  }

  private isSemicolonToken = (tokenReader: ITokenReader, unSemicolonCb = () => {}) => {
    const token = tokenReader.peek();
    if (token != null && token.getType() == TokenType.Semicolon) {
      tokenReader.read();
    } else { unSemicolonCb(); }
  }

  public dumpAST = (indent: string = '', rootNode: IASTNode | null = this.rootNode) => {
    if (rootNode) {
      console.log(`${indent}${rootNode.getType()} ${rootNode.getText()}`);
      rootNode.getChildren().forEach((child) => {
        this.dumpAST(indent + '\t', child);
      });
    }
  }
}