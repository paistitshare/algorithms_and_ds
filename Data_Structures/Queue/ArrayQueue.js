class ArrayQueue {
    constructor() {
        this.queue = [];
    }

    enque(element) {
        this.queue.push(element);
    }

    dequeue() {
        if (this.queue[0]) {
            this.queue.shift();
        }
    }
}
