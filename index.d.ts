// index.d.ts - Definições de tipos TypeScript
export interface FructifyOptions {
  replaceFalsy?: boolean;
  customReplacer?: (value: any) => any;
  maxDepth?: number;
}

export function fructify<T>(value: T, options?: FructifyOptions): T;
export function fructifyObject<T extends object>(obj: T, options?: FructifyOptions): T;
export function fructifyMethod(target: any, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor;
export function randomFruit(): string;
export const fruits: string[];

declare const _default: {
  fructify: typeof fructify;
  fructifyObject: typeof fructifyObject;
  fructifyMethod: typeof fructifyMethod;
  randomFruit: typeof randomFruit;
  fruits: typeof fruits;
};

export default _default;