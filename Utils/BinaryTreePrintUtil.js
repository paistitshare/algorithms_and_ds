export function preOrderPrint (binaryTreeNode) {
    if (binaryTreeNode !== null) {
        console.log(binaryTreeNode.getValue());
        preOrderPrint(binaryTreeNode.getLeftNode());
        preOrderPrint(binaryTreeNode.getRightNode());
    }
}

export function inOrderPrint (binaryTreeNode) {
    if (binaryTreeNode !== null) {
        inOrderPrint(binaryTreeNode.getLeftNode());
        console.log(binaryTreeNode.getValue());
        inOrderPrint(binaryTreeNode.getRightNode());
    }
}

export function postOrderPrint (binaryTreeNode) {
    if (binaryTreeNode !== null) {
        postOrderPrint(binaryTreeNode.getLeftNode());
        postOrderPrint(binaryTreeNode.getRightNode());
        console.log(binaryTreeNode.getValue());
    }
}
