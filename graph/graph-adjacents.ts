import { IadtsCloneable } from '../iadts-cloneable';
import { GraphItlEdge } from './graph-itl-edge';
import { ListDbl } from '../list/double/list-dbl';
import { GraphVertex } from './graph-vertex';
import { GraphEdge } from './graph-edge';

/**
 * @description List of adjacents for vertexs on graph
 *
 * @export
 * @class GraphAdjacents
 * @template T
 * @template U
 */
export class GraphAdjacents<T extends IadtsCloneable<T>, U extends IadtsCloneable<U>> {
    private vertex: GraphVertex<T>;
    private ancestors: ListDbl<GraphItlEdge<T, U>>;
    private successors: ListDbl<GraphItlEdge<T, U>>;

    constructor(v: GraphVertex<T>) {
        if (v === null || v === undefined) {
            throw new Error('GraphAdjacents: Can´t create an Adjacents List of empty vertex');
        }

        this.vertex = v;
        this.ancestors = new ListDbl();
        this.successors = new ListDbl();
    }

    /**
     * @description Add an vertex as successor
     *
     * @param {GraphVertex<T, U>} v - vertex to add as successor
     * @returns {boolean} - true if it has beed inserted
     * @memberof GraphAdjacents
     * @throws addSuccessor - fail at List insert
     */
    addSuccessor(d: GraphVertex<T>, u: U): boolean {
        let bRes: boolean;
        bRes = false;

        if (d !== null || d !== undefined) {

            const iD = new GraphItlEdge(d, u);

            if (this.successors.isEmpty()) {
                try {
                    this.successors.insert(iD, 'last');
                    bRes = true;
                } catch (e) {
                    throw new Error('GraphAdjacents: addSuccessor - fail at List insert ' + e.message);
                }
            } else {
                if (this.successors.find(iD) === -1) {
                    try {
                        this.successors.insert(iD, 'last');
                        bRes = true;
                    } catch (e) {
                        throw new Error('GraphAdjacents: addSuccessor - fail at List insert ' + e.message);
                    }
                }
            }
        } else {
            throw new Error('GraphAdjacents: addSuccessor - can´t add empty successor');
        }

        return bRes;
    }

    /**
     * @description Add an vertex as Ancestor
     *
     * @param {GraphVertex<T>} v - vertex to be ancestor
     * @returns {boolean} - true if edge has been inserted
     * @memberof GraphAdjacents
     * @throws addAncestor - fail at List insert
     */
    addAncestor(o: GraphVertex<T>, u: U): boolean {
        let bRes: boolean;
        bRes = false;

        if (o !== null && o !== undefined) {
            const iO = new GraphItlEdge(o, u);

            if (this.ancestors.isEmpty()) {
                try {
                    this.ancestors.insert(iO, 'last');
                    bRes = true;
                } catch (e) {
                    throw new Error('GraphAdjacents: addAncestor - fail at List insert ' + e.message);
                }
            } else {
                if (!this.ancestors.isEmpty() && this.ancestors.find(iO) === -1) {
                    try {
                        this.ancestors.insert(iO, 'last');
                        bRes = true;
                    } catch (e) {
                        throw new Error('GraphAdjacents: addAncestor - fail at List insert ' + e.message);
                    }
                }
            }
        } else {
            throw new Error('GraphAdjacents: addAncestor - can´t add empty vertex ');
        }

        return bRes;
    }

    /**
     * @description delete an vertex of Successors list
     *
     * @param {GraphVertex<T} v - Vertex to be removed
     * @returns {boolean} - true if vertex has been removed
     * @memberof GraphAdjacents
     * @throws fail finding successor or fail removing
     */
    delSuccessor(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {

            let iV: GraphItlEdge<T, U>;
            iV = new GraphItlEdge(v, null);

            let idx: number;
            try {
                idx = this.successors.find(iV);
            } catch (e) {
                throw new Error ('GraphAdjacents: delSuccessor - fail finding successor ' + e.message);
            }

            if (idx !== -1) {
                try {
                    this.successors.remove(idx);
                } catch (e) {
                    throw new Error ('GraphAdjacents: delSuccessor - fail removing list ' + e.message);
                }
                bRes = true;
            }
        } else {
            throw new Error ('GraphAdjacents: delSuccessor - can´t remove empty vertex');
        }

        return bRes;
    }

