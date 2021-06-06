import assert from 'assert';
import BinarySearchTree from '../../../Data_Structures/Tree/BinarySearchTree.js';

// iterative T: O(log(n)) S: O(1)
const minBST = (currentNode) => {
    if (currentNode === null) {
        return null;
    }

    while (currentNode.getLeftNode() !== null) {
        currentNode = currentNode.getLeftNode();
    }

    return currentNode.getValue();
};

//          10
//        /    \
//       5     15
//      /  \   / \
//     2    6 11  17
//    /\   / \
//   1  3 4   7
const sampleTree = new BinarySearchTree();

sampleTree.insert(10);
sampleTree.insert(5);
sampleTree.insert(15);
sampleTree.insert(2);
sampleTree.insert(6);
sampleTree.insert(7);
sampleTree.insert(1);
sampleTree.insert(3);
sampleTree.insert(4);
sampleTree.insert(11)
sampleTree.insert(17);

// tests
assert.strictEqual(minBST(sampleTree.getRootNode()), 1);
sampleTree.remove(1);
sampleTree.remove(2);
assert.strictEqual(minBST(sampleTree.getRootNode()), 3);
assert.strictEqual(minBST(new BinarySearchTree().getRootNode()), null);
