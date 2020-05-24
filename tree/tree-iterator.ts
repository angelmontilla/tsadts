import { ResultIteration } from '../result-iteration';
import { TreeNode } from './tree-node';
import { ListDbl } from '../list/double/list-dbl';
import { IadtsCloneable } from '../iadts-cloneable';

/**
 *
 *
 * @export
 * @class TreeIterator
 * @implements {Iterator<T>}
 * @template T
 */
export class TreeIterator<T extends IadtsCloneable<T>> implements Iterator<T> {
    private pointer: TreeNode<T>;

    private list: ListDbl<TreeNode<T>>;
    private position: number;

    constructor(root: TreeNode<T>) {
        if (root === null || root === undefined) {
            throw new Error('TreeIterator: TreeIterator can´t iterate empty');
        }

        this.pointer = root;

        this.list = this.internalInorden(this.pointer);
        this.position = 0;
    }

    next(idx?: number): ResultIteration<T> {
        const item: ResultIteration<T> = new ResultIteration<T>();

        if (this.position < this.list.size()) {
            item.value = this.list.recover(this.position).content;
            this.position++;
        } else {
            return {done: true, value: undefined};
        }

        return item;
    }

    /**
     * free memory from iterator if it has ended prematurely
     *
     * @param {number} [idx]
     * @returns {ResultadoIteracion<T>}
     * @memberof StackIterator
     */
    return?(idx?: number): ResultIteration<T> {
        let item: ResultIteration<T> = new ResultIteration<T>();
        item = null;

        this.list.clear();
        this.position = -1;

        return item;
    }

    /**
     * is about forwarding a method call to a GENERATOR that is iterated over via yield*
     */
    throw?(e?: any): ResultIteration<T> {
        let item: ResultIteration<T> = new ResultIteration<T>();
        item = null;

        return item;
    }


    /* INTERNAL MECHANICS */
    private internalInorden(p: TreeNode<T>): ListDbl<TreeNode<T>> {
        let l: ListDbl<TreeNode<T>>;
        let t: TreeNode<T>;
        let r: ListDbl<TreeNode<T>>;

        if (p.left !== undefined) {
            l = this.internalInorden(p.left);
        } else {
            l = new ListDbl<TreeNode<T>>();
        }

        t = p;

        if (p.right !== undefined) {
            r = this.internalInorden(p.right);
        } else {
            r = new ListDbl<TreeNode<T>>();
        }

        l.insert(t, 'last');
        l = l.merge(l, r);

        return l;
    }

}
