/**
 * @description interface to implement for objects in nodes 
 * it provides:
 * - a clone method
 * - a show method
 * - a equal (-1 less, 0 equal, 1 greater)
 *
 * @export clone, show, equal
 * @interface IadtsCloneable - Interface for to be implemented for objects in nodes
 * @template T - Class of your objects
 */
export interface IadtsCloneable<T> {
    /**
     * Only you know clonate your own objects
     *
     * @param {T} obt - Object to clonate
     * @returns {T} - Colnated Object
     * @memberof IadtsCloneable
     */
    clone(): T;

    /**
     * Let me know the form you want show your object
     *
     * @param {(obj) => any} [p] -- function that describes showing way
     * @memberof IadtsCloneable
     */
    show?(): void;

    /**
     * @description Compares 2 elements of same kind
     *
     * @param {*} T - Element to compares
     * @returns {number} - (-1 less) (0 equal) (1 greater)
     * @memberof IadtsCloneable
     */
    equal(p: T): number;

    /**
     * @description returns object in string format
     *
     * @returns {string}
     * @memberof IadtsCloneable
     */
    toString?(): string;
}
