import { useEffect, useState } from "react";
import Timer from "../store/Timer";
import { observable, observer, useLocalObservable } from "../whtch";

function TimerPage() {
  // 使用这种方式 每次组件重新渲染 timer都会初始化 所以看不到组件更新
  // 那些通过计算得到的值才可以放到组件内部初始化
  // const timer = new Timer();

  console.log("timerPage rendered");

  //   方案一
  //   const [timer] = useState(() => {
  //     console.log("new Timer()");
  //     return new Timer();
  //   });

  //   方案二
  //   const [timer] = useState(() =>
  //     c({
  //       secondsPassed: 0,
  //       increaseTimer() {
  //         this.secondsPassed++;
  //       },
  //     })
  //   );

  //   方案三 其实就是封装了上述方案二
  const timer = useLocalObservable(() => ({
    secondsPassed: 0,
    increaseTimer() {
      this.secondsPassed++;
    },
  }));

  useEffect(() => {
    const timerHadnle = setInterval(() => {
      timer.increaseTimer();
    }, 1000);

    return () => {
      clearInterval(timerHadnle);
    };
  });
  return (
    <div>
      <h3>TimerView</h3>
      <p>seconds passed: {timer.secondsPassed} s</p>
    </div>
  );
}

export default observer(TimerPage);
