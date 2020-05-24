import { IadtsCloneable } from '../iadts-cloneable';
/**
 * @classdesc Class node for tree
 *
 * @copyright (c)2020 Angel Manuel Montilla Jiménez
 * @license MIT license
 */
export class TreeNode<T extends IadtsCloneable<T>> implements IadtsCloneable<TreeNode<T>> {
    /**
     * Creates an instance of TreeNode.
     * @param {T} [_content] - Content into node
     * @param {number} [_height] - height of this node
     * @param {TreeNode<T>} [_ptrprnt] - Parent reference
     * @param {TreeNode<T>} [_ptrlft] - left child reference
     * @param {TreeNode<T>} [_ptrrgt] - right child reference
     * @memberof TreeNode
     */
    constructor(protected _content?: T,
                        protected _parent?: TreeNode<T>,
                        protected _left?: TreeNode<T>,
                        protected _right?: TreeNode<T>) {
        if (_content === null) {
            this._content = undefined;
        }
        if (_parent === null) {
            this._parent = undefined;
        }
        if (_left === null) {
            this._left = undefined;
        }
        if (_right === null) {
            this._right = undefined;
        }
    }

    /**
     * get content for this node
     *
     * @readonly
     * @type {T}
     * @memberof TreeNode
     */
    get content(): T {
        return this._content;
    }

    /**
     * Set content for this node
     *
     * @memberof TreeNode
     */
    set content(c: T) {
        this._content = c;
    }

    /**
     * Get parent node reference
     *
     * @readonly
     * @type {TreeNode<T>}
     * @memberof TreeNode
     */
    get parent(): TreeNode<T> {
        return this._parent;
    }

    /**
     * Set parent node referece
     *
     * @memberof TreeNode
     */
    set parent(p: TreeNode<T>) {
        this._parent = p;
    }

    get left(): TreeNode<T> {
        return this._left;
    }

    set left(p: TreeNode<T>) {
        this._left = p;
    }

    get right(): TreeNode<T> {
        return this._right;
    }

    set right(p: TreeNode<T>) {
        this._right = p;
    }

    // Implementing Interface IadtsCloneable
    clone(): TreeNode<T> {
        let t: TreeNode<T>;

        t = new TreeNode(this.content.clone(), this.parent, this.left, this.right);

        return t;
    }

    show?(): void {
        console.log('{[parent] -> ' + this.parent.content.toString() +
                    ' [left] -> ' + this.left.content.toString() +
                    ' [right] -> ' + this.right.content.toString() +
                    ' [content] -> ' + this.content.toString() + '}');
    }

    equal(p: TreeNode<T>): number {
        return this.content.equal(p.content);
    }

    toString?(): string {
        let s: string;

        s = '{[parent] -> ' + this.parent.content.toString() +
            ' [left] -> ' + this.left.content.toString() +
            ' [right] -> ' + this.right.content.toString() +
            ' [content] -> ' + this.content.toString() + '}';

        return s;
    }

}
