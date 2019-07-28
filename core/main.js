//------ main.js ------

import {SegmentTreeArray} from '../core/SegmentTreeArray';
import * as algorithms from '../core/NaiveAlgorithms';
import { SegmentTreePointer } from '../core/SegmentTreePointer';


const n = 10000000;
const queries = 100000;
const updates = 500000;

let totalSegTreeArray = 0, totalSegTreePointer = 0;

let old = Date.now();
let treeArray = new SegmentTreeArray(n);
totalSegTreeArray += Date.now() - old;

old = Date.now();
let treePointer = new SegmentTreePointer(n);
totalSegTreePointer += Date.now() - old;


for(let times = updates; times > 0; times--) {
    const pos = Math.floor(Math.random() * n);
    const value = 1;

    old = Date.now();
    treeArray.update(pos, value);
    totalSegTreeArray += Date.now() - old;

    old = Date.now();
    treePointer.update(pos, value);
    totalSegTreePointer += Date.now() - old;
}

for(let times = queries; times > 0; times--) {
    let left = Math.floor(Math.random() * n);
    let right = Math.floor(Math.random() * n);
    left = Math.min(left, right);
    right = Math.max(left, right);

    old = Date.now();
    const vAarray = treeArray.query(left, right);
    totalSegTreeArray += Date.now() - old;

    old = Date.now();
    const vPointer = treePointer.query(left, right);
    totalSegTreePointer += Date.now() - old;
    if(vAarray != vPointer) console.log('erro');
    
}

console.log(totalSegTreeArray + ' ' + totalSegTreePointer);