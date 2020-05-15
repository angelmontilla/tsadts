import { ListDbl } from '../list/double/list-dbl';
import { IadtsCloneable } from '../iadts-cloneable';

export abstract class AbsTree<T extends IadtsCloneable<T>> {
    // isEmpty - determines if tree is empty
    public abstract isEmpty(): boolean;

    // size - number of elements in tree
    public abstract size(): number;

    // belongs(v) - if v belongs this tree
    public abstract belongs(item: T, method?: (a: T, b: T) => number): boolean;

    // insert (v,a) - inserts v (if not exists) following logical method
    public abstract insert(item: T, method?: (a: T, b: T) => number): boolean;

    // create (v) - create tree with v value inside
    public abstract create(item: T): void;

    // elements () - List ordered elements of tree
    public abstract elements(method: string): ListDbl<T>;

    // delete (v) - Removes v element inside
    public abstract delete(item?: T): boolean;

    // min () - Get min element in tree
    public abstract min(): T;

    // valid () - Verify if tree is correct
    public abstract valid(): boolean;

    // root() - get element in root position
    public abstract root(): T;
    // isBranch() - determines if element is a Branch
    public abstract isBranch(): boolean;
    // isLeaf() - determines if element is a leaf
    public abstract isLeaf(): boolean;
    // parent() - set new position to parent and get element
    public abstract parent(): T;
    // leftChild() - set new position at left and get element
    public abstract leftChild(): T;
    // rightChild() - set new position at right and get element
    public abstract rightChild(): T;


}
