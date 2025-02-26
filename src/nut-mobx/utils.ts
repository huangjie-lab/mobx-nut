// 返回指定对象上一个自有属性对应的属性描述符
export const getDescriptor = Object.getOwnPropertyDescriptor;

const plainObjectString = Object.toString();
export const objectPrototype = Object.prototype;
export const defineProperty = Object.defineProperty;

export function isObject(value: any) {
  return value !== null && typeof value === "object";
}

export function isPlainObject(value: any) {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  const protoConstructor =
    Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return (
    typeof protoConstructor === "function" &&
    protoConstructor.toString() === plainObjectString
  );
}

export function isString(value: any): value is string {
  return typeof value === "string";
}

export function isFunction(fn: any) {
  return typeof fn === "function";
}

// declare type PropertyKey = string | number | symbol;
export function hasProp(
  target: Record<PropertyKey, any>,
  prop: PropertyKey
): boolean {
  return objectPrototype.hasOwnProperty.call(target, prop);
}

// 让某个属性变为不可枚举 ？ todo...
export function addHiddenProp(object: any, propName: PropertyKey, value: any) {
  defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value,
  });
}

// 获取对象的属性 good...
const hasGetOwnPropertySymbols =
  typeof Object.getOwnPropertySymbols !== "undefined";

// From Immer utils
// Returns all own keys, including non-enumerable and symbolic

// Reflect.ownKeys返回不可枚举的属性 包括symbol
// Object.getOwnPropertyNames返回可枚举的属性 不包括symbol
// Object.getOwnPropertySymbols返回symbol

export const ownKeys: (target: any) => Array<string | symbol> =
  typeof Reflect !== "undefined" && Reflect.ownKeys
    ? Reflect.ownKeys
    : hasGetOwnPropertySymbols
    ? (obj) =>
        Object.getOwnPropertyNames(obj).concat(
          Object.getOwnPropertySymbols(obj) as any
        )
    : /* istanbul ignore next */ Object.getOwnPropertyNames;
