import { ISimpleScript } from './interface/ISimpleScript';
import readline from 'readline';
import { EXIT_REPL_TOKEN, REPL_END_TOKEN } from './constant/InputToken';
import { SimpleParser } from '../syntaxAnalysis/SimpleParser';

export class SimpleScript implements ISimpleScript {
  constructor() {
    this.initREPL();
    this.startREPL();
  }

  private REPL: readline.Interface;
  private code: string = '';

  private initREPL = () => {
    this.REPL = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public startREPL() {
    console.log(`Let's test your script language~ \nplease input \n`);
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

  public closeREPL() {
    console.log('good bye~');
    this.REPL.close();
  }

  public parseScript() {
    console.log('code', this.code);
    new SimpleParser(this.code).dumpAST();
  }
}

new SimpleScript();