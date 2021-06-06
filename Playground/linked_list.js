import LinkedList from '../Data_Structures/LinkedList/LinkedList.js';
import DoubleLinkedList from '../Data_Structures/LinkedList/DoubleLinkedList.js';

(() => {
    const myLinkedList = new LinkedList();

    myLinkedList.addFirst(1);
    myLinkedList.addFirst(2);
    myLinkedList.addLast(3);
    myLinkedList.addFirst(4);
    myLinkedList.addLast(5);
    myLinkedList.remove(2);

    const myLinkedListCopy = myLinkedList.clone();

    console.log('myLinkedListCopy.search(2): ' + myLinkedListCopy.search(2));
    console.dir('myLinkedList values: ' + myLinkedList.toArray().map((item) => item.getValue()));

    myLinkedList.clear();
});

(() => {
    const myLinkedList = new DoubleLinkedList();

    myLinkedList.addFirst(1); // 1
    myLinkedList.addFirst(2); // 2 -> 1
    myLinkedList.addLast(3); // 2 -> 1 -> 3
    myLinkedList.addFirst(4); // 4 -> 2 -> 1 -> 3
    myLinkedList.addLast(5); // 4 -> 2 -> 1 -> 3 -> 5
    myLinkedList.remove(2);

    const myLinkedListCopy = myLinkedList.clone();

    console.log('myLinkedListCopy.search(1): ' + myLinkedListCopy.search(1));
    console.dir('myLinkedList values: ' + myLinkedList.toArray().map((item) => item.getValue()));

    myLinkedList.clear();
})();
