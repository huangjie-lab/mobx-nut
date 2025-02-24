import React from "react";

type IValueMap = Record<string, any>;

const MobXProviderContext = React.createContext<IValueMap>({});

interface IProviderType extends IValueMap {
  children: React.ReactElement | null;
}

function Provider({ children, ...store }: IProviderType) {
  // 可能存在Provider嵌套使用 good ...
  const parentValue = React.useContext(MobXProviderContext);
  // console.log(parentValue, "parentValue");
  const mutableProviderRef = React.useRef({ ...parentValue, ...store });
  const value = mutableProviderRef.current;
  return (
    <MobXProviderContext.Provider value={value}>
      {children}
    </MobXProviderContext.Provider>
  );
}

export { Provider, MobXProviderContext };
