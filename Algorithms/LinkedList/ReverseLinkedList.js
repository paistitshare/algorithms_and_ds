import assert from 'assert';
import LinkedList from '../../Data_Structures/LinkedList/LinkedList.js';

// The idea here is to do something like this
//    p     c    n
//   null   1 -> 2 -> 3 -> 4 -> null
//
//         p    c   n
// null <- 1 <- 2    3  -> 4 -> null

(() => {
    // iterative, in-place element swap without extra space
    // T: O(n) S: O(1)
    const reverseLinkedList = (linkedList) => {
        if (linkedList.getSize() < 2) {
            return;
        }

        let previousNode = null;
        let currentNode = linkedList.head;
        let nextNode = null;

        while (currentNode !== null) {
            nextNode = currentNode.getNext();

            currentNode.setNext(previousNode);

            previousNode = currentNode;
            currentNode = nextNode;
        }

        linkedList.head = previousNode;
    };
});

(() => {
    // recursive in-place
    const reverseLinkedList = (linkedList, previousNode = null, currentNode = linkedList.head, nextNode = null) => {
        if (linkedList.getSize() < 2) {
            return;
        }

        if (currentNode === null) {
            linkedList.head = previousNode;
            return;
        }

        nextNode = currentNode.getNext();

        currentNode.setNext(previousNode);

        previousNode = currentNode;
        currentNode = nextNode;

        reverseLinkedList(linkedList, previousNode, currentNode, nextNode);
    };

    const sampleArray = [5, 4, 3, 2, 1];
    const sampleLinkedList = new LinkedList(sampleArray);
    const sampleLinkedListCopy = Object.assign(LinkedList.prototype, sampleLinkedList);

    reverseLinkedList(sampleLinkedListCopy);

    // tests
    assert.deepStrictEqual(sampleLinkedListCopy.toArray(), sampleArray.sort((a, b) => a - b));
})();
