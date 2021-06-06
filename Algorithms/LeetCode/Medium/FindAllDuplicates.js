// Given an integer array nums of length n where all the integers of nums are in the
// range [1, n] and each integer appears once or twice, return an array of all the
// integers that appears twice.
import assert from 'assert';

// T: O(n) S: O(1)
class Solution1 {
    static getDuplicateNumbers(arrayToSearch) {
        const duplicateNumbers = [];

        for (let i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[Math.abs(arrayToSearch[i])] > 0) {
                arrayToSearch[Math.abs(arrayToSearch[i])] *= -1;
            } else {
                duplicateNumbers.push(Math.abs(arrayToSearch[i]));
            }
        }

        return duplicateNumbers;
    }
}

// T: O(n) S: O(1)
class Solution2 {
    static getDuplicateNumbers(arr) {
        const sortedArray = arr.sort();
        const duplicateNumbers = [];

        for (let i = 0; i < sortedArray.length - 1; i++) {
            if (sortedArray[i + 1] == sortedArray[i] &&
                duplicateNumbers[duplicateNumbers.length - 1] != sortedArray[i]) {
                    duplicateNumbers.push(sortedArray[i]);
            }
        }

        return duplicateNumbers;
    }
}

// tests
assert.deepStrictEqual(Solution2.getDuplicateNumbers([6, 2, 3, 1, 3, 6, 1]), [1, 3, 6]);
assert.deepStrictEqual(Solution2.getDuplicateNumbers([-4, 4, 2, -4, 2]), [-4, 2]);
