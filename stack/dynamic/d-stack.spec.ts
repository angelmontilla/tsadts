import { DStack } from './d-stack';
import { IadtsCloneable } from '../../iadts-cloneable';
import { DStackIterator } from './d-stack-iterator';
import { ResultIteration } from '../../result-iteration';

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

describe('DStack', () => {
  it('Stack: should create an instance', () => {
    expect(new DStack()).toBeTruthy();
  });

  it('Stack: An Stack just created is empty', () => {
    const pila = new DStack<ForTest>();

    expect(pila.isEmpty()).toBe(true);
  });

  it('Stack: An Stack with a first element is not empty', () => {
    const pila = new DStack<ForTest>();

    pila.push(new ForTest('1'));

    expect(pila.isEmpty()).toBe(false);
  });

  it('Stack: top on a empty Stack fails', () => {
    const pila = new DStack<ForTest>();

    expect(() => { pila.top(); }).toThrow();
  });

  it('Stack: top on Stack is equal to last pop', () => {
    const pila = new DStack<ForTest>();

    pila.push(new ForTest('a'));
    pila.push(new ForTest('b'));

    expect(pila.top()).toEqual(pila.pop());
  });

  it ('Stack: pop on empty Stack fails', () => {
    const pila = new DStack<ForTest>();

    expect(() => { pila.pop(); }).toThrow();
  });

  it('Stack: After pop last item stack must be empty', () => {
    const pila = new DStack<ForTest>();

    pila.push(new ForTest('1'));
    const x = pila.pop();

    expect(pila.isEmpty()).toBe(true);
  });

  it('Stack: One more pop after empty will fails', () => {
    const pila = new DStack<ForTest>();

    pila.push(new ForTest('1'));
    const x = pila.pop();

    expect(() => {pila.pop(); }).toThrowError('DStack: pop() - Can´t pop from empty Stack');
  });

  it('Stack: The element poped must be iqual to last pushed', () => {
    const pila = new DStack<ForTest>();

    pila.push(new ForTest('1'));
    pila.push(new ForTest('2'));
    const a = new ForTest('a');
    pila.push(a);

    expect(pila.pop()).toEqual(a);
  });

  it('Stack: Must create an Iterator instance', () => {
    const pila = new DStack<ForTest>();

    pila.push(new ForTest('a'));
    pila.push(new ForTest('b'));

    let a: ForTest;
    let s = '';

    for (a of pila) {
      s += a.sdata;
    }

    expect(s).toBe('ba');
  });

  it('Stack: Must modify content in stack throght iterator', () => {
    const pila = new DStack<ForTest2>();
    let Iterador1: DStackIterator<ForTest2>;
    let Iterador2: DStackIterator<ForTest2>;

    // We introduce half of data
    for (let j = 0; j < 5; j++ ) {
      const miP = new ForTest2(1);

      pila.push(miP);
    }

    // Create an interator only for half
    Iterador1 = pila[Symbol.iterator]();

    // Introduce the other middle data
    for (let j = 0; j < 5; j++ ) {
      const miP = new ForTest2(1);

      pila.push(miP);
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

    Iterador2 = pila[Symbol.iterator]();

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
