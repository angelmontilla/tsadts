import { IadtsCloneable } from '../../iadts-cloneable';
import { Tree } from '../DTree/tree';
import { AVLTreeNode } from './avltree-node';

export class AvlTree<T extends IadtsCloneable<T>> extends Tree<T> implements Iterable<T>  {

    protected pRoot: AVLTreeNode<T>;
    protected pIter: AVLTreeNode<T>;

    /**
     * @description Insert element in an ordered way if not exists in an AVL tree
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
            this.pRoot = new AVLTreeNode(item, 0);
            this.pIter = this.pRoot;
            this.count = 0;
        } else {
            this.pIter = this.pRoot;

            bResult = this.internalInsert(this.pIter, item, method);
        }

        return bResult;
    }

    public delete(item: T, method?: (a: T, b: T) => number): boolean {
        let bResult: boolean;
        bResult = true;

        if (this.isEmpty()) {
            throw new Error('AvlTree: delete - can´t delete on empty tree');
        } else {
            bResult = this.internalDelete(this.pRoot, item, method);
        }

        return bResult;
    }

    /* INTERNAL MECHANICS */
    protected internalInsert(p: AVLTreeNode<T>, i: T, m?: (a: T, b: T) => number): boolean {
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
                    const newNode = new AVLTreeNode(i, 1, p);
                    p.right = newNode;
                    this.pIter = newNode;
                    this.count++;
                }
                break;
            case 1: // p > i
                if (p.left !== undefined ) {
                    bResult = this.internalInsert(p.left, i, m);
                } else {
                    const newNode = new AVLTreeNode(i, 1, p);
                    p.left = newNode;
                    this.pIter = newNode;
                    this.count++;
                }
                break;
        }

        // if we have inserted
        if (bResult === true) {
            // Now let convert to avl
            p.height = p.calculateHeight();

            // Get balance factor of this parent to check if this node became unbalanced
            // if it becames unbalanced we have 4 posible cases:
            let balance: number = p.rateHeight();

            if (Math.abs(balance) > 1) { // Tree unbalanced
                if (balance < 0) { // Unbalanced right (more height at right)
                    // data < right.content
                    if (i.equal(p.right.content) < 0) {
                        this.rightRotate(p.right);
                        this.leftRotate(p);
                    } else { // data > right.content
                        this.leftRotate(p);
                    }
                }
                if (balance > 0) { // Unbalanced left (more height at left)
                    // data < left.content
                    if (i.equal(p.left.content) < 0) {
                        this.rightRotate(p);
                    } else { // data > left.content
                        this.leftRotate(p.left);
                        this.rightRotate(p);
                    }
                }
            }
        }

        return bResult;
    }

    private internalDelete(p: AVLTreeNode<T>, i: T, m?: (a: T, b: T) => number): boolean {
        let iEqual: number;
        let bResult: boolean = true;

        if (m !== undefined) {
            iEqual = m(p.content, i);
        } else {
            iEqual = p.content.equal(i);
        }

        switch (iEqual) {
            case 0: { // we have found it
                bResult = this.internalDeleteCase(p);
                break;
            }
            case 1: { // what we try to delete is minor -> find left (or not found?)
                if (p.left !== undefined) {
                    bResult = this.internalDelete(p.left, i, m);
                } else {
                    bResult = false;
                }
                break;
            }
            case -1: { // what we try to delete is greater -> find right (or not found?)
                if (p.right !== undefined) {
                    bResult = this.internalDelete(p.right, i, m);
                } else {
                    bResult = false;
                }
            }
        }

        if (bResult === true) {
            // Now let convert to avl
            p.height = p.calculateHeight();

            // Get balance factor of this parent to check if this node became unbalanced
            // if it becames unbalanced we have 4 posible cases:
            let balance: number = p.rateHeight();

            if (Math.abs(balance) > 1) { // Tree unbalanced
                if (balance < 0) { // Unbalanced right (more height at right)
                    // data < right.content
                    if (i.equal(p.right.content) < 0) {
                        this.rightRotate(p.right);
                        this.leftRotate(p);
                    } else { // data > right.content
                        this.leftRotate(p);
                    }
                }
                if (balance > 0) { // Unbalanced left (more height at left)
                    // data < left.content
                    if (i.equal(p.left.content) < 0) {
                        this.rightRotate(p);
                    } else { // data > left.content
                        this.leftRotate(p.left);
                        this.rightRotate(p);
                    }
                }
            }
        }

        return bResult;
    }

    private internalDeleteCase(p: AVLTreeNode<T>, m?: (a: T, b: T) => number): boolean {
        let bRes: boolean = false;
        let nodeCase: number;
        nodeCase = 0;

        nodeCase += (p.left !== undefined) ? 1 : 0;
        nodeCase += (p.right !== undefined) ? 1 : 0;

        switch (nodeCase) {
            case 0: { // it's a leaf
                if (p.parent !== undefined) {

                    // Update parent
                    if (p.parent.left === p) {
                        p.parent.left = undefined;
                    } else {
                        p.parent.right = undefined;
                    }

                    // Remove node
                    p.content = null; // mark for garbage collection
                    p = null; //mark for garbage collection

                    // Update tree
                    this.count--;
                } else { // The AvlTree is now Empty
                    this.pRoot = undefined;
                    this.pIter = undefined;
                    this.count = -1;
                }
                bRes = true;
                break;
            }
            case 1: { // Only one child
                let preserve: AVLTreeNode<T>;
                preserve = (p.left !== undefined) ? p.left : p.right;

                if (p.parent !== undefined) {
                    preserve.parent = p.parent;

                    if (p.parent.left === p) {
                        p.parent.left = preserve;
                    } else {
                        p.parent.right = preserve;
                    }

                    p.content = null; // mark for garbage collection
                    p = null; // mark for garbage collecion
                } else {
                    this.pRoot = preserve;
                    this.pIter = preserve;
                }

                this.count--;

                bRes = true;
                break;
            }
            case 2: { // two child node
                let searcher: AVLTreeNode<T>;
                let copyContent: T;

                // looking for the previous less value
                searcher = p.left;
                while (searcher.right !== undefined) {
                    searcher = searcher.right;
                }
                copyContent = searcher.content.clone();

                this.delete(copyContent, m);

                p.content = copyContent;

                this.count--;
                bRes = true;
            }
        }

        return bRes;
    }

    private rightRotate(p: AVLTreeNode<T>): void {
        let parent: AVLTreeNode<T>;
        let pivot: AVLTreeNode<T>;
        let temp2: AVLTreeNode<T>;

        parent = (p.parent !== undefined) ? p.parent : undefined;
        pivot = (p.left !== undefined) ? p.left : undefined;

        if (pivot !== undefined) {
            if (parent !== undefined) {
                if (parent.left === p) {
                    parent.left = pivot;
                } else {
                    parent.right = pivot;
                }
            }

            temp2 = (pivot.right !== undefined) ? pivot.right : undefined;

            p.left = temp2;
            p.parent = pivot;

            pivot.parent = parent;
            pivot.right = p;

            if (temp2 !== undefined) {
                temp2.parent = p;
            }

            p.height = p.calculateHeight();
            pivot.height = pivot.calculateHeight();

            if (this.pRoot === p) {
                this.pRoot = pivot;
            }
        }
    }

    private leftRotate(p: AVLTreeNode<T>): void {
        let parent: AVLTreeNode<T>;
        let pivot: AVLTreeNode<T>;
        let temp2: AVLTreeNode<T>;

        parent = (p.parent !== undefined) ? p.parent : undefined;
        pivot = (p.right !== undefined) ? p.right : undefined;

        if (pivot !== undefined) {

            if (parent !== undefined) {
                if (parent.left === p) {
                    parent.left = pivot;
                } else {
                    parent.right = pivot;
                }
            }

            temp2 = (pivot.left !== undefined) ? pivot.left : undefined;

            p.right = temp2;
            p.parent = pivot;

            pivot.parent = parent;
            pivot.left = p;

            if (temp2 !== undefined) {
                temp2.parent = p;
            }

            p.height = p.calculateHeight();
            pivot.height = pivot.calculateHeight();

            if (this.pRoot === p) {
                this.pRoot = pivot;
            }
        }
    }
}
