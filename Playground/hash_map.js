import HashMap from '../Data_Structures/HashMap/ClosedAddressing.js';

const myHashMap = new HashMap();

myHashMap.set('this', 1);
myHashMap.set('that', 2);
myHashMap.set('same', 5);
myHashMap.set('same', 3);
myHashMap.set('t1', 2);
myHashMap.set('t2', 2);
myHashMap.set('t3', 2);
myHashMap.set('t4', 2);
myHashMap.set('t5', 2);
myHashMap.set('t6', 2);
myHashMap.remove('t6', 2);
myHashMap.remove('t7', 2);
myHashMap.get('t7', 2);
