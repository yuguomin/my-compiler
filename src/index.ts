import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";

const assignmentToken = new SimpleLexer('var  asd1<=>===123;');
const compareToken = new SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');

console.log('code:', assignmentToken.getCode());
assignmentToken.dump();
console.log('\ncode:', compareToken.getCode());
compareToken.dump();
console.log('\ncode:', calculateToken.getCode());
calculateToken.dump();