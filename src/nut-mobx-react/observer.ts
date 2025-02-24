import React from "react";
import { observer as observerLite } from "../nut-mobx-react-lite";
import { Reaction } from "../whtch";

export type IReactComponent<P = any> =
  | React.ComponentClass<P>
  | React.FunctionComponent<P>
  | React.ClassicComponentClass<P>
  | React.ForwardRefExoticComponent<P>;

/**
 * this指向 判断类组件 跟踪observable数据变化
 * @param component
 * @returns
 */
function observer<T extends IReactComponent>(component: T): T {
  // isPrototypeOf 判断A是否为B的实例对象 类组件判断方法
  if (
    Object.prototype.isPrototypeOf.call(React.Component, component) ||
    Object.prototype.isPrototypeOf.call(React.PureComponent, component)
  ) {
    return makeClassComponent(component as React.ComponentClass<any, any>) as T;
  } else {
    // return observerLite(component);
    // good ... 上面的写法不同ts校验
    return observerLite(component as React.FunctionComponent) as T;
  }
}

function makeClassComponent(
  componentClass: React.ComponentClass<any, any>
): React.ComponentClass<any, any> {
  const target = componentClass.prototype;
  const originalRender = target.render;
  target.render = function () {
    // render在谁身上 this就指向谁 todo...
    // console.log(this, "this");
    this.render = createReactiveRender.call(this, originalRender);
    return this.render();
  };
  return componentClass as any;
}

function createReactiveRender(originalRender: any) {
  let isRenderingPending = false;

  function reactiveRender() {
    isRenderingPending = false;
    const reaction = new Reaction("reactiveRender", () => {
      //   console.log(this, "that");
      if (!isRenderingPending) {
        isRenderingPending = true;
        React.Component.prototype.forceUpdate.call(this);
      }
      //   React.Component.prototype.forceUpdate.call(this);
    });
    let rendering;

    reaction.track(() => {
      rendering = originalRender();
    });
    return rendering;
  }
  return reactiveRender;
}

export { observer };
