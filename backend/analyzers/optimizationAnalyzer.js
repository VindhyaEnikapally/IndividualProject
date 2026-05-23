/*
const analyzeOptimization = (code) => {

  let optimization = "Good";

  let penalties = 0;

  // TOO MANY LOOPS

  const loopCount =
    (code.match(/for\s*\(/g) || []).length +
    (code.match(/while\s*\(/g) || []).length;

  if(loopCount >= 3){

    optimization = "Average";

    penalties += 20;
  }

  // BAD RECURSION

  if(
    code.includes("function") &&
    code.match(/return\s+\w+\(/) &&
    !code.includes("memo")
  ){

    penalties += 15;
  }

  // LARGE ARRAYS

  if(
    code.includes("new Array") ||
    code.includes("[[]]")
  ){

    penalties += 10;
  }

  return {

    optimization,

    penalties
  };
};

module.exports = analyzeOptimization;

///////////////////////////////////////

const analyzeOptimization = (

  code,

  language

) => {

  let optimization = "Good";

  // MANY LOOPS

  const loops =
    (code.match(/for\s*\(/g) || []).length +
    (code.match(/while\s*\(/g) || []).length;

  if(loops >= 3){

    optimization = "Poor";
  }

  else if(loops === 2){

    optimization = "Average";
  }

  // BAD SORT DETECTION

  if(
    code.includes("bubble") ||

    code.includes("Bubble")
  ){

    optimization = "Poor";
  }

  // GOOD STRUCTURES

  if(
    code.includes("HashMap") ||

    code.includes("unordered_map") ||

    code.includes("Map") ||

    code.includes("Set")
  ){

    optimization = "Good";
  }

  return {

    optimization
  };
};

module.exports = analyzeOptimization;
*/

const analyzeOptimization = (code) => {

  let optimization = "Good";

  const loops =

    (code.match(/for\s*\(/g) || []).length +

    (code.match(/while\s*\(/g) || []).length +

    (code.match(/for\s+.*:/g) || []).length;

  // BAD CASES

  if(loops >= 3){

    optimization = "Poor";
  }

  else if(loops === 2){

    optimization = "Average";
  }

  // RECURSIVE NON MEMOIZED

  if(
    code.includes("fib(") &&
    !code.includes("memo") &&
    !code.includes("dp")
  ){

    optimization = "Average";
  }

  // GOOD DATA STRUCTURES

  if(

    code.includes("HashMap") ||

    code.includes("unordered_map") ||

    code.includes("Map") ||

    code.includes("Set") ||

    code.includes("priority_queue") ||

    code.includes("heapq")
  ){

    optimization = "Good";
  }

  return {

    optimization
  };
};

module.exports = analyzeOptimization;