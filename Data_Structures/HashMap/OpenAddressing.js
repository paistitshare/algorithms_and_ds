// Hashing objectives:
//   1) Uniform distribution of keys;
//   2) Minimizing collisions.
// Open Addressing; better for low load factor.
// The popular hashing table slot probing methods for open addressing are:
// Linear Probing; Plus 3 rehash; Quadratic probing; Double Hashing
import HashMapEntry from './HashMapEntry.js';

const TABLE_CHANGE_SHRINK = -1;
const TABLE_CHANGE_GROWTH = 1;
const TABLE_RESIZE_FACTOR = 2; // table growth factor is usually exponential
const MAX_TABLE_LOAD_FACTOR = 0.7; // stats show, that setting this to a
// higher number (> 0.7) might result into long time within a left slots search
const TABLE_DOWNSIZE_THRESHOLD = 0.4;
const INITIAL_TABLE_SIZE = 9; // can be relatively small prime number

class HashMap {
    constructor() {
        this.table = Array(INITIAL_TABLE_SIZE);
        this.filledTableSlots = 0;
    }

    // detects if table grows/shrinks and resizes the table accordingly
    ensureCapacity(tableChangeTendency) {
        const loadFactor = this.filledTableSlots / this.table.length;

        if (TABLE_CHANGE_GROWTH === tableChangeTendency &&
            loadFactor > MAX_TABLE_LOAD_FACTOR) {
            this.upsizeTable();
        } else if (TABLE_CHANGE_SHRINK === tableChangeTendency &&
            loadFactor < TABLE_DOWNSIZE_THRESHOLD) {
            this.downsizeTable();
        }
    }

    resizeTable(newTableSize) {
        // create new larger table
        const newTable = Array(newTableSize);
        // rehash all values from the old table and populate new table
        this.table.forEach((entry) => {
            if (entry !== undefined) {
                this.setToOpenAddressInTable(entry.getKey(), entry.getValue(), newTable);
            }
        });

        this.table = newTable;
    }

    upsizeTable() {
        this.resizeTable(this.table.length * TABLE_RESIZE_FACTOR);
    }

    downsizeTable() {
        this.resizeTable(this.table.length / TABLE_RESIZE_FACTOR);
    }

    getBaseHash(key) {
        return [...key.toString()].reduce((acc, character) => {
            return acc += character.charCodeAt(0);
        }, 0);
    }

    setToOpenAddressInTable(key, value, table) {
        const tableIndex = this.getOpenTableIndex(table, key);

        table[tableIndex] = new HashMapEntry(key, value);
    }

    // Hashing with Quadratic Probing
    // formula is: h'(x) = [h(x) + f(i)] % size
    // where f(i) = i^2; i = 0, 1, 2, 3...
    getOpenTableIndex(table, key) {
        const baseHash = this.getBaseHash(key);
        let tablePositionOffset = 0;
        let tableIndex = baseHash % table.length;

        while (!this.isIndexOpenInTable(tableIndex, table)) {
            const doublePowerOffset = Math.pow(tablePositionOffset, 2);
            tableIndex = (baseHash + doublePowerOffset) % table.length;
            ++tablePositionOffset;
        }

        return tableIndex;
    }

    isIndexOpenInTable(tableIndex, table) {
        return !table.hasOwnProperty(tableIndex);
    }

    set(key, value) {
        this.ensureCapacity(TABLE_CHANGE_GROWTH);

        const existingEntryIndex = this.getEntryIndex(key);

        if (existingEntryIndex !== null) {
            this.table[existingEntryIndex].setValue(value);
        } else {
            this.setToOpenAddressInTable(key, value, this.table);
            ++this.filledTableSlots;
        }
    }

    get(key) {
        const entryIndexInTable = this.getEntryIndex(key);

        if (entryIndexInTable === null) {
            return null;
        }

        return this.table[entryIndexInTable].getValue();
    }

    // do probe for a key existence until we've found an undefined index
    getEntryIndex(key) {
        const baseHash = this.getBaseHash(key);
        let tablePositionOffset = 0;
        let tableIndex = baseHash % this.table.length;

        while (!this.isIndexOpenInTable(tableIndex, this.table)) {
            const doublePowerOffset = Math.pow(tablePositionOffset++, 2);
            tableIndex = (baseHash + doublePowerOffset) % this.table.length;

            if (this.hasSameKeyByIndex(key, tableIndex)) {
                return tableIndex;
            }
        }

        return null;
    }

    hasSameKeyByIndex(key, tableIndex) {
        const entry = this.table[tableIndex];

        if (entry === undefined) {
            return false;
        }

        return entry.getKey() === key;
    }

    remove(key) {
        this.ensureCapacity(TABLE_CHANGE_SHRINK);

        const entryIndexInTable = this.getEntryIndex(key);

        if (entryIndexInTable === null) {
            return null;
        }

        delete this.table[entryIndexInTable];
        --this.filledTableSlots;

        return key;
    }
}

export default HashMap;
