export abstract class AbsQueue<T> {
    public abstract isEmpty(): boolean;
    public abstract Enqueue(newItem: T): void;
    public abstract Dequeue(): T;
    public abstract peek(): T;
    public abstract size(): number;
}