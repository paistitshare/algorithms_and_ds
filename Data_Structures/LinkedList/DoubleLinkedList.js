import DoubleLinkedListNode from './DoubleLinkedListNode.js';

class DoubleLinkedList {
    constructor() {
        this.head = this.tail = null;
        this.size = 0;
    }

    addFirst(element) {
        if (this.head === this.tail && this.head === null && this.size === 0) {
            this.head = this.tail = new DoubleLinkedListNode(element);
        } else if (this.head === this.tail && this.size === 1) {
            const newHeadNode = new DoubleLinkedListNode(element, this.head);

            this.tail.setPrevious(newHeadNode);
            this.head = newHeadNode;
        } else {
            const oldHead = this.head;
            this.head = new DoubleLinkedListNode(element, this.head);

            oldHead.setPrevious(this.head);
        }

        ++this.size;
    }

    addLast(element) {
        const oldTailNode = this.tail;

        if (this.tail === this.head && this.tail === null && this.size === 0) {
            this.tail = this.head = new DoubleLinkedListNode(element);
        } else if (this.head === this.tail && this.size === 1) {
            const newTailNode = new DoubleLinkedListNode(element, null, oldTailNode);

            this.setNext(this.tail);
            this.tail = newTailNode;
        } else {
            this.tail = new DoubleLinkedListNode(element, null, oldTailNode);

            oldTailNode.setNext(this.tail);
        }

        ++this.size;
    }

    removeFirst() {
        if (this.head === this.tail && this.size === 1) {
            const oldHeadNode = this.head;

            this.head = this.tail = null;
            --this.size;

            return oldHeadNode;
        } else if (this.tail !== this.head && this.tail !== null && this.size !== 0) {
            const oldHeadNode = this.head;

            this.head = oldHeadNode.getNext();
            this.head.setPrevious(null);
            --this.size;

            return oldHeadNode;
        }

        return null;
    }

    removeLast() {
        if (this.tail === this.head && this.size === 1) {
            const oldTailNode = this.tail;

            this.tail = this.head = null;
            --this.size;

            return oldTailNode;
        } else if (this.tail !== this.head && this.tail !== null && this.size !== 0) {
            const oldTailNode = this.tail;

            this.tail = oldTailNode.getPrevious();
            this.tail.setNext(null);

            --this.size;

            return oldTailNode;
        }

        return null;
    }

    remove(element) {
        let currentNode = this.head;

        while (currentNode !== null) {
            const removedNode = this._removeNodeIfEqualTo(currentNode, element);

            if (removedNode) {
                return removedNode;
            }

            currentNode = currentNode.getNext();
        }

        return null;
    }

    _removeNodeIfEqualTo(node, element) {
        if (node.getValue() === element) {
            this._removeNode(node);
        }
    }

    _removeNode(node) {
        const previousNode = node.getPrevious();
        const nextNode = node.getNext();

        if (node === this.head && this.head === this.tail && this.size === 1) {
            this.head = this.tail = null;
            --this.size;
        } else if (this.head !== this.tail && this.size !== 0) {
            node.setNext(null);
            node.setPrevious(null);

            if (previousNode) {
                previousNode.setNext(nextNode);
            }

            if (nextNode) {
                nextNode.setPrevious(previousNode);
            }

            --this.size;
        }

        return null;
    }

    search(element) {
        let currentNode = this.head;
        let currentNodeIndex = 0;

        while (currentNode !== null) {
            if (currentNode.getValue() === element) {
                return currentNodeIndex;
            }

            currentNode = currentNode.getNext();

            ++currentNodeIndex;
        }

        return -1;
    }

    size() {
        return this.size;
    }

    toArray() {
        let currentNode = this.head;
        const outputArray = [];

        if (!currentNode) {
            return outputArray;
        }

        while (currentNode !== null) {
            if (currentNode) {
                outputArray.push(currentNode);
            }

            currentNode = currentNode.getNext();
        }

        return outputArray;
    }

    isEmpty() {
        return !this.head && !this.tail && this.size === 0;
    }

    clear() {
        this.head = this.tail = null;
        this.size = 0;
    }

    clone() {
        return Object.assign(DoubleLinkedList.prototype, this);
    }

    peekFirst() {
        return this.head;
    }

    peekLast() {
        return this.tail;
    }
}

export default DoubleLinkedList;
