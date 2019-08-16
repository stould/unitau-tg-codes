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