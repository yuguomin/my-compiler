"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleASTNode {
    constructor(nodeType, text) {
        this.parentNode = null;
        this.childrenNodes = [];
        this.nodeType = null;
        this.text = null;
        this.getParent = () => {
            return this.parentNode;
        };
        this.setParent = (parentNode) => {
            this.parentNode = parentNode;
        };
        this.getChildren = () => {
            return this.childrenNodes;
        };
        this.getType = () => {
            return this.nodeType;
        };
        this.getText = () => {
            return this.text;
        };
        this.append2Child = (childrenNode) => {
            this.childrenNodes.push(childrenNode);
            childrenNode.setParent(this);
        };
        this.nodeType = nodeType;
        this.text = text;
    }
}
exports.SimpleASTNode = SimpleASTNode;
