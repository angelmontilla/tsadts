import { Stack } from './stack';
import { StackIterator } from './stack-iterator';
import { IadtsCloneable } from '../../iadts-cloneable';
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


describe('Stack', () => {
  it('Stack: Must create an instance', () => {
    expect(new Stack<ForTest>()).toBeTruthy();
  });

  it('Stack: An Stack just created is empty', () => {
     const pila = new Stack<ForTest>();

     expect(pila.isEmpty()).toBe(true);
  });

  it ('Stack: An Stack with a first element is not empty', () => {
     const pila = new Stack<ForTest>();

     pila.push(new ForTest('1'));

     expect(pila.isEmpty()).toBe(false);
  });

  it('Stack: After pop last item stack must be empty', () => {
     const pila = new Stack<ForTest>();

     pila.push(new ForTest('1'));
     pila.pop();

     expect(pila.isEmpty()).toBe(true);
  });

  it('Stack: The element poped must be iqual to last pushed', () => {
     const pila = new Stack<ForTest>(10);

     pila.push(new ForTest('1'));
     pila.push(new ForTest('2'));
     pila.push(new ForTest('3'));

     expect(pila.pop().sdata).toEqual('3');
  });

  it('Stack: Must throws Error if push exceds limit', () => {
     const pila = new Stack<ForTest2>(3);

     pila.push(new ForTest2(1));
     pila.push(new ForTest2(2));
     pila.push(new ForTest2(3));

     expect(() => {pila.push(new ForTest2(4)); }).toThrow();
  });

  it('Stack: Must create an Iterator instance', () => {
     const pila = new Stack<ForTest2>(2);

     pila.push(new ForTest2(1));
     pila.push(new ForTest2(2));

     let res = 0;
     for (const a of pila) {
       let b: ForTest2;
       b = a;
       res = res + b.sdata;
     }

     expect(res).toBe(3);
  });

  it('Stack: Create an Iterator ', () => {
    const pila = new Stack<ForTest2>(10);
    let Iterador: StackIterator<ForTest2>;

    for (let j = 0; j < 10; j++) {
      pila.push(new ForTest2(1));
    }

    Iterador = pila[Symbol.iterator]();

    let i = 0;
    let r: ResultIteration<ForTest2>;
    r = Iterador.next();
    while (r.value !== undefined) {
      i += r.value.sdata;
      r = Iterador.next();
    }

    expect(i).toBe(10);
  });

  it('Stack: two Iterators on objects works intenpendently', () => {
    const pila = new Stack<ForTest2>(10);
    let Iterador1: StackIterator<ForTest2>;
    let Iterador2: StackIterator<ForTest2>;

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
    let j = 0;

    suma1 = 0;
    suma2 = 0;

    r = Iterador1.next();
    for (let n = 0; r.value !== undefined; n++) {
      miP1 = r.value;
      miP1.sdata *= 2;
      suma1 += miP1.sdata;
      r = Iterador1.next();
    }

    // pila.stackContents('PILA TRAS SUMAR MULTIPLICAR POR 2', (p: any) => { return p.miValr; });


    // Create an iterator for all data
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
