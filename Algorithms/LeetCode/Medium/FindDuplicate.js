// Given an array of integers nums containing n + 1 integers where each
// integer is in the range [1, n] inclusive.
// There is only one repeated number in nums, return this repeated number.
import assert from 'assert';

(() => {
    // Calculate difference between elements sum and indexes sum
    const findDuplicate = (nums) => {
        const sumOfElements = nums.reduce((sum, num) => sum += num, 0);
        const sumOfIndicies = nums.reduce((sum, _num, index) => {
            return index === nums.length - 1 ? sum : sum += index + 1;
        }, 0);
        const sumDifference = sumOfElements - sumOfIndicies;

        return sumDifference > 0 ? sumDifference : null;
    };
});

(() => {
    // Applying negative values to elements with index
    // equal to the same value
    const findDuplicate = (nums) => {
        for (let i = 0; i < nums.length; i++) {
            if (nums[Math.abs(nums[i])] > 0) {
                nums[Math.abs(nums[i])] *= -1;
            } else {
                return Math.abs(nums[i]);
            }
        }

        return null;
    }

    // tests
    assert.deepStrictEqual(findDuplicate([1, 3, 4, 2, 2]), 2);
    assert.deepStrictEqual(findDuplicate([7, 2, 5, 1, 7]), 7);
})();

