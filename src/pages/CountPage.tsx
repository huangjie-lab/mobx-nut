import { useEffect, useReducer, useState } from "react";
import count from "../store/Count";
// import { observer } from "mobx-react";
import { Observer, observer } from "../whtch";

// function CountPage() {
//   // 手动订阅刷新数据 redux同理
//   // const [, forceUpdate] = useReducer((x) => x + 1, 0);
//   // const [, setState] = useState();
//   // useEffect(() => {
//   //   count.subscribe(forceUpdate);
//   //   const.subscribe(() => setState([] as any))
//   // }, []);

//   console.log("component rendered");

//   return (
//     <div>
//       <div style={{ margin: "20px 0" }}>CountPage</div>
//       {/* <button onClick={count.add}>{count.num}</button> */}

//       {/* 只有此部份应用到mobx中的值才会更新 组件不会重新渲染 性能 */}
//       {/* <Observer children={() => <span>{count.num}</span>}></Observer>
//       <Observer render={() => <span>{count.num}</span>}></Observer> */}
//       <Observer>
//         {() => <button onClick={count.add}>{count.num}</button>}
//       </Observer>
//     </div>
//   );
// }

// export default observer(CountPage);

import React, { Component } from "react";

class CountPage extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: "20px 0" }}>CountPage</div>
        <button onClick={count.add}>{count.num}</button>
        {/* <Observer>
          {() => <button onClick={count.add}>{count.num}</button>}
        </Observer> */}
      </div>
    );
  }
}

export default observer(CountPage);
