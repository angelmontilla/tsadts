import { GraphVertex } from './graph-vertex';
import { IadtsCloneable } from '../iadts-cloneable';
import { GraphAdjacents } from './graph-adjacents';
import { GraphEdge } from './graph-edge';
import { ListDbl } from '../list/double/list-dbl';
export abstract class AbsGraph<T extends IadtsCloneable<T>, U extends IadtsCloneable<U>> {
    // Generating Operations
    // Create -> Returns an Empty Graph (this operation is done for constructor)

    // Construction Operations
    // addVertex(v: GraphVertex): boolean -> Añade el nodo al grafo, sino existía previamente
    public abstract addVertex(v: GraphVertex<T>): boolean;
    // delVertex(v: GraphVertex):boolean -> Removes vertex and its edges (if exists)
    public abstract delVertex(v: GraphVertex<T>): boolean;
    // addEdge(o: GraphVertex, d: GraphEdge): boolean -> Create relationship between nodes (o - origin, d - destiny)
    public abstract addEdge(e: GraphEdge<T, U>): boolean;
    // delEdge(o: GraphVertex, d: GraphEdge):boolean -> Removes edge
    public abstract delEdge(e: GraphEdge<T, U>): boolean;

    // Selector Operations
    // isEmpty() -> Bool (Graph has no vertexs)
    public abstract isEmpty(): boolean;
    // hasVertex(v: GraphVertex): boolean -> true
    public abstract hasVertex(v: GraphVertex<T>): boolean;
    // hasEdge(o: GraphVertex, d: GraphVertex): boolean -> true
    public abstract hasEdge(e: GraphEdge<T, U>): boolean;
    // getAdjacents(v: GraphVertex): ListDbl<GraphVertex> -> List of adjacent nodes
    public abstract getAdjacents(v: GraphVertex<T>): ListDbl<GraphVertex<T>>;

    // Edge Operations
    // setEdgeLabel(o: GraphVertex, d: GraphEdge, v: U) - Set label value of Edge (true if sets)
    public abstract setEdgeLabel(e: GraphEdge<T, U>, u: U): boolean;
    // getEdgeLabel(o: GraphNode, d: GraphNode) - Get lavel value of Edfe
    public abstract getEdgeLabel(e: GraphEdge<T, U>): U;

    // Only for Directed Graphs
    // isPredecessor(o: graphNode, d: GraphNode): boolean -> true if exists edge from o to d
    public abstract isPredecessor(o: GraphVertex<T>, d: GraphVertex<T>): boolean;
    // isSuccessor(o: GrapgNode, d: GraphNode): boolean -> true if exists edge from d to a
    public abstract isSuccessor(o: GraphVertex<T>, d: GraphVertex<T>): boolean;
}
