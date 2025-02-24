import { useRef, useState, useEffect } from "react";
import { Reaction } from "../whtch";

interface reactionTrackingRefType {
  reaction: Reaction;
}

function observerComponentNameFor(baseComponentName: string) {
  return `observer${baseComponentName}`;
}

function useObserver<T>(
  fn: () => T,
  baseComponentName: string = "observed"
): T {
  // 强制组件更新的办法
  const [, setState] = useState();
  const forceUpdate = () => setState([] as any);

  //   此处定义 ref 类型 good ...
  const reactionTrackingRef = useRef<reactionTrackingRefType | null>(null);

  //   在整个生命周期中 reactionTrackingRef.current 使用 useRef 只会被执行一次
  if (!reactionTrackingRef.current) {
    reactionTrackingRef.current = {
      reaction: new Reaction(observerComponentNameFor(baseComponentName), () =>
        forceUpdate()
      ),
    };
  }

  //   为啥加上会失去响应式 ？ todo...
  //   useEffect(() => {
  //     return () => {
  //       reactionTrackingRef.current?.reaction.dispose();
  //       reactionTrackingRef.current = null;
  //     };
  //   }, []);

  const { reaction } = reactionTrackingRef.current;

  //   let rendering: T = fn();
  let rendering!: T;
  let exception;

  //   跟踪数据变化 执行组件的渲染
  reaction.track(() => {
    try {
      rendering = fn();
    } catch (error) {
      exception = error;
    }
  });

  return rendering;
  //   return fn();
}

export { useObserver };
