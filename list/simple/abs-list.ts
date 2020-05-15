
export abstract class AbsList<T> {
    // Determines if List is empty
    public abstract isEmpty(): boolean;

    // Get List Size
    public abstract size(): number;

    // Deletes content of List
    public abstract clear(): void;

    // Insert node in index position
    public abstract insert(newNode: T, index: number): void;
    // removes node in index position
    public abstract remove(index: number): void;

    // Get node clone in index position
    public abstract recover(index: number): T;

    // get index position of node (if exists)
    public abstract find(node: T): number;

    // Merge two lists
    public abstract merge(l1: AbsList<T>, L2: AbsList<T>): AbsList<T>;
    // Tail including index position
    public abstract tail(index: number): AbsList<T>;
    // Head including index position
    public abstract head(index: number): AbsList<T>;
}
