class DoubleLinkedListNode {
    constructor(value, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    getValue() {
        return this.value;
    }

    setNext(next) {
        if (next !== undefined) {
            this.next = next;
        }
    }

    setPrevious(previous) {
        if (previous !== undefined) {
            this.previous = previous;
        }
    }

    getNext() {
        return this.next;
    }

    getPrevious() {
        return this.previous;
    }
}

export default DoubleLinkedListNode;
