import assert from 'assert';

(() => {
    const isPalindrome = (string) => {
        const halfOfStringLength = string.length / 2;

        // from fringes to center
        for (let i = 0, j = string.length - 1;  i <= Math.ceil(halfOfStringLength), j >= Math.floor(halfOfStringLength); i++, j--) {
            if (string[i] !== string[j]) {
                return false;
            }
        }

        return true;
    }

    // tests
    assert.strictEqual(isPalindrome('1nt1'), false);
    assert.strictEqual(isPalindrome('wxwxw'), true);
    assert.strictEqual(isPalindrome('t'), true);
})();

(() => {
    const isPalindrome = (string) => {
        const rightCenterItemIndex = Math.round(string.length / 2);

        // from center to fridges
        for (let i = 0, j = string.length - 1;  i != rightCenterItemIndex, j != rightCenterItemIndex; i++, j--) {
            if (string[i] !== string[j]) {
                return false;
            }
        }

        return true;
    }
});
