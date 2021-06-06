const fisherYatesShuffle = (arrayToShuffle) => {
    // Math.random() is considered NOT cryptographically secure pseudo-random number
    // generator. So maybe you'd better off using window.crypto.getRandomValues() in the
    // browsers or crypto.randomBytes() in Node.js.
    for (let i = arrayToShuffle.length - 1; i >= 0; i--) {
        const randomIndex = Math.round(Math.random() * (i + 1));

        swap(i, randomIndex, arrayToShuffle);
    }
};

const swap = (firstIndex, secondIndex, arrayToShuffle) => {
    const temp = arrayToShuffle[firstIndex];

    arrayToShuffle[firstIndex] = arrayToShuffle[secondIndex];
    arrayToShuffle[secondIndex] = temp;
};

export default fisherYatesShuffle;
