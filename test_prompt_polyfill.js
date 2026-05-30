const fs = require('fs');

// The Polyfill
const promptPolyfill = `
const fs = require('fs');
let __stdin_data = "";
let __stdin_lines = [];
let __stdin_index = 0;
function prompt(message) {
  if (!__stdin_data) {
    try {
      __stdin_data = fs.readFileSync(0, 'utf-8') || "";
      __stdin_lines = __stdin_data.split(/\\r?\\n/);
    } catch (e) {
      __stdin_lines = [];
    }
  }
  if (__stdin_index < __stdin_lines.length) {
    return __stdin_lines[__stdin_index++];
  }
  return null;
}
`;

const userCode = `
let n = Number(prompt("Enter n:"));
console.log("Doubled value is:", n * 2);
`;

const fullCode = promptPolyfill + "\n" + userCode;

console.log("Generated Code:\n", fullCode);
