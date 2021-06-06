// Considering, that we already have a sorted array we need to check, whether
// there's a pair of elements, that is equal to a provided sum number
// Examples:
// Input: [1, 2, 3, 9] sum = 8; Output: false
// [1, 2, 4, 4, 5, 7, 9, 12] sum = 12; Output: true
import assert from 'assert';

(() => {
    const hasPairEqualToSum = (sortedArray, sum) => {
        if (sortedArray.length < 2) {
            return false;
        }

        let smallElementIndex = 0;
        let bigElementIndex = sortedArray.length - 1;

        while (smallElementIndex < bigElementIndex) {
            const sumOfElements = sortedArray[smallElementIndex] + sortedArray[bigElementIndex];

            if (sumOfElements === sum) {
                return true;
            }

            if (sumOfElements < sum) {
                ++smallElementIndex;
                continue;
            }

            if (sumOfElements > sum) {
                --bigElementIndex;
                continue;
            }
        }

        return false;
    };
});

// If we cannot guarantee element order in an array, then we're gonna do this:
// we'll use HashMap to store required complement numbers for each traversed element
const hasPairEqualToSum = (unsortedArray, sum) => {
    if (unsortedArray.length < 2) {
        return false;
    }

    const complementNumbersSet = new Set();

    for (let i = 0; i < unsortedArray.length; i++) {
        const isCurrentComplement = complementNumbersSet.has(unsortedArray[i]);

        if (isCurrentComplement) {
            return true;
        }

        const complementNumber = sum - unsortedArray[i];
        complementNumbersSet.add(complementNumber);
    }

    return false;
};

assert.strictEqual(hasPairEqualToSum([1, 2, 4, 4, 5, 6, 7, 8, 9, 12], 21), true);
assert.strictEqual(hasPairEqualToSum([1, 2, 4, 4, 5, 6, 7, 8, 9, 12], 0), false);
assert.strictEqual(hasPairEqualToSum([-1, 1, -2, 2], -3), true);
