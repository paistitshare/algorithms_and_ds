// Depth-First Search (Tree Order Traversal)
import assert from 'assert';
import sortedArrayToBST from './SortedArrayToBST.js';
import Stack from '../../../Data_Structures/Stack/Stack.js';

(() => {
    // recursive
    const inOrderDepthFirstSearch = (treeNode, element) => {
        if (treeNode === null) {
            return null;
        }

        const leftBranchResult = inOrderDepthFirstSearch(treeNode.getLeftNode(), element);

        if (treeNode.getValue() === element) {
            return treeNode;
        }

        const rightBranchResult = inOrderDepthFirstSearch(treeNode.getRightNode(), element);

        return leftBranchResult || rightBranchResult || null;
    };

    // tests
    const rootNode = sortedArrayToBST(7);

    assert.strictEqual(inOrderDepthFirstSearch(rootNode, 6).getValue(), 6);
    assert.strictEqual(inOrderDepthFirstSearch(rootNode, 0).getValue(), 0);
    assert.strictEqual(inOrderDepthFirstSearch(rootNode, 7), null);
});

(() => {
    // iterative (using stack)
    const inOrderDepthFirstSearch = (rootNode, element) => {
        const discoveredNodes = new Stack();

        discoveredNodes.push(rootNode);

        let currentLeftNode = rootNode.getLeftNode();

        // left nodes
        while (currentLeftNode !== null) {
            discoveredNodes.push(currentLeftNode);

            currentLeftNode = currentLeftNode.getLeftNode();
        }

        // go through each previously discovered left node and for the right nodes
        while (!discoveredNodes.isEmpty()) {
            const lastAddedNode = discoveredNodes.pop();

            currentLeftNode = lastAddedNode.getLeftNode();

            // left nodes of a nodes, that're already on the stack
            while (currentLeftNode !== null) {
                discoveredNodes.push(currentLeftNode);

                currentLeftNode = currentLeftNode.getLeftNode();
            }

            if (lastAddedNode.getValue() === element) {
                return lastAddedNode;
            }

            let currentRightNode = lastAddedNode.getRightNode();

            // right nodes for each added onto the stack node
            while (currentRightNode !== null) {
                discoveredNodes.push(currentRightNode);

                currentRightNode = currentRightNode.getRightNode();
            }
        }

        return null;
    };

    // tests
    const rootNode = sortedArrayToBST(11);

    assert.strictEqual(inOrderDepthFirstSearch(rootNode, 6).getValue(), 6);
    assert.strictEqual(inOrderDepthFirstSearch(rootNode, 0).getValue(), 0);
    assert.strictEqual(inOrderDepthFirstSearch(rootNode, -1), null);
    assert.strictEqual(inOrderDepthFirstSearch(rootNode, 10).getValue(), 10);
})();
