//------ main.js ------

import {SegmentTree} from './SegmentTree';
import * as algorithms from './Naive-algorithm';

let n = 1;
const factor = 1.4;
const top = 1000000;

while(n <= top) {
    let totalSegTree = 0, totalNaive = 0;
    
    let A = new Array(n).fill(1);
    let B = new Array(n).fill(1);
    let queries = 50000;
    
    let old = Date.now();
    
    let segTree = new SegmentTree(n, A);
    segTree.build();
    totalSegTree += Date.now() - old;
    
    while(queries--) {
        const queryType = Math.floor(Math.random() * 2);
        
        if(queryType == 0) {//update
            const I = Math.floor(Math.random() * n);

            old = Date.now();
            segTree.update(I, 0);
            totalSegTree += Date.now() - old;

            old = Date.now();
            algorithms.updateArray(B, I, 0);
            totalNaive += Date.now() - old;
        } else {
            const K = Math.floor(Math.random() * n) + 1;

            old = Date.now();
            const ansSegTree = segTree.query(K);
            totalSegTree += Date.now() - old;

            old = Date.now();
            const ansNaive = algorithms.queryArray(B, K);
            totalNaive += Date.now() - old;

            if(ansNaive != ansSegTree) {
                console.error('Erro ' + K + ' = ' + ansSegTree + ', ' + ansNaive);
                n = 0;
                break;
            }
        }
    }

    console.log(n+','+(totalSegTree/1000)+','+(totalNaive/1000));
    n = Math.ceil(n * factor);
}