    /**
     * @description delete an edge of Ancestors list
     *
     * @param {GraphEdge<T, U>} v - Edge to remove
     * @returns {boolean} - true if edge is not an Ancestor
     * @memberof GraphAdjacents
     * @throws fail finding ancestor or fail removing list
     */
    delAncestor(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {

            let idx: number;
            let iV: GraphItlEdge<T, U>;
            iV = new GraphItlEdge(v, null);

            try {
                idx = this.ancestors.find(iV);
            } catch (e) {
                throw new Error ('GraphAdjacents: delAncestor - fail finding ancestor ' + e.message);
            }

            if (idx !== -1 ) {
                try {
                    this.ancestors.remove(idx);
                } catch (e) {
                    throw new Error ('GraphAdjacents: delAncestor - fail removing list ' + e.message);
                }
                bRes = true;
            }
        } else {
            throw new Error('GraphAdjacents: delAncestor - can´t remove empty vertex');
        }

        return bRes;
    }

    /**
     * @description Get List of vertex successor not destruction allowed
     *
     * @returns {ListDbl<GraphVertex<T>>} - List of vertexs successors
     * @memberof GraphAdjacents
     */
    getSuccessors(): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        if (this.successors.isEmpty() === false) {
            for (const a of this.successors) {
                res.insert(a.related.clone(), 'last');
            }
        }

