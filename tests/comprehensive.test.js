const { fructify, fructifyObject } = require('../fructify');

// Testes com estruturas complexas
const complexData = {
  user: null,
  profile: {
    name: undefined,
    contacts: [null, { phone: undefined }],
    settings: { theme: null, notifications: 'enabled' }
  },
  posts: [
    { title: 'Hello', content: null },
    null,
    { title: undefined, comments: [null] }
  ]
};

console.log('🧪 Teste Estrutura Complexa:');
console.log(JSON.stringify(fructify(complexData), null, 2));

// Teste com replaceFalsy
console.log('\n🧪 Teste replaceFalsy:');
const falsyData = { empty: '', zero: 0, false: false, null: null };
console.log(fructify(falsyData, { replaceFalsy: true }));