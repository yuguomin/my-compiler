import { ISimpleScript } from './interface/ISimpleScript';
import { EXIT_REPL_TOKEN, REPL_END_TOKEN } from './constant/InputToken';
import { SimpleParser } from '../syntaxAnalysis/SimpleParser';
import { IASTNode } from '../syntaxAnalysis/interface/IAstNode';
import { VERBOSE_STATUS_ARGV } from './constant/ProcessArgv';
import readline from 'readline';
import { ASTNodeType } from '../syntaxAnalysis/enum/ASTNodeType';
import { SPECIAL_TOKEN } from '../common/constant/SpecialToken';
import { VeriableMap } from '../variableMap/VeriableMap';

export class SimpleScript implements ISimpleScript {
  constructor() {
    this.isVerbose = process.argv.slice(2)[0] === VERBOSE_STATUS_ARGV;
    this.initREPL();
    this.startREPL();
  }

  private REPL: readline.Interface;
  private code: string = '';
  private isVerbose: boolean = false;
  private veriableMap = new VeriableMap();

  private initREPL = () => {
    this.REPL = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public startREPL() {
    if (this.isVerbose) { console.log('verbose mode'); }
    console.log(`Let's test your script language~ Please input \n`);
    this.REPL.on('line', (input) => {
      if (input === EXIT_REPL_TOKEN) {
        this.closeREPL();
      }
      this.code += input + '\n';
      if (input[input.length - 1] === REPL_END_TOKEN) {
        this.parseScript();
      }
    });
  }

  public parseScript() {
    const rootNode = new SimpleParser(this.code).getRootNode();
    if (!rootNode) {
      console.log(`warning: Can't parse script.`);
      return;
    }
    this.evaluate(rootNode);
    this.code = '';
  }

  public evaluate(node: IASTNode, indent: string = '') {
    let result: number | null = null;
    let child1: IASTNode | null = null;
    let child2: IASTNode | null = null;
    let value1: number = 0;
    let value2: number = 0;
    let veriableName: string = '';
    let veriableValue: number | null = null;
    if (this.isVerbose) { console.log(indent + 'Calculating: ' + node.getType()); }
    switch (node.getType()) {
      case ASTNodeType.Program:
        node.getChildren().forEach((child) => {
          result = this.evaluate(child, indent + '\t');
        });
        break;
      case ASTNodeType.Additive:
        child1 = node.getChildren()[0];
        value1 = this.evaluate(child1, indent + '\t');
        child2 = node.getChildren()[1];
        value2 = this.evaluate(child2, indent + '\t');
        result = node.getText() === SPECIAL_TOKEN.PLUS ?
          value1 + value2 : value1 - value2;
        break;
      case ASTNodeType.Multiplicative:
        child1 = node.getChildren()[0];
        value1 = this.evaluate(child1, indent + '\t');
        child2 = node.getChildren()[1];
        value2 = this.evaluate(child2, indent + '\t');
        result = node.getText() === SPECIAL_TOKEN.STAR ?
          value1 * value2 : value1 / value2;
        break;
      case ASTNodeType.Identifier:
        // get Identifier value
        veriableName = node.getText() || '';
        if (this.veriableMap.containsKey(veriableName)) {
          // TODO: this way will type change, if not number type, need dispose
          console.log('this.veriableMap.get(veriableName)', this.veriableMap.get(veriableName));
          result = this.getRealValue(this.veriableMap.get(veriableName));
        } else {
          throw new Error(`unknown variable: ${veriableName}`);
        }
        break;
      case ASTNodeType.NumberLiteral:
        result = this.getRealValue(node.getText());
        break;
      case ASTNodeType.AssignmentStmt:
        veriableName = node.getText() || '';
        if (!this.veriableMap.containsKey(veriableName)) {
          throw new Error(`unknown variable: ${veriableName}`);
        }
      case ASTNodeType.VariableDeclare:
        veriableName = node.getText() || '';
        if (node.getChildren().length > 0) {
          const child = node.getChildren()[0];
          result = this.evaluate(child, indent + "\t");
          veriableValue = result;
        }
        this.veriableMap.push(veriableName, veriableValue);
        break;
    }
    if (this.isVerbose) {
      console.log(indent + 'Result: ' + result);
    } else {
      console.log('result', result);
    }
    return result;
  }

  public closeREPL() {
    console.log('good bye~');
    this.REPL.close();
  }

  private getRealValue = (value: any) => {
    if(value === null) {
      return null;
    }
    return Number(value);
  }
}

new SimpleScript();