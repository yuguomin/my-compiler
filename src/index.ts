import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";
import { SimpleParser } from "./syntaxAnalysis/SimpleParser";

const assignmentToken = new SimpleLexer('var 1$asd_1<=>===123;');
const compareToken = new SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');

// console.log('code:', assignmentToken.getCode());
// assignmentToken.dump();
// console.log('\ncode:', compareToken.getCode());
// compareToken.dump();
// console.log('\ncode:', calculateToken.getCode());
// calculateToken.dump();

const assignmentParser = new SimpleParser('var $_asb = 1;');

assignmentParser.dumpAST();