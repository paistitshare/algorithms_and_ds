import assert from 'assert';
import Stack from '../../Data_Structures/Stack/Stack.js';

// Using Stack
// T: O(n) S: O(n)
const hasBalancedCharacters = (stringToCheck) => {
    if (typeof stringToCheck !== 'string' || stringToCheck.length < 1) {
        return false;
    }

    const temporaryStack = new Stack();
    const openExpressionCharacters = ['[', '{', '('];
    const closeExpressionCharacters = [']', '}', ')'];

    for (let i = 0; i < stringToCheck.length; i++) {
        if (openExpressionCharacters.includes(stringToCheck[i])) {
            temporaryStack.push(stringToCheck[i]);
        }

        if (closeExpressionCharacters.includes(stringToCheck[i])) {
            if (temporaryStack.isEmpty()) {
                return false;
            }

            const lastOpenCharacter = temporaryStack.pop();
            const expressionCharacterIndex = closeExpressionCharacters.indexOf(stringToCheck[i]);

            if (lastOpenCharacter !== openExpressionCharacters[expressionCharacterIndex]) {
                return false;
            }
        }
    }

    return temporaryStack.isEmpty();
};

assert.strictEqual(hasBalancedCharacters(''), false);
assert.strictEqual(hasBalancedCharacters({}), false);
assert.strictEqual(hasBalancedCharacters('[()]{}{[()()]()}'), true); // balanced
assert.strictEqual(hasBalancedCharacters('[(])'), false); // unbalanced
