// Given an array of positive integers find subarrays,
// that add up to a given number. Note, that output subarrays
// should be comprised of only adjacent elements
// example:
//    input: array = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum = 9
//    output: [[2, 3, 4], [4, 5], [9]]

// the idea to employ here is to use sliding window technique,
// meaning: we will define a window at the beginning as two first
// elements in an array and then, as we move forward, we're gonna
// expand our window one index right at a time if the sum of the
// elements in a window is less than 9 and we'll shrink our by one
// index from the left if the sum of elements in a window is more
// than target sum

// But what about something like this [-2, 5, 2, -3, -4, 9, 2, 3]
// If we had some negative numbers in array, then the original
// technique might not guarantee to cover all the possible cases.
// So, what we can do here is to find minimal element in an entire
// array and then increase all the elements by that value. There's
// an approach called Kadane's algorithm, that might be better suited
// for such purposes.
import assert from 'assert';

// T: O(n) S: O(n) (if we consider our pairs array worst case)
const subarraysWithSumEqualTo = (arrayToSearch, sum) => {
    if (arrayToSearch.length < 1) {
        if (arrayToSearch.length === 1) {
            return arrayToSearch[0] === sum ? [[arrayToSearch[0]]] : null;
        }

        return null;
    }

    const subarrays = [];
    let windowStartIndex = 0;
    let windowEndIndex = 1;

    while (windowEndIndex < arrayToSearch.length) {
        const windowSum = getWindowElementsSum(arrayToSearch, windowStartIndex, windowEndIndex);

        if (windowSum === sum) {
            subarrays.push(arrayToSearch.slice(windowStartIndex, windowEndIndex + 1));
            windowStartIndex++;
            windowEndIndex++;
        }

        if (windowSum < sum) {
            windowEndIndex++;
        }

        if (windowSum > sum) {
            windowStartIndex++;
        }
    }

    return subarrays;
};

const getWindowElementsSum = (arrayToSearch, windowStartIndex, windowEndIndex) => {
    let windowSum = 0;

    for (let i = windowStartIndex; i <= windowEndIndex; i++) {
        windowSum += arrayToSearch[i];
    }

    return windowSum;
};

// tests
assert.deepStrictEqual(
    subarraysWithSumEqualTo([1, 2, 3, 4, 5, 6, 7, 8, 9], 9),
    [[2, 3, 4], [4, 5], [9]]
);
