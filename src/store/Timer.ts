import { makeAutoObservable } from "mobx";

class Timer {
  constructor() {
    makeAutoObservable(this);
  }
  secondsPassed = 0;
  increaseTimer() {
    this.secondsPassed++;
    console.log("timer exec");
  }
}

export default Timer;
