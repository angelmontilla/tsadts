import { Queue } from './queue';
import { IadtsCloneable } from '../../iadts-cloneable';
import { ResultIteration } from '../../result-iteration';
import { QueueIterator } from './queue-iterator';

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
    if (this.sdata == p.sdata) {
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

describe('Queue', () => {
  it('Queue: should create an instance', () => {
    expect(new Queue()).toBeTruthy();
  });

  it('Queue: A queue just created is empty', () => {
    const cola = new Queue<ForTest>();

    expect(cola.isEmpty()).toBe(true);
  });

  it('Queue: A queue with a first element is not empty', () => {
    const cola = new Queue<ForTest>();

    cola.Enqueue(new ForTest('1'));

    expect(cola.isEmpty()).toBe(false);
  });

  it('Queue: Peek on an empty Queue fails', () => {
    const cola = new Queue<ForTest>();

    expect(() => {cola.peek(); }).toThrow();
  });

  it('Queue: peek equal first element in queue', () => {
    const cola = new Queue<ForTest>();
    const first = new ForTest('1');

    cola.Enqueue(first);
    cola.Enqueue(new ForTest('2'));
    cola.Enqueue(new ForTest('3'));
    cola.Enqueue(new ForTest('4'));

    expect(cola.peek()).toEqual(first);
  });

  it('Queue: Dequeue on an empty Queue fails', () => {
    const cola = new Queue<ForTest>();

    expect(() => {cola.Dequeue(); }).toThrowError('Queue: Dequeue - can´t dequeue empty Queue');
  });

  it('Queue: dequeue follows FIFO way', () => {
    const cola = new Queue<ForTest>();

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

  it('Queue: after dequeue all items Queue is empty', () => {
    const cola = new Queue<ForTest>();

    for (let j = 0; j < 10; j++) {
      cola.Enqueue(new ForTest('a'));
    }

    for (let j = 0; j < 10; j++) {
      cola.Dequeue();
    }

    expect(cola.isEmpty()).toBe(true);

  });

  it('Queue: Must create an Iterator instance', () => {
    const pila = new Queue<ForTest>();

    pila.Enqueue(new ForTest('a'));
    pila.Enqueue(new ForTest('b'));
    pila.Enqueue(new ForTest('c'));
    pila.Enqueue(new ForTest('d'));

    let a: ForTest;
    let s = '';

    for (a of pila) {
      s += a.sdata;
    }

    s = '';

    for (a of pila) {
      s += a.sdata;
    }

    expect(s).toBe('abcd');
  });

  it('Queue: Iterator on a queue must modify content', () => {
    const cola = new Queue<ForTest2>();
    let Iterador1: QueueIterator<ForTest2>;
    let Iterador2: QueueIterator<ForTest2>;

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

});
