// export class MobXGlobals {
//   runId = 0;

//   trackingDerivation: IDerivation | null = null;

//   pendingReactions: Reaction[] = [];

//   trackingContext: Reaction | null = null;
// }

// export const globalState: MobXGlobals = new MobXGlobals();

declare type PropertyKey = string | number | symbol;
interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(v: any): void;
}
// 用于阻止 TypeScript 在某些情况下自动推断泛型类型 T T extends any ? 0 : never永远是0
type NoInfer<T> = [T][T extends any ? 0 : never];
