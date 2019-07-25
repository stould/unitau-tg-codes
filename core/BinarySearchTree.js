import {TreeNode} from './TreeNode';

export class BinarySearchTree {

    constructor() {
        this.root = null;
        this.size = 0;
    }

    insertNode(root, data) {
        if(root === null) {
            this.size++;
            return new TreeNode(data);
        } else {
            const currentData = root.data;
            if(currentData > data) {
                root.left = this.insertNode(root.left, data);
            } else if (currentData < data) {
                root.right = this.insertNode(root.right, data);
            } else {
                throw new Error('Duplicate keys');
            }
        }
        return root;
    }

    insert(data) {
        this.root = this.insertNode(this.root, data);
    }

    inOrder(root) {
        if (root !== null) {
            this.inOrder(root.left);
            console.log(root);
            this.inOrder(root.right);
        }
    }

    run() {
        this.inOrder(this.root);
    }
}
