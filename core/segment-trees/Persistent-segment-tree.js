import {TreeNode} from '../binary-tree/TreeNode';

export class PersistentSegmentTree {

    constructor(n) {
        this.size = n;
        this.versions = [this.build(0, n - 1)];
    }

    build(left, right) {
        let root = new TreeNode(0);

        //not a leaf
        if(left !== right) {
            const mid = (left + right) >> 1;
            root.left = this.build(left, mid);
            root.right = this.build(mid + 1, right);
        }

        return root;
    }

    insertTree(oldRoot, index, data, left, right) {
        //copying the current node from previus version
        let root = new TreeNode(oldRoot.data);

        const mid = (left + right) >> 1;

        if(left === right) {
            root.data += data;
            return root;
        } else if (index <= mid) {
            //keep extending current version
            root.left = this.insertTree(
                oldRoot.left, index, data, left, mid
            );

            //copying right subtree
            root.right = oldRoot.right;
        } else {
            //keep extending current version
            root.right = this.insertTree(
                oldRoot.right, index, data, mid + 1, right
            );

            //copying left subtree
            root.left = oldRoot.left;
        }

        root.data = root.left.data + root.right.data;

        return root;
    }

    insert(index, data) {
        const lastVersionIndex = this.versions.length - 1;
        let newRoot = this.insertTree(
            this.versions[lastVersionIndex], index, data, 0, this.size - 1
        );
        
        this.versions.push(newRoot);
    }

    sumQuery(root, leftBound, rightBound, left, right) {
        if(right < leftBound || left > rightBound) {
            return 0;
        }

        if(left >= leftBound && right <= rightBound) {
            return root.data;
        } else {
            const mid = (left + right) >> 1;

            const leftData = 
                this.sumQuery(root.left, leftBound, rightBound, left, mid);
            const rightData = 
                this.sumQuery(root.right, leftBound, rightBound, mid + 1, right);

            return leftData + rightData;
        }
    }

    query(version, leftBound, rightBound) {
        const root = this.versions[version];
        return this.sumQuery(root, leftBound, rightBound, 0, this.size - 1);
    }
}