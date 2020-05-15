import { IadtsCloneable } from '../../iadts-cloneable';
import { AbsListDbl } from './abs-list-dbl';
import { DDbldNode } from '../../d-dbld-node';
import { ListIterator } from '../list-iterator';

export class ListDbl<T extends IadtsCloneable<T>> extends AbsListDbl<T> implements Iterable<T> {

    private pointer: DDbldNode<T>; // Ever stay at first element
    private interiter: DDbldNode<T>; // Moving inner iterator
    private counter: number; // Nomber of items in List

    /**
     * Creates an instance of ListDbl.
     * 
     * @memberof ListDbl
     */
    constructor() {
        super();
        this.pointer = undefined;
        this.interiter = undefined;
        this.counter = -1;
    }

    /**
     * @description Is List empty
     *
     * @returns {boolean} - true if empty
     * @memberof ListDbl
     */
    public isEmpty(): boolean {
        return this.counter === -1;
    }

    /**
     * @description How much items in list
     *
     * @returns {number} - number of items
     * @memberof ListDbl
     */
    public size(): number {
        return this.counter + 1;
    }

    /**
     * @description Removes all items in List (Moves intenal pointer)
     *
     * @memberof ListDbl
     */
    public clear(): void {
        if (!this.isEmpty()) {
            this.interiter = this.pointer;

            // removing all nodes in List
            let prov: DDbldNode<T>;
            while (this.interiter !== undefined) {
                prov = this.interiter;

                this.interiter = this.interiter.ptrnext;

                prov.content = null; // mark for garbage collection
            }

            // Let's go to initial state
            this.pointer = undefined;
            this.interiter = undefined;
            this.counter = -1;
        }
    }

    /**
     * @description insert an intem in "n" position of List
     *
     * @param {T} newValue - New Value to insert in List
     * @param {number} index - Position for "newValue" (optinal = first element)
     * @memberof ListDbl
     */
    public insert(newValue: T, index?: number | string): void {
        if (index === undefined) {
            index = 0;
        }

        if (typeof(index) === 'string') {
            switch (index) {
                case 'first': {
                    index = 0;
                    break;
                }
                case 'last': {
                    index = this.counter + 1;
                    break;
                }
                default: {
                    throw new Error('ListDbl: insert - literal must be "first" or "last"');
                }
            }
        }

        if (index < 0) {
            throw new Error('ListDbl: insert - out of limits (negative index)');
        }
        if (index > this.counter + 1) {
            throw new Error('ListDbl: insert - out of limits (index oversized)');
        }

        if (this.isEmpty()) {
            this.counter = 0;
            this.pointer = new DDbldNode(newValue); // both branch undefined
            this.interiter = this.pointer;
        } else {
            // insert at head
            if (index === 0) {
                this.counter++;
                this.pointer = new DDbldNode(newValue, undefined, this.pointer);
                this.interiter = this.pointer.ptrnext;
                this.interiter.ptrprev = this.pointer;
                this.interiter = this.pointer;
            } else {
            // insert at last
                if (index === this.counter + 1) {
                    this.counter++;
                    this.setInternalIterator('last');
                    const newNode = new DDbldNode(newValue, this.interiter, undefined);
                    this.interiter.ptrnext = newNode;
                    this.interiter = newNode;
                } else {
                    // insert internal position
                    if (index <= this.counter) {
                        this.counter++;
                        this.setInternalIterator(index);
                        const newNode = new DDbldNode(newValue, this.interiter, this.interiter.ptrnext);
                        this.interiter.ptrnext.ptrprev = newNode;
                        this.interiter.ptrnext = newNode;
                        this.interiter = newNode;
                    }
                }
            }
        }
    }

    /**
     * @description recover Item for index position or actual node content from internal pointer
     *
     * @param {number} index - index (based 0) of the item in list
     * @returns {T} - (node "index")'s content
     * @memberof ListDbl
     */
    public recover(index?: number | string): T {

        if (typeof(index) === 'string') {
            switch (index) {
                case 'first': {
                    index = 0;
                    break;
                }
                case 'last': {
                    index = this.counter;
                    break;
                }
                default: {
                    throw new Error('List: recover - can´t recovery from an un');
                }
            }
        }

        if (index === undefined) {
            return this.interiter.content;
        } else {
            if (index < this.counter + 1) {
                this.setInternalIterator(index);

                return this.interiter.content;
            } else {
                throw new Error('List: recover - can´t recovery for an inexistent index');
            }
        }
    }

