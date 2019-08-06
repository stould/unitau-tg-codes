export function intervalSum(values, left, right) {
    let sum = values[left];

    for(let i = left + 1; i <= right; i++) {
        sum += values[i];
    }

    return sum;
}

export function binarySearch(key, left, right) {
    if(left > right) return -1;
    const mid = (left + right) >> 1; //mid point

    if(key < mid) {
        return binarySearch(key, left, mid - 1); // cut right part
    } else if(key > mid) {
        return binarySearch(key, mid + 1, right); // cut left part
    } else {
        return 1; //key has been found
    }
}

export function findValue(key, left, right) {
    for(let i = left; i <= right; i++) {
        if(key == i) {
            return 1;
        }
    }

    return -1;
}