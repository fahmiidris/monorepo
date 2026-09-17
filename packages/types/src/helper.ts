export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type IsObject<T> = Prettify<T> extends Record<string | number | symbol, unknown> ? Prettify<T> : never;

export type HasKeys<T> = keyof T extends never ? never : T;

export type StringLiteralUnion<T extends string> = T | (string & {});
