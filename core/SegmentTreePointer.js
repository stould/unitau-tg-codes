import {TreeNode} from '../core/TreeNode';

export class SegmentTreePointer {

    constructor(n) {
        this.size = n;
        this.root = new TreeNode(null);
    }

    updateTree(root, index, data, left, right) {
        if(root === null) {
            root = new TreeNode(0);
        }

        const mid = (left + right) >> 1;

        if(left === right) {
            root.data = data;
            return root;
        } else if (index <= mid) {
            root.left = this.updateTree(root.left, index, data, left, mid);
        } else {
            root.right = this.updateTree(root.right, index, data, mid + 1, right);
        }

        const leftData = (root.left === null) ? 0 : root.left.data;
        const rightData = (root.right === null) ? 0 : root.right.data;
        root.data = leftData + rightData;
        
        return root;
    }

    update(index, data) {
        if(index >= this.size || index < 0) {
            throw new Error('Index should lie between [' + 0 + ', ' + (this.size - 1) + ']');
        }

        this.updateTree(this.root, index, data, 0, this.size - 1);
    }

    sumQuery(root, leftBound, rightBound, left, right) {
        if(root === null || right < leftBound || left > rightBound) {
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

    query(leftBound, rightBound) {
        if(rightBound < leftBound) {
            throw new Error('Left index cannot be greater than right index');
        }

        return this.sumQuery(this.root, leftBound, rightBound, 0, this.size - 1);
    }
}