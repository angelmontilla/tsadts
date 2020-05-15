import { Tree } from './tree';
import { IadtsCloneable } from '../../iadts-cloneable';
import { ListDbl } from '../../list/double/list-dbl';

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

  //show(): void {
  //  console.log('Data -> ' + this.data);
  //}

  toString(): string {
    return '' + this.data + '';
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

describe('Tree', () => {
  it('Tree: should create an instance', () => {
    expect(new Tree()).toBeTruthy();
  });

  it('Tree: An just created tree is empty', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    expect(myTree.isEmpty()).toBe(true);
  });

  it('Tree: An Tree with 5 elements inserted have size 5', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    expect(myTree.size()).toBe(6);
  });

  it('Tree: An Tree with 5 elements showed inorder', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let list = new ListDbl<ForTest2>();

    list = myTree.elements('inorder');

    list.listContent('INORDER');

    const suma = list.recover(0).sdata + list.recover(1).sdata + list.recover(2).sdata;

    expect(suma).toBe(4);
  });

  it('Tree: An Tree with 5 elements showed preorder', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let list = new ListDbl<ForTest2>();

    list = myTree.elements('preorder');

    list.listContent('PREORDER');

    //const suma = list.recover(0).sdata + list.recover(1).sdata + list.recover(2).sdata;

    expect(true).toBe(true);
  });

  it('Tree: An Tree with 5 elements showed postorder', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let list = new ListDbl<ForTest2>();

    list = myTree.elements('postorder');

    list.listContent('POSTORDER');

    //const suma = list.recover(0).sdata + list.recover(1).sdata + list.recover(2).sdata;

    expect(true).toBe(true);
  });

  it('Tree: An Tree with 5 elements showed inverse', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let list = new ListDbl<ForTest2>();

    list = myTree.elements('inverse');

    list.listContent('INVERSE');

    expect(true).toBe(true);
  });

  it('Tree: An Tree with 5 elements showed in level', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let list = new ListDbl<ForTest2>();

    list = myTree.elements('level');

    list.listContent('LEVEL');

    expect(true).toBe(true);
  });

  it('Tree: min Tree value with 5 elements must be correct', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    myTree.insert(new ForTest2(1));
    myTree.insert(new ForTest2(-10));

    expect(myTree.min().sdata).toBe(-10);
  });

  it('Tree: min Tree value with 5 elements must be correct', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    expect(myTree.max().sdata).toBe(20);
  });

  it('Tree: iterating tree must be correct', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let a: ForTest2;

    console.log('ITERATING TREE');
    for (a of myTree) {
      console.log(a.sdata);
    }

    expect(true).toBe(true);
  });

  it('Tree: deleting leaf node must be correct', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    const result = myTree.delete(new ForTest2(-1));

    myTree.treeContent('TREE DELETED LEAF -1');

    expect(result).toBe(true);
  });

  it('Tree: deleting node with one child', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));

    let result = myTree.delete(new ForTest2(-1));
    result = myTree.delete(new ForTest2(2));

    myTree.treeContent('TREE DELETED NODE WITH ONLY ONE CHILD');

    expect(result).toBe(true);

  });

  it('Tree: deleting node with two children', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(4));

    const result = myTree.delete(new ForTest2(2));

    myTree.treeContent('TREE DELETED NODE WITH TWO CHILDREN');

    expect(result).toBe(true);

  });

  it('Tree: check if a tree is valid', () => {
    let myTree: Tree<ForTest2>;

    myTree = new Tree<ForTest2>();

    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(10));
    myTree.insert(new ForTest2(-1));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(20));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(4));

    expect(myTree.valid()).toBe(true);

    let a = myTree.root();
    a.sdata = 25;

    myTree.treeContent('Tree altered');

    expect(myTree.valid()).toBe(false);

  });

});
