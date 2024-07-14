export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type ObjAny = Record<string, any>;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Array<infer U>
    ? ReadonlyArray<U>
    : T[P];
};

