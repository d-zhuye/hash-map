class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  prepend(key, value) {
    this.size++;
    if (!this.head) {
      this.head = new Node(key, value);
      return;
    }

    if (this.head) {
      this.head = new Node(key, value, this.head);
      return;
    }
  }

  append(key, value) {
    const node = new Node(key, value);
    this.size++;
    if (!this.head) {
      this.head = node;
      return;
    }

    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }

    curr.next = node;
    return;
  }

  remove(key) {
    let prev;
    let curr = this.head;

    for (let i = 0; i < this.size; i++) {
      if (curr.key != key) {
        prev = curr;
        curr = curr.next;
      } else {
        prev.next = curr.next;
        this.size--;
      }
    }

    return this;

  }

  allKeys() {
    let array = [];

    let curr = this.head;

    for (let i = 0; i < this.size; i++) {
      array.push(curr.key);
      curr = curr.next;
    }

    return array;
  }

  allValues() {
    let array = [];
    let curr = this.head;

    for (let i = 0; i < this.size; i++) {
      array.push(curr.value);
      curr = curr.next
    }

    return array;
  }

  allPairs() {
    let array = [];
    let curr = this.head;

    for (let i = 0; i < this.size; i++) {
      const pair = [curr.key, curr.value];
      array.push(pair);
      curr = curr.next;
    }
    return array;
  }
}

export class HashMap {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.map = [];
    this.capacity = capacity;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;
    const primeNum = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode % this.capacity;
      hashCode = primeNum * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    // Checks if resize is needed
    if (this.length() > this.capacity * this.loadFactor) {
      console.log("Resizing Map, Rehashing Key-Values");
      this.resize();
    }

    const hashCode = this.hash(key);

    if (!this.map[hashCode]) {
      const newList = new LinkedList();
      newList.prepend(key, value);
      this.map[hashCode] = newList;
    } else {
      const list = this.map[hashCode];
      list.append(key, value);
    }
  }

  resize() {
    // Double Capacity
    this.capacity = this.capacity * 2;

    // Clear all current entries
    const entries = this.entries();
    this.clear();

    // Rehash all entries
    entries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }

  get(key) {
    const hashCode = this.hash(key);

    if (this.map[hashCode]) {
      console.log("Key Found!");
      return this.map[hashCode];
    } else {
      console.log("No value in key");
      return null;
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    let entries;

    if (this.map[hashCode]) {
      entries = this.map[hashCode].allKeys();
    }

    if (entries && entries.includes(key)) {
      return true;
    } else {
      console.log(`${key} not found. Search is letter case and spelling sensitive.`)
      return false;
    }
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.map[hashCode];

    // if length of list is 1, remove list
    if (bucket) {
      if (bucket.size <= 1 && bucket.head.key == key) {
        this.map.splice(hashCode, 1);
        return true;
      } else {
        this.map[hashCode] = this.map[hashCode].remove(key);
        return true;
      }
    } else {
      console.log(`${key} not found.`);
      return false;
    }
  }

  length() {
    let length = 0;

    this.map.forEach((bucket) => {
      const keys = bucket.allKeys();
      length += keys.length;
    });
    return length;
  }

  clear() {
    this.map = [];
  }

  keys() {
    let array = [];

    this.map.forEach((bucket) => {
      const keys = bucket.allKeys();
      array = array.concat(keys);
    });

    return array;
  }

  values() {
    let array = [];

    this.map.forEach((bucket) => {
      const values = bucket.allValues();
      array = array.concat(values);
    });
    return array;
  }

  entries() {
    let array = [];
    this.map.forEach((bucket) => {
      const pairs = bucket.allPairs();
      array = array.concat(pairs);
    });
    return array;
  }
}
