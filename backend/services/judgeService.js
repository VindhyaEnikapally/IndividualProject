const axios = require("axios");

// LANGUAGE IDS

const languageMap = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62
};

// EXECUTE CODE

const executeCode = async (
  language,
  sourceCode,
  stdin = ""
) => {

  try {

    const languageId = languageMap[language];

    if(!languageId){

      return {
        error: "Unsupported Language"
      };
    }

    // BASE64 ENCODING
    let finalSourceCode = sourceCode || "";
    if (language === "javascript") {
      const promptPolyfill = `const fs = require('fs');
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
      finalSourceCode = promptPolyfill + "\n" + finalSourceCode;
    }

    const normalizedStdin = (stdin || "").replace(/\r\n/g, "\n");
    const base64SourceCode = Buffer.from(finalSourceCode).toString("base64");
    const base64Stdin = Buffer.from(normalizedStdin).toString("base64");

    // SEND CODE TO JUDGE0

    const submission = await axios.post(

      "https://ce.judge0.com/submissions?base64_encoded=true&wait=true",

      {
        language_id: languageId,
        source_code: base64SourceCode,
        stdin: base64Stdin
      },

      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const data = submission.data;

    // BASE64 DECODING HELPER
    const decodeBase64 = (str) => {
      if (!str) return "";
      return Buffer.from(str, "base64").toString("utf-8");
    };

    return {
      ...data,
      stdout: decodeBase64(data.stdout),
      stderr: decodeBase64(data.stderr),
      compile_output: decodeBase64(data.compile_output)
    };

  } catch(error){

    console.log(error);

    return {
      error: "Execution Failed"
    };
  }
};

module.exports = executeCode;