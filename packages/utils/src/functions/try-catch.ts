export class HttpError extends Error {
    errors: string[];

    constructor(message: string, errors: string[]) {
        super(message);
        this.errors = errors;
    }
}

interface Success<D> {
    data: D;
    error: null;
}

interface Failed<E> {
    data: null;
    error: E;
}

type Response<D, E> = Success<D> | Failed<E>;

export async function tryCatch<D, E = HttpError>(promise: Promise<D>): Promise<Response<D, E>> {
    try {
        return { data: await promise, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}
