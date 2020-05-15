import { AbsTree } from '../abs-tree';
import { IadtsCloneable } from '../../iadts-cloneable';
import { TreeNode } from '../../tree-node';
import { ListDbl } from '../../list/double/list-dbl';
import { DQueue } from '../../queue/dynamic/d-queue';
import { TreeIterator } from '../tree-iterator';

/**
 * @description Binary sorted tree
 *
 * @export TAD tree methods and Iterator, so on
 * @class Tree
 * @extends {AbsTree<T>} - Base class with basic methods
 * @implements {Iterable<T>} - it has an Iterator
 * @template T
 */
export class Tree<T extends IadtsCloneable<T>> extends AbsTree<T> implements Iterable<T> {

    protected pRoot: TreeNode<T>;
    protected pIter: TreeNode<T>;
    protected count: number;

    /**
     * @description Tree constructor
     * @memberof Tree
     */
    constructor() {
        super();
        this.pRoot = undefined;
        this.pIter = undefined;
        this.count = -1;
    }

    /**
     * @description true if has no elements
     *
     * @returns {boolean} - true if empty
     * @memberof Tree
     */
    public isEmpty(): boolean {
        return this.pRoot === undefined;
    }

    /**
     * @description size - number of items in tree
     *
     * @returns {number}
     * @memberof Tree
     */
    public size(): number {
        return this.count+1;
    }

    /**
     * @description Determines if content belongs to tree
     *
     * @param {T} item - Item to look for
     * @param {(a: T, b: T) => number} [method] - Comparing method overloading equal of node
     * @returns {boolean} - true it belongs
     * @memberof Tree
     */
    public belongs(item: T, method?: (a: T, b: T) => number): boolean {
        let bResult: boolean = false;

        if (this.isEmpty()) {
            throw new Error ('Tree: belongs - Can´t "belongs" in isEmpty tree');
        } else {
            bResult = this.internalBelong(this.pRoot, item, method);
        }

        return bResult;
    }

    /**
     * @description Insert element in an ordered way if not exists
     *
     * @param {T} item - Item to insert
     * @param {(a: T, b: T) => number} [method] - Comparing method that overrides Node.equal method
     * @returns {boolean} - false if item yo insert exists previously
     * @memberof Tree
     */
    public insert(item: T, method?: (a: T, b: T) => number): boolean {
        let bResult: boolean;
        bResult = true;

        if (this.isEmpty()) {
            this.pRoot = new TreeNode(item);
            this.pIter = this.pRoot;
            this.count = 0;
        } else {
            this.pIter = this.pRoot;

            bResult = this.internalInsert(this.pIter, item, method);
        }

        return bResult;
    }

    /**
     * @description Create a empty tree
     *
     * @param {T} item
     * @memberof Tree
     * @todo go over tree marking each node and content for garbage collection
     */
    public create(item: T): void {

        // Still not marking content for garbage collection

        this.pRoot = new TreeNode(item);
        this.pIter = this.pRoot;
        this.count = 0;
    }

    /**
     * @description get Tree elements ir ordered way
     * inorder (left, root, right)
     * preorder (root, left, right) - pre-signed algebraic expressions
     * postorder (left, right, root) - hungarian notation for algebraic expressions
     * inverse (right, root, left)
     * level
     *
     * @returns {ListDbl<T>} - A List of items with order selected
     * @memberof Tree
     */
    public elements(method: string): ListDbl<T> {
        let l = new ListDbl<T>();

        switch (method) {
            case 'inorder':
                l = this.internalInorden(this.pRoot);
                break;
            case 'preorder':
                l = this.internalPreorden(this.pRoot);
                break;
            case 'postorder':
                l = this.internalPostorden(this.pRoot);
                break;
            case 'inverse':
                l = this.internalInverse(this.pRoot);
                break;
            case 'level':
                l = this.internalLevel(this.pRoot);
                break;
            default:
                throw new Error('Tree: elements - Only admit inorden, preorden, postorden and level');
        }

        return l;
    }

