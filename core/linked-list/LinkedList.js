import {LinkedListNode} from './LinkedListNode';

export class LinkedList {

    constructor() {
        this.head = null;
        this.size = 0;
    }

    insert(data) {
        this.size++;
        let newNode = new LinkedListNode(data);
        if(this.head === null) {
            this.head = newNode;
        } else {
            let temp = this.head;
            while(temp.next !== null) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    printList() {
        let temp = this.head;
        while(temp != null) {
            console.log(temp.data);
            temp = temp.next;
        }
    }
}
