import React from "react";
import { useObserver } from "./useObserver";

interface ObserverComponentType {
  children?(): React.ReactElement | null;
  // children?: () => React.ReactElement | null;
  render?(): React.ReactElement | null;
}
function ObserverComponent({ children, render }: ObserverComponentType) {
  //   console.log(children, "children");

  //   console.log(render, "render");

  const component = children || render;

  if (typeof component !== "function") {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useObserver(component);
}

// export { Observer:ObserverComponent };
// 我一开始是上述写法 good ...
export { ObserverComponent as Observer };
