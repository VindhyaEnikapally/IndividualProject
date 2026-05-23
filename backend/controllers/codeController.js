const executeCode = require("../services/judgeService");

const analyzeComplexity =
require("../analyzers/complexityAnalyzer");

const analyzeOptimization =
require("../analyzers/optimizationAnalyzer");

const generateScore =
require("../analyzers/scoringEngine");

// RUN ONLY

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

      stdout: result.stdout || "",

      stderr: result.stderr || "",

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

// EVALUATE ONLY

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

    // ANALYSIS
    const complexityData = analyzeComplexity(code, language);
    const optimizationData = analyzeOptimization(code, language);

    // EXECUTION DETAILS

    const executionTime =
    parseFloat(result.time || 0);

    const memory =
    parseFloat(result.memory || 0);

    // SCORE

    const scoreData = generateScore(

      complexityData,

      optimizationData,

      executionTime,

      memory
    );

    // DEBUG LOGS

    console.log(complexityData);

    console.log(optimizationData);

    console.log(scoreData);

    // FINAL RESPONSE

    res.status(200).json({

  stdout: result.stdout || "",

  executionTime,

  memory,

  timeComplexity:
  complexityData.timeComplexity,

  optimization:
  optimizationData.optimization,

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