    /**
     * @description Removes node "index"
     *
     * @param {number} [index] - position of node to remove
     * @memberof List
     */
    public remove(index?: number | string): void {
        if (index === undefined) {
            index = 0;
        }

        if (typeof(index) === 'string') {
            switch (index) {
                case 'first': {
                    index = 0;
                    break;
                }
                case 'last': {
                    index = this.counter;
                    break;
                }
                default: {
                    throw new Error('List: delete - literal must be "first" or "last"');
                }

            }
        }

        if (index < 0) {
            throw new Error('List: delete - out of limits (negative index)');
        }
        if (index > this.counter + 1) {
            throw new Error('List: delete - out of limits (index oversized)');
        }

        if (this.isEmpty()) {
            throw new Error('List: delete - can´t delete in empty list');
        } else {
            // remove at head
            if (index === 0) {
                this.interiter = this.pointer;

                this.pointer = this.pointer.ptrnext;
                if (this.pointer !== undefined) {
                    this.pointer.ptrprev = undefined;
                }

                this.interiter.content = null;
                this.interiter.ptrprev = null;
                this.interiter.ptrnext = null;
                this.interiter = null;

                this.interiter = this.pointer;
                this.counter--;
            } else {
                if (index === this.counter) {
                    this.setInternalIterator('last');

                    let toDelete = this.interiter;

                    this.interiter = this.interiter.ptrprev;
                    if (this.interiter !== undefined) {
                        this.interiter.ptrnext = undefined;
                    }

                    toDelete.content = null;
                    toDelete.ptrprev = null;
                    toDelete.ptrnext = null;
                    toDelete = null;

                    this.counter--;
                } else {
                    this.setInternalIterator(index);

                    const prev = this.interiter.ptrprev;
                    const foll = this.interiter.ptrnext;

                    if (prev !== undefined) {
                        prev.ptrnext = foll;
                    }
                    if (foll !== undefined) {
                        foll.ptrprev = prev;
                    }

                    this.interiter.content = null;
                    this.interiter.ptrprev = null;
                    this.interiter.ptrnext = null;

                    if (prev !== undefined) {
                        this.interiter = prev;
                    } else {
                        if (foll !== undefined) {
                            this.interiter = foll;
                        } else {
                            this.interiter = undefined;
                        }
                    }

                    this.counter--;
                }
            }
        }
    }

    /**
     * Get content form first node in ListDbl (Moves the internal pointer)
     *
     * @returns {T} - Content from first node in ListDbl
     * @memberof ListDbl
     */
    public first(): T {
        if (this.isEmpty()) {
            throw new Error ('ListDbl: first - can´t get first from empty');
        } else {
            this.interiter = this.pointer;

            return this.interiter.content;
        }
    }

    /**
     * Get content from last item in ListDbl (Moves the internal pointer)
     *
     * @returns {T} - Last node content
     * @memberof ListDbl
     */
    public end(): T {
        this.setInternalIterator('last');

        return this.interiter.content;
    }

    /**
     * Get content of next node (Moves the internal pointer)
     *
     * @returns {T}
     * @memberof ListDbl
     */
    public next(): T {
        if (this.interiter.ptrnext === undefined) {
            throw new Error('ListDbl: next - can´t next on ended');
        } else {
            this.interiter = this.interiter.ptrnext;

            return this.interiter.content;
        }
    }

    /**
     * Get content of previous node (Moves the internal pointer)
     *
     * @returns {T}
     * @memberof ListDbl
     */
    public previous(): T {
        if (this.interiter.ptrprev === undefined) {
            throw new Error('ListDbl: previous - can´t previous at first node');
        } else {
            this.interiter = this.interiter.ptrprev;

            return this.interiter.content;
        }
    }

    /**
     * Get index position of content in DblList (Moves the internal pointer)
     *
     * @param {T} node - Content to find in ListDbl
     * @param {number} [index] - Index where to start searching
     * @returns {number} - Index of node with content found or -1 it not
     * @memberof ListDbl
     */
    public find(node: T, index?: number): number {

        this.interiter = this.pointer;

        if (index === undefined) {
            index = 0;
        }

        let res: number;
        res = index;

        if (this.isEmpty()) {
            throw new Error('ListDbl: find - can´t search in empty List');
        }

        this.setInternalIterator(index);

        while (this.interiter !== undefined) {
            if (this.interiter.content.equal(node) === 0) {
                break;
            } else {
                this.interiter = this.interiter.ptrnext;
                res++;
            }
        }

        if (res >= this.counter) {
            res = -1;
        }

        return res;
    }

