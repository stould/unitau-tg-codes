import {LinkedListNode} from '../core/LinkedListNode';

export class LinkedList {

    constructor() {
        this.head = new LinkedListNode(10);
        this.head.next = new LinkedListNode(5);
    }

    printList() {
        while(this.head != null) {
            console.log(this.head.data);
            this.head = this.head.next;
        }
    }
}
