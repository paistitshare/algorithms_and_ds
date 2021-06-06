import shuffle from '../RNG/FisherYatesShuffle.js';

const pearsonTable = shuffle(Array.from(Array(50), (_el, index) => index));

const pearsonHash = (stringToHash) => {
    return [...stringToHash].reduce((hash, char) => {
        return hash + (pearsonTable[char.charCodeAt(0)] ^ char);
    }, 0);
};

export { pearsonHash };
