import { TreeNode } from '../tree-node';
import { AvlTree } from './avl-tree';
import { IadtsCloneable } from '../../iadts-cloneable';

export class AVLTreeNode<T extends IadtsCloneable<T>> extends TreeNode<T> {
    constructor(protected _content?: T,
                    protected _height?: number,
                    protected _parent?: AVLTreeNode<T>,
                    protected _left?: AVLTreeNode<T>,
                    protected _right?: AVLTreeNode<T>) {
        super();

        if (_content === null) {
            this._content = undefined;
        }
        if (_height === null) {
            this._height = 1;
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

    get height(): number {
        return this._height;
    }

    set height(height: number) {
        this._height = height;
    }

    get parent(): AVLTreeNode<T> {
        return this._parent;
    }

    set parent(p: AVLTreeNode<T>) {
        this._parent = p;
    }

    get left(): AVLTreeNode<T> {
        return this._left;
    }

    set left(p: AVLTreeNode<T>) {
        this._left = p;
    }

    get right(): AVLTreeNode<T> {
        return this._right;
    }

    set right(p: AVLTreeNode<T>) {
        this._right = p;
    }

    public rateHeight(): number {
        let left = (this.left !== undefined) ? this.left.height : 0;
        let right = (this.right !== undefined) ? this.right.height : 0;

        return left - right;
    }

    public calculateHeight() {
        let left = (this.left !== undefined) ? this.left.height : 0;
        let right = (this.right !== undefined) ? this.right.height : 0;

        return Math.max(left, right) + 1;
    }
}
