//------ main.js ------

import {SegmentTreeLazyPropagation} from './Segment-tree-lazy-propagation';
import {SegmentTree} from './Segment-tree';

let n = 1;
const factor = 1.4;
const top = 20000;
const queries = 50000;

while(n <= top) {
    let segTreeLazy = new SegmentTreeLazyPropagation(n);
    let segTree = new SegmentTree(n);

    let totalSegTreeLazy = 0, totalSegTree = 0;
    let old = 0;

    for(let times = queries; times > 0; times--) {
        let left = Math.floor(Math.random() * n);
        let right = Math.floor(Math.random() * n);
        const tleft = Math.min(left, right);
        const tright = Math.max(left, right);
        const type = Math.floor(Math.random() * 2);
        if(type == 0) { // query
            
            old = Date.now();
            const vSegTreeLazy = segTreeLazy.query(tleft, tright);
            totalSegTreeLazy += Date.now() - old;

            old = Date.now();
            const vSegTree = segTree.query(tleft, tright);
            totalSegTree += Date.now() - old;

            if(vSegTreeLazy !== vSegTree) {
                console.log('ERROR: ' + vSegTreeLazy + ' ' + vSegTree);
                break;
            }
        } else { //update
            const data = Math.floor(Math.random() * 20);

            old = Date.now();
            segTreeLazy.update(tleft, tright, data);
            totalSegTreeLazy += Date.now() - old;

            old = Date.now();
            segTree.updateRange(tleft, tright, data);
            totalSegTree += Date.now() - old;
        }
    }
    console.log(n + ',' + (totalSegTree) + ',' + (totalSegTreeLazy));
    n = Math.ceil(n * factor);
}