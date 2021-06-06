// Closed Addressing (Chaining). Considered to be a better choice for HashMap's
// with high load factor.
// Chaining method is based on creating buckets upon which our entries will be
// hashed, if there's a collision we'll just add an item to the list on the
// same bucket
import HashMapEntry from './HashMapEntry.js';
import LinkedList from '../LinkedList/LinkedList.js';

const CHANGE_SHRINK = -1;
const CHANGE_GROWTH = 1;
const RESIZE_FACTOR = 2;
const MAX_LOAD_FACTOR = Math.log(2); // this number as a higher bound of a load
// factor tend to yield better performance, when searching for a key, it's value
// is close to 0.7
const DOWNSIZE_THRESHOLD = 0.35;
const INITIAL_BUCKETS_COUNT = 16;

class HashMap {
    constructor() {
        this.buckets = Array.from(Array(INITIAL_BUCKETS_COUNT), () => new LinkedList());
        this.filledSlots = 0;
    }

    ensureCapacity(changeTendency) {
        const loadFactor = this.filledSlots / this.buckets.length;

        if (CHANGE_GROWTH === changeTendency &&
            loadFactor > MAX_LOAD_FACTOR) {
            this.upsizeBuckets();
        } else if (CHANGE_SHRINK === changeTendency &&
            loadFactor < DOWNSIZE_THRESHOLD) {
            this.downsizeBuckets();
        }
    }

    resizeBuckets(newBucketsCount) {
        const newBuckets = Array(newBucketsCount);

        this.buckets.forEach((bucket) => {
            if (!bucket.isEmpty()) {
                let currentEntry = bucket.head;

                while (currentEntry != null) {
                    this.addEntryToBuckets(entry.getKey(), entry.getValue(), newBuckets);
                }
            }
        });
    }

    upsizeBuckets() {
        this.resizeBuckets(this.buckets.length * RESIZE_FACTOR);
    }

    downsizeBuckets() {
        this.resizeBuckets(this.buckets.length / RESIZE_FACTOR);
    }

    getBaseHash(key) {
        return [...key.toString()].reduce((acc, character) => {
            return acc += character.charCodeAt(0);
        }, 0);
    }

    addEntryToBuckets(key, value, buckets) {
        const bucketIndex = this.getBucketIndex(key, buckets);

        buckets[bucketIndex].addFirst(new HashMapEntry(key, value));
    }

    getBucketIndex(key, buckets) {
        return this.getBaseHash(key) % buckets.length;
    }

    set(key, value) {
        this.ensureCapacity(CHANGE_GROWTH);

        const existingEntry = this.getEntry(key);

        if (existingEntry !== null) {
            existingEntry.setValue(value);
        } else {
            this.addEntryToBuckets(key, value, this.buckets);
            ++this.filledSlots;
        }
    }

    get(key) {
        const existingEntry = this.getEntry(key);

        return existingEntry === null ? null : existingEntry.getValue();
    }

    getEntry(key) {
        const bucketIndex = this.getBucketIndex(key, this.buckets);

        return this.buckets[bucketIndex].searchBy((entry) => entry.getKey() === key);
    }

    remove(key) {
        this.ensureCapacity(CHANGE_SHRINK);

        const bucketIndex = this.getBucketIndex(key, this.buckets);
        const removedEntry = this.buckets[bucketIndex].removeBy((entry) => entry.getKey() === key);

        if (removedEntry === null) {
            return null;
        }

        --this.filledSlots;

        return key;
    }
}

export default HashMap;
