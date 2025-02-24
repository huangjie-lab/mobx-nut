import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  computed,
  Reaction,
} from "mobx";
// import { observer } from "mobx-react";
// import { Observer,useLocalObservable } from "mobx-react-lite";
// import { observer, Observer, useLocalObservable } from "./nut-mobx-react-lite";
import { Observer, useLocalObservable } from "./nut-mobx-react-lite";
import {
  observer,
  Provider,
  MobXProviderContext,
  inject,
} from "./nut-mobx-react";

export {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  observer,
  computed,
  Reaction,
  Observer,
  useLocalObservable,
  Provider,
  MobXProviderContext,
  inject,
};
