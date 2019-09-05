import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";

const testLexer = new SimpleLexer('asd >= 123');
const data = new SimpleLexer('asdddd = 123');

testLexer.dump();
data.getTokens();