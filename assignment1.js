// Working with Strings and Arrays in JavaScript

let myString = "Hello, JavaScript Developer!";
console.log("Original String:", myString);
console.log("Length of the string:", myString.length);
console.log("Uppercase version:", myString.toUpperCase());
console.log("Lowercase version:", myString.toLowerCase());
console.log("Extracted part (0 to 5):", myString.substring(0, 5));
console.log("Replacing 'Developer' with 'Coder':", myString.replace("Developer", "Coder"));
console.log("Character at position 7:", myString.charAt(7));
console.log("Position of 'JavaScript':", myString.indexOf("JavaScript"));
console.log("Splitting the string into words:", myString.split(" "));

// Playing with Arrays
let frameworks = ["React", "Vue", "Angular", "Svelte"];
console.log("Initial Array:", frameworks);
console.log("Number of items:", frameworks.length);
console.log("First framework:", frameworks[0]);
console.log("Last framework:", frameworks[frameworks.length - 1]);

frameworks.push("Next.js");
console.log("After adding 'Next.js':", frameworks);
frameworks.pop();
console.log("After removing last item:", frameworks);
frameworks.shift();
console.log("After removing first item:", frameworks);
frameworks.unshift("Ember.js");
console.log("After adding 'Ember.js' at the beginning:", frameworks);

console.log("Joined Array:", frameworks.join(" - "));
console.log("Extracting part (1 to 3):", frameworks.slice(1, 3));
console.log("Reversed Array:", frameworks.reverse());
console.log("Sorted Array:", frameworks.sort());

// Iterating through Array
frameworks.forEach((framework, index) => {
    console.log(`Framework at ${index}: ${framework}`);
});

// Transforming Array
let upperCaseFrameworks = frameworks.map(item => item.toUpperCase());
console.log("Frameworks in uppercase:", upperCaseFrameworks);

// Filtering Array
let filteredFrameworks = frameworks.filter(item => item.includes("e"));
console.log("Frameworks that contain 'e':", filteredFrameworks);

// Reducing Array
let combinedFrameworks = frameworks.reduce((acc, curr) => acc + ", " + curr);
console.log("All frameworks combined:", combinedFrameworks);
