import { ResultIteration } from '../../result-iteration';
import { DBaseNode } from '../../d-base-node';

export class DStackIterator<T> implements Iterator<T> {

    constructor(private pointer: DBaseNode<T>, private counter: number) {
        if (this.pointer === null || this.counter <= 0) {
            throw new Error('DStackIterator: Non iterable Stack');
        }
        if (this.counter === 0) {
            throw new Error('DStackIterator: Can´t iterate empty Stack');
        }
    }

    next(idx?: number): ResultIteration<T> {
        const item: ResultIteration<T> = new ResultIteration<T>();

        if (this.counter > 0) {
            item.value = this.pointer.content;
            this.pointer = this.pointer.pointsto;
            this.counter -= 1;
        } else {
            item.value = undefined;
            item.done = true;
        }
        return item;
    }

    /**
     * @todo Completes return for Iterator DStack
     *
     * @param {*} [value]
     * @returns {ResultIteration<T>}
     * @memberof DStackIterator
     */
    return?(value?: any): ResultIteration<T> {
        throw new Error("Method not implemented.");
    }

    /**
     * @todo Completes throws Iterator Stack
     *
     * @param {*} [e]
     * @returns {ResultIteration<T>}
     * @memberof DStackIterator
     */
    throw?(e?: any): ResultIteration<T> {
        throw new Error("Method not implemented.");
    }
}
