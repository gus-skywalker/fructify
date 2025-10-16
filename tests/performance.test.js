// tests/performance.test.js
const { fructify, fructifyObject } = require('../fructify');

console.time('fructify-performance');
const largeArray = Array(1000).fill(null).map((_, i) => 
  i % 5 === 0 ? null : { value: i, nested: i % 3 === 0 ? undefined : i }
);

const result = fructify(largeArray);
console.timeEnd('fructify-performance');
console.log(`Processados ${largeArray.length} elementos`);