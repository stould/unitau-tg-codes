export class SegmentTree {

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
            const mid = (left + right) >> 1; // mid point

            this.buildTree(currentNode * 2, left, mid);
            this.buildTree(currentNode * 2 + 1, mid + 1, right);
            
            this.tree[currentNode] = //parent update
                this.tree[currentNode * 2] + this.tree[currentNode * 2 + 1];
        }
    }

    build() {
        this.buildTree(1, 0, this.size - 1);
    }

    updateTree(currentNode, index, data, left, right) {
        if(left > right) return;
        if(left === right) {
            this.tree[currentNode] = data; //leaft update
        } else {
            const mid = (left + right) >> 1;
            if(index <= mid) {
                this.updateTree(
                    currentNode * 2, index, data, left, mid
                );
            } else {
                this.updateTree(
                    currentNode * 2 + 1, index, data, mid + 1, right
                );
            }

            this.tree[currentNode] = //propagate update from the leaft to root
                this.tree[currentNode * 2] + this.tree[currentNode * 2 + 1];
        }
    }

    update(index, data) {
        this.updateTree(1, index, data, 0, this.size - 1);
    }

    getKth(currentNode, K, left, right) {
        if(this.tree[currentNode] < K) {
            return -1;
        }
        if(left == right && K == 1) {
            return left;
        } else {
            const mid = (left + right) >> 1;

            //go to right subtree, and substract left subtree from K
            if(K > this.tree[currentNode * 2]) {
                return this.getKth(
                    currentNode * 2 + 1,
                    K - this.tree[currentNode * 2],
                    mid + 1,
                    right
                );
            }

            //go to left subtree
            return this.getKth(currentNode * 2, K, left, mid);
        }
    }

    query(K) {
        return this.getKth(1, K, 0, this.size - 1);
    }
}