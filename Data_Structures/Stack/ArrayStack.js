class ArrayStack {
    constructor() {
        this.stack = [];
    }

    push(element) {
        this.stack.push(element);

        return element;
    }

    pop() {
        const oldElement = this.stack.pop();

        return oldElement;
    }
}
