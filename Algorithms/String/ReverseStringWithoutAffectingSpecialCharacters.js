// Given a string, that contains special character together with alphabets
// (‘a’ to ‘z’ and ‘A’ to ‘Z’), reverse the string in a way that special
// characters are not affected.
// Input:   str = "a,b$c"
// Output:  str = "c,b$a"
import assert from 'assert';

const isAlpha = (inputString) => {
    return inputString.match(/[a-zA-Z]/g);
};

// T: O(n) S: O(n)
const reverse = (stringToReverse) => {
    let inputString = [...stringToReverse];
    let left = 0;
    let right = inputString.length - 1;

    while (left < right) {
        if (!isAlpha(inputString[left])) {
            ++left;
        } else if (!isAlpha(inputString[right])) {
            --right;
        } else {
            const temp = inputString[left];

            inputString[left] = inputString[right];
            inputString[right] = temp;
            ++left;
            --right;
        }
    }

    return inputString.join('');
};

// tests
assert.strictEqual(reverse(`a!!!b.c.d,e'f,`), `f!!!e.d.c,b'a,`);
assert.strictEqual(reverse(`$c,d#w^&x`), `$x,w#d^&c`);
