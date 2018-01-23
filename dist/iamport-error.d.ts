import ExtendableError from 'extendable-error';
export declare class IamportError<T> extends ExtendableError {
    constructor(message: string, error: T);
}
