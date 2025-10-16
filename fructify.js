(function (global) {
  'use strict';

  const fruits = ['🍎', '🍌', '🍉', '🍓', '🍍', '🍑', '🥭', '🍒', '🍇', '🥝'];

  function randomFruit() {
    return fruits[Math.floor(Math.random() * fruits.length)];
  }

  /**
   * Replaces null/undefined values with random fruits
   */
  function fructify(value, options = {}) {
    const { 
      replaceFalsy = false, 
      customReplacer = null,
      maxDepth = 10 
    } = options;

    function shouldReplace(v) {
      if (customReplacer) return customReplacer(v);
      return v === null || v === undefined || (replaceFalsy && !v);
    }

    function process(current, depth = 0) {
      // Protection against infinite recursion
      if (depth > maxDepth) {
        console.warn('fructify: Maximum depth reached');
        return current;
      }
      
      if (shouldReplace(current)) {
        return customReplacer ? customReplacer(current) : randomFruit();
      }

      // Arrays
      if (Array.isArray(current)) {
        return current.map(item => process(item, depth + 1));
      }
      
      // Plain objects
      if (typeof current === 'object' && current !== null) {
        // Skip special objects
        if (current instanceof Date || 
            current instanceof RegExp || 
            current instanceof Promise ||
            current.constructor.name !== 'Object') {
          return current;
        }
        
        const result = {};
        for (const [key, val] of Object.entries(current)) {
          result[key] = process(val, depth + 1);
        }
        return result;
      }

      return current;
    }

    return process(value);
  }

  /**
   * More robust Proxy for dynamic value substitution
   */
  function fructifyObject(obj, options = {}) {
    const { replaceFalsy = false } = options;
    
    function createProxy(target) {
      return new Proxy(target, {
        get(target, prop, receiver) {
          // Ignore special properties
          if (typeof prop === 'symbol' || prop in Object.prototype) {
            return Reflect.get(target, prop, receiver);
          }

          const value = Reflect.get(target, prop, receiver);
          
          // Replace problematic values
          if (value === null || value === undefined || (replaceFalsy && !value)) {
            return randomFruit();
          }
          
          // Recursive proxy for nested objects/arrays
          if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
            return createProxy(value);
          }
          
          return value;
        },
        
        set(target, prop, value) {
          return Reflect.set(target, prop, value);
        },
        
        // Improves compatibility with reflection and iteration
        ownKeys(target) {
          return Reflect.ownKeys(target);
        },
        
        getOwnPropertyDescriptor(target, prop) {
          return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        
        has(target, prop) {
          return Reflect.has(target, prop);
        }
      });
    }
    
    return createProxy(obj || {});
  }

  /**
   * Decorator for methods
   * Wraps a method so that its return value is automatically fructified.
   */
  function fructifyMethod(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args) {
      const result = originalMethod.apply(this, args);
      return fructify(result);
    };
    
    return descriptor;
  }

  // Complete API
  const api = { 
    fructify, 
    fructifyObject, 
    fructifyMethod,
    randomFruit,
    fruits // exposed for customization
  };

  // Universal export (UMD)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else if (typeof define === 'function' && define.amd) {
    define(() => api);
  } else {
    global.fructify = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
