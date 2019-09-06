import { SimpleLexer } from "./lexicalAnalysis/SimpleLexer";

const assignmentToken = new SimpleLexer('int asd1 = 123');
const compareToken = new SimpleLexer('asdddd >= 123');

// assignmentToken.dump();
compareToken.dump();