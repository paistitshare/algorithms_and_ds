//
//              [5, 2, 4, 1, 3]
//               /           \
//            [5, 2]      [4, 1, 3]
//              \         /     \
//            [5, 2]    [4]   [1, 3]
//             /   \     |     /  \
//           [5]  [2]   [4]   [1] [3]
//             |   /     |     |  /
//            [2, 5]    [4]   [1, 3]
//              \   /     \    /
//              [2, 5] [1, 3, 4]
//                  \       /
//               [1, 2, 3, 4, 5]
import assert from 'assert';

(() => {
    // This version creates two subarrays for each recursive call
    // T: O(n*log(n)) S: O(n)
    const mergeSort = (arrayToSort) => {
        if (arrayToSort.length === 1) {
            return;
        }

        const middleIndex = Math.floor(arrayToSort.length / 2);
        const leftPart = arrayToSort.slice(0, middleIndex);
        const rightPart = arrayToSort.slice(middleIndex, arrayToSort.length);

        mergeSort(leftPart);
        mergeSort(rightPart);

        return mergeTwoParts(arrayToSort, leftPart, rightPart);
    };

    const mergeTwoParts = (arrayToSort, leftPart, rightPart) =>  {
        let i, j, k;
        i = j = k = 0;

        while (i < leftPart.length && j < rightPart.length) {
            if (leftPart[i] <= rightPart[j]) {
                arrayToSort[k] = leftPart[i];
                i++;
            } else {
                arrayToSort[k] = rightPart[j];
                j++;
            }
            k++;
        }

        // copy leftovers from left
        while (i < leftPart.length) {
            arrayToSort[k] = leftPart[i];
            i++;
            k++;
        }

        // copy leftovers from right
        while (j < rightPart.length) {
            arrayToSort[k] = rightPart[j];
            j++;
            k++;
        }

        return arrayToSort;
    };

    // tests
    const sampleArray = [5, 3, 2, 7, 10, 4, 8, 6, 1, 3];
    const sortedArrayCopy = [...sampleArray].sort((a, b) => a - b);

    assert.deepStrictEqual(mergeSort(sampleArray), sortedArrayCopy);
})();

(() => {
    // This one uses only indexes and does in-place merge,
    // but it still uses a temporary array to achieve better
    // computational performance
    const mergeSort = (arrayToSort, startIndex = 0, endIndex = arrayToSort.length - 1) => {
        if (endIndex > startIndex) {
            const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

            mergeSort(arrayToSort, startIndex, middleIndex);
            mergeSort(arrayToSort, middleIndex + 1, endIndex);

            return mergeTwoParts(
                arrayToSort,
                startIndex,
                middleIndex,
                middleIndex + 1,
                endIndex
            );
        }
    };

    // in-place merge using indexes and temporary array
    const mergeTwoParts = (
        arrayToSort,
        leftIndex,
        middleIndex,
        rightIndex
    ) => {
        let i = leftIndex;
        let j = middleIndex + 1;
        let t = 0;
        const temporaryArray = [];

        while (i <= leftIndex && j <= rightIndex) {
            if (arrayToSort[i] <= arrayToSort[j]) {
                temporaryArray[t] = arrayToSort[i];
                i++;
            } else {
                temporaryArray[t] = arrayToSort[j];
                j++;
            }
            t++;
        }

        // copy leftovers
        while (i <= middleIndex) {
            temporaryArray[t] = arrayToSort[i];
            i++;
            t++;
        }

        while (j <= rightIndex) {
            temporaryArray[t] = arrayToSort[j];
            j++;
            t++;
        }

        // copy over the whole thing into an original array
        for (let k = leftIndex, t = 0; t < temporaryArray.length; k++, t++) {
            arrayToSort[k] = temporaryArray[t];
        }
    };
});
