// Given an array A[] consisting 0s, 1s and 2s. The task is to write a function that sorts the given array.
// The functions should put all 0s first, then all 1s and all 2s in last.
// Input: arr = {0, 1, 2, 0, 1, 2}
// Output: {0, 0, 1, 1, 2, 2}

// the first idea is as follows:
//   1. we set up 3 pointers: start, mid, end
//   2. 1) if we notice, that at startIndex or endIndex there's a 1, then we swap it with the middle element
//      2) if we notice, that at endIndex there's 0, then we swap it with the startIndex element
//      3) the opposite is relevant if at startIndex there's 2
//      we increase our middleIndex only if there was a swap

// next idea:
//  1. we set up 3 pointers: start, end, candidate
//  2. with our candidate pointer we iterate and seek for a candidate element to be swapped with:
//     1) if candidateElement === 0 then swap(a[candidate], a[start]) and increase both pointers
//     2) if candidateElement === 2 then swap(a[candidate], a[end]) and decrease only end pointer
//     3) else just increase candidate pointer
//  3. after each swap we'll increase and decrease the respective pointers
import assert from 'assert';
import inPlaceElementsSwap from '../Sorting/InPlaceElementSwap.js';

// +v              ^
// [1, 0, 2, 2, 0, 1]
//  v  +           ^
// [1, 0, 1, 2, 0, 1] swap (a[0], a[1])
//     v  +        ^
// [0, 1, 1, 2, 0, 1]
(() => {
    const sortNumbers = (arrayToSort) => {
        // in case we have more diverse array (we seek for the first
        // middle level type element)
        let startIndex = 0;
        let endIndex = arrayToSort.length - 1;
        let candidateIndex = 0;

        while (candidateIndex <= endIndex) {
            if (arrayToSort[candidateIndex] === 0) {
                inPlaceElementsSwap(startIndex++, candidateIndex++, arrayToSort);
            } else if (arrayToSort[candidateIndex] === 2) {
                inPlaceElementsSwap(endIndex--, candidateIndex, arrayToSort);
            } else {
                candidateIndex++;
            }
        }
    };

    // tests
    const sampleArray1 = [0, 1, 2, 0, 1, 2];

    sortNumbers(sampleArray1);
    assert.deepStrictEqual(sampleArray1, [0, 0, 1, 1, 2, 2]);

    const sampleArray2 = [0, 1, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1];

    sortNumbers(sampleArray2);
    assert.deepStrictEqual(sampleArray2, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2]);
})();

(() => {
    // T: O(n) S: O(1) kinda simplest, but very static
    const sortNumbers = (arrayToSort) => {
        let i = 0;
        let zerosCount = 0;
        let onesCount = 0;
        let twosCount = 0;

        while (i < arrayToSort.length) {
            switch (arrayToSort[i]) {
                case 0:
                    zerosCount++;
                    break;
                case 1:
                    onesCount++;
                    break;
                case 2:
                    twosCount++;
                    break;
            }

            i++;
        }

        i = 0;

        while (zerosCount !== 0) {
            arrayToSort[i] = 0;
            zerosCount--;
            i++;
        }

        while (onesCount !== 0) {
            arrayToSort[i] = 1;
            onesCount--;
            i++;
        }

        while (twosCount !== 0) {
            arrayToSort[i] = 2;
            twosCount--;
            i++;
        }
    };
});

// Back To Back SWE approach in 2 passes:
//   forward pass:
//     starting at index 0 we compare each element to the
//     pivot and swap if current element, is lower than the pivot
//  +  v
// [0, 1, 2, 0, 1, 2]
//    +v
// [0, 1, 2, 0, 1, 2]
//     v  +
// [0, 1, 2, 0, 1, 2]
//     v     +
// [0, 1, 2, 0, 1, 2] swap(a[0], a[3])
//           v  +
// [0, 0, 2, 1, 1, 2]
//   backward pass:
//     starting at last index we compare each element to the
//     pivot and swap if current element, is higher than the pivot
const sortNumbers = (arrayToSort, pivotElement) => {
    // in case we have more diverse array (we seek for the first
    // middle level type element)
    let pivotIndex = getClosestPivotIndex(arrayToSort, pivotElement, 1);
    let i = 0;

    // forward pass
    while (i < arrayToSort.length) {
        if (arrayToSort[i] < arrayToSort[pivotIndex]) {
            inPlaceElementsSwap(pivotIndex, i, arrayToSort);
            pivotIndex = i;
        }

        i++;
    }

    pivotIndex = getClosestPivotIndex(arrayToSort, pivotElement, -1);
    i = arrayToSort.length - 1;

    // backward pass
    while (i >= 0) {
        if (arrayToSort[i] > arrayToSort[pivotIndex]) {
            inPlaceElementsSwap(pivotIndex, i, arrayToSort);
            pivotIndex = i;
        }

        i--;
    }
};

const getClosestPivotIndex = (arrayToSort, pivotElement, direction) => {
    let startIndex = direction > 0 ? 0 : arrayToSort.length - 1;
    const endIndex = direction > 0 ? arrayToSort.length : 0;

    while (startIndex !== endIndex) {
        if (arrayToSort[startIndex] === pivotElement) {
            return startIndex;
        }

        direction > 0 ? startIndex++ : startIndex--;
    }
};
