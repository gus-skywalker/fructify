// Simulando um componente React
const ReactExample = {
  userData: {
    name: null,
    email: undefined,
    preferences: { theme: null, language: 'pt' }
  },
  
  render() {
    const safeData = fructify(this.userData);
    return {
      name: safeData.name, // 🍎 ou outra fruta
      email: safeData.email, // 🍌
      theme: safeData.preferences.theme // 🍉
    };
  }
};

console.log('⚛️  Exemplo React:');
console.log(ReactExample.render());