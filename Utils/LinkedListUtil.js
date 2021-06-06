// Floyd’s Cycle finding algorithm
const hasCycle = (linkedList) => {
    if (linkedList.getSize() < 2) {
        return false;
    }

    let slowPointerToNode = linkedList.head;
    let fastPointerToNode = linkedList.head.getNext().getNext();

    while (slowPointerToNode !== null && fastPointerToNode !== null &&
        fastPointerToNode.getNext() !== null) {
        if (slowPointerToNode === fastPointerToNode) {
            return true;
        }

        slowPointerToNode = slowPointerToNode.getNext();
        fastPointerToNode = fastPointerToNode.getNext().getNext();
    }

    return false;
};

// builds a relation from one node to another
const buildRelation = (linkedList, fromIndex, toIndex) => {
    let currentNode = linkedList.head;
    let currentNodeIndex = 0;
    let fromNode = null;
    let toNode = null;

    while (currentNode !== null) {
        if (fromIndex === currentNodeIndex) {
            fromNode = currentNode;
        }

        if (toIndex === currentNodeIndex) {
            toNode = currentNode;
        }

        currentNode = currentNode.getNext();
        ++currentNodeIndex;
    }

    if (![fromNode, toNode].includes(null)) {
        fromNode.setNext(toNode);
    }
};

export {
    hasCycle,
    buildRelation
};
