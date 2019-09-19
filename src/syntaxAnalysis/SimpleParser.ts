import { SimpleASTNode } from "./SimpleASTNode";
import { ASTNodeType } from "./enum/ASTNodeType";
import { SimpleLexer } from "../lexicalAnalysis/SimpleLexer";
import { ITokenReader } from "../lexicalAnalysis/interface/ITokenReader";
import { ISimpleParser } from "./interface/ISimpleParser";
import { IASTNode } from "./interface/IAstNode";
import { TokenType } from "../lexicalAnalysis/enum/TokenType";

/** 
 * @description write a syntax analyzer
 * can parse:
 * initializeStatement | assignmentStatement | expressionStatement
 * will get a root node
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
        if (childNode) {
          node.append2Child(childNode);
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
          const child = this.additive(tokenReader);
          if (child) {
            node.append2Child(child);
          } else {
            throw new Error("invalide variable initialization, expecting an expression");
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
        throw new Error("invalid statement, expecting semicolon");
      }
    }
    return node;
  }

  private additive: (tokenReader: ITokenReader) => IASTNode | null = (tokenReader) => {
    tokenReader.read();
    return new SimpleASTNode(ASTNodeType.NumberLiteral, '123');
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