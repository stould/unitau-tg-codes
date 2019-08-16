export class SegmentTreeLazyPropagation {

    constructor(n, data) {
        this.size = n;
        this.tree = Array.from({ length: this.size * 4 }, () => 0);
        this.lazy = Array.from({ length: this.size * 4 }, () => 0);

        if(data) {
            this.data = data;
        }
    }

    propagate(currentNode, left, right) {
        if(this.lazy[currentNode] > 0) {
            const intervalSize = (right - left + 1);
            this.tree[currentNode] += intervalSize * this.lazy[currentNode];

            if(left !== right) {
                this.lazy[currentNode * 2] += this.lazy[currentNode];
                this.lazy[currentNode * 2 + 1] += this.lazy[currentNode];
            }

            this.lazy[currentNode] = 0;
        }
    }

    updateTree(currentNode, leftBound, rightBound, left, right, data) {
        //accessed node, propagate to its children
        this.propagate(currentNode, left, right);
        if(right < leftBound || left > rightBound) return;
        if(left >= leftBound && right <= rightBound) {
            this.lazy[currentNode] += data;

            //accessed node, propagate to its children
            this.propagate(currentNode, left, right);
        } else {
            const mid = (left + right) >> 1;

            this.updateTree(
                currentNode * 2,
                leftBound,
                rightBound,
                left,
                mid,
                data
            );
            this.updateTree(
                currentNode * 2 + 1,
                leftBound,
                rightBound,
                mid + 1,
                right,
                data
            );

            this.tree[currentNode] =
                this.tree[currentNode * 2] +
                this.tree[currentNode * 2 + 1];
        }
    }

    update(leftBound, rightBound, data) {
        return this.updateTree(
            1, leftBound, rightBound, 0, this.size - 1, data
        );
    }

    sumQuery(currentNode, leftBound, rightBound, left, right) {
        if(right < leftBound || left > rightBound) return 0;

        //accessed node, propagate to its children
        this.propagate(currentNode, left, right);
        if(left >= leftBound && right <= rightBound) {
            return this.tree[currentNode];
        } else {
            const mid = (left + right) >> 1;

            const leftData = 
                this.sumQuery(
                    currentNode * 2, leftBound, rightBound, left, mid
                );
            const rightData = 
                this.sumQuery(
                    currentNode * 2 + 1, leftBound, rightBound, mid+1, right
                );

            return leftData + rightData;
        }
    }

    query(leftBound, rightBound) {
        return this.sumQuery(1, leftBound, rightBound, 0, this.size - 1);
    }
}