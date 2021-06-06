// Longest non-contiguous common subsequence of 2 strings, for example:
// input: str1 = 'abcdgh', str2 = 'aedfhr'
// output: 3 cause the longest common subsequence is: 'adh'

import assert from 'assert';

(() => {
    // A naive recursive top-down with memoization approach. On each
    // recursive iteration we'll:
    //   1. Return 1 + lcs(x, y, i - 1, j - 1), if both have one equal character
    //   2. Return 0, if both strings are empty
    //   3. return max(lcs(x, y, i - 1, j), lcs(x, y, i, j - 1))
    const lcsTopDown = (first, second) => {
        const memo = new Map();
        return lcs(first, second, first.length - 1, second.length - 1, memo);
    };

    const lcs = (first, second, firstLength, secondLength, memo) => {
        if (firstLength < 0 || secondLength < 0) {
            return 0;
        }

        const memoKey = firstLength + ',' + secondLength;

        if (memo.has(memoKey)) {
            return memo.get(memoKey);
        }

        let result;

        if (first[firstLength] === second[secondLength]) {
            result = 1 + lcs(first, second, firstLength - 1, secondLength - 1, memo);
        } else {
            result = Math.max(
                lcs(first, second, firstLength - 1, secondLength, memo),
                lcs(first, second, firstLength, secondLength - 1, memo)
            );
        }

        memo.set(memoKey, result);

        return result;
    };

    // tests
    const str1 = 'ab1d23c';
    const str2 = 'arbdhc';

    assert.strictEqual(lcsTopDown(str1, str2, str1.length, str2.length), 4);
});

(() => {
    // iterative bottom-up approach breakdown:
    //   1. create a dp table of size (n + 1) * (m + 1) and
    //      fill 1st column and row with 0
    //   2. process dp table with formula:
    //        if (ch1 === ch2) then add 1 to diagonal element
    //          (top left element in a matrix)
    //        else max(matrix[i - 1][j], matrix[i][j - 1])
    //   3. last cell's element in our matrix will be an answer
    const longestCommonSubsequenceLength = (firstString, secondString) => {
        if (firstString.length === 0 || secondString.length === 0) {
            return 0;
        }

        // table of size (n + 1) * (m + 1) with first column and
        // first row reserved for an empty string comparisions
        // and filled with 0 within table setup
        const matrix = Array.from(Array(firstString.length + 1) , (_value, index) => {
            if (index === 0) {
                return Array(secondString.length + 1).fill(0);
            }

            return Array(secondString.length + 1).fill(0, 0, 1);
        });

        for (let i = 1; i <= firstString.length; i++) {
            for (let j = 1; j <= secondString.length; j++) {
                if (firstString[i] === secondString[j]) {
                    matrix[i][j] = 1 + matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
                }
            }
        }

        return matrix[firstString.length][secondString.length];
    };

    const str1 = 'abcdgh';
    const str2 = 'aedfhr';

    // tests
    assert.strictEqual(longestCommonSubsequenceLength(str1, str2), 3);
    assert.strictEqual(longestCommonSubsequenceLength(str1, str2.substring(0, str2.length - 1)), 3);
    assert.strictEqual(longestCommonSubsequenceLength(str1.substring(0, str1.length - 1), str2.substring(0, str2.length - 1)), 2);
    assert.strictEqual(longestCommonSubsequenceLength('123', '345'), 1);
    assert.strictEqual(longestCommonSubsequenceLength('', 'test'), 0);
});
