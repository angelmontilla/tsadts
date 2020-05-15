import { IadtsCloneable } from '../../iadts-cloneable';
import { DBaseNode } from '../../d-base-node';
import { DQueueIterator } from './dqueue-iterator';
import { AbsQueue } from '../abs-queue';

/**
 * @description Dynamic Queue
 *
 * @export
 * @class DQueue
 * @implements {Iterable<T>}
 * @template T
 * @author Angel Manuel Montilla Jiménez
 * @license MIT
 */
export class DQueue<T extends IadtsCloneable<T>> extends AbsQueue<T> implements Iterable<T> {

    private pHead: DBaseNode<T>;
    private pTail: DBaseNode<T>;
    private count: number;

    constructor() {
        super();
        this.count = 0;
        this.pHead = undefined;
        this.pTail = undefined;
    }

    /**
     * @description determines if queue is empty (true) or not (false)
     *
     * @returns {boolean} - true if empty
     * @memberof DQueue
     * @throws invalid state (tail) or (head)
     */
    public isEmpty(): boolean {
        if (this.count === 0) {
            if (this.pHead === undefined) {
                if (this.pTail === undefined) {
                    return true;
                } else {
                    throw new Error('DQueue: isEmpty - Queue in an invalid state (tail)');
                }
            } else {
                throw new Error('DQueue: isEmpty - Queue in an invalid state (head)');
            }
        } else {
            return false;
        }
    }

    /**
     * @description Add an element to Queue in a FIFO form
     *
     * @param {T} newItem
     * @throws invalid state
     * @memberof DQueue
     */
    public Enqueue(newItem: T): void {
        const node = new DBaseNode(newItem, undefined);

        if (this.pHead === null || this.pTail === null) {
            throw new Error('DQueue: Queue - Queue in an invalid state');
        }

        if (this.pHead === undefined) {
            if (this.count === 0) {
                this.pHead = node;
            } else {
                throw new Error('DQueue: Queue - Queue in an invalid state');
            }
        }

        if (this.pTail !== undefined) {
            this.pTail.pointsto = node;
        }
        this.pTail = node;
        this.count++;
    }

    /**
     * @description Extract the first element on queue following FIFO form
     *
     * @returns {T} - The first element on Queue
     * @throws Can't dequeue an empty Queue
     * @memberof DQueue
     */
    public Dequeue(): T {
        let result: T;

        if (!this.isEmpty()) {
            result = this.pHead.content;
            let preserve = this.pHead;
            this.pHead = this.pHead.pointsto;

            if (this.pHead === undefined ) {
                this.pTail = undefined;
            }

            this.count--;
            preserve = null;
        } else {
            throw new Error('DQueue: Dequeue - Can´t dequeue an empty Queue');
        }

        return result;
    }

    /**
     * @description Get first element in queue in a non destructive way
     *
     * @returns {T} - Clone of first element on Queue
     * @throws can´t peek empty
     * @memberof DQueue
     */
    public peek(): T {
        let result: T;
        if (this.isEmpty()) {
            throw new Error ('DQueue: peek - can´t peek from empty queue');
        }

        result = this.pHead.content.clone();

        return result;
    }

    /**
     * @description Size of Queue
     *
     * @returns {number}
     * @throws Invalid Queue state
     * @memberof DQueue
     */
    public size(): number {
        if (this.pHead === undefined) {
            throw new Error ('DQueue: size - Queue in invalid state');
        }

        return this.count;
    }

    /**
     * @description Show queue content in LIFO form
     *
     * @param {string} [msg] - Optional message Previous to queue content
     * @memberof DQueue
     */
    public DQueueContent(msg?: string): void {
        let runs = this.pHead;

        if (msg !== undefined) {
            console.log(msg);
        }
        while (runs !== undefined) {
            if (runs.content.show !== undefined) {
                runs.content.show();
            } else {
                console.log(runs.content);
            }

            runs = runs.pointsto;
        }
    }

    /**
     * @description Clones this queue to another
     *
     * @returns {DQueue<T>} - A new queue from this one content
     * @memberof DQueue
     */
    public clone(): DQueue<T> {
        let q1: DQueue<T>;
        q1 = this;

        const qRes = new DQueue<T>();

        if (q1.isEmpty()) {
            throw new Error ('DQueue: clone - Can´t clone empty DQueue');
        }

        for (const a of q1) {
            let data: T;

            data = a;
            qRes.Enqueue(data.clone());
        }

        // qRes = new DQueue();

        return qRes;

    }

    /**
     * @description remove all items in queue until is empty
     *
     * @memberof DQueue
     */
    public clear(): void {

        while (!this.isEmpty()) {
            this.Dequeue();
        }
    }

    /**
     * @description An destructive iterator over the Queue
     *
     * @returns {Iterator<T>} - An Iterator on Queue
     * @throws Empty queue
     * @memberof DQueue
     */
    public [Symbol.iterator](): DQueueIterator<T> {
        if (this.isEmpty()) {
            throw new Error('Queue Iterator: can´t iterate empty Queue');
        } else {
            let Iterator: DQueueIterator<T>;
            Iterator = new DQueueIterator<T>(this.pHead, this.count);

            return Iterator;
        }
    }
}
