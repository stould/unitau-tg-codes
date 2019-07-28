export class SegmentTreeArray {

    constructor(n, data) {
        this.size = n;
        this.tree = Array.from({ length: this.size * 4 }, () => 0);

        if(data) {
            this.data = data;
        }
    }

    buildTree(currentNode, left, right) {
        if(left > right) return;

        if(left == right) {
            this.tree[currentNode] = this.data[left];
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

    updateTree(currentNode, index, data, left, right) {
        if(left > right) return;

        if(left === right) {
            this.tree[currentNode] = data;
        } else {
            const mid = (left + right) >> 1;
            if(index <= mid) {
                this.updateTree(currentNode * 2, index, data, left, mid);
            } else {
                this.updateTree(currentNode * 2 + 1, index, data, mid + 1, right);
            }

            this.tree[currentNode] = this.tree[currentNode * 2] + this.tree[currentNode * 2 + 1];
        }
    }

    update(index, data) {
        if(index >= this.size || index < 0) {
            throw new Error('Index should lie between [' + 0 + ', ' + (this.size - 1) + ']');
        }
        
        this.updateTree(1, index, data, 0, this.size - 1);
    }

    sumQuery(currentNode, leftBound, rightBound, left, right) {
        if(right < leftBound || left > rightBound) {
            return 0;
        }
        if(left >= leftBound && right <= rightBound) {
            return this.tree[currentNode];
        } else {
            const mid = (left + right) >> 1;

            const leftData = 
                this.sumQuery(currentNode * 2, leftBound, rightBound, left, mid);
            const rightData = 
                this.sumQuery(currentNode * 2 + 1, leftBound, rightBound, mid + 1, right);

            return leftData + rightData;
        }
    }

    query(leftBound, rightBound) {
        if(rightBound < leftBound) {
            throw new Error('Left index cannot be greater than right index');
        }
        
        return this.sumQuery(1, leftBound, rightBound, 0, this.size - 1);
    }
}