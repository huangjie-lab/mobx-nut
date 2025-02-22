import { useEffect, useReducer, useState } from "react";
import count from "../store/Count";
// import { observer } from "mobx-react";
import { observer } from "../whtch";

function CountPage() {
  // 手动订阅刷新数据 redux同理
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [, setState] = useState();
  // useEffect(() => {
  //   count.subscribe(forceUpdate);
  //   const.subscribe(() => setState([] as any))
  // }, []);
  return (
    <div>
      <div style={{ margin: "20px 0" }}>CountPage</div>
      <button onClick={count.add}>{count.num}</button>
    </div>
  );
}

export default observer(CountPage);
