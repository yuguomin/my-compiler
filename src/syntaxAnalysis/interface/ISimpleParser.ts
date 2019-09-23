import { IASTNode } from './IAstNode';

export interface ISimpleParser {
  dumpAST(indent?: string, rootNode?: IASTNode | null): void;
}