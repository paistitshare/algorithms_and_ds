import assert from 'assert';

// T: O(n^2) S: O(1)
const selectionSort = (arrayToSort) => {
    for (let i = 0; i < arrayToSort.length - 1; i++) {
        let minElementIndex = i;

        for (let j = i + 1; j < arrayToSort.length; j++) {
            if (arrayToSort[j] <= arrayToSort[minElementIndex]) {
                minElementIndex = j;
            }
        }

        if (minElementIndex !== i) {
            swap(i, minElementIndex, arrayToSort);
        }
    }

    return arrayToSort;
};

const swap = (firstIndex, secondIndex, arrayToSort) => {
    const temp = arrayToSort[firstIndex];

    arrayToSort[firstIndex] = arrayToSort[secondIndex];
    arrayToSort[secondIndex] = temp;
};

// tests
const sampleArray = [2, 7, 6, 4, 1, 5, 3];
const sortedArrayCopy = [...sampleArray].sort((a, b) => a - b);

assert.deepStrictEqual(selectionSort(sampleArray), sortedArrayCopy);
