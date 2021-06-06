import Stack from '../Data_Structures/Stack/Stack.js';

const myCoolStack = new Stack();

myCoolStack.push(1);
myCoolStack.push(2);
myCoolStack.push(3);
myCoolStack.push(4);
console.log(myCoolStack.getSize());
myCoolStack.push(5);
myCoolStack.pop();
myCoolStack.pop();
myCoolStack.pop();
myCoolStack.pop();
console.log(myCoolStack.search(3));
