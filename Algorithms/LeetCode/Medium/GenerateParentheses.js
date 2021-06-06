import assert from 'assert';

const OPEN_PAREN = '(';
const CLOSE_PAREN = ')';

// Recursive brute force
(() => {
    const generateParentheses = (maxParensCount = 0, currentCombination = '', combinationsList = [], openParensCount = 0, closeParensCount = 0) => {
        if (openParensCount > maxParensCount || closeParensCount > maxParensCount) {
            return combinationsList;
        }

        generateParentheses(maxParensCount, currentCombination + OPEN_PAREN, combinationsList, openParensCount + 1, closeParensCount);
        generateParentheses(maxParensCount, currentCombination + CLOSE_PAREN, combinationsList, openParensCount, closeParensCount + 1);

        if (isValidCombination(currentCombination, maxParensCount)) {
            combinationsList.push(currentCombination);
        }

        return combinationsList;
    };

    const isValidCombination = (parentheses, maxParensCount) => {
        return maxParensCount > 0 && parentheses.length === maxParensCount * 2 &&
            hasBalancedParentheses(parentheses);
    };

    const hasBalancedParentheses = (parentheses) => {
        let balanceCount = 0;

        for (let i = 0; i < parentheses.length; i++) {
            if (parentheses[i] === OPEN_PAREN) {
                balanceCount++;
            }

            if (parentheses[i] === CLOSE_PAREN) {
                balanceCount--;
            }

            if (balanceCount < 0) {
                return false;
            }
        }

        return balanceCount === 0;
    };

    assert.strictEqual(generateParentheses(0).length, 0);
    assert.strictEqual(generateParentheses(1).length, 1);
    assert.strictEqual(generateParentheses(3).length, 5);
})();

// Backtracking, avoiding combination validity checks
(() => {
    const generateParentheses = (maxParensCount = 0) => {
        const combinationsList = [];

        generateCombinations(maxParensCount, '', combinationsList, maxParensCount, maxParensCount);

        return combinationsList;
    };

    const generateCombinations = (maxParensCount, currentCombination, combinationsList, openParensCount, closeParensCount) => {
        if (openParensCount > 0) {
            generateCombinations(maxParensCount, currentCombination + OPEN_PAREN, combinationsList, openParensCount - 1, closeParensCount);
        }

        if (closeParensCount > openParensCount) {
            generateCombinations(maxParensCount, currentCombination + CLOSE_PAREN, combinationsList, openParensCount, closeParensCount - 1);
        }

        if (closeParensCount === 0 && openParensCount === 0 && currentCombination.length > 0) {
            combinationsList.push(currentCombination);
        }

        return combinationsList;
    };

    assert.strictEqual(generateParentheses(0).length, 0);
    assert.strictEqual(generateParentheses(1).length, 1);
    assert.strictEqual(generateParentheses(3).length, 5);
});
