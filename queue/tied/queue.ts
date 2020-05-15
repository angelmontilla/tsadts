import { IadtsCloneable } from '../../iadts-cloneable';
import { QueueIterator } from './queue-iterator';
import { AbsQueue } from '../abs-queue';

export class Queue<T extends IadtsCloneable<T>> extends AbsQueue<T> implements Iterable<T> {
    private queue: Array<T>; // secret implementation of Queue
    private length: number; // number of elements currently in the queue
    private readonly maxSize: number; // maximum number of elements queue can contain

    /**
     * Creates an instance of Queue.
     * @param {number} maxSize - Max size for Queue
     * @memberof Queue
     */
    public constructor(maxSize?: number) {
        super();
        if (maxSize === undefined) {
            this.maxSize = 100;
        } else {
            this.maxSize = maxSize;
        }

        this.length = 0;
        //this.queue = new Array<T>(this.maxSize - 1);
        this.queue = new Array<T>();
    }

    /**
     * @description Determines if Queue is empty
     *
     * @returns {boolean} - true if empty
     * @memberof Queue
     */
    public isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * @description Determines if Queue is full
     *
     * @returns {boolean} - true if full
     * @memberof Queue
     */
    public isFull(): boolean {
        return this.length === this.maxSize;
    }

    /**
     * @description enqueue iten in Queue
     *
     * @param {T} newItem
     * @memberof Queue
     * @throws 
     */
    public Enqueue(newItem: T): void {
        if (!this.isFull()) {
            this.queue.unshift(newItem);
            this.length++;
        } else {
            throw new Error('Queue: Queue - can´t enqueue in full Queue');
        }
    }

    /**
     * @description Dequeue item from Queue
     *
     * @throws Empty queue
     * @memberof Queue
     */
    public Dequeue(): T {
        if (this.isEmpty()) {
            throw new Error('Queue: Dequeue - can´t dequeue empty Queue');
        }

        this.length--;
        return this.queue.pop();
    }

    /**
     * @description Head of Queue non destructive
     *
     * @returns {T}
     * @throws Empty Queue
     * @memberof Queue
     */
    public peek(): T {
        if (this.isEmpty()) {
            throw new Error('Queue: peek - can´t peek empty Queue');
        }

        return this.queue[this.length - 1];
    }

    /**
     * @description Size of Queue
     *
     * @returns {number} - Actual size of queue
     * @memberof Queue
     */
    public size(): number {
        return this.length;
    }
    
    /**
     * @description Show Queue content on console
     *
     * @param {string} [msg] - Optional message before Queque content
     * 
     * @memberof Queue
     */
    public QueueContents(msg?: string): void {
        let message: string;

        if ( msg !== undefined ) {
            message = msg;
        } else {
            message = 'Stack Contents';
        }

        console.log(message);
        for (let i = 0; i < this.length; i++) {
            if (this.queue[i].show !== undefined) {
                this.queue[i].show();
            } else {
                console.log(this.queue[i]);
            }
        }
    }

    [Symbol.iterator](): QueueIterator<T> {
        if (this.isEmpty()) {
            throw new Error('Queue empty: can´t iterate');
        } else {
            const queueClon = this.queue;
            let Iterador: QueueIterator<T>;

            Iterador = new QueueIterator<T>(queueClon, this.length);

            return Iterador;
        }
    }
}
