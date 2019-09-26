import { IASTNode } from './interface/IAstNode';
import { ASTNodeType } from './enum/ASTNodeType';

export class SimpleASTNode implements IASTNode {
  constructor(nodeType: ASTNodeType, text: string | null) {
    this.nodeType = nodeType;
    this.text = text;
  }

  private parentNode: IASTNode | null = null;
  private childrenNodes: IASTNode[] = [];
  private nodeType: ASTNodeType | null = null;
  private text: string | null = null;

  public getParent = () => {
    return this.parentNode;
  }

  public setParent = (parentNode: IASTNode) => {
    this.parentNode = parentNode;
  }

  public getChildren = () => {
    return this.childrenNodes;
  }

  public getType = () => {
    return this.nodeType;
  }

  public getText = () => {
    return this.text;
  }

  public append2Child = (childrenNode: IASTNode) => {
    this.childrenNodes.push(childrenNode);
    childrenNode.setParent(this);
  }
}