export function intervalSum(values, left, right) {
    let sum = values[left];

    for(let i = left + 1; i <= right; i++) {
        sum += values[i];
    }

    return sum;
}