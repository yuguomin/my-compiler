import { IASTNode } from './IAstNode';

export interface ISimpleParser {
  getRootNode(): IASTNode | null;
  dumpAST(indent?: string, rootNode?: IASTNode | null): void;
}