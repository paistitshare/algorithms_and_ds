import Tree from './Tree.js';
import BinaryTreeNode from './BinaryTreeNode.js';

class BinarySearchTree extends Tree {
    insert(element, currentNode = this.rootNode) {
        if (this.rootNode === null) {
            this.setRootNode(this.createNode(element));
        } else if (element < currentNode.getValue()) {
            if (currentNode.getLeftNode() === null) {
                return currentNode.setLeftNode(this.createNode(element));
            }

            return this.insert(element, currentNode.getLeftNode());
        } else if (element > currentNode.getValue()) {
            if (currentNode.getRightNode() === null) {
                return currentNode.setRightNode(this.createNode(element));
            }

            return this.insert(element, currentNode.getRightNode());
        }
    }

    createNode(element) {
        return new BinaryTreeNode(element);
    }

    remove(element, currentNode = this.rootNode, parentNode = null) {
        if (currentNode === null) {
            return false;
        } else if (element < currentNode.getValue()) {
            return this.remove(element, currentNode.getLeftNode(), currentNode);
        } else if (element > currentNode.getValue()) {
            return this.remove(element, currentNode.getRightNode(), currentNode);
        } else if (element === currentNode.getValue()) {
            return this.removeNode(currentNode, parentNode);
        }

        return false;
    }

    //          10
    //        /    \
    //       4     15
    //      /  \   / \
    //     2    7 11  17
    //    /\   / \
    //   1  3 5   9
    removeNode(nodeToRemove, parentNode) {
        const leftNode = nodeToRemove.getLeftNode();
        const rightNode = nodeToRemove.getRightNode();
        const nodeToLinkTo = leftNode || rightNode;
        const hasBothChildNodes = leftNode && rightNode;

        if (!hasBothChildNodes) { // handles node removal with no child nodes and 1 child
            this.linkParentNodeTo(nodeToRemove, parentNode, nodeToLinkTo);
        } else { // handles node removal with 2 childs
            // in order to set the value of a deleted node we'll need to find the leftmost node
            // of the right child element, remove it's link to parent and substitute our
            // deleting node's value with it's value
            const [leftmostNodeToRightNode, leftmostParentNode] = this.getLeftmostNodeWithParent(rightNode, nodeToRemove);

            nodeToRemove.setValue(leftmostNodeToRightNode.getValue());
            // unlink leftmost node from it's parent, but also handle the situation in which we might
            // have right node of the leftmost node left hanging
            const rightChildNodeOfLeftmostNode = leftmostNodeToRightNode.getRightNode();

            if (rightChildNodeOfLeftmostNode !== null) {
                this.linkParentNodeTo(leftmostNodeToRightNode, leftmostParentNode, rightChildNodeOfLeftmostNode);
            } else {
                this.linkParentNodeTo(leftmostNodeToRightNode, leftmostParentNode, null);
            }
        }

        return true;
    }

    getLeftmostNodeWithParent(startTargetNode, startParentNode) {
        let currentNode = startTargetNode;
        let currentParentNode = startParentNode;

        while (currentNode.getLeftNode() !== null) {
            currentParentNode = currentNode;
            currentNode = currentNode.getLeftNode();
        }

        return [currentNode, currentParentNode];
    }

    linkParentNodeTo(targetNode, parentNode, nodeToLinkTo) {
        if (parentNode) {
            const leftNodeOfParent = parentNode.getLeftNode();
            const rightNodeOfParent = parentNode.getRightNode();

            if (leftNodeOfParent.getValue() === targetNode.getValue()) {
                parentNode.setLeftNode(nodeToLinkTo);
            } else if (rightNodeOfParent.getValue() === targetNode.getValue()) {
                parentNode.setRightNode(nodeToLinkTo);
            }
        }
    }

    contains(element, currentNode = this.rootNode) {
        if (this.getRootNode() === null) {
            return false;
        } else if (element < currentNode.getValue()) {
            if (currentNode.getLeftNode() === null) {
                return false;
            }

            return this.contains(element, currentNode.getLeftNode());
        } else if (element > currentNode.getValue()) {
            if (currentNode.getRightNode() === null) {
                return false;
            }

            return this.contains(element, currentNode.getRightNode());
        } else if (currentNode.getValue() === element) {
            return true;
        }

        return false;
    }

    // 1st iteration:
    //  -->     7
    //        /   \
    // swap  4     8
    //      / \   / \
    //     3   5 6   9
    // 2nd iteration:
    //          7
    //        /   \
    //  -->  8     4
    //      / \   / \
    //swap 6   9 3   5
    //
    // In-place reversal
    reverse(currentNode = this.rootNode) {
        if (currentNode === null) {
            return null;
        }

        const temp = currentNode.getLeftNode();
        currentNode.setLeftNode(currentNode.getRightNode());
        currentNode.setRightNode(temp);

        this.reverse(currentNode.getLeftNode());
        this.reverse(currentNode.getRightNode());
    }
}

export default BinarySearchTree;
