import assert from 'assert';

// iterative in place with Two Pointers method T: O(n) S: O(1)
const reverseArray = (arrayToReverse) => {
    let leftPartIndex = 0;
    let rightPartIndex = arrayToReverse.length - 1;

    while (leftPartIndex < rightPartIndex) {
        const leftPartElement = arrayToReverse[leftPartIndex];

        arrayToReverse[leftPartIndex] = arrayToReverse[rightPartIndex];
        arrayToReverse[rightPartIndex] = leftPartElement;

        ++leftPartIndex;
        --rightPartIndex;
    }

    return arrayToReverse;
};

(() => {
    // recursive S: O(n) cause of call stack and additional variable
    // for each element of the array
    const reverseArray = (arrayToReverse) => {
        if (arrayToReverse.length < 2) {
            return arrayToReverse;
        }

        const firstElement = arrayToReverse.splice(0, 1)[0];
        reverseArray(arrayToReverse);
        arrayToReverse.push(firstElement);

        return arrayToReverse;
    }

    // tests
    assert.deepStrictEqual(reverseArray([1, 2, 3, 4]), [4, 3, 2, 1]);
    assert.deepStrictEqual(reverseArray([1]), [1]);
})();
