class Tree {
    constructor(rootNode = null) {
        this.setRootNode(rootNode);
    }

    setRootNode(treeNode) {
        this.rootNode = treeNode;
    }

    getRootNode() {
        return this.rootNode;
    }
}

export default Tree;
