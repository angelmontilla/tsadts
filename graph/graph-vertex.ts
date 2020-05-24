import { IadtsCloneable } from '../iadts-cloneable';

/**
 * @classdesc Class node for Graphs
 *
 * @export
 * @class GraphNode
 * @implements {IadtsCloneable<GraphNode<T>>}
 * @template T
 * @copyright (c)2020 Angel Manuel Montilla Jiménez
 * @license MIT license
 */
export class GraphVertex<T extends IadtsCloneable<T>> implements IadtsCloneable<GraphVertex<T>> {

    /**
     * @description Creates an instance of GraphVertex.
     * @param {T} [_content] - Content for vertex
     * 
     * @memberof GraphVertex
     */
    constructor(protected _content?: T) {
        if (_content === undefined || _content === null) {
            this._content = undefined;
        }
    }

    /**
     * @description get content for this node
     *
     * @readonly
     * @type {T}
     * @memberof TreeNode
     */
    get content(): T {
        return this._content;
    }

    /**
     * @description Set content for this node
     *
     * @memberof TreeNode
     */
    set content(c: T) {
        this._content = c;
    }

    /**
     * Generates a clone or copy from this vertex of Graph
     *
     * @returns {GraphNode<T>}
     * @memberof GraphNode
     */
    clone(): GraphVertex<T> {
        let tRes: GraphVertex<T>;

        tRes = new GraphVertex<T>(this.content.clone());

        return tRes;
    }

    /**
     * @description show vertex content it is for to be override and opcional
     *
     * @memberof GraphVertex
     */
    show?(): void {
        console.log('[content] -> ' + this.content.toString() );
    }

    /**
     * @description C way comparing content -1 - this is less, 0 - this is equal, 1 - this is greater
     *
     * @param {GraphVertex<T>} p - Content to compares
     * @returns {number} - -1 (this less), 0 (equal), 1 (this greater)
     * @memberof GraphVertex
     */
    equal(p: GraphVertex<T>): number {
        return this.content.equal(p.content);
    }

    /**
     * @description translate content of vertex to String
     *
     * @returns {string} - Vertex's content expresed as string
     * @memberof GraphVertex
     */
    toString?(): string {
        let s: string;

        s = this.content.toString();

        return s;
    }

}
