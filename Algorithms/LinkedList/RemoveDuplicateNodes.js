import assert from 'assert';
import LinkedList from '../../Data_Structures/LinkedList/LinkedList.js';
import mergeSort from './MergeSortForLinkedList.js';

(() => {
    // merge sort + in-place deletion T: o(n*log(n) + n) S: O(n)
    const removeDuplicateNodes = (linkedList) => {
        const sortedLinkedList = mergeSort(linkedList);
        let currentNode = sortedLinkedList.head;

        while (currentNode !== null) {
            const nextNode = currentNode.getNext();

            if (nextNode !== null && nextNode.getValue() === currentNode.getValue()) {
                const nodeAfterNext = nextNode.getNext();

                nextNode.setNext(null);
                currentNode.setNext(nodeAfterNext);
            }

            currentNode = currentNode.getNext();
        }

        return sortedLinkedList;
    }

    // tests
    const sampleLinkedList = new LinkedList([1, 10, 5, 3, 7, 3, 5, 2, 7]);

    assert.deepStrictEqual(removeDuplicateNodes(sampleLinkedList).toArray(), [1, 2, 3, 5, 7, 10]);
})();

(() => {
    LinkedList.prototype.populateOccurrences = function () {
        let currentNode = this.head;
        let currentNodeIndex = 0;

        this.elementOccurrenceMap = new Map();

        while (currentNode !== null) {
            const currentNodeValue = currentNode.getValue();
            const occurrenceIndexes = this.elementOccurrenceMap.get(currentNodeValue);

            if (occurrenceIndexes) {
                this.elementOccurrenceMap.set(currentNodeValue, occurrenceIndexes.concat(currentNodeIndex));
            } else {
                this.elementOccurrenceMap.set(currentNodeValue, [currentNodeIndex]);
            }

            currentNode = currentNode.getNext();
            ++currentNodeIndex;
        }
    }

    LinkedList.prototype.removeDuplicateNodesByOccurrenceIndexes = function () {
        let currentNode = this.head;
        let currentNodeIndex = 0;
        let previousNode = null;

        while (currentNode !== null) {
            const currentNodeValue = currentNode.getValue();
            const occurrenceIndexes = this.elementOccurrenceMap.get(currentNodeValue);

            if (occurrenceIndexes.length > 1 && occurrenceIndexes.indexOf(currentNodeIndex) > 0) {
                const nextNode = currentNode.getNext();

                currentNode.setNext(null);
                previousNode.setNext(nextNode);
                currentNode = nextNode;
                ++currentNodeIndex;
                continue;
            }

            previousNode = currentNode;
            currentNode = currentNode.getNext();
            ++currentNodeIndex;
        }
    }

    // using hashmap T: O(n) S: O(n)
    LinkedList.prototype.removeDuplicateNodes = function () {
        if (this.getSize() < 2) {
            return;
        }

        this.populateOccurrences();
        this.removeDuplicateNodesByOccurrenceIndexes();
    }

    const sampleLinkedList = new LinkedList();

    [1, 2, 1, 2, 3, 3, 4, 4, -1, 5, 5, -1].forEach((element) => sampleLinkedList.addLast(element));
    sampleLinkedList.removeDuplicateNodes();
});