    /**
     * @description Deletes the node with content given
     *
     * @param {T} [item] - Content for node to delete
     * @returns {boolean} - true if node has been deleted
     * @memberof Tree
     */
    public delete(item?: T): boolean {
        let bResult: boolean = false;

        if (item === undefined || item === null) {
            item = this.pIter.content;
        }

        if (this.internalBelong(this.pRoot, item)) {
            const parent = this.pIter.parent;

            // If node to delete is leaf
            if (this.isLeaf()) {

                if (parent.left === this.pIter) {
                    parent.left = undefined;
                } else {
                    parent.right = undefined;
                }

                this.pIter = null;
                this.pIter = parent;

                bResult = true;
            } else {
                // if node has only one child
                if (this.pIter.left === undefined || this.pIter.right === undefined) {
                    const temp = (this.pIter.left === undefined) ? this.pIter.right : this.pIter.left;

                    temp.parent = parent;

                    if (parent.left === this.pIter) {
                        parent.left = temp;
                    } else {
                        parent.right = temp;
                    }

                    this.pIter = null;
                    this.pIter = parent;

                    bResult = true;
                } else { // Node has two childs
                    let workingPointer: TreeNode<T>;
                    let copyValue: T;
                    let tempmove: TreeNode<T>;

                    workingPointer = this.pIter;

                    // look for first greater
                    tempmove = this.pIter.right;
                    while (tempmove.left !== undefined) {
                        tempmove = tempmove.left;
                    }
                    copyValue = tempmove.content;

                    // remove node for first greater
                    this.delete(copyValue);

                    // this node is now first greater
                    workingPointer.content = copyValue;

                    bResult = true;
                }
            }
        } else {
            throw new Error('Tree - delete: can´t delete not exists item');
        }

        return bResult;
    }

    /**
     * @description Get min content from tree
     *
     * @returns {T} - min content from tree
     * @memberof Tree
     */
    public min(): T {
        let p: TreeNode<T>;

        if (this.isEmpty()) {
            throw new Error('Tree: min - can´t get min from empty tree');
        }

        p = this.pRoot;

        while (p.left !== undefined) {
            p = p.left;
        }

        return p.content;
    }

    /**
     * @description Get max content from tree
     *
     * @returns {T} - max content from tree
     * @memberof Tree
     */
    public max(): T {
        let p: TreeNode<T>;

        if (this.isEmpty()) {
            throw new Error('Tree: min - can´t get min from empty tree');
        }

        p = this.pRoot;

        while (p.right !== undefined) {
            p = p.right;
        }

        return p.content;
    }

    /**
     * @description Determines if Tree has consistent internal elements.
     *
     * @returns {boolean} - true if is a valid
     * @memberof Tree
     */
    public valid(): boolean {
        return this.internalValid(this.pRoot);
    }

    /**
     * @description Determines if current node has children
     *
     * @returns {boolean} - true if it has children node(s)
     * @memberof Tree
     */
    public isBranch(): boolean {
        let bResult: boolean = false;

        if (this.isEmpty()) {
            throw new Error('Tree: isBranch: Can´t isBranch on empty tree');
        } else {
            bResult = (this.pIter.left !== undefined) || (this.pIter.right !== undefined);
        }

        return bResult;
    }

    /**
     * @description Determines if this node is a child node
     *
     * @returns {boolean} - true if node has no child
     * @memberof Tree
     */
    public isLeaf(): boolean {
        return !this.isBranch();
    }

    /**
     * @description Getting root element if exists in a not destructive way
     *
     * @returns {T} - Cloned content in root node
     * @memberof Tree
     */
    public root(): T {
        let ret: T;

        ret = null;

        if (this.isEmpty()) {
            throw new Error('Tree: root - can´t set root position on empty tree');
        } else {
            this.pIter = this.pRoot;
            ret = this.pIter.content;
        }

        return ret;
    }

    /**
     * @description Set position at root node givin content
     *
     * @returns {T} - Content of root node
     * @memberof Tree
     */
    public parent(): T {
        let res: T;

        if (this.isEmpty()) {
            throw new Error('Tree: parent - can´t set root position on empty tree');
        } else {
            this.pIter = this.pRoot;
            res = this.pIter.content;
        }

        return res;
    }

