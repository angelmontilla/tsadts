/**
 * @description Node for dobled linked estructure
 * 
 * @class DDbldNode<T>
 */
export class DDbldNode<T> {

    /**
     * Creates an instance of DDbldNode.
     * @param {T} [_content]
     * @param {DDbldNode<T>} [_ptrprev]
     * @param {DDbldNode<T>} [_ptrnext]
     * @memberof DDbldNode
     */
    constructor(private _content?: T, private _ptrprev?: DDbldNode<T>, private _ptrnext?: DDbldNode<T>) {
        if (_content === null) {
            this._content = undefined;
        }
        if (_ptrprev === null) {
            this._ptrprev = undefined;
        }

        if (_ptrnext === null) {
            this._ptrnext = undefined;
        }
    }

    /**
     * @description Get content in DBaseNode, null for garbage collection and undefined for empty
     *
     * @type {T}
     * @memberof DDbldNode
     */
    get content(): T {
        return this._content;
    }

    /**
     * @description Set the content in DBaseNode, null for garbage collection and undefined for empty
     *
     * @memberof DDbldNode
     */
    set content(c: T) {
        this._content = c;
    }

    /**
     * @description Get previuos Node
     *
     * @type {DBaseNode<T>} - Get pointer to previous node
     * @memberof DDbldNode
     */
    get ptrprev(): DDbldNode<T> {
        return this._ptrprev;
    }

    /**
     * @description Set pointer to the previous Node
     *
     * @memberof DDbldNode
     */
    set ptrprev(p: DDbldNode<T>) {
        if (p === null) {
            this._ptrprev = undefined;
        }
        this._ptrprev = p;
    }

    /**
     * @description Get next Node
     *
     * @type {DBaseNode<T>} - Get pointer to following node
     * @memberof DDbldNode
     */
    get ptrnext(): DDbldNode<T> {
        return this._ptrnext;
    }

    /**
     * @description Set pointer to the next Node
     *
     * @memberof DDbldNode
     */
    set ptrnext(p: DDbldNode<T>) {
        if (p === null) {
            this._ptrnext = undefined;
        }
        this._ptrnext = p;
    }

}
