import ExtendableError from 'extendable-error';

export class IamportError<T> extends ExtendableError {
    constructor(message: string, error: T) {
        super(message);
    }
}

