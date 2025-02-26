import { createObservableAnnotation } from "./observableannotation";

// import { createObservableAnnotation } from "mobx/dist/internal";

export const OBSERVABLE = "observable";

const observableAnnotation = createObservableAnnotation(OBSERVABLE);
const observableFactories = {};

export const observable = Object.assign(
  observableFactories,
  observableAnnotation
);
