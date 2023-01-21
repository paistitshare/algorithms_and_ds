// Write a function, which takes two strings as separate parameters and returns boolean value.
// Function would return true, if both strings have same amount of exact same unique letters
// (non-whitespace lowercase UTF-8 characters).
// Examples:
//   haveSameLetters('&ya^nk', ' ka)y/n'); // returns true
//   haveSameLetters('more', 'roam'); // returns false
const assert = require('assert');

const runTests = (functionToTest) => (testCases) => {
  testCases.forEach(({ inputArgs, expectedOutput }) => {
    assert(functionToTest(...inputArgs) === expectedOutput, `testFunction(${inputArgs}) !== ${expectedOutput}`);
  });
};

// Solution #1:
//   1) Turn each string into array of characters
//   2) Purge all of the non-regular latin letters from the strings
//   3) Sort both arrays lexicographically
//   4) Compare sorted arrays index by index
const createUniqueLatinCharacterSortedArray = (stringOfCharacters) => {
  return [...stringOfCharacters]
    .filter(isCharacterInLatinLettersRange)
    .sort();
};

const isCharacterInLatinLettersRange = (character) => {
  const LOWER_LATIN_RANGE_BOUNDARY = 'a';
  const UPPER_LATIN_RANGE_BOUNDARY = 'z';

  return character >= LOWER_LATIN_RANGE_BOUNDARY && character <= UPPER_LATIN_RANGE_BOUNDARY;
};

// Time complexity: o(2n*log(n)+ 5n); O(n*log(n) + n)
// Space complexity: o(2n); O(n)
const haveSameLetters1 = (firstString, secondString) => {
  const [firstUniqueLetterArray, secondUniqueLetterArray] =
    [createUniqueLatinCharacterSortedArray(firstString), createUniqueLatinCharacterSortedArray(secondString)];
  const arraysAreSameLength = firstUniqueLetterArray.length === secondUniqueLetterArray.length;
  const anyOfArraysIsEmpty = firstUniqueLetterArray.length === 0 || secondUniqueLetterArray.length === 0;

  if (!arraysAreSameLength || anyOfArraysIsEmpty) {
    return false;
  }

  return firstUniqueLetterArray.every((firstUniqueArrayLetter, letterIndex) =>
    firstUniqueArrayLetter === secondUniqueLetterArray[letterIndex])
};

const testCases = [
  { inputArgs: ['mint', 'nimt'], expectedOutput: true },
  { inputArgs: ['$phone-', '1henop '], expectedOutput: true },
  { inputArgs: ['this', 'that'], expectedOutput: false },
  { inputArgs: ['this', 'thist'], expectedOutput: false },
  { inputArgs: [' ', '/'], expectedOutput: false },
  { inputArgs: ['', ''], expectedOutput: false },
];

runTests(haveSameLetters1)(testCases);

// Solution #2 (Using vocabulary):
//   1) Populate vocabulary with characters from the first string.
//      Each character should represent lowercase latin letter range
//   2) If there are no characters left in vocab, then return false.
//      Otherwise iterate through second string's characters and count
//      all of the characters that already are in vocabulary
//   3) Compare matches counter with vocabulary size
const createUniqueLatinCharacterSet = (stringOfCharacters) => {
  const firstUniqueCharactersSet = new Set();

  for (let i = 0; i < stringOfCharacters.length; i++) {
    const currentCharacter = stringOfCharacters.charAt(i);

    if (isCharacterInLatinLettersRange(currentCharacter)) {
      firstUniqueCharactersSet.add(currentCharacter);
    }
  }

  return firstUniqueCharactersSet;
};

const getMatchingCharacterCount = (firstUniqueCharacterSet, secondString) => {
  let correctCharacterMatchesCount = 0;

  for (let i = 0; i < secondString.length; i++) {
    const currentCharacter = secondString.charAt(i);

    if (firstUniqueCharacterSet.has(currentCharacter)) {
      ++correctCharacterMatchesCount;
    }
  }

  return correctCharacterMatchesCount;
};

// Time complexity: o(2n); O(n)
// Space complexity: o(n); O(n)
const haveSameLetters2 = (firstString, secondString) => {
  const firstUniqueCharacterSet = createUniqueLatinCharacterSet(firstString);

  if (firstUniqueCharacterSet.size === 0) {
    return false;
  }

  return getMatchingCharacterCount(firstUniqueCharacterSet, secondString) === firstUniqueCharacterSet.size;
};

runTests(haveSameLetters2)(testCases);
