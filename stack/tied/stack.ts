import { StackIterator } from './stack-iterator';
import { IadtsCloneable } from '../../iadts-cloneable';
import { AbsStack } from '../abs-stack';
/**
 * @description Stack class - For First Input First Output
 */
export class Stack<T extends IadtsCloneable<T>> extends AbsStack<T> implements Iterable<T> {

    /*
    * Secret implementation - this is a tied stack implementation
    */
    private stack: Array<T>;
    private length: number;
    private readonly maxSize: number;

    /**
     * Creates an instance of Stack.
     *
     * @param {number} maxSize - Max size for stack
     * @memberof Stack
     */
    public constructor(maxSize?: number) {
        super();
        
        if (maxSize === undefined) {
            this.maxSize = 100;
        } else {
            this.maxSize = maxSize;
        }

        this.length = 0;
        this.stack = new Array<T>(this.maxSize - 1);
    }

    /**
     * Determines if Stack is empty
     *
     * @returns {boolean} - true if Stck is Empty
     * @memberof Stack
     */
    public isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * Determines if Stack is full
     *
     * @returns {boolean} - true if reached max size
     * @memberof Stack
     */
    public isFull(): boolean {
        return this.length === this.maxSize;
    }

    /**
     * Insert first item at Stack
     *
     * @param {T} newItem - insert at first position
     * @memberof Stack
     * @throws Full
     */
    public push(newItem: T): void {
        if (!this.isFull()) {
            this.stack[this.length] = newItem as T;
            this.length++;
        } else {
            throw new Error('Stack: full');
        }
    }

    /**
     * Extracts first item at Stack
     *
     * @returns {T} - The first item in stack
     * @memberof Stack
     * @throws Empty
     */
    public pop(): T {
        let item: T;

        if (this.isEmpty()) {
            throw new Error('Stack: empty');
        } else {
            item = this.stack[this.length - 1];
            this.length--;
        }

        return item;
    }

    /**
     * Return first item in a not destructive way
     *
     * @returns {T} - Seeing the first element / not extrating
     * @memberof Stack
     * @throws empty
     */
    public top(): T {
        let item: T;

        if (this.isEmpty()) {
            throw new Error('Stack: empty');
        } else {
            item = this.stack[this.length];
        }

        return item;
    }


    /**
     * @description Size of Stack
     *
     * @returns {number}
     * @memberof Stack
     */
    public size(): number {
        return this.length;
    }

    /**
     * Shows Stack contents on console
     *
     * @memberof Stack
     */
    public stackContent(msg?: string): void {
        let message: string;

        if ( msg !== undefined ) {
            message = msg;
        } else {
            message = 'Stack Contents';
        }

        console.log(message);
        for (let i = this.length; i >= 0; --i) {
            if (this.stack[i].show !== undefined) {
                this.stack[i].show();
            } else {
                console.log(this.stack[i]);
            }
        }
    }

    /**
     * Making Stack Iterable
     * @description returns an Iterator with fifo evaluation critera
     *
     * @returns { StackIterator<T> } - If not Empty
     * @throws Empty can´t iterate
     * @memberof Stack
     */
    public [Symbol.iterator](): StackIterator<T> {
        // We reverse Array for getting FIFO evaluation criteria
        if (this.isEmpty()) {
            throw new Error('Stack empty: can´t iterate');
        } else {
            const stackClon = this.stack;
            let Iterador: StackIterator<T>;

            Iterador = new StackIterator<T>(stackClon, this.length);

            return Iterador;
        }
    }
}
