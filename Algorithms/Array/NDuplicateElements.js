import assert from 'assert';

// Write a function, that'll have 2 parameters: an array of different
// data type of elements (any primitive data type) and the 'n' number. The function
// should return an array with all the elements, that've occured at least n times in array.

// This one doesn't try in any way to imitate the complexity of recursive
// shallow-comparing isEqual methods of LoDash/Underscore libraries
const isEqual = (first, second) => {
    if (Number.isNaN(first) && Number.isNaN(second)) {
        return true;
    }

    if (typeof first === 'symbol' && typeof second === 'symbol') {
        return true;
    }

    return first === second;
};

(() => {
    // Brute force solution.
    // T: O(n^2) S: O(n^2). If we have f.e. [1, 1, 1, 1, 1, ...], then we might
    // have n array's returned by inner .filter()
    const duplicateNumbers = (inputArray, n) => {
        const duplicateNumbersSet = inputArray.reduce((accumulatingArray, firstOccuredElement) => {
            const elementOccurenceCount = inputArray.filter((element) => isEqual(firstOccuredElement, element)).length;

            if (elementOccurenceCount >= n) {
                accumulatingArray.add(firstOccuredElement);
            }

            return accumulatingArray;
        }, new Set());

        return [...duplicateNumbersSet];
    };
});

(() => {
    // T: O(n) S: O(n)
    const duplicateNumbers = (array, n) => {
        const occurrenceMap = array.reduce((mapping, element) => {
            let occurenceCount = 1;
            let existingOccurenceCount = mapping ? mapping.get(element) : null;

            if (existingOccurenceCount) {
                occurenceCount = ++existingOccurenceCount;
            }

            return mapping.set(element, occurenceCount);
        }, new Map());

        return [...occurrenceMap.entries()]
            .filter(([_element, occurenceCount]) => occurenceCount >= n)
            .flatMap(([element, _occurenceCount]) => element);
    };

    // tests
    assert.deepStrictEqual(duplicateNumbers([1, 2, 1, 3, 4, 3], 2), [1, 3]);
    assert.deepStrictEqual(duplicateNumbers([5, 1, 6, 7], 3), []);
})();
