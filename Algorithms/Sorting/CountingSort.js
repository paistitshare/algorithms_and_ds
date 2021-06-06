import assert from 'assert';
import fisherYatesShuffle from '../RNG/FisherYatesShuffle.js';

// T: O(n + k) S: O(n + k)
const countingSort = (arrayToSort) => {
    // This will take care of negative elements
    const maxElement = Math.max(...arrayToSort);
    const minElement = Math.min(...arrayToSort);
    const rangeOfElements = maxElement - minElement + 1;
    const countArray = Array(rangeOfElements).fill(0);
    const sortedArray = Array(arrayToSort.length).fill(0);

    // Stores count of each element
    for (let i = 0; i < arrayToSort.length; i++) {
        countArray[arrayToSort[i] - minElement]++;
    }

    // Updates countArray elements with actual positions
    // of an element in an output array
    for(let i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
    }

    // Fetch elements order from count array and fill
    // the output array
    for (let i = arrayToSort.length - 1; i >= 0; i--) {
        const countOfElement = countArray[arrayToSort[i] - minElement];
        sortedArray[countOfElement - 1] = arrayToSort[i];
        countArray[arrayToSort[i] - minElement]--;
    }

    return sortedArray;
};

// tests
const sampleArray = Array.from(Array(10), (_value, index) => index + 1);
const sampleArrayCopy = [...sampleArray];

fisherYatesShuffle(sampleArray);
assert.deepStrictEqual(countingSort(sampleArray), sampleArrayCopy);
