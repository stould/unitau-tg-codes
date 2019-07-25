//------ main.js ------

import {SegmentTree} from '../core/SegmentTree';
import * as algorithms from '../core/NaiveAlgorithms';

let values = Array.from({length: 2000}, () => Math.floor(Math.random() * 1000));

let tree = new SegmentTree(values.length, values);

tree.build();

const n = values.length;

let totalNaive = 0, totalSegTree = 0;


for(let len = n; len >= 1; len--) {
    for(let i = 0; i + len <= n; i++) {
        let old = Date.now();
        const va = algorithms.intervalSum(values, i, i + len - 1);
        let current = Date.now();
        totalNaive += current - old;

        old = Date.now();
        const vb = tree.query(i, i + len - 1);
        current = Date.now();
        totalSegTree += current - old;
        if(va !== vb) {
            console.log('ERROR');
        }
    }
}

console.log(totalNaive + ' ' + totalSegTree);