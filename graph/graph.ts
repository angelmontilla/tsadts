import { GraphVertex } from './graph-vertex';
import { IadtsCloneable } from '../iadts-cloneable';
import { AbsGraph } from './abs-graph';
import { GraphAdjacents } from './graph-adjacents';
import { GraphEdge } from './graph-edge';
import { ListDbl } from '../list/double/list-dbl';
import { GraphCapsule } from './graph-capsule';

/**
 *
 *
 * @export
 * @class Graph
 * @extends {AbsGraph<T, U>}
 * @template T
 * @template U
 */
export class Graph<T extends IadtsCloneable<T>, U extends IadtsCloneable<U>> extends AbsGraph<T, U> {
    private capsule: GraphCapsule<T, U>;

    constructor(vertex?: GraphVertex<T>) {
        super();

        if (vertex === null) {
            vertex = undefined;
        }

        this.capsule = new GraphCapsule();

        if (vertex !== undefined) {
            this.capsule.addVertex(vertex);
        }
    }

    /**
     * Add a new Vertex to Graph
     *
     * @param {GraphVertex<T>} v - Vertex to introduce in graph
     * @returns {boolean} - true if has been introduced
     * @memberof Graph
     */
    public addVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean = false;

        try {
            bRes = this.capsule.addVertex(v);
        } catch (err) {
            throw new Error('Graph: addVertex - can´t add vertex \n' + err.message);
        }

