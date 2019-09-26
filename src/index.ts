import { SimpleLexer } from './lexicalAnalysis/SimpleLexer';
import { SimpleParser } from './syntaxAnalysis/SimpleParser';
import { SimpleCalculator } from './syntaxCalculator/SimpleCalculator';

/**
 * @description test token parse
 */ 

const assignmentToken = new SimpleLexer('var 1$asd_1<=>===123;');
const compareToken = new SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');

// console.log('code:', assignmentToken.getCode());
// assignmentToken.dump();
// console.log('\ncode:', compareToken.getCode());
// compareToken.dump();
// console.log('\ncode:', calculateToken.getCode());
// calculateToken.dump();


/**
 * @description test syntax parse
 */ 

const parser1 = new SimpleParser('var a = 1 + (3 + 2) * 77 - 4;');
const parser2 = new SimpleParser('a = 1 + (3 + 2) * 77 - 4;');
const parser3 = new SimpleParser('1 + (3 + 2) * 77 - 4;');

// parser1.dumpAST();
// parser2.dumpAST();
// parser3.dumpAST();

/**
 * @description use syntax parse get expression calculator
 */ 

const calculator1 = new SimpleCalculator('1+1;');
const calculator2 = new SimpleCalculator('1 + 4 * (3 / 2);');
const calculator3 = new SimpleCalculator('(1 + 3) * 3;');
const calculator4 = new SimpleCalculator('1 + 13 * (23 - 34) / 12 + 21;');

// calculator1.evaluate();
// calculator2.evaluate();
// calculator3.evaluate();
calculator4.evaluate();