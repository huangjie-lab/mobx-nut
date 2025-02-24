import React from "react";
import { MobXProviderContext, Provider } from "../whtch";

/**
 * 使用useContext或者使用Consumer来消费context
 * @returns
 */
export default function ProviderPage() {
  return (
    <div>
      <h3>ProviderPage</h3>
      <Provider foo="bar" test="test">
        <>
          <Provider foo1="bar1" test1="test1">
            <MobXProviderContext.Consumer>
              {({ foo, test, foo1, test1 }) => (
                <div>
                  {foo},{test},{foo1},{test1}
                </div>
              )}
            </MobXProviderContext.Consumer>
            {/* <TestContext /> */}
          </Provider>
          <MobXProviderContext.Consumer>
            {({ foo, test }) => (
              <div>
                {foo},{test}
              </div>
            )}
          </MobXProviderContext.Consumer>
        </>
      </Provider>
    </div>
  );
}

// function TestContext() {
//   const { foo, test, foo1, test1 } = React.useContext(MobXProviderContext);

//   return (
//     <div>
//       {foo}, {test}, {foo1}, {test1}
//     </div>
//   );
// }
