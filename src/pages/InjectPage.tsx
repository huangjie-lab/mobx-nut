import { Component } from "react";
import { Provider, inject, observer } from "../whtch";

export default class InjectPage extends Component {
  render() {
    return (
      <div>
        <h3>InjectPage</h3>
        <Provider foo="bar" foo1="bar1">
          <Child name="name" />
        </Provider>
      </div>
    );
  }
}

const Child = inject("foo")(
  observer(function InjectPage(props) {
    return (
      <div>
        context:
        {props.foo},{props.foo1},{props.name}
      </div>
    );
  })
);
