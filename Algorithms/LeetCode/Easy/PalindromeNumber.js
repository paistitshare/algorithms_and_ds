// Given an integer x, return true if x is palindrome integer.

// An integer is a palindrome when it reads the same backward as forward.
// For example, 121 is palindrome while 123 is not.
import assert from 'assert';

// T: (O(log10(n))) S: O(1)
const isPalindromeNumber = (n) => {
    if (n === 0 || n % 10 === 0) {
        return false;
    }

    let divisibleNumber = n;
    let reversedNumber = null;

    while (Math.abs(divisibleNumber) > Math.abs(reversedNumber)) {
        const floatPart = divisibleNumber % 10;

        divisibleNumber = Math.trunc(divisibleNumber / 10);
        reversedNumber = reversedNumber * 10 + floatPart;
    }

    return reversedNumber === divisibleNumber || divisibleNumber === Math.trunc(reversedNumber / 10);
};

assert.strictEqual(isPalindromeNumber(-1331), true);
assert.strictEqual(isPalindromeNumber(52325), true);
assert.strictEqual(isPalindromeNumber(1), true);
assert.strictEqual(isPalindromeNumber(4545), false);
