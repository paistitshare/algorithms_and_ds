// 1. run simple loop from 2 index until array.length
//   a) pickup the first number from an unsorted part of the array
//      and store it in a variable
//   b) run loop in sorted part of the array to find a place for it,
//      meaning: do index incrementing until a[j] > candidateElement &&
//      a[j - 1] < candidateElement
//   c) remove candedateElement
//   d) insert candidateElement at j position
//
import assert from 'assert';

// T: O(n^2) S: O(1)
const insertionSort = (arrayToSort) => {
    // traverses elements in a sorted part of an array
    for (let i = 1; i < arrayToSort.length; i++) {
        const candidateElement = arrayToSort[i];

        // traverses elements in an usorted part of an array
        // can be improved with binary search
        for (let j = i - 1; j >= 0; j--) {
            if (canFit(candidateElement, j, arrayToSort)) {
                moveElementIntoSortedPart(i, j, candidateElement, arrayToSort);
                break;
            }
        }
    }

    return arrayToSort;
};

// checks if a candidate element can fit between the two in a sorted
// part of an array
const canFit = (element, comparedIndex, array) => {
    if (comparedIndex - 1 !== -1) {
        return array[comparedIndex - 1] < element && array[comparedIndex] > element;
    }

    return array[comparedIndex] > element;
}

// removes an element from an unsorted part of an array and
// inserts it into a sorted one
const moveElementIntoSortedPart = (
    pickupIndex,
    insertIndex,
    element,
    array
) => {
    array.splice(pickupIndex, 1);
    array.splice(insertIndex, 0, element);
};

// tests
const sampleArray = [2, 7, 6, 4, 1, 5, 3];
const sortedArrayCopy = [...sampleArray].sort((a, b) => a - b);

assert.deepStrictEqual(insertionSort(sampleArray), sortedArrayCopy);
