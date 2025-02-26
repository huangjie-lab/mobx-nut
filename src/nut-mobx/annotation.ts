import { ObservableObjectAdministration } from "./makeObservable";

export type Annotation = {
  annotationType_: string;
  make_(
    adm: ObservableObjectAdministration,
    key: PropertyKey,
    descriptor: PropertyDescriptor
    // source: object
  ): void;
};

function make_(
  adm: ObservableObjectAdministration,
  key: string,
  descriptor: PropertyDescriptor
) {
  return adm.defineObservableProperty_(key, descriptor.value);
}

export function createAutoAnnotation() {
  return {
    annotationType_: "auto",
    make_,
  };
}

export type AnnotationMapEntry =
  | Annotation
  | true /* follow the default decorator, usually deep */
  | false; /* don't decorate this property */

export type AnnotationsMap<T, AdditionalFields extends PropertyKey> = {
  [P in Exclude<keyof T, "toString">]?: AnnotationMapEntry;
} & Record<AdditionalFields, AnnotationMapEntry>;