    /**
     * @description set position in left node returning content
     *
     * @returns {T} - Content of left node
     * @memberof Tree
     */
    public leftChild(): T {
        let res: T;

        if (this.isEmpty()) {
            throw new Error('Tree - leftChild: Can´t leftChild on empty tree');
        } else {
            if (this.isLeaf()) {
                throw new Error('Tree - leftChild: Can´t leftChild on Leaf position');
            } else {
                if (this.pIter.left === undefined) {
                    throw new Error('Tree - leftChild: Can´t leftChild from this position');
                } else {
                    this.pIter = this.pIter.left;
                    res = this.pIter.content;
                }
            }
        }

        return res;
    }

    /**
     * @description set position on right node returning content
     *
     * @returns {T} - Content of right node
     * @memberof Tree
     */
    public rightChild(): T {
        let res: T;

        if (this.isEmpty()) {
            throw new Error('Tree - rightChild: Can´t rightChild on empty tree');
        } else {
            if (this.isLeaf()) {
                throw new Error('Tree - rightChild: Can´t rightChild on Leaf position');
            } else {
                if (this.pIter.right === undefined) {
                    throw new Error('Tree - rightChild: Can´t rightChild from this position');
                } else {
                    this.pIter = this.pIter.right;
                    res = this.pIter.content;
                }
            }
        }

        return res;
    }

    /**
     * @description - Iterator
     *
     * @returns {TreeIterator<T>} - An Iterator over tree
     * @memberof Tree
     */
    [Symbol.iterator](): TreeIterator<T> {
        if (this.isEmpty()) {
            throw new Error('Tree empty: can´t iterate');
        } else {
            let Iterator: TreeIterator<T>;

            Iterator = new TreeIterator<T>(this.pRoot);

            return Iterator;
        }
    }

    /**
     * @description Shows Tree content
     *
     * @param {string} [msg] - Optional message for show as heading
     * @memberof Tree
     */
    public treeContent(msg?: string): void {
        let list: ListDbl<T>;

        list = this.elements('inorder');

        list.listContent(msg);
    }

    /* INTERNAL METHODS */
    protected internalInsert(p: TreeNode<T>, i: T, m?: (a: T, b: T) => number): boolean {
        let iEqual: number;
        let bResult: boolean = true;

        if (m !== undefined) {
            iEqual = m(p.content, i);
        } else {
            iEqual = p.content.equal(i);
        }

        switch (iEqual) {
            case 0:
                bResult = false;
                break;
            case -1: // p < i
                if (p.right !== undefined) {
                    bResult = this.internalInsert(p.right, i, m);
                } else {
                    const newNode = new TreeNode(i, 0, p);
                    p.right = newNode;
                    this.pIter = newNode;
                    this.count++;
                }
                break;
            case 1: // p > i
                if (p.left !== undefined ) {
                    bResult = this.internalInsert(p.left, i, m);
                } else {
                    const newNode = new TreeNode(i, 0, p);
                    p.left = newNode;
                    this.pIter = newNode;
                    this.count++;
                }
                break;
        }

        return bResult;
    }

    /**
     * Find for content in tree changing internal iterator if it exists
     *
     * @private
     * @param {TreeNode<T>} p - Node for compares to
     * @param {T} i - Content to find
     * @param {(a:T, b: T) => number} [m] - method for comparing
     * @returns {boolean} - true if exists
     * @memberof Tree
     */
    protected internalBelong(p: TreeNode<T>, i: T, m?: (a: T, b: T) => number): boolean {
        let iEqual: number;
        let bResult: boolean = true;

        if (m !== undefined) {
            iEqual = m(p.content, i);
        } else {
            iEqual = p.content.equal(i);
        }

        switch (iEqual) {
            case 0:
                this.pIter = p;
                break;
            case -1: // p < i
                if (p.right !== undefined ) {
                    bResult = this.internalBelong(p.right, i, m);
                } else {
                    bResult = false;
                }
                break;
            case 1: // p > i
                if (p.left !== undefined) {
                    bResult = this.internalBelong(p.left, i, m);
                } else {
                    bResult = false;
                }
                break;
        }

        return bResult;
    }

