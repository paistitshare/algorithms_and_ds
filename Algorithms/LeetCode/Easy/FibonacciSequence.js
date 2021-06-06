import assert from 'assert';

const fibonacciLessThanThree = (n) => {
    if (n === 1) {
        return [0];
    } else if (n === 2) {
        return [0, 1];
    }

    return null;
}

// iterative
(() => {
    const fibonacciSequence = (n) => {
        if (n < 3) {
            return fibonacciLessThanThree(n);
        }

        const sequence = [0, 1];

        for (let i = 2; i < n; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }

        return sequence;
    }
});

// recursive
(() => {
    const fibonacciSequence = (n, sequence = [0, 1], index = 2) => {
        if (n < 3) {
            return fibonacciLessThanThree(n);
        }

        if (index >= n) {
            return sequence;
        }

        sequence.push(sequence[index - 1] + sequence[index - 2]);

        return fibonacciSequence(n, sequence, index + 1);
    }

    // tests
    assert.deepStrictEqual(fibonacciSequence(1), [0]);
    assert.deepStrictEqual(fibonacciSequence(5), [0, 1, 1, 2, 3]);
})();
