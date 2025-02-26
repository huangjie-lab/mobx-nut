import { AnnotationsMap } from "mobx";
import { addHiddenProp, isPlainObject, ownKeys } from "./utils";
import { Annotation, createAutoAnnotation } from "./annotation";
import { $mobx, ObservableValue } from "./observablevalue";

export function makeObservable<
  T extends object,
  AdditionalKeys extends PropertyKey = never
>(target: any, annotations?: AnnotationsMap<T, NoInfer<AdditionalKeys>>) {
  const adm: ObservableObjectAdministration = asObservableObject(target)[$mobx];

  ownKeys(annotations).forEach((key) => {
    adm.make_(key, annotations[key]);
  });

  return target;
}

function asObservableObject(target: any) {
  const adm = new ObservableObjectAdministration(target);
  // 把 adm 添加到target上，且不可枚举
  addHiddenProp(target, $mobx, adm);
  return target;
}

export class ObservableObjectAdministration {
  isPlainObject_: boolean;

  constructor(public target_: any, public values_: Map<any, any> = new Map()) {
    this.isPlainObject_ = isPlainObject(this.target_);
  }

  make_(key: PropertyKey, annotation: Annotation | boolean) {
    if (annotation === true) {
      annotation = createAutoAnnotation();
    }
    let source = this.target_;

    // 沿着原型链去找直到 Object.prototype 顶端
    while (source && source !== Object.prototype) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (descriptor) {
        annotation.make_(this, key, descriptor);
      }

      source = Object.getPrototypeOf(source);
    }
  }

  // 定义拦截 set方法 可观察变量，new ObservableValue
  defineObservableProperty_(key: PropertyKey, value: any) {
    // 1. 定义拦截可观察变量
    const cachedObservablePropDescriptor =
      getCachedObservablePropDescriptor(key);

    const descriptor = {
      configurable: this.isPlainObject_,
      enumerable: true,
      get: cachedObservablePropDescriptor.get,
      set: cachedObservablePropDescriptor.set,
    };

    Object.defineProperty(this.target_, key, descriptor);

    // 2. 对简单的value进行一层包装 用类实现 new ObservableValue
    const observable = new ObservableValue(value);
    // Map
    this.values_.set(key, observable);
  }

  // 普通属性 非标记observable的属性
  defineProperty_(key: PropertyKey, descriptor: PropertyDecorator) {
    Object.defineProperty(this.target_, key, descriptor);
    return true;
  }

  getObservablePropValue_(key: PropertyKey) {
    return this.values_.get(key).get();
  }

  // 真正的拦截set
  setObservablePropValue_(key: PropertyKey, newValue: any) {
    const observable: ObservableValue = this.values_.get(key);
    observable.setNewValue_(newValue);
    return true;
  }
}

const keysSymbol = Symbol("mobx-keys");
export function makeAutoObservable(target: any) {
  const adm: ObservableObjectAdministration = asObservableObject(target)[$mobx];

  if (!target[keysSymbol]) {
    const proto = Object.getPrototypeOf(target);
    const keys = new Set([...ownKeys(target), ...ownKeys(proto)]);
    keys.delete("constructor");
    keys.delete($mobx);
    // const keys = Object.getOwnPropertyNames(target) 该方法不行 会漏掉原型链上的方法
    addHiddenProp(proto, keysSymbol, keys);
  }

  // console.log(target, "target");
  // console.log(target[keysSymbol], "target[keysSymbol]");

  // target[keysSymbol] 会去 proto 上找
  target[keysSymbol].forEach((key: string) => adm.make_(key, true));

  return adm;
}

const descriptorCache = Object.create(null);

function getCachedObservablePropDescriptor(key: PropertyKey) {
  return (descriptorCache[key] = {
    // this 谁调用指向谁 todo... ?
    get() {
      // 页面在读数据的时候 this 指向 count 实例 即 target/this.target_
      console.log(this, "this");
      return this[$mobx].getObservablePropValue_(key);
    },
    set(value: any) {
      return this[$mobx].setObservablePropValue_(key, value);
    },
  });
}
