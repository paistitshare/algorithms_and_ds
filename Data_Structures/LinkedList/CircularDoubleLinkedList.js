import DoubleLinkedListNode from './DoubleLinkedListNode.js';

class CircularDoubleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 3 <-> 2 <-> 1
    addFirst(element) {
        if (this.head === null) {
            this.head = new DoubleLinkedListNode(element);

            this.head.setNext(this.head);
            this.head.setPrevious(this.head);
        } else if (this.getSize() === 1) {
            const oldHead = this.head;

            this.head = new DoubleLinkedListNode(element, oldHead, oldHead);

            oldHead.setNext(this.head);
            oldHead.setPrevious(this.head);
        } else {
            const oldHead = this.head;
            const lastNode = this.head.getPrevious();

            this.head = new DoubleLinkedListNode(element, oldHead, lastNode);

            lastNode.setNext(this.head);
        }

        this.size++;
    }

    toArray() {
        if (this.getSize < 1) {
            return [];
        }

        const outputArray = [this.head.getValue()];
        let currentNode = this.head.getNext();

        while (currentNode !== this.head) {
            outputArray.push(currentNode.getValue());
            currentNode = currentNode.getNext();
        }

        return outputArray;
    }

    getSize() {
        return this.size;
    }
}

export default CircularDoubleLinkedList;
