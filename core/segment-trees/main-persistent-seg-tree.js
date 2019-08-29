//------ main.js ------

import {PersistentSegmentTree} from './Persistent-segment-tree';

let n = 1939038;
const factor = 1.4;
const top = 10000000;
while(n <= top) {
    let totalPerSegTree = 0;
    let old = 0;

    let queries = 300000;
    let updates = 1000000;
    let totalVersions = 0;

    old = Date.now();
    let pSegTree = new PersistentSegmentTree(n);
    totalPerSegTree += Date.now() - old;

    while(queries > 0 || updates > 0) {
        let type = Math.floor(Math.random() * 2);
        if(type == 0 && updates > 0) {
            let pos = Math.floor(Math.random() * n);

            old = Date.now();
            pSegTree.update(pos, 1);
            totalPerSegTree += Date.now() - old;

            totalVersions++;
            updates--;
        } else if (queries > 0) {
            let left = Math.floor(Math.random() * n);
            let right = Math.floor(Math.random() * n);
            const tleft = Math.min(left, right);
            const tright = Math.max(left, right);

            let version = Math.floor(Math.random() * totalVersions);

            old = Date.now();
            pSegTree.query(version, tleft, tright);
            totalPerSegTree += Date.now() - old;

            queries--;
        }
    }
    console.log(n+', '+totalPerSegTree);
    n = Math.ceil(n * factor);
}