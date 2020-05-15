import { DQueue } from './d-queue';
import { IadtsCloneable } from '../../iadts-cloneable';
import { ResultIteration } from '../../result-iteration';
import { DQueueIterator } from './dqueue-iterator';

class ForTest implements IadtsCloneable<ForTest> {
  constructor(private data: string) {}

  get sdata(): string { return this.data; }

  clone(): ForTest {
    return new ForTest(this.data);
  }

  show(): void {
    console.log('Data -> ' + this.data );
  }

  equal(p: ForTest): number {
    if (this.sdata === p.sdata) {
      return 0;
    } else {
      return -1;
    }
  }

}

class ForTest2 implements IadtsCloneable<ForTest2> {
  constructor(private data: number) {}

  get sdata(): number {return this.data; }

  set sdata(ndata: number) {this.data = ndata; }

  clone(): ForTest2 {
    return new ForTest2(this.data);
  }

  show(): void {
    console.log('Data -> ' + this.data);
  }

  equal(p: ForTest2): number {
    if (this.sdata === p.sdata) {
      return 0;
    } else {
      if (this.sdata < p.sdata) {
        return -1;
      } else {
        return 1;
      }
    }
  }
}

describe('DQueue', () => {
  it('DQueue: should create an instance', () => {
    expect(new DQueue()).toBeTruthy();
  });

  it('DQueue: A queue just created is empty', () => {
    const cola = new DQueue<ForTest>();

    expect(cola.isEmpty()).toBe(true);
  });

  it('DQueue: A queue with a first element is not empty', () => {
    const cola = new DQueue<ForTest>();

    cola.Enqueue(new ForTest('1'));

    expect(cola.isEmpty()).toBe(false);
  });

  it('DQueue: Peek on an empty Queue fails', () => {
    const cola = new DQueue<ForTest>();

    expect(() => {cola.peek(); }).toThrow();
  });

  it('DQueue: peek equal first element in queue', () => {
    const cola = new DQueue<ForTest>();
    const first = new ForTest('1');

    cola.Enqueue(first);
    cola.Enqueue(new ForTest('2'));
    cola.Enqueue(new ForTest('3'));
    cola.Enqueue(new ForTest('4'));

    expect(cola.peek()).toEqual(first);
  });

  it('DQueue: Dequeue on an empty Queue fails', () => {
    const cola = new DQueue<ForTest>();

    expect(() => {cola.Dequeue(); }).toThrowError('DQueue: Dequeue - Can´t dequeue an empty Queue');
  });

  it('DQueue: dequeue follows FIFO way', () => {
    const cola = new DQueue<ForTest>();

    cola.Enqueue(new ForTest('a'));
    cola.Enqueue(new ForTest('b'));
    cola.Enqueue(new ForTest('c'));
    cola.Enqueue(new ForTest('d'));

    let result: string;

    result = cola.Dequeue().sdata;
    result += cola.Dequeue().sdata;
    result += cola.Dequeue().sdata;
    result += cola.Dequeue().sdata;

    expect(result).toBe('abcd');
  });

  it('DQueue: after dequeue all items Queue is empty', () => {
    const cola = new DQueue<ForTest>();

    for (let j = 0; j < 10; j++) {
      cola.Enqueue(new ForTest('a'));
    }

    for (let j = 0; j < 10; j++) {
      cola.Dequeue();
    }

    expect(cola.isEmpty()).toBe(true);

  });

  it('DQueue: Must create an Iterator instance', () => {
    const pila = new DQueue<ForTest>();

    pila.Enqueue(new ForTest('a'));
    pila.Enqueue(new ForTest('b'));
    pila.Enqueue(new ForTest('c'));
    pila.Enqueue(new ForTest('d'));

    let a: ForTest;
    let s = '';

    for (a of pila) {
      s += a.sdata;
    }

    expect(s).toBe('abcd');
  });

  it('DQueue: Iterator on a queue must modify content', () => {
    const cola = new DQueue<ForTest2>();
    let Iterador1: DQueueIterator<ForTest2>;
    let Iterador2: DQueueIterator<ForTest2>;

    // We introduce half of data
    for (let j = 0; j < 5; j++ ) {
      const miP = new ForTest2(1);

      cola.Enqueue(miP);
    }

    // Create an interator only for half
    Iterador1 = cola[Symbol.iterator]();

    // Introduce the other middle data
    for (let j = 0; j < 5; j++ ) {
      const miP = new ForTest2(1);

      cola.Enqueue(miP);
    }

    // With first Iterator modify first half of content
    let miP1 = new ForTest2(1);
    let suma1: number;
    let suma2: number;
    let r: ResultIteration<ForTest2>;

    suma1 = 0;
    suma2 = 0;

    r = Iterador1.next();
    for (let n = 0; r.value !== undefined; n++) {
      miP1 = r.value;
      miP1.sdata *= 2;
      suma1 += miP1.sdata;
      r = Iterador1.next();
    }

    Iterador2 = cola[Symbol.iterator]();

    r = Iterador2.next();
    for (let n = 0; r.value !== undefined; n++) {
      miP1 = r.value;
      suma2 += miP1.sdata;

      r = Iterador2.next();
    }

    suma1 += 5;

    expect(suma1).toBe(suma2);
  });

  it('Dqueue: Dqueue cloned it´s not same Dqueue', () => {
    const cola = new DQueue<ForTest2>();
    let clQueue: DQueue<ForTest2>;

    let Iterator1: DQueueIterator<ForTest2>;
    let miP1: ForTest2;
    let r: ResultIteration<ForTest2>;
    let suma1 = 0;
    let suma2 = 0;

    for (let i = 0; i < 10; i++) {
      cola.Enqueue(new ForTest2(i));
    }

    clQueue = cola.clone();

    Iterator1 = clQueue[Symbol.iterator]();
    r = Iterator1.next();
    for (let n = 0; r.value !== undefined; n++) {
      miP1 = r.value;
      miP1.sdata *= 2;
      suma1 += miP1.sdata;
      r = Iterator1.next();
    }
    let a: ForTest2;

    for (a of cola) {
      suma2 += a.sdata;
    }

    expect(suma1).toBe(suma2 * 2);
  });

});
