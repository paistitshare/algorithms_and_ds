(() => {
    // using temporary array: T: O(n); S: O(n)
    const getReversedString = (inputString) => {
        const temporaryArray = inputString.split('');
        const middleOfArray = temporaryArray.length / 2;

        for (let i = 0, j = temporaryArray.length - 1; i <= Math.ceil(middleOfArray), j >= Math.floor(middleOfArray); i++, j--) {
            const leftPartCharacter = temporaryArray[i];

            temporaryArray[i] = temporaryArray[j];
            temporaryArray[j] = leftPartCharacter;
        }

        return temporaryArray.join('');
    }
})();

(() => {
    // iterative T: O(n); S: O(n)
    const getReversedString = (inputString) => {
        let outputString = '';

        for (let i = inputString.length - 1; i >= 0; i--) {
            outputString += inputString[i];
        }

        return outputString;
    }
})();

(() => {
    // recursive T: O(n); S: O(n^2)
    const getReversedString = (inputString) => {
        if (inputString === '') {
            return '';
        }

        return getReversedString(inputString.substr(1)) + inputString[0];
    }
})();
