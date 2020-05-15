import { ListDbl } from './list-dbl';
import { IadtsCloneable } from '../../iadts-cloneable';

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

describe('ListDbl', () => {
  it('ListDbl: should create an instance', () => {
    expect(new ListDbl()).toBeTruthy();
  });

  it('ListDbl: first on empty list produces exception', () => {
    let l: ListDbl<ForTest2>;

    l = new ListDbl<ForTest2>();

    expect(() => { l.first(); }).toThrow();

  });

  it('ListDbl: next on empty list produces exception', () => {
    let l: ListDbl<ForTest2>;

    l = new ListDbl<ForTest2>();

    expect(() => { l.next(); }).toThrow();

  });

  it('ListDbl: previous on empty list produces exception', () => {
    let l: ListDbl<ForTest2>;

    l = new ListDbl<ForTest2>();

    expect(() => { l.previous(); }).toThrow();

  });

  it('ListDbl: end on empty list produces exception', () => {
    let l: ListDbl<ForTest2>;

    l = new ListDbl<ForTest2>();

    expect(() => { l.end(); }).toThrow();

  });

  it('ListDbl: first, next, previous, end work fine', () => {
    let l: ListDbl<ForTest2>;

    l = new ListDbl<ForTest2>();

    l.insert(new ForTest2(1), 'last');
    l.insert(new ForTest2(2), 'last');
    l.insert(new ForTest2(3), 'last');
    l.insert(new ForTest2(4), 'last');
    l.insert(new ForTest2(5), 'last');

    expect(l.first().sdata).toBe(1);
    expect(l.next().sdata).toBe(2);
    expect(l.previous().sdata).toBe(1);
    expect(l.next().sdata).toBe(2);
    expect(l.next().sdata).toBe(3);
    expect(l.end().sdata).toBe(5);
  });

  it('ListDbl: Iteration with for', () => {
    let l: ListDbl<ForTest2>;

    l = new ListDbl<ForTest2>();

    l.insert(new ForTest2(1));
    l.insert(new ForTest2(2));
    l.insert(new ForTest2(3));
    l.insert(new ForTest2(4));
    l.insert(new ForTest2(5));

    let sum = 0;

    for (const a of l) {
      sum += a.sdata;
    }

    expect(sum).toBe(15);
  });


});
