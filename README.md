```markdown
🍉 Fructify

Replace boring null and undefined values with delicious fruit emojis — because life's too short for missing data. 🍎🍌🍇

[![npm version](https://img.shields.io/npm/v/fructify)](https://www.npmjs.com/package/fructify)
[![npm downloads](https://img.shields.io/npm/dm/fructify)](https://www.npmjs.com/package/fructify)
[![license](https://img.shields.io/npm/l/fructify)](LICENSE)

## ✨ What is Fructify?

Fructify is a lightweight JavaScript utility that replaces null, undefined, or even other "falsy" values with random fruit emojis. It's perfect for demos, pre-production environments, or simply making your logs and API responses more… tasty.

## 🚀 Features

- 🍍 Replace null and undefined with random fruits
- 🍑 Optionally replace all falsy values (`""`, `0`, `false`)
- 🍓 Works in both Node.js and browser environments  
- 🍒 Includes a Proxy-based mode for automatic substitution
- 🥝 Safe recursion with maximum depth protection
- 🍊 Custom replacer function for full control
- 🥭 Tiny, dependency-free, and fun!

## 📦 Installation

```bash
npm install fructify
# or
yarn add fructify
```

## 🧩 Basic Usage

```javascript
const { fructify, fructifyObject } = require('fructify');

// Simple replacement
console.log(fructify(null)); // 🍉

// Nested object example
const data = {
  name: null,
  city: 'São Paulo', 
  age: undefined,
};

console.log(fructify(data));
// -> { name: '🍎', city: 'São Paulo', age: '🍌' }

// Proxy mode (dynamic replacement)
const fruity = fructifyObject({ mood: null, level: undefined });
console.log(fruity.mood);  // 🍍
console.log(fruity.level); // 🍓
```

## ⚙️ Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `replaceFalsy` | boolean | `false` | Replace falsy values like `""`, `0`, or `false` |
| `customReplacer` | function | `null` | Define your own replacement logic |
| `maxDepth` | number | `10` | Prevents infinite recursion in nested objects |

**Example:**
```javascript
fructify(data, { replaceFalsy: true });
```

## 🧠 Advanced Usage

### 🎭 Method Wrapping

**Higher-order function** (works everywhere):

```javascript
const { fructify } = require('fructify');

const withFructify = (fn) => (...args) => fructify(fn(...args));

const getUser = withFructify(() => ({ name: null, email: undefined }));
console.log(getUser()); // -> { name: '🍎', email: '🍌' }
```

**Manual method wrapping**:

```javascript
const { fructify } = require('fructify');

class UserService {
  findUser() {
    return { name: null, age: undefined, active: true };
  }
}

// Wrap the method
const originalMethod = UserService.prototype.findUser;
UserService.prototype.findUser = function(...args) {
  const result = originalMethod.apply(this, args);
  return fructify(result);
};

const service = new UserService();
console.log(service.findUser());
// -> { name: '🍒', age: '🍇', active: true }
```

### 🎨 Custom Replacement

```javascript
// Use your own replacement logic
const data = { value: null, items: [] };

const result = fructify(data, {
  customReplacer: (value) => {
    if (value === null) return '🚫';
    if (value === undefined) return '❓'; 
    if (Array.isArray(value) && value.length === 0) return '📭';
    return value;
  }
});

console.log(result);
// -> { value: '🚫', items: '📭' }
```

## 🛠️ Framework Integration

### React Hook

```javascript
import { useMemo } from 'react';
import { fructify } from 'fructify';

export const useFructify = (data, options) => {
  return useMemo(() => fructify(data, options), [data, options]);
};

// Usage in component  
function UserProfile({ userData }) {
  const safeUser = useFructify(userData, { replaceFalsy: true });
  return <div>Hello {safeUser.name}!</div>; // Always shows a fruit 🍎
}
```

### Express.js Middleware

```javascript
const { fructify } = require('fructify');

const fructifyMiddleware = (options) => (req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    if (typeof data === 'object') {
      data = fructify(data, options);
    }
    originalSend.call(this, data);
  };
  next();
};

app.use(fructifyMiddleware({ replaceFalsy: true }));
```

## 🧪 Development

```bash
# Clone and install
git clone <your-repo>
cd fructify
npm install

# Run tests
npm test

# Run demo
node demo.js
```

## 🧃 Why?

Because not everything in life should throw `TypeError: Cannot read properties of null`.

Sometimes, you just need more fruit. 🍑

## 💡 Inspiration & The Null Safety Discussion

### **The Billion-Dollar Mistake**

> "I call it my billion-dollar mistake..." — **Tony Hoare**, inventor of the null reference

While modern languages have built-in null safety, JavaScript developers still face the classic nightmare:

```javascript
user.profile.address.city // 💥 Cannot read properties of null
```

### **Where Fructify Fits**

Fructify bridges the gap between JavaScript's dynamic nature and proper null handling:

```javascript
// Instead of silent failures:
user?.name || 'Unknown' // ❌ What was wrong?

// Fructify tells you exactly what happened:
fructify(user?.name) // ✅ '🍎' = it was null!
```

### **The Philosophy**

| Approach | Philosophy |
|----------|------------|
| **TypeScript** | Prevent errors at compile time |
| **Optional Chaining** | Gracefully handle missing properties |
| **Fructify** | Make invisible problems visible and delightful |

### **Perfect For**
- 🚀 Prototyping & MVP development  
- 🔍 API response exploration
- 🎓 Educational projects
- 🐛 Debugging with visibility

**Because sometimes, the best fix for a technical problem is a creative approach.** 🍎✨

## 💝 Support This Project

Your support helps me maintain Fructify and create more amazing tools!

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-%E2%9D%A4-%23db61a2?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/gus-skywalker)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/gugadam)

## 📄 License

MIT © Gustavo Damasceno
```
