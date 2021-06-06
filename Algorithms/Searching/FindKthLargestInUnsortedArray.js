// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5

// Methods to solve this problem from top of the head:
// 1) Using some n*log(n) sorting algorithm
// 2) Using Max Heap. We can even optimize this approach by keeping track of only k greatest
//    values in a Max Heap. If k is a relatively small number, then we might end up with a
//    pretty decent O(n*log(k)) solution.
// 3) Using QuickSort's Lomuto scheme's partitioning algorithm might lead us to a linear
//    time solution

import assert from 'assert';
import inPlaceElementSwap from '../Sorting/InPlaceElementSwap.js';

// Using Lomuto's partiotioning algorithm
const kthLargestElement = (array, k) => {
    let lowIndex = 0;
    let highIndex = array.length - 1;
    const targetIndex = array.length - k;

    while (lowIndex <= highIndex) {
        const randomPivotIndex = getRandomInteger(lowIndex, highIndex);
        const nextPivotIndex = partition(array, lowIndex, highIndex, randomPivotIndex);

        if (nextPivotIndex === targetIndex) {
            return array[nextPivotIndex];
        } else if (nextPivotIndex > targetIndex) {
            highIndex = nextPivotIndex - 1;
        } else {
            lowIndex = nextPivotIndex + 1;
        }
    }

    return null;
};

const partition = (array, lowIndex, highIndex, pivotIndex) => {
    const pivotItem = array[pivotIndex];
    let lesserItemsPartLastIndex = lowIndex;

    // swap pivot item with last item
    inPlaceElementSwap(pivotIndex, highIndex, array);

    for (let i = lowIndex; i < highIndex; i++) {
        if (array[i] < pivotItem) {
            inPlaceElementSwap(i, lesserItemsPartLastIndex, array);
            lesserItemsPartLastIndex++;
        }
    }

    // after current partion is done we'll swap pivot item back
    inPlaceElementSwap(lesserItemsPartLastIndex, highIndex, array);

    return lesserItemsPartLastIndex;
};

const getRandomInteger = (lowerBound, higherBound) => {
    return Math.floor(Math.random() * (higherBound - lowerBound + 1)) + lowerBound;
};

// tests
assert.strictEqual(kthLargestElement([3, 2, 1, 5, 6, 4], 2), 5);
assert.strictEqual(kthLargestElement([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);
