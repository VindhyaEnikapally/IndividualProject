/*
const analyzeComplexity = (code) => {

  let nestedLoops = 0;

  let timeComplexity = "O(1)";

  let recursionDetected = false;

  // DETECT LOOPS

  const forLoops =
    (code.match(/for\s*\(/g) || []).length;

  const whileLoops =
    (code.match(/while\s*\(/g) || []).length;

  const totalLoops =
    forLoops + whileLoops;

  // NESTED LOOPS

  if(totalLoops >= 2){

    nestedLoops = totalLoops - 1;

    timeComplexity = "O(n²)";
  }

  else if(totalLoops === 1){

    timeComplexity = "O(n)";
  }

  // DETECT RECURSION

  const functionMatches = [
    ...code.matchAll(/function\s+(\w+)\s*\(/g)
  ];

  for(let match of functionMatches){

    const functionName = match[1];

    // remove declaration part

    const remainingCode =
      code.substring(match.index + match[0].length);

    // recursive call check

    if(
      remainingCode.includes(
        `${functionName}(`
      )
    ){

      recursionDetected = true;

      timeComplexity = "O(n)";

      break;
    }
  }

  return {

    timeComplexity,

    nestedLoops,

    recursionDetected
  };
};

module.exports = analyzeComplexity;



const analyzeComplexity = (code) => {

  console.log("ANALYZER RUNNING");

  return {

    timeComplexity: "O(n)",

    nestedLoops: 0,

    recursionDetected: true
  };
};

module.exports = analyzeComplexity;
*/


function analyzeComplexity(code, language) {

  let timeComplexity = "O(1)";

  // TOTAL LOOPS

  const loops =
    (code.match(/for\s*\(/g) || []).length +

    (code.match(/while\s*\(/g) || []).length +

    (code.match(/for\s+.*:/g) || []).length;

  // FUNCTION NAME

  let functionName = "";

  // JAVASCRIPT

  const jsFunc =
    code.match(/function\s+([a-zA-Z0-9_]+)/);

  // PYTHON

  const pyFunc =
    code.match(/def\s+([a-zA-Z0-9_]+)/);

  // C++ / JAVA

  const cppJavaFunc =
    code.match(
      /(int|void|double|float|String|bool)\s+([a-zA-Z0-9_]+)\s*\(/
    );

  if(jsFunc){

    functionName = jsFunc[1];
  }

  else if(pyFunc){

    functionName = pyFunc[1];
  }

  else if(cppJavaFunc){

    functionName = cppJavaFunc[2];
  }

  // RECURSION CHECK

  let recursive = false;

  let recursiveCalls = 0;

  if(functionName){

    const matches =
      code.match(
        new RegExp(functionName + "\\s*\\(", "g")
      ) || [];

    // first match = function declaration

    recursiveCalls = matches.length - 1;

    if(recursiveCalls > 0){

      recursive = true;
    }
  }

  // =========================
  // COMPLEXITY DETECTION
  // =========================

  // FIBONACCI TYPE

  if(recursiveCalls >= 2){

    timeComplexity = "O(2ⁿ)";
  }

  // FACTORIAL / SIMPLE RECURSION

  else if(recursiveCalls === 1){

    timeComplexity = "O(n)";
  }

  // MERGE SORT / QUICK SORT TYPE

  if(recursive && loops >= 1){

    timeComplexity = "O(n log n)";
  }

  // NORMAL LOOPS

  else if(loops === 1){

    timeComplexity = "O(n)";
  }

  else if(loops === 2){

    timeComplexity = "O(n²)";
  }

  else if(loops >= 3){

    timeComplexity = "O(n³)";
  }

  return {

    timeComplexity
  };
}

module.exports = analyzeComplexity;