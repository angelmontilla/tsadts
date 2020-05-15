import { AbsList } from './abs-list';
import { DDbldNode } from '../../d-dbld-node';
import { IadtsCloneable } from '../../iadts-cloneable';
import { ListIterator } from '../list-iterator';


export class List<T extends IadtsCloneable<T>> extends AbsList<T> implements Iterable<T> {

    private pointer: DDbldNode<T>; // Ever stay at first element
    private interiter: DDbldNode<T>; // Moving inner iterator
    private counter: number; // Nomber of items in List

    /**
     * @description Creates an instance of List.
     * @memberof List
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
     * @memberof List
     */
    public isEmpty(): boolean {
        return this.counter === -1;
    }

    /**
     * @description How much items in list
     *
     * @returns {number} - number of items
     * @memberof List
     */
    public size(): number {
        return this.counter + 1;
    }

    /**
     * @description Removes all items in List
     *
     * @memberof List
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
     * @memberof List
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
                    throw new Error('List: insert - literal must be "first" or "last"');
                }
            }
        }

        if (index < 0) {
            throw new Error('List: insert - out of limits (negative index)');
        }
        if (index > this.counter + 1) {
            throw new Error('List: insert - out of limits (index oversized)');
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
                    //this.interiter = this.pointer;
                    index = 0;
                    break;
                }
                case 'last': {
                    //this.setInternalIterator('last');
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

                    let prev = this.interiter.ptrprev;
                    let foll = this.interiter.ptrnext;

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
     * @description Get Item clone for index position
     *
     * @param {number} index - index (based 0) of the item in list
     * @returns {T} - (node "index")'s content
     * @memberof List
     */
    public recover(index?: number | string): T {
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
                    throw new Error('List: get - can´t get from an un');
                }
            }
        }

        if (index < this.counter + 1) {
            this.setInternalIterator(index);

            return this.interiter.content;
        } else {
            throw new Error('List: get - can´t get for an inexistent index');
        }
    }

    /**
     * @description Search node in List
     *
     * @param {T} node - To search
     * @returns {number} - (-1) if not found (value) or position on List
     * @memberof List
     */
    public find(node: T, index?: number): number {

        this.interiter = this.pointer;

        if (index === undefined) {
            index = 0;
        }

        let res: number;
        res = index;

        if (this.isEmpty()) {
            throw new Error('List: find - can´t search in empty List');
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
     * @description merge list l1 (head) with l2 (tail)
     *
     * @param {List<T>} l1 - head side of merge
     * @param {List<T>} l2 - tail side of merge
     * @returns {List<T>} - new list l1 union l2
     * @memberof List
     */
    public merge(l1: List<T>, l2: List<T>): List<T> {
        const result = new List<T>();

        for (const a of l1) {
            result.insert(a.clone(), 'last');
        }
        for (const a of l2) {
            result.insert(a.clone(), 'last');
        }

        return result;
    }

    /**
     * @description get a new list from tail where new first item is index (not destructive)
     *
     * @param {number} index - first new element
     * @returns {AbsList<T>} - A new List from tail of List
     * @memberof List
     */
    public tail(index: number): List<T> {
        if (index < this.counter) {
            const newList = new List<T>();

            this.setInternalIterator(index);

            newList.insert(this.interiter.content.clone(), 'last');
            while (this.interiter.ptrnext !== undefined) {
                this.interiter = this.interiter.ptrnext;
                newList.insert(this.interiter.content.clone(), 'last');
            }

            return newList;
        } else {
            throw new Error('List: tail - Index for tail does not exists');
        }
    }

    /**
     * @description get a new list from head where new last item is index (not destrictive)
     *
     * @param {number} index
     * @returns {AbsList<T>}
     * @memberof List
     */
    public head(index: number): List<T> {

        if (index < this.counter) {
            const newList = new List<T>();

            this.setInternalIterator(index);

            newList.insert(this.interiter.content.clone(), 'first');
            while (this.interiter.ptrprev !== undefined) {
                this.interiter = this.interiter.ptrprev;
                newList.insert(this.interiter.content.clone(), 'first');
            }

            return newList;
        } else {
            throw new Error('List - head: Index for head does not exists');
        }
    }

    /**
     * @description Iterator over the List
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
