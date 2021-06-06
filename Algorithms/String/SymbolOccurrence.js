// Having a string like: 'AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB'
// will need to write an RLE function, that'll return a string: 'A4B3C2XYZD4E3F3A6B28'.
// The function will generate an error, if input string isn't correct.
// If a symbol has occurred only once, then we'll just leave it as it is,
// but if there's multiple occurencies in a row, the we'll print a number of
// occurrencies after that symbol
import assert from 'assert';

const RLE = (inputString) => {
    if (typeof inputString !== 'string') {
        throw Error('Wrong input parameter type');
    }

    let outputString = '';
    let characterOccurrenceCount = 1;

    for (let i = 0; i < inputString.length; i++) {
        if (inputString[i - 1] === inputString[i]) {
            ++characterOccurrenceCount;

            if (inputString[i + 1] !== inputString[i]) {
                outputString += characterOccurrenceCount;
                characterOccurrenceCount = 1;
            }

            continue;
        }

        outputString += inputString[i];
    }

    return outputString;
}

assert.strictEqual(RLE('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB'), 'A4B3C2XYZD4E3F3A6B28');
