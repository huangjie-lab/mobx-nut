import { type FC } from "react";
import { useObserver } from "./useObserver";

function observer<P>(baseComponent: FC<P>) {
  console.log(baseComponent, "baseComponent");

  //   可以给组件设置 displayName 默认的组件名就是 name
  const baseComponentName = baseComponent.displayName || baseComponent.name;

  const ObserverComponent = (props: P) => {
    // console.log(props, "props");

    return useObserver(() => baseComponent(props), baseComponentName);

    // 只有这样才会渲染出组件 good... 之前我是 return baseComponent
    // return baseComponent(props);
  };

  return ObserverComponent;
}

export { observer };
