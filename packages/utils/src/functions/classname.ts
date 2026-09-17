import { cn } from "cnfast";

type ClassName = string | string[] | undefined | null;

type Parts = Record<string, ClassName>;

type Variants<P extends Parts> = Record<string, Record<string, Record<keyof P, ClassName>>>;

type StringToBoolean<T> = T extends "true" | "false" ? boolean : T;

export type InferVariants<T> = T extends (props: infer P) => unknown ? P : never;

type VariantProps<V> = {
    [K in keyof V]?: V[K] extends Record<string, unknown> ? StringToBoolean<keyof V[K]> | undefined | null : never;
};

type Return<P, V> = (props: VariantProps<V>) => Record<keyof P, string>;

export { cn };

export function cv<P extends Parts, V extends Variants<P>>({
    parts: partsInput,
    variants,
    defaultVariants,
    compoundVariants = [],
    classMerger = cn,
}: {
    parts: P;
    variants: V;
    defaultVariants: VariantProps<V>;
    compoundVariants?: Array<VariantProps<V> & { className: Record<keyof P, ClassName> }>;
    classMerger?: (...classNames: ClassName[]) => string;
}): Return<P, V> {
    const parts = Object.fromEntries(Object.entries(partsInput).map(([key, value]) => [key, Array.isArray(value) ? value.join(" ") : value]));

    function classNames(props: VariantProps<V>): Record<keyof P, string> {
        const variantProps = Object.fromEntries(
            Object.entries({ ...defaultVariants, ...props }).map(([key, value]) => {
                return [key, value ?? defaultVariants[key]];
            })
        );

        const partProps = Object.fromEntries(
            Object.entries(parts).map(([part, baseClass]) => {
                return [part, baseClass];
            })
        );

        Object.entries(variants).forEach(([variantKey, variantValues]) => {
            const variantValue = variantProps[variantKey];

            if (variantValue === undefined || variantValue === null) {
                return;
            }

            const variantValuePart = variantValues[variantValue];

            if (!variantValuePart) {
                return;
            }

            Object.entries(variantValuePart).forEach(([part, value]) => {
                if (typeof value !== "string") {
                    value = classMerger(value);
                }

                if (!partProps[part]) {
                    partProps[part] = "";
                }

                partProps[part] = classMerger([partProps[part], value]);
            });
        });

        compoundVariants.forEach(({ className, ...conditions }) => {
            const matches = Object.entries(conditions).every(([key, value]) => variantProps[key] === value);

            if (matches) {
                Object.entries(className).forEach(([part, value]) => {
                    if (typeof value !== "string") {
                        value = classMerger(value);
                    }

                    if (!partProps[part]) {
                        partProps[part] = "";
                    }

                    partProps[part] = classMerger([partProps[part], value]);
                });
            }
        });

        return partProps as Record<keyof P, string>;
    }

    return classNames;
}
