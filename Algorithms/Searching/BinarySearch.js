import assert from 'assert';

const binarySearch = (() => {
    // iterative T: O(log(n)) S: O(1)
    const binarySearch = (arr, item) => {
        let endIndex = arr.length - 1;
        let middleIndex = Math.ceil(arr.length / 2);

        while (arr[middleIndex] !== item) {
            if (middleIndex === endIndex) {
                return null;
            }

            if (arr[middleIndex] > item) {
                endIndex = middleIndex;
                middleIndex = Math.ceil((endIndex - middleIndex) / 2)
            } else {
                middleIndex = middleIndex + Math.ceil((endIndex - middleIndex) / 2);
            }
        }

        return middleIndex;
    };

    return binarySearch;
})();

export default binarySearch;

(() => {
    // recursive T: O(log(n)) S: O(log(n)) including call stack
    const binarySearch = (arr, item, middleIndex = Math.ceil(arr.length / 2), endIndex = arr.length - 1) => {
        if (arr[middleIndex] === item) {
            return middleIndex;
        }

        if (middleIndex === endIndex) {
            return null;
        }

        if (item < arr[middleIndex]) {
            endIndex = middleIndex;
            middleIndex = Math.ceil((endIndex - middleIndex) / 2)
        } else {
            middleIndex = middleIndex + Math.ceil((endIndex - middleIndex) / 2);
        }

        return binarySearch(arr, item, middleIndex, endIndex);
    };
});

(() => {
    // less readable recursive version using only middleIndex and subarrays,
    // due to latter it can only tell if item exists or not in the array
    // T: O(log(n)) S: O(log(n))
    const binarySearch = (arr, item) => {
        if (arr.length === 0) {
            return false;
        }

        const middleIndex = Math.trunc(arr.length / 2);

        if (arr[middleIndex] === item) {
            return true;
        }

        if (item < arr[middleIndex]) {
            return binarySearch(arr.slice(0, middleIndex), item);
        }

        return binarySearch(arr.slice(middleIndex + 1, arr.length), item);
    };

    // tests
    const sampleArray = [9, 14, 6, 4, 5, 2, 3, 1, 8, 6, 12, 7];

    assert.strictEqual(binarySearch(sampleArray.sort((a, b) => a - b), 13), false);
    assert.strictEqual(binarySearch(sampleArray.sort((a, b) => a - b), 12), true);
    assert.strictEqual(binarySearch(sampleArray.sort((a, b) => a - b), 1), true);
    assert.strictEqual(binarySearch(sampleArray.sort((a, b) => a - b), -1), false);
})();
