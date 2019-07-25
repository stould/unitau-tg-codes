export class SegmentTree {

    constructor(n, values) {
        this.size = n;
        this.tree = [];

        for(let i = 0; i < 4 * n; i++) {
            this.tree.push(0);
        }

        if(values) {
            this.values = values;
        }
    }

    buildTree(currentNode, left, right) {
        if(left > right) return;

        if(left == right) {
            this.tree[currentNode] = this.values[left];
        } else {
            const mid = (left + right) >> 1;

            this.buildTree(currentNode * 2, left, mid);
            this.buildTree(currentNode * 2 + 1, mid + 1, right);
            
            this.tree[currentNode] = 
                this.tree[currentNode * 2] + this.tree[currentNode * 2 + 1];
        }
    }

    build() {
        this.buildTree(1, 0, this.size - 1);
    }

    sumQuery(currentNode, leftBound, rightBound, left, right) {
        if(right < leftBound || left > rightBound) {
            return 0;
        }
        if(left >= leftBound && right <= rightBound) {
            return this.tree[currentNode];
        } else {
            const mid = (left + right) >> 1;

            const leftValue = 
                this.sumQuery(currentNode * 2, leftBound, rightBound, left, mid);
            const rightValue = 
                this.sumQuery(currentNode * 2 + 1, leftBound, rightBound, mid + 1, right);

            return leftValue + rightValue;
        }
    }

    query(leftBound, rightBound) {
        return this.sumQuery(1, leftBound, rightBound, 0, this.size - 1);
    }
}