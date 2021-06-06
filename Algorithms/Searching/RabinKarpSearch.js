// You're given a string of a non-unique characters. Find all occurences count
// for a certain pattern in a string
// input: string = 'AABBCCDDEEAADDCCEE', pattern = 'CC'
// output: 2

// Rabin-Karp Algorithn:
//   1. apply a hash() function on a pattern string and set initial
//      window pointers at the beginning of a string we search in
//   2. if hash(pattern) === hash(substring) then try to compare the
//      exact characters, if not equal, then move the substring window
//      further
//   3. iterate until you're gonna reach the end of an original string

import assert from 'assert';

const hash = (string) => {
    return [...string].reduce((hash, character) => {
        return hash + character.charAt(0) % 256;
    }, 0);
};

const rabinKarpSearchOccurrences = (stringToSearch, pattern) => {
    const patternLength = pattern.length;
    const patternHash = hash(pattern);
    let occurrencesCount = 0;

    for (let i = 0; i < stringToSearch.length - patternLength; i++) {
        const currentSubstring = stringToSearch.substring(i, patternLength);

        if (hash(currentSubstring) === patternHash &&
            currentSubstring === pattern) {
                occurrencesCount++;
        }
    }

    return occurrencesCount;
};

// tests
assert.strictEqual(rabinKarpSearchOccurrences('AABBCCDDEEAADDCCEE', 'CC'), 2);
