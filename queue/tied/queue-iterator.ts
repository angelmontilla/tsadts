import { ResultIteration } from '../../result-iteration';

/**
 * @description Iterator on Queue
 *
 * @export Iterator
 * @class QueueIterator
 * @implements {Iterator<T>}
 * @template T
 */
export class QueueIterator<T> implements Iterator<T> {
    private position: number;
    private maxindex: number;

    /**
     * Creates an instance of QueueIterator. Only if Queue is defined
     * @param {T[]} s - Array from ADT
     * @memberof QueueIterator
     */
    constructor(private s?: T[], max?: number) {
        if (s === null || s === undefined) {
            this.throw('Queue Iterator: can´t create empty');
        }

        if (max === undefined) {
            this.maxindex = s.length + 1;
        } else {
            if (max <= (s.length + 1)) {
                this.maxindex = max;
            } else {
                throw new Error('Queue Iterator: can´t create Iterator exceeds limit');
            }
        }

        this.position = max;
    }

    /**
     *
     *
     * @param {number} [idx]
     * @returns {ResultadoIteracion<T>}
     * @memberof StackIterator
     */
    next(idx?: number): ResultIteration<T> {
        const item: ResultIteration<T> = new ResultIteration<T>();

        if (this.position > 0) {
            item.value = this.s[--this.position];
        } else {
            return {done: true, value: undefined};
        }

        return item;
    }

    /**
     * free memory from iterator if it has ended prematurely
     *
     * @param {number} [idx]
     * @returns {ResultadoIteracion<T>}
     * @memberof StackIterator
     */
    return?(idx?: number): ResultIteration<T> {
        let item: ResultIteration<T> = new ResultIteration<T>();
        item = null;

        if (this.s !== undefined) {
            this.s = null;
        }

        if (this.maxindex !== undefined) {
            this.maxindex = undefined;
        }

        if (this.position !== undefined) {
            this.position = undefined;
        }

        return item;
    }

    /**
     * is about forwarding a method call to a GENERATOR that is iterated over via yield*
     */
    throw?(e?: any): ResultIteration<T> {
        let item: ResultIteration<T> = new ResultIteration<T>();
        item = null;

        return item;
    }

}
