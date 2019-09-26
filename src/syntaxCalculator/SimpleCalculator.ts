import { ISimpleCalculator } from './interface/ISimpleCalculator';
import { IASTNode } from '../syntaxAnalysis/interface/IAstNode';
import { SimpleParser } from '../syntaxAnalysis/SimpleParser';
import { ASTNodeType } from '../syntaxAnalysis/enum/ASTNodeType';
import { SPECIAL_TOKEN } from '../common/constant/SpecialToken';

export class SimpleCalculator implements ISimpleCalculator {
  constructor(code: string) {
    this.rootNode = new SimpleParser(code).getRootNode();
  }

  public rootNode: IASTNode | null = null;

  public evaluate: (node?: IASTNode | null, indent?: string) => number = (node = this.rootNode, indent = '') => {
    let result = 0;
    let child1: IASTNode | null = null;
    let child2: IASTNode | null = null;
    let value1: number = 0;
    let value2: number = 0;
    if (!node) { return result; }
    console.log(indent + 'Calculating: ' + node.getType());
    switch (node.getType()) {
      case ASTNodeType.Program:
        node.getChildren().forEach((child) => {
          result = this.evaluate(child, indent + '\t');
        });
        break;
      case ASTNodeType.Additive:
        child1 = node.getChildren()[0];
        value1 = this.evaluate(child1, indent + '\t')
        child2 = node.getChildren()[1];
        value2 = this.evaluate(child2, indent + '\t')
        if (node.getText() === SPECIAL_TOKEN.PLUS) {
          result = value1 + value2;
        } else {
          result = value1 - value2;
        }
        break;
      case ASTNodeType.Multiplicative:
        child1 = node.getChildren()[0];
        value1 = this.evaluate(child1, indent + '\t');
        child2 = node.getChildren()[1];
        value2 = this.evaluate(child2, indent + '\t');
        if (node.getText() === SPECIAL_TOKEN.STAR) {
          result = value1 * value2;
        } else {
          result = value1 / value2;
        }
        break;
      case ASTNodeType.NumberLiteral:
        result = Number(node.getText());
        break;
    }
    console.log(indent + "Result: " + result);
    return result;
  }
}