export function updateArray(array, I, value) {
    array[I] = value;
}

export function queryArray(array, K) {
    let pos = 0;
    while(pos < array.length && K > 0) {
        if(array[pos] > 0) K--;
        pos++;
    }

    return (K == 0) ? pos - 1 : -1;
}