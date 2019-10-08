"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleLexer_1 = require("./lexicalAnalysis/SimpleLexer");
const SimpleParser_1 = require("./syntaxAnalysis/SimpleParser");
const SimpleCalculator_1 = require("./syntaxCalculator/SimpleCalculator");
/**
 * @description test token parse
 */
const assignmentToken = new SimpleLexer_1.SimpleLexer('var 1$asd_1<=>===123;');
const compareToken = new SimpleLexer_1.SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer_1.SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');
// console.log('code:', assignmentToken.getCode());
// assignmentToken.dump();
// console.log('\ncode:', compareToken.getCode());
// compareToken.dump();
// console.log('\ncode:', calculateToken.getCode());
// calculateToken.dump();
/**
 * @description test syntax parse
 */
const parser1 = new SimpleParser_1.SimpleParser('var a = 1 + (3 + 2) * 77 - 4;');
const parser2 = new SimpleParser_1.SimpleParser('a = 1 + (3 + 2) * 77 - 4;');
// const parser3 = new SimpleParser('1 + (a + 2) * 77 - 4;a=1;');
const parser3 = new SimpleParser_1.SimpleParser('var a; 1a = 1;');
// parser1.dumpAST();
// parser2.dumpAST();
parser3.dumpAST();
/**
 * @description use syntax parse get expression calculator
 */
const calculator1 = new SimpleCalculator_1.SimpleCalculator('1+1;');
const calculator2 = new SimpleCalculator_1.SimpleCalculator('1 + 4 * (3 / 2);');
const calculator3 = new SimpleCalculator_1.SimpleCalculator('(1 + 3) * 3;');
const calculator4 = new SimpleCalculator_1.SimpleCalculator('1 + 13 * (23 - 34) / 12 + 21;');
// calculator1.evaluate();
// calculator2.evaluate();
// calculator3.evaluate();
// calculator4.evaluate();
