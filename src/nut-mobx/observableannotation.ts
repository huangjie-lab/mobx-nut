import { ObservableObjectAdministration } from "./makeObservable";
import { Annotation } from "./annotation";

export function createObservableAnnotation(name: string): Annotation {
  return {
    annotationType_: name,
    make_,
  };
}

function make_(
  adm: ObservableObjectAdministration,
  key: PropertyKey,
  descriptor: PropertyDescriptor
) {
  return adm.defineObservableProperty_(key, descriptor.value);
}
