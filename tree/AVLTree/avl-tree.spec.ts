import { AvlTree } from './avl-tree';
import { element } from 'protractor';
import { ListDbl } from '../../list/double/list-dbl';
import { IadtsCloneable } from '../../iadts-cloneable';

class ForTest2 implements IadtsCloneable<ForTest2> {
  constructor(private data: number) {}

  get sdata(): number {return this.data; }

  set sdata(ndata: number) {this.data = ndata; }

  clone(): ForTest2 {
    return new ForTest2(this.data);
  }

  // show(): void {
  //   console.log('Data -> ' + this.data);
  // }

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

  toString(): string {
    return '' + this.sdata + '';
  }

}


describe('AvlTree', () => {
  it('AvlTree: should create an instance', () => {
    expect(new AvlTree()).toBeTruthy();
  });

  it('AvlTree: balanced insert greater to less case 1', () => {
    let t: AvlTree<ForTest2>;

    t = new AvlTree();

    t.insert(new ForTest2(3));
    t.insert(new ForTest2(2));
    t.insert(new ForTest2(1));

    expect(t.root().sdata).toBe(2);
  });

  it('AvlTree: balanced insert greater middel less case 2', () => {
    let t: AvlTree<ForTest2>;

    t = new AvlTree();

    t.insert(new ForTest2(3));
    t.insert(new ForTest2(1));
    t.insert(new ForTest2(2));

    expect(t.root().sdata).toBe(2);
  });

  it('AvlTree: balanced insert less greater middel case 3', () => {
    let t: AvlTree<ForTest2>;

    t = new AvlTree();

    t.insert(new ForTest2(1));
    t.insert(new ForTest2(3));
    t.insert(new ForTest2(2));

    expect(t.root().sdata).toBe(2);
  });

  it('AvlTree: balanced insert less to greater case 4', () => {
    let t: AvlTree<ForTest2>;

    t = new AvlTree();

    t.insert(new ForTest2(1));
    t.insert(new ForTest2(2));
    t.insert(new ForTest2(3));

    expect(t.root().sdata).toBe(2);
  });

  it('AvlTree: balanced insert 15 orderder', () => {
    let t: AvlTree<ForTest2>;

    t = new AvlTree();

    t.insert(new ForTest2(1));
    t.insert(new ForTest2(2));
    t.insert(new ForTest2(3));

    t.insert(new ForTest2(4));

    t.insert(new ForTest2(5));

    t.insert(new ForTest2(6));

    t.insert(new ForTest2(7));
    t.insert(new ForTest2(8));
    t.insert(new ForTest2(9));
    t.insert(new ForTest2(10));
    t.insert(new ForTest2(11));
    t.insert(new ForTest2(12));
    t.insert(new ForTest2(13));
    t.insert(new ForTest2(14));
    t.insert(new ForTest2(15));

    t.insert(new ForTest2(16));

    expect(t.root().sdata).toBe(8);
  });

  it('AvlTree: balanced insert 15 reverse order', () => {
    let t: AvlTree<ForTest2>;

    t = new AvlTree();

    t.insert(new ForTest2(16));
    t.insert(new ForTest2(15));
    t.insert(new ForTest2(14));

    t.insert(new ForTest2(13));

    t.insert(new ForTest2(12));

    t.insert(new ForTest2(11));

    t.insert(new ForTest2(10));
    t.insert(new ForTest2(9));
    t.insert(new ForTest2(8));
    t.insert(new ForTest2(7));
    t.insert(new ForTest2(6));
    t.insert(new ForTest2(5));
    t.insert(new ForTest2(4));
    t.insert(new ForTest2(3));
    t.insert(new ForTest2(2));

    t.insert(new ForTest2(1));

    expect(t.root().sdata).toBe(9);

  });

  it('AvlTree: delete leaf node is balanced', () => {
    let myTree: AvlTree<ForTest2>;

    myTree = new AvlTree<ForTest2>();

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

  it('AvlTree: delete node with only a child', () => {
    let myTree: AvlTree<ForTest2>;

    myTree = new AvlTree<ForTest2>();

    myTree.insert(new ForTest2(1));
    myTree.insert(new ForTest2(2));
    myTree.insert(new ForTest2(3));
    myTree.insert(new ForTest2(4));
    myTree.insert(new ForTest2(5));
    myTree.insert(new ForTest2(6));
    myTree.insert(new ForTest2(7));
    myTree.insert(new ForTest2(8));
    myTree.insert(new ForTest2(9));
    myTree.insert(new ForTest2(10));

    const result = myTree.delete(new ForTest2(9));

    myTree.treeContent('TREE DELETED BRANCH 9');

    expect(result).toBe(true);
  });

  it('AvlTree: delete node with one child', () => {
    let myTree: AvlTree<ForTest2>;

    myTree = new AvlTree<ForTest2>();

    for (let i = 1; i < 13; i++) {
      myTree.insert(new ForTest2(i));
    }

    const result = myTree.delete(new ForTest2(11));

    myTree.treeContent('TREE DELETED BRANCH 11');

    expect(result).toBe(true);
  });

  it('AvlTree: delete node with two children', () => {
    let myTree: AvlTree<ForTest2>;

    myTree = new AvlTree<ForTest2>();

    for (let i = 1; i < 21; i++) {
      myTree.insert(new ForTest2(i));
    }

    const result = myTree.delete(new ForTest2(16));

    myTree.treeContent('TREE DELETED BRANCH 16');

    expect(result).toBe(true);
  });

});
