class BinaryTreeNode {
    constructor(value, leftNode = null, rightNode = null) {
        this.value = value;
        this.setLeftNode(leftNode);
        this.setRightNode(rightNode);
    }

    setLeftNode(binaryTreeNode) {
        this.leftNode = binaryTreeNode;
    }

    getLeftNode() {
        return this.leftNode;
    }

    setRightNode(binaryTreeNode) {
        this.rightNode = binaryTreeNode;
    }

    getRightNode() {
        return this.rightNode;
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }
}

export default BinaryTreeNode;
