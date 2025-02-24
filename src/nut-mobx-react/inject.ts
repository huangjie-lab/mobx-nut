import React from "react";
import { MobXProviderContext } from "./Provider";
import { IReactComponent } from "./observer";

const inject =
  (...storeNames: Array<any>) =>
  (component: IReactComponent): IReactComponent => {
    const Injector = React.forwardRef((props, ref) => {
      console.log(props, "props");
      const context = React.useContext(MobXProviderContext);
      const newProps = {
        ...props,
        ...context,
      };
      if (ref) {
        newProps.ref = ref;
      }
      return React.createElement(component, newProps);
    });
    return Injector;
  };

export { inject };
