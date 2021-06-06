import LinkedListNode from '../LinkedList/LinkedListNode.js';

class Stack {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    clone() {
        return Object.assign(Stack.prototype, this);
    }

    push(element) {
        this.head = new LinkedListNode(element, this.head);
        ++this.size;
    }

    pop() {
        const oldHead = this.head;

        this.head = this.head.getNext();
        --this.size;
        oldHead.setNext(null);

        return oldHead.getValue();
    }

    peek() {
        return this.head;
    }

    isEmpty() {
        return !this.head && this.size === 0;
    }

    getSize() {
        return this.size;
    }

    search(element) {
        let currentItem = this.head;
        const currentItemIndex = 0;

        while (currentItem !== null) {
            if (currentItem.getValue() === element) {
                return currentItemIndex;
            }

            currentItem = currentItem.getNext();
            ++currentItemIndex;
        }

        return null;
    }

    print() {
        const stack = this.clone();
        const stackSize = stack.getSize();

        for (let i = 0; i < stackSize; i++) {
            console.log(stack.pop());
        }
    }
}

export default Stack;
