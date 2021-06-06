// Given a signed 32-bit integer x, return x with its digits reversed.
// If reversing x causes the value to go outside the signed 32-bit integer
// range [-2^31, 2^31 - 1], then return 0.
import assert from 'assert';

// iterative
const getReversedInteger = (numberToReverse) => {
    const supportedType = 'number';

    if (typeof numberToReverse !== supportedType) {
        throw Error(`Wrong Type: Argument supplied should be of type ${supportedType}`);
    }

    if (!Number.isInteger(numberToReverse)) {
        throw Error('Supplied argument should be an integer');
    }

    if (!isNumberInAllowedRange(numberToReverse)) {
        return 0;
    }

    let numberAfterDivision = numberToReverse;
    let resultNumber = 0;
    const numberLength = Math.ceil(Math.log10(Math.abs(numberToReverse) + 1));
    let decimalMultiplier = Math.pow(10, numberLength - 1);

    while (numberAfterDivision !== 0) {
        const floatPart = numberAfterDivision % 10;

        numberAfterDivision = Math.trunc(numberAfterDivision / 10);
        resultNumber += floatPart * decimalMultiplier;
        decimalMultiplier /= 10;
    }

    return resultNumber;
};

const isNumberInAllowedRange = (inputNumber) => {
    return inputNumber >= Math.pow(-2, 31) && inputNumber <= Math.pow(2, 31) - 1;
};

// simplified version T: O(log10(n)) S: O(n)
const getReverseInteger = (numberToReverse) => {
    if (!isNumberInAllowedRange(numberToReverse)) {
        return 0;
    }

    let reversedNumber = 0;
    let divisibleNumber = null;

    while (divisibleNumber !== 0) {
        const floatPart = divisibleNumber % 10;

        divisibleNumber = Math.trunc(divisibleNumber / 10);
        reversedNumber = reversedNumber * 10 + floatPart;
    }

    return reversedNumber;
};

// recursive
const reverseInteger = (numberToReverse, divisibleNumber = numberToReverse, reversedNumber = null) => {
    if (divisibleNumber === 0) {
        return reversedNumber;
    }

    const floatPart = divisibleNumber % 10;

    divisibleNumber = Math.trunc(divisibleNumber / 10);
    reversedNumber = reversedNumber * 10 + floatPart;

    return reverseInteger(numberToReverse, divisibleNumber, reversedNumber);
};

// tests
assert.strictEqual(reverseInteger(-54327), -72345);
assert.strictEqual(reverseInteger(123), 321);
assert.strictEqual(reverseInteger(1), 1);
