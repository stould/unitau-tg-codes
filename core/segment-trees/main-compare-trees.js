//------ main.js ------

import {SegmentTree} from './Segment-tree';
import { ImplicitSegmentTree } from './Implicit-segment-tree';

let n = 1;
const factor = 1.4;
const top = 500000000;
const queries = 500000;
const updates = 500000;

while(n <= top) {

    let totalSegTree = 0, totalImplicitSegTree = 0;

    let old = Date.now();
    let segTree = new SegmentTree(n);
    totalSegTree += Date.now() - old;

    old = Date.now();
    let implicitTree = new ImplicitSegmentTree(n);
    totalImplicitSegTree += Date.now() - old;


    for(let times = updates; times > 0; times--) {
        const pos = Math.floor(Math.random() * n);
        const value = 1;

        old = Date.now();
        segTree.updateRange(pos, pos, value);
        totalSegTree += Date.now() - old;

        old = Date.now();
        implicitTree.update(pos, value);
        totalImplicitSegTree += Date.now() - old;
    }

    for(let times = queries; times > 0; times--) {
        let left = Math.floor(Math.random() * n);
        let right = Math.floor(Math.random() * n);
        const tleft = Math.min(left, right);
        const tright = Math.max(left, right);

        old = Date.now();
        const vSegTree = segTree.query(tleft, tright);
        totalSegTree += Date.now() - old;

        old = Date.now();
        const vImplicitTree = implicitTree.query(tleft, tright);
        totalImplicitSegTree += Date.now() - old;
        if(vSegTree != vImplicitTree) console.log('erro');
        
    }

    console.log(n + ',' + (totalSegTree) + ',' + (totalImplicitSegTree));
    n = Math.ceil(n * factor);
}

