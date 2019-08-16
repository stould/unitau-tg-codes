export function findValue(key, left, right) {
    for(let i = left; i <= right; i++) {
        if(key == i) {
            return 1;
        }
    }

    return -1;
}