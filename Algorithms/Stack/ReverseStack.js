import assert from 'assert';
import Stack from '../../Data_Structures/Stack/Stack.js';

const getSampleStack = () => {
    const sampleStack = new Stack();

    sampleStack.push(4);
    sampleStack.push(3);
    sampleStack.push(2);
    sampleStack.push(1);

    return sampleStack;
}

(() => {
    // iterative T: O(n) S: O(n)
    const getReversedStack = (stack) => {
        const reversedStack = new Stack();

        if (stack.isEmpty()) {
            return reversedStack;
        }

        const stackSize = stack.getSize();

        for (let i = 0; i < stackSize; i++) {
            reversedStack.push(stack.pop());
        }

        return reversedStack;
    }
});

(() => {
    // recursive T: O(n) S: O(n)
    const getReversedStack = (stack, reversedStack = new Stack()) => {
        if (stack.isEmpty()) {
            return reversedStack;
        }

        reversedStack.push(stack.pop());

        return getReversedStack(stack, reversedStack);
    }
});

(() => {
    // Iterates and swaps elements in place;
    // T: O(n) S: O(1)
    Stack.prototype.reverse = function () {
        if (this.getSize() === 0) {
            return;
        }

        let previousNode = this.head;
        let currentNode = previousNode.getNext();

        previousNode.setNext(null);

        while (currentNode !== null) {
            let nextNode = currentNode.getNext();

            currentNode.setNext(previousNode);

            previousNode = currentNode;
            currentNode = nextNode;
        }

        this.head = previousNode;
    };

    // tests
    const sampleStack = getSampleStack();

    sampleStack.reverse()
    assert.strictEqual(sampleStack.peek().getValue(), 4);
})();
