const executeCode = require("./backend/services/judgeService");

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
let m = Number(prompt("Enter m:"));
console.log("Sum is:", n + m);
`;

const fullCode = promptPolyfill + "\n" + userCode;

executeCode("javascript", fullCode, "42\n100")
  .then(res => {
    console.log("SUCCESS:", res);
  })
  .catch(err => {
    console.error("ERROR:", err);
  });
