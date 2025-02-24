import { useState } from "react";
import { AnnotationsMap } from "mobx";
import { observable } from "../whtch";

function useLocalObservable<TStore extends Record<string, any>>(
  initializer: () => TStore,
  annotations?: AnnotationsMap<TStore, never>
): TStore {
  // todo ... annotations, { autoBind: true } ？
  return useState(() =>
    observable(initializer(), annotations, { autoBind: true })
  )[0];
}

export { useLocalObservable };
