import { HashMap } from "./main.js";

const test = new HashMap(16, 0.7);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

// Below are different console commands to test each functionality
// of HashMap class

/*
console.log(test.length());
console.log(test.keys());
console.log(test.get("apple"));

// Test .has() function for both truthy and falsey keys
console.log(test.has("jacket"));
console.log(test.has("Bapple"))

console.log(test.keys());
console.log(test.values());

console.log("Entries:");
console.log(test.entries());


console.log("testing removal");
console.log(test.map[1]);
console.log(test.remove("moon"));
console.log(test.map[1]);
*/




