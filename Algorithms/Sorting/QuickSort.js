// We'll implement one of the best know QuickSort implementations
// called Hoare's scheme.
// each quicksort iteration does next:
//  1) pick a pivot index as a middle index of an array
//  2) reserve two pointers 'startIndex' and 'endIndex'
//     and while (startIndex < endIndex) swap elments, when left part
//     of array element is smaller than pivot and right part element
//     is bigger than pivot element
//  3) repeat the same steps for 2 portions of the array:
//     left and right from a pivot index
import assert from 'assert';
import fisherYatesShuffle from '../RNG/FisherYatesShuffle.js';
import inPlaceElementSwap from './InPlaceElementSwap.js';

// T: O(n^2) S: O(log(n)) cause we use call stack
const quickSort = (arrayToSort, startIndex = 0, endIndex = arrayToSort.length - 1) => {
    if (startIndex < endIndex) {
        const pivotIndex = partition(arrayToSort, startIndex, endIndex);

        quickSort(arrayToSort, startIndex, pivotIndex);
        quickSort(arrayToSort, pivotIndex + 1, endIndex);
    }

    return arrayToSort;
};

const partition = (arrayToSort, startIndex, endIndex) => {
    // Oficially Hoare's scheme picks a middle index as a pivot
    const pivotIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
    const pivotElement = arrayToSort[pivotIndex];
    let leftIndex = startIndex - 1;
    let rightIndex = endIndex + 1;

    while (true) {
        leftIndex++;
        while (arrayToSort[leftIndex] < pivotElement) {
            leftIndex++;
        }

        rightIndex--;
        while (arrayToSort[rightIndex] > pivotElement) {
            rightIndex--;
        }

        if (leftIndex >= rightIndex) {
            return rightIndex;
        }

        inPlaceElementSwap(leftIndex, rightIndex, arrayToSort);
    }
};

const sampleArray = Array.from(Array(10), (_value, index) => index + 1);
const sampleArrayCopy = [...sampleArray];

fisherYatesShuffle(sampleArray);
assert.deepStrictEqual(quickSort(sampleArray), sampleArrayCopy);