    protected internalValid(p: TreeNode<T>): boolean {
        let bRes: boolean = false;

        if (p.left === undefined && p.right === undefined) {
            bRes = true;
        } else {

            if (p.left === undefined) {
                if (p.content.equal(p.right.content) > 0) {
                    bRes = false;
                } else {
                    bRes = this.internalValid(p.right);
                }
            } else {
                if (p.right === undefined) {
                    if (p.content.equal(p.left.content) < 0) {
                        bRes = false;
                    } else {
                        bRes = this.internalValid(p.left);
                    }
                } else {
                    if (p.content.equal(p.left.content) < 0 || p.content.equal(p.right.content) > 0) {
                        bRes = false;
                    } else {
                        bRes = true;
                    }
                }
            }
        }

        return bRes;
    }

    // inorder (left, root, right)
    protected internalInorden(p: TreeNode<T>): ListDbl<T> {
        let l: ListDbl<T>;
        let t: T;
        let r: ListDbl<T>;

        if (p.left !== undefined) {
            l = this.internalInorden(p.left);
        } else {
            l = new ListDbl<T>();
        }

        t = p.content;

        if (p.right !== undefined) {
            r = this.internalInorden(p.right);
        } else {
            r = new ListDbl<T>();
        }

        l.insert(t, 'last');
        l = l.merge(l, r);

        return l;
    }

    // preorder (root, left, right)
    protected internalPreorden(p: TreeNode<T>): ListDbl<T> {
        let t: T;
        let l: ListDbl<T>;
        let r: ListDbl<T>;

        t = p.content;

        if (p.left !== undefined) {
            l = this.internalPreorden(p.left);
        } else {
            l = new ListDbl<T>();
        }

        if (p.right !== undefined) {
            r = this.internalPreorden(p.right);
        } else {
            r = new ListDbl<T>();
        }

        l.insert(t, 'first');
        l = l.merge(l, r);

        return l;
    }

    // postorder (left, right, root)
    protected internalPostorden(p: TreeNode<T>): ListDbl<T> {
        let l: ListDbl<T>;
        let r: ListDbl<T>;
        let t: T;

        if (p.left !== undefined) {
            l = this.internalPostorden(p.left);
        } else {
            l = new ListDbl<T>();
        }

        if (p.right !== undefined) {
            r = this.internalPostorden(p.right);
        } else {
            r = new ListDbl<T>();
        }

        t = p.content;

        l = l.merge(l, r);
        l.insert(t, 'last');

        return l;
    }

    // postorder (right, root, left)
    protected internalInverse(p: TreeNode<T>): ListDbl<T> {
        let r: ListDbl<T>;
        let t: T;
        let l: ListDbl<T>;

        if (p.right !== undefined) {
            r = this.internalInverse(p.right);
        } else {
            r = new ListDbl<T>();
        }

        t = p.content;

        if (p.left !== undefined) {
            l = this.internalInverse(p.left);
        } else {
            l = new ListDbl<T>();
        }

        r.insert(t, 'last');
        l = l.merge(r, l);

        return l;
    }

    // level to level
    protected internalLevel(r: TreeNode<T>): ListDbl<T> {
        let q: DQueue<TreeNode<T>> = new DQueue<TreeNode<T>>();
        const p: DQueue<TreeNode<T>> = new DQueue<TreeNode<T>>();

        let j: TreeNode<T>;

        const l: ListDbl<T> = new ListDbl<T>();

        q.Enqueue(r);

        do {
            p.clear();
            while (!q.isEmpty()) {
                j = q.Dequeue();

                l.insert(j.content, 'last');

                if (j.left !== undefined) {
                    p.Enqueue(j.left);
                }
                if (j.right !== undefined) {
                    p.Enqueue(j.right);
                }
            }

            try {
                q = p.clone();
            } catch (e) {
                q = new DQueue<TreeNode<T>>();
            }

        } while (!p.isEmpty());

        return l;
    }
}
