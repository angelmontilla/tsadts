import { Graph } from './graph';
import { IadtsCloneable } from '../iadts-cloneable';
import { GraphVertex } from './graph-vertex';
import { GraphEdge } from './graph-edge';
import { ListDbl } from '../list/double/list-dbl';

class TestVertex implements IadtsCloneable<TestVertex> {

  constructor(private order: number) {}

  set orderNumber(o: number) {
    this.order = o;
  }

  get orderNumber(): number {
    return this.order;
  }

  public process(): void {
    this.order *= 2;
  }

  clone(): TestVertex {
    return new TestVertex(this.order);
  }
  show?(): void {
    console.log(this.order);
  }

  equal(p: TestVertex): number {
    let ret: number;
    ret = 0;

    if (this.order > p.order) {
      ret = 1;
    } else {
      if (this.order < p.order) {
        ret = -1;
      }
    }

    return ret;
  }

  toString?(): string {
    return '' + this.order + '';
  }

}

class TestWight implements IadtsCloneable<TestWight> {
  constructor(private wight: number) {}

  set weight(o: number) {
    this.wight = o;
  }

  get weight(): number {
    return this.wight;
  }

  clone(): TestWight {
    return new TestWight(this.wight);
  }
  show?(): void {
    console.log(this.wight);
  }

  equal(p: TestWight): number {
    let ret: number;
    ret = 0;

    if (this.wight > p.weight) {
      ret = 1;
    } else {
      if (this.wight < p.weight) {
        ret = -1;
      }
    }

    return ret;
  }

  toString?(): string {
    return '' + this.weight + '';
  }

}

