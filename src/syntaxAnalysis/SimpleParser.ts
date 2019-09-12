import { SimpleASTNode } from "./SimpleASTNode";
import { ASTNodeType } from "./enum/ASTNodeType";

/** 
 * @description write a syntax analyzer
 * can parse:
 * initializeStatement | assignmentStatement | expressionStatement
 */

 export class SimpleParser {
  constructor() {
    new SimpleASTNode(ASTNodeType.Program, '');
  }
 }