import assert from 'assert';

const fibonacciLessThanThree = (n) => {
    if (n == 2) {
        return 1;
    } else if (n == 1) {
        return 0;
    }

    return null;
};

// recursive, unoptimised
(() => {
    const fibonacciNumber = (n) => {
        if (n < 3) {
            return fibonacciLessThanThree(n);
        }

        return fibonacciNumber(n - 1) + fibonacciNumber(n - 2);
    };
});

//         f(5)
//        /   \
//       /     \
//      f(4)   f(3)
//     / \      /  \
// f(3)  f(2) f(2) f(1)
//  /  \
// f(2) f(1)

// iterative, storing last 2 numbers of the sequence
// T: O(n) S: O(1)
(() => {
    const fibonacciNumber = (n) => {
        let previousToLastNumber = 0;
        let lastNumber = 1;

        if (n < 3) {
            return fibonacciLessThanThree(n);
        }

        let nextFibonacciNumber = 1;

        for (let i = 3; i <= n; i++) {
            nextFibonacciNumber = previousToLastNumber + lastNumber;
            previousToLastNumber = lastNumber;
            lastNumber = nextFibonacciNumber;
        }

        return nextFibonacciNumber;
    }
});

// formula Fn = {[(√5 + 1)/2] ^ n} / √5
// T: O(1) S: O(1)
(() => {
    const fibonacciNumber = (n) => {
        const squareRootOfFive = Math.sqrt(5);
        const phi = (squareRootOfFive + 1) / 2;

        return Math.round(Math.pow(phi, n) / squareRootOfFive);
    };
});

// Dynamic Programming: Top-down approach
// T: O(n) S: O(n)
(() => {
    const fibonacciNumberPosition = 11;
    const memo = Array.from({ length: fibonacciNumberPosition + 1 }, (_, index) => {
        return index < 2 ? index : -1;
    });

    const fibonacciNumber = (n) => {
        if (memo[n] === -1) {
            memo[n] = fibonacciNumber(n - 1) + fibonacciNumber(n - 2);
        }

        return memo[n];
    };

    // tests
    assert.strictEqual(fibonacciNumber(fibonacciNumberPosition), 89);
    assert.strictEqual(fibonacciNumber(7), 13);
})();
