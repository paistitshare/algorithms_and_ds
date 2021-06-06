import DoubleLinkedList from '../LinkedList/DoubleLinkedList.js';

class Queue {
    constructor() {
        this.doubleLinkedList = new DoubleLinkedList();
    }

    add(element) {
        this.doubleLinkedList.addLast(element);
    }

    peek() {
        return this.doubleLinkedList.peekFirst();
    }

    remove() {
        this.doubleLinkedList.removeFirst();
    }
}

export default Queue;
