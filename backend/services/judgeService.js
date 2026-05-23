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

    // SEND CODE TO JUDGE0

    const submission = await axios.post(

      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",

      {
        language_id: languageId,
        source_code: sourceCode,
        stdin: stdin
      },

      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return submission.data;

  } catch(error){

    console.log(error);

    return {
      error: "Execution Failed"
    };
  }
};

module.exports = executeCode;