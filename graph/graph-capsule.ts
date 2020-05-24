import { GraphVertex } from './graph-vertex';
import { GraphAdjacents } from './graph-adjacents';
import { IadtsCloneable } from '../iadts-cloneable';
import { GraphEdge } from './graph-edge';
import { GraphItlEdge } from './graph-itl-edge';
import { ListDbl } from '../list/double/list-dbl';

export class GraphCapsule<T extends IadtsCloneable<T>, U extends IadtsCloneable<U>> {
    private itlGraph: Map<string, GraphAdjacents<T, U>>;

    constructor() {
        this.itlGraph = new Map<string, GraphAdjacents<T, U>>();
    }

    /**
     * @description add Vertex to internal graph representation
     *
     * @param {GraphVertex<T>} v - Vertex to add
     * @returns {boolean} - true if added
     * @memberof GraphCapsule
     * @throws can´t add empty
     */
    public addVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString()) === false) {
                this.itlGraph.set(v.toString(), new GraphAdjacents(v));
                bRes = true;
            } else {
                throw new Error('GraphCapsule: addVertex - can´t add vertex if it just exists');
            }
        } else {
            throw new Error('GraphCapsule: addVertex - can´t add empty vertex')
        }

        return bRes;
    }

    /**
     * @description Removes a vertex and all its eges
     *
     * @param {GraphVertex<T>} v - Vertex to remove from Graph
     * @returns {boolean} - true if vertex has been removed
     * @memberof GraphCapsule
     */
    public delVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                if (!this.itlGraph.get(v.toString()).hasNoAdjacentsVertex()) {
                    let lAd: ListDbl<GraphEdge<T, U>>;
                    lAd = this.itlGraph.get(v.toString()).getAdjacentsEdges();

                    for (const a of lAd) {
                        try {
                            if (this.hasEdge(a)) {
                                bRes = this.delEdge(a);
                            } else {
                                if (a.origin.equal(a.destiny) === 0) { // if it is an edge to itself
                                    bRes = true;
                                } else {
                                    bRes = false;
                                }
                            }
                        } catch (e) {
                            throw new Error('GraphCapsule: delVertex - can´t delete adjacent edge ' + e.message);
                        }

                        if (!bRes) {
                            break;
                        }
                    }
                }
                this.itlGraph.get(v.toString()).clear();
                bRes = this.itlGraph.delete(v.toString());

                if (bRes === false) {
                    throw new Error('GraphCapsule: delVertex - GRAPH HAS INSTABLE STATE');
                }
            } else {
                throw new Error('GraphCapsule: delVertex - can´t delete not existent vertex');
            }
        } else {
            throw new Error('GraphCapsule: delVertex - can´t delete empty vertex');
        }

        return bRes;
    }

    /**
     * @description get Vertex in idx insertion position
     *
     * @param {number} idx - index based in insertion order
     * @returns {GraphVertex<T>} - vertex or null if does not exists
     * @memberof GraphCapsule
     */
    public getVertex(idx: number): GraphVertex<T> {
        let res: GraphVertex<T>;
        res = null;

        if (idx >= 0 && idx < this.itlGraph.size) {
            let ind: number = 0;

            for (const a of this.itlGraph.values()) {
                if (ind === idx) {
                    res = a.getVertex();
                    break;
                }
                ind++;
            }
        } else {
            throw new Error('GraphCapsule - getVertex - can´t get out of index vertex');
        }

        return res;
    }

    /**
     * @description updateVertex content
     *
     * @param {GraphVertex<T>} v - Vertex to update
     * @param {T} t - new content
     * @returns {boolean} - true if it has been updated
     * @memberof GraphCapsule
     */
    public updateVertex(v: GraphVertex<T>, t: T): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                let Adj: GraphAdjacents<T, U>;
                Adj = this.itlGraph.get(v.toString());
                Adj.setVertexContent(t);

                let verK: GraphVertex<T>;
                verK = new GraphVertex(t);
                this.itlGraph.delete(v.toString());

                this.itlGraph.set(verK.toString(), Adj);

            } else {
                throw new Error('GraphCapsule: updateVertex - can´t update inexistent vertex');
            }
        }

        return bRes;
    }

    /**
     * @description Add a new Edge to Graph
     *
     * @param {GraphEdge<T, U>} e - Edge to add
     * @returns {boolean} - true if Edge has been added
     * @memberof GraphCapsule
     * @throws empty edge - not correct origin-destiny - internal error
     */
    public addEdge(e: GraphEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        if (e !== null && e !== undefined) {
            if (this.itlGraph.has(e.origin.toString()) && this.itlGraph.has(e.destiny.toString())) {
                try {
                    bRes = this.itlGraph.get(e.origin.toString()).addSuccessor(e.destiny, e.label);
                    bRes = bRes && this.itlGraph.get(e.destiny.toString()).addAncestor(e.origin, e.label);
                } catch (err) {
                    throw new Error('GraphCapsule: addEdge - can´t insert Edge ' + err.message);
                }
            } else {
                throw new Error('GraphCapsule: addEdge - can´t insert empty Edge with not correct origin-destiny');
            }
        } else {
            throw new Error('graphCapsule: addEge - can´t insert empty Edge');
        }

        return bRes;
    }

    /**
     * @description remove edge from graph
     *
     * @param {GraphEdge<T, U>} e - Edge to remove
     * @returns {boolean} - true if Edge has been removed
     * @memberof GraphCapsule
     * @throws can´t delete
     */
    public delEdge(e: GraphEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        if (e !== null && e !== undefined) {
            try {
                bRes = this.itlGraph.get(e.origin.toString()).delSuccessor(e.destiny);
                bRes = bRes && this.itlGraph.get(e.destiny.toString()).delAncestor(e.origin);
            } catch (e) {
                throw new Error('GraphCapsule: delEdge - can´t delete edge ' + e.message);
            }
        } else {
            throw new Error('GraphCapsule: delEdge - can´t delete empty edge');
        }

        return bRes;
    }

    /**
     * @description Get edge from map with origin o and destiny d
     *
     * @param {GraphVertex<T>} o - origin
     * @param {GraphVertex<T>} d - destiny
     * @returns {GraphEdge<T, U>} - Edge if it exists
     * @memberof GraphCapsule
     */
    public getEdge(e: GraphEdge<T, U>): GraphEdge<T, U> {
        let res: GraphEdge<T, U>;
        res = null;

        let o: GraphVertex<T>;
        let d: GraphVertex<T>;

        o = e.origin;
        d = e.destiny;

        if (o !== null && o !== undefined && d !== null && d !== undefined) {
            if (this.itlGraph.get(o.toString()).hasSuccessor(d, null)) {
                try {
                    res = this.itlGraph.get(o.toString()).getSuccessorEdge(d);
                } catch (err) {
                    throw new Error('GraphCapsule: getEdge - fail getting edge from successors');
                }
            }
        } else {
            throw new Error('GraphCapsule: getEdge - con´t find edge with origin-destiny');
        }

        return res;
    }


    /**
     * @description update Edge label
     *
     * @param {GraphEdge<T, U>} e - Edge to update
     * @param {U} u . new label value
     * @returns {boolean} - true if modified
     * @memberof GraphCapsule
     */
    public updateEdge(e: GraphEdge<T, U>, u: U): boolean {
        let bRes: boolean = false;
        let o: GraphVertex<T>;
        let d: GraphVertex<T>;

        if (e !== null && e !== undefined) {
            o = e.origin;
            d = e.destiny;

            if (this.itlGraph.has(o.toString()) && this.itlGraph.has(d.toString())) {
                try {
                    bRes = this.itlGraph.get(o.toString()).setLabelSuccessors(d, u);
                    bRes = bRes && this.itlGraph.get(d.toString()).setLabelAncestor(o, u);
                } catch (err) {
                    throw new Error('GraphCapsule: updateEdge - Error updating label ' + err.name + ' ' + err.message);
                }
            } else {
                throw new Error('GraphCapsule: updateEdge - can´t update label of not existent edge');
            }
        } else {
            throw new Error('GraphCapsule: updateEdge - can´t update empty Edge');
        }

        return bRes;
    }

    /**
     * @description Get successors vertexs of v
     *
     * @param {GraphVertex<T>} v - Vertex for to get successors
     * @returns {ListDbl<GraphVertex<T>>} - List of successors vertex of v
     * @memberof GraphCapsule
     * @throws can´t get successors - v not in graph - v is invalid
     */
    public getSuccessorsVertexs(v: GraphVertex<T>): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                try {
                    res = this.itlGraph.get(v.toString()).getSuccessors();
                } catch (err) {
                    throw new Error('GraphCapsule: getSuccessorsVertexs - can´t get successors\n' + err.message);
                }
            } else {
                throw new Error('GraphCapsule: getSuccessorsVertexs - can´t get successors of vertex not in Graph');
            }
        } else {
            throw new Error('GraphCapsule: getSuccessorsVertexs - can´t get successors of empty');
        }

        return res;
    }

    /**
     * @description Get successors edges of vertex v
     *
     * @param {GraphVertex<T>} v - Vertex to get successors edges
     * @returns {ListDbl<GraphEdge<T, U>>} - List of successors edges
     * @memberof GraphCapsule
     * @throws can´t get sucessores - vertex not in Graph - vertex is invalid
     */
    public getSuccessorsEdges(v: GraphVertex<T>): ListDbl<GraphEdge<T, U>> {
        let lres: ListDbl<GraphEdge<T, U>>;
        lres = new ListDbl<GraphEdge<T, U>>();

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                try {
                    lres = this.itlGraph.get(v.toString()).getSuccessorsEdges();
                } catch (err) {
                    throw new Error('GraphCapsule: getSuccessorsEdges - can´t get successors edges\n' + err.message);
                }
            } else {
                throw new Error('GraphCapsule: getSuccessorsEdges - can´t get successors edges of vertex not in Graph');
            }
        } else {
            throw new Error('GraphCapsule: getSuccessorsEdges - can´t get edge successors of empty');
        }

        return lres;
    }

    /**
     * @description get ancestors vertexs of v
     *
     * @param {GraphVertex<T>} v - Vertex for to get ancestors
     * @returns {ListDbl<GraphVertex<T>>} - List of ancestors vertex of v
     * @memberof GraphCapsule
     * @throws can´t get ancestors - v not in graph - v is invalid
     */
    public getAncestorsVertexs(v: GraphVertex<T>): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                try {
                    res = this.itlGraph.get(v.toString()).getAncestors();
                } catch (err) {
                    throw new Error('GraphCapsule: getAncestorsVertexs - can´t get ancestors\n' + err.message);
                }
            } else {
                throw new Error('GraphCapsule: getAncestorsVertexs - can´t get ancestors of vertex not in Graph');
            }
        } else {
            throw new Error('GraphCapsule: getAncestorsVertexs - can´t get ancestors of empty');
        }

        return res;
    }

    /**
     * @description get ancestors edeges of v
     *
     * @param {GraphVertex<T>} v - Vertex for to get ancestors edges
     * @returns {ListDbl<GraphEdge<T, U>>} - List of ancestors edges of v
     * @memberof GraphCapsule
     * @throws can´t get ancestors edges - vertex not in graph - vertex is invalid
     */
    public getAncestorsEdges(v: GraphVertex<T>): ListDbl<GraphEdge<T, U>> {
        let lres: ListDbl<GraphEdge<T, U>>;
        lres = new ListDbl<GraphEdge<T, U>>();

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                try {
                    lres = this.itlGraph.get(v.toString()).getAncestorsEdges();
                } catch (err) {
                    throw new Error('GraphCapsule: getAncestorsEdges - can´t get ancestors edges\n' + err.message);
                }
            } else {
                throw new Error('GraphCapsule: getAncestorsEdges - can´t get ancestors edges of vertex not in Graph');
            }
        } else {
            throw new Error('GraphCapsule: getancestorsEdges - can´t get ancestors edges of empty');
        }

        return lres;

    }

    /**
     * @description get List of all vertex in Graph
     *
     * @returns {ListDbl<GraphVertex<T>>} - All vertexs of Graph
     * @memberof GraphCapsule
     */
    public getAllVertexs(): ListDbl<GraphVertex<T>> {
        let lRes: ListDbl<GraphVertex<T>>;
        lRes = new ListDbl<GraphVertex<T>>();

        try {
            for (const a of this.itlGraph.values()) {
                lRes.insert (a.getVertex(), 'last');
            }
        } catch (err) {
            throw new Error('GraphCapsule: getAllVertexs - can´t get vertexs');
        }

        return lRes;
    }


    /**
     * @description Get Vertex adjacents of v
     *
     * @param {GraphVertex<T>} v - vertex for find adjacents vertexs
     * @returns {ListDbl<GraphVertex<T>>} - List of adjacents vertex to v
     * @memberof GraphCapsule
     */
    public getAdjacentsVertexs(v: GraphVertex<T>): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                try {
                    res = this.itlGraph.get(v.toString()).getAdjacents();
                } catch (e) {
                    throw new Error('GraphCapsule: getAdjacentsVertexs - can´t get adjacents' + e.message);
                }
            } else {
                throw new Error('GraphCapsule: getAdjacentsVertexs - can´t get adjacents of inexistent vertex');
            }
        } else {
            throw new Error('GraphCapsule: getAdjacentsVertexs - can´t get adjacents of empty');
        }

        return res;
    }

    /**
     * @description Has graph vertex
     *
     * @param {GraphVertex<T>} v - vertex to find
     * @returns {boolean} - true if exists vertex
     * @memberof GraphCapsule
     */
    public hasVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            if (this.itlGraph.has(v.toString())) {
                bRes = true;
            }
        } else {
            throw new Error('GraphCapsule: hasVertex - can´t find empty vertex');
        }

        return bRes;
    }

    /**
     * @description Has graph an Edge
     *
     * @param {GraphEdge<T, U>} e - Edge to find
     * @returns {boolean} - true if ii exists
     * @memberof GraphCapsule
     */
    public hasEdge(e: GraphEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        if (e !== null && e !== undefined) {
            let iO: GraphVertex<T>;
            let iE: GraphItlEdge<T, U>;

            iO = e.origin;
            iE = new GraphItlEdge(e.destiny, e.label);

            if (this.itlGraph.has(iO.toString())) {
                if (this.itlGraph.get(iO.toString()).hasSuccessorItl(iE)) {
                    bRes = true;
                }
            } else {
                throw new Error('GraphCapsule: hasEdge - can´t set edge if vertexs not exists');
            }

        } else {
            throw new Error('GraphCapsule: hasEdge - can´t find empty');
        }

        return bRes;
    }

    /**
     * @description Is Graph empty?
     *
     * @returns {boolean} - true if Graph is empty
     * @memberof GraphCapsule
     */
    public isEmpty(): boolean {
        return (this.itlGraph.size === 0);
    }
}
