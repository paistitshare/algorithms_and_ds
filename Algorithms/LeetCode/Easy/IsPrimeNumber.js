import assert from 'assert';

// iterative, Time: O(n), Space O(1)
const isPrimeNumber = (n) => {
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

(() => {
    // recursive, Time: O(n), Space O(n)
    const isPrimeNumber = (n, i = 2) => {
        if (n <= 1) {
            return false;
        }

        if (n % i === 0) {
            return false;
        }

        if (n - 1 === i) {
            return true;
        }

        return isPrimeNumber(n, ++i);
    }

    assert.strictEqual(isPrimeNumber(1), false);
    assert.strictEqual(isPrimeNumber(5), true);
    assert.strictEqual(isPrimeNumber(17), true);
    assert.strictEqual(isPrimeNumber(26), false);
})();
