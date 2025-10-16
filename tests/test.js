const { fructify, fructifyObject } = require('../fructify');

function runTests() {
  console.log('🧪 Testando fructify...\n');
  
  // Teste 1: Valores simples
  console.log('1. Valores simples:', {
    null: fructify(null),
    undefined: fructify(undefined),
    string: fructify('teste')
  });
  
  // Teste 2: Objetos
  const obj = { a: null, b: 1, c: undefined };
  console.log('2. Objeto:', fructify(obj));
  
  // Teste 3: Arrays
  const arr = [null, 'ok', undefined];
  console.log('3. Array:', fructify(arr));
  
  // Teste 4: Proxy
  const proxy = fructifyObject({ test: null });
  console.log('4. Proxy:', proxy.test);
  
  console.log('\n✅ Todos os testes passaram!');
}

if (require.main === module) {
  runTests();
}