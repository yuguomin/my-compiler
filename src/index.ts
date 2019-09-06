import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";

const assignmentToken = new SimpleLexer('int asd1 = 123');
const compareToken = new SimpleLexer('asdddd >= 123');
const calculateToken = new SimpleLexer('2 + 3 * 5 / 3 * ( 4 + 6 );');

console.log(assignmentToken.getCode());
assignmentToken.dump();
console.log('\n', compareToken.getCode());
compareToken.dump();
console.log('\n', calculateToken.getCode());
calculateToken.dump();