        return bRes;
    }

    /**
     * @description removes a vertex from Graph and all edges related
     *
     * @param {GraphVertex<T>} v - Vertex to remove
     * @returns {boolean} - true it has been deleted
     * @memberof Graph
     */
    public delVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        try {
            bRes = this.capsule.delVertex(v);
        } catch (err) {
            throw new Error('Graph: delVertex - can´t delete Vertex due ... \n' + err.message);
        }

        return bRes;
    }

    /**
     * Add an Edge for two vertex
     *
     * @param {GraphVertex<T>} o - Origin's vertex
     * @param {GraphEdge<T, U>} d - Destiny's vertex
     * @returns {boolean} - true if edge inserted
     * @memberof Graph
     */
    public addEdge(e: GraphEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        try {
            bRes = this.capsule.addEdge(e);
        } catch (err) {
            throw new Error('Graph: addEdge - can´t add Edge \n' + err.message);
        }

        return bRes;
    }


    /**
     * @description Deletes edge for vertex
     *
     * @param {GraphVertex<T>} e - Vertex origin for edge
     * @param {GraphVertex<T>} d - Vertex destiny for edge
     * @returns {boolean} - true if it has been deleted
     * @memberof Graph
     */
    public delEdge(e: GraphEdge<T, U>): boolean {
        let bRes: boolean = false;

        try {
            bRes = this.capsule.delEdge(e);
        } catch (err) {
            throw new Error ('Graph: delEdge - can´t delete Edge \n' + err.message);
        }

        return bRes;
    }

    /**
     * Determines if graph is empty
     *
     * @returns {boolean}
     * @memberof Graph
     */
    public isEmpty(): boolean {
        return this.capsule.isEmpty();
    }

    /**
     * Determines if graph has vertex inside
     *
     * @param {GraphVertex<T>} v - Vertex to search
     * @returns {boolean} - true if found
     * @memberof Graph
     */
    public hasVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;

        try {
            bRes = this.capsule.hasVertex(v);
        } catch (err) {
            throw new Error('Graph: hasVertex - error \n' + err.message);
        }

        return bRes;
    }

    /**
     * @description Determines if Graph has edge e
     *
     * @param {GraphEdge<T, U>} e - edge to find
     * @returns {boolean} - true if found
     * @memberof Graph
     */
    public hasEdge(e: GraphEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        try {
            bRes = this.capsule.hasEdge(e);
        } catch (err) {
            throw new Error('Graph: hasEdge - can´t determinate existence \n' + err.message);
        }

        return bRes;
    }

    /**
     * @description Get all vertex in Graph
     *
     * @returns {ListDbl<GraphVertex<T>>}
     * @memberof Graph
     */
    public getAllVertexs(): ListDbl<GraphVertex<T>> {
        let lRes: ListDbl<GraphVertex<T>>;

        try {
            lRes = this.capsule.getAllVertexs();
        } catch (err) {
            throw new Error('Graph: getAllVertexs - can´t get vertexs \n' + err.message);
        }

        return lRes;
    }

    /**
     * @description get all successors vertex of v
     *
     * @param {GraphVertex<T>} v - vertex to look for successors
     * @returns {ListDbl<GraphVertex<T>>} - list of successors
     * @memberof Graph
     */
    public getSuccessors(v: GraphVertex<T>): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        try {
            res = this.capsule.getSuccessorsVertexs(v);
        } catch (err) {
            throw new Error ('Graph: getSuccessors - can´t get successors \n' + err.message);
        }

        return res;
    }

    /**
     * @description get predecesors of "v" vertex
     *
     * @param {GraphVertex<T>} v - vertex where to find predecesors
     * @returns {ListDbl<GraphVertex<T>>} - List of predecesors if exist
     * @memberof Graph
     */
    public getPredecesors(v: GraphVertex<T>): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        try {
            res = this.capsule.getAncestorsVertexs(v);
        } catch (err) {
            throw new Error ('Graph: getPredecesors - can´t get predecesors \n' + err.message);
        }

        return res;
    }

    /**
     * @description get List of Vertexs adjacents
     *
     * @param {GraphVertex<T>} v - Vertex to look for
     * @returns {ListDbl<GraphVertex<T>>} - List of adjacentvertex
     * @memberof Graph
     */
    public getAdjacents(v: GraphVertex<T>): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        try {
            res = this.capsule.getAdjacentsVertexs(v);
        } catch (err) {
            throw new Error ('Graph: getAdjacents - can´t get adjacents \n' + err.message);
        }

        return res;
    }

    /**
     * @description set label or value for a edge of vertex
     *
     * @param {GraphVertex<T>} o - vertex for to search edge
     * @param {GraphEdge<T, U>} d - Edge for to set label
     * @returns {boolean} - true if it has been set to new value
     * @memberof Graph
     */
    public setEdgeLabel(e: GraphEdge<T, U>, u: U): boolean {
        let bRes: boolean = false;

        try {
            bRes = this.capsule.updateEdge(e, u);
        } catch (err) {
            throw new Error('Graph: setEdgeLabel - can´t set label \n' + err.message);
        }

        return bRes;
    }

    /**
     * @description get label or value from a Edge of a vertex
     *
     * @param {GraphVertex<T>} o
     * @param {GraphEdge<T, U>} d
     * @returns {U}
     * @memberof Graph
     */
    public getEdgeLabel(e: GraphEdge<T, U>): U {
        let res: U;
        res = undefined;

        try {
            res = this.capsule.getEdge(e).label;
        } catch (err) {
            throw new Error('Graph: getEdgeLabel - can´t get Edge label \n' + err.message);
        }

        return res;
    }

    /**
     * @description Determines if "o" is preceded by "d"
     *
     * @param {GraphVertex<T>} o - Node to be preceded
     * @param {GraphVertex<T>} d - Node must be predecessor
     * @returns {boolean} - true if "d" precedes "o"
     * @memberof Graph
     */
    public isPredecessor(o: GraphVertex<T>, d: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        let e: GraphEdge<T, U>;
        e = new GraphEdge(d, o, null);

        try {
            if (this.capsule.getEdge(e) !== null) {
                bRes = true;
            }
        } catch (err) {
            throw new Error('Graph: isPredeccessor - can´t determinate order \n' + err.message);
        }

        return bRes;
    }

    /**
     * Determines if vertex "o" has an edge to "d" vertex
     *
     * @param {GraphVertex<T>} o - Origin from where to look for
     * @param {GraphVertex<T>} d - Destiny vertex that must be conected
     * @returns {boolean} - True if exists edge from "o" to "d"
     * @memberof Graph
     */
    public isSuccessor(o: GraphVertex<T>, d: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        let e: GraphEdge<T, U>;
        e = new GraphEdge(o, d, null);

        try {
            if (this.capsule.getEdge(e) !== null) {
                bRes = true;
            }
        } catch (err) {
            throw new Error('Graph: isSuccessor - can´t determinate order \n' + err.message);
        }

        return bRes;
    }

}
