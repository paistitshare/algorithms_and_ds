class HashMapEntry {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }
}

export default HashMapEntry;
