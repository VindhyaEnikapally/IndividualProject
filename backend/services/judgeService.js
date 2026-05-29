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
    const base64SourceCode = Buffer.from(sourceCode || "").toString("base64");
    const base64Stdin = Buffer.from(stdin || "").toString("base64");

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