// The cost of a stock on each day is given in an array, find the max profit that you can make by buying and selling
// in those days. For example, if the given array is {100, 180, 260, 310, 40, 535, 695}, the maximum profit can earned
// by buying on day 0, selling on day 3. Again buy on day 4 and sell on day 6. If the given array of prices is sorted
// in decreasing order, then profit cannot be earned at all.
// Note: we can make multiple sales

import assert from 'assert';

// here's an implementation for a single sale
// T: O(n) O(1)
const maxProfitForSingleSale = (stockPrices) => {
    let maxDifference = null;

    if (stockPrices.length < 2) {
        return maxDifference;
    }

    let minElement = stockPrices[0];

    for (let i = 1; i < stockPrices.length; i++) {
        if (stockPrices[i] < minElement) {
            minElement = stockPrices[i];
        }

        const currentDifference = stockPrices[i] - minElement;

        if (currentDifference > maxDifference) {
            maxDifference = currentDifference;
        }
    }

    return maxDifference;
};

const sampleStockPrices = [100, 180, 260, 310, 40, 535, 695];

// tests
assert.strictEqual(maxProfitForSingleSale(sampleStockPrices), 655);
assert.notStrictEqual(maxProfitForSingleSale(sampleStockPrices), 595);
assert.strictEqual(maxProfitForSingleSale([200, 100]), null);
assert.strictEqual(maxProfitForSingleSale([100]), null);

// multiple sales
// finding local minimum and local maximum
// T: O(n) S: O(1)
const maxProfit = (stockPrices) => {
    let i = 0;
    const maxProfitDaysIndexes = [];

    while (i < stockPrices.length - 1) {
        // find local minimum
        while (stockPrices[i + 1] < stockPrices[i]) {
            i++;
        }

        const buyIndex = i;
        i++;

        if (buyIndex === stockPrices.length - 1) {
            break;
        }

        // find local maximum
        while (stockPrices[i + 1] > stockPrices[i]) {
            if (i === stockPrices.length - 1) {
                break;
            }

            i++;
        }

        if (stockPrices[i] - stockPrices[buyIndex] > 0) {
            maxProfitDaysIndexes.push([buyIndex, i]);
        }

        i++;
    }

    return maxProfitDaysIndexes;
};

// tests
assert.deepStrictEqual(maxProfit(sampleStockPrices), [[0, 3], [4, 6]]);
assert.notStrictEqual(maxProfit(sampleStockPrices), [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6]]);
assert.deepStrictEqual(maxProfit([150, 10]), []);
assert.deepStrictEqual(maxProfit([10]), []);
