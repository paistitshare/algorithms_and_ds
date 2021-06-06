import assert from 'assert';
import { buildRelation, hasCycle } from '../../Utils/LinkedListUtil.js';
import LinkedList from '../../Data_Structures/LinkedList/LinkedList.js';

const detectAndRemoveCycle = (linkedList) => {
    const cycledNode = getCycledNode(linkedList);

    if (cycledNode !== null) {
        deleteCycle(linkedList, cycledNode);
    }
};

const getCycledNode = (linkedList) => {
    if (linkedList.getSize() < 2) {
        return false;
    }

    let slowPointerToNode = linkedList.head;
    let fastPointerToNode = linkedList.head.getNext().getNext();

    while (slowPointerToNode !== null && fastPointerToNode !== null &&
        fastPointerToNode.getNext() !== null) {
        if (slowPointerToNode === fastPointerToNode) {
            return slowPointerToNode;
        }

        slowPointerToNode = slowPointerToNode.getNext();
        fastPointerToNode = fastPointerToNode.getNext().getNext();
    }

    return null;
};

const deleteCycle = (linkedList, pointersMeetNode) => {
    // detecting cycle's length: after slow and fast pointer met, just keep running
    // our slow pointer until it reaches the same point again
    let cycleLength = 1;
    let slowPointerToNode = pointersMeetNode.getNext();

    while (slowPointerToNode !== pointersMeetNode) {
        slowPointerToNode = slowPointerToNode.getNext();
        ++cycleLength;
    }

    // run two pointers from the head cycle's length apart and with the same speed
    let firstPointer = linkedList.head;
    let secondPointer = linkedList.head;
    let previousToSecondPointer = null;
    let iterationsCount = 0;

    while (iterationsCount !== cycleLength) {
        previousToSecondPointer = secondPointer;
        secondPointer = secondPointer.getNext();
        ++iterationsCount;
    }

    while (firstPointer !== secondPointer) {
        previousToSecondPointer = secondPointer;
        firstPointer = firstPointer.getNext();
        secondPointer = secondPointer.getNext();
    }

    // remove the actual cycle
    previousToSecondPointer.setNext(null);
};

// tests
const sampleLinkedList = new LinkedList([1, 2, 3, 4, 5]);

assert.strictEqual(hasCycle(sampleLinkedList), false);
buildRelation(sampleLinkedList, 4, 2);
assert.strictEqual(hasCycle(sampleLinkedList), true);
detectAndRemoveCycle(sampleLinkedList);
assert.strictEqual(hasCycle(sampleLinkedList), false);
