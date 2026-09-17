type Unwrap<P extends unknown> = P extends PromiseLike<infer V> ? V : P;

type Input = Record<string | number | symbol, unknown>;

type Responses<G extends Input> = {
    [P in keyof G]: Unwrap<G[P]>;
};

export async function combinePromises<G extends Input>(promises: G): Promise<Responses<G>> {
    if (promises === null) {
        return Promise.reject(new Error("combinePromises does not handle null argument."));
    }

    if (typeof promises !== "object") {
        return Promise.reject(new Error(`combinePromises does not handle argument of type ${typeof promises}.`));
    }

    return Promise.all(Object.values(promises)).then((values) => {
        const responses: Record<string, unknown> = {};

        values.forEach((v, i) => {
            const key = Object.keys(promises)[i];

            if (key) {
                responses[key] = v;
            }
        });

        return responses as Responses<G>;
    });
}
