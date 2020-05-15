import { IadtsCloneable } from '../../iadts-cloneable';
import { Tree } from '../DTree/tree';
import { TreeNode } from '../../tree-node';

export class AvlTree<T extends IadtsCloneable<T>> extends Tree<T> implements Iterable<T>  {

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
            this.pRoot = new TreeNode(item, 1);
            this.pIter = this.pRoot;
            this.count = 0;
        } else {
            this.pIter = this.pRoot;

            bResult = this.internalInsert(this.pIter, item, method);
        }

        return bResult;
    }

    /* INTERNAL MECHANICS */
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

        // Now let convert to avl
        let hLeft: number = (p.left !== undefined) ? p.left.height : 0;
        let hRight: number = (p.right !== undefined) ? p.right.height : 0;

        p.height = Math.max(hLeft, hRight) + 1;

        // Get balance factor of this parent to check if this node became unbalanced
        // if it becames unbalanced we have 4 posible cases:
        let balance: number = this.internalBalanced(p);

        if (balance > 1 && p.content.equal(p.left.content)<0) {
            this.rightRotate(p);
        }

        if (balance > 1 && p.content.equal(p.left.content)>0) {
            this.leftRotate(p.left);
            this.rightRotate(p);
        }

        if (balance < -1 && p.content.equal(p.right.content)<0) {
            this.leftRotate(p);
        }

        if (balance < -1 && p.content.equal(p.right.content)>0) {
            this.rightRotate(p.right)
            this.leftRotate(p);
        }
        

        

        return bResult;
    }

    private internalBalanced(p: TreeNode<T>): number {
        const hLeft: number = (p.left !== undefined) ? p.left.height : 0;
        const hRight: number = (p.right !== undefined) ? p.right.height : 0;

        return hLeft - hRight;
    }

    private rightRotate(p: TreeNode<T>): void {
        let parent: TreeNode<T>;
        let pivot: TreeNode<T>;
        let temp2: TreeNode<T>;

        parent = (p.parent !== undefined) ? p.parent : undefined;
        pivot = (p.left !== undefined) ? p.left : undefined;
        temp2 = (pivot.right !== undefined) ? pivot.right : undefined;

        if (pivot !== undefined) {
            p.left = temp2;
            p.parent = pivot;

            pivot.parent = parent;
            pivot.right = p;

            if (temp2 !== undefined) {
                temp2.parent = p;
            }
        }
    }

    private leftRotate(p: TreeNode<T>): void {
        let parent: TreeNode<T>;
        let pivot: TreeNode<T>;
        let temp2: TreeNode<T>;

        parent = (p.parent !== undefined) ? p.parent : undefined;

        pivot = (p.right !== undefined) ? p.right : undefined;
        temp2 = (pivot.left !== undefined) ? pivot.left : undefined;

        if (pivot !== undefined) {
            p.right = temp2;
            p.parent = pivot;

            pivot.parent = parent;
            pivot.left = p;

            if (temp2 !== undefined) {
                temp2.parent = p;
            }
        }
    }



}
