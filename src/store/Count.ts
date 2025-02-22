// import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
} from "../whtch";
class Count {
  constructor() {
    // makeAutoObservable(this);
    makeObservable(this, {
      num: observable,
      add: action,
    });
  }
  num = 0;
  //   listeners: (() => void | unknown)[] = [];
  add = () => {
    this.num++;
    console.log("exec");
    // this.listeners[0]();
  };

  //   subscribe = (listener: () => void) => {
  //     this.listeners.push(listener);
  //   };
}

const count = new Count();

export default count;

console.log(count, "count");
