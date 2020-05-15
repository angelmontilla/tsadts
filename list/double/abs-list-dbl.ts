export abstract class AbsListDbl<T> {
    // Determines if List is empty
    public abstract isEmpty(): boolean;

    // Get List Size
    public abstract size(): number;

    // Deletes content of List
    public abstract clear(): void;

    // Insert a new node in index position (if not position set will use pointer)
    public abstract insert(newNode: T, index: number): void;
    // recover node in index position (if not position set will use pointer)
    public abstract recover(index?: number): T;
    // remove node in index position
    public abstract remove(index: number);

    // set the pointer at first position
    public abstract first(): T;
    // set the pointer at last position
    public abstract end(): T;
    // set the pointer at next position
    public abstract next(): T;
    // set the pointer at previous position
    public abstract previous(): T;

    // get pointer at node position
    public abstract find(node: T, index?: number): number;

    // merge two lists
    public abstract merge(l1: AbsListDbl<T>, l2: AbsListDbl<T>): AbsListDbl<T>;
    // get sublist from next position to end
    public abstract tail(index: number): AbsListDbl<T>;
    // get sublist from first to previous to position
    public abstract head(index: number): AbsListDbl<T>;
}
