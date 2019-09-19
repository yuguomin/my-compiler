import { SimpleASTNode } from "./SimpleASTNode";
import { ASTNodeType } from "./enum/ASTNodeType";
import { SimpleLexer } from "../lexicalAnalysis/SimpleLexer";
import { ITokenReader } from "../lexicalAnalysis/interface/ITokenReader";
import { ISimpleParser } from "./interface/ISimpleParser";
import { IASTNode } from "./interface/IAstNode";

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
    const node = new SimpleASTNode(ASTNodeType.Program, 'program');
    return node;
  }

  public dumpAST = (rootNode: IASTNode | null = this.rootNode) => {
    if (rootNode) {
      console.log(rootNode.getType() + " " + rootNode.getText());
      rootNode.getChildren().forEach((child) => {
        this.dumpAST(child);
      });
    }
  }
 }