// Breadth-First Search (Level Order Traversal)

import assert from 'assert';
import Dequeue from '../../../Data_Structures/Queue/Dequeue.js';
import sortedArrayToBST from './SortedArrayToBST.js';

const breadthFirstSearch = (rootNode, element) => {
    if (rootNode === null) {
        return null;
    }

    const discoveredNodes = new Dequeue();

    discoveredNodes.addFirst(rootNode);

    while (!discoveredNodes.isEmpty()) {
        const currentNode = discoveredNodes.peekLast().getValue();

        if (currentNode.getValue() === element) {
            return currentNode;
        }

        if (currentNode.getLeftNode() !== null) {
            discoveredNodes.addFirst(currentNode.getLeftNode());
        }

        if (currentNode.getRightNode() !== null) {
            discoveredNodes.addFirst(currentNode.getRightNode());
        }

        discoveredNodes.removeLast();
    }

    return null;
};

// tests
const sampleTree = sortedArrayToBST(7);

assert.strictEqual(breadthFirstSearch(sampleTree.getRootNode(), 6).getValue(), 6);
assert.strictEqual(breadthFirstSearch(sampleTree.getRootNode(), 8), null);
