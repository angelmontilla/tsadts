import { IadtsCloneable } from '../iadts-cloneable';
import { GraphVertex } from './graph-vertex';

export class GraphItlEdge<T extends IadtsCloneable<T>, U extends IadtsCloneable<U>> implements IadtsCloneable<GraphItlEdge<T, U>> {

    /**
     * @description Creates an instance of GraphItlEdge.
     * label with null value must be permited for searching options
     * 
     * @param {GraphVertex<T>} _related - vertex related
     * @param {U} [_label] - label for this relation
     * @memberof GraphItlEdge
     */
    constructor(protected _related: GraphVertex<T>, protected _label?: U) {
        if (_related === null) {
            this._related = undefined;
        }
    }

    /**
     * @vertex get vertex related with an upper level
     *
     * @type {GraphVertex<T>}
     * @memberof GraphItlEdge
     */
    get related(): GraphVertex<T> {
        return this._related;
    }

    /**
     * @description set vertex related
     *
     * @memberof GraphItlEdge
     */
    set related(p: GraphVertex<T>) {
        this._related = p;
    }

    /**
     * @description get relation label
     *
     * @type {U}
     * @memberof GraphItlEdge
     */
    get label(): U {
        return this._label;
    }

    /**
     * @description set relation label
     *
     * @memberof GraphItlEdge
     */
    set label(p: U) {
        this._label = p;
    }

    /**
     * @description determines if two relations are same
     *
     * @param {GraphEdge<T, U>} o - relation to compare
     * @returns {number} - -1 - diferents, 0 -equals
     * @memberof GraphItlEdge
     */
    equalRelated(o: GraphItlEdge<T, U>): number {
        let res: number;

        res = this._related.equal(o.related);

        return res;
    }

    /**
     * @description Determines if label of relations are equal
     * if e passed as parameter has label null is for compares only vertex with no label
     *
     * @param {GraphItlEdge<T, U>} e - 
     * @returns {number} - -1 if this is less, 0 if equals, 1 i
     * @memberof GraphItlEdge
     */
    equalLabel(e: GraphItlEdge<T, U>): number {
        let res: number;

        // Extrict equality
        if (e._label !== null) {
            res = this.label.equal(e.label);
        } else {
            res = 0;
        }

        return res;
    }

    /**
     * @description clonate internal edge representation
     *
     * @returns {GraphItlEdge<T, U>} - a new internal edge clonated
     * @memberof GraphEdge
     */
    clone(): GraphItlEdge<T, U> {
        let res: GraphItlEdge<T, U>;

        res = new GraphItlEdge<T, U> (this._related.clone(),
                            this._label.clone());

        return res;
    }

    /**
     * @description (optional) for override showing Edge
     *
     * @memberof GraphItlEdge
     */
    show?(): void {
        console.log ('{'
            + '[related] -> ' + this._related.toString()
            + ' [label] -> ' + this._label.toString()
            + '}');
    }

    /**
     * @description determines if edges are equals
     *
     * @param {GraphEdge<T, U>} p - edge for comparing
     * @returns {number} -1 - differents, 0 - equals
     * @memberof GraphEdge
     */
    equal(p: GraphItlEdge<T, U>): number {
        let res: number = -1;

        if (p.related !== null && p.related !== undefined) {
            if (p.label !== null && p.label !== undefined) {
                if (this._related.equal(p.related) === 0 &&
                this._label.equal(p.label) === 0) {
                    res = 0;
                }
            } else {
                if (this._related.equal(p.related) === 0) {
                    res = 0;
                }
            }
        }

        return res;
    }

    /**
     * @description Optional for translate Internal Edge to String
     *
     * @returns {string} - String that represent edge
     * @memberof GraphEdge
     */
    toString?(): string {
        let s: string;

        s = '[related] -> ' + this._related.toString() +
            ' [label] -> ' + this._label.toString();

        return s;
    }
}