        return res;
    }

    /**
     * @description Get edges successors
     *
     * @returns {ListDbl<GraphEdge<T, U>>} - List of successors edges
     * @memberof GraphAdjacents
     */
    getSuccessorsEdges(): ListDbl<GraphEdge<T, U>> {
        let res: ListDbl<GraphEdge<T, U>>;
        res = new ListDbl<GraphEdge<T, U>>();

        if (this.successors.isEmpty() === false) {
            for (const a of this.successors) {
                try {
                    res.insert(new GraphEdge(this.vertex, a.related, a.label), 'last');
                } catch (e) {
                    throw new Error('GraphAdjacents: getSuccesorsEdges - Error insert ' + e.message);
                }
            }
        }

        return res;
    }

    /**
     * @description get List of Ancestors Vertexs not destruction allowed
     *
     * @returns {ListDbl<GraphVertex<T>>} - List of Ancestors vertexs
     * @memberof GraphAdjacents
     */
    getAncestors(): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        if (this.ancestors.isEmpty() === false) {
            for (const a of this.ancestors) {
                res.insert(a.related.clone(), 'last');
            }
        }

        return res;
    }

    /**
     * @description relation of edges that precedes vertex
     *
     * @returns {ListDbl<GraphEdge<T, U>>} - List of edges pointing vertex
     * @memberof GraphAdjacents
     */
    getAncestorsEdges(): ListDbl<GraphEdge<T, U>> {
        let res: ListDbl<GraphEdge<T, U>>;
        res = new ListDbl<GraphEdge<T, U>>();

        if (this.ancestors.isEmpty() === false) {
            for (const a of this.ancestors) {
                try {
                    res.insert(new GraphEdge(a.related, this.vertex, a.label), 'last');
                } catch (e) {
                    throw new Error('GraphAdjacents: getAncestorsEdges - Error insert ' + e.message);
                }
            }
        }

        return res;
    }

    /**
     * @description List of Adjacents Vertex (successors more ancestors order)
     *
     * @returns {ListDbl<GraphVertex<T>>} - List of Adjacents Vertexs
     * @memberof GraphAdjacents
     */
    getAdjacents(): ListDbl<GraphVertex<T>> {
        let res: ListDbl<GraphVertex<T>>;
        res = new ListDbl<GraphVertex<T>>();

        res = res.merge(this.getAncestors(), this.getSuccessors());

        return res;
    }

    /**
     * @description List with adjacents edges
     *
     * @returns {ListDbl<GraphEdge<T, U>>} - list with adjacents edges.
     * @memberof GraphAdjacents
     */
    getAdjacentsEdges(): ListDbl<GraphEdge<T, U>> {
        let res: ListDbl<GraphEdge<T, U>>;
        res = new ListDbl<GraphEdge<T, U>>();

        res = res.merge(this.getAncestorsEdges(), this.getSuccessorsEdges());

        return res;
    }

    /**
     * @description true if vertex belongs to Successors
     *
     * @param {GraphVertex<T>} v - Vertex to look for
     * @param {<U>} u - Value for label (null admited)
     * @returns - true if Vertex exists
     * @memberof GraphAdjacents
     */
    hasSuccessor(v: GraphVertex<T>, u: U): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {

            let iV: GraphItlEdge<T, U>;
            iV = new GraphItlEdge(v, u);

            if (this.successors.isEmpty() === false) {
                if (this.successors.find(iV) !== -1) {
                    bRes = true;
                }
            }
        } else {
            throw new Error('GraphAdjacents: hasSuccessor - can´t determinate empty vertex');
        }

        return bRes;
    }

    /**
     * @description true if EdgeItl belongs to Successors
     *
     * @param {GraphItlEdge<T, U>} iV
     * @returns {boolean}
     * @memberof GraphAdjacents
     */
    hasSuccessorItl(iV: GraphItlEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        if (iV !== null && iV !== undefined) {
            if (this.successors.isEmpty() === false) {
                if (this.successors.find(iV) !== -1) {
                    bRes = true;
                }
            }
        } else {
            throw new Error('GraphAdjacents: hasSuccessorItl - can´t determinate empty vertex');
        }

        return bRes;
    }

    /**
     * @description Determines if v is a successor vertex
     *
     * @param {GraphVertex<T>} v - vertex to search
     * @returns {boolean} - true if is successor vertex
     * @memberof GraphAdjacents
     */
    hasSuccessorVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {

            let iV: GraphItlEdge<T, U>;
            iV = new GraphItlEdge(v, null);

            if (this.successors.isEmpty() === false) {
                if (this.successors.find(iV) !== -1) {
                    bRes = true;
                }
            }
        } else {
            throw new Error('GraphAdjacents: hasSuccessorVertex - can´t determinate empty vertex');
        }

        return bRes;
    }

    /**
     * @description Get (this.vertex, d) Edge from successors
     *
     * @param {GraphVertex<T>} d - destiny to look for in successors edges
     * @returns {GraphEdge<T, U>} - Edge
     * @memberof GraphAdjacents
     * @throws Fail from list recover
     */
    getSuccessorEdge(d: GraphVertex<T>): GraphEdge<T, U> {
        let res: GraphEdge<T, U>;
        res = undefined;

        if (d !== null && d !== undefined) {
            let idx: number;

            if (!this.successors.isEmpty()) {
                idx = this.successors.find(new GraphItlEdge(d, null));

                if (idx !== -1) {
                    let itl: GraphItlEdge<T, U>;
                    try {
                        itl = this.successors.recover(idx);
                    } catch (e) {
                        throw new Error('GraphAdjacents: getSuccesorEdge - fail recovering successors ' + e.message);
                    }
                    res = new GraphEdge(this.vertex, itl.related, itl.label);
                }
            }
        }

        return res;
    }

    /**
     * @description true if vertex belongs to Ancestors
     *
     * @param {GraphVertex<T, U>} v - vertex to find
     * @param {<U>} u - label value (can be null)
     * @returns {boolean} - true if vertex belongd to Ancestors
     * @memberof GraphAdjacents
     */
    hasAncestor(v: GraphVertex<T>, u: U): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            let iV: GraphItlEdge<T, U>;
            iV = new GraphItlEdge(v, u);

            if (this.ancestors.isEmpty() === false) {
                if (this.ancestors.find(iV) !== -1) {
                    bRes = true;
                }
            }
        } else {
            throw new Error('GraphAdjacents: hasAncestor - can´t find empty vertex');
        }

        return bRes;
    }

    /**
     * @description true if GraphItlEdge exists as ancestor
     *
     * @param {GraphItlEdge<T, U>} iV - itlEdge to find
     * @returns {boolean} - true if iV belongs
     * @memberof GraphAdjacents
     */
    hasAncestorItl(iV: GraphItlEdge<T, U>): boolean {
        let bRes: boolean;
        bRes = false;

        if (iV !== null && iV !== undefined) {
            if (this.ancestors.isEmpty() === false) {
                if (this.ancestors.find(iV) !== -1) {
                    bRes = true;
                }
            }
        } else {
            throw new Error('GraphAdjacents: hasAncestorItl - can´t find empty vertex');
        }

        return bRes;
    }

    /**
     * @description Determines if v is an ancestor vertex
     *
     * @param {GraphVertex<T>} v - vertex to search
     * @returns {boolean} - true if v is an ancestor vertex
     * @memberof GraphAdjacents
     */
    hasAncestorVertex(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            let iV: GraphItlEdge<T, U>;
            iV = new GraphItlEdge(v, null);

            if (this.ancestors.isEmpty() === false) {
                if (this.ancestors.find(iV) !== -1) {
                    bRes = true;
                }
            }
        } else {
            throw new Error('GraphAdjacents: hasAncestorVertex - can´t find empty vertex');
        }

        return bRes;
    }

    /**
     *
     *
     * @param {GraphVertex<T>} d
     * @returns {GraphEdge<T, U>}
     * @memberof GraphAdjacents
     */
    getAncestorEdge(d: GraphVertex<T>): GraphEdge<T, U> {
        let res: GraphEdge<T, U>;
        res = undefined;

        if (d !== null && d !== undefined) {
            let idx: number;

            idx = this.ancestors.find(new GraphItlEdge(d, null));

            if (idx !== -1) {
                let itl: GraphItlEdge<T, U>;

                try {
                    itl = this.ancestors.recover(idx);
                } catch (e) {
                    throw new Error('GraphAdjacents: getAncestorEdge - fail recovering ancestors ' + e.message);
                }
                res = new GraphEdge(this.vertex, itl.related, itl.label);
            }
        }

        return res;
    }

    /**
     * @description Determines if vertex is adjacent
     *
     * @param {GraphVertex<T>} e - edge to look for
     * @returns {boolean} - true if edge in List of adjacents
     * @memberof GraphAdjacents
     */
    isAdjacent(v: GraphVertex<T>): boolean {
        let bRes: boolean;
        bRes = false;

        if (v !== null && v !== undefined) {
            if (this.hasAncestorVertex(v) || this.hasSuccessorVertex(v)) {
                bRes = true;
            }
        } else {
            throw new Error('GraphAdjacents: isAdjacent - can´t determinate empty vertex');
        }

        return bRes;
    }

    /**
     * @description Removes ancestors and successors
     *
     * @memberof GraphAdjacents
     */
    clear(): void {
        this.vertex = undefined;
        this.ancestors.clear();
        this.successors.clear();
    }

    /**
     * @description Set Label of edge Successor
     *
     * @param GraphVertex<T> v - Edge to assign label
     * @param {U} u - new label value
     * @memberof GraphAdjacents
     */
    setLabelSuccessors(v: GraphVertex<T>, u: U): boolean {
        let bRes: boolean;
        bRes = false;
        let idx: number;

        let vo: GraphItlEdge<T, U>;
        vo = new GraphItlEdge(v, null);

        if (this.hasSuccessorVertex(v) === true) {
            idx = this.successors.find(vo);

            if (idx !== -1) {
                vo = this.successors.recover(idx);
                vo.label = u;
                bRes = true;
            }
        } else {
            throw new Error('GraphAdjacents - setLabelSuccesor - can´t find edge');
        }

        return bRes;
    }

    /**
     * @description Set Label of edge Ancestor
     *
     * @param GraphVertex<T> v - Edge to assign label
     * @param {U} u - new label value
     * @memberof GraphAdjacents
     */
    setLabelAncestor(v: GraphVertex<T>, u: U): boolean {
        let bRes: boolean;
        bRes = false;
        let idx: number;

        let vo: GraphItlEdge<T, U>;
        vo = new GraphItlEdge(v, null);

        if (this.hasAncestorVertex(v) === true) {
            idx = this.ancestors.find(vo);

            if (idx !== -1) {
                vo = this.ancestors.recover(idx);
                vo.label = u;
                bRes = true;
            }
        } else {
            throw new Error('GraphAdjacents - setLabelAncestor - can´t find edge');
        }

        return bRes;
    }

    /**
     * @description get label value from edge
     *
     * @param {GraphEdge<T, U>} v - Edge to look for
     * @returns {U} - label value or undefined
     * @memberof GraphAdjacents
     */
    getLabel(v: GraphVertex<T>): U {
        let res: U;
        res = undefined;

        if (this.hasAncestorVertex(v) === true) {
            for (const a of this.ancestors) {
                if (a.equal(new GraphItlEdge(v, null)) === 0) {
                    res = a.label;
                    break;
                }
            }
        } else {
            if (this.hasSuccessorVertex(v) === true) {
                for (const a of this.successors) {
                    if (a.equal(new GraphItlEdge(v, null)) === 0) {
                        res = a.label;
                        break;
                    }
                }
            } else {
                throw new Error('GraphAdjacents - getLabel - can´t find edge');
            }
        }

        return res;
    }

    /**
     * @description set Content of vertex
     *
     * @param {T} t - new value of vertex
     * @memberof GraphAdjacents
     */
    public setVertexContent(t: T): void {
        this.vertex.content = t;
    }

    /**
     * Is Adjacent list empty?
     *
     * @returns {boolean} - true if it is empty
     * @memberof GraphAdjacents
     */
    public isEmpty(): boolean {
        return this.ancestors.isEmpty() && this.successors.isEmpty();
    }


    /**
     * @description this vertex in not connected
     *
     * @returns {boolean} - true if has NO adjacents vertexs
     * @memberof GraphAdjacents
     */
    public hasNoAdjacentsVertex(): boolean {
        let bRes: boolean;

        bRes = this.successors.isEmpty() && this.ancestors.isEmpty();

        return bRes;
    }

    /**
     * Get the central vertex of adjacents
     *
     * @returns {GraphVertex<T>} - Vertex origin of this structure
     * @memberof GraphAdjacents
     */
    public getVertex(): GraphVertex<T> {
        return this.vertex;
    }
}
