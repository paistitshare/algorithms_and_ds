class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    setValue(value) {
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setNext(next) {
        if (next !== undefined) {
            this.next = next;
        }
    }

    getNext() {
        return this.next;
    }
}

export default LinkedListNode;