    /**
     * Union cloned of two listDbl
     *
     * @param {ListDbl<T>} l1 - head of new listDbl
     * @param {ListDbl<T>} l2 - tail of new listDbl
     * @returns {ListDbl<T>} - New ListDbl resulting
     * @memberof ListDbl
     */
    public merge(l1: ListDbl<T>, l2: ListDbl<T>): ListDbl<T> {
        const result = new ListDbl<T>();

        if (!l1.isEmpty()) {
            for (const a of l1) {
                result.insert(a.clone(), 'last');
            }
        }
        if (!l2.isEmpty()) {
            for (const a of l2) {
                result.insert(a.clone(), 'last');
            }
        }

        return result;
    }

    /**
     * cloned tail of ListDbl taken from first to index
     *
     * @param {number} index - last item to consider inclusive
     * @returns {ListDbl<T>} - New cloned ListDbl heaving only firsts elements until index
     * @memberof ListDbl
     */
    public tail(index: number): ListDbl<T> {
        if (index < this.counter) {
            const newList = new ListDbl<T>();

            this.setInternalIterator(index);

            newList.insert(this.interiter.content.clone(), 'last');
            while (this.interiter.ptrnext !== undefined) {
                this.interiter = this.interiter.ptrnext;
                newList.insert(this.interiter.content.clone(), 'last');
            }

            return newList;
        } else {
            throw new Error('ListDbl: tail - Index for tail does not exists');
        }
    }

    /**
     * cloned head of listDbl token from index to last
     *
     * @param {number} index - first item to considenr inclusive
     * @returns {ListDbl<T>} - New cloned listDbl heaving lasts elements from index
     * @memberof ListDbl
     */
    public head(index: number): ListDbl<T> {

        if (index < this.counter) {
            const newList = new ListDbl<T>();

            this.setInternalIterator(index);

            newList.insert(this.interiter.content.clone(), 'first');
            while (this.interiter.ptrprev !== undefined) {
                this.interiter = this.interiter.ptrprev;
                newList.insert(this.interiter.content.clone(), 'first');
            }

            return newList;
        } else {
            throw new Error('ListDbl: head - Index for head does not exists');
        }
    }

    /**
     * @description Iterator over the List
     *
     * @returns {ListIterator<T>}
     * @memberof ListDbl
     */
    [Symbol.iterator](): ListIterator<T> {
        if (this.isEmpty()) {
            throw new Error('List: Iterator - can´t iterate empty List');
        } else {
            let Iterador: ListIterator<T>;
            Iterador = new ListIterator<T>(this.pointer, this.counter);

            return Iterador;
        }
    }

    /**
     * Shows List contents
     *
     * @param {string} [msg]
     * @memberof List
     */
    public listContent(msg?: string): void {
        let strout: string = '[';
        let bOutput: boolean = true;
        if (msg === undefined) {
            msg = 'list content';
        }

        console.log(msg);
        for (const a of this) {
            if (a.show !== undefined) {
                a.show();
                bOutput = false;
            } else {
                strout += a.toString() + ', ';
            }
        }

        if (bOutput) {
            strout = strout.substr(0, strout.length - 2);
            strout += ']';
            console.log(strout);
        }
    }

    /* Internal mechanic */
    /* Set internal iterator position */
    private setInternalIterator(n: number | string): void {
        this.interiter = this.pointer;

        // 'first' or 'last'
        if (typeof(n) === 'string') {
            switch (n) {
                case 'first': {
                    break;
                }
                case 'last': {
                    this.interiter = this.pointer;
                    while (this.interiter.ptrnext !== undefined) {
                        this.interiter = this.interiter.ptrnext;
                    }
                    break;
                }
                default: {
                    throw new Error('List: internal - can´t set unknow index');
                }
            }

        }

        // Arbitrary
        if (typeof(n) === 'number') {
            if (n <= this.counter) {
                for (let i = 0; i < n; i++) {
                    this.interiter = this.interiter.ptrnext;
                }
            } else {
                throw new Error('List: internal - can´t set internal iterator position');
            }
        }
    }
}

