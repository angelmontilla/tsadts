export class ResultIteration<T> implements IteratorReturnResult<T> {
    done: true;
    value: T;
}
