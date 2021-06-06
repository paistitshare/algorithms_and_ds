// Group words by common letters

// Sample Input ["eat", "tea", "tan", "ate", "nat", "bat"]
// Sample Output [ ["ate", "eat", "tea"], ["nat", "tan"], ["bat"] ]

import assert from 'assert';

// T: O(n) S: O(n)
const groupWordsByCommonLetters = (words) => {
    const wordGroupsDict = words.reduce((wordGroups, word) => {
        const sortedWord = [...word]
            .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
            .join('');
        const wordGroup = wordGroups.get(sortedWord);

        if (wordGroup) {
            wordGroup.push(word);
        } else {
            wordGroups.set(sortedWord, [word]);
        }

        return wordGroups;
    }, new Map());

    return [...wordGroupsDict.values()];
};

const sampleWords = ["eat", "tea", "tan", "ate", "nat", "bat"];

assert.strictEqual(groupWordsByCommonLetters(sampleWords).length, 3);
