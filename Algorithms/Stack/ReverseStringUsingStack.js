import assert from 'assert';
import Stack from '../../Data_Structures/Stack/Stack.js';

// T: O(n) S: O(n)
const reverseString = (inputString) => {
    if (inputString.length < 2) {
        return inputString;
    }

    let reversedString = '';
    const temporaryStack = new Stack();

    for (let i = 0; i < inputString.length; i++) {
        temporaryStack.push(inputString[i]);
    }

    const stackSize = temporaryStack.getSize();

    for (let i = 0; i < stackSize; i++) {
        reversedString += temporaryStack.pop();
    }

    return reversedString;
};

// tests
assert.strictEqual(reverseString('abcdef'), 'fedcba');
assert.strictEqual(reverseString('1'), '1');
