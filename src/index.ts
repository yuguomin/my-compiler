import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";

const testLexer = new SimpleLexer('int asd1 >= 123');
const data = new SimpleLexer('asdddd = 123');

testLexer.dump();
// data.getTokens();