//------ main.js ------

import {PersistentSegmentTree} from './Persistent-segment-tree';
import * as algorithm from './Naive-algorithm';

function buildHelperArray(array) {
    let map = new Map();
    let ans = [];

    const defaultNotFound = 0;

    for(let i = 0; i < array.length; i++) {
        ans.push(
            !map.has(array[i]) ? defaultNotFound : map.get(array[i])
        );

        map.set(array[i], i + 1);
    }

    return ans;
}

let n = 1;
const factor = 1.4;
const top = 100000;
const maxAi = 1000000;

while(n <= top) {
    let totalPerSegTree = 0, totalNaive = 0;
    let old = 0;

    const queries = 10000;

    old = Date.now();
    let pSegTree = new PersistentSegmentTree(n);
    totalPerSegTree += Date.now() - old;
    
    let A = [];

    //building base array A
    for(let i = 0; i < n; i++) {
        A.push(Math.floor(Math.random() * maxAi));
    }

    //building helper array
    old = Date.now();
    let helperArray = buildHelperArray(A);

    //inserting elements into the tree
    for(let i = 0; i < n; i++) {
        pSegTree.insert(helperArray[i], 1);
    }
    totalPerSegTree += Date.now() - old;

    for(let i = 0; i < queries; i++) {
        let left = Math.floor(Math.random() * n) + 1;
        let right = Math.floor(Math.random() * n) + 1;
        const tleft = Math.min(left, right);
        const tright = Math.max(left, right);

        old = Date.now();
        const vPerSegTree = pSegTree.query(tleft, tright);
        totalPerSegTree += Date.now() - old;

        old = Date.now();
        const vNaive = algorithm.queryArray(A, tleft - 1, tright - 1);
        totalNaive += Date.now() - old;

        if(vPerSegTree != vNaive) {
            console.log('ERROR');
            break;
        }
    }

    console.log(n + ',' + totalPerSegTree + ',' + totalNaive);
    n = Math.ceil(n * factor);
}


