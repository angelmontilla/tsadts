export abstract class AbsStack<T> {
    public abstract isEmpty(): boolean;
    public abstract push(newItem: T): void;
    public abstract pop(): T;
    public abstract top(): T;
    public abstract size(): number;
    public abstract stackContent(msg?: string): void;
}
