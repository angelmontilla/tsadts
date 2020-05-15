import { DBaseNode } from '../../d-base-node';
import { ResultIteration } from '../../result-iteration';

/**
 * @description Iterator on Queue
 *
 * @export Iterator
 * @class DQueueIterator
 * @implements {Iterator<T>}
 * @template T
 */
export class DQueueIterator<T> implements Iterator<T> {

    /**
     * @description Creates an instance of DQueueIterator.
     * @param {DBaseNode<T>} pointer to Queue head
     * @param {number} counter - elements in queue
     * @memberof DQueueIterator
     */
    constructor(private pointer: DBaseNode<T>, private counter: number) {
        if (this.pointer === null || this.counter <= 0) {
            throw new Error('DQueueIterator: Not iterable Queue');
        }
        if (this.counter === 0) {
            throw new Error('DQueueIterator: Can´t iterate empty Queue');
        }
    }

    /**
     * @description Get next item in iterator
     *
     * @param {number} [idx] - Number of items staying onto iterator
     * @returns {ResultIteration<T>} - Item from iteration or content=undefined for end
     * @memberof DQueueIterator
     */
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
        let item: ResultIteration<T> = new ResultIteration<T>();
        item = null;

        if (this.pointer !== undefined) {
            this.pointer = null;
        }

        if (this.counter !== undefined) {
            this.counter = undefined;
        }

        return item;
    }

    /**
     * @todo Completes throws Iterator Stack
     *
     * @param {*} [e]
     * @returns {ResultIteration<T>}
     * @memberof DStackIterator
     */
    throw?(e?: any): ResultIteration<T> {
        let item: ResultIteration<T> = new ResultIteration<T>();
        item = null;

        return item;
    }

}
