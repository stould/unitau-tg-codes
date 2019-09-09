export function queryArray(array, left, right) {
    let set = new Set();

    for(let i = left; i <= right; i++) {
        set.add(array[i]);
    }

    return set.size;
}