describe('Graph', () => {
  it('Graph: should create an instance', () => {
    expect(new Graph()).toBeTruthy();
  });

  it('Graph: Must insert a Vertex', () => {
    let g: Graph<TestVertex, TestWight>;
    let v: GraphVertex<TestVertex>;
    let w: GraphEdge<TestVertex, TestWight>;

    g = new Graph<TestVertex, TestWight>();
    v = new GraphVertex<TestVertex>(new TestVertex(1));

    g.addVertex(v);

    expect(g.isEmpty()).toBe(false);
  });

  it('Graph: Must be empty after delete all vertex', () => {
    let g: Graph<TestVertex, TestWight>;
    let v1: GraphVertex<TestVertex>;
    let v2: GraphVertex<TestVertex>;

    g = new Graph<TestVertex, TestWight>();
    v1 = new GraphVertex(new TestVertex(1));

    g.addVertex(v1);

    v2 = new GraphVertex(new TestVertex(2));

    g.addVertex(v2);

    g.delVertex(v2);

    expect(g.isEmpty()).toBe(false);

    g.delVertex(v1);

    expect(g.isEmpty()).toBe(true);
  });

  it('Graph: An edge must exists after its creation', () => {
    let g: Graph<TestVertex, TestWight>;
    let v1: GraphVertex<TestVertex>;
    let v2: GraphVertex<TestVertex>;

    let e1: GraphEdge<TestVertex, TestWight>;

    g = new Graph<TestVertex, TestWight>();
    v1 = new GraphVertex(new TestVertex(1));
    v2 = new GraphVertex(new TestVertex(2));
    e1 = new GraphEdge(v1, v2, new TestWight(1));

    g.addVertex(v1);
    g.addVertex(v2);

    g.addEdge(e1);

    expect(g.hasEdge(e1)).toBe(true);

    g = null;
  });

  it('Graph: An edge that joins v1 to v2 makes v2 successor of v1', () => {
    let g: Graph<TestVertex, TestWight>;
    let v1: GraphVertex<TestVertex>;
    let v2: GraphVertex<TestVertex>;

    let e1: GraphEdge<TestVertex, TestWight>;

    g = new Graph<TestVertex, TestWight>();
    v1 = new GraphVertex(new TestVertex(1));
    v2 = new GraphVertex(new TestVertex(2));
    e1 = new GraphEdge(v1, v2, new TestWight(1));

    g.addVertex(v1);
    g.addVertex(v2);

    expect(g.hasVertex(v1)).toBe(true);
    expect(g.hasVertex(v2)).toBe(true);
    expect(g.hasVertex(new GraphVertex(new TestVertex(3)))).toBe(false);

    g.addEdge(e1);

    g.delEdge(e1);

    expect(g.hasEdge(e1)).toBe(false);

    g.addEdge(e1);

    expect(g.isSuccessor(v1, v2)).toBe(true);

    g = null;
  });

  it('Graph: An edge that joins v1 to v2 makes v1 predecesor of v2', () => {
    let g: Graph<TestVertex, TestWight>;
    let v1: GraphVertex<TestVertex>;
    let v2: GraphVertex<TestVertex>;

    let e1: GraphEdge<TestVertex, TestWight>;

    g = new Graph<TestVertex, TestWight>();
    v1 = new GraphVertex(new TestVertex(1));
    v2 = new GraphVertex(new TestVertex(2));
    e1 = new GraphEdge(v1, v2, new TestWight(1));

    g.addVertex(v1);
    g.addVertex(v2);

    g.addEdge(e1);

    expect(g.isPredecessor(v2, v1)).toBe(true);

    g = null;
  });

  it ('Graph: label of edge preserves its value', () => {
    let g: Graph<TestVertex, TestWight>;
    let v1: GraphVertex<TestVertex>;
    let v2: GraphVertex<TestVertex>;

    let e1: GraphEdge<TestVertex, TestWight>;
    let e2: GraphEdge<TestVertex, TestWight>;

    g = new Graph<TestVertex, TestWight>();
    v1 = new GraphVertex(new TestVertex(1));
    v2 = new GraphVertex(new TestVertex(2));
    e1 = new GraphEdge(v1, v2, new TestWight(1));
    e2 = new GraphEdge(v2, v1, new TestWight(2));

    g.addVertex(v1);
    g.addVertex(v2);

    g.addEdge(e1);
    g.addEdge(e2);

    expect(g.isPredecessor(v2, v1)).toBe(true);
    expect(g.isSuccessor(v2, v1)).toBe(true);
    expect(g.getEdgeLabel(new GraphEdge(v2, v1)).weight).toBe(2);

    g = null;
  });

  it('Graph: label must change it value', () => {
    let g: Graph<TestVertex, TestWight>;
    let v: GraphVertex<TestVertex>;

    g = new Graph<TestVertex, TestWight>();

    for (let i = 0; i < 100; i++) {
      v = new GraphVertex(new TestVertex(i));
      g.addVertex(v);
    }

    for (let i = 0; i < 100; i++) {
      expect(g.hasVertex(new GraphVertex(new TestVertex(i)))).toBe(true);
    }

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        g.addEdge(new GraphEdge(
          new GraphVertex(new TestVertex(i)),
          new GraphVertex(new TestVertex(j)),
          new TestWight(0)));
      }
    }

    let myEdge = new GraphEdge(new GraphVertex(new TestVertex(0)), new GraphVertex(new TestVertex(99)), null);

    expect(g.getEdgeLabel(myEdge).weight).toBe(0);

    g.setEdgeLabel(myEdge, new TestWight(-100));

    let tw = g.getEdgeLabel(myEdge);

    expect(tw.weight).toBe(-100);

    g = null;

  });

  it('Graph: vertex adjacents must have correct value', () => {
    let g: Graph<TestVertex, TestWight>;
    let v: GraphVertex<TestVertex>;

    g = new Graph<TestVertex, TestWight>();

    for (let i = 0; i < 100; i++) {
      v = new GraphVertex(new TestVertex(i));
      g.addVertex(v);
    }

    for (let i = 0; i < 100; i++) {
      expect(g.hasVertex(new GraphVertex(new TestVertex(i)))).toBe(true);
    }

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        g.addEdge(new GraphEdge(
          new GraphVertex(new TestVertex(i)),
          new GraphVertex(new TestVertex(j)),
          new TestWight(0)));
      }
    }

    let sum: number = 0;
    let sum2: number = 0;

    for (let i = 0; i < 100; i++) {
      sum += i;
    }
    for (let i = 0; i < 100; i++) {
      sum += i;
    }


    let lAd: ListDbl<GraphVertex<TestVertex>>;

    lAd = g.getAdjacents(new GraphVertex(new TestVertex(0)));

    for (let a of lAd) {
      sum2 += a.content.orderNumber;
    }
    expect(sum).toEqual(sum2);

  });

  it('Graph: After delete Vertex all adjacents have been deleted', () => {
    let g: Graph<TestVertex, TestWight>;
    let v: GraphVertex<TestVertex>;

    g = new Graph<TestVertex, TestWight>();

    for (let i = 0; i < 100; i++) {
      v = new GraphVertex(new TestVertex(i));
      g.addVertex(v);
    }

    for (let i = 0; i < 100; i++) {
      expect(g.hasVertex(new GraphVertex(new TestVertex(i)))).toBe(true);
    }

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        g.addEdge(new GraphEdge(
          new GraphVertex(new TestVertex(i)),
          new GraphVertex(new TestVertex(j)),
          new TestWight(0)));
      }
    }

    

    let sum: number = 0;
    let sum2: number = 0;

    for (let i = 0; i < 100; i++) {
      sum += i;
    }
    for (let i = 0; i < 100; i++) {
      sum += i;
    }

    g.delVertex(new GraphVertex(new TestVertex(50)));

    sum -= 50;
    sum -= 50;

    let lAd: ListDbl<GraphVertex<TestVertex>>;

    lAd = g.getAdjacents(new GraphVertex(new TestVertex(0)));

    for (let a of lAd) {
      sum2 += a.content.orderNumber;
    }

    expect(sum).toEqual(sum2);
  });

  it('Graph: minimal path must be correct', () => {
    let g: Graph<TestVertex, TestWight>;
    let v: GraphVertex<TestVertex>;
    let e: GraphEdge<TestVertex, TestWight>;

    g = new Graph();

    for (let i = 1; i < 8; i++) {
      v = new GraphVertex(new TestVertex(i));
      g.addVertex(v);
    }
    
    e = new GraphEdge(new GraphVertex(new TestVertex(1)), new GraphVertex(new TestVertex(2)), new TestWight(1));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(1)), new GraphVertex(new TestVertex(3)), new TestWight(2));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(2)), new GraphVertex(new TestVertex(4)), new TestWight(1));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(4)), new GraphVertex(new TestVertex(6)), new TestWight(4));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(4)), new GraphVertex(new TestVertex(5)), new TestWight(3));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(5)), new GraphVertex(new TestVertex(6)), new TestWight(1));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(5)), new GraphVertex(new TestVertex(7)), new TestWight(1));
    g.addEdge(e);
    e = new GraphEdge(new GraphVertex(new TestVertex(6)), new GraphVertex(new TestVertex(7)), new TestWight(2));
    g.addEdge(e);


    //let dijsktra:any [][];
    let dijsktra = new Map();

    let vdi = new GraphVertex(new TestVertex(1));
    dijsktra.set(vdi.toString(), {vertex: vdi, visited: false, val: 0, path: -1});
    for (let i = 1; i < 7; i++) {
      vdi = new GraphVertex(new TestVertex(i + 1));
      dijsktra.set(vdi.toString(), {vertex: vdi, visited: false, val: null, path: -1});
    }

    let bexit: boolean = true;

    for (const a of dijsktra.values()) {
      bexit = bexit && a.visited;
    }

    let iteration: number = 0;

    while (!bexit) {
      let inf: number = null;
      let origin: GraphVertex<TestVertex>;
      let distance: number = 0;

      // take vertex not visited with less distance to original vertex
      for (const a of dijsktra.values()) {
        if (a.visited === false) {
          if (a.val !== null) {
            if (inf === null) {
              inf = a.val;
              origin = a.vertex;
              distance = inf;
            } else {
              if (a.val < inf) {
                inf = a.val;
                origin = a.vertex;
                distance = inf;
              }
            }
          }
        }
      }

      dijsktra.get(origin.toString()).visited = true;

      // if this node has succesors, calculate new distance to original vertex
      if (!g.getSuccessors(origin).isEmpty()) {
        for (const a of g.getSuccessors(origin)) {
          const key: string = a.toString();
          const valPred: number = dijsktra.get(key).val;
          const weightEdge: number = g.getEdgeLabel(new GraphEdge(origin, a)).weight;

          const ObjectMap = dijsktra.get(key);

          if (valPred === null || valPred > distance + weightEdge) {
            ObjectMap.val = distance + weightEdge;
            ObjectMap.path = iteration;
          }
        }
      }

      // have we recovery all vertexs
      bexit = true;
      for (const a of dijsktra.values()) {
        bexit = bexit && a.visited;
      }

      iteration++;
    }

    expect(dijsktra.get(new GraphVertex(new TestVertex(1)).toString()).val).toBe(0);
    expect(dijsktra.get(new GraphVertex(new TestVertex(2)).toString()).val).toBe(1);
    expect(dijsktra.get(new GraphVertex(new TestVertex(3)).toString()).val).toBe(2);
    expect(dijsktra.get(new GraphVertex(new TestVertex(4)).toString()).val).toBe(2);
    expect(dijsktra.get(new GraphVertex(new TestVertex(5)).toString()).val).toBe(5);
    expect(dijsktra.get(new GraphVertex(new TestVertex(6)).toString()).val).toBe(6);
    expect(dijsktra.get(new GraphVertex(new TestVertex(7)).toString()).val).toBe(6);

  });

});
