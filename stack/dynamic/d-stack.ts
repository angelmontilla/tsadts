import { DBaseNode } from '../../d-base-node';
import { IadtsCloneable } from '../../iadts-cloneable';
import { DStackIterator } from './d-stack-iterator';
import { AbsStack } from '../abs-stack';

export class DStack<T extends IadtsCloneable<T>> extends AbsStack<T> implements Iterable<T> {

    private pointer: DBaseNode<T>;
    private counter: number;

    /**
     * Creates an instance of DStack.
     * @class DStack<T>
     * @memberof DStack
     */
    public constructor() {
        super();
        this.pointer = undefined;
        this.counter = 0;
    }

    /**
     * @description Determinate if your LIFO DStack is Empty
     *
     * @returns {boolean} - true if empty
     * @throws Stack in an invalid state if counter is less than 0
     * @memberof DStack
     */
    public isEmpty(): boolean {
        let res: boolean;

        if (this.counter > 0 ) {
            res = false;
        } else {
            if (this.counter === 0 && this.pointer === undefined) {
                res = true;
            } else {
                throw new Error('DStack: isEmpty() - Stack in an invalid state');
            }
        }

        return res;
    }

    /**
     * @description push new item in LIFO DStack
     *
     * @param {T} newItem - Item of class T to be pushed
     * @throws Invalid State
     * @memberof DStack
     */
    public push(newItem: T): void {
        const node = new DBaseNode(newItem, this.pointer);

        if (this.pointer === null || this.counter < 0) {
            throw new Error ('DStack: push - cant´t push in a Invalid stated Stack');
        }
        this.pointer = node;
        this.counter++;
    }

    /**
     * @description pop last <T> item in DStack in a LIFO perspective (destructive)
     *
     * @returns {T} - Item of class or primitive T
     * @throws Stack empty or invalid state or empty
     * @memberof DStack
     */
    public pop(): T {
        if (!this.isEmpty()) {
            let res: T;
            res = this.pointer.content;

            if (this.pointer.content.clone !== undefined) {
                res = this.pointer.content.clone();
            } else {
                res = this.pointer.content;
            }


            if (res === null) {
                throw new Error ('DStack: pop() - Stack in an invalid state');
            }

            this.pointer.content = null;

            const preser = this.pointer.pointsto;
            this.pointer.pointsto = null;
            this.pointer = preser;
            this.counter--;

            return res;
        } else {
            throw new Error('DStack: pop() - Can´t pop from empty Stack');
        }
    }

    /**
     * @describe Get top element from LIFO Stack if not empty
     *
     * @returns {T}
     * @throw Empty Stack or invalid state
     * @memberof DStack
     */
    public top(): T {
        let res: T;

        if (this.isEmpty()) {
            throw new Error('Stack: top() - can´t top from empty stack');
        } else {
            res = this.pointer.content;

            if (res === null) {
                throw new Error('Stack: top() - Stack in an invalid state');
            }
        }

        return res;
    }

    /**
     * @description Size of Stack
     *
     * @returns {number}
     * @memberof DStack
     */
    public size(): number {
        if (this.pointer === undefined) {
            throw new Error('DStack: size - can´t size an invalid state Stack');
        }
        return this.counter;
    }

    /**
     * @describe Show stack content in LIFO form
     *
     * @param {string} [msg] - Optional message Previous to list content
     * @memberof DStack
     */
    public stackContent(msg?: string): void {
        let lPointer = this.pointer;

        if (msg !== undefined) {
            console.log(msg);
        }
        while (lPointer !== undefined) {
            if (lPointer.content.show !== undefined) {
                lPointer.content.show();
            } else {
                console.log(lPointer.content);
            }

            lPointer = lPointer.pointsto;
        }
    }

    /**
     * @description An destructive iterator over the Stack
     *
     * @returns {DStackIterator<T>} - An Iterator on Stack
     * @throws Empty Stack
     * @memberof DStack
     */
    public [Symbol.iterator](): DStackIterator<T> {
        if (this.isEmpty()) {
            throw new Error('Stack Iterator: can´t iterate empty Stack');
        } else {

            let Iterador: DStackIterator<T>;
            Iterador = new DStackIterator<T>(this.pointer, this.counter);

            return Iterador;
        }
    }
}
