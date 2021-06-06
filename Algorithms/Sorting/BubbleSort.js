import assert from 'assert';
import inPlaceElementSwap from './InPlaceElementSwap.js';

// In-place T: O(n^2) S: O(1)
const bubbleSort = (arrayToSort) => {
    for (let i = 0; i < arrayToSort.length; i++) {
        let swappedOnce = false;
        for (let j = 0; j < arrayToSort.length - 1; j++) {
            if (arrayToSort[j] > arrayToSort[j + 1]) {
                swappedOnce = true;
                inPlaceElementSwap(j, j + 1, arrayToSort);
            }
        }

        if (swappedOnce === false) {
            return arrayToSort;
        }
    }

    return arrayToSort;
};

// tests
const sampleArray = [5, 2, 7, 10, 4, 8, 6, 1, 3];

assert.deepStrictEqual(bubbleSort(sampleArray), [1, 2, 3, 4, 5, 6, 7, 8, 10]);
