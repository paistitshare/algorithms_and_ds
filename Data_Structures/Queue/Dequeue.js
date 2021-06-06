import DoubleLinkedList from '../LinkedList/DoubleLinkedList.js';

class Dequeue {
    constructor() {
        this.doubleLinkedList = new DoubleLinkedList();
    }

    addFirst(element) {
        this.doubleLinkedList.addFirst(element);
    }

    addLast(element) {
        this.doubleLinkedList.addLast(element);
    }

    peekFirst() {
        return this.doubleLinkedList.peekFirst();
    }

    peekLast() {
        return this.doubleLinkedList.peekLast();
    }

    removeFirst() {
        return this.doubleLinkedList.removeFirst();
    }

    removeLast() {
        return this.doubleLinkedList.removeLast();
    }

    size() {
        this.doubleLinkedList.size();
    }

    isEmpty() {
        return this.doubleLinkedList.isEmpty();
    }
}

export default Dequeue;
