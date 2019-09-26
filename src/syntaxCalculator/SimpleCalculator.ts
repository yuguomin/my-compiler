import { ISimpleCalculator } from './interface/ISimpleCalculator';
import { IASTNode } from '../syntaxAnalysis/interface/IAstNode';
import { SimpleParser } from '../syntaxAnalysis/SimpleParser';
import { ASTNodeType } from '../syntaxAnalysis/enum/ASTNodeType';

export class SimpleCalculator implements ISimpleCalculator {
  constructor(code: string) {
    this.rootNode = new SimpleParser(code).getRootNode();
  }

  public rootNode: IASTNode | null = null;

  public evaluate: (node?: IASTNode | null, indent?: string) => number = (node = this.rootNode, indent = '') => {
    let result = 0;
    if (!node) { return result; }
    console.log(indent + 'Calculating: ' + node.getType());
    switch (node.getType()) {
      case ASTNodeType.Program:
        break;
      case ASTNodeType.Additive:
        break;
      case ASTNodeType.Multiplicative:
        break;
      case ASTNodeType.NumberLiteral:
        break;
    }
    return result;
  }
}