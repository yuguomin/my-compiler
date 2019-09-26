import { IASTNode } from '../../syntaxAnalysis/interface/IAstNode';

export interface ISimpleCalculator {
  evaluate(node?: IASTNode | null, indent?: string): number;
}