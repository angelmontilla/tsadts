import { IadtsCloneable } from '../iadts-cloneable';
import { GraphVertex } from './graph-vertex';

/**
 * Vertex directional for join grph's nodes
 *
 * @export get set 
 * @class GraphVertex
 * @implements {IadtsCloneable<GraphVertex<T,U>>}
 * @template T
 * @template U
 */
export class GraphEdge<T extends IadtsCloneable<T>, U extends IadtsCloneable<U>> implements IadtsCloneable<GraphEdge<T,U>> {

    constructor(protected _origin: GraphVertex<T>,
                protected _destiny: GraphVertex<T>,
                protected _label?: U) {
        if (_origin === null) {
            this._origin = undefined;
        }

        if (_destiny === null) {
            this._destiny = undefined;
        }
        if (_label === null) {
            this._label = undefined;
        }
    }

    get origin(): GraphVertex<T> {
        return this._origin;
    }

    set origin(p: GraphVertex<T>) {
        this._origin = p;
    }

    get destiny(): GraphVertex<T> {
        return this._destiny;
    }

    set destiny(p: GraphVertex<T>) {
        this._destiny = p;
    }

    get label(): U {
        return this._label;
    }

    set label(p: U) {
        this._label = p;
    }

    equalOrigin(d: GraphEdge<T, U>): number {
        let res: number;

        res = this.origin.equal(d.origin);

        return res;
    }

    equalDestiny(o: GraphEdge<T, U>): number {
        let res: number;

        res = this.destiny.equal(o.destiny);

        return res;
    }

    equalLabel(e: GraphEdge<T, U>): number {
        let res: number;

        res = this.label.equal(e.label);

        return res;
    }

    /**
     * @description clonate an edge
     *
     * @returns {GraphEdge<T, U>} - a new edge clonated
     * @memberof GraphEdge
     */
    clone(): GraphEdge<T, U> {
        let res: GraphEdge<T, U>;

        res = new GraphEdge<T, U> (this.origin.clone(), 
                                    this.destiny.clone(),
                                    this.label.clone());

        return res;
    }

    /**
     * @description (optional) for override showing Edge
     *
     * @memberof GraphEdge
     */
    show?(origin?: GraphVertex<T>): void {
        console.log ('{'
                    + ' [origin] -> ' + this._origin.toString()
                    + ' [destiny] -> ' + this._destiny.toString()
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
    equal(p: GraphEdge<T, U>): number {
        let res: number = 0;

        if (this.label.equal(p.label) === 0 &&
            this.origin.equal(p.origin) === 0 &&
            this.destiny.equal(p.destiny) === 0) {
            res = 1;
        }

        return res;
    }

    /**
     * @description Optional for translate Edge to String
     *
     * @returns {string} - String that represent edge
     * @memberof GraphEdge
     */
    toString?(): string {
        let s: string;

        s = '[origin] -> ' + this._origin.toString() +
            ' [destiny] -> ' + this._destiny.toString() +
            ' [label] -> ' + this._label.toString();

        return s;
    }
}
