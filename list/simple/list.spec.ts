import { List } from './list';
import { IadtsCloneable } from '../../iadts-cloneable';
import { link } from 'fs';

class ForTest implements IadtsCloneable<ForTest> {
  constructor(private data: string) {}

  get sdata(): string { return this.data; }

  clone(): ForTest {
    return new ForTest(this.data);
  }

  // show(): void {
  //   console.log('Data -> ' + this.data );
  // }

  toString(): string {
    return this.data;
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

describe('List', () => {
  it('List: should create an instance', () => {
    expect(new List()).toBeTruthy();
  });

  it('List: A Just created List must be Empty ', () => {
    let a: List<ForTest>;

    a = new List<ForTest>();

    expect(a.isEmpty()).toBe(true);
  });

  it('List: A List Just created must have size 0', () => {
    const a = new List<ForTest>();
    expect(a.size()).toBe(0);
  });

  it('List: With One element has size 1', () => {
    let a: List<ForTest>;

    a = new List<ForTest>();
    a.insert(new ForTest('a'));

    expect(a.size()).toBe(1);
  });

  it('List: With three elements has size 3', () => {
    let a: List<ForTest>;

    a = new List<ForTest>();
    a.insert(new ForTest('a'));
    a.insert(new ForTest('b'));
    a.insert(new ForTest('c'));


    expect(a.size()).toBe(3);
  });

  it('List: Get content of list in a valid position is correct', () => {
    const a = new List<ForTest2>();

    a.insert(new ForTest2(1), 'first');
    a.insert(new ForTest2(2), 'first');
    a.insert(new ForTest2(3), 'first');

    expect(true).toBe(a.recover(0).sdata === 3 && a.recover(1).sdata === 2 && a.recover(2).sdata === 1);
  });

  it('List: tail of List does not destroy original', () => {
    const a = new List<ForTest2>();

    a.insert(new ForTest2(2), 'last');
    a.insert(new ForTest2(2), 'last');
    a.insert(new ForTest2(2), 'last');
    a.insert(new ForTest2(2), 'last');

    const b = a.tail(1);

    for (const elem of b) {
      elem.sdata += 2;
    }

    let suma1: number = 0;
    for (const elem of a) {
      suma1 += elem.sdata;
    }

    let suma2: number = 0;
    for (const elem of b) {
      suma2 += elem.sdata;
    }

    expect(suma1).toBe(suma2 - 4);
  });

  it('List: head of List does not destroy original', () => {
    const a = new List<ForTest2>();

    a.insert(new ForTest2(2), 'last');
    a.insert(new ForTest2(2), 'last');
    a.insert(new ForTest2(2), 'last');
    a.insert(new ForTest2(2), 'last');

    const b = a.head(1);

    for (const elem of b) {
      elem.sdata += 2;
    }

    let suma1: number = 0;
    for (const elem of a) {
      suma1 += elem.sdata;
    }

    let suma2: number = 0;
    for (const elem of b) {
      suma2 += elem.sdata;
    }

    expect(suma1).toBe(suma2);
  });

  it('List: can find item', () => {
    let l1: List<ForTest2>;

    l1 = new List();

    l1.insert(new ForTest2(1), 'first');
    l1.insert(new ForTest2(2), 'first');
    l1.insert(new ForTest2(3), 'first');
    l1.insert(new ForTest2(4), 'first');
    l1.insert(new ForTest2(5), 'first');
    l1.insert(new ForTest2(6), 'first');

    expect(l1.find(new ForTest2(3))).toBe(3);

  });

  it('List: A List after delete all items will be empty', () => {
    let l1: List<ForTest2>;
    l1 = new List<ForTest2>();

    l1.insert(new ForTest2(1));
    l1.insert(new ForTest2(1));
    l1.insert(new ForTest2(1));
    l1.insert(new ForTest2(1));

    l1.remove(0);
    l1.remove(0);
    l1.remove(0);
    l1.remove(0);

    expect(l1.isEmpty()).toBe(true);
  });

  it('List: can´t find item in list after deleted', () => {
    let l1: List<ForTest2>;

    l1 = new List();

    l1.insert(new ForTest2(1), 'first');
    l1.insert(new ForTest2(2), 'first');
    l1.insert(new ForTest2(3), 'first');
    l1.insert(new ForTest2(4), 'first');
    l1.insert(new ForTest2(5), 'first');
    l1.insert(new ForTest2(6), 'first');

    l1.remove(2);

    expect(l1.find(new ForTest2(4))).toBe(-1);


  });

  it('List: head + tail have same result than List', () => {
    let l1: List<ForTest2>;
    let l2: List<ForTest2>;
    let l3: List<ForTest2>;
    let l4: List<ForTest2>;

    let suma1: number;
    let suma2: number;

    suma1 = 0;
    suma2 = 0;

    l1 = new List<ForTest2>();
    l2 = new List<ForTest2>();
    l3 = new List<ForTest2>();
    l4 = new List<ForTest2>();

    l1.insert(new ForTest2(1));
    l1.insert(new ForTest2(2));
    l1.insert(new ForTest2(3));
    l1.insert(new ForTest2(4));
    l1.insert(new ForTest2(5));
    l1.insert(new ForTest2(6));
    l1.insert(new ForTest2(7));
    l1.insert(new ForTest2(8));
    l1.insert(new ForTest2(9));
    l1.insert(new ForTest2(10));

    l2 = l1.head(4);
    l3 = l1.tail(4);

    l3.remove('first');

    l4 = l4.merge(l2, l3);

    for (let a of l1) {
      suma1 += a.sdata;
    }

    for (let b of l4) {
      suma2 += b.sdata;
    }

    expect(suma1).toEqual(suma2);
  });

  it('List: When delete last index the previous is the last', () => {
    let l1: List<ForTest2>;

    l1 = new List<ForTest2>();

    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(2), 'last');
    l1.insert(new ForTest2(3), 'last');
    l1.insert(new ForTest2(4), 'last');
    l1.insert(new ForTest2(5), 'last');
    l1.insert(new ForTest2(6), 'last');
    l1.insert(new ForTest2(7), 'last');
    l1.insert(new ForTest2(8), 'last');
    l1.insert(new ForTest2(9), 'last');
    l1.insert(new ForTest2(10), 'last');

    l1.remove(9);

    expect(l1.recover('last').sdata).toBe(9);

  });

  it('List: finding next element works!', () => {
    let l1: List<ForTest2>;

    l1 = new List<ForTest2>();

    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(2), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(2), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(1), 'last');
    l1.insert(new ForTest2(1), 'last');

    const l = l1.find(new ForTest2(2));

    expect(l1.find(new ForTest2(2), l + 1)).toBe(7);

  });

  it('List: test for listcontent', () => {
    let a: List<ForTest>;

    a = new List<ForTest>();

    a.insert(new ForTest('a'), 'last');
    a.insert(new ForTest('b'), 'last');
    a.insert(new ForTest('c'), 'last');
    a.insert(new ForTest('d'), 'last');
    a.insert(new ForTest('e'), 'last');
    a.insert(new ForTest('f'), 'last');
    a.insert(new ForTest('g'), 'last');

    a.listContent('TIED LIST');

    expect(true).toBe(true);
  });

  it('List: a cleared list is empty', () => {
    let a: List<ForTest>;

    a = new List<ForTest>();

    a.insert(new ForTest('a'), 'last');
    a.insert(new ForTest('b'), 'last');
    a.insert(new ForTest('c'), 'last');
    a.insert(new ForTest('d'), 'last');
    a.insert(new ForTest('e'), 'last');
    a.insert(new ForTest('f'), 'last');
    a.insert(new ForTest('g'), 'last');

    a.clear();

    expect(a.isEmpty()).toBe(true);
  });
});
