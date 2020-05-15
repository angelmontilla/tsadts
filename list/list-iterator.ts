import { DDbldNode } from '../d-dbld-node';
import { ResultIteration } from '../result-iteration';

/**
 * @description Iterator on List
 *
 * @export Iterator
 * @class ListIterator
 * @implements {Iterator<T>}
 * @template T
 */
export class ListIterator<T> implements Iterator<T> {

    /**
     * @Description Creates an instance of ListIterator.
     * @param {DDbldNode<T>} pointer to List head
     * @param {number} counter - items into List
     * @memberof ListIterator
     */
    constructor(private pointer: DDbldNode<T>, private counter: number) {
        if (this.pointer === null || this.counter < 0) {
            throw new Error('ListIterator: Non iterable List');
        }
        if (this.counter === -1) {
            throw new Error('DStackIterator: Can´t iterate empty Stack');
        }
    }

    /**
     * @description Get next item into Iterator
     *
     * @param {number} [idx] - Number of elements stay into interator
     * @returns {ResultIteration<T>} - Item from iteration or content=undefined for end
     * @memberof ListIterator
     */
    next(idx?: number): ResultIteration<T> {
        const item: ResultIteration<T> = new ResultIteration<T>();

        if (this.counter >= 0) {
            item.value = this.pointer.content;
            this.pointer = this.pointer.ptrnext;
            this.counter -= 1;
        } else {
            item.value = undefined;
            item.done = true;
        }
        return item;
    }
    
    return?(value?: any): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }
    throw?(e?: any): IteratorResult<T, any> {
        throw new Error("Method not implemented.");
    }
}
