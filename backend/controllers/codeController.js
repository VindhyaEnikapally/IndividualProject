const executeCode = require("../services/judgeService");

const analyzeComplexity =
require("../analyzers/complexityAnalyzer");

const generateScore =
require("../analyzers/scoringEngine");

// RUN CODE

const runCode = async (req, res) => {

  try {

    const {
      language,
      code,
      input
    } = req.body;

    const result = await executeCode(
      language,
      code,
      input
    );

    res.status(200).json({

      stdout:
      result.stdout || "",

      stderr:
      result.stderr || "",

      compile_output:
      result.compile_output || "",

      time:
      result.time || 0,

      memory:
      result.memory || 0
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      error: "Execution Failed"
    });
  }
};


// EVALUATE CODE

const evaluateCode = async (req, res) => {

  try {

    const {
      language,
      code,
      input
    } = req.body;

    // EXECUTE CODE

    const result = await executeCode(
      language,
      code,
      input
    );

    // ANALYZE COMPLEXITY

    const complexityData =
      analyzeComplexity(code, language);

    // EXECUTION DETAILS

    const executionTime =
      parseFloat(result.time || 0);

    const memory =
      parseFloat(result.memory || 0);

    // GENERATE SCORE

    const scoreData =
      generateScore(

        complexityData,

        executionTime,

        memory
      );

    // FINAL RESPONSE

    res.status(200).json({

      stdout:
      result.stdout || "",

      executionTime,

      memory,

      timeComplexity:
      complexityData.timeComplexity,

      score:
      scoreData.score,

      rating:
      scoreData.rating
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      error: "Evaluation Failed"
    });
  }
};

module.exports = {
  runCode,
  evaluateCode
};