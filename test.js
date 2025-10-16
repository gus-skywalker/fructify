const { fructify, fructifyObject } = require('./fructify');

const data = {
  name: null,
  age: 28,
  city: undefined,
  address: { street: null, zip: "01000" }
};

console.log(fructify(data));
