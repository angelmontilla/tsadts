/**
 * @description This is the basic node used for Stacks and Queues
 *
 * @export
 * @class DBaseNode
 * @template T
 */
export class DBaseNode<T> {

    /**
     * @description Creates an instance of DBaseNode.
     * @param {T} [_content]
     * @param {DBaseNode<T>} [_pointer]
     * @memberof DBaseNode
     */
    constructor(private _content?: T, private _pointer?: DBaseNode<T>) {
        if (_content === null) {
            this._content = undefined;
        }
        if (_pointer === null) {
            this._pointer = undefined;
        }
    }

    /**
     * @description Get content in DBaseNode, null for garbage collection and undefined for empty
     *
     * @type {T}
     * @memberof DBaseNode
     */
    get content(): T {
        return this._content;
    }

    /**
     * @description Set the content in DBaseNode, null for garbage collection and undefined for empty
     *
     * @memberof DBaseNode
     */
    set content(c: T) {
        this._content = c;
    }

    /**
     * @description Get previuos Node in a LIFO form
     *
     * @type {DBaseNode<T>} - Get pointer to previous node in LIFO logic or undefine if none
     * @memberof DBaseNode
     */
    get pointsto(): DBaseNode<T> {
        return this._pointer;
    }

    /**
     * @description Set pointer to the previous Node or undefined for none
     *
     * @memberof DBaseNode
     */
    set pointsto(p: DBaseNode<T>) {
        if (p === null) {
            this._pointer = undefined;
        }
        this._pointer = p;
    }
}
