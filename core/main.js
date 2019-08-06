//------ main.js ------

import {SegmentTree} from '../core/SegmentTree';
import * as algorithms from '../core/Algorithms';
import { ImplicitSegmentTree } from '../core/ImplicitSegmentTree';


const n = 100000;
const queries = 500000;
const updates = 500000;


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
    segTree.update(pos, value);
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

console.log(totalSegTree + ' ' + totalImplicitSegTree);