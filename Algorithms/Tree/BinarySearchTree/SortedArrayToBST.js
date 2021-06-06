import BinaryTreeNode from '../../../Data_Structures/Tree/BinaryTreeNode.js';

/**
 * Returns a root node of a binary search tree, that will be generated
 * from an array of distinct sequential elements from 0 to provided
 * arrayLength - 1
 * @param {*} arrayLength Length of an array of distinct sequential elemenents,
 * that will be generated
 * @returns Root node of a populated Binary Search Tree
 */
const sortedArrayToBST = (arrayLength) => {
    const sortedArray = Array.from(Array(arrayLength), (_value, index) => index);

    return populateBST(sortedArray);
};

const populateBST = (sortedArray, startIndex = 0, endIndex = sortedArray.length - 1) => {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    if (startIndex > endIndex) {
        return null;
    }

    const treeNode = new BinaryTreeNode(sortedArray[middleIndex]);

    treeNode.setLeftNode(populateBST(sortedArray, startIndex, middleIndex - 1));
    treeNode.setRightNode(populateBST(sortedArray, middleIndex + 1, endIndex));

    return treeNode;
};

export default sortedArrayToBST;
