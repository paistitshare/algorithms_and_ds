import assert from 'assert';
import LinkedList from '../../Data_Structures/LinkedList/LinkedList.js';

//     1111111
//    1111 111
//   11 11 11 1
//  1 1 1 1 1 1 1
const mergeSort = (() => {
    // merge sort with sublists
    // T: (n*log(n)) O: (n*log(n))
    const mergeSort = (
        linkedList,
        leftmostIndex = 0,
        rightmostIndex = linkedList.getSize() - 1
    ) => {
        if (leftmostIndex === rightmostIndex) {
            return linkedList;
        }

        if (leftmostIndex < rightmostIndex) {
            const middleIndex = leftmostIndex + Math.floor((rightmostIndex - leftmostIndex) / 2);
            const [leftPart, rightPart] = splitInHalf(linkedList, leftmostIndex, middleIndex, rightmostIndex);

            const sortedLeftPart = mergeSort(leftPart, leftmostIndex, middleIndex);
            const sortedRightPart = mergeSort(rightPart, middleIndex + 1, rightmostIndex);

            return mergeTwoParts(sortedLeftPart, sortedRightPart);
        }
    };

    const splitInHalf = (linkedList, startIndex, middleIndex, endIndex) => {
        const leftPart = new LinkedList();
        const rightPart = new LinkedList();
        let currentNode = linkedList.head;
        let currentNodeIndex = startIndex;

        while (currentNodeIndex <= middleIndex && currentNode !== null) {
            leftPart.addLast(currentNode.getValue());
            currentNode = currentNode.getNext();
            currentNodeIndex++;
        }

        while (currentNodeIndex <= endIndex && currentNode !== null) {
            rightPart.addLast(currentNode.getValue());
            currentNode = currentNode.getNext();
            currentNodeIndex++;
        }

        return [leftPart, rightPart];
    }

    const mergeTwoParts = (leftPart, rightPart) => {
        const mergedLinkedList = new LinkedList();
        let currentLeftNode = leftPart.head;
        let currentRightNode = rightPart.head;

        while (currentLeftNode !== null && currentRightNode !== null) {
            if (currentLeftNode.getValue() <= currentRightNode.getValue()) {
                mergedLinkedList.addLast(currentLeftNode.getValue());
                currentLeftNode = currentLeftNode.getNext();
            } else {
                mergedLinkedList.addLast(currentRightNode.getValue());
                currentRightNode = currentRightNode.getNext();
            }
        }

        // copy leftover nodes
        while (currentLeftNode !== null) {
            mergedLinkedList.addLast(currentLeftNode.getValue());
            currentLeftNode = currentLeftNode.getNext();
        }

        while (currentRightNode !== null) {
            mergedLinkedList.addLast(currentRightNode.getValue());
            currentRightNode = currentRightNode.getNext();
        }

        return mergedLinkedList;
    };

    const sampleArray = [5, 3, 1, 7, 15, 2, 9];
    const sampleLinkedList = new LinkedList(sampleArray);
    const sortedLinkedList = mergeSort(sampleLinkedList);

    // tests
    assert.deepStrictEqual(sortedLinkedList.toArray(), sampleArray.sort((a, b) => a - b));

    return mergeSort;
})();

export default mergeSort;
