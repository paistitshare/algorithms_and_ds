import LinkedListNode from './LinkedListNode.js';

class LinkedList {
    constructor(array) {
        this.head = null;
        this.size = 0;

        if (typeof array === 'object' && Array.isArray(array) && array.length > 0) {
            this.arrayToLinkedList(array);
        }
    }

    arrayToLinkedList(array) {
        array.forEach((element) => {
            this.addLast(element);
        });
    }

    addFirst(element) {
        this.head = new LinkedListNode(element, this.head);
        ++this.size;
    }

    addLast(element) {
        if (this.head === null) {
            this.head = new LinkedListNode(element, this.head);
            ++this.size;
            return;
        }

        let currentNode = this.head;

        while (currentNode.getNext() !== null) {
            currentNode = currentNode.getNext();
        }

        currentNode.setNext(new LinkedListNode(element));

        ++this.size;
    }

    remove(element) {
        let currentNode = this.head;
        let previousNode = null;

        while (currentNode !== null) {
            if (currentNode.getValue() === element) {
                if (currentNode == this.head) {
                    const nextNode = currentNode.getNext();

                    if (nextNode === null) {
                        this.head = null;
                    } else {
                        this.head.setNext(null);
                        this.head = nextNode;
                    }
                } else {
                    previousNode.setNext(currentNode.getNext());
                }

                --this.size;

                return currentNode.getValue();
            }

            previousNode = currentNode;
            currentNode = currentNode.getNext();
        }

        return null;
    }

    removeBy(conditionFunc) {
        let currentNode = this.head;
        let previousNode = null;

        while (currentNode !== null) {
            if (conditionFunc(currentNode.getValue())) {
                if (currentNode == this.head) {
                    const nextNode = currentNode.getNext();

                    if (nextNode === null) {
                        this.head = null;
                    } else {
                        this.head.setNext(null);
                        this.head = nextNode;
                    }
                } else {
                    previousNode.setNext(currentNode.getNext());
                }

                --this.size;

                return currentNode.getValue();
            }

            previousNode = currentNode;
            currentNode = currentNode.getNext();
        }

        return null;
    }

    isEmpty() {
        return !this.head && this.size === 0;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    clone() {
        return Object.assign(LinkedList.prototype, this);
    }

    peek() {
        return this.head;
    }

    getSize() {
        return this.size;
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

    searchBy(conditionFunc) {
        let currentNode = this.head;

        while (currentNode !== null) {
            if (conditionFunc(currentNode.getValue())) {
                return currentNode.getValue();
            }

            currentNode = currentNode.getNext();
        }

        return null;
    }

    toArray() {
        let currentNode = this.head;
        const outputArray = [];

        if (!currentNode) {
            return outputArray;
        }

        while (currentNode !== null) {
            if (currentNode) {
                outputArray.push(currentNode.getValue());
            }

            currentNode = currentNode.getNext();
        }

        return outputArray;
    }
}

export default LinkedList;
