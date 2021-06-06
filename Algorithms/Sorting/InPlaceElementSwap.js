const inPlaceElementSwap = (firstIndex, secondIndex, arrayOfElements) => {
    const temp = arrayOfElements[firstIndex];

    arrayOfElements[firstIndex] = arrayOfElements[secondIndex];
    arrayOfElements[secondIndex] = temp;
};

export default inPlaceElementSwap;
