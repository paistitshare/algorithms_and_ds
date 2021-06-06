// Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output: 6
import assert from 'assert';

(() => {
    // Using DP
    const maxContiguousSubarraySum = (array) => {
        let currentSum = array[0];
        const maxSumForElementArray = [array[0]];

        for (let i = 1; i < array.length; i++) {
            // at each iteration we compare sum of new subarray of items before
            // the current one + it's value with the value of the current
            // item, like: max(sumOfItemsBefore + current, current)
            currentSum += array[i];

            if (array[i] <= currentSum) {
                maxSumForElementArray.push(currentSum);
            } else {
                currentSum = array[i];
                maxSumForElementArray.push(array[i]);
            }
        }

        return Math.max(...maxSumForElementArray);
    };
});

// Kadane's algorithm
(() => {
    const maxContiguousSubarraySum = (array) => {
        let currentMaxSum = 0;
        let maxSumOverall = Number.MIN_SAFE_INTEGER - 1;

        for (let i = 0; i < array.length; i++) {
            currentMaxSum = Math.max(array[i], currentMaxSum + array[i]);
            maxSumOverall = Math.max(maxSumOverall, currentMaxSum);
        }

        return maxSumOverall;
    };

    // tests
    assert.strictEqual(maxContiguousSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
    assert.strictEqual(maxContiguousSubarraySum([-2, -3, -4, -5]), -2);
})();
