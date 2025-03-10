import { propagateChanged, reportObserved } from "./observable-core";
// import { IDerivation } from "./Reaction";

export const $mobx = Symbol("mobx administration");

export interface IDepTreeNode {
  name_: string;
  observing_?: IObservable[];
}

export interface IObservable {
  diffValue_: number;

  lastAccessedBy_: number;

  isBeingObserved_: boolean;

  // lowestObserverState_: IDerivationState_;

  observers_: Set<any>;
}

export interface IAtom extends IObservable {
  reportObserved(): boolean;
  reportChanged(): void;
}

export class Atom implements IAtom {
  diffValue_ = 0;

  isBeingObserved_ = false;
  observers_ = new Set();

  lastAccessedBy_ = 0;
  // lowestObserverState_ = IDerivationState_.NOT_TRACKING_;

  // 观察
  public reportObserved(): boolean {
    return reportObserved(this);
  }

  // 值改变
  public reportChanged() {
    propagateChanged(this);
  }
}

export class ObservableValue extends Atom {
  value_;

  constructor(value: any) {
    super();
    this.value_ = value;
  }

  setNewValue_(newValue: any) {
    this.value_ = newValue;
    this.reportChanged();
  }

  public get() {
    this.reportObserved();
    return this.value_;
  